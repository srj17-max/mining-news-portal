import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MiningPulse - Daily Mining News & Intelligence (India & Global)',
  description: 'Real-time mining industry intelligence hub with automated daily updates, India vs Global country selector, commodity prices, and interactive date filtering.',
  keywords: ['Mining News', 'India Mining', 'Coal India', 'Lithium Mining', 'Critical Minerals', 'Iron Ore', 'BHP', 'Rio Tinto', 'Global Mining News', 'Mining Policy', 'Mining Auctions'],
  authors: [{ name: 'MiningPulse Intelligence' }],
  metadataBase: new URL('https://customs-cole-treat-consumption.trycloudflare.com'),
  openGraph: {
    title: 'MiningPulse - Daily Mining News & Intelligence',
    description: 'Track daily mining news across India and Global markets with date filtering, executive briefings, and commodity tickers.',
    url: 'https://customs-cole-treat-consumption.trycloudflare.com',
    siteName: 'MiningPulse',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'MiningPulse Daily Intelligence Portal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiningPulse - Daily Mining News & Intelligence',
    description: 'Live automated mining intelligence portal for India and Global commodities.',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090d16',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: 'MiningPulse',
  url: 'https://customs-cole-treat-consumption.trycloudflare.com',
  logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=512&q=80',
  description: 'Daily automated mining industry intelligence platform covering Indian and international mineral sectors.',
  sameAs: ['https://github.com/srj17-max/mining-news-portal'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
