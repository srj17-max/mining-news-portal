'use client';

import React, { useState } from 'react';
import { Article } from '@/lib/types';
import { 
  Clock, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Check, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { getRelativeTime, formatDisplayDate } from '@/lib/dateUtils';

interface NewsCardProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
}

const CATEGORY_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  coal: { label: 'Coal & Lignite', bg: 'bg-orange-500/10 border-orange-500/30', text: 'text-orange-600 dark:text-orange-400' },
  critical_minerals: { label: 'Lithium & Critical', bg: 'bg-emerald-500/10 border-emerald-500/30', text: 'text-emerald-600 dark:text-emerald-400' },
  iron_ore: { label: 'Iron Ore', bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-600 dark:text-red-400' },
  metals: { label: 'Base Metals', bg: 'bg-cyan-500/10 border-cyan-500/30', text: 'text-cyan-600 dark:text-cyan-400' },
  precious_metals: { label: 'Precious Metals', bg: 'bg-yellow-500/10 border-yellow-500/30', text: 'text-yellow-600 dark:text-yellow-400' },
  policy: { label: 'Policy & Auctions', bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-600 dark:text-blue-400' },
  sustainability: { label: 'ESG / Green', bg: 'bg-green-500/10 border-green-500/30', text: 'text-green-600 dark:text-green-400' },
  technology: { label: 'Mine Tech / AI', bg: 'bg-purple-500/10 border-purple-500/30', text: 'text-purple-600 dark:text-purple-400' },
  all: { label: 'General Mining', bg: 'bg-slate-500/10 border-slate-500/30', text: 'text-slate-600 dark:text-slate-400' }
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onOpenArticle,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(article.imageUrl || FALLBACK_IMAGE);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title}\n${article.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(article);
  };

  const catStyle = CATEGORY_STYLES[article.category] || CATEGORY_STYLES.all;

  return (
    <div
      onClick={() => onOpenArticle(article)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenArticle(article);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open intelligence brief for: ${article.title}`}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-200 cursor-pointer overflow-hidden card-print focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      
      {/* Top Banner Image & Badges */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-800">
        <img
          src={imgSrc}
          alt={article.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading={article.isFeatured ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Category Chip */}
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${catStyle.bg} ${catStyle.text} bg-slate-950/70`}>
            {catStyle.label}
          </span>

          {/* Action Buttons (Bookmark + Share) with Accessible Hit Targets */}
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handleShare}
              aria-label={`Copy share link for: ${article.title}`}
              title="Copy share link"
              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-200 backdrop-blur-md border border-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleBookmark}
              aria-label={isBookmarked ? `Remove bookmark for: ${article.title}` : `Bookmark article: ${article.title}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              className={`p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl backdrop-blur-md border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isBookmarked
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950/70 hover:bg-slate-900 text-slate-200 border-white/15'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay: Source and Publish Time */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 font-medium">
          <span className="truncate max-w-[65%] font-bold text-amber-400">
            {article.source}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{getRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Published Date Tag */}
          <div className="flex items-center gap-2 mb-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="font-mono">{formatDisplayDate(article.dateStr)}</span>
            {article.location && (
              <>
                <span>•</span>
                <span className="flex items-center gap-0.5 truncate text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  {article.location}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
            {article.title}
          </h3>

          {/* Snippet */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {article.snippet || article.description}
          </p>
        </div>

        {/* Footer: Tags & Read Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          
          {/* Tags */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {article.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap border border-slate-200 dark:border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Read Article Action */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shrink-0">
            <Sparkles className="w-3 h-3" />
            <span>Holistic Brief</span>
          </span>

        </div>

      </div>

    </div>
  );
};
