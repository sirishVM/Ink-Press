'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BlogPost, 
  Subscriber, 
  getStoredPosts, 
  saveStoredPosts, 
  getStoredSubscribers, 
  saveStoredSubscribers,
  Comment
} from '@/lib/store';

type BlogContextType = {
  posts: BlogPost[];
  subscribers: Subscriber[];
  getPost: (idOrSlug: string) => BlogPost | undefined;
  createPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'claps' | 'comments'>) => BlogPost;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  clapPost: (id: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  subscribe: (email: string, source?: string) => boolean;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    setPosts(getStoredPosts());
    setSubscribers(getStoredSubscribers());
  }, []);

  const getPost = (idOrSlug: string): BlogPost | undefined => {
    return posts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  };

  const createPost = (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'claps' | 'comments'>): BlogPost => {
    const newPost: BlogPost = {
      ...postData,
      id: 'post_' + Date.now(),
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      claps: 0,
      comments: []
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    saveStoredPosts(updated);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    const updated = posts.map(p => p.id === id ? { ...p, ...updates } : p);
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const clapPost = (id: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, claps: p.claps + 1 } : p);
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const addComment = (postId: string, commentData: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...commentData,
      id: 'c_' + Date.now(),
      createdAt: 'Just now'
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [newComment, ...(p.comments || [])] };
      }
      return p;
    });

    setPosts(updated);
    saveStoredPosts(updated);
  };

  const subscribe = (email: string, source: string = 'Website Widget'): boolean => {
    if (!email || !email.includes('@')) return false;
    const exists = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return true;

    const newSub: Subscriber = {
      id: 'sub_' + Date.now(),
      email: email.trim(),
      subscribedAt: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      source,
      status: 'active'
    };

    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    saveStoredSubscribers(updated);
    return true;
  };

  return (
    <BlogContext.Provider value={{
      posts,
      subscribers,
      getPost,
      createPost,
      updatePost,
      deletePost,
      clapPost,
      addComment,
      subscribe
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
