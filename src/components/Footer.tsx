'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 dark:border-slate-800/80 bg-stone-100/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto space-y-12 font-sans">
        
        {/* Top Feature Colophon Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-100/70 via-pink-50/50 to-amber-50/70 dark:from-purple-950/30 dark:via-slate-900/60 dark:to-amber-950/20 border border-purple-200/70 dark:border-purple-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 font-mono text-xs font-semibold">
              <Sparkles size={12} className="text-amber-500" />
              <span>THE 2026 EDITORIAL STANDARD</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Write, publish, and dispatch without algorithmic noise.
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ink &amp; Press gives independent writers full ownership over their essays, subscriber lists, and brand identity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/write">
              <button className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans font-semibold text-xs tracking-wide shadow-md shadow-purple-600/20 transition-all flex items-center gap-2">
                <span>Start Writing Now</span>
                <ArrowUpRight size={14} />
              </button>
            </Link>
            <Link href="/subscribers">
              <button className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-sans font-semibold text-xs transition-colors">
                View Subscribers
              </button>
            </Link>
          </div>
        </div>

        {/* 4 Multi-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pt-4">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-display font-black text-sm text-white">
                ✦
              </div>
              <span className="font-display font-black text-base text-slate-900 dark:text-white">Ink &amp; Press</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An autonomous, high-fidelity publication engine built with Next.js 14, Tiptap, and pastel color harmonies.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <span>Made for</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Independent Writers</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              TOPICS
            </div>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/?category=AI+%26+Systems" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between">
                  <span>AI &amp; Systems</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">Sky</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=Engineering" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between">
                  <span>Engineering</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">Mint</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=Design+Engineering" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between">
                  <span>Design Engineering</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">Peach</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=Culture" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between">
                  <span>Culture &amp; Essays</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">Lilac</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Navigation */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              CREATOR SUITE
            </div>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/write" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Tiptap Rich-Text Editor</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Publication Overview</Link></li>
              <li><Link href="/subscribers" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Subscriber Ledger</Link></li>
              <li><Link href="/auth/signin" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Demo Auth Console</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              SYSTEM SPECS
            </div>
            <div className="space-y-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500"></span>
                <span>Next.js 14 App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-purple-500"></span>
                <span>Pastel Harmony Tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-amber-500"></span>
                <span>Zero Backend Blockers</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Ink &amp; Press Publishing Co.</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold">
              VERSION 2.6 PASTEL
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              SYSTEM NORMAL
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
