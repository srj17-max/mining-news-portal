import { Article, Category, Region } from './types';
import { formatISODate } from './dateUtils';

interface FeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  source?: string | { '#text': string; url?: string };
  enclosure?: { '@_url'?: string; '@_type'?: string };
  'media:content'?: { '@_url'?: string };
  guid?: string | { '#text': string };
}

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  all: [],
  coal: ['coal', 'lignite', 'coking coal', 'thermal coal', 'secl', 'mcl', 'ncl', 'singareni', 'colliery', 'pithead'],
  critical_minerals: ['lithium', 'rare earth', 'cobalt', 'graphite', 'nickel', 'vanadium', 'potash', 'niobium', 'titanium', 'tantalum', 'critical mineral', 'battery metal', 'dle'],
  iron_ore: ['iron ore', 'pellet', 'sponge iron', 'nmdc', 'bailadila', 'fortescue', 'fines', 'lumps', 'steelmaking', 'slurry pipeline'],
  metals: ['copper', 'bauxite', 'aluminum', 'aluminium', 'zinc', 'lead', 'vedanta', 'hindalco', 'nalco', 'smelter', 'refinery', 'smelting'],
  precious_metals: ['gold', 'silver', 'platinum', 'palladium', 'bullion', 'newmont', 'barrick', 'gold fields', 'anglogold', 'hutti', 'nugget'],
  policy: ['auction', 'concession', 'ministry of mines', 'pib', 'license', 'royalty', 'regulation', 'dgms', 'tribunal', 'm&a', 'acquisition', 'clearance', 'reforms', 'tender'],
  sustainability: ['green mining', 'esg', 'tailings', 'decarbonization', 'solar', 'reclamation', 'afforestation', 'emissions', 'electric truck', 'water conservation', 'dry stacking'],
  technology: ['ai', 'autonomous', 'drone', 'robot', 'radar', 'sensor', 'automation', 'software', 'geospatial', 'teleoperation', 'driverless']
};

const CATEGORY_IMAGES: Record<Category, string[]> = {
  all: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
  coal: [
    'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509390144018-eeaf4450ff71?auto=format&fit=crop&w=800&q=80'
  ],
  critical_minerals: [
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  ],
  iron_ore: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
  ],
  metals: [
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  ],
  precious_metals: [
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80'
  ],
  policy: [
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  ],
  sustainability: [
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  ],
  technology: [
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  ]
};

export function classifyCategory(text: string): Category {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (cat === 'all') continue;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        return cat as Category;
      }
    }
  }
  return 'metals';
}

export function extractSentiment(text: string): 'positive' | 'neutral' | 'negative' | 'critical' {
  const lower = text.toLowerCase();
  if (lower.includes('disaster') || lower.includes('fatal') || lower.includes('collapse') || lower.includes('illegal') || lower.includes('penalty')) {
    return 'critical';
  }
  if (lower.includes('strike') || lower.includes('protest') || lower.includes('delay') || lower.includes('deficit') || lower.includes('decline') || lower.includes('drop')) {
    return 'negative';
  }
  if (lower.includes('surge') || lower.includes('record') || lower.includes('discovery') || lower.includes('boost') || lower.includes('green') || lower.includes('growth') || lower.includes('approved') || lower.includes('profit')) {
    return 'positive';
  }
  return 'neutral';
}

export function cleanHtmlText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseXmlFeedFallback(xmlText: string, region: Region): Article[] {
  const articles: Article[] = [];
  const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/gi) || [];

  for (let i = 0; i < itemMatches.length; i++) {
    const itemStr = itemMatches[i];
    const titleMatch = itemStr.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = itemStr.match(/<link>([\s\S]*?)<\/link>/i);
    const pubDateMatch = itemStr.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    const descMatch = itemStr.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
    const sourceMatch = itemStr.match(/<source[^>]*>([\s\S]*?)<\/source>/i);

    const title = cleanHtmlText(titleMatch ? titleMatch[1] : '');
    if (!title) continue;

    const url = linkMatch ? linkMatch[1].trim() : '';
    const desc = cleanHtmlText(descMatch ? descMatch[1] : '');
    const source = sourceMatch ? cleanHtmlText(sourceMatch[1]) : (region === 'india' ? 'Mining News India' : 'Global Mining News');

    let pubDateObj = new Date();
    if (pubDateMatch && pubDateMatch[1]) {
      const parsed = new Date(pubDateMatch[1].trim());
      if (!isNaN(parsed.getTime())) {
        pubDateObj = parsed;
      }
    }

    const publishedAt = pubDateObj.toISOString();
    const dateStr = formatISODate(pubDateObj);
    let liveUrl = url;
    if (!liveUrl || !liveUrl.startsWith('http')) {
      liveUrl = `https://news.google.com/search?q=${encodeURIComponent(title)}`;
    }

    const fullText = `${title} ${desc}`;
    const category = classifyCategory(fullText);
    const sentiment = extractSentiment(fullText);

    // Pick visual image
    const imageList = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.all;
    const imageUrl = imageList[i % imageList.length];

    // Generate holistic summary sections
    const executiveSummary = desc.length > 20
      ? `${desc} This development marks a significant operational milestone for the ${category.replace('_', ' ')} sector with direct implications for domestic supply availability and downstream processing.`
      : `${title}. Key industry stakeholders are monitoring regulatory compliance, output yields, and logistical efficiency following this announcement.`;

    const marketImplications = region === 'india'
      ? `Strengthens domestic supply security, reduces reliance on raw commodity imports, and supports India's ambitious industrial expansion targets.`
      : `Influences global commodity benchmarks on the LME/COMEX and impacts international trade flows across key export corridors.`;

    const stakeholderImpact = region === 'india'
      ? `Impacts state mining departments, public sector undertakings (PSUs), domestic steel & power producers, and downstream manufacturers.`
      : `Relevant for tier-1 multinational miners, institutional commodity investors, equipment OEMs, and international trade regulators.`;

    const keyHighlights: string[] = [
      `Primary focus: ${title.split(' - ')[0].trim()}`,
      `Classified under ${category.replace('_', ' ').toUpperCase()} sector intelligence.`,
      `Verified via ${source} reporting network.`
    ];

    // Extract tags
    const tags: string[] = [];
    if (fullText.toLowerCase().includes('lithium')) tags.push('Lithium');
    if (fullText.toLowerCase().includes('coal')) tags.push('Coal');
    if (fullText.toLowerCase().includes('copper')) tags.push('Copper');
    if (fullText.toLowerCase().includes('iron')) tags.push('Iron Ore');
    if (fullText.toLowerCase().includes('gold')) tags.push('Gold');
    if (fullText.toLowerCase().includes('auction')) tags.push('Auctions');
    if (fullText.toLowerCase().includes('safety')) tags.push('Safety');
    if (fullText.toLowerCase().includes('esg') || fullText.toLowerCase().includes('green')) tags.push('ESG');
    if (tags.length === 0) tags.push(category.replace('_', ' ').toUpperCase());

    const readTime = Math.max(2, Math.min(8, Math.ceil(fullText.split(/\s+/).length / 40)));

    articles.push({
      id: `${region}-rss-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      description: desc || title,
      snippet: desc.length > 180 ? desc.substring(0, 180) + '...' : desc || title,
      url: liveUrl,
      source,
      publishedAt,
      dateStr,
      region,
      category,
      imageUrl,
      readTime,
      tags,
      sentiment,
      keyHighlights,
      executiveSummary,
      marketImplications,
      stakeholderImpact,
      isFeatured: i === 0
    });
  }

  return articles;
}
