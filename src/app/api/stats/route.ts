import { NextResponse } from 'next/server';
import { COMMODITY_PRICES, LME_OFFICIAL_METALS } from '@/data/initialNews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      commodities: COMMODITY_PRICES,
      lmeMetals: LME_OFFICIAL_METALS,
      exchange: 'London Metal Exchange (LME)',
      pricingSession: 'Official 2nd Ring Settlement Prices (USD/tonne)',
      timestamp: new Date().toISOString()
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }
  );
}

