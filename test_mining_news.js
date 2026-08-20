const { queryArticles, getDailyBriefing } = require('./src/lib/db');
const { parseXmlFeedFallback } = require('./src/lib/rssParser');

console.log('--- STARTING MINING NEWS PORTAL TESTS ---');

// Test 1: India Mining Articles
const indiaRes = queryArticles({ region: 'india', preset: 'all' });
console.log(`[TEST 1] India articles loaded: ${indiaRes.articles.length} (Total: ${indiaRes.total})`);
if (indiaRes.articles.length === 0) throw new Error('Failed: No India articles found');
console.log(`✓ Sample India Title: "${indiaRes.articles[0].title}"`);

// Test 2: Other Countries Mining Articles
const otherRes = queryArticles({ region: 'other', preset: 'all' });
console.log(`[TEST 2] Other Countries articles loaded: ${otherRes.articles.length} (Total: ${otherRes.total})`);
if (otherRes.articles.length === 0) throw new Error('Failed: No Other Countries articles found');
console.log(`✓ Sample Global Title: "${otherRes.articles[0].title}"`);

// Test 3: Date Filtering
const availableDates = indiaRes.availableDates;
console.log(`[TEST 3] Available dates detected:`, availableDates);
if (availableDates.length > 0) {
  const targetDate = availableDates[0];
  const dateFiltered = queryArticles({ region: 'india', dateStr: targetDate });
  console.log(`✓ Articles on ${targetDate}: ${dateFiltered.articles.length}`);
}

// Test 4: Category Filtering (Critical Minerals)
const criticalMinerals = queryArticles({ region: 'india', category: 'critical_minerals' });
console.log(`[TEST 4] India Critical Minerals: ${criticalMinerals.articles.length}`);
criticalMinerals.articles.forEach(a => {
  console.log(`  - [${a.category}] ${a.title}`);
});

// Test 5: Keyword Search
const searchRes = queryArticles({ region: 'other', search: 'Lithium' });
console.log(`[TEST 5] Global Search for 'Lithium': ${searchRes.articles.length} results`);
searchRes.articles.forEach(a => {
  console.log(`  - [${a.region}] ${a.title}`);
});

// Test 6: Daily Executive Briefing
const indiaBriefing = getDailyBriefing('india');
console.log(`[TEST 6] India Briefing generated:`);
console.log(`  Title: ${indiaBriefing.title}`);
console.log(`  Summary: ${indiaBriefing.summaryText}`);
console.log(`  Headlines count: ${indiaBriefing.topHeadlines.length}`);

const globalBriefing = getDailyBriefing('other');
console.log(`[TEST 6b] Global Briefing generated:`);
console.log(`  Title: ${globalBriefing.title}`);
console.log(`  Summary: ${globalBriefing.summaryText}`);

// Test 7: RSS XML Fallback Parser
const mockXml = `
<rss version="2.0">
  <channel>
    <title>Google News - Mining</title>
    <item>
      <title>NMDC achieves milestone production in Chhattisgarh iron ore mines</title>
      <link>https://example.com/nmdc-news</link>
      <pubDate>Thu, 20 Aug 2026 10:00:00 GMT</pubDate>
      <description>National Mineral Development Corporation announces major record extraction in Bailadila.</description>
      <source url="https://example.com">Economic Times</source>
    </item>
  </channel>
</rss>
`;

const parsedRss = parseXmlFeedFallback(mockXml, 'india');
console.log(`[TEST 7] Mock RSS parsed articles: ${parsedRss.length}`);
if (parsedRss.length > 0) {
  console.log(`  Title: ${parsedRss[0].title}`);
  console.log(`  Category: ${parsedRss[0].category}`);
  console.log(`  Source: ${parsedRss[0].source}`);
  console.log(`  DateStr: ${parsedRss[0].dateStr}`);
}

console.log('--- ALL TESTS COMPLETED SUCCESSFULLY! ---');
