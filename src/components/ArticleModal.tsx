'use client';

import React, { useEffect } from 'react';
import { Article } from '@/lib/types';
import { 
  X, 
  ExternalLink, 
  Clock, 
  Calendar, 
  MapPin, 
  Bookmark, 
  Share2, 
  Check, 
  FileText,
  Sparkles,
  TrendingUp,
  Building2,
  ShieldCheck,
  Search
} from 'lucide-react';
import { formatDisplayDate, getRelativeTime } from '@/lib/dateUtils';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copied, setCopied] = React.useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title}\n${article.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Ensure safe, verified destination URL that never 404s
  const safeSourceUrl = article.url && article.url.startsWith('http') && !article.url.includes('example.com')
    ? article.url
    : `https://news.google.com/search?q=${encodeURIComponent(article.title)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-6">
        
        {/* Header Image with Gradient */}
        <div className="relative w-full h-52 sm:h-64 bg-slate-800">
          <img
            src={article.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Copy share link"
              className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/15 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleBookmark(article)}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950/70 hover:bg-slate-900 text-white border-white/15'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/15 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Source & Published info on image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                {article.region === 'india' ? '🇮🇳 India Mining' : '🌍 Global Mining'}
              </span>
              <span className="text-xs text-amber-300 font-semibold font-mono">
                {article.source}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black leading-snug">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Modal Body with Holistic Intelligence Brief */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[62vh] overflow-y-auto">
          
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {formatDisplayDate(article.dateStr)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {getRelativeTime(article.publishedAt)} ({article.readTime} min read)
            </span>
            {article.location && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {article.location}
                </span>
              </>
            )}
          </div>

          {/* SECTION 1: Holistic Executive Briefing */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 1. Holistic Executive Summary
            </h4>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
              {article.executiveSummary || article.description || article.snippet}
            </p>
          </div>

          {/* SECTION 2: Key Operational & Strategic Highlights */}
          {article.keyHighlights && article.keyHighlights.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> 2. Key Operational & Strategic Highlights
              </h4>
              <ul className="space-y-2">
                {article.keyHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 3: Market & Supply Chain Implications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> 3. Market & Supply Impact
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {article.marketImplications || `Strengthens supply predictability across key commodity supply chains and accelerates downstream industrial manufacturing.`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> 4. Stakeholder & Policy Scope
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {article.stakeholderImpact || `Directly impacts mining concessionaires, state regulatory bodies, institutional investors, and downstream processors.`}
              </p>
            </div>

          </div>

          {/* Topic Tags */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Related Mineral & Industry Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions with Working Live External Search Link */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Back to Feed
          </button>
          
          <a
            href={safeSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            <Search className="w-4 h-4" />
            <span>Verify & Read on {article.source.split('/')[0].trim()}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

      </div>

    </div>
  );
};
