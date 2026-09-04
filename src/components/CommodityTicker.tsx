'use client';

import React, { useEffect, useState } from 'react';
import { CommodityPrice, LMEMetalPrice } from '@/lib/types';
import { COMMODITY_PRICES, LME_OFFICIAL_METALS } from '@/data/initialNews';
import { TrendingUp, TrendingDown, Activity, Table, X, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

export const CommodityTicker: React.FC = () => {
  const [prices, setPrices] = useState<CommodityPrice[]>(COMMODITY_PRICES);
  const [lmeMetals, setLmeMetals] = useState<LMEMetalPrice[]>(LME_OFFICIAL_METALS);
  const [filterMode, setFilterMode] = useState<'all' | 'lme'>('all');
  const [isLmeModalOpen, setIsLmeModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/stats', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data?.commodities) {
          setPrices(data.commodities);
        }
        if (data?.lmeMetals) {
          setLmeMetals(data.lmeMetals);
        }
      })
      .catch(() => {});
  }, []);

  const displayedPrices = filterMode === 'lme' 
    ? prices.filter(p => p.isLME) 
    : prices;

  return (
    <>
      <div className="w-full bg-slate-100/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 py-2.5 overflow-x-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 min-w-max">
          
          <div className="flex items-center gap-3">
            {/* Label */}
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-amber-600 dark:text-amber-400 shrink-0">
              <Activity className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span>Metal & Commodity Benchmarks</span>
            </div>

            {/* Quick Filter Pill */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-900 rounded-lg p-0.5 text-[10px] font-semibold">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  filterMode === 'all' 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                All (10)
              </button>
              <button
                onClick={() => setFilterMode('lme')}
                className={`px-2 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                  filterMode === 'lme' 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <span>LME Only (6)</span>
              </button>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 shrink-0" />

          {/* Commodity Horizontal Scroller */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-0.5">
            {displayedPrices.map((item) => (
              <div 
                key={item.symbol} 
                className="flex items-center gap-1.5 shrink-0 bg-white/70 dark:bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800/60"
              >
                {item.isLME && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-1 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    LME
                  </span>
                )}
                <span className="font-semibold text-slate-700 dark:text-slate-300">{item.name}:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{item.price}</span>
                {item.threeMonthPrice && (
                  <span className="text-[10px] text-slate-500 font-mono" title="3-Month Forward Contract">
                    (3M: {item.threeMonthPrice})
                  </span>
                )}
                <span className="text-[10px] text-slate-400">{item.unit}</span>
                <span
                  className={`inline-flex items-center gap-0.5 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.isPositive
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10'
                      : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                  }`}
                >
                  {item.isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          {/* Open Detailed LME Board Button */}
          <button
            onClick={() => setIsLmeModalOpen(true)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/25 transition-all shrink-0 ml-2"
            title="Open London Metal Exchange Official Settlement Board"
          >
            <Table className="w-3.5 h-3.5" />
            <span>LME Official Board</span>
          </button>

        </div>
      </div>

      {/* LME Official Board Modal */}
      {isLmeModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsLmeModalOpen(false)}
        >
          <div 
            className="w-full max-w-3xl bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      London Metal Exchange (LME) Official Prices
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Official
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official Reference Settlement Prices determined during the 2nd Ring session (USD/Metric Tonne)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLmeModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close LME Board"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Table Content */}
            <div className="p-5 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="pb-3 pl-1">Metal Contract</th>
                    <th className="pb-3 text-right">Cash Bid / Ask</th>
                    <th className="pb-3 text-right">Cash Settlement</th>
                    <th className="pb-3 text-right">3-Month Forward</th>
                    <th className="pb-3 text-right">Day Chg</th>
                    <th className="pb-3 pr-1 text-right">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {lmeMetals.map((metal) => (
                    <tr key={metal.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 pl-1 font-sans font-bold text-slate-900 dark:text-white">
                        {metal.metal}
                      </td>
                      <td className="py-3 text-right text-slate-600 dark:text-slate-400">
                        {metal.cashBid} / {metal.cashAsk}
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900 dark:text-amber-400">
                        {metal.cashSettlement}
                      </td>
                      <td className="py-3 text-right text-slate-700 dark:text-slate-300">
                        {metal.threeMonthSettlement}
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                          metal.isPositive 
                            ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10' 
                            : 'text-rose-700 dark:text-rose-400 bg-rose-500/10'
                        }`}>
                          {metal.isPositive ? '+' : ''}{metal.change}
                        </span>
                      </td>
                      <td className="py-3 pr-1 text-right text-[11px] text-slate-400">
                        USD / tonne
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Note / Source Footer */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>
                    <strong className="text-slate-700 dark:text-slate-300">Official Price Determination:</strong> LME Official Prices are the definitive global benchmark for non-ferrous physical trade, settled daily by the London Metal Exchange Quotations Committee following the conclusion of open outcry trading in the second Ring session.
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[10px]">
                    <span>Source: London Metal Exchange Official Daily Reference</span>
                    <span>•</span>
                    <a 
                      href="https://www.lme.com/en/Metals/Non-ferrous" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                      Official LME Portal <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Currency: USD • Base weight: 1,000 kg (Metric Tonne)
              </span>
              <button
                onClick={() => setIsLmeModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
              >
                Close Table
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
