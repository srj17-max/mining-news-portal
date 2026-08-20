import { NextResponse } from 'next/server';
import { COMMODITY_PRICES } from '@/data/initialNews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      commodities: COMMODITY_PRICES,
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
