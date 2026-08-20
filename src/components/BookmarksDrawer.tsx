'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { X, Bookmark, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { formatDisplayDate } from '@/lib/dateUtils';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
  onOpenArticle: (article: Article) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onRemoveBookmark,
  onClearAll,
  onOpenArticle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Saved Mining Articles
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {bookmarkedArticles.length} {bookmarkedArticles.length === 1 ? 'article' : 'articles'} bookmarked
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No saved articles yet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
                Click the bookmark icon on any mining news card to save it for reading later.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onClose();
                  onOpenArticle(art);
                }}
                className="group relative p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {art.region === 'india' ? '🇮🇳 India' : '🌍 Global'} • {art.source}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBookmark(art.id);
                    }}
                    title="Remove from saved"
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2 mb-1.5">
                  {art.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-amber-500" />
                    {formatDisplayDate(art.dateStr)}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5">
                    Read <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All Saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            >
              Close
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
