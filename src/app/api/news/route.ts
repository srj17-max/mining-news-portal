import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveNews, queryArticles } from '@/lib/db';
import { Category, DateFilterPreset, Region } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// In-memory IP rate limiter: max 40 requests per minute
const requestCounts = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string, limit = 40, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.expiresAt) {
    requestCounts.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) {
    return false;
  }
  entry.count++;
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Rate limit exceeded.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
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
