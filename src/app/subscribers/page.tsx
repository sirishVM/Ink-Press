'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useBlog } from '@/context/BlogContext';
import { Download, Plus, Mail, Users, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function SubscribersPage() {
  const { subscribers, subscribe } = useBlog();
  const [newEmail, setNewEmail] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) return;
    subscribe(newEmail, 'Manual Studio Entry');
    setNewEmail('');
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email,Subscribed Date,Source,Status"].concat(
          subscribers.map(s => `"${s.email}","${s.subscribedAt}","${s.source}","${s.status}"`)
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-100/80 via-pink-50/60 to-amber-50/80 dark:from-purple-950/30 dark:via-slate-900/50 dark:to-amber-950/20 border border-purple-200/80 dark:border-purple-900/40 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-purple-700 dark:text-purple-300 font-bold">
              <Mail size={13} />
              <span>AUDIENCE DISPATCH LEDGER</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Newsletter Readership
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Direct subscriber relationships. Zero intermediary algorithms. Full CSV export anytime.
            </p>
          </div>

          <div className="flex items-center gap-3 font-sans text-xs">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-700 font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} className="text-purple-600" />
              <span>Add Subscriber</span>
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 3 Pastel Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-emerald-800 dark:text-emerald-300 uppercase font-mono font-bold">TOTAL SUBSCRIBERS</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">{subscribers.length}</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium pt-1">✦ 100% Verified organic</div>
          </div>
          <div className="p-6 rounded-3xl border border-purple-200/80 dark:border-purple-900/40 bg-purple-50/60 dark:bg-purple-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-purple-700 dark:text-purple-300 uppercase font-mono font-bold">DISPATCH CADENCE</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">WEEKLY</div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium pt-1">✦ Every Tuesday 08:00 AM</div>
          </div>
          <div className="p-6 rounded-3xl border border-sky-200/80 dark:border-sky-900/40 bg-sky-50/60 dark:bg-sky-950/30 space-y-1 shadow-sm">
            <div className="text-[11px] text-sky-700 dark:text-sky-300 uppercase font-mono font-bold">AVG OPEN RATE</div>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white">64.2%</div>
            <div className="text-[11px] text-sky-600 dark:text-sky-400 font-medium pt-1">✦ High inbox deliverability</div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-stone-200/80 dark:border-slate-800 flex items-center justify-between font-sans text-xs">
            <span className="font-display font-bold text-sm text-slate-900 dark:text-white">Active Audience Registry</span>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{subscribers.length} SUBSCRIBERS</span>
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

      </main>

      {/* Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in font-sans">
          <div className="w-full max-w-md rounded-3xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400">ADD SUBSCRIBER DIALOG</span>
              <button onClick={() => setShowAddModal(false)} className="text-sm font-bold text-slate-400 hover:text-slate-900">✕</button>
            </div>

            <form onSubmit={handleAddSubscriber} className="space-y-4">
              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">SUBSCRIBER EMAIL ADDRESS *</label>
                <input 
                  type="email" 
                  placeholder="reader@domain.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="w-full bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md shadow-purple-600/20"
                >
                  Save Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
