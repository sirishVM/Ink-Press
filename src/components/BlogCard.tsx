import React from 'react';
import Link from 'next/link';
import { BlogPost, getCategoryBadgeClasses } from '@/lib/store';
import { Clock, ArrowUpRight, Heart, MessageSquare, Sparkles } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const badgeStyle = getCategoryBadgeClasses(post.category);

  if (featured) {
    return (
      <article className="rounded-3xl bg-white dark:bg-slate-900/90 border border-stone-200/80 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group shadow-sm">
        <div className="grid lg:grid-cols-12 gap-0 items-center">
          
          {/* Image */}
          <div className="lg:col-span-6 overflow-hidden aspect-[16/10] bg-stone-100 dark:bg-slate-950 relative">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-purple-200/80 dark:border-purple-800 shadow-sm">
                <Sparkles size={11} className="text-amber-500" />
                <span>SPOTLIGHT ISSUE</span>
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
            
            <div className="flex items-center justify-between font-mono text-xs">
              <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${badgeStyle.pill}`}>
                {post.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium text-[11px]">
                <Clock size={12} className="text-slate-400" /> {post.readTime}
              </span>
            </div>

            <Link href={`/read/${post.slug || post.id}`} className="block group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h2>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-3">
              {post.subtitle}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags?.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author & Actions */}
            <div className="pt-5 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="size-9 rounded-full object-cover ring-2 ring-purple-500/20" 
                />
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{post.author.name}</div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{post.publishedAt}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Heart size={13} className="text-rose-500 fill-rose-500/20" /> {post.claps}
                </span>
                <span className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <MessageSquare size={13} className="text-sky-500" /> {post.comments?.length || 0}
                </span>
                <Link href={`/read/${post.slug || post.id}`}>
                  <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-sans font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-purple-600/20">
                    <span>Read Essay</span>
                    <ArrowUpRight size={13} />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </article>
    );
  }

  return (
    <article className="rounded-3xl bg-white dark:bg-slate-900/90 border border-stone-200/80 dark:border-slate-800 p-6 sm:p-7 hover:border-purple-300 dark:hover:border-purple-700/60 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between space-y-5 group shadow-sm">
      
      {/* Top Meta */}
      <div className="space-y-3.5">
        
        {/* Cover Preview */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100 dark:bg-slate-950 mb-4">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}

        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${badgeStyle.pill}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
            <Clock size={11} /> {post.readTime}
          </span>
        </div>

        <Link href={`/read/${post.slug || post.id}`} className="block group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
            {post.title}
          </h3>
        </Link>

        <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {post.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {post.tags?.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-slate-800 text-slate-500">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Bottom Row */}
      <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="size-7 rounded-full object-cover ring-1 ring-purple-500/20" 
          />
          <div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              {post.author.name}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {post.publishedAt}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1 text-slate-500">
            <Heart size={12} className="text-rose-500" /> {post.claps}
          </span>
          <Link 
            href={`/read/${post.slug || post.id}`} 
            className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-0.5 text-xs font-sans"
          >
            <span>Read</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

    </article>
  );
}

export default BlogCard;
