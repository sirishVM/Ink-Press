'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { NewsletterSubscribe } from '@/components/NewsletterSubscribe';
import { useBlog } from '@/context/BlogContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, Sparkles, TrendingUp, Users, PenSquare, 
  ArrowRight, ArrowUpRight, Compass, ShieldCheck, Flame, BookOpen, Quote
} from 'lucide-react';

const CATEGORIES = [
  { name: 'All', color: 'bg-purple-600 text-white' },
  { name: 'AI & Systems', color: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800' },
  { name: 'Engineering', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' },
  { name: 'Design Engineering', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800' },
  { name: 'Culture', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800' },
  { name: 'Essays', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800' },
] as const;

export default function HomeFeedPage() {
  const { posts } = useBlog();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredPost = posts.find(p => p.featured) || posts[0];
  
  const filteredPosts = posts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const remainingPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        
        {/* Editorial Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-100/90 via-pink-50/70 to-amber-50/90 dark:from-purple-950/40 dark:via-slate-900/60 dark:to-amber-950/30 border border-purple-200/80 dark:border-purple-900/50 p-8 sm:p-12 relative overflow-hidden shadow-sm">
          
          {/* Decorative Floating Circles */}
          <div className="absolute -top-12 -right-12 size-56 rounded-full bg-purple-300/20 dark:bg-purple-600/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 size-56 rounded-full bg-amber-300/20 dark:bg-amber-600/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold shadow-sm">
                <Sparkles size={13} className="text-amber-500" />
                <span>INDEPENDENT ESSAYS &amp; DISPATCHES</span>
                <span className="text-purple-300 dark:text-purple-700">·</span>
                <span>ISSUE #42</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Thoughts crafted with care, published with zero friction.
              </h1>

              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Ink &amp; Press is an autonomous publication suite for engineering architects, AI researchers, and cultural essayists.
              </p>
            </div>

            {/* Quick Action Pill */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/write" className="w-full">
                <button className="w-full px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35 transition-all flex items-center justify-center gap-2">
                  <PenSquare size={15} />
                  <span>Open Tiptap Studio</span>
                </button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-purple-800 dark:text-purple-300 py-1">
                <span>✦ NO PAYWALLS</span>
                <span>·</span>
                <span>100% OPEN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Pastel Category Filter Bar */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-stone-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-0.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                    : 'bg-stone-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search essays, tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-100 dark:bg-slate-800 border border-transparent focus:border-purple-300 dark:focus:border-purple-700 text-xs font-sans text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Featured Hero Story */}
        {featuredPost && selectedCategory === 'All' && searchQuery === '' && (
          <section className="space-y-4">
            <BlogCard post={featuredPost} featured={true} />
          </section>
        )}

        {/* 2-Column Main Feed & Sidebar */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Column: Stories Grid */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-purple-500"></span>
                <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Curated Articles
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  {filteredPosts.length} Stories
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">SORT: CHRONOLOGICAL</span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 font-sans">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  No articles found matching "{searchQuery}".
                </p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
                >
                  Reset all search filters →
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {(selectedCategory === 'All' && searchQuery === '' ? remainingPosts : filteredPosts).map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Pastel Bento Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Newsletter Card */}
            <NewsletterSubscribe />

            {/* Curator's Note Pastel Card */}
            <div className="rounded-3xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 p-6 space-y-3 font-sans shadow-sm">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold uppercase">
                <Quote size={14} className="text-amber-600" />
                <span>CURATOR'S DESK</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-950 dark:text-amber-200 italic font-serif text-sm">
                "In 2026, the best writing isn't written for the search engine algorithm. It's written with deep human taste, rigorous technical clarity, and authentic style."
              </p>
              <div className="pt-2 flex items-center gap-2.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Alex Rivera"
                  className="size-7 rounded-full object-cover ring-2 ring-amber-400/30"
                />
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200">Alex Rivera, Editor</span>
              </div>
            </div>

            {/* Trending Topics Cloud */}
            <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-stone-200/80 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-slate-900 dark:text-white">
                <Flame size={15} className="text-rose-500" />
                <span>Trending Tags</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { tag: '#Svelte5', style: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
                  { tag: '#ZeroRuntime', style: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
                  { tag: '#AIAgents', style: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
                  { tag: '#DesignSystems', style: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
                  { tag: '#WebGL', style: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
                  { tag: '#TypeScript', style: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
                ].map(item => (
                  <button
                    key={item.tag}
                    onClick={() => setSearchQuery(item.tag.replace('#', ''))}
                    className={`px-3 py-1 rounded-xl border text-xs font-mono font-medium hover:scale-105 transition-all ${item.style}`}
                  >
                    {item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Writers List */}
            <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-stone-200/80 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-slate-900 dark:text-white">Resident Writers</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-3 font-sans">
                <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                    alt="Alex Rivera"
                    className="size-9 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Alex Rivera</div>
                    <div className="text-[11px] text-slate-500">Product &amp; Systems Engineer</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors">
                  <img 
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" 
                    alt="Elena Rostova"
                    className="size-9 rounded-full object-cover ring-2 ring-sky-500/20"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">Elena Rostova</div>
                    <div className="text-[11px] text-slate-500">Lead AI Graph Researcher</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
