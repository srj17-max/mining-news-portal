'use client';

import React, { useState } from 'react';
import { DailySummary } from '@/lib/types';
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, TrendingUp, Newspaper } from 'lucide-react';
import { formatDisplayDate } from '@/lib/dateUtils';

interface ExecutiveBriefingProps {
  summary: DailySummary | null;
  dateStr: string;
  region: 'india' | 'other';
}

export const ExecutiveBriefing: React.FC<ExecutiveBriefingProps> = ({
  summary,
  dateStr,
  region
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!summary) return null;

  const flagEmoji = region === 'india' ? '🇮🇳' : '🌍';
  const regionLabel = region === 'india' ? 'India Mining Executive Digest' : 'Global Mining Executive Digest';

  return (
    <div className="w-full bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-white dark:from-amber-950/20 dark:via-slate-900/80 dark:to-slate-950 rounded-2xl border border-amber-500/30 p-4 sm:p-5 shadow-md shadow-amber-500/5 relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {flagEmoji} {regionLabel}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-semibold">
                {formatDisplayDate(dateStr)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Daily Strategic Intelligence Briefing
            </h3>
          </div>
        </div>

        <button
          className="p-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label={isOpen ? 'Collapse briefing' : 'Expand briefing'}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Content */}
      {isOpen && (
        <div className="mt-4 pt-3 border-t border-amber-500/20 space-y-3.5">
          
          {/* Executive Overview */}
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {summary.summaryText}
          </p>

          {/* Top Key Takeaways & Highlights */}
          {summary.topHeadlines && summary.topHeadlines.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block flex items-center gap-1">
                <Newspaper className="w-3 h-3 text-amber-500" /> Major Headlines:
              </span>
              <ul className="space-y-1.5">
                {summary.topHeadlines.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Market Sentiment & Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-800/60 text-xs">
            <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Top Focal Mineral</span>
              <span className="text-xs font-bold text-amber-500">{summary.keyStats.topCommodity}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Volume Tracked</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{summary.keyStats.totalArticles} Verified Articles</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Market Takeaway</span>
              <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium line-clamp-2">{summary.marketTakeaway}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
