'use client';

import React from 'react';
import { DateFilterPreset } from '@/lib/types';
import { Calendar, Search, X, Clock, CalendarDays, ChevronDown, Filter } from 'lucide-react';
import { formatDisplayDate, getTodayDateStr, getYesterdayDateStr } from '@/lib/dateUtils';

interface DateFilterBarProps {
  selectedPreset: DateFilterPreset;
  onSelectPreset: (preset: DateFilterPreset) => void;
  selectedDate: string; // YYYY-MM-DD or 'all'
  onSelectDate: (dateStr: string) => void;
  availableDates: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFilteredCount: number;
  onResetFilters: () => void;
}

export const DateFilterBar: React.FC<DateFilterBarProps> = ({
  selectedPreset,
  onSelectPreset,
  selectedDate,
  onSelectDate,
  availableDates,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
  onResetFilters
}) => {
  const todayStr = getTodayDateStr();
  const yesterdayStr = getYesterdayDateStr();

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      onSelectPreset('custom');
      onSelectDate(val);
    }
  };

  const isCustomDate = selectedPreset === 'custom' && selectedDate !== 'all';
  const hasActiveFilters = searchQuery !== '' || selectedPreset !== 'today' || selectedDate !== todayStr;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
      
      {/* Top Row: Date Presets + Calendar Input + Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
        
        {/* Preset Date Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Timeline:</span>
          </div>

          <button
            onClick={() => {
              onSelectPreset('today');
              onSelectDate(todayStr);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPreset === 'today'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Today
          </button>

          <button
            onClick={() => {
              onSelectPreset('yesterday');
              onSelectDate(yesterdayStr);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPreset === 'yesterday'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Yesterday
          </button>

          <button
            onClick={() => {
              onSelectPreset('week');
              onSelectDate('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPreset === 'week'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Past 7 Days
          </button>

          <button
            onClick={() => {
              onSelectPreset('month');
              onSelectDate('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPreset === 'month'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Past 30 Days
          </button>

          <button
            onClick={() => {
              onSelectPreset('all');
              onSelectDate('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPreset === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All News
          </button>
        </div>

        {/* Right side: Specific Calendar Date Picker + Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          
          {/* Custom Date Input */}
          <div className="relative flex items-center">
            <div className="absolute left-3 pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <input
              type="date"
              value={selectedDate !== 'all' ? selectedDate : ''}
              onChange={handleDateInputChange}
              max={todayStr}
              title="Select specific date"
              className={`w-full sm:w-44 pl-9 pr-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                isCustomDate
                  ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-amber-300 ring-1 ring-amber-500'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
              } focus:outline-none focus:ring-2 focus:ring-amber-500`}
            />
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-60">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search news, mineral, company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Bottom Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Showing {totalFilteredCount} {totalFilteredCount === 1 ? 'article' : 'articles'}
          </span>
          <span>•</span>
          <span>
            {selectedPreset === 'today' && `Today (${formatDisplayDate(todayStr)})`}
            {selectedPreset === 'yesterday' && `Yesterday (${formatDisplayDate(yesterdayStr)})`}
            {selectedPreset === 'week' && 'Past 7 Days'}
            {selectedPreset === 'month' && 'Past 30 Days'}
            {selectedPreset === 'all' && 'All Historic Mining News'}
            {selectedPreset === 'custom' && selectedDate !== 'all' && `Date: ${formatDisplayDate(selectedDate)}`}
          </span>
          {searchQuery && (
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded text-[11px] font-medium">
              Filter: "{searchQuery}"
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <X className="w-3 h-3" /> Reset Filters to Today
          </button>
        )}

      </div>

    </div>
  );
};
