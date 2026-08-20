'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('MiningPulse Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-5">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
        System Interruption
      </span>

      <h2 className="text-2xl sm:text-3xl font-black mb-3 text-slate-900 dark:text-white">
        Mining Feed Temporarily Disrupted
      </h2>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-8">
        An unexpected error occurred while processing intelligence streams. You can retry the connection or return to the main dashboard.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
