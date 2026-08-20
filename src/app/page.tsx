'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { RegionToggle } from '@/components/RegionToggle';
import { CommodityTicker } from '@/components/CommodityTicker';
import { DateFilterBar } from '@/components/DateFilterBar';
import { CategoryPills } from '@/components/CategoryPills';
import { ExecutiveBriefing } from '@/components/ExecutiveBriefing';
import { NewsGrid } from '@/components/NewsGrid';
import { ArticleModal } from '@/components/ArticleModal';
import { BookmarksDrawer } from '@/components/BookmarksDrawer';
import { ExportModal } from '@/components/ExportModal';
import { Article, Category, DateFilterPreset, Region, DailySummary } from '@/lib/types';
import { getTodayDateStr } from '@/lib/dateUtils';
import { INITIAL_ARTICLES } from '@/data/initialNews';
import { WifiOff } from 'lucide-react';

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('india');
  const [selectedPreset, setSelectedPreset] = useState<DateFilterPreset>('today');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateStr());
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [articles, setArticles] = useState<Article[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Bookmarks
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Modals state
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Network offline listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) setIsOffline(true);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('miningpulse_bookmarks');
      if (saved) {
        const parsed: Article[] = JSON.parse(saved);
        setBookmarkedArticles(parsed);
        setBookmarkedIds(new Set(parsed.map(a => a.id)));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  }, []);

  // Fetch articles when filters change
  const fetchNews = async (forceRefresh = false) => {
    if (forceRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set('region', selectedRegion);
      if (selectedPreset !== 'custom') {
        params.set('preset', selectedPreset);
      } else if (selectedDate !== 'all') {
        params.set('date', selectedDate);
      }

      if (selectedCategory !== 'all') {
        params.set('category', selectedCategory);
      }

      if (searchQuery.trim() !== '') {
        const sanitizedSearch = searchQuery.replace(/[^\w\s-]/gi, '').trim();
        params.set('search', sanitizedSearch);
      }

      if (forceRefresh) {
        params.set('refresh', 'true');
      }

      const res = await fetch(`/api/news?${params.toString()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setArticles(data.articles || []);
          setAvailableDates(data.availableDates || []);
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback filter over initial data
      const fallback = INITIAL_ARTICLES.filter(a => a.region === selectedRegion);
      setArticles(fallback);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch summary briefing
  const fetchSummary = async () => {
    try {
      const dateToFetch = selectedDate !== 'all' ? selectedDate : getTodayDateStr();
      const res = await fetch(`/api/summary?region=${selectedRegion}&date=${dateToFetch}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSummary(data.briefing);
        }
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  // Fetch news when dependencies change
  useEffect(() => {
    fetchNews();
    fetchSummary();
  }, [selectedRegion, selectedPreset, selectedDate, selectedCategory, searchQuery]);

  // Counts for region toggle badges
  const indiaTotalCount = INITIAL_ARTICLES.filter(a => a.region === 'india').length;
  const otherTotalCount = INITIAL_ARTICLES.filter(a => a.region === 'other').length;

  // Toggle bookmark handler
  const handleToggleBookmark = (article: Article) => {
    let updated: Article[];
    if (bookmarkedIds.has(article.id)) {
      updated = bookmarkedArticles.filter(a => a.id !== article.id);
    } else {
      updated = [article, ...bookmarkedArticles];
    }
    setBookmarkedArticles(updated);
    setBookmarkedIds(new Set(updated.map(a => a.id)));
    try {
      localStorage.setItem('miningpulse_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save bookmark', e);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarkedArticles.filter(a => a.id !== id);
    setBookmarkedArticles(updated);
    setBookmarkedIds(new Set(updated.map(a => a.id)));
    try {
      localStorage.setItem('miningpulse_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update bookmarks', e);
    }
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedArticles([]);
    setBookmarkedIds(new Set());
    try {
      localStorage.removeItem('miningpulse_bookmarks');
    } catch (e) {}
  };

  const handleResetFilters = () => {
    setSelectedPreset('today');
    setSelectedDate(getTodayDateStr());
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      <div>
        {/* Offline Banner */}
        {isOffline && (
          <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-md">
            <WifiOff className="w-4 h-4" />
            <span>You are currently in offline mode. Viewing cached mining intelligence database.</span>
          </div>
        )}

        {/* Navigation Header */}
        <Header
          onRefresh={() => fetchNews(true)}
          isRefreshing={isRefreshing}
          bookmarkCount={bookmarkedArticles.length}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
        />

        {/* 2-Option Country / Region Toggle (India vs Other Countries) */}
        <RegionToggle
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => {
            setSelectedRegion(reg);
            setSelectedCategory('all');
          }}
          indiaCount={indiaTotalCount}
          otherCount={otherTotalCount}
        />

        {/* Live Mining Commodity Prices Bar */}
        <CommodityTicker />

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          
          {/* Date Picker & Quick Filter Presets Bar */}
          <DateFilterBar
            selectedPreset={selectedPreset}
            onSelectPreset={setSelectedPreset}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            availableDates={availableDates}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalFilteredCount={articles.length}
            onResetFilters={handleResetFilters}
          />

          {/* Category / Mineral Pills */}
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Executive Intelligence Briefing */}
          <ExecutiveBriefing
            summary={summary}
            dateStr={selectedDate !== 'all' ? selectedDate : getTodayDateStr()}
            region={selectedRegion}
          />

          {/* News Feed Grid */}
          <section aria-label="Mining News Feed" className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{selectedRegion === 'india' ? '🇮🇳 Indian Mining Dispatch' : '🌍 Global Mining Dispatch'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Curated daily mining intelligence, regulatory updates, and commodity discoveries
                </p>
              </div>
            </div>

            <NewsGrid
              articles={articles}
              isLoading={isLoading}
              onOpenArticle={setActiveArticle}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onResetFilters={handleResetFilters}
              onRefresh={() => fetchNews(true)}
            />
          </section>

        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">MININGPULSE</span>
            <span>• Daily Mining News & Intelligence Hub</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>🇮🇳 India Coverage: Ministry of Mines, Coal India, NMDC, State Auctions</span>
            <span>|</span>
            <span>🌍 Global Coverage: BHP, Rio Tinto, Chile Lithium, LME</span>
          </div>
        </div>
      </footer>

      {/* Article Detail Reading Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        isBookmarked={activeArticle ? bookmarkedIds.has(activeArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
        onOpenArticle={setActiveArticle}
      />

      {/* Export Daily Digest Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        articles={articles}
        summary={summary}
        selectedDate={selectedDate}
        region={selectedRegion}
      />

    </div>
  );
}
