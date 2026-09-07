'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useBlog } from '@/context/BlogContext';
import { useAuth } from '@/context/AuthContext';
import { getCategoryBadgeClasses } from '@/lib/store';
import { 
  PenSquare, BookOpen, Users, Heart, MessageSquare, 
  Trash2, ExternalLink, ArrowUpRight, Plus, Download, Sparkles, TrendingUp
} from 'lucide-react';

export default function DashboardStudioPage() {
  const { posts, subscribers, deletePost } = useBlog();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'stories' | 'subscribers'>('stories');

  const totalClaps = posts.reduce((sum, p) => sum + p.claps, 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePost(id);
    }
  };

  const exportSubscribersCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email,Subscribed Date,Source,Status"].concat(
          subscribers.map(s => `"${s.email}","${s.subscribedAt}","${s.source}","${s.status}"`)
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        
        {/* Header & Stats */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-100/80 via-pink-50/60 to-amber-50/80 dark:from-purple-950/30 dark:via-slate-900/50 dark:to-amber-950/20 border border-purple-200/80 dark:border-purple-900/40 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-purple-700 dark:text-purple-300 font-bold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WRITER STUDIO CONSOLE</span>
              <span>·</span>
              <span>{user?.name || 'ALEX RIVERA'}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Publication Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Manage published dispatches, track reader feedback, and export subscriber lists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/write">
              <button className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-semibold tracking-wide shadow-md shadow-purple-600/20 transition-all flex items-center gap-2">
                <PenSquare size={14} />
                <span>New Story</span>
              </button>
            </Link>
          </div>
        </div>

        {/* 4 Pastel Metric Bento Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-3xl border border-purple-200/80 dark:border-purple-900/40 bg-purple-50/60 dark:bg-purple-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-purple-700 dark:text-purple-300 uppercase font-mono font-bold">PUBLISHED STORIES</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">{posts.length}</div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium pt-1">✦ Live on public feed</div>
          </div>

          <div className="p-6 rounded-3xl border border-sky-200/80 dark:border-sky-900/40 bg-sky-50/60 dark:bg-sky-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-sky-700 dark:text-sky-300 uppercase font-mono font-bold">SUBSCRIBERS</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">{subscribers.length}</div>
            <div className="text-[11px] text-sky-600 dark:text-sky-400 font-medium pt-1">✦ 100% Verified readers</div>
          </div>

          <div className="p-6 rounded-3xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-rose-700 dark:text-rose-300 uppercase font-mono font-bold">TOTAL CLAPS</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">{totalClaps}</div>
            <div className="text-[11px] text-rose-600 dark:text-rose-400 font-medium pt-1">✦ Reader appreciation</div>
          </div>

          <div className="p-6 rounded-3xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-amber-800 dark:text-amber-300 uppercase font-mono font-bold">DISCUSSIONS</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">{totalComments}</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium pt-1">✦ Reader reflections</div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-stone-200/80 dark:border-slate-800 flex items-center gap-6 font-sans text-xs font-semibold">
          <button
            onClick={() => setActiveTab('stories')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'stories' 
                ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Stories Ledger ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'subscribers' 
                ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Newsletter Audience ({subscribers.length})
          </button>
        </div>

        {/* TAB 1: STORIES LEDGER */}
        {activeTab === 'stories' && (
          <div className="rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-stone-200/80 dark:border-slate-800 flex items-center justify-between font-sans text-xs">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">Published Stories Manifest</span>
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{posts.length} RECORDS</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200/80 dark:border-slate-800 font-mono text-[10px] text-slate-400 uppercase bg-stone-50 dark:bg-slate-950/60">
                    <th className="p-4 pl-6">Story Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Published</th>
                    <th className="p-4">Claps</th>
                    <th className="p-4">Reflections</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-800/80">
                  {posts.map(p => {
                    const badge = getCategoryBadgeClasses(p.category);
                    return (
                      <tr key={p.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/10 transition-colors">
                        <td className="p-4 pl-6">
                          <Link href={`/read/${p.slug || p.id}`} className="font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 block max-w-md truncate">
                            {p.title}
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono">{p.readTime}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${badge.pill}`}>
                            {p.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-500">{p.publishedAt}</td>
                        <td className="p-4 font-mono text-xs text-rose-600 dark:text-rose-400 font-bold">{p.claps}</td>
                        <td className="p-4 font-mono text-xs text-slate-600 dark:text-slate-400">{p.comments?.length || 0}</td>
                        <td className="p-4 pr-6 text-right font-mono">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/read/${p.slug || p.id}`}>
                              <button className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400" title="View Story">
                                <ExternalLink size={14} />
                              </button>
                            </Link>
                            <button 
                              onClick={() => handleDelete(p.id, p.title)}
                              className="p-2 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-500 transition-colors" 
                              title="Delete Story"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-stone-200/80 dark:border-slate-800 flex items-center justify-between font-sans text-xs">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">Active Newsletter Subscribers</span>
              <button 
                onClick={exportSubscribersCSV}
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-800 font-semibold text-xs hover:border-purple-300 dark:hover:border-purple-700 transition-colors flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-stone-200/80 dark:border-slate-800 text-[10px] font-mono text-slate-400 uppercase bg-stone-50 dark:bg-slate-950/60">
                    <th className="p-4 pl-6">Subscriber Email</th>
                    <th className="p-4">Subscribed Date</th>
                    <th className="p-4">Acquisition Source</th>
                    <th className="p-4 pr-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-slate-800/80">
                  {subscribers.map(s => (
                    <tr key={s.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/10 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-white">{s.email}</td>
                      <td className="p-4 text-slate-500 font-mono text-xs">{s.subscribedAt}</td>
                      <td className="p-4 text-slate-500 text-xs">{s.source}</td>
                      <td className="p-4 pr-6 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {s.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
