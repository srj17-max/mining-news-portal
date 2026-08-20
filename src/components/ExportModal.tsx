'use client';

import React, { useState } from 'react';
import { Article, DailySummary, Region } from '@/lib/types';
import { X, Download, Copy, Check, Printer, FileSpreadsheet } from 'lucide-react';
import { formatDisplayDate } from '@/lib/dateUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  summary: DailySummary | null;
  selectedDate: string;
  region: Region;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  articles,
  summary,
  selectedDate,
  region
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const regionLabel = region === 'india' ? 'India Mining Industry' : 'Global Mining Industry';
  const dateTitle = selectedDate === 'all' ? 'All Mining News' : formatDisplayDate(selectedDate);

  // Generate plain text report
  const generateTextReport = () => {
    let report = `=====================================================\n`;
    report += `MININGPULSE DAILY INTELLIGENCE DIGEST\n`;
    report += `Region: ${regionLabel}\n`;
    report += `Date: ${dateTitle}\n`;
    report += `Total Articles: ${articles.length}\n`;
    report += `=====================================================\n\n`;

    if (summary) {
      report += `EXECUTIVE SUMMARY:\n`;
      report += `${summary.summaryText}\n\n`;
      report += `MARKET TAKEAWAY:\n`;
      report += `${summary.marketTakeaway}\n\n`;
      if (summary.topHeadlines.length > 0) {
        report += `TOP HEADLINES:\n`;
        summary.topHeadlines.forEach((h, i) => {
          report += `  ${i + 1}. ${h}\n`;
        });
        report += `\n`;
      }
      report += `-----------------------------------------------------\n\n`;
    }

    report += `CURATED ARTICLES:\n\n`;
    articles.forEach((art, index) => {
      report += `[${index + 1}] ${art.title}\n`;
      report += `Source: ${art.source} | Published: ${art.dateStr}\n`;
      report += `Category: ${art.category.toUpperCase()} | URL: ${art.url}\n`;
      report += `Summary: ${art.snippet || art.description}\n\n`;
    });

    return report;
  };

  // Copy report to clipboard
  const handleCopy = () => {
    const text = generateTextReport();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download CSV
  const handleDownloadCsv = () => {
    const headers = ['Title', 'Source', 'Date', 'Region', 'Category', 'URL', 'Summary'];
    const rows = articles.map(a => [
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.source.replace(/"/g, '""')}"`,
      `"${a.dateStr}"`,
      `"${a.region}"`,
      `"${a.category}"`,
      `"${a.url}"`,
      `"${(a.snippet || a.description).replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mining_digest_${region}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-10 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Export Daily Mining Digest
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {regionLabel} • {dateTitle} ({articles.length} articles)
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          
          {/* Option 1: Copy Text Report */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 hover:border-amber-500/30 border border-slate-200 dark:border-slate-700/60 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500">
                  {copied ? 'Copied to Clipboard!' : 'Copy Formatted Executive Brief'}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Formatted plain text with summary, market takeaways & bulleted stories.
                </p>
              </div>
            </div>
          </button>

          {/* Option 2: Download CSV */}
          <button
            onClick={handleDownloadCsv}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 hover:border-amber-500/30 border border-slate-200 dark:border-slate-700/60 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500">
                  Download CSV Data Table
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Raw dataset compatible with Excel, Google Sheets, and Business Intelligence.
                </p>
              </div>
            </div>
          </button>

          {/* Option 3: Print / Save to PDF */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 hover:border-amber-500/30 border border-slate-200 dark:border-slate-700/60 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-500">
                  Print or Save as PDF Document
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Generates clean printable layout ready for filing or distribution.
                </p>
              </div>
            </div>
          </button>

        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
