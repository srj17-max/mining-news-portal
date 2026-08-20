import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MiningPulse - Daily Mining News & Intelligence (India & Global)',
  description: 'Real-time mining industry news portal with automated daily updates, India vs Global country selector, and interactive date filtering.',
  keywords: ['Mining News', 'India Mining', 'Coal India', 'Lithium Mining', 'Critical Minerals', 'Iron Ore', 'BHP', 'Rio Tinto', 'Global Mining News', 'Mining Policy'],
  authors: [{ name: 'MiningPulse Intelligence' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased">
        {children}
      </body>
    </html>
  );
}
