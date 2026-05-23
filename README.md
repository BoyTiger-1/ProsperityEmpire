# Prosperity Empire

A browser-based financial civilisation idle game where you build an empire from a handful of Labour units into a global economic superpower — while learning real-world finance and economics along the way.

**Play it live:** https://boytiger-1.github.io/FinanceCivClicker/

---

## Table of Contents

1. [Overview](#overview)
2. [How to Play](#how-to-play)
3. [Resources](#resources)
4. [Buildings](#buildings)
5. [Technologies (Research)](#technologies-research)
6. [Policies](#policies)
7. [Markets](#markets)
8. [Academy & Learning System](#academy--learning-system)
9. [Codex — Financial Encyclopedia](#codex--financial-encyclopedia)
10. [Global Events](#global-events)
11. [Rival Nations](#rival-nations)
12. [Prestige System](#prestige-system)
13. [Achievements](#achievements)
14. [3D City View](#3d-city-view)
15. [News Feed](#news-feed)
16. [Controls & Keyboard Shortcuts](#controls--keyboard-shortcuts)
17. [Saving & Resetting](#saving--resetting)
18. [Self-Hosting](#self-hosting)

---

## Overview

Prosperity Empire is a resource-management idle/clicker game set in a financial civilisation. Starting from zero, you click to generate Labour, construct buildings, unlock technologies, trade on simulated markets, answer finance trivia for bonus rewards, and eventually Prestige your empire for permanent bonuses.

The game doubles as a financial education tool — every mechanic maps to a real economic concept, from supply and demand to portfolio diversification.

**Core gameplay loop:**

1. Click the city crest to generate Labour
2. Spend Labour (and other resources) to construct buildings
3. Buildings passively generate resources every second
4. Research technologies to unlock new buildings and multipliers
5. Enact policies to shape your empire's economic doctrine
6. Answer finance questions at the Academy to earn bonus resources
7. Trade stocks, bonds, commodities, and currencies on the Markets
8. Accumulate Influence to Prestige and carry permanent bonuses into a new run

---

## How to Play

### Getting Started

When you first open the game, a tutorial walks you through the basics. You can skip it and explore freely.

- **Click the city crest** (the large circular emblem in the Empire tab) to generate Labour
- Your first building is a **Hut** — it costs only 10 Labour and starts producing 0.5 Labour/sec passively
- Progress through **4 building tiers** from primitive settlements to space-age infrastructure
- The game autosaves every 30 seconds; you can also press **Ctrl+S** or click the Save button

### Game Phases

The game transitions through three phases as your empire grows:

| Phase | Trigger | Character |
|-------|---------|-----------|
| **Early** | Start | Primitive economy — Labour, Food, Wood, Stone |
| **Mid** | Significant buildings/capital | Industrial age — Coal, Energy, Goods, Knowledge |
| **Late** | Advanced buildings & research | Financial superpower — Influence, Markets, Prestige |

Phase affects which Events can trigger and which Academy questions appear.

### Buy Multipliers

In the Buildings tab, you can switch the buy quantity:

- **×1** — buy/sell one at a time
- **×5** — buy/sell five at a time
- **×10** — buy/sell ten at a time
- **Max** — buy as many as you can currently afford

---

## Resources

There are 10 resources in the game. Each has a current amount and a per-second (passive) rate shown in the header bar.

| Resource | Colour | Primary Source | Used For |
|----------|--------|---------------|---------|
| **Labour** | Gold | Clicking + Huts, Cottages | Almost every building cost |
| **Food** | Green | Farms, Fisheries | Population growth, building costs |
| **Wood** | Tan | Lumber Mills | Early building costs |
| **Stone** | Grey-blue | Quarries | Mid-tier building costs |
| **Coal** | Dark grey | Coal Mines | Energy production, mid-tier costs |
| **Energy** | Amber | Power Plants, Solar Farms | Late-tier building costs & consumption |
| **Goods** | Purple | Workshops, Factories | Mid-to-late building costs |
| **Capital** | Yellow | Markets, Banks, clicking | Primary "money" — most purchases |
| **Knowledge** | Cyan | Libraries, Universities | Research, Academy rewards |
| **Influence** | Lavender | Diplomatic buildings | Prestige currency |

Resources are produced passively by buildings. Some buildings also **consume** resources per second (e.g. a Factory consumes Coal and Energy to run). If you run out of a consumed resource, that building stops producing.

Starting capital is **150 Capital** on a fresh run.

---

## Buildings

Buildings are purchased in the **Buildings** tab. Click a building to open its detail panel, which shows costs, production rates, sell value, and description.

### Selling Buildings

You can sell buildings for a **50% refund** of their purchase cost. The refund is based on the geometric cost of the most recent units sold, not the original price, so selling immediately after buying returns close to 50%.

- **Sell ×1** — sells one building, refunds 50% of its marginal cost
- **Sell ×5** — sells five buildings at once

### Tier 1 — Primitive Economy

| Building | Emoji | Base Cost | Produces | Notes |
|----------|-------|-----------|---------|-------|
| Hut | 🛖 | 10 Labour | 0.5 Labour/s | First building; always available |
| Farm | 🌾 | 15 Labour | 0.8 Food/s | Feeds your population |
| Lumber Mill | 🪵 | 25 Labour, 5 Food | 0.6 Wood/s | Provides Wood for construction |
| Quarry | ⛏️ | 30 Labour, 10 Wood | 0.5 Stone/s | Provides Stone |
| Cottage | 🏡 | 40 Labour, 15 Wood | 1.2 Labour/s, +5 pop cap | Upgraded Hut; boosts population |
| Market Stall | 🏪 | 50 Labour, 20 Food | 0.3 Capital/s | First Capital source |

### Tier 2 — Early Industry

| Building | Emoji | Produces | Consumes | Unlock |
|----------|-------|---------|---------|--------|
| Workshop | 🔨 | 0.8 Goods/s | Wood | 5 Lumber Mills |
| Coal Mine | ⛏️ | 0.6 Coal/s | — | 3 Quarries |
| Textile Mill | 🧵 | 1.2 Goods/s | Labour | Research: Textiles |
| Trading Post | 📦 | 0.5 Capital/s | — | 3 Market Stalls |
| Library | 📚 | 0.4 Knowledge/s | — | 5 Cottages |
| Fishery | 🐟 | 1.0 Food/s | — | Coastal research |
| School | 🏫 | 0.6 Knowledge/s | — | 1 Library |
| Warehouse | 🏭 | Boosts storage caps | — | 2 Workshops |
| Inn & Tavern | 🍺 | 0.2 Capital/s, +pop happiness | Food | — |

### Tier 3 — Industrial Age

| Building | Emoji | Produces | Consumes | Unlock |
|----------|-------|---------|---------|--------|
| Factory | 🏭 | 3.0 Goods/s | Coal, Energy | Research: Industrialisation |
| Power Plant | ⚡ | 2.0 Energy/s | Coal | Research: Steam Power |
| University | 🎓 | 2.5 Knowledge/s | — | 5 Schools |
| Bank | 🏦 | 2.0 Capital/s | — | Research: Banking |
| Steel Mill | 🔩 | 1.5 Goods/s | Coal, Stone | Research: Steel Production |
| Royal Mint | 🪙 | 3.0 Capital/s | Gold | Research: Monetary Policy |
| Harbor | ⚓ | 2.5 Capital/s | — | Research: Maritime Trade |
| Insurance Co. | 🛡️ | 1.5 Capital/s, reduces risk | — | 1 Bank |
| Oil Refinery | 🛢️ | 3.0 Energy/s | — | Research: Petroleum |
| Hospital | 🏥 | +pop happiness, +Knowledge | — | 5 Universities |
| Airport | ✈️ | 4.0 Capital/s | Energy | Research: Aviation |

### Tier 4 — Financial Superpower

| Building | Emoji | Produces | Consumes | Unlock |
|----------|-------|---------|---------|--------|
| Stock Exchange | 📈 | 5.0 Capital/s | — | Research: Capital Markets |
| Global Trade Hub | 🌐 | 6.0 Capital/s | Energy | Research: Globalisation |
| Research Institute | 🔬 | 5.0 Knowledge/s | Energy | Research: R&D Investment |
| Central Bank | 🏛️ | 4.0 Capital/s, monetary control | — | Research: Central Banking |
| Tech Park | 💻 | 4.0 Knowledge/s, 1.0 Influence/s | Energy | Research: Digital Economy |
| Solar Farm | ☀️ | 4.0 Energy/s | — | Research: Renewable Energy |
| Crypto Mining Farm | ₿ | 3.0 Capital/s | Energy ×5 | Research: Blockchain |
| Investment Firm | 💼 | 3.5 Capital/s | — | Research: Asset Management |
| Media Empire | 📺 | 2.0 Influence/s | Energy | Research: Mass Media |
| Space Port | 🚀 | 3.0 Influence/s, 5.0 Knowledge/s | Energy ×10 | Research: Space Economy |

### Building Costs Scale Geometrically

Each additional copy of a building costs more than the previous. The formula is:

```
Cost of the Nth building = baseCost × scalingFactor^(N-1)
```

The default scaling factor is **1.15** (15% more expensive per building). Some buildings have custom scaling.

---

## Technologies (Research)

The **Research** tab contains 37 technologies organised into 9 branches. Technologies are purchased with Knowledge Points and unlock new buildings, multipliers, and mechanics. Most technologies have prerequisites.

### Agriculture Branch (4 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Crop Rotation | +25% Food production | — |
| Irrigation | +40% Farm output | Crop Rotation |
| Fertilisers | +60% Food, unlocks Fishery | Irrigation |
| Mechanised Farming | +100% Food, −50% Labour consumption in farms | Fertilisers |

### Industry Branch (5 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Textiles | Unlocks Textile Mill | — |
| Steam Power | Unlocks Power Plant; +20% Goods | Textiles |
| Steel Production | Unlocks Steel Mill; +30% Goods | Steam Power |
| Industrialisation | Unlocks Factory; +50% all industrial output | Steel Production |
| Mass Production | +100% Factory output | Industrialisation |

### Energy Branch (5 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Coal Mining | +30% Coal production | — |
| Petroleum | Unlocks Oil Refinery | Coal Mining |
| Electrical Grid | +40% Energy efficiency | Petroleum |
| Nuclear Power | Massive Energy boost | Electrical Grid |
| Renewable Energy | Unlocks Solar Farm; +50% Energy | Nuclear Power |

### Finance Branch (5 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Banking | Unlocks Bank; +20% Capital | — |
| Monetary Policy | Unlocks Royal Mint | Banking |
| Capital Markets | Unlocks Stock Exchange | Monetary Policy |
| Central Banking | Unlocks Central Bank; monetary stability | Capital Markets |
| Asset Management | Unlocks Investment Firm; +30% investment returns | Central Banking |

### Trade Branch (4 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Maritime Trade | Unlocks Harbor; +20% trade income | — |
| Globalisation | Unlocks Global Trade Hub | Maritime Trade |
| Free Trade Agreements | +30% all Capital | Globalisation |
| Supply Chain Mastery | −20% building resource consumption | Free Trade Agreements |

### Knowledge Branch (4 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Scientific Method | +25% Knowledge production | — |
| Higher Education | Unlocks University | Scientific Method |
| R&D Investment | Unlocks Research Institute | Higher Education |
| Academic Exchange | +50% Knowledge, +20% question rewards | R&D Investment |

### Social Branch (4 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Public Health | Unlocks Hospital; +pop growth | — |
| Civil Society | +20% Influence, +happiness | Public Health |
| Mass Media | Unlocks Media Empire | Civil Society |
| Democracy | +30% Influence; policy slots increase | Mass Media |

### Digital Economy Branch (3 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Blockchain | Unlocks Crypto Mining Farm | Capital Markets |
| Digital Economy | Unlocks Tech Park; +30% Knowledge | Blockchain |
| AI & Automation | +50% all production; reduces labour costs | Digital Economy |

### Click Power Branch (3 techs)

| Technology | Effect | Prereq |
|-----------|--------|--------|
| Efficient Labour | +5 Labour per click | — |
| Ergonomic Tools | +15 Labour per click | Efficient Labour |
| Industrial Clicking | +50 Labour per click | Ergonomic Tools |

---

## Policies

The **Policies** tab lets you enact economic doctrines that permanently modify your production and gameplay. Policies are organised into 5 categories.

Some categories allow only **one active policy** (exclusive — you must deactivate one to activate another). The Social category allows all 3 simultaneously.

### Economic Doctrine (choose one)

| Policy | Effect |
|--------|--------|
| Free Market Capitalism | +40% Capital production; −10% Food production |
| State-Directed Economy | +30% all production; −20% Capital |
| Mixed Economy | +15% all production; +15% Capital — balanced approach |

### Fiscal Policy (choose one)

| Policy | Effect |
|--------|--------|
| Low Taxation | +30% population happiness; −15% Capital from taxes |
| High Taxation | +30% Capital; −15% population happiness |
| Progressive Taxation | +20% Capital; +10% happiness — moderate balance |

### Trade Policy (choose one)

| Policy | Effect |
|--------|--------|
| Protectionism | +25% domestic Goods production; −20% trade income |
| Free Trade | +40% Capital from trade; −10% Goods |

### Monetary Policy (choose one)

| Policy | Effect |
|--------|--------|
| Gold Standard | Stable Capital; +15% Capital value |
| Fiat Currency | +20% Capital flexibility; slight inflation |
| Cryptocurrency | +50% digital Capital; high volatility |

### Social Policy (all stackable)

| Policy | Effect |
|--------|--------|
| Universal Education | +20% Knowledge; +population growth |
| Healthcare for All | +15% happiness; +Labour efficiency |
| Environmental Regulations | +20% Influence; −10% industrial output |

---

## Markets

The **Markets** tab simulates live financial markets. Prices update in real time. You can buy and sell assets to generate Capital profit.

### Stocks (8 companies)

All stocks have live prices that fluctuate based on volatility and underlying trend.

| Ticker | Company | Sector | Base Price | Volatility | Dividend Yield |
|--------|---------|--------|-----------|-----------|---------------|
| AGRI | AgriCorp Holdings | Agriculture | $45 | Low (3%) | 3.0% |
| IWI | Iron Works Industrial | Manufacturing | $78 | Medium (5%) | 1.5% |
| PWGR | PowerGrid Utilities | Energy | $120 | Very Low (2%) | 4.5% |
| TRDW | TradeWinds Commerce | Commerce | $95 | Medium (4%) | 1.0% |
| FIB | First Imperial Bank | Finance | $210 | Medium (4%) | 2.0% |
| TECH | TechVentures Inc. | Technology | $340 | High (8%) | 0.1% |
| GRNE | GreenEnergy Corp | Renewables | $155 | High (6%) | 0.8% |
| GPHM | GlobalPharma Ltd | Healthcare | $185 | Low (3.5%) | 2.5% |

### Bonds (6 instruments)

Bonds pay a fixed yield and are lower risk than stocks.

| Bond | Type | Maturity | Yield | Risk |
|------|------|---------|-------|------|
| 1-Year Government Bond | Government | 1 yr | 2.0% | Very Low |
| 5-Year Government Bond | Government | 5 yr | 3.5% | Very Low |
| 10-Year Treasury Bond | Government | 10 yr | 4.5% | Low |
| Investment Grade Corporate | Corporate | 5 yr | 6.5% | Low-Medium |
| High-Yield ("Junk") Bond | Corporate | 3 yr | 12.0% | High |
| Inflation-Linked Bond | Government | 5 yr | 1.0% + inflation | Low |

### Commodities (6 assets)

| Commodity | Base Price | Volatility | Notes |
|-----------|-----------|-----------|-------|
| Gold 🥇 | $1,800/oz | Low (2%) | Safe-haven; rises in uncertainty |
| Crude Oil 🛢️ | $80/barrel | High (6%) | Cyclical; tracks industrial demand |
| Wheat 🌾 | $7/bushel | Medium (5%) | Weather and geopolitics dependent |
| Copper 🔶 | $4.20/lb | Medium (4%) | Economic indicator ("Dr. Copper") |
| Bitcoin ₿ | $42,000/BTC | Very High (15%) | Extreme volatility; finite supply |
| Natural Gas 💨 | $3.50/MMBtu | High (8%) | Seasonal; volatile in winter |

### Forex (6 currencies)

Trade against the US Dollar base rate.

| Currency | Symbol | Base Rate vs USD |
|----------|--------|-----------------|
| Euro 🇪🇺 | € | 1.08 |
| British Pound 🇬🇧 | £ | 1.26 |
| Japanese Yen 🇯🇵 | ¥ | 0.0067 |
| Chinese Yuan 🇨🇳 | ¥ | 0.138 |
| Brazilian Real 🇧🇷 | R$ | 0.19 |

---

## Academy & Learning System

The **Academy** tab is a financial quiz system that rewards you for answering questions correctly.

### How It Works

- Questions appear automatically every few minutes, triggered by in-game events (building purchases, phase transitions, and time-based intervals)
- Questions are themed around the concept related to whichever building you just constructed, or general finance for random triggers
- You have **30 seconds** to answer each multiple-choice question
- Answer correctly → earn bonus resources (Capital, Knowledge, or both)
- Answer incorrectly → you still learn — the correct answer is shown with an explanation

### Difficulty Scaling

Questions get harder as you progress:
- **Early phase** — basic concepts: Labour, trade, supply & demand
- **Mid phase** — intermediate: compound interest, elasticity, inflation, monetary policy
- **Late phase** — advanced: derivatives, central banking, portfolio theory, macroeconomics

### Streak Bonuses

Answering multiple questions correctly in a row builds a streak multiplier. Higher streaks give larger resource rewards.

### Proficiency

Your Academy proficiency score tracks your overall performance. Higher proficiency unlocks harder (and more rewarding) questions.

---

## Codex — Financial Encyclopedia

The **Codex** tab is an in-game financial encyclopedia with full articles on economics and finance.

### Categories

| Category | Topics |
|---------|--------|
| 📘 Economics Basics | Scarcity, Opportunity Cost, Supply & Demand, Elasticity, Market Failure |
| 💳 Personal Finance | Budgeting, Compound Interest, Debt, Insurance, Retirement |
| 🏢 Business Finance | Revenue models, P&L, Cash Flow, Valuation, Equity |
| 📈 Markets & Investing | Stocks, Bonds, Portfolio Theory, Risk & Return, Diversification |
| 🌍 Macroeconomics | GDP, Inflation, Monetary Policy, Fiscal Policy, Business Cycles |
| 🔬 Advanced Finance | Derivatives, Options, Hedge Funds, Quantitative Finance |

Each article is a full-length educational piece with formulas, examples, and real-world analogies — not just definitions.

---

## Global Events

Random events fire periodically and temporarily modify production. They appear in the top notification area with a countdown timer. Events are tied to your game phase.

### Positive Events

| Event | Effect | Duration |
|-------|--------|---------|
| Gold Rush! ⛏️ | ×2 Stone & Coal | 60s |
| Harvest Festival 🌾 | ×3 Food | 90s |
| Trade Boom 📦 | ×2 Capital | 120s |
| Brilliant Inventor Visits 💡 | ×5 Knowledge | 60s |
| Global Investor Conference 🤝 | ×6 Capital + 1,000 Capital instantly | 45s |
| Technological Breakthrough 🚀 | ×1.5 all production | 90s |
| Migration Wave 🚶 | ×2 Labour | 120s |
| Bull Market 🐂 | ×3 Capital (Banks & Stock Exchanges) | 60s |
| Technology Breakthrough 💡 | ×2 Knowledge | 90s |
| Tourism Boom 🗺️ | ×1.8 Capital, ×2 Influence | 120s |
| Energy Surplus ⚡ | ×1.5 all production | 60s |
| Immigration Wave 🚶 | ×2 Labour, ×1.5 Knowledge | 90s |
| Bull Market Rally 🐂 | ×2.5 Capital | 120s |
| Favourable Climate Season ☀️ | ×2.5 Food | 75s |

### Negative Events

| Event | Effect | Duration |
|-------|--------|---------|
| Drought ☀️ | −70% Food | 60s |
| Worker Strike ✊ | −50% Goods & Labour | 45s |
| Power Outage 🔌 | −80% Energy, −40% Goods | 30s |
| Economic Recession 📉 | −50% all Capital | 90s |
| Devastating Flood 🌊 | −60% Food, −30% Goods | 60s |
| Supply Chain Shock 🚢 | −40% Wood & Stone | 75s |
| Disease Outbreak 🦠 | −60% Labour | 120s |
| Bank Run 🏃 | −80% Capital from Banks, −5% saved Capital | 45s |
| Cyber Attack 💻 | −70% Knowledge | 60s |
| Trade War Escalation ⚔️ | −50% Capital | 90s |
| Market Crash 📉 | −60% Capital | 120s |
| Energy Crisis 🔋 | −60% Energy | 60s |
| General Strike ✊ | −50% Labour | 90s |

### Choice Events (Neutral)

Some events give you a decision to make, with limited time to choose:

| Event | Choice | Outcome |
|-------|--------|---------|
| Diplomatic Mission 🤝 | Accept or Decline | +500 Capital instantly if accepted |
| Investment Opportunity 💰 | Invest 200C or Pass | 50/50: triple or lose investment |
| Natural Disaster Warning ⚠️ | Fortify (−300C) or Risk it | Prevents −70% production for 90s |
| Foreign Aid Request 🤲 | Donate 1,000C or Decline | +50 Influence if donated |
| Research Grant 🔬 | Match grant (−500C) or Decline | ×3 Knowledge for 120s if matched |
| Major Investment Offer 🏦 | Accept or Decline | 50/50: 5,000C or 500C |

---

## Rival Nations

The **World** tab shows five rival nations, each with a distinct economic personality and random diplomatic events.

| Nation | Flag | Specialty | GDP | Disposition |
|--------|------|----------|-----|------------|
| Ironhaven | ⚔️ | Manufacturing & Trade | 50,000 | Neutral |
| Verdania | 🌿 | Agriculture & Green Energy | 35,000 | Friendly |
| Gold Coast Confederation | 💰 | Trade & Finance | 120,000 | Neutral |
| Techsylvania | 💻 | Technology & Innovation | 200,000 | Neutral |
| Stonewall Republic | 🏔️ | Mining & Resources | 25,000 | Hostile |

### Nation Events (examples)

Each nation fires periodic events affecting your economy:

- **Ironhaven** — may impose tariffs (−20% trade income) or propose free trade deals (+15% goods price)
- **Verdania** — may buy your surplus food (+500C) or share green research (+200 Knowledge)
- **Gold Coast** — may offer investor capital (+2,000C) or demand transit fees (−10% Capital)
- **Techsylvania** — may steal your research (−500 Knowledge) or license technology (+1,000 Knowledge)
- **Stonewall** — may embargo Stone & Coal (−50% for 60s) or offer mining rights (+50% Stone for 120s)

---

## Prestige System

Once your empire accumulates enough **Influence**, you can Prestige — resetting most of your progress in exchange for permanent cross-run bonuses.

### Prestige Requirement

You need **500 Influence** to Prestige (configurable in the game config). The Prestige button is in the **Prestige** tab.

### What Carries Over

- Your **Prestige count** (number of times you've prestiged)
- Your **Influence currency** (accumulated across runs)
- All purchased **Prestige Upgrades**
- The **permanent production multiplier** from upgrades

### What Resets

- All buildings
- All technologies
- Market portfolio (stocks, bonds, commodities)
- All resources (you restart with 100 Capital + upgrade bonuses)
- Active events and event modifiers

### Influence Gain Formula

When you Prestige, you gain Influence based on your empire's size:

```
Influence = floor( log10(Capital) × 5 + totalBuildings × 0.5 )
```

The larger your empire, the more Influence you earn from the reset.

### Prestige Upgrades (8 total)

Spend accumulated Influence on permanent upgrades. Costs increase 50% per level.

| Upgrade | Max Level | Effect | Base Cost |
|---------|----------|--------|-----------|
| Golden Inheritance 💰 | 5 | +500 Capital at run start per level | 100 |
| Economic Legacy 📈 | 20 | +5% all production per level (permanent) | 50 |
| Industrious Lineage 💪 | 10 | +10 Labour per click per level | 75 |
| Scholar's Heritage 🎓 | 5 | +50% Academy question rewards per level | 200 |
| Passive Empire 💤 | 4 | +25% offline earnings per level | 150 |
| Market Wisdom 📊 | 5 | +20% investment returns per level | 250 |
| Scholar's Foundation 🔬 | 5 | +100 Knowledge at run start per level | 100 |
| Imperial Prestige ✨ | 10 | +10% Influence gain per level | 300 |

---

## Achievements

The **Achievements** tab tracks ~80 milestones. Unlocked achievements show their condition and reward; locked ones show a hint.

### Clicks

| Achievement | Condition |
|-------------|-----------|
| First Click | Click the crest for the first time |
| Clicker | 100 total clicks |
| Dedicated Clicker | 1,000 total clicks |
| Click Machine | 10,000 total clicks |
| Click Legend | 100,000 total clicks |
| Click God | 1,000,000 total clicks |

### Capital Milestones

| Achievement | Condition |
|-------------|-----------|
| First Hundred | 100 Capital |
| Thousand Club | 1,000 Capital |
| Ten Thousand | 10,000 Capital |
| Millionaire | 1,000,000 Capital |
| Billionaire | 1,000,000,000 Capital |
| Trillionaire | 1,000,000,000,000 Capital |
| Infinite Wealth | 1,000,000,000,000,000 Capital |

### Building Count

| Achievement | Condition |
|-------------|-----------|
| Builder | 10 total buildings |
| Town Planner | 50 total buildings |
| City Architect | 100 total buildings |
| Metropolis | 250 total buildings |
| Megalopolis | 500 total buildings |
| World City | 1,000 total buildings |
| Dyson City | 10,000 total buildings |

### Specific Buildings (19)

Achievements for owning specific quantities of individual building types, e.g.:
- Own 1, 10, 50 Huts
- Own 1, 10 Farms
- Own 1 Bank, 5 Banks
- Own 1 Stock Exchange
- Own 1 Space Port
- … and more across all tiers

### Production Rates

| Achievement | Condition |
|-------------|-----------|
| Labour Leader | 10 Labour/sec |
| Food Security | 5 Food/sec |
| Energy Empire | 10 Energy/sec |
| Knowledge Hub | 5 Knowledge/sec |
| Capital Engine | 100 Capital/sec |

### Stockpile Achievements

| Achievement | Condition |
|-------------|-----------|
| Woodpile | 1,000 Wood |
| Stone Age | 1,000 Stone |
| Coal Baron | 1,000 Coal |
| Food Bank | 5,000 Food |
| Power Reserve | 500 Energy |

### Research

| Achievement | Condition |
|-------------|-----------|
| Curious Mind | First technology |
| Scholar | 5 technologies |
| Researcher | 10 technologies |
| Scientist | 20 technologies |
| Polymath | 30 technologies |
| Grand Theorist | All 37 technologies |
| Branch Master | Complete any full tech branch |
| Digital Pioneer | Unlock Digital Economy branch |

### Education (Academy)

| Achievement | Condition |
|-------------|-----------|
| Student | Answer 1 question |
| Attentive | Answer 10 questions |
| Studious | Answer 25 questions correctly |
| Knowledgeable | Answer 50 correctly |
| Academic | Answer 100 correctly |
| Professor | Answer 250 correctly |
| Dean | Answer 500 correctly |
| Nobel Laureate | Answer 1,000 correctly |
| Perfect Score | 5-question streak |
| Finance Genius | 10-question streak |
| Legendary Streak | 20-question streak |
| First Concept | Learn any concept |

### Markets

| Achievement | Condition |
|-------------|-----------|
| Investor | First trade |
| Day Trader | 10 trades |
| Active Trader | 50 trades |
| Market Veteran | 100 trades |
| Profitable Investor | First profitable trade |
| Consistent Returns | 10 profitable trades |
| Market Expert | 25 profitable trades |
| Warren Mode | 50% profit on a single trade |
| Commodity King | Own all 6 commodities |

### Population

| Achievement | Condition |
|-------------|-----------|
| Village | Population 50 |
| Town | Population 200 |
| City | Population 1,000 |
| Metropolis | Population 5,000 |
| Megacity | Population 25,000 |
| Ecumenopolis | Population 100,000 |
| World State | Population 1,000,000 |
| Kardashev I | Population 10,000,000 |

### Policies

| Achievement | Condition |
|-------------|-----------|
| Policy Maker | Enact first policy |
| Ideologue | Have 3 policies active |
| Doctrine | Have all social policies active |

### Events

| Achievement | Condition |
|-------------|-----------|
| Crisis Manager | Survive a negative event |
| Opportunity Seized | Accept a positive choice event |
| Battle-Tested | Survive 10 negative events |

### Prestige

| Achievement | Condition |
|-------------|-----------|
| Reborn | First Prestige |
| Veteran | Prestige 3 times |
| Dynasty | Prestige 5 times |
| Eternal Empire | Prestige 10 times |
| Legend | Prestige 25 times |

### Special

| Achievement | Condition |
|-------------|-----------|
| Early Bird | Play within the first 24 hours of game release |
| Night Owl | Play between midnight and 4 AM |
| Speedrunner | Reach mid-phase in under 10 minutes |
| Completionist | Unlock 50 achievements |
| True Completionist | Unlock all achievements |
| Pacifist | Reach late-phase with 0 hostile nation events |
| Economist | Have all 5 policy categories active simultaneously |

---

## 3D City View

The Empire tab features a live 3D city that grows as your empire advances, rendered with Three.js.

### City Zones

The city is divided into 7 economic zones, each with colour-coded buildings:

| Zone | Colour | Buildings |
|------|--------|----------|
| Residential | Warm orange | Huts, Cottages, Hospitals |
| Agricultural | Green | Farms, Fisheries |
| Industrial | Cool blue-grey | Workshops, Factories, Steel Mills |
| Commercial | Amber | Market Stalls, Trading Posts, Warehouses |
| Financial | Gold | Banks, Stock Exchanges, Mints |
| Knowledge | Cyan | Libraries, Schools, Universities |
| Advanced | Deep purple | Tech Parks, Space Ports |

### City Features

- **Central monument** — granite obelisk with gold tip, surrounded by an 8-pillar colonnade and reflecting pool
- **Zone flag markers** — coloured flags at each zone's centre for navigation
- **Roads and sidewalks** — layered road network with boundary walls and gateposts
- **Lamp posts** — 16 street lights with angled arms
- **Trees** — 52 trees in concentric rings throughout the city
- **Park areas** — park benches, flower patches, and grass areas in the central plaza
- **Distant mountains** — 10 snow-capped mountain peaks visible on the horizon
- **Clouds** — 10 animated cloud clusters floating above the city

### Camera Controls

- **Click on a zone** — camera zooms in to that zone's buildings
- **Click the background** — camera returns to overview position
- **Drag to rotate** — orbit the city view
- The 3D city is always visible behind the game UI on all tabs

---

## News Feed

The **News** tab is a live newspaper-style feed of everything that happens in your empire.

- **Build events** — logged whenever you construct buildings
- **Research events** — logged when technologies are unlocked
- **Economic events** — logged when global events start and end
- **Diplomatic events** — logged for nation interactions
- **Milestone events** — logged when major thresholds are crossed

The feed is ordered newest-first and persists across sessions.

---

## Controls & Keyboard Shortcuts

| Action | Control |
|--------|---------|
| Generate Labour | Click the city crest (Empire tab) |
| Save game | **Ctrl+S** or click the Save button |
| Reset game | Hold the Reset button for **3 seconds** |
| Navigate tabs | Click any tab button at the top |
| Buy building | Click building name in Buildings tab |
| Buy ×1 / ×5 / ×10 / Max | Toggle multiplier buttons in Buildings tab |
| Sell building | Open building panel → Sell ×1 or Sell ×5 |
| Answer Academy question | Click the correct answer button |

---

## Saving & Resetting

### Autosave

The game autosaves every **30 seconds** automatically.

### Manual Save

- Press **Ctrl+S** at any time
- Click the **Save** button in the header

### Reset

To reset your empire completely (all progress deleted):

1. Find the **Reset** button in the header
2. **Hold it down for 3 seconds** — a red progress bar fills the button
3. A confirmation modal appears — click **YES, RESET EVERYTHING** to confirm

This cannot be undone. The reset deletes all buildings, technologies, resources, achievements, and market holdings.

### Save Data

Save data is stored in your browser's `localStorage` under the key `prosperityEmpire`. Clearing browser data will delete your save.

---

## Self-Hosting

### GitHub Pages (Recommended — Free)

1. Fork or clone this repository to your GitHub account
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch**
4. Select the `main` branch, root folder (`/`)
5. Click **Save** — your site will be live at `https://<your-username>.github.io/<repo-name>/`

### Local Development

Open `index.html` directly in any modern browser — no build step, no server required. All dependencies are loaded from CDN.

```
git clone https://github.com/BoyTiger-1/FinanceCivClicker.git
cd FinanceCivClicker
# Open index.html in your browser
```

### Other Static Hosts

The game is a static site (HTML + CSS + JS only). It works on any static hosting platform:

- **Netlify** — drag the folder into netlify.com/drop
- **Vercel** — `vercel --prod` from the project root
- **Cloudflare Pages** — connect your GitHub repo
- **Any web server** — copy files to `public_html` or equivalent

---

## Technical Stack

| Technology | Usage |
|-----------|-------|
| HTML5 / CSS3 | Game UI, animations, layout |
| Vanilla JavaScript (ES6+) | All game logic — no framework |
| Three.js r134 | 3D city rendering |
| localStorage | Save/load system |
| CSS Custom Properties | Theming and design tokens |
| requestAnimationFrame | Game loop (60 fps) |

No build tools. No bundlers. No npm. The entire game runs from a single `index.html` file with script tags.

---

## Project Structure

```
FinanceCivClicker/
├── index.html              # Entry point — all UI structure
├── css/
│   └── game.css            # All styles
├── js/
│   ├── game.js             # Game state (GS) definition
│   ├── config.js           # Constants and configuration
│   ├── main.js             # Bootstrap and game loop
│   ├── data/
│   │   ├── buildings.js    # 36 building definitions
│   │   ├── technologies.js # 37 technology definitions
│   │   ├── policies.js     # 15 policy definitions
│   │   ├── achievements.js # 80+ achievement definitions
│   │   ├── market.js       # Stocks, bonds, commodities, forex
│   │   ├── events.js       # Global event definitions
│   │   ├── nations.js      # 5 rival nation definitions
│   │   ├── codex.js        # Financial encyclopedia articles
│   │   └── questions.js    # Academy question bank
│   ├── engine/
│   │   ├── buildingEngine.js   # Buy, sell, cost calculations
│   │   ├── productionEngine.js # Resource tick and recalculation
│   │   ├── researchEngine.js   # Technology effects
│   │   ├── marketEngine.js     # Price simulation
│   │   ├── eventsEngine.js     # Event spawning and management
│   │   ├── populationEngine.js # Population and happiness
│   │   ├── policyEngine.js     # Policy effects
│   │   ├── learningEngine.js   # Academy question logic
│   │   ├── achievementEngine.js # Achievement checking
│   │   ├── prestigeEngine.js   # Prestige and upgrades
│   │   ├── saveEngine.js       # Save / load / reset
│   │   └── newsEngine.js       # News log management
│   └── ui/
│       ├── empireUI.js         # Empire tab + city crest click
│       ├── buildingsUI.js      # Buildings tab
│       ├── researchUI.js       # Research tab
│       ├── marketsUI.js        # Markets tab
│       ├── academyUI.js        # Academy tab
│       ├── codexUI.js          # Codex tab
│       ├── worldUI.js          # World/Nations tab
│       ├── policiesUI.js       # Policies tab
│       ├── prestigeUI.js       # Prestige tab
│       ├── achievementsUI.js   # Achievements tab
│       ├── tutorialUI.js       # Tutorial overlay
│       ├── newsUI.js           # News feed tab
│       ├── cityScene.js        # Three.js 3D city
│       ├── tabs.js             # Tab navigation
│       ├── notifications.js    # Toast notifications
│       └── modals.js           # Confirmation dialogs
└── README.md
```

---

## License

MIT License — free to use, modify, and redistribute.
