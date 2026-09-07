'use client';

import React, { useState } from 'react';
import { useBlog } from '@/context/BlogContext';
import { Mail, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export function NewsletterSubscribe({ 
  title = "Subscribe to The Weekly Dispatch", 
  subtitle = "Delivered every Tuesday morning: deep-dive essays on software craftsmanship, neural interfaces, and autonomous publishing.", 
  source = "Homepage Widget" 
}: { 
  title?: string; 
  subtitle?: string; 
  source?: string 
}) {
  const { subscribe } = useBlog();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    const ok = subscribe(email, source);
    if (ok) {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-purple-100/80 via-pink-50/60 to-amber-50/80 dark:from-purple-950/30 dark:via-slate-900/50 dark:to-amber-950/20 border border-purple-200/80 dark:border-purple-900/40 p-6 sm:p-8 space-y-5 shadow-sm">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-purple-200 dark:border-purple-800 font-mono text-[10px] font-bold text-purple-700 dark:text-purple-300">
          <Sparkles size={11} className="text-amber-500" />
          <span>INDEPENDENT NEWSLETTER</span>
        </div>
        
        <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white leading-tight">
          {title}
        </h3>
        
        <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-sans font-medium flex items-center gap-2.5">
          <div className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check size={13} />
          </div>
          <span>You're in! Check your inbox for the latest dispatch archive.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 font-sans">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input 
              type="email" 
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              required
              className="flex-1 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 px-4 py-3 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 shadow-inner transition-colors"
            />
            <button 
              type="submit"
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans font-semibold text-xs tracking-wide shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight size={13} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-sans">
            <ShieldCheck size={13} className="text-emerald-500" />
            <span>Direct dispatch. No tracking pixels. 1-click unsubscribe.</span>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewsletterSubscribe;
