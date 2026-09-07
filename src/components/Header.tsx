'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';
import { 
  PenSquare, 
  Sun, 
  Moon, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  Sparkles,
  Search,
  BookOpen,
  Users
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {/* Top Pastel Ticker Ribbon */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-amber-50 dark:from-purple-950/40 dark:via-slate-900/60 dark:to-amber-950/30 border-b border-purple-200/60 dark:border-purple-900/30 py-1.5 px-4 text-center font-mono text-[11px] text-purple-900 dark:text-purple-200 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold tracking-wider">ISSUE #42 DISPATCH</span>
            <span className="hidden sm:inline text-purple-400">·</span>
            <span className="hidden sm:inline font-sans text-xs text-purple-800 dark:text-purple-300">
              Curated essays on zero-runtime systems, AI pipelines &amp; modern editorial design
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300">
            <span>✨ 4,820+ SUBSCRIBERS</span>
            <span>·</span>
            <span>WEEKLY DISPATCH</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#FAF8F5]/90 dark:bg-[#090D16]/90 border-b border-stone-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 p-0.5 shadow-md shadow-purple-500/15 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#FAF8F5] dark:bg-slate-950 rounded-[14px] flex items-center justify-center font-display font-black text-xl text-purple-600 dark:text-purple-400">
                ✦
              </div>
            </div>
            <div>
              <div className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Ink &amp; Press</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  2026
                </span>
              </div>
              <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Autonomous Editorial &amp; Newsletter Publishing
              </p>
            </div>
          </Link>

          {/* Center Category Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 dark:bg-slate-900/80 p-1 rounded-full border border-stone-200/60 dark:border-slate-800 font-sans text-xs font-medium">
            <Link 
              href="/"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                pathname === '/' 
                  ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-sm font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Latest Stories
            </Link>
            <Link 
              href="/?category=AI+%26+Systems"
              className="px-3.5 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all"
            >
              AI &amp; Systems
            </Link>
            <Link 
              href="/?category=Engineering"
              className="px-3.5 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all"
            >
              Engineering
            </Link>
            <Link 
              href="/?category=Design+Engineering"
              className="px-3.5 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all"
            >
              Design
            </Link>
            <Link 
              href="/?category=Culture"
              className="px-3.5 py-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all"
            >
              Culture
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Dark/Light Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="size-9 rounded-xl flex items-center justify-center bg-stone-100 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-purple-600" />}
            </button>

            {/* Write Button */}
            <Link href="/write">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-sans font-semibold text-xs tracking-wide shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all flex items-center gap-2">
                <PenSquare size={14} />
                <span>Write Story</span>
              </button>
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-stone-100 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                >
                  <span className="font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate hidden md:inline">
                    {user.name}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="size-7 rounded-lg object-cover ring-2 ring-purple-500/30"
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 shadow-xl p-2 z-50 font-sans animate-in fade-in zoom-in-95">
                    <div className="p-3 border-b border-stone-100 dark:border-slate-900 mb-1">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</div>
                      <div className="mt-1.5 inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold">
                        {user.role.toUpperCase()}
                      </div>
                    </div>

                    <Link 
                      href="/dashboard" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      <LayoutDashboard size={14} />
                      <span>Writer Studio</span>
                    </Link>

                    <Link 
                      href="/subscribers" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      <Users size={14} />
                      <span>Audience Ledger</span>
                    </Link>

                    <div className="my-1 border-t border-stone-100 dark:border-slate-900"></div>

                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin">
                <button className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans text-xs font-semibold hover:border-purple-300 dark:hover:border-purple-700 transition-colors shadow-sm">
                  Sign In
                </button>
              </Link>
            )}

          </div>

        </div>
      </header>
    </>
  );
}

export default Header;
