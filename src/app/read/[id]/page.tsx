'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NewsletterSubscribe } from '@/components/NewsletterSubscribe';
import { useBlog } from '@/context/BlogContext';
import { useAuth } from '@/context/AuthContext';
import { getCategoryBadgeClasses } from '@/lib/store';
import { 
  Heart, MessageSquare, Bookmark, Share2, Clock, 
  ArrowLeft, Check, Sparkles, Send, Volume2, User, Flame
} from 'lucide-react';

export default function BlogPostReaderPage() {
  const params = useParams();
  const router = useRouter();
  const { posts, getPost, clapPost, addComment } = useBlog();
  const { user } = useAuth();

  const idOrSlug = params.id as string;
  const post = getPost(idOrSlug) || posts.find(p => p.id === idOrSlug || p.slug === idOrSlug);

  const [clapped, setClapped] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState(user?.name || '');
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setReadingProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 font-sans text-center">
          <h2 className="font-display text-2xl font-bold">Story not found.</h2>
          <p className="text-xs text-slate-500">The story might have been removed or renamed.</p>
          <Link href="/" className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline">
            ← Return to Publication Feed
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const badgeStyle = getCategoryBadgeClasses(post.category);

  const handleClap = () => {
    clapPost(post.id);
    setClapped(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(post.id, {
      userName: commentAuthor || user?.name || 'Anonymous Reader',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      content: commentText.trim()
    });

    setCommentText('');
  };

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Reading Progress Indicator with Pastel Gradient */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-stone-200/50 dark:bg-slate-800/50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* Back Navigation & Meta */}
        <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-slate-800 pb-4 font-sans text-xs">
          <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5 font-semibold">
            <ArrowLeft size={14} />
            <span>Back to Feed</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${badgeStyle.pill}`}>
              {post.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Article Title & Subtitle Header */}
        <header className="space-y-6">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            {post.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author Byline Bar */}
          <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="size-12 rounded-full object-cover ring-2 ring-purple-500/20" 
              />
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{post.author.name}</span>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-medium">{post.author.handle}</span>
                </div>
                <div className="text-xs text-slate-500">{post.publishedAt} · Staff Author</div>
              </div>
            </div>

            {/* Interaction Buttons Dock */}
            <div className="flex items-center gap-2 font-sans text-xs">
              <button
                onClick={handleClap}
                className={`px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm ${
                  clapped 
                    ? 'border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:border-rose-800 dark:text-rose-300 font-bold scale-105' 
                    : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Heart size={14} className={clapped ? 'fill-rose-500 text-rose-500' : 'text-slate-400'} />
                <span>{post.claps}</span>
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-xl border transition-colors ${
                  bookmarked 
                    ? 'border-purple-300 bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-300' 
                    : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700 text-slate-700 dark:text-slate-300'
                }`}
                title="Bookmark story"
              >
                <Bookmark size={14} className={bookmarked ? 'fill-purple-600' : ''} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700 text-slate-700 dark:text-slate-300 transition-colors"
                title="Copy share link"
              >
                {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
              </button>
            </div>

          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-stone-100 dark:bg-slate-950 shadow-md border border-stone-200/80 dark:border-slate-800">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Article Prose Body */}
        <article 
          className="article-prose pt-4 border-b border-stone-200/80 dark:border-slate-800 pb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags List */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-900/40 font-mono text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Claps & Feedback Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100/70 via-pink-50/50 to-amber-50/70 dark:from-purple-950/30 dark:via-slate-900/50 dark:to-amber-950/20 border border-purple-200/80 dark:border-purple-900/40 flex items-center justify-between font-sans text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClap}
              className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
            >
              <Heart size={14} className="fill-current" />
              <span>Clap for this essay ({post.claps})</span>
            </button>
            <span className="text-slate-600 dark:text-slate-400 hidden sm:inline text-xs">Support independent publishing</span>
          </div>

          <button 
            onClick={handleShare}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 font-semibold hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
          >
            {copiedLink ? 'Link Copied!' : 'Share'}
          </button>
        </div>

        {/* Author Bio Card */}
        <div className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 bg-white dark:bg-slate-900/90 border border-stone-200/80 dark:border-slate-800 shadow-sm">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="size-16 rounded-2xl object-cover ring-2 ring-purple-500/20 shrink-0" 
          />
          <div className="space-y-2 font-sans flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">{post.author.name}</h3>
                <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{post.author.handle}</span>
              </div>
              <button className="px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-800 font-sans text-xs font-semibold hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                Follow Author
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {post.author.bio || 'Staff Writer & Contributor at Ink & Press. Writing on software craftsmanship, high-contrast systems, and generative tools.'}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-slate-800 pb-3 font-sans">
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Reader Reflections ({post.comments?.length || 0})
            </span>
          </div>

          {/* Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3 font-sans">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Your Name (e.g. Marcus Vance)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full sm:w-1/2 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <textarea 
              rows={3}
              placeholder="Leave a thoughtful reaction or perspective on this dispatch..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-4 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-semibold tracking-wide shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
            >
              <Send size={13} />
              <span>Post Reflection</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-2">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map(c => (
                <div key={c.id} className="p-5 rounded-2xl border border-stone-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                      <img src={c.userAvatar} alt={c.userName} className="size-6 rounded-full object-cover ring-1 ring-purple-400" />
                      <span>{c.userName}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{c.createdAt}</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                    {c.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 font-sans italic">No reflections yet. Be the first to start the conversation!</p>
            )}
          </div>
        </section>

        {/* Newsletter Bottom Box */}
        <NewsletterSubscribe source={`Blog Article: ${post.title}`} />

      </main>

      <Footer />
    </div>
  );
}
