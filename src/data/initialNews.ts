import { Article, CommodityPrice } from '@/lib/types';
import { getTodayDateStr, getYesterdayDateStr, getDaysAgoDateStr } from '@/lib/dateUtils';

const today = getTodayDateStr();
const yesterday = getYesterdayDateStr();
const day2 = getDaysAgoDateStr(2);
const day3 = getDaysAgoDateStr(3);
const day4 = getDaysAgoDateStr(4);
const day5 = getDaysAgoDateStr(5);

export const INITIAL_ARTICLES: Article[] = [
  // INDIA MINING NEWS - TODAY
  {
    id: 'in-today-1',
    title: 'Ministry of Mines Finalizes Tranche V Auction for 18 Critical & Strategic Mineral Blocks',
    description: 'The Indian Ministry of Mines has invited bids for 18 new strategic mineral blocks across 8 states including Lithium, Graphite, Rare Earth Elements, and Potash to boost domestic supply chains.',
    snippet: 'Union Mines Ministry announces the launch of tranche 5 critical mineral auction, opening up exploratory and mining leases across Odisha, Rajasthan, Chhattisgarh, and Karnataka.',
    url: 'https://pib.gov.in/PressReleasePage.aspx?PRID=mines-critical-auction',
    source: 'PIB India / Ministry of Mines',
    publishedAt: `${today}T09:30:00.000Z`,
    dateStr: today,
    region: 'india',
    category: 'critical_minerals',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Lithium', 'Critical Minerals', 'Auctions', 'Policy', 'Odisha'],
    sentiment: 'positive',
    location: 'New Delhi / Pan-India',
    keyHighlights: [
      '18 mineral blocks offered across 8 states.',
      'Key minerals include Lithium, Cobalt, Graphite, and REEs.',
      'Aims to reduce import reliance for EV battery manufacturing.'
    ],
    isFeatured: true
  },
  {
    id: 'in-today-2',
    title: 'Coal India Production Surges 8.4% YoY as Monsoon Preparedness Prevents Pit Disruptions',
    description: 'Coal India Limited (CIL) reports record off-take and overburden removal efficiency across major subsidiaries including SECL and MCL, ensuring steady thermal power supplies.',
    snippet: 'CIL achieved an 8.4% year-on-year dispatch growth this month, with improved evacuation logistics and rapid railway siding expansion.',
    url: 'https://www.coalindia.in/news/production-update',
    source: 'Coal India Press / Business Standard',
    publishedAt: `${today}T08:15:00.000Z`,
    dateStr: today,
    region: 'india',
    category: 'coal',
    imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',
    readTime: 3,
    tags: ['Coal India', 'SECL', 'Thermal Power', 'Energy Security'],
    sentiment: 'positive',
    location: 'Kolkata / Korba',
    keyHighlights: [
      'Production grew 8.4% with 62.8 MT dispatched this month.',
      'Advanced dewatering systems minimized pit stoppage.',
      'Railway rakes availability improved by 12%.'
    ]
  },
  {
    id: 'in-today-3',
    title: 'NMDC Accelerates Iron Ore Evacuation with New Slurry Pipeline in Bastar Corridor',
    description: 'State-owned miner NMDC clears trial run for its 15 MTPA slurry pipeline linking Bailadila iron ore complex to Visakhapatnam steel cluster, slashing freight overheads.',
    snippet: 'The sustainable pipeline will dramatically reduce carbon footprint compared to road transport while de-congesting railway routes in Chhattisgarh.',
    url: 'https://www.nmdc.co.in/media/slurry-pipeline-bastar',
    source: 'Economic Times / NMDC',
    publishedAt: `${today}T07:00:00.000Z`,
    dateStr: today,
    region: 'india',
    category: 'iron_ore',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    readTime: 5,
    tags: ['NMDC', 'Iron Ore', 'Chhattisgarh', 'Slurry Pipeline', 'Infrastructure'],
    sentiment: 'positive',
    location: 'Bastar, Chhattisgarh',
    keyHighlights: [
      '15 MTPA pipeline brings operational cost savings of 40%.',
      'Minimizes dust emissions along the transport corridor.',
      'Direct linkage to Vizag port and steel mills.'
    ]
  },
  {
    id: 'in-today-4',
    title: 'Vedanta Resources Announces ₹12,000 Cr Investment in Copper Smelter Modernization and Recycling',
    description: 'Vedanta outlines major capital expenditure in green copper refining capacity and scrap recovery to meet burgeoning domestic electronics demand.',
    snippet: 'The group aims to double refined copper output by 2028 with integrated circular economy recycling hubs in western India.',
    url: 'https://www.vedantalimited.com/press-releases/copper-expansion',
    source: 'LiveMint / Vedanta',
    publishedAt: `${today}T06:30:00.000Z`,
    dateStr: today,
    region: 'india',
    category: 'metals',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Vedanta', 'Copper', 'Recycling', 'Metals', 'Capex'],
    sentiment: 'positive',
    location: 'Gujarat / Maharashtra'
  },

  // INDIA MINING NEWS - YESTERDAY
  {
    id: 'in-yest-1',
    title: 'DGMS Mandates AI-Powered Geo-Spatial Slope Monitoring for Deep Open Cast Mines',
    description: 'Directorate General of Mines Safety (DGMS) issues fresh circular requiring automated radar slope stability systems in all mines exceeding 100-meter depth.',
    snippet: 'The new safety norm follows successful trials in Odisha and Jharkhand coalfields, providing 30-minute early collapse warnings to mine dispatch centers.',
    url: 'https://dgms.gov.in/circulars/slope-monitoring-safety',
    source: 'DGMS Official / Mining India',
    publishedAt: `${yesterday}T14:20:00.000Z`,
    dateStr: yesterday,
    region: 'india',
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    readTime: 3,
    tags: ['DGMS', 'Mine Safety', 'AI Radar', 'Jharkhand', 'Technology'],
    sentiment: 'neutral',
    location: 'Dhanbad, Jharkhand',
    keyHighlights: [
      'Mandatory for all open cast pits deeper than 100 meters.',
      'Sub-millimeter radar displacement monitoring.',
      'Direct integration with mine dispatch evacuation alarms.'
    ]
  },
  {
    id: 'in-yest-2',
    title: 'Odisha State Mining Corporation Records 22% Revenue Surge from Bauxite and Chrome Auctions',
    description: 'OMC exceeds annual auction projections as global demand for refractory chrome ore and primary aluminum feedstock drives competitive premiums.',
    snippet: 'Electronic auctions saw aggressive bidding from domestic aluminum smelters and stainless steel alloy producers.',
    url: 'https://omcltd.in/media/annual-revenue-report',
    source: 'Financial Express / OMC',
    publishedAt: `${yesterday}T11:00:00.000Z`,
    dateStr: yesterday,
    region: 'india',
    category: 'metals',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['OMC', 'Bauxite', 'Chromite', 'Odisha', 'State Auctions'],
    sentiment: 'positive',
    location: 'Bhubaneswar, Odisha'
  },
  {
    id: 'in-yest-3',
    title: 'Geological Survey of India Discovers High-Grade Vanadium Deposits in Arunachal Pradesh',
    description: 'Preliminary exploratory drilling by GSI confirms significant vanadium-bearing titaniferous magnetite deposits in the Papum Pare district.',
    snippet: 'Vanadium is a vital component for high-strength steel alloys and emerging Vanadium Redox Flow Batteries (VRFB) for grid energy storage.',
    url: 'https://gsi.gov.in/discoveries/vanadium-arunachal',
    source: 'GSI / The Hindu',
    publishedAt: `${yesterday}T09:45:00.000Z`,
    dateStr: yesterday,
    region: 'india',
    category: 'critical_minerals',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['GSI', 'Vanadium', 'Arunachal Pradesh', 'Exploration', 'Battery Metals'],
    sentiment: 'positive',
    location: 'Arunachal Pradesh'
  },

  // INDIA MINING NEWS - PAST DAYS
  {
    id: 'in-past-1',
    title: 'Ministry of Coal Unveils 2030 Green Mining Roadmap: 50 GW Solar on Reclaimed Overburden',
    description: 'Indian coal public sector undertakings (PSUs) announce massive land restoration plans converting closed mine pits and overburden dumps into renewable energy hubs and eco-parks.',
    snippet: 'The multi-pronged roadmap integrates floating solar arrays on quarry water reservoirs and afforestation across 100,000 hectares.',
    url: 'https://coal.gov.in/green-initiatives',
    source: 'Ministry of Coal / PTI',
    publishedAt: `${day2}T10:00:00.000Z`,
    dateStr: day2,
    region: 'india',
    category: 'sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    readTime: 5,
    tags: ['Green Mining', 'Solar Energy', 'Ministry of Coal', 'ESG', 'Restoration'],
    sentiment: 'positive',
    location: 'New Delhi'
  },
  {
    id: 'in-past-2',
    title: 'Hutti Gold Mines in Karnataka Commissions Automated Deep-Shaft Hoisting System',
    description: 'India’s premier state-run gold producer completes commissioning of computerized hoisting to extract ore from 800-meter deep subterranean levels.',
    snippet: 'The upgrade increases daily hoist capacity to 3,000 tonnes, modernizing legacy underground infrastructure.',
    url: 'https://huttigoldmines.karnataka.gov.in/modernization',
    source: 'Deccan Herald / HGML',
    publishedAt: `${day3}T12:30:00.000Z`,
    dateStr: day3,
    region: 'india',
    category: 'precious_metals',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    readTime: 3,
    tags: ['Gold Mining', 'Karnataka', 'Hutti Gold', 'Underground'],
    sentiment: 'neutral',
    location: 'Raichur, Karnataka'
  },
  {
    id: 'in-past-3',
    title: 'Goa Mineral Ore Exports Resume as First Private Mining Lease Commences Production',
    description: 'After years of regulatory pauses, low-grade iron ore extraction resumes with stringent environmental clearances and automated tracking.',
    snippet: 'Barge movements along the Zuari river have begun following comprehensive green audits and state pollution control verification.',
    url: 'https://www.thehindubusinessline.com/markets/commodities/goa-iron-ore-restart',
    source: 'The Hindu BusinessLine',
    publishedAt: `${day4}T08:00:00.000Z`,
    dateStr: day4,
    region: 'india',
    category: 'iron_ore',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Goa Mining', 'Iron Ore', 'Exports', 'Regulation'],
    sentiment: 'positive',
    location: 'Panaji, Goa'
  },

  // GLOBAL / OTHER COUNTRIES MINING NEWS - TODAY
  {
    id: 'gl-today-1',
    title: 'BHP & Rio Tinto Launch Joint Trial of Zero-Emission Ultra-Class Battery Haul Trucks in Pilbara',
    description: 'Mining giants BHP and Rio Tinto partner with equipment manufacturers to deploy 240-tonne electric haul trucks in Western Australia, charging with dynamic catenary pantographs.',
    snippet: 'The groundbreaking trial tests fast-charging megawatt stations in harsh desert conditions, aiming to eliminate diesel emissions from open-pit haulage.',
    url: 'https://www.mining.com/bhp-rio-tinto-battery-haul-truck-trial-pilbara',
    source: 'Mining.com / Reuters',
    publishedAt: `${today}T10:00:00.000Z`,
    dateStr: today,
    region: 'other',
    category: 'sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    readTime: 5,
    tags: ['BHP', 'Rio Tinto', 'Electric Trucks', 'Pilbara', 'Australia', 'Decarbonization'],
    sentiment: 'positive',
    location: 'Pilbara, Western Australia',
    keyHighlights: [
      'Joint test of 240-tonne zero-emission haul trucks.',
      'Catenary dynamic charging along ramp climbs.',
      'Targeting 30% operational carbon reduction by 2030.'
    ],
    isFeatured: true
  },
  {
    id: 'gl-today-2',
    title: 'Chile’s Codelco Finalizes Landmark Public-Private Lithium Partnership in Atacama Salt Flat',
    description: 'State copper and lithium entity Codelco seals definitive operational agreements ensuring long-term sustainable extraction and higher royalties through 2060.',
    snippet: 'The accord implements direct lithium extraction (DLE) technologies to drastically reduce brine evaporation water consumption.',
    url: 'https://www.reuters.com/markets/commodities/codelco-chile-lithium-atacama-agreement',
    source: 'Reuters / Bloomberg',
    publishedAt: `${today}T08:45:00.000Z`,
    dateStr: today,
    region: 'other',
    category: 'critical_minerals',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Chile', 'Lithium', 'Codelco', 'Atacama', 'DLE Technology', 'Battery Metals'],
    sentiment: 'positive',
    location: 'Antofagasta, Chile',
    keyHighlights: [
      'Guarantees stable battery-grade lithium carbonate supply.',
      'Transition to Direct Lithium Extraction (DLE).',
      'State equity partnership secured until 2060.'
    ]
  },
  {
    id: 'gl-today-3',
    title: 'Copper Prices Rebound to $9,800/t Amid Smelter Capacity Constraints in China and Red Dog Outage',
    description: 'London Metal Exchange (LME) copper futures rally on tight refined supplies, surging grid modernization investments, and AI data center cabling demand.',
    snippet: 'Treatment and refining charges (TC/RCs) remain compressed near historic lows, pushing smelters to coordinate scheduled maintenance curbs.',
    url: 'https://www.miningweekly.com/article/copper-rally-lme-smelter-constraints',
    source: 'Mining Weekly / LME News',
    publishedAt: `${today}T07:15:00.000Z`,
    dateStr: today,
    region: 'other',
    category: 'metals',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Copper', 'LME', 'China', 'Commodities', 'Metal Prices'],
    sentiment: 'positive',
    location: 'London / Global'
  },
  {
    id: 'gl-today-4',
    title: 'Freeport-McMoRan Expands Grasberg Underground Autonomous Train Haulage Network',
    description: 'The world’s second-largest copper and gold mine in Indonesia deploys driverless electric rail haulage deeper into the deep ore zone (DOZ).',
    snippet: 'Autonomous electric loaders and automated chutes have boosted daily underground extraction rates to over 150,000 tonnes.',
    url: 'https://www.fcx.com/operations/grasberg-automation',
    source: 'Mining Technology / Freeport',
    publishedAt: `${today}T05:30:00.000Z`,
    dateStr: today,
    region: 'other',
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Freeport', 'Grasberg', 'Indonesia', 'Automation', 'Autonomous Rail'],
    sentiment: 'neutral',
    location: 'Papua, Indonesia'
  },

  // GLOBAL / OTHER COUNTRIES MINING NEWS - YESTERDAY
  {
    id: 'gl-yest-1',
    title: 'Glencore Agrees $6.93bn Acquisition of Elk Valley Coal Assets to Form Standalone Steelmaking Unit',
    description: 'The deal closes following Canadian national security and net-benefit approvals with firm commitments on environmental stewardship and indigenous partnerships.',
    snippet: 'The combined metallurgical coal portfolio will provide long-term feed for global blast-furnace steel producers in Asia and Europe.',
    url: 'https://www.glencore.com/media-and-insights/news/elk-valley-closing',
    source: 'Financial Times / Glencore',
    publishedAt: `${yesterday}T15:10:00.000Z`,
    dateStr: yesterday,
    region: 'other',
    category: 'coal',
    imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80',
    readTime: 5,
    tags: ['Glencore', 'Metallurgical Coal', 'Canada', 'Elk Valley', 'M&A'],
    sentiment: 'neutral',
    location: 'British Columbia, Canada',
    keyHighlights: [
      '$6.93 billion transaction completed.',
      'World-class low-vol metallurgical coal mines.',
      'Strict water quality and selenium management commitments.'
    ]
  },
  {
    id: 'gl-yest-2',
    title: 'Newmont Strikes High-Grade Gold Extensions at Cadia Mine Deep Exploration Program',
    description: 'Underground diamond drilling at Cadia Valley operations in New South Wales confirms mineralized porphyry copper-gold extensions below existing cave footprints.',
    snippet: 'Assays returned intercept grades up to 2.4 g/t gold and 0.8% copper over 310 meters, indicating substantial life-of-mine expansion.',
    url: 'https://www.newmont.com/investors/news-release/cadia-drilling-results',
    source: 'Mining Journal / Newmont',
    publishedAt: `${yesterday}T12:00:00.000Z`,
    dateStr: yesterday,
    region: 'other',
    category: 'precious_metals',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    readTime: 3,
    tags: ['Newmont', 'Gold', 'Cadia', 'Australia', 'Exploration'],
    sentiment: 'positive',
    location: 'New South Wales, Australia'
  },
  {
    id: 'gl-yest-3',
    title: 'DR Congo Passes Stricter Artisanal Cobalt Traceability and Royalty Framework',
    description: 'The Congolese government introduces digital QR-coded consignment certification to eliminate informal child labor supply from export channels.',
    snippet: 'Major industrial mining concessions will collaborate with state buyer EGC to ringfence certified artisanal cooperatives.',
    url: 'https://www.aljazeera.com/economy/dr-congo-cobalt-traceability',
    source: 'Al Jazeera / Reuters',
    publishedAt: `${yesterday}T09:10:00.000Z`,
    dateStr: yesterday,
    region: 'other',
    category: 'policy',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['DR Congo', 'Cobalt', 'Supply Chain', 'ESG', 'Policy'],
    sentiment: 'neutral',
    location: 'Kolwezi, DR Congo'
  },

  // GLOBAL / OTHER COUNTRIES MINING NEWS - PAST DAYS
  {
    id: 'gl-past-1',
    title: 'Vale S.A. Secures Operating License for Giant Vargem Grande Iron Ore Tailings Filtration Plant',
    description: 'Brazilian mining conglomerate Vale eliminates upstream wet tailings dams at Vargem Grande complex, transitioning 100% of processing to dry stacking.',
    snippet: 'The dry stacking facility reduces safety risks while enabling 85% process water recirculation back into industrial operations.',
    url: 'https://vale.com/vargem-grande-filtration',
    source: 'Mining.com / Vale Media',
    publishedAt: `${day2}T11:40:00.000Z`,
    dateStr: day2,
    region: 'other',
    category: 'iron_ore',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Vale', 'Iron Ore', 'Brazil', 'Tailings Safety', 'Dry Stacking'],
    sentiment: 'positive',
    location: 'Minas Gerais, Brazil'
  },
  {
    id: 'gl-past-2',
    title: 'US Department of Energy Awards $400M Grant for Nevada Lithium Hydroxide Refinery',
    description: 'Funding allocated under the Defense Production Act aims to build the largest domestic lithium processing facility supplying American battery gigafactories.',
    snippet: 'The refinery is projected to produce 40,000 tonnes of battery-grade lithium hydroxide annually by late 2027.',
    url: 'https://www.energy.gov/articles/lithium-refinery-grant-nevada',
    source: 'US Dept of Energy / Wall Street Journal',
    publishedAt: `${day3}T14:15:00.000Z`,
    dateStr: day3,
    region: 'other',
    category: 'critical_minerals',
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['US DOE', 'Lithium', 'Nevada', 'EV Batteries', 'Grant'],
    sentiment: 'positive',
    location: 'Nevada, United States'
  },
  {
    id: 'gl-past-3',
    title: 'South African Deep Gold Mines Deploy Robotic Bolting Rigs to Eliminate Worker Exposure',
    description: 'Gold Fields and AngloGold Ashanti accelerate deployment of semi-autonomous underground roof bolters in ultra-deep Witwatersrand reef stopes.',
    snippet: 'Remote-controlled drilling rigs enable rock reinforcement without placing miners directly beneath unsupported hanging walls.',
    url: 'https://www.miningweekly.com/article/robotic-bolting-deep-gold-mines',
    source: 'Mining Weekly / Chamber of Mines SA',
    publishedAt: `${day4}T10:00:00.000Z`,
    dateStr: day4,
    region: 'other',
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['South Africa', 'Gold Fields', 'Robotics', 'Mine Safety'],
    sentiment: 'positive',
    location: 'Johannesburg, South Africa'
  }
];

export const COMMODITY_PRICES: CommodityPrice[] = [
  {
    symbol: 'COAL',
    name: 'Newcastle Thermal Coal',
    price: '$146.50',
    change: '+1.8%',
    isPositive: true,
    unit: '/ MT'
  },
  {
    symbol: 'COPPER',
    name: 'LME Grade A Copper',
    price: '$9,820.00',
    change: '+2.4%',
    isPositive: true,
    unit: '/ MT'
  },
  {
    symbol: 'LITHIUM',
    name: 'Lithium Carbonate (99.5%)',
    price: '$13,400.00',
    change: '+0.6%',
    isPositive: true,
    unit: '/ MT'
  },
  {
    symbol: 'IRON_ORE',
    name: 'Iron Ore 62% Fe CFR China',
    price: '$112.80',
    change: '-0.5%',
    isPositive: false,
    unit: '/ dmt'
  },
  {
    symbol: 'GOLD',
    name: 'COMEX Gold Futures',
    price: '$2,510.40',
    change: '+0.9%',
    isPositive: true,
    unit: '/ oz'
  },
  {
    symbol: 'ALUMINUM',
    name: 'LME Primary Aluminum',
    price: '$2,485.00',
    change: '+1.1%',
    isPositive: true,
    unit: '/ MT'
  }
];
