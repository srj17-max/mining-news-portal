import React from 'react';
import Link from 'next/link';
import { Pickaxe, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6 shadow-xl shadow-amber-500/10">
        <Pickaxe className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-slate-900 via-amber-600 to-amber-500 dark:from-white dark:via-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
        Mineral Deposit Not Located
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mb-8">
        The mining news page or archive link you requested does not exist or has been relocated to our live intelligence feed.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
      >
        <Home className="w-4 h-4" />
        <span>Return to Mining Dashboard</span>
      </Link>
    </div>
  );
}
