'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, UserPlus, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    await register(name, email, password);
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 p-4 sm:p-6 transition-colors font-sans">
      
      <div className="w-full max-w-md space-y-7">
        
        {/* Header */}
        <div className="text-center space-y-2.5">
          <Link href="/" className="inline-flex items-center gap-2.5 select-none group">
            <div className="size-9 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center font-display font-black text-base text-white shadow-md shadow-purple-500/20">
              ✦
            </div>
            <span className="font-display font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Ink &amp; Press
            </span>
          </Link>
          
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white pt-1">
            Create Writer Account
          </h1>
          <p className="text-xs text-slate-500 font-normal">
            Start publishing independent essays &amp; growing your newsletter audience
          </p>
        </div>

        {/* Register Form */}
        <div className="rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">FULL NAME *</label>
              <input 
                type="text" 
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">EMAIL ADDRESS *</label>
              <input 
                type="email" 
                placeholder="alex@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">CHOOSE PASSKEY *</label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-semibold tracking-wide shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Creating Account...' : 'Create Writer Account'}</span>
              <ArrowRight size={13} />
            </button>

          </form>

          <div className="pt-4 border-t border-stone-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Already have an account? 
            <Link href="/auth/signin" className="text-purple-600 dark:text-purple-400 font-bold ml-1 hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline-flex items-center gap-1 font-medium">
            <ArrowLeft size={13} />
            <span>Return to Public Feed</span>
          </Link>
        </div>

      </div>

    </div>
  );
}