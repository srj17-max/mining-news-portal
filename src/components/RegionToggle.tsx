'use client';

import React from 'react';
import { Region } from '@/lib/types';
import { Globe, MapPin, Sparkles, Building2, Flame } from 'lucide-react';

interface RegionToggleProps {
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  indiaCount?: number;
  otherCount?: number;
}

export const RegionToggle: React.FC<RegionToggleProps> = ({
  selectedRegion,
  onSelectRegion,
  indiaCount,
  otherCount
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-amber-500/5 via-slate-100/50 to-transparent dark:from-amber-500/10 dark:via-slate-900/40 dark:to-transparent py-4 sm:py-6 border-b border-slate-200/80 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Selector Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Region Selector
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">• 2 Focus Modes</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              Select Mining Region Coverage
            </h2>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Switch between Indian Domestic Mining & International Mining Markets
          </div>
        </div>

        {/* 2-Option Segmented Control Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-1.5 bg-slate-200/70 dark:bg-slate-900/80 rounded-2xl border border-slate-300/80 dark:border-slate-800 shadow-inner">
          
          {/* OPTION 1: INDIA */}
          <button
            onClick={() => onSelectRegion('india')}
            className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-200 text-left ${
              selectedRegion === 'india'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md shadow-amber-500/5 ring-2 ring-amber-500/80'
                : 'hover:bg-white/60 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Flag / Icon Avatar */}
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-xl text-xl font-bold transition-transform group-hover:scale-105 ${
                  selectedRegion === 'india'
                    ? 'bg-amber-500/15 border border-amber-500/30'
                    : 'bg-slate-100 dark:bg-slate-800/80'
                }`}
              >
                🇮🇳
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    India Mining News
                  </span>
                  {selectedRegion === 'india' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500 text-slate-950">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  Coal India, NMDC, Ministry of Mines, Critical Mineral Auctions, State Leases
                </p>
              </div>
            </div>

            {/* Counts Badge */}
            {typeof indiaCount === 'number' && (
              <div className="hidden sm:flex flex-col items-end">
                <span className={`text-sm font-bold ${selectedRegion === 'india' ? 'text-amber-500' : 'text-slate-400'}`}>
                  {indiaCount}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Articles</span>
              </div>
            )}
          </button>

          {/* OPTION 2: OTHER COUNTRIES */}
          <button
            onClick={() => onSelectRegion('other')}
            className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-200 text-left ${
              selectedRegion === 'other'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md shadow-amber-500/5 ring-2 ring-amber-500/80'
                : 'hover:bg-white/60 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Globe Icon Avatar */}
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-xl text-xl font-bold transition-transform group-hover:scale-105 ${
                  selectedRegion === 'other'
                    ? 'bg-blue-500/15 border border-blue-500/30'
                    : 'bg-slate-100 dark:bg-slate-800/80'
                }`}
              >
                🌍
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Other Countries / Global
                  </span>
                  {selectedRegion === 'other' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500 text-white">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  BHP, Rio Tinto, Glencore, Australia, Chile, Canada, Africa, LME Metal Trends
                </p>
              </div>
            </div>

            {/* Counts Badge */}
            {typeof otherCount === 'number' && (
              <div className="hidden sm:flex flex-col items-end">
                <span className={`text-sm font-bold ${selectedRegion === 'other' ? 'text-blue-400' : 'text-slate-400'}`}>
                  {otherCount}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Articles</span>
              </div>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
