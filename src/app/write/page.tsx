'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TiptapEditor } from '@/components/TiptapEditor';
import { useBlog } from '@/context/BlogContext';
import { useAuth } from '@/context/AuthContext';
import { 
  ArrowLeft, Eye, EyeOff, Sparkles, Send, 
  Image as ImageIcon, Tag, Check, Clock, Layers
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Engineering', color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' },
  { name: 'AI & Systems', color: 'border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300' },
  { name: 'Design Engineering', color: 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300' },
  { name: 'Culture', color: 'border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300' },
  { name: 'Essays', color: 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300' },
] as const;

export default function WriteStoryPage() {
  const router = useRouter();
  const { createPost } = useBlog();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('<h2>Introduction</h2><p>Begin typing your article or technical deep dive here...</p>');
  const [category, setCategory] = useState<'Engineering' | 'AI & Systems' | 'Design Engineering' | 'Culture' | 'Essays'>('Engineering');
  const [tagsInput, setTagsInput] = useState('Architecture, Frontend, 2026');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
  const [previewMode, setPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const wordCount = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title for your story.');
      return;
    }

    setIsPublishing(true);

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `story-${Date.now()}`;

    const newPost = createPost({
      slug,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A thoughtful deep dive on Ink & Press.',
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      category,
      tags: tags.length ? tags : ['General', 'Writing'],
      readTime,
      author: {
        name: user?.name || 'Alex Rivera',
        handle: user?.handle || '@alexrivera',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: user?.bio || 'Staff Product Engineer & Contributor.'
      },
      status: 'published'
    });

    setTimeout(() => {
      setIsPublishing(false);
      router.push(`/read/${newPost.slug || newPost.id}`);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Action Ribbon */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#090D16]/90 backdrop-blur-xl border-b border-stone-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5 font-sans text-xs font-bold">
              <ArrowLeft size={14} />
              <span>Exit Studio</span>
            </Link>
            <span className="text-stone-300 dark:text-slate-700 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full bg-purple-100/70 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE AUTOSAVE READY</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-sans text-xs font-semibold hover:border-purple-300 dark:hover:border-purple-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {previewMode ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{previewMode ? 'Editor View' : 'Live Preview'}</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-semibold tracking-wide shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={13} />
              <span>{isPublishing ? 'Publishing...' : 'Publish Story'}</span>
            </button>
          </div>

        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {previewMode ? (
          /* LIVE PREVIEW RENDER */
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 font-mono text-xs text-purple-700 dark:text-purple-300 text-center uppercase tracking-wider font-bold">
              ✦ LIVE READER PREVIEW MODE ✦
            </div>

            <header className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-mono font-bold uppercase">
                {category} · {readTime}
              </span>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                {title || 'Untitled Story Title'}
              </h1>

              <p className="font-sans text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {subtitle || 'Story subtitle will appear here...'}
              </p>
            </header>

            {coverImage && (
              <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-stone-100 dark:bg-slate-950 shadow-md">
                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <article 
              className="article-prose pt-4 border-b border-stone-200/80 dark:border-slate-800 pb-12"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          /* EDITING STUDIO FORM */
          <form onSubmit={handlePublish} className="space-y-8">
            
            {/* Category Pills Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-500 uppercase">
                <Layers size={13} />
                <span>SELECT PUBLICATION CATEGORY:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCategory(c.name as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold border transition-all ${
                      category === c.name 
                        ? `${c.color} shadow-sm ring-2 ring-purple-500/20` 
                        : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-stone-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Subtitle Input Fields */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Story Title (e.g. The Architecture of Zero-Runtime Frontends)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full font-display text-3xl sm:text-5xl md:text-6xl font-extrabold bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-0"
              />

              <input
                type="text"
                placeholder="Write a clear, compelling summary for readers..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full font-sans text-base sm:text-xl font-normal bg-transparent border-none outline-none text-slate-600 dark:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-0"
              />
            </div>

            {/* Cover Image URL */}
            <div className="p-5 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-2.5 font-sans text-xs shadow-sm">
              <div className="flex items-center gap-2 font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                <ImageIcon size={14} className="text-purple-600 dark:text-purple-400" />
                <span>COVER IMAGE URL</span>
              </div>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..."
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Tiptap Rich Text Editor */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold uppercase text-slate-500 flex items-center justify-between">
                <span>STORY ESSAY BODY (TIPTAP STUDIO)</span>
                <span className="text-purple-600 dark:text-purple-400">{readTime}</span>
              </div>
              <TiptapEditor 
                content={content} 
                onChange={(html) => setContent(html)} 
              />
            </div>

            {/* Tags Input */}
            <div className="p-5 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-2.5 font-sans text-xs shadow-sm">
              <div className="flex items-center gap-2 font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                <Tag size={14} className="text-purple-600 dark:text-purple-400" />
                <span>TOPIC TAGS (COMMA SEPARATED)</span>
              </div>
              <input 
                type="text" 
                placeholder="Engineering, Svelte5, AI, WebGL"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Bottom Publish Action */}
            <div className="pt-6 border-t border-stone-200/80 dark:border-slate-800 flex items-center justify-between">
              <Link href="/" className="text-xs font-sans font-semibold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400">
                ← Discard and Return to Feed
              </Link>

              <button
                type="submit"
                disabled={isPublishing}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-semibold tracking-wide shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Send size={14} />
                <span>{isPublishing ? 'Publishing Story...' : 'Publish to Feed →'}</span>
              </button>
            </div>

          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}
