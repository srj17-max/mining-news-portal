'use client';

import React, { useEffect, useState } from 'react';
import { Pickaxe, RefreshCw, Bookmark, Download, Sun, Moon, Radio, Sparkles } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenExport: () => void;
  lastUpdated?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  isRefreshing,
  bookmarkCount,
  onOpenBookmarks,
  onOpenExport,
}) => {
  const [isDark, setIsDark] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/85 dark:bg-[#0b1120]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <Pickaxe className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-amber-700 to-amber-600 dark:from-white dark:via-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
                  MINING<span className="text-amber-500">PULSE</span>
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Radio className="w-2.5 h-2.5 animate-pulse" /> Live Feeds
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Daily Mining & Mineral Intelligence Hub
              </p>
            </div>
          </div>

          {/* Center Clock (Desktop) */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
              {currentTime || 'Loading date...'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Automated Daily Ingestion Active
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Sync / Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Sync and refresh live mining news"
              title="Sync latest live mining news"
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync News'}</span>
            </button>

            {/* Export Daily Digest */}
            <button
              onClick={onOpenExport}
              aria-label="Export selected day's mining digest"
              title="Export selected day's mining digest"
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Export Digest</span>
            </button>

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              aria-label={`View saved articles (${bookmarkCount} saved)`}
              title="View saved mining articles"
              className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-amber-500 rounded-full shadow-sm">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title="Toggle theme"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
