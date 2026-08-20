# ⛏️ MiningPulse - Daily Mining News Intelligence Platform

A modern, automated mining news aggregator and intelligence dashboard designed specifically for the global and Indian mining sectors. 

---

## 🌟 Key Features

### 1. Two-Option Region Selector
- 🇮🇳 **India Mining News**: Curated coverage of Coal India (CIL), NMDC, Ministry of Mines, Critical Minerals Tranche auctions (Lithium, Rare Earths), state exploration (Odisha, Jharkhand, Chhattisgarh, Rajasthan), DGMS mine safety, and Indian policy reforms.
- 🌍 **Other Countries / Global Mining News**: Comprehensive international coverage from Australia (Pilbara), Canada, Chile (Atacama Lithium), DR Congo, BHP, Rio Tinto, Glencore, Vale, Freeport-McMoRan, and London Metal Exchange (LME) dynamics.

### 2. Date Selector & Daily Live Updates
- 📅 **Interactive Calendar Date Picker**: Select any specific date to view news published on that day.
- ⚡ **Quick Preset Filters**: Toggle between **Today**, **Yesterday**, **Past 7 Days**, **Past 30 Days**, and **All News**.
- 🔄 **Automated Daily Ingestion**: Ingests fresh live mining news feeds every day automatically via server-side RSS scrapers (Google News Mining Industry feeds, PIB Ministry of Mines, Mining.com) with smart deduplication and caching.

### 3. Executive Intelligence Briefing
- Instant 30-second daily briefing tailored to the selected region and date.
- Key takeaways, top headlines, focal commodity tracking, and market sentiment breakdown.

### 4. Mineral & Category Filters
- Filter news by major sectors:
  - 🪵 **Coal & Lignite**
  - 🔋 **Lithium & Critical Minerals**
  - 🏗️ **Iron Ore & Steelmaking**
  - 📦 **Base Metals (Copper, Bauxite, Aluminum, Zinc)**
  - 🪙 **Precious Metals (Gold, Silver)**
  - 📜 **Policies, Concessions & Auctions**
  - 🌿 **ESG & Green Mining (Tailings, Solar, Decarbonization)**
  - 🤖 **AI, Robotics & Mine Safety Tech**

### 5. Live Mining Commodity Ticker
- Indicative live prices for Newcastle Coal, LME Copper, Lithium Carbonate, Iron Ore (62% Fe CFR), COMEX Gold, and LME Aluminum.

### 6. Bookmarking & Exporting
- 🔖 **Bookmark News**: Save important articles locally for quick reference.
- 📥 **Export Daily Digest**: 
  - **Copy Formatted Briefing** to clipboard
  - **Download CSV** data table for Excel / Google Sheets
  - **Print / Save as PDF** report

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd mining-news-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. Or build and start production server:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploying to a Free Public URL

### Option 1: 1-Click Deploy to Vercel (Recommended - Permanent Free Public URL)
1. Push this folder to a GitHub repository.
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **"Deploy"**.
4. You will instantly receive a live public HTTPS URL:
   `https://mining-news-portal.vercel.app`

### Option 2: Instant Public URL via Cloudflare Tunnel / LocalTunnel (Without Deploying)
If you want to share your running local server with anyone over the internet instantly:
- Run with Cloudflare:
  ```bash
  npx cloudflared tunnel --url http://localhost:3000
  ```
- Or with LocalTunnel:
  ```bash
  npx localtunnel --port 3000
  ```
You will get a public URL like `https://funny-mining-pulse.loca.lt` accessible worldwide.

### Option 3: Deploy to Render or Netlify
- **Netlify**: Connect your GitHub repository, set build command to `npm run build` and publish directory to `.next`.
- **Render**: Create a new Web Service, select Node runtime, and set start command to `npm run start`.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI & Styling**: React 18, Tailwind CSS, Lucide Icons
- **News Engine**: Server-side RSS aggregator (`/api/news`), categorizer, and persistent file-backed cache
- **State Management**: React state + LocalStorage for persistent bookmarks

---

© 2026 MiningPulse Intelligence. Built for mining professionals, researchers, and commodity analysts.
