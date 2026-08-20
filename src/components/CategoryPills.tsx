'use client';

import React from 'react';
import { Category } from '@/lib/types';
import { 
  Layers, 
  Flame, 
  BatteryCharging, 
  Layers2, 
  Box, 
  Coins, 
  FileText, 
  Leaf, 
  Cpu 
} from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  categoryCounts?: Partial<Record<Category, number>>;
}

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'all', label: 'All Topics', icon: <Layers className="w-3.5 h-3.5" />, color: 'text-amber-500' },
  { id: 'coal', label: 'Coal & Lignite', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-orange-500' },
  { id: 'critical_minerals', label: 'Lithium & Critical', icon: <BatteryCharging className="w-3.5 h-3.5" />, color: 'text-emerald-500' },
  { id: 'iron_ore', label: 'Iron Ore & Steel', icon: <Layers2 className="w-3.5 h-3.5" />, color: 'text-red-500' },
  { id: 'metals', label: 'Base Metals (Copper/Al)', icon: <Box className="w-3.5 h-3.5" />, color: 'text-cyan-500' },
  { id: 'precious_metals', label: 'Gold & Precious', icon: <Coins className="w-3.5 h-3.5" />, color: 'text-yellow-400' },
  { id: 'policy', label: 'Policies & Auctions', icon: <FileText className="w-3.5 h-3.5" />, color: 'text-blue-500' },
  { id: 'sustainability', label: 'ESG & Green Mining', icon: <Leaf className="w-3.5 h-3.5" />, color: 'text-green-500' },
  { id: 'technology', label: 'AI & Mine Tech', icon: <Cpu className="w-3.5 h-3.5" />, color: 'text-purple-500' },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts ? categoryCounts[cat.id] : undefined;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md ring-2 ring-amber-500/40'
                  : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span className={isSelected ? 'text-amber-400 dark:text-amber-600' : cat.color}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
