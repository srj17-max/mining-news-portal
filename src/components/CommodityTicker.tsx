'use client';

import React, { useEffect, useState } from 'react';
import { CommodityPrice } from '@/lib/types';
import { COMMODITY_PRICES } from '@/data/initialNews';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const CommodityTicker: React.FC = () => {
  const [prices, setPrices] = useState<CommodityPrice[]>(COMMODITY_PRICES);

  useEffect(() => {
    // Fetch live prices if endpoint available
    fetch('/api/stats', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data?.commodities) {
          setPrices(data.commodities);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 py-2.5 overflow-x-auto text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-6 min-w-max">
        
        {/* Label */}
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-amber-600 dark:text-amber-400 shrink-0">
          <Activity className="w-3.5 h-3.5" />
          <span>Mining Commodities</span>
        </div>

        <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 shrink-0" />

        {/* Commodity list */}
        <div className="flex items-center gap-4 sm:gap-6">
          {prices.map((item) => (
            <div key={item.symbol} className="flex items-center gap-1.5 shrink-0">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{item.name}:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{item.price}</span>
              <span className="text-[10px] text-slate-400">{item.unit}</span>
              <span
                className={`inline-flex items-center gap-0.5 font-mono text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                  item.isPositive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                    : 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                }`}
              >
                {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.change}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
