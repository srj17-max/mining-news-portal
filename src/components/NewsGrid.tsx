'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { NewsCard } from './NewsCard';
import { Newspaper, AlertCircle, RefreshCw, Calendar } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  isLoading: boolean;
  onOpenArticle: (article: Article) => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (article: Article) => void;
  onResetFilters: () => void;
  onRefresh: () => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  isLoading,
  onOpenArticle,
  bookmarkedIds,
  onToggleBookmark,
  onResetFilters,
  onRefresh
}) => {
  // Loading state with skeleton cards
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse"
          >
            <div className="h-44 sm:h-48 bg-slate-200 dark:bg-slate-800 w-full" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
              <div className="flex justify-between items-center">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state when no articles match filter
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 border border-amber-500/20">
          <Newspaper className="w-8 h-8" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          No Mining News Found for this Selection
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          No articles match your selected date, category, or search keywords. You can reset filters to view all available news or sync fresh live feeds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" /> Reset Filters
          </button>
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Sync Live News Feeds
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onOpenArticle={onOpenArticle}
            isBookmarked={bookmarkedIds.has(article.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};
