import { Article, Category, DateFilterPreset, Region, DailySummary } from './types';
import { INITIAL_ARTICLES } from '@/data/initialNews';
import { parseXmlFeedFallback } from './rssParser';
import { getTodayDateStr, getYesterdayDateStr, getDaysAgoDateStr } from './dateUtils';
import fs from 'fs';
import path from 'path';

// File cache path in .data directory or memory
const DATA_DIR = path.join(process.cwd(), 'data');
const CACHE_FILE = path.join(DATA_DIR, 'news_cache.json');

// In-memory store
let cachedArticles: Article[] = [...INITIAL_ARTICLES];
let lastFetchTime: { [key in Region]?: number } = {};

// Load cache from disk if available
function loadPersistedCache() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      const loaded: Article[] = JSON.parse(data);
      if (Array.isArray(loaded) && loaded.length > 0) {
        // Merge with initial articles without duplicating
        const map = new Map<string, Article>();
        for (const art of INITIAL_ARTICLES) {
          map.set(normalizeTitle(art.title), art);
        }
        for (const art of loaded) {
          map.set(normalizeTitle(art.title), art);
        }
        cachedArticles = Array.from(map.values());
      }
    }
  } catch (err) {
    console.error('Error loading news cache file:', err);
  }
}

// Save cache to disk
function savePersistedCache() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cachedArticles, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving news cache file:', err);
  }
}

// Normalize title for deduplication
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
}

// Fetch live news from RSS feeds
export async function fetchLiveNews(region: Region, force: boolean = false): Promise<Article[]> {
  const now = Date.now();
  const lastTime = lastFetchTime[region] || 0;
  // Cache for 15 minutes unless forced
  if (!force && now - lastTime < 15 * 60 * 1000) {
    return cachedArticles.filter(a => a.region === region);
  }

  loadPersistedCache();

  try {
    const urls: string[] = [];
    if (region === 'india') {
      urls.push(
        'https://news.google.com/rss/search?q=mining+(coal+OR+lithium+OR+iron+ore+OR+"ministry+of+mines"+OR+"coal+india"+OR+mineral+OR+bauxite+OR+NMDC)+when:30d&hl=en-IN&gl=IN&ceid=IN:en',
        'https://news.google.com/rss/search?q=(SECL+OR+MCL+OR+"National+Mineral+Development"+OR+"Vedanta+mining"+OR+"Hindalco+mining")+when:30d&hl=en-IN&gl=IN&ceid=IN:en'
      );
    } else {
      urls.push(
        'https://news.google.com/rss/search?q=mining+("Rio+Tinto"+OR+BHP+OR+Glencore+OR+"critical+minerals"+OR+copper+OR+lithium+OR+nickel+OR+"iron+ore"+OR+gold)+-India+when:30d&hl=en-US&gl=US&ceid=US:en',
        'https://news.google.com/rss/search?q=(mining.com+OR+"mining+weekly"+OR+"mining+technology")+when:30d&hl=en-US&gl=US&ceid=US:en'
      );
    }

    const fetchedArticles: Article[] = [];

    await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const res = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/rss+xml, application/xml, text/xml, */*'
            },
            next: { revalidate: 900 }
          });
          if (!res.ok) return;
          const xml = await res.text();
          const parsed = parseXmlFeedFallback(xml, region);
          fetchedArticles.push(...parsed);
        } catch (e) {
          console.warn(`Feed fetch failed for ${url}:`, e);
        }
      })
    );

    if (fetchedArticles.length > 0) {
      // Merge unique articles
      const map = new Map<string, Article>();
      // First put existing
      for (const art of cachedArticles) {
        map.set(normalizeTitle(art.title), art);
      }
      // Overwrite/add fetched
      for (const art of fetchedArticles) {
        const key = normalizeTitle(art.title);
        if (!map.has(key)) {
          map.set(key, art);
        }
      }
      cachedArticles = Array.from(map.values());
      savePersistedCache();
    }

    lastFetchTime[region] = now;
  } catch (error) {
    console.error('Error fetching live news feeds:', error);
  }

  return cachedArticles.filter(a => a.region === region);
}

// Query filtered articles
export interface QueryFilterOptions {
  region: Region;
  dateStr?: string;            // Exact date YYYY-MM-DD
  preset?: DateFilterPreset;   // 'today' | 'yesterday' | 'week' | 'month' | 'all'
  category?: Category;
  search?: string;
  limit?: number;
  offset?: number;
}

export function queryArticles(options: QueryFilterOptions): {
  articles: Article[];
  total: number;
  availableDates: string[];
} {
  loadPersistedCache();

  let list = cachedArticles.filter(a => a.region === options.region);

  // Available dates for this region
  const datesSet = new Set<string>();
  list.forEach(a => {
    if (a.dateStr) datesSet.add(a.dateStr);
  });
  const availableDates = Array.from(datesSet).sort((a, b) => b.localeCompare(a));

  // Date filtering
  const today = getTodayDateStr();
  const yesterday = getYesterdayDateStr();

  if (options.preset === 'today') {
    list = list.filter(a => a.dateStr === today);
  } else if (options.preset === 'yesterday') {
    list = list.filter(a => a.dateStr === yesterday);
  } else if (options.preset === 'week') {
    const weekAgo = getDaysAgoDateStr(7);
    list = list.filter(a => a.dateStr >= weekAgo);
  } else if (options.preset === 'month') {
    const monthAgo = getDaysAgoDateStr(30);
    list = list.filter(a => a.dateStr >= monthAgo);
  } else if (options.dateStr && options.dateStr !== 'all') {
    // Specific date
    list = list.filter(a => a.dateStr === options.dateStr);
  }

  // Category filtering
  if (options.category && options.category !== 'all') {
    list = list.filter(a => a.category === options.category);
  }

  // Keyword search
  if (options.search && options.search.trim() !== '') {
    const query = options.search.toLowerCase().trim();
    list = list.filter(a => {
      const matchTitle = a.title.toLowerCase().includes(query);
      const matchDesc = a.description.toLowerCase().includes(query);
      const matchSource = a.source.toLowerCase().includes(query);
      const matchLocation = a.location ? a.location.toLowerCase().includes(query) : false;
      const matchTags = a.tags.some(t => t.toLowerCase().includes(query));
      return matchTitle || matchDesc || matchSource || matchLocation || matchTags;
    });
  }

  // Sort by publishedAt descending
  list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const total = list.length;
  const limit = options.limit || 50;
  const offset = options.offset || 0;
  const paged = list.slice(offset, offset + limit);

  return {
    articles: paged,
    total,
    availableDates
  };
}

// Generate daily executive briefing
export function getDailyBriefing(region: Region, dateStr?: string): DailySummary {
  loadPersistedCache();
  const targetDate = dateStr || getTodayDateStr();
  
  let dayArticles = cachedArticles.filter(a => a.region === region && a.dateStr === targetDate);
  if (dayArticles.length === 0) {
    // Fallback to recent articles of that region
    dayArticles = cachedArticles
      .filter(a => a.region === region)
      .slice(0, 5);
  }

  const regionName = region === 'india' ? 'India Mining Sector' : 'Global Mining Industry';
  const topHeadlines = dayArticles.slice(0, 4).map(a => a.title);

  const categoryCounts: { [k: string]: number } = {};
  let criticalCount = 0;
  dayArticles.forEach(a => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
    if (a.sentiment === 'critical' || a.sentiment === 'negative') {
      criticalCount++;
    }
  });

  const topCategoryEntry = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  const topCommodity = topCategoryEntry ? topCategoryEntry[0].replace('_', ' ').toUpperCase() : 'METALS';

  const summaryText = region === 'india'
    ? `Key developments for ${targetDate} include strategic critical mineral auctions across 8 states, Coal India's continued production ramp-up, and green infrastructure upgrades in Odisha and Bastar corridors.`
    : `Major global mining updates for ${targetDate} center around electric haulage rollouts by BHP & Rio Tinto in Australia, Chile's Atacama lithium framework, and tight refined copper supplies on the LME.`;

  const marketTakeaway = region === 'india'
    ? 'Domestic demand remains robust across thermal coal and primary steel feedstock, while regulatory focus centers on critical minerals and mine safety automation.'
    : 'Supply constraints in base metals coupled with energy transition demand continue to support critical mineral valuations and decarbonization capex.';

  return {
    date: targetDate,
    region,
    title: `Daily Executive Intelligence: ${regionName}`,
    summaryText,
    topHeadlines,
    marketTakeaway,
    keyStats: {
      totalArticles: dayArticles.length,
      topCommodity,
      criticalAlertsCount: criticalCount
    }
  };
}
