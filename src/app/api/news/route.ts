import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveNews, queryArticles } from '@/lib/db';
import { Category, DateFilterPreset, Region } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regionParam = searchParams.get('region') as Region;
    const region: Region = regionParam === 'other' ? 'other' : 'india';
    const dateStr = searchParams.get('date') || undefined;
    const preset = (searchParams.get('preset') || undefined) as DateFilterPreset | undefined;
    const category = (searchParams.get('category') || 'all') as Category;
    const search = searchParams.get('search') || undefined;
    const refresh = searchParams.get('refresh') === 'true';

    // Optionally fetch live RSS
    if (refresh) {
      await fetchLiveNews(region, true);
    } else {
      // Background non-blocking check
      fetchLiveNews(region, false).catch(() => {});
    }

    const { articles, total, availableDates } = queryArticles({
      region,
      dateStr: dateStr && dateStr !== 'all' ? dateStr : undefined,
      preset,
      category,
      search,
      limit: 100
    });

    return NextResponse.json(
      {
        success: true,
        total,
        filteredCount: articles.length,
        articles,
        availableDates,
        lastUpdated: new Date().toISOString(),
        region
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
    console.error('API /api/news error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mining news' },
      { status: 500 }
    );
  }
}
