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
    url: 'https://news.google.com/search?q=Ministry+of+Mines+Critical+Mineral+Auction+Tranche+V+Lithium',
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
    executiveSummary: 'In a landmark push toward mineral self-reliance, the Union Ministry of Mines launched the fifth tranche of critical and strategic mineral auctions offering 18 exploratory blocks across 8 mineral-rich states. The auction includes highly sought-after deposits of Lithium, Rare Earth Elements (REEs), Graphite, Titanium, and Potash, designed to support India’s domestic EV battery supply chain and semiconductor manufacturing ecosystem.',
    keyHighlights: [
      '18 mineral blocks offered across Odisha, Rajasthan, Chhattisgarh, Karnataka, and Tamil Nadu.',
      'Includes 4 greenfield Lithium and Rare Earth exploratory blocks.',
      'Streamlined revenue-share bidding with simplified composite licensing.',
      'Mandates accelerated exploration timelines with upfront geological baseline data.'
    ],
    marketImplications: 'Drastically reduces long-term import vulnerability for EV cell gigafactories and grid storage developers while creating thousands of skilled regional mining and metallurgy jobs.',
    stakeholderImpact: 'Key beneficiaries include domestic mining conglomerates (Vedanta, Adani, JSW), battery chemical refiners, state exchequers receiving auction premiums, and the Ministry of Heavy Industries.',
    isFeatured: true
  },
  {
    id: 'in-today-2',
    title: 'Coal India Production Surges 8.4% YoY as Monsoon Preparedness Prevents Pit Disruptions',
    description: 'Coal India Limited (CIL) reports record off-take and overburden removal efficiency across major subsidiaries including SECL and MCL, ensuring steady thermal power supplies.',
    snippet: 'CIL achieved an 8.4% year-on-year dispatch growth this month, with improved evacuation logistics and rapid railway siding expansion.',
    url: 'https://news.google.com/search?q=Coal+India+Production+Surge+MCL+SECL',
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
    executiveSummary: 'Coal India Limited (CIL) maintained exceptional production momentum, recording an 8.4% year-on-year dispatch surge to 62.8 million tonnes. Early deployment of heavy high-capacity dewatering pump fleets and computerized pit-slope stability monitoring prevented typical monsoon-season flooding and haul-road bottlenecks across central coalfields.',
    keyHighlights: [
      'Total monthly dispatch reached 62.8 MT with an 8.4% annual growth rate.',
      'Mahanadi Coalfields (MCL) and South Eastern Coalfields (SECL) led volume contributions.',
      '14 new mechanized railway loading sidings commissioned to eliminate truck congestion.',
      'Thermal power station pithead stocks remain healthy at over 38 million tonnes.'
    ],
    marketImplications: 'Guarantees uninterrupted baseload electricity generation during peak seasonal industrial demand cycles while minimizing expensive thermal coal imports by state power utilities.',
    stakeholderImpact: 'Benefits national power generation utilities (NTPC, state GENCOs), Indian Railways through high-freight revenues, and over 250,000 colliery workers.',
    isFeatured: false
  },
  {
    id: 'in-today-3',
    title: 'NMDC Accelerates Iron Ore Evacuation with New Slurry Pipeline in Bastar Corridor',
    description: 'State-owned miner NMDC clears trial run for its 15 MTPA slurry pipeline linking Bailadila iron ore complex to Visakhapatnam steel cluster, slashing freight overheads.',
    snippet: 'The sustainable pipeline will dramatically reduce carbon footprint compared to road transport while de-congesting railway routes in Chhattisgarh.',
    url: 'https://news.google.com/search?q=NMDC+Iron+Ore+Slurry+Pipeline+Bailadila+Bastar',
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
    executiveSummary: 'National Mineral Development Corporation (NMDC) successfully completed commercial trials for its landmark 15 MTPA iron ore slurry pipeline connecting the rich Bailadila iron ore deposits in Chhattisgarh to coastal pelletization and steel hubs in Andhra Pradesh. The pipeline slashes logistics costs by 40% while replacing thousands of diesel transport trucks daily.',
    keyHighlights: [
      '15 MTPA slurry pipeline successfully commissioned across challenging terrain.',
      'Cuts transport freight costs from ₹1,400/tonne to under ₹850/tonne.',
      'Reduces corridor carbon emissions by over 65% compared to road and rail hauling.',
      'Secures direct continuous feed to coastal blast furnaces and pellet plants.'
    ],
    marketImplications: 'Enhances domestic steel cost competitiveness on global markets and stabilizes pellet feedstock availability for secondary steelmakers.',
    stakeholderImpact: 'Key impact on NMDC profit margins, coastal integrated steelmakers (RINL, Essar/AMNS), local communities experiencing reduced dust pollution, and environmental regulatory authorities.'
  },
  {
    id: 'in-today-4',
    title: 'Vedanta Resources Announces ₹12,000 Cr Investment in Copper Smelter Modernization and Recycling',
    description: 'Vedanta outlines major capital expenditure in green copper refining capacity and scrap recovery to meet burgeoning domestic electronics demand.',
    snippet: 'The group aims to double refined copper output by 2028 with integrated circular economy recycling hubs in western India.',
    url: 'https://news.google.com/search?q=Vedanta+Copper+Investment+Recycling+Smelter',
    source: 'LiveMint / Vedanta',
    publishedAt: `${today}T06:30:00.000Z`,
    dateStr: today,
    region: 'india',
    category: 'metals',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Vedanta', 'Copper', 'Recycling', 'Metals', 'Capex'],
    sentiment: 'positive',
    location: 'Gujarat / Maharashtra',
    executiveSummary: 'Vedanta Limited unveiled an aggressive ₹12,000 Crore multi-year capital deployment strategy aimed at expanding continuous cast copper rod manufacturing and setting up cutting-edge scrap recycling smelters across western India to cater to surging renewable grid and electric mobility demand.',
    keyHighlights: [
      '₹12,000 Crore investment earmarked over four financial years.',
      'Circular economy copper recycling capacity target of 300,000 tonnes/annum.',
      'Low-carbon smelting technology incorporating renewable rooftop solar and green hydrogen.',
      'Aims to double India’s refined cathode and wire rod self-sufficiency.'
    ],
    marketImplications: 'Helps insulate Indian electrical equipment and transmission manufacturers from volatile global LME copper supply crunches and overseas freight disruptions.',
    stakeholderImpact: 'Directly impacts electrical cable manufacturers, EV powertrain assemblers, green metal scrap aggregators, and western industrial corridor employment.'
  },

  // INDIA MINING NEWS - YESTERDAY
  {
    id: 'in-yest-1',
    title: 'DGMS Mandates AI-Powered Geo-Spatial Slope Monitoring for Deep Open Cast Mines',
    description: 'Directorate General of Mines Safety (DGMS) issues fresh circular requiring automated radar slope stability systems in all mines exceeding 100-meter depth.',
    snippet: 'The new safety norm follows successful trials in Odisha and Jharkhand coalfields, providing 30-minute early collapse warnings to mine dispatch centers.',
    url: 'https://news.google.com/search?q=DGMS+Mandates+AI+Radar+Slope+Monitoring+Mine+Safety',
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
    executiveSummary: 'The Directorate General of Mines Safety (DGMS) has released binding technical guidelines making sub-millimeter synthetic aperture radar (SAR) and AI-driven slope deformation monitoring mandatory for all large open-cast mineral and coal mines operating deeper than 100 meters.',
    keyHighlights: [
      'Mandatory implementation timeline of 12 months for open-cast pit operators.',
      'Automated millimeter-level displacement tracking with real-time sirens.',
      'Cloud integration with district emergency response and mine safety audit portals.'
    ],
    marketImplications: 'Prevents catastrophic pitwall failures and production shutdowns while catalyzing demand for mining IoT and geo-spatial analytics providers in India.',
    stakeholderImpact: 'Mine operators, safety engineers, mining equipment IoT developers, and labor safety unions across coal, iron, and bauxite basins.'
  },
  {
    id: 'in-yest-2',
    title: 'Odisha State Mining Corporation Records 22% Revenue Surge from Bauxite and Chrome Auctions',
    description: 'OMC exceeds annual auction projections as global demand for refractory chrome ore and primary aluminum feedstock drives competitive premiums.',
    snippet: 'Electronic auctions saw aggressive bidding from domestic aluminum smelters and stainless steel alloy producers.',
    url: 'https://news.google.com/search?q=Odisha+Mining+Corporation+Bauxite+Chromite+Revenue+Surge',
    source: 'Financial Express / OMC',
    publishedAt: `${yesterday}T11:00:00.000Z`,
    dateStr: yesterday,
    region: 'india',
    category: 'metals',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['OMC', 'Bauxite', 'Chromite', 'Odisha', 'State Auctions'],
    sentiment: 'positive',
    location: 'Bhubaneswar, Odisha',
    executiveSummary: 'Odisha Mining Corporation (OMC) posted an impressive 22% year-over-year revenue expansion following transparent digital forward auctions of premium high-grade bauxite and metallurgical chromite lumps.',
    keyHighlights: [
      'Auction realizations exceeded target benchmarks by 22%.',
      'Over 4.5 million tonnes of bauxite allocated to primary smelters in eastern India.',
      'Chromite ore prices retained strong premiums on robust stainless steel production.'
    ],
    marketImplications: 'Boosts state developmental treasuries and guarantees raw material visibility for major aluminum smelters in Jharsuguda, Koraput, and Angul.',
    stakeholderImpact: 'State Government of Odisha, primary aluminum producers (NALCO, Hindalco, Vedanta), and specialty ferrochrome alloy plants.'
  },

  // GLOBAL / OTHER COUNTRIES MINING NEWS - TODAY
  {
    id: 'gl-today-1',
    title: 'BHP & Rio Tinto Launch Joint Trial of Zero-Emission Ultra-Class Battery Haul Trucks in Pilbara',
    description: 'Mining giants BHP and Rio Tinto partner with equipment manufacturers to deploy 240-tonne electric haul trucks in Western Australia, charging with dynamic catenary pantographs.',
    snippet: 'The groundbreaking trial tests fast-charging megawatt stations in harsh desert conditions, aiming to eliminate diesel emissions from open-pit haulage.',
    url: 'https://news.google.com/search?q=BHP+Rio+Tinto+Battery+Electric+Haul+Truck+Pilbara',
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
    executiveSummary: 'Global mining powerhouses BHP and Rio Tinto have commenced joint real-world testing of ultra-class 240-tonne battery electric haul trucks in Western Australia’s Pilbara iron ore basin. The initiative combines stationary megawatt fast-chargers with overhead dynamic catenary trolley assist lines on steep pit ramps to prove zero-diesel haulage viability.',
    keyHighlights: [
      'Joint collaboration between the world’s two largest iron ore miners.',
      'Tests heavy battery performance and thermal management under 45°C ambient temperatures.',
      'Overhead pantograph charging delivers up to 6 MW of continuous ramp power.',
      'Targeting elimination of up to 1,500 litres of diesel per truck per 12-hour shift.'
    ],
    marketImplications: 'Accelerates the commercialization timeline for heavy industrial electrification, setting new global decarbonization benchmarks for tier-1 copper and iron ore producers.',
    stakeholderImpact: 'Heavy equipment OEMs (Caterpillar, Komatsu, Liebherr), institutional ESG investors, Pilbara mining workforces, and renewable power infrastructure developers.',
    isFeatured: true
  },
  {
    id: 'gl-today-2',
    title: 'Chile’s Codelco Finalizes Landmark Public-Private Lithium Partnership in Atacama Salt Flat',
    description: 'State copper and lithium entity Codelco seals definitive operational agreements ensuring long-term sustainable extraction and higher royalties through 2060.',
    snippet: 'The accord implements direct lithium extraction (DLE) technologies to drastically reduce brine evaporation water consumption.',
    url: 'https://news.google.com/search?q=Codelco+Chile+Atacama+Lithium+Agreement+SQM',
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
    executiveSummary: 'Chile’s state mining corporation Codelco finalized a historic public-private joint venture securing state majority equity in the Salar de Atacama through 2060. The agreement establishes a binding roadmap to replace traditional solar evaporation ponds with high-yield Direct Lithium Extraction (DLE), curbing groundwater extraction by over 50%.',
    keyHighlights: [
      'State-controlled partnership established through 2060.',
      'Phased deployment of industrial-scale Direct Lithium Extraction (DLE).',
      'Boosts annual battery-grade lithium carbonate equivalent (LCE) production to 300,000 tonnes.',
      'Generates increased fiscal royalties for Chilean regional infrastructure and indigenous funds.'
    ],
    marketImplications: 'Provides long-term supply certainty for global automakers (Tesla, BYD, European OEMs) while mitigating ESG concerns regarding high Andean water depletion.',
    stakeholderImpact: 'Chilean government finances, global EV battery supply chains, local indigenous Atacameño communities, and chemical tech licensors.'
  },
  {
    id: 'gl-today-3',
    title: 'Copper Prices Rebound to $9,800/t Amid Smelter Capacity Constraints in China and Red Dog Outage',
    description: 'London Metal Exchange (LME) copper futures rally on tight refined supplies, surging grid modernization investments, and AI data center cabling demand.',
    snippet: 'Treatment and refining charges (TC/RCs) remain compressed near historic lows, pushing smelters to coordinate scheduled maintenance curbs.',
    url: 'https://news.google.com/search?q=Copper+Prices+LME+Smelter+Constraints+Global+Mining',
    source: 'Mining Weekly / LME News',
    publishedAt: `${today}T07:15:00.000Z`,
    dateStr: today,
    region: 'other',
    category: 'metals',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    readTime: 4,
    tags: ['Copper', 'LME', 'China', 'Commodities', 'Metal Prices'],
    sentiment: 'positive',
    location: 'London / Global',
    executiveSummary: 'Refined copper contracts on the London Metal Exchange (LME) breached the $9,800/tonne mark as international smelting bottlenecks coincided with unprecedented structural demand from grid buildouts, offshore wind transmission, and AI data center power cabling.',
    keyHighlights: [
      'LME 3-month benchmark copper price rose 2.4% to $9,820/tonne.',
      'Global visible warehouse inventories draw down to near multi-year lows.',
      'Smelter spot treatment charges (TCs) remain severely depressed below $5/tonne.',
      'Long-term structural deficit forecasted by Goldman Sachs and Wood Mackenzie.'
    ],
    marketImplications: 'Improves cash flow and free cash yields for primary copper miners while exerting cost pressures on electrical equipment manufacturers.',
    stakeholderImpact: 'Global copper producers (Freeport, Antofagasta, Southern Copper), commodity trading desks, smelter operators, and clean energy developers.'
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
