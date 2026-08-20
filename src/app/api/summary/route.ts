import { NextRequest, NextResponse } from 'next/server';
import { getDailyBriefing } from '@/lib/db';
import { Region } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regionParam = searchParams.get('region') as Region;
    const region: Region = regionParam === 'other' ? 'other' : 'india';
    const dateStr = searchParams.get('date') || undefined;

    const briefing = getDailyBriefing(region, dateStr);

    return NextResponse.json(
      {
        success: true,
        briefing
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error('API /api/summary error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
