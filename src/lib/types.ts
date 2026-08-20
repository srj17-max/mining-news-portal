export type Region = 'india' | 'other';

export type Category = 
  | 'all' 
  | 'coal' 
  | 'critical_minerals' 
  | 'iron_ore' 
  | 'metals' 
  | 'precious_metals' 
  | 'policy' 
  | 'sustainability' 
  | 'technology';

export type DateFilterPreset = 'all' | 'today' | 'yesterday' | 'week' | 'month' | 'custom';

export interface Article {
  id: string;
  title: string;
  description: string;
  snippet: string;
  content?: string;
  url: string;
  source: string;
  sourceUrl?: string;
  publishedAt: string; // ISO 8601 string
  dateStr: string;     // YYYY-MM-DD format
  region: Region;
  category: Category;
  imageUrl?: string;
  readTime: number;    // In minutes
  tags: string[];
  sentiment?: 'positive' | 'neutral' | 'negative' | 'critical';
  location?: string;
  keyHighlights?: string[];
  executiveSummary?: string;
  marketImplications?: string;
  stakeholderImpact?: string;
  isFeatured?: boolean;
}

export interface DailySummary {
  date: string;
  region: Region;
  title: string;
  summaryText: string;
  topHeadlines: string[];
  marketTakeaway: string;
  keyStats: {
    totalArticles: number;
    topCommodity: string;
    criticalAlertsCount: number;
  };
}

export interface CommodityPrice {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  unit: string;
}

export interface NewsResponse {
  success: boolean;
  total: number;
  filteredCount: number;
  articles: Article[];
  availableDates: string[];
  lastUpdated: string;
  region: Region;
}
