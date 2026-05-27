/* ── CODEX DATA — Financial Encyclopedia entries ── */
const CODEX_DATA = {
  categories: [
    { id:'basics', name:'📘 Economics Basics' },
    { id:'personal', name:'💳 Personal Finance' },
    { id:'business', name:'🏢 Business Finance' },
    { id:'markets', name:'📈 Markets & Investing' },
    { id:'macro', name:'🌍 Macroeconomics' },
    { id:'advanced', name:'🔬 Advanced Finance' },
  ],
  entries: [

    // ── BASICS ──
    {
      id:'scarcity', cat:'basics', title:'Scarcity',
      subtitle:'The fundamental economic problem',
      body:`<p>Scarcity is the condition of having unlimited wants in a world of limited resources. It is the central problem that all of economics attempts to address — the gap between what we desire and what we have.</p>
      <p>Because resources — land, labour, capital, and entrepreneurship — are finite, societies must make choices. Every choice has a cost: the <strong>opportunity cost</strong> of the forgone alternative.</p>
      <h3>The Three Basic Economic Questions</h3>
      <ul>
        <li><strong>What</strong> to produce? (Guns vs. butter; hospitals vs. roads)</li>
        <li><strong>How</strong> to produce it? (Labour-intensive vs. capital-intensive)</li>
        <li><strong>For whom</strong> is it produced? (Distribution of output)</li>
      </ul>
      <h3>Economic Systems</h3>
      <p>Different systems answer these questions differently. A <strong>market economy</strong> lets prices signal where resources are most valued. A <strong>command economy</strong> has central planners decide. Most real-world economies are <strong>mixed</strong> — private markets for most goods, with government intervention where markets fail.</p>
      <h3>The Production Possibility Frontier</h3>
      <p>The PPF is a curve showing maximum combinations of two goods an economy can produce given its resources. Points on the curve are efficient. Points inside are wasteful. Points outside are impossible today — but growth can shift the frontier outward over time through investment in capital and technology.</p>
      <p>Key insight: the PPF illustrates scarcity visually. Moving along the frontier always means giving something up. The slope of the PPF is the opportunity cost of producing one more unit of a good in terms of the other good that must be sacrificed.</p>`,
    },
    {
      id:'opportunity_cost', cat:'basics', title:'Opportunity Cost',
      subtitle:'The true cost of every decision',
      body:`<p>Opportunity cost is the value of the best alternative you give up when making a choice. It is arguably the most important concept in all of economics — and the one most consistently ignored in everyday life.</p>
      <div class="codex-formula">Opportunity Cost = Value of Best Forgone Alternative</div>
      <p>When you choose to spend two hours gaming instead of studying, the opportunity cost is not zero — it is whatever you could have achieved with that studying time. When a government builds a new motorway, the opportunity cost is the school or hospital that could have been built with the same money.</p>
      <h3>Explicit vs. Implicit Costs</h3>
      <ul>
        <li><strong>Explicit costs</strong> are direct, measurable monetary payments (rent, wages, materials). These show up in accounting statements.</li>
        <li><strong>Implicit costs</strong> are foregone alternatives that do not involve a cash transaction — like the salary a business owner gives up to run their own company, or the interest foregone by holding cash instead of investing it.</li>
      </ul>
      <p>Economic profit = Revenue − Explicit Costs − Implicit Costs. Accounting profit ignores implicit costs, which is why a business can show an accounting profit but still be making an economic loss if the owner could earn more elsewhere.</p>
      <h3>Comparative Advantage</h3>
      <p>David Ricardo's profound insight (1817): even if one party is absolutely better at everything, both parties gain from specialising in their comparative advantage — the activity where their opportunity cost is lowest — and trading with each other.</p>
      <p>Example: A lawyer is faster at typing than a secretary. But the lawyer's opportunity cost of typing (foregone legal billings) is enormous. The lawyer should focus entirely on legal work and hire a secretary. Both are better off. This principle explains why free trade raises global living standards even when one country is more productive at everything.</p>
      <h3>Sunk Costs Are Not Opportunity Costs</h3>
      <p>Sunk costs — past expenditures that cannot be recovered — should never influence forward-looking decisions. If you paid 100 for a non-refundable concert ticket but feel ill, the question is not "I paid 100, I must go" but "Given where I am now, is attending the concert the best use of my time?" The 100 is gone regardless. This is the Sunk Cost Fallacy — one of the most pervasive and costly cognitive errors in both personal finance and business.</p>`,
    },
    {
      id:'supply_demand', cat:'basics', title:'Supply and Demand',
      subtitle:'How markets set prices',
      body:`<p>Supply and demand is the bedrock model of market economics. It describes how the interaction of buyers (demand) and sellers (supply) determines price and quantity in competitive markets.</p>
      <h3>The Law of Demand</h3>
      <p>As price rises, quantity demanded falls — and vice versa. This reflects the principle that consumers substitute away from expensive goods toward cheaper alternatives. The demand curve slopes downward. Key shifters of the entire demand curve: income, prices of substitutes/complements, tastes, expectations, and number of buyers.</p>
      <h3>The Law of Supply</h3>
      <p>As price rises, quantity supplied rises — higher prices make production more profitable, attracting more sellers and more output. The supply curve slopes upward. Key shifters: input costs, technology, number of sellers, government taxes/subsidies, expectations.</p>
      <div class="codex-formula">Equilibrium: Quantity Supplied = Quantity Demanded</div>
      <p>At equilibrium, the market "clears" — there is no surplus or shortage. Any deviation creates pressure back toward equilibrium. This is the "invisible hand" mechanism Adam Smith described in 1776.</p>
      <h3>Shifts vs. Movements</h3>
      <p>A price change causes a movement along the curve. Changes in other factors shift the entire curve. Distinguishing these is essential: a rise in oil prices is a movement along the petrol demand curve; a new tax on petrol is a shift of the supply curve.</p>
      <h3>Price Controls</h3>
      <ul>
        <li><strong>Price Ceiling</strong> (set below equilibrium, e.g., rent control): creates a shortage. Quantity demanded exceeds quantity supplied at the controlled price. Creates queues, black markets, and declining quality as sellers reduce quality to cut costs.</li>
        <li><strong>Price Floor</strong> (set above equilibrium, e.g., minimum wage): creates a surplus. Quantity supplied exceeds quantity demanded. Creates unemployment as firms hire fewer workers at the higher wage.</li>
      </ul>
      <h3>Elasticity</h3>
      <p>Elasticity measures responsiveness. Price Elasticity of Demand = % change in quantity / % change in price. Elastic (|e| > 1): quantity very responsive to price — luxury goods, products with many substitutes. Inelastic (|e| < 1): quantity barely responds — necessities, addictive goods, medicines. Total revenue rises with price for inelastic goods and falls for elastic goods.</p>
      <h3>Price Elasticity of Supply</h3>
      <p>Just as demand has elasticity, so does supply. <strong>Price Elasticity of Supply (PES)</strong> = % change in quantity supplied / % change in price. It measures how quickly producers can respond to price changes by increasing or decreasing output.</p>
      <ul>
        <li><strong>Elastic supply (PES &gt; 1)</strong>: Producers can rapidly scale output — manufactured goods with flexible factory capacity, agricultural crops with spare farmland. A 10% price rise produces more than a 10% increase in supply.</li>
        <li><strong>Inelastic supply (PES &lt; 1)</strong>: Output cannot quickly respond — fine wine (Château Pétrus cannot plant more 1961 vines), prime London real estate (geography limits supply), commodities with long production lead times like copper mines (5-10 years from discovery to production).</li>
        <li><strong>Perfectly inelastic supply (PES = 0)</strong>: Fixed quantity regardless of price — original Picasso paintings, beachfront plots in Monaco. Price is determined entirely by demand.</li>
      </ul>
      <div class="codex-formula">PES = % Change in Quantity Supplied / % Change in Price</div>
      <p><strong>Commodity market dynamics:</strong> When demand surges for a commodity with inelastic supply (e.g., lithium for EV batteries), prices spike dramatically because production cannot respond fast enough. This price spike eventually attracts new investment, which expands supply over several years — the classic commodity "super-cycle." The 2020-22 semiconductor shortage illustrated the same principle: chip fabrication plants take 2-3 years and $20 billion to build, so supply elasticity is near-zero in the short run.</p>`,
    },

    {
      id:'elasticity', cat:'basics', title:'Elasticity',
      subtitle:'How sensitive demand is to price changes',
      body:`<p>Elasticity measures how much economic variables respond to changes in other variables. It is the quantitative tool that transforms qualitative supply and demand analysis into precise predictions.</p>
      <div class="codex-formula">Price Elasticity of Demand = % Change in Quantity Demanded / % Change in Price</div>
      <h3>The Elastic/Inelastic Spectrum</h3>
      <ul>
        <li><strong>Perfectly Inelastic (e = 0)</strong>: Quantity demanded does not change at all when price changes. Example: insulin for a diabetic. No matter the price, the same amount is needed. Rare in practice but approximated for life-saving goods.</li>
        <li><strong>Inelastic (0 &lt; |e| &lt; 1)</strong>: Quantity changes less than proportionately to price. Petrol, cigarettes, salt. Consumers have few alternatives in the short run.</li>
        <li><strong>Unit Elastic (|e| = 1)</strong>: Revenue stays constant — 10% price rise, 10% quantity fall. Total spending unchanged.</li>
        <li><strong>Elastic (|e| &gt; 1)</strong>: Quantity changes more than proportionately. Holidays, restaurant meals, luxury cars. Many alternatives exist; consumers can easily substitute.</li>
        <li><strong>Perfectly Elastic (|e| = ∞)</strong>: Any price increase drops quantity to zero. Competitive commodity markets — wheat, financial instruments, petrol at a station slightly above market price.</li>
      </ul>
      <h3>Determinants of Elasticity</h3>
      <ul>
        <li><strong>Substitutes</strong>: More substitutes = more elastic. Pepsi and Coke are close substitutes; a price rise for one drives customers to the other.</li>
        <li><strong>Necessity vs. luxury</strong>: Necessities are inelastic; luxuries are elastic.</li>
        <li><strong>Budget share</strong>: Salt is a tiny share of spending (inelastic). Housing is a large share (more elastic).</li>
        <li><strong>Time period</strong>: Long run is always more elastic than short run. Drivers cannot immediately replace a petrol car when fuel prices spike, but over years they can buy EVs, move closer to work, use public transport.</li>
      </ul>
      <h3>Income Elasticity and Cross-Elasticity</h3>
      <p><strong>Income Elasticity</strong> = % change in quantity / % change in income. Normal goods (positive): demand rises with income. Inferior goods (negative): demand falls as income rises (e.g., bus journeys, generic food). Luxury goods (income elasticity > 1): demand rises faster than income.</p>
      <p><strong>Cross Elasticity</strong> = % change in quantity of Good A / % change in price of Good B. Positive = substitutes (tea and coffee). Negative = complements (cars and petrol).</p>`,
    },
    {
      id:'market_failure', cat:'basics', title:'Market Failure',
      subtitle:"When markets don't deliver efficient outcomes",
      body:`<p>Markets are extraordinarily powerful coordination mechanisms, but they can fail to allocate resources efficiently in predictable ways. Understanding market failure justifies — and constrains — government intervention.</p>
      <h3>Externalities</h3>
      <p>An externality occurs when a transaction affects third parties who had no say. The polluting factory imposes costs on downstream communities that are not reflected in the factory's costs — it over-produces relative to the social optimum. This is a <strong>negative externality</strong>.</p>
      <p><strong>Positive externalities</strong>: education benefits society beyond the student (fewer crimes, more innovation, better public discourse). Without government intervention, education is under-supplied relative to the social optimum.</p>
      <p><strong>Pigouvian tax</strong> (named after economist Pigou): tax equal to the external cost, internalising it. Carbon taxes aim to do this — making emitters pay the social cost of their pollution. The logic: if the factory must pay for pollution, it will reduce output to the level where private cost = social cost.</p>
      <h3>Public Goods</h3>
      <p>Public goods are <strong>non-rival</strong> (one person's consumption does not reduce availability for others) and <strong>non-excludable</strong> (you cannot prevent people from benefiting). Classic examples: national defence, lighthouses, basic research, street lighting.</p>
      <p>The <strong>free rider problem</strong>: because you cannot exclude non-payers, private firms cannot charge for public goods and will not produce them. Hence government provision or taxation is required. Note that "public" refers to these economic properties, not government ownership.</p>
      <h3>Information Asymmetry</h3>
      <p>George Akerlof's 1970 paper "The Market for Lemons" showed that when sellers know more than buyers about product quality, markets can collapse. Car sellers know if their car is a "lemon" (poor quality); buyers don't. Buyers will only pay the average quality price; sellers of good cars exit the market (they are underpaid); market quality spirals down further — an adverse selection death spiral. Solutions: warranties, certification, regulation, reputation systems.</p>
      <p><strong>Moral Hazard</strong>: occurs when one party changes behaviour because they are insulated from risk by another party. Insured people take more risks. Banks with government guarantees take on excessive risk. Solutions: deductibles, co-insurance, monitoring, regulation.</p>
      <h3>Monopoly and Market Power</h3>
      <p>A monopolist restricts output and raises prices above marginal cost to maximise profit, creating a "deadweight loss" — socially beneficial transactions that don't happen because the price is too high. Solutions: antitrust/competition law, regulation, nationalisation. Natural monopolies (where one firm is most efficient due to high fixed costs — utilities, railways) are typically regulated rather than broken up.</p>`,
    },

    // ── PERSONAL FINANCE ──
    {
      id:'compound_interest', cat:'personal', title:'Compound Interest',
      subtitle:'The eighth wonder of the world',
      body:`<p>Compound interest is the process of earning interest on previously earned interest. Albert Einstein allegedly called it "the eighth wonder of the world — he who understands it, earns it; he who doesn't, pays it."</p>
      <div class="codex-formula">A = P × (1 + r/n)^(n×t)</div>
      <p>Where P = principal (starting amount), r = annual interest rate (decimal), n = number of compounding periods per year, t = years. More frequent compounding increases the effective yield.</p>
      <h3>The Rule of 72</h3>
      <p>A quick mental calculation: <strong>Years to double ≈ 72 ÷ annual interest rate</strong>. At 6%, money doubles in 12 years. At 8%, in 9 years. At 12%, in 6 years. This rule is surprisingly accurate for rates between 2% and 30%.</p>
      <h3>The Hockey Stick Effect</h3>
      <p>Compound growth is slow at first and explosive later. At 8% annual return:</p>
      <ul>
        <li>Year 10: 1,000 becomes 2,159</li>
        <li>Year 20: 1,000 becomes 4,661</li>
        <li>Year 30: 1,000 becomes 10,063</li>
        <li>Year 40: 1,000 becomes 21,725</li>
      </ul>
      <p>Most of the wealth is created in the final decade. This is why Warren Buffett is famous for saying his wealth compounded dramatically after age 65 — the mathematics of compound growth reward patience above almost all else.</p>
      <h3>Starting Early: The Most Powerful Lever</h3>
      <p>Investing 1,000 at age 25 at 8% = approximately 21,700 at 65. Starting at 35: approximately 10,000. Starting at 45: approximately 4,660. Those 10 extra years are worth more than the entire amount invested later because of the compounding effect. Time in the market is the most powerful tool any investor has.</p>
      <h3>Debt Works the Same Way — Against You</h3>
      <p>Credit card debt at 20% APR: a 1,000 balance becomes 6,200 in 10 years if you only pay the minimum. The same mathematics that build wealth also destroy it when applied to debt. High-interest debt elimination is always the highest guaranteed return available.</p>
      <h3>Inflation Is Compound Interest Working Against Savings</h3>
      <p>At 3% annual inflation, purchasing power halves in about 24 years (Rule of 72: 72/3 = 24). Cash under the mattress loses real value continuously. The goal of investing is to outrun inflation with compound returns — preserving and growing real wealth, not just nominal numbers.</p>
      <h3>Compound Growth Across Rates and Time</h3>
      <p>The table below shows what £1,000 becomes at different annual return rates — illustrating why the rate of return matters as much as the time horizon:</p>
      <ul>
        <li><strong>At 3% (cash savings):</strong> 10 yr → £1,344 | 20 yr → £1,806 | 30 yr → £2,427</li>
        <li><strong>At 6% (balanced portfolio):</strong> 10 yr → £1,791 | 20 yr → £3,207 | 30 yr → £5,743</li>
        <li><strong>At 8% (equity-tilted):</strong> 10 yr → £2,159 | 20 yr → £4,661 | 30 yr → £10,063</li>
        <li><strong>At 10% (global equities long-run average):</strong> 10 yr → £2,594 | 20 yr → £6,727 | 30 yr → £17,449</li>
      </ul>
      <p>The difference between 3% and 10% over 30 years is £15,022 on a single £1,000 investment — a factor of seven. This demonstrates why investors obsessively minimise costs (fees drag on compound returns) and why accepting appropriate equity risk over long time horizons is so powerful.</p>
      <div class="codex-formula">Future Value = Principal × (1 + Rate)^Years</div>
      <p><strong>The compounding frequency effect:</strong> £1,000 at 6% annual rate compounded annually → £1,791 after 10 years. Compounded monthly → £1,819. Compounded daily → £1,822. The difference is modest at 6% but becomes significant at higher rates. Continuously compounded (e^rt): at 6% for 10 years → £1,822. Banks that compound daily vs. annually offer meaningfully different effective yields — always compare the Annual Equivalent Rate (AER), not the headline rate.</p>`,
    },
    {
      id:'budgeting', cat:'personal', title:'Budgeting',
      subtitle:'The foundation of financial health',
      body:`<p>A budget is a forward-looking plan for allocating income across categories. Without a budget, spending happens by default — usually at the expense of savings and long-term goals.</p>
      <h3>The 50/30/20 Rule</h3>
      <p>A widely-used starting framework for after-tax take-home pay:</p>
      <ul>
        <li><strong>50% — Needs</strong>: Housing, food, utilities, transport to work, minimum debt payments, basic insurance. Non-negotiable short-term obligations.</li>
        <li><strong>30% — Wants</strong>: Restaurants, entertainment, holidays, gym membership, subscriptions, shopping beyond basics. Things that improve life but aren't essential.</li>
        <li><strong>20% — Savings and debt repayment</strong>: Emergency fund, pension contributions, investment accounts, extra debt payments. The engine of future financial security.</li>
      </ul>
      <p>The 50/30/20 rule is a guideline, not a law. High earners in low-cost areas can save far more than 20%. People in expensive cities may need to compress wants to hit even 15% savings.</p>
      <h3>Zero-Based Budgeting</h3>
      <p>Every pound/dollar of income is assigned a specific category until Income − Allocations = 0. This forces deliberate decision-making: every expenditure must be justified each month rather than assumed. It tends to reveal spending leaks — subscriptions you forgot about, habitual purchases you don't value. Apps like YNAB (You Need A Budget) automate this method.</p>
      <h3>Pay Yourself First</h3>
      <p>The most important behavioural finance insight in personal budgeting: automatically transfer savings to investment accounts before paying any other bill. If savings are treated as an afterthought — "save whatever's left" — the answer is usually nothing. Automating savings makes them frictionless and removes the willpower requirement entirely.</p>
      <h3>The Emergency Fund</h3>
      <p>Before investing for growth, maintain 3-6 months of essential living expenses in an easily accessible, low-risk account (high-yield savings, money market). This prevents selling investments at bad times for unexpected expenses like job loss, car repair, or medical bills. Without this buffer, any emergency forces high-cost borrowing, which can spiral. The emergency fund is the foundation everything else rests on.</p>
      <h3>Common Budgeting Errors</h3>
      <ul>
        <li><strong>Forgetting irregular expenses</strong>: Annual subscriptions, car maintenance, holiday costs, property taxes. Divide by 12 and include monthly.</li>
        <li><strong>Lifestyle inflation</strong>: Every pay rise spent immediately, leaving savings rate unchanged. Consciously allocate at least half of every raise to savings.</li>
        <li><strong>Budget too restrictive</strong>: Budgets that allow no discretionary spending fail — like diets with no treats. Build in a spending allowance for guilt-free pleasure.</li>
      </ul>`,
    },
    {
      id:'credit_debt', cat:'personal', title:'Credit and Debt',
      subtitle:'Borrowing power and its costs',
      body:`<p>Credit allows you to spend future income today. Used wisely — for assets that appreciate or for genuine emergencies — it is a powerful wealth-building tool. Used carelessly for consumption, it is wealth destruction with compound interest working against you.</p>
      <h3>The Credit Score System (FICO)</h3>
      <p>In the US, FICO scores range from 300-850. Higher scores mean lower borrowing costs — the difference between 620 and 760 can cost tens of thousands over a mortgage term.</p>
      <ul>
        <li><strong>Payment History (35%)</strong>: Single most important factor. Every late payment, default, or bankruptcy is recorded. One missed payment can drop a good score by 50-100 points and stays for 7 years.</li>
        <li><strong>Amounts Owed (30%)</strong>: Credit utilisation ratio — how much of your available credit you are using. Below 30% is recommended; below 10% is excellent. Never max out cards.</li>
        <li><strong>Length of Credit History (15%)</strong>: Longer is better. Keep old accounts open even if rarely used — closing them shortens your history and raises utilisation.</li>
        <li><strong>New Credit (10%)</strong>: Hard enquiries from new applications temporarily lower your score. Do not apply for multiple cards in a short period.</li>
        <li><strong>Credit Mix (10%)</strong>: Variety of credit types (mortgage, auto loan, credit cards) demonstrates responsible management of different products.</li>
      </ul>
      <h3>Good Debt vs. Bad Debt</h3>
      <p><strong>Good debt</strong>: low interest rate, used for an asset that appreciates or increases earning capacity. A mortgage on a home in a growing area. A student loan for a high-return degree. A business loan for a profitable venture.</p>
      <p><strong>Bad debt</strong>: high interest rate, used for depreciating assets or consumption. Credit card debt at 20% APR for a holiday. A payday loan. A car loan for a luxury vehicle well beyond your means.</p>
      <p>The dividing line is not type of debt but the relationship between the interest rate and the return. Borrowing at 4% to invest in assets returning 8% makes mathematical sense. Borrowing at 18% to fund consumption never does.</p>
      <h3>The Avalanche vs. Snowball Method</h3>
      <p><strong>Avalanche</strong> (mathematically optimal): pay minimums on all debts; put all extra money toward the highest interest rate debt first. Minimises total interest paid.</p>
      <p><strong>Snowball</strong> (behaviourally effective): pay minimums on all debts; put all extra money toward the smallest balance first regardless of rate. Creates early wins and momentum. Research suggests the snowball method leads to faster debt elimination for many people because of psychological motivation.</p>`,
    },
    {
      id:'insurance', cat:'personal', title:'Insurance',
      subtitle:'Managing risk through risk pooling',
      body:`<p>Insurance is the mechanism by which individuals transfer financial risk to a large pool, paying a small certain cost (premium) to avoid a potentially large uncertain loss. It is one of the oldest and most important financial innovations in human history.</p>
      <h3>The Mathematics of Insurance</h3>
      <p>Insurance works because of the <strong>law of large numbers</strong>: individual outcomes are unpredictable, but aggregate outcomes are highly predictable. An insurer covering one million drivers can predict total accident costs almost precisely, even though any individual's accident is uncertain. By charging each driver slightly more than their expected loss, the insurer generates profit while providing genuine security to all policyholders.</p>
      <h3>Key Types of Insurance</h3>
      <ul>
        <li><strong>Life Insurance</strong>: Pays beneficiaries upon death. <em>Term</em> insurance provides pure death-benefit protection for a fixed period — the most cost-effective for most people. <em>Whole Life</em> combines protection with a savings element — typically much more expensive and often poor value compared to "buy term and invest the difference."</li>
        <li><strong>Health Insurance</strong>: Covers medical costs. Essential protection against financially catastrophic illnesses. National health systems (NHS in UK, Medicare in US) provide a floor; private insurance may top up or replace this floor.</li>
        <li><strong>Property and Casualty</strong>: Homeowner's insurance covers the structure and contents against fire, theft, weather damage. Motor insurance is legally required in most jurisdictions. Understand what is excluded — floods, earthquakes, and business use are often excluded from standard policies.</li>
        <li><strong>Income Protection</strong>: Pays a proportion of your salary if you cannot work due to illness or injury. Often overlooked but vital — your ability to earn income is your greatest financial asset, and it can be disabled.</li>
        <li><strong>Liability Insurance</strong>: Protects against claims by third parties who suffer loss due to your actions or negligence. Professional indemnity insurance for service providers; public liability for businesses.</li>
      </ul>
      <h3>Moral Hazard and Adverse Selection</h3>
      <p><strong>Moral hazard</strong>: insured parties may take more risks because they bear less of the cost of bad outcomes. A fully-insured driver may be less careful. Insurance companies address this through deductibles (you pay the first part of any claim), co-insurance, and monitoring.</p>
      <p><strong>Adverse selection</strong>: higher-risk individuals are more likely to seek insurance, meaning the insured pool is riskier than average. An insurer charging the average population premium will be selected against by the high-risk — they buy the insurance while the low-risk opt out. This can cause insurance markets to fail entirely without mandatory participation (see: health insurance mandates).</p>
      <h3>How Much Insurance Do You Need?</h3>
      <p>The principle: insure against risks that would genuinely threaten your financial wellbeing. Do not insure against minor inconveniences you can self-fund (phone protection plans, extended warranties on small appliances). Do insure against catastrophic, financially ruinous events: death if dependants rely on your income, medical emergencies, home loss, severe disability.</p>`,
    },
    {
      id:'retirement', cat:'personal', title:'Retirement Planning',
      subtitle:'Funding your future self',
      body:`<p>Retirement planning addresses a fundamental challenge: accumulating enough financial assets during your working years to fund 20-30+ years of living expenses when you stop working. It requires starting early, consistent saving, and understanding the power of tax-advantaged accounts.</p>
      <h3>The 4% Rule and Safe Withdrawal</h3>
      <p>The "4% rule" emerged from research by William Bengen (1994): historically, withdrawing 4% of your portfolio in year 1, then adjusting for inflation annually, would not deplete a 30-year retirement even in poor market conditions. To apply it: Annual spending needed ÷ 0.04 = required portfolio size. Need 40,000/year? Target 1,000,000 in investments.</p>
      <p>Recent low-rate environments have led many researchers to suggest 3.3% is safer for longer retirements. The rule is a starting point, not a guarantee — sequence of returns risk (retiring into a bear market) is the key danger.</p>
      <h3>Pension Types</h3>
      <ul>
        <li><strong>Defined Benefit (DB) / Final Salary</strong>: Employer guarantees a specific income in retirement, typically based on final salary and years of service. The employer bears the investment risk. This gold standard has largely disappeared from the private sector due to cost and risk. Public sector workers (teachers, civil servants, military) often retain these schemes.</li>
        <li><strong>Defined Contribution (DC) / Money Purchase</strong>: You and your employer contribute to a pot; the retirement income depends on investment performance and the pot size. You bear the investment risk. Most modern pension schemes are DC. Investment choice matters enormously over a 40-year career.</li>
        <li><strong>State Pension</strong>: Government-provided minimum floor income, funded on a pay-as-you-go basis by current workers' contributions. In the UK, the full new State Pension (2024/25) is approximately £11,500/year — adequate as a supplement but not as a sole income.</li>
      </ul>
      <h3>Tax Efficiency: The Single Most Powerful Lever</h3>
      <p>Pension contributions in the UK attract income tax relief at your marginal rate. A 40% taxpayer contributing 100 to their pension effectively costs only 60 after tax relief — an instant 67% return before any investment growth. Additionally, investments grow free from income and capital gains tax inside the wrapper. Always maximise employer matching first — it is a 100% guaranteed instant return.</p>
      <p>ISAs (Individual Savings Accounts) in the UK, 401(k)s and IRAs in the US provide similar benefits. The difference between investing inside vs. outside these wrappers, compounded over 40 years, is often worth hundreds of thousands of pounds/dollars.</p>`,
    },
    {
      id:'taxes_personal', cat:'personal', title:'Taxes',
      subtitle:'Understanding your tax obligations',
      body:`<p>Taxes are compulsory payments to government used to fund public services (healthcare, education, defence, infrastructure) and to redistribute income. Understanding your tax position enables legal optimisation — paying what is owed, not more.</p>
      <h3>Types of Tax</h3>
      <ul>
        <li><strong>Income Tax</strong>: Progressive tax on earnings. In the UK: 0% on income below personal allowance (£12,570 in 2024/25), 20% basic rate, 40% higher rate, 45% additional rate. Most employment income is taxed at source through PAYE.</li>
        <li><strong>Capital Gains Tax (CGT)</strong>: Tax on profit from selling assets — shares, property (not primary residence), business assets. UK rates (2024): 10%/20% for most assets for basic/higher-rate taxpayers. Annual CGT allowance allows some gains tax-free.</li>
        <li><strong>National Insurance (UK) / Social Security (US)</strong>: Earnings-related contributions funding state pensions and benefits. Employees and employers both contribute.</li>
        <li><strong>VAT / Sales Tax</strong>: Consumption tax added to most goods and services at point of sale. UK standard VAT rate is 20%. Regressive — lower-income households spend a higher share of income on taxable goods.</li>
        <li><strong>Inheritance Tax</strong>: UK 40% on estates above £325,000 threshold. Various reliefs available (spouse exemption, agricultural relief, business property relief).</li>
        <li><strong>Council Tax (UK) / Property Tax (US)</strong>: Local government tax based on property value band, funding local services.</li>
      </ul>
      <h3>Tax Avoidance vs. Tax Evasion</h3>
      <p><strong>Tax avoidance</strong> is the legal use of tax rules to reduce your liability — using ISAs, pension contributions, legitimate business deductions. It is entirely legal and prudent. <strong>Tax evasion</strong> is the illegal non-payment or underpayment of taxes — hiding income, falsifying records. It is a criminal offence with severe penalties.</p>
      <h3>Tax-Efficient Investing</h3>
      <p>Using tax wrappers is the highest-returning "investment" available to most people. A 40% taxpayer who saves 10,000/year in a pension vs. outside one will have hundreds of thousands more after 30 years — purely from the tax efficiency. Order of priority: employer pension match → ISA allowance → further pension contributions → standard investment account.</p>`,
    },

    // ── BUSINESS FINANCE ──
    {
      id:'financial_statements', cat:'business', title:'Financial Statements',
      subtitle:'The three pillars of business accounting',
      body:`<p>Three core financial statements provide a complete picture of a company's financial health. Together they answer: Is it profitable? Is it financially stable? Does it generate cash? Every investment analysis begins here.</p>
      <h3>1. The Income Statement (Profit and Loss)</h3>
      <p>Shows profitability over a period (quarter or year). Starts with Revenue (all sales), subtracts Cost of Goods Sold to get <strong>Gross Profit</strong>, subtracts operating expenses (SG&A, R&D, depreciation) to get <strong>Operating Income (EBIT)</strong>, subtracts interest to get pre-tax income, subtracts tax to get <strong>Net Income</strong>.</p>
      <div class="codex-formula">Net Income = Revenue − COGS − Operating Expenses − Interest − Tax</div>
      <p>Key margins: Gross margin = Gross Profit/Revenue. Operating margin = EBIT/Revenue. Net margin = Net Income/Revenue. Tracking these margins over time reveals whether cost control and pricing power are improving or deteriorating.</p>
      <h3>2. The Balance Sheet</h3>
      <p>A snapshot of financial position at a specific date. Lists everything the company owns (assets) and everything it owes (liabilities), with the residual belonging to shareholders (equity).</p>
      <div class="codex-formula">Assets = Liabilities + Shareholders' Equity</div>
      <p><strong>Current assets</strong> (convertible to cash within a year): cash, receivables, inventory. <strong>Non-current assets</strong>: property, plant, equipment (PP&E), intangibles (patents, goodwill). <strong>Current liabilities</strong>: payables, short-term debt, accruals. <strong>Long-term liabilities</strong>: bonds, deferred tax, pension obligations.</p>
      <p>Key ratios: Current Ratio (current assets/current liabilities) measures short-term solvency. Debt-to-Equity measures financial leverage. Return on Equity (Net Income/Equity) measures profitability for shareholders.</p>
      <h3>3. The Cash Flow Statement</h3>
      <p>Tracks actual cash movements — the most important statement for assessing whether a business will survive. Companies can show accounting profit while burning cash (if revenue is uncollected, or capital expenditure is high). "Revenue is vanity, profit is sanity, cash is reality."</p>
      <p><strong>Operating Cash Flow</strong>: cash generated by core business operations. <strong>Investing Cash Flow</strong>: cash spent on/received from assets (capex, acquisitions, asset sales). <strong>Financing Cash Flow</strong>: debt borrowings/repayments, equity issuance/buybacks, dividends. <strong>Free Cash Flow = Operating CF − Capex</strong> — the cash truly available to return to shareholders or pay down debt. This is the number sophisticated investors focus on most.</p>`,
    },
    {
      id:'valuation', cat:'business', title:'Business Valuation',
      subtitle:'Determining what a company is worth',
      body:`<p>Valuation determines the intrinsic worth of a business. It is as much art as science — different methods produce different answers, and all depend on assumptions that may prove wrong. Understanding multiple approaches and their trade-offs is essential for serious investors.</p>
      <h3>Discounted Cash Flow (DCF)</h3>
      <p>The theoretically "correct" method: project future free cash flows and discount them back to present value using the weighted average cost of capital (WACC). The terminal value (value of all cash flows beyond the forecast period) typically represents 60-80% of the total DCF valuation — meaning results are enormously sensitive to the terminal growth rate assumed.</p>
      <div class="codex-formula">Value = Σ FCFt / (1+WACC)^t + Terminal Value / (1+WACC)^n</div>
      <p>DCF strength: grounds value in fundamentals. Weakness: garbage in, garbage out — small changes in the discount rate or growth rate produce enormous valuation swings. A competent analyst can justify almost any valuation with slightly different assumptions.</p>
      <h3>Trading Multiples (Comparable Companies)</h3>
      <p>Value based on how similar companies are priced in the market. Common multiples:</p>
      <ul>
        <li><strong>EV/EBITDA</strong>: Enterprise Value / Earnings Before Interest, Tax, Depreciation, Amortisation. Sector-neutral, widely used in M&A. 8-12× is typical for mature industrial companies; tech companies may trade at 20-40×.</li>
        <li><strong>P/E Ratio</strong>: Price / Earnings Per Share. Simple and widely quoted. Affected by capital structure, so less useful for cross-sector comparison.</li>
        <li><strong>P/S Ratio</strong>: Price / Sales. Used when companies have negative earnings (growth-stage tech). Less useful as it ignores profitability.</li>
        <li><strong>P/B Ratio</strong>: Price / Book Value. Useful for financials (banks, insurance). Less relevant for asset-light businesses (software, professional services).</li>
      </ul>
      <h3>Precedent Transactions</h3>
      <p>What similar companies have sold for historically. Typically higher than trading multiples because acquirers pay an acquisition premium (20-40% control premium) for the right to control the business. Used as a "ceiling" or sanity check in M&A negotiations.</p>
      <h3>Sum of the Parts (SOTP)</h3>
      <p>For conglomerates with distinct businesses, value each division separately using the most appropriate method, then sum them. The sum often exceeds the current share price, revealing a "conglomerate discount" — one argument for breaking up large corporations into focused entities.</p>`,
    },
    {
      id:'venture_capital', cat:'business', title:'Venture Capital',
      subtitle:'Funding high-growth startups',
      body:`<p>Venture capital is a form of private equity that invests in early-stage companies with high growth potential but unproven business models, accepting very high failure rates in exchange for the possibility of transformative returns.</p>
      <h3>How VC Funds Work</h3>
      <p>A VC firm raises a fund (typically 100M-2B) from Limited Partners — pension funds, university endowments, family offices, sovereign wealth funds. The VC General Partners then deploy capital into 20-50 startups over a 3-5 year investment period, with a further 5-7 years to exit. The typical fund life is 10-12 years.</p>
      <p>Economics: VCs charge a 2% annual management fee plus 20% of profits (carried interest) above a hurdle rate. Limited partners take the remaining 80% of gains. The top quartile of VC funds returns 3-5× invested capital net of fees.</p>
      <h3>Funding Stages Explained</h3>
      <ul>
        <li><strong>Pre-seed</strong>: Often founder-funded or from angel investors. Minimal product, validating that the problem is real and the team can execute.</li>
        <li><strong>Seed</strong>: 500K-5M. Building the MVP, finding initial customers, proving early product-market fit indicators.</li>
        <li><strong>Series A</strong>: 5-20M. Clear product-market fit, revenue traction, optimising for growth. Institutional VCs enter.</li>
        <li><strong>Series B/C</strong>: 20-100M+. Scaling proven model, building sales/marketing infrastructure, geographic expansion.</li>
        <li><strong>Late Stage/Growth</strong>: 100M+. Pre-IPO growth, often with growth equity or crossover funds.</li>
      </ul>
      <h3>The Power Law and Portfolio Construction</h3>
      <p>VC returns follow an extreme power law: 1-2 investments in a portfolio of 20-30 typically generate more return than all the others combined. Google, Facebook, Uber, and Airbnb each returned their entire fund many times over. This means a VC who misses one of these investments may effectively lose money even if 19/20 other investments succeed.</p>
      <p>Portfolio construction must therefore prioritise getting into transformative companies over maximising success rates. A 90% success rate with mediocre outcomes beats a 50% success rate if the winners are large enough.</p>`,
    },
    {
      id:'real_estate', cat:'business', title:'Real Estate Investment',
      subtitle:'Bricks, mortar, and returns',
      body:`<p>Real estate is one of the oldest investment classes — land is finite, buildings depreciate but land appreciates, and everyone needs somewhere to live or work. It offers a combination of income, capital appreciation, inflation protection, and leverage unavailable in most other asset classes.</p>
      <h3>Direct vs. Indirect Investment</h3>
      <p><strong>Direct residential investment</strong>: Buy-to-let property. Rental income provides cash flow; capital appreciation builds equity; mortgage leverage amplifies both returns and risks. Requires hands-on management or letting agent fees (10-15% of rent). Less liquid than stocks — selling typically takes weeks to months.</p>
      <p><strong>Direct commercial investment</strong>: Office, retail, industrial, logistics property. Higher yields than residential, longer leases (5-25 years), more stable income, but more complex management and larger minimum investment.</p>
      <p><strong>REITs (Real Estate Investment Trusts)</strong>: Listed companies owning diversified portfolios of commercial property. Stock-market liquidity with real estate returns. Must distribute at least 90% of taxable income as dividends. Treated as income investments — dividend yield typically 3-6%.</p>
      <h3>Key Metrics</h3>
      <div class="codex-formula">Gross Rental Yield = Annual Rent / Purchase Price × 100%</div>
      <div class="codex-formula">Net Yield = (Annual Rent − All Costs) / Purchase Price × 100%</div>
      <p>Costs include: mortgage interest, management fees, maintenance, insurance, void periods (property empty between tenants), letting agent fees, and tax. Net yields are typically 1.5-3 percentage points below gross yields.</p>
      <h3>The Leverage Effect</h3>
      <p>Example: 500,000 property with 20% deposit (100,000 equity). Mortgage at 3% on 400,000 = 12,000/year interest. Rental income 20,000/year. Net income after interest = 8,000 = 8% return on equity. If property rises 5% to 525,000, equity grows from 100,000 to 125,000 — a 25% return on the equity invested. The same leverage amplifies losses: a 10% price fall (50,000) halves the equity.</p>`,
    },

    // ── MARKETS AND INVESTING ──
    {
      id:'stocks_investing', cat:'markets', title:'Stock Market Investing',
      subtitle:'Owning pieces of businesses',
      body:`<p>Stocks (equities) represent fractional ownership of corporations. As a shareholder, you are entitled to a pro-rata share of the company's assets and earnings. Long-term equity returns have averaged approximately 10% annually for the US stock market (S&P 500) in nominal terms — approximately 7% in real (inflation-adjusted) terms. No other major asset class has matched this over long periods.</p>
      <h3>Key Valuation Metrics</h3>
      <ul>
        <li><strong>Price/Earnings (P/E) Ratio</strong>: The most widely cited valuation metric. A P/E of 20 means investors pay 20× current annual earnings. Higher P/E implies higher growth expectations or potential overvaluation. Historical S&P 500 average P/E: approximately 16×.</li>
        <li><strong>PEG Ratio</strong>: P/E divided by earnings growth rate. A PEG of 1.0 suggests fair value. Below 1.0 may indicate undervaluation for a growing company.</li>
        <li><strong>Enterprise Value/EBITDA</strong>: EV = Market Cap + Debt − Cash. EV/EBITDA is capital-structure neutral and useful for comparing companies with different levels of debt.</li>
        <li><strong>Dividend Yield</strong>: Annual dividend / share price. Income investors prioritise yield. 3-5% is typical for mature dividend-paying companies.</li>
        <li><strong>Price/Book (P/B)</strong>: Compares market value to accounting book value. Below 1.0 means the market values the company at less than its assets — potentially a value opportunity or a sign of serious problems.</li>
      </ul>
      <h3>Investment Styles</h3>
      <ul>
        <li><strong>Value Investing</strong> (Benjamin Graham, Warren Buffett): Buy stocks trading below intrinsic value. Requires patience — value can take years to be recognised by the market. The "margin of safety" concept — only buy at a significant discount to value — protects against being wrong.</li>
        <li><strong>Growth Investing</strong>: Pay premium valuations for companies with rapid revenue/earnings growth. Works brilliantly in bull markets; catastrophic when growth disappoints. Many growth stocks trade at 50-100× earnings based on future potential.</li>
        <li><strong>Index Investing</strong> (Bogle, Malkiel): Buy the entire market cheaply via index funds. Avoids stock-picking risk. Outperforms most active managers after fees over 10+ years. The mathematically dominant strategy for most individual investors.</li>
        <li><strong>Dividend Growth Investing</strong>: Companies with consistent, growing dividends tend to be high-quality businesses with durable competitive advantages. The dividend acts as both income and a quality filter.</li>
        <li><strong>Quality Investing</strong>: Focus on high returns on capital, durable competitive advantages (moats), strong management, and clean balance sheets regardless of price. Combines elements of value and growth.</li>
      </ul>`,
    },
    {
      id:'bonds_fixed_income', cat:'markets', title:'Bonds and Fixed Income',
      subtitle:'Lending for steady returns',
      body:`<p>Bonds are debt instruments — you lend money to a government or corporation, they pay you regular interest (the coupon) and return the principal at maturity. Fixed income provides predictable cash flows, portfolio ballast during equity downturns, and capital preservation — at the cost of lower long-term returns.</p>
      <h3>Bond Mechanics</h3>
      <p>A bond is characterised by: <strong>face value (par)</strong> — typically 1,000 — the amount repaid at maturity. <strong>Coupon rate</strong>: annual interest as a percentage of face value. <strong>Maturity</strong>: date the principal is repaid. <strong>Yield to Maturity (YTM)</strong>: the total annualised return if held to maturity, accounting for the current price, coupon payments, and capital gain/loss to par.</p>
      <div class="codex-formula">Bond Price = Σ Coupon / (1+YTM)^t + Par / (1+YTM)^n</div>
      <h3>The Inverse Price-Yield Relationship</h3>
      <p>This is the most important and most counterintuitive bond concept: <strong>bond prices and yields move in opposite directions</strong>. When interest rates rise, existing bonds with lower coupons become less attractive, so their prices fall until their effective yield matches the new market rate. When rates fall, existing high-coupon bonds become more valuable.</p>
      <p>Example: You hold a 1,000 bond with a 4% coupon (40/year). New bonds are issued at 6% (60/year). Your bond's price falls to approximately 667 — at which point 40/667 = 6%, making it equally attractive to the new bond.</p>
      <h3>Duration: Measuring Interest Rate Risk</h3>
      <p>Duration measures how sensitive a bond's price is to interest rate changes. A bond with duration of 5 years will lose approximately 5% of its value for every 1% rise in yields. Longer maturity and lower coupon rates increase duration. This is why in rising rate environments, long-dated government bonds can suffer significant capital losses despite being "safe" assets.</p>
      <h3>Credit Risk and Ratings</h3>
      <p>Credit rating agencies (Moody's, S&P, Fitch) assess default risk. <strong>Investment grade</strong>: BBB-/Baa3 and above — institutional quality, lower yield. <strong>High yield (junk)</strong>: BB+/Ba1 and below — higher default risk, higher yield to compensate. Spreads (yield above government bonds) widen in recessions as default risk increases. In 2008-09, investment grade spreads reached 600 basis points; high yield spreads exceeded 2,000 basis points.</p>
      <h3>Yield Spreads and the High-Yield Bond Market</h3>
      <p>The <strong>credit spread</strong> is the additional yield a bond pays above a risk-free benchmark (typically government bonds of the same maturity). It compensates investors for default risk, liquidity risk, and uncertainty. Spreads are a real-time barometer of market fear and economic confidence.</p>
      <div class="codex-formula">Credit Spread = Corporate Bond Yield − Government Bond Yield (same maturity)</div>
      <ul>
        <li><strong>Investment grade spreads</strong>: Typically 50-200 basis points (0.5-2%) above Treasuries in normal conditions. A BBB-rated company might borrow at government rate + 1.5%. Spreads compress in bull markets and widen sharply in recessions.</li>
        <li><strong>High-yield (HY) spreads</strong>: Typically 300-600 basis points above Treasuries in normal conditions. In severe crises (2008, March 2020) spreads exceeded 1,000-2,000 bps, implying significant near-term default expectations priced in.</li>
        <li><strong>Spread as distress signal</strong>: An individual bond's spread above peers is an early warning of company-specific trouble — markets often detect credit deterioration months before rating agencies downgrade.</li>
      </ul>
      <p>The <strong>high-yield bond market</strong> ($1.5 trillion in the US alone) finances companies too risky or small for investment-grade status — leveraged buyouts, turnarounds, growth companies, and fallen angels (former investment-grade companies recently downgraded). Historically, HY bonds have delivered equity-like returns (6-8% annually) with lower volatility than stocks — though with sharp sell-offs in recessions. Annual default rates average 3-4% in normal years, rising to 10-14% in severe downturns. The recovery rate on defaulted bonds averages 40 cents on the dollar, so investors in a diversified HY portfolio can absorb defaults if spread income compensates adequately.</p>`,
    },
    {
      id:'portfolio_theory', cat:'markets', title:'Portfolio Theory',
      subtitle:'How to build an efficient portfolio',
      body:`<p>Modern Portfolio Theory (Harry Markowitz, 1952, Nobel Prize 1990) revolutionised investing by mathematically demonstrating that diversification can reduce risk without sacrificing expected return — simply by combining assets that do not move together.</p>
      <h3>The Efficient Frontier</h3>
      <p>The efficient frontier is the set of portfolios that offer the highest expected return for each level of risk (volatility). All rational investors should hold portfolios on this frontier. Portfolios below it are inefficient — they can get higher return for the same risk, or lower risk for the same return, by adjusting allocation.</p>
      <h3>Correlation Is Everything</h3>
      <p>Portfolio variance depends not just on individual asset volatilities but on how they move relative to each other:</p>
      <div class="codex-formula">Portfolio Variance = w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁₂</div>
      <p>Where ρ is the correlation coefficient (-1 to +1). Perfect positive correlation (ρ=1): no diversification benefit. Zero correlation: significant benefit. Negative correlation (ρ=-1): maximum possible benefit — the assets offset each other perfectly. Stocks and bonds historically have low or negative correlation in crises, which is why the classic 60/40 portfolio reduces risk substantially vs. 100% equities.</p>
      <h3>CAPM: The Capital Asset Pricing Model</h3>
      <p>The CAPM, developed by Sharpe, Lintner, and Mossin in the 1960s, provides a framework for expected returns based on systematic risk.</p>
      <div class="codex-formula">E(R) = Rf + β × (Rm − Rf)</div>
      <p>Where Rf = risk-free rate, β = beta (systematic risk), Rm = expected market return. Beta = 1: moves with the market. Beta > 1: amplifies market moves (aggressive). Beta < 1: mutes market moves (defensive). Beta measures only systematic (undiversifiable) risk — the CAPM says you are not compensated for idiosyncratic risk you could diversify away.</p>
      <h3>Beyond CAPM: Factor Models</h3>
      <p>The Fama-French Three-Factor Model (1992) showed that small-cap stocks (size factor) and value stocks (value factor) earned higher returns than CAPM predicted — suggesting these represent additional risk factors that investors must be compensated for. Later extensions added momentum (Carhart), profitability, and investment factors. Factor investing (smart beta) exploits these documented return premia.</p>`,
    },
    {
      id:'index_funds', cat:'markets', title:'Index Funds and ETFs',
      subtitle:'The passive investing revolution',
      body:`<p>Index funds track a market index by holding all its constituents in proportion to their market capitalisation. Exchange-Traded Funds (ETFs) are index funds that trade on stock exchanges with the liquidity of individual shares. Together they have transformed investing, transferring trillions in fees from active managers to ordinary investors.</p>
      <h3>The Evidence for Passive Investing</h3>
      <p>The SPIVA report (S&P Indices vs. Active) consistently finds that over 20 years, 90%+ of active fund managers underperform their benchmark index after fees. This is not because active managers are incompetent — it is because of arithmetic: active managers in aggregate are the market, so they cannot in aggregate outperform. After costs, they must underperform. Those who outperform do not do so consistently.</p>
      <p>A 1% annual fee difference sounds small but compounds devastatingly over time. £10,000 invested for 30 years at 7% annual return: at 0.1% total cost = £74,872. At 1.1% total cost = £55,762. The difference: £19,110 — paid to fund managers for likely underperformance.</p>
      <h3>Types of Index and ETF</h3>
      <ul>
        <li><strong>Broad market</strong>: S&P 500 (500 largest US companies), FTSE All-World, MSCI World. Maximum diversification across the global economy.</li>
        <li><strong>Factor/Smart Beta ETFs</strong>: Tilt toward value, momentum, quality, low volatility, or dividend factors. Evidence-based but with higher costs than pure cap-weighted index funds.</li>
        <li><strong>Bond ETFs</strong>: Government, investment grade, high yield, duration-specific. Allow bond market access at stock-market transaction costs.</li>
        <li><strong>Sector ETFs</strong>: Technology, healthcare, energy, financials. Allow sector bets without individual stock selection.</li>
      </ul>
      <h3>Total Cost of Ownership</h3>
      <p>The Ongoing Charges Figure (OCF) or Expense Ratio is published by all funds. Vanguard FTSE Global All Cap: 0.23%. Vanguard S&P 500 ETF: 0.07%. Typical active fund: 0.7-1.5%. Platform/account fees add 0.1-0.3%. Target total costs below 0.5% for a long-term portfolio — every basis point saved is a permanent return improvement.</p>`,
    },
    {
      id:'forex', cat:'markets', title:'Foreign Exchange (Forex)',
      subtitle:"The world's largest financial market",
      body:`<p>The foreign exchange (FX) market is the largest financial market in the world by volume, trading over 7.5 trillion dollars per day. It operates continuously 24 hours a day, five days a week, as financial centres in Sydney, Tokyo, London, and New York overlap. Unlike stock markets, there is no central exchange — FX trades over-the-counter (OTC) between banks, institutions, and brokers.</p>
      <h3>Exchange Rate Determination</h3>
      <p>In floating exchange rate systems (used by most major economies), rates are determined by supply and demand in the foreign exchange market, influenced by:</p>
      <ul>
        <li><strong>Interest rate differentials</strong>: Higher rates attract capital inflows, strengthening the currency. The carry trade exploits this — borrow in low-rate currencies (historically JPY), invest in high-rate currencies (AUD, NZD).</li>
        <li><strong>Inflation</strong>: Higher inflation erodes purchasing power, weakening the currency over time (Purchasing Power Parity).</li>
        <li><strong>Current account balance</strong>: Persistent trade deficits require importing capital, weakening the currency. Surpluses strengthen it.</li>
        <li><strong>Political stability and risk appetite</strong>: "Risk-off" events (crises, recessions) strengthen safe havens (USD, CHF, JPY) as capital flees risk.</li>
        <li><strong>Central bank intervention</strong>: Central banks can buy or sell their own currency to manage rate levels, though sustained intervention against market forces typically fails.</li>
      </ul>
      <h3>Purchasing Power Parity (PPP)</h3>
      <p>In the long run, exchange rates should reflect differences in price levels between countries. If a basket of goods costs 100 in the US and 150 in the UK, the theoretical PPP exchange rate is $0.67/£. The Economist's "Big Mac Index" is a humorous PPP measure — comparing the price of a McDonald's burger globally to identify over/undervalued currencies. Short-term deviations from PPP can be enormous; PPP is a long-run anchor, not a short-run predictor.</p>
      <h3>Hedging Currency Risk</h3>
      <p>Businesses with international revenues or costs face currency risk — a strengthening domestic currency reduces the domestic value of foreign earnings. Common hedging instruments: forward contracts (lock in an exchange rate for future delivery), currency options (right but not obligation to exchange at a set rate), natural hedging (matching currency of costs to currency of revenues). For investors, currency-hedged ETFs eliminate FX risk but at a cost (typically 0.1-0.5%/year depending on interest rate differential).</p>`,
    },
    {
      id:'esg_investing', cat:'markets', title:'ESG Investing',
      subtitle:'Ethics and financial returns',
      body:`<p>ESG investing integrates Environmental, Social, and Governance factors into investment analysis and decision-making. It has grown from a niche concern to mainstream practice — global ESG-labelled assets exceeded $30 trillion in 2023 — though its implementation is inconsistent and its performance claims contested.</p>
      <h3>The Three Pillars</h3>
      <ul>
        <li><strong>Environmental</strong>: Carbon emissions, energy efficiency, water management, waste and pollution, biodiversity impact, climate risk exposure, transition risk from decarbonisation. The Paris Agreement and net-zero commitments have elevated E factors significantly.</li>
        <li><strong>Social</strong>: Labour standards, supply chain ethics, worker safety, community relations, data privacy, product safety, human capital management, diversity and inclusion. Social factors are harder to quantify but increasingly material (reputational, regulatory, and talent risks).</li>
        <li><strong>Governance</strong>: Board composition and independence, executive remuneration, shareholder rights, audit quality, anti-corruption controls, capital allocation discipline. Good governance is strongly associated with long-term shareholder value. Companies with poor governance often destroy capital regardless of how attractive other fundamentals appear.</li>
      </ul>
      <h3>ESG Ratings Agencies and Their Limitations</h3>
      <p>Major ESG rating providers include MSCI, Sustainalytics, ISS, and Bloomberg. Studies have found that ratings from different agencies agree only 50-60% of the time on the same company — far lower than credit ratings. The methodology differences are substantial: some rate on absolute emissions; others rate on emissions intensity relative to sector; some weight governance heavily while others prioritise environmental factors. This means "ESG fund" can mean very different things.</p>
      <h3>Greenwashing</h3>
      <p>Greenwashing is the practice of claiming ESG credentials without genuine substance. An "ESG fund" may hold oil companies (reclassified as "energy transition companies"), arms manufacturers, fast fashion brands, and others with questionable sustainability records. Investors should examine actual portfolio holdings, not just labels. The EU's SFDR regulation attempts to create clearer disclosure standards, classifying funds as Article 6 (no ESG claim), Article 8 (promotes ESG), or Article 9 (has sustainability objective).</p>`,
    },
    {
      id:'cryptocurrency', cat:'markets', title:'Cryptocurrency',
      subtitle:'Digital assets and blockchain technology',
      body:`<p>Cryptocurrencies are digital currencies secured by cryptographic techniques and recorded on blockchains — decentralised, distributed ledgers maintained by networks of computers rather than any central authority. They represent a novel asset class with extraordinary potential and extraordinary risk.</p>
      <h3>Bitcoin: The Original</h3>
      <p>Bitcoin was created in 2009 by the pseudonymous Satoshi Nakamoto, whose true identity remains unknown. Its protocol is governed by open-source code, and changes require consensus from miners, node operators, and developers. Key design features: fixed maximum supply of 21 million coins; block rewards halve approximately every four years (the "halving"), making supply issuance predictable and deflationary. By 2024, approximately 19.5 million Bitcoin had been mined.</p>
      <p>Bitcoin's investment thesis: digital scarcity analogous to gold, a hedge against fiat currency debasement, a store of value for jurisdictions with unreliable banking systems. Critics: no intrinsic cash flows, high energy consumption (Proof of Work), extreme volatility, limited actual use as a currency due to transaction costs and speed.</p>
      <h3>Ethereum and the Smart Contract Revolution</h3>
      <p>Ethereum introduced Turing-complete smart contracts — arbitrary programmable logic that executes automatically on the blockchain when conditions are met, with no counterparty risk. This enabled: Decentralised Finance (DeFi) — lending, borrowing, trading without banks; NFTs — proof of digital ownership; DAOs — decentralised autonomous organisations governed by token holders. Ethereum transitioned from Proof of Work to Proof of Stake in 2022, reducing energy consumption by 99.95%.</p>
      <h3>Risks and Investment Considerations</h3>
      <ul>
        <li><strong>Volatility</strong>: 80%+ peak-to-trough drawdowns are historically common for Bitcoin and even more extreme for altcoins. In 2022, the total crypto market cap fell from $3 trillion to $800 billion.</li>
        <li><strong>Regulatory risk</strong>: Governments retain the ability to regulate, restrict, or tax crypto. China banned mining and trading; the US has been tightening oversight progressively.</li>
        <li><strong>No intrinsic valuation anchor</strong>: Unlike stocks (valued on earnings) or bonds (valued on cash flows), crypto has no fundamental cash flow basis. Value depends entirely on network effects and collective belief.</li>
        <li><strong>Security and custody</strong>: Irreversible transactions if sent to wrong addresses; exchanges and wallets have been hacked. "Not your keys, not your coins."</li>
      </ul>`,
    },

    // ── MACROECONOMICS ──
    {
      id:'gdp_growth', cat:'macro', title:'GDP and Economic Growth',
      subtitle:'Measuring national prosperity',
      body:`<p>Gross Domestic Product (GDP) is the total monetary value of all final goods and services produced within a country's borders in a given period. It is the most widely used measure of an economy's size, and changes in GDP (growth or recession) are among the most important determinants of corporate earnings, employment, and financial market performance.</p>
      <div class="codex-formula">GDP = C + I + G + (X − M)</div>
      <p>C = Private Consumption (typically 55-70% of GDP). I = Business Investment. G = Government Spending. (X−M) = Net Exports (exports minus imports). For the US, consumption is approximately 70%; for Germany, net exports (trade surplus) is a more significant component.</p>
      <h3>Real vs. Nominal GDP</h3>
      <p>Nominal GDP measures output in current prices. Real GDP adjusts for inflation using a base year price level. If nominal GDP grows 6% but inflation is 4%, real GDP grew only 2%. Real GDP growth is what matters for living standards — nominal growth that merely reflects price increases does not represent more actual goods and services.</p>
      <h3>GDP Per Capita and Living Standards</h3>
      <p>Total GDP tells you nothing about average living standards — a large country with many poor people can have higher total GDP than a small wealthy country. GDP per capita (GDP / population) is a better measure. Norway's GDP per capita exceeds China's by 6× despite China's total GDP being 20× larger.</p>
      <p>GDP per capita also understates wellbeing: it does not capture inequality, leisure time, environmental quality, unpaid work (caring, volunteering), or informal/black market activity. The UN Human Development Index (HDI) adds health and education measures to income.</p>
      <h3>The GDP Deflator and Measuring Inflation</h3>
      <p>The <strong>GDP deflator</strong> is a broad price index that measures the change in prices across all goods and services produced in an economy — wider in scope than the Consumer Price Index (CPI), which only tracks a household consumption basket.</p>
      <div class="codex-formula">GDP Deflator = (Nominal GDP / Real GDP) × 100</div>
      <p>If nominal GDP is £2.5 trillion and real GDP (at base-year prices) is £2.3 trillion, the deflator is 108.7 — implying a 8.7% cumulative price increase since the base year. Unlike CPI, the deflator automatically adjusts its composition as the economy's output mix changes — it is not fixed to a historical basket. This makes it theoretically superior but less useful for measuring cost-of-living changes for typical households.</p>
      <ul>
        <li><strong>CPI</strong>: Fixed household basket — better for adjusting wages, pensions, and benefits to protect purchasing power.</li>
        <li><strong>GDP Deflator</strong>: Economy-wide — better for converting nominal to real GDP and measuring overall price pressure on producers.</li>
        <li><strong>PCE Deflator</strong>: Personal Consumption Expenditures deflator, used by the US Federal Reserve as its preferred inflation measure — broader than CPI and updates its basket more frequently.</li>
      </ul>
      <h3>Growth Drivers</h3>
      <ul>
        <li><strong>Capital accumulation</strong>: Investment in physical capital (machinery, infrastructure) and human capital (education, health) raises worker productivity.</li>
        <li><strong>Technological progress</strong>: The Solow Residual — productivity growth not explained by capital or labour inputs — is the ultimate driver of long-run prosperity. Historical examples: steam power, electricity, computing, AI.</li>
        <li><strong>Institutional quality</strong>: Property rights, rule of law, contract enforcement, and low corruption are strongly correlated with long-run growth. Weak institutions are the root cause of persistent poverty in many countries.</li>
        <li><strong>Population growth</strong>: More workers increases total output (though not necessarily per capita output).</li>
      </ul>`,
    },
    {
      id:'monetary_policy_entry', cat:'macro', title:'Monetary Policy',
      subtitle:'Central banks and the money supply',
      body:`<p>Monetary policy is the use of interest rates, money supply, and other tools by a central bank to achieve macroeconomic objectives: price stability (low inflation), maximum employment, and economic growth. Central banks are typically independent from governments to insulate policy from short-term political pressures.</p>
      <h3>The Interest Rate Tool</h3>
      <p>The primary tool: the central bank sets a short-term reference rate (Federal Funds Rate in the US; Base Rate in UK; Main Refinancing Rate in Eurozone). This rate influences all borrowing costs throughout the economy.</p>
      <p><strong>Raising rates (tightening)</strong>: Makes borrowing more expensive → businesses invest less, consumers borrow less → demand falls → inflation cools. Also strengthens the currency as capital is attracted by higher yields. Risks: slows growth, can cause recession if too aggressive.</p>
      <p><strong>Cutting rates (easing)</strong>: Makes borrowing cheaper → stimulates investment and consumption → supports growth and employment. Risks: if too loose for too long, fuels inflation and asset bubbles (as arguably happened 2009-2021).</p>
      <h3>The Inflation Mandate and Target</h3>
      <p>Most central banks target approximately 2% annual inflation. Too low (especially deflation) is dangerous — falling prices cause consumers to delay purchases ("why buy today when it will be cheaper tomorrow?"), creating a deflationary spiral. Japan's "Lost Decade" (1990s-2000s) illustrated deflation's destructive power. Too high erodes real wages and savings, creates uncertainty, and eventually requires painful tightening to restore credibility.</p>
      <h3>Unconventional Tools</h3>
      <p><strong>Quantitative Easing (QE)</strong>: When rates hit zero (Zero Lower Bound), the central bank creates new reserves and uses them to purchase long-dated government bonds and other securities. This pushes down long-term yields, stimulates asset prices, and injects liquidity. First used systematically by the Bank of Japan (2001), then by the Fed after 2008. QE's effectiveness is debated — it clearly stabilised markets in crises but may have contributed to inequality by inflating asset prices disproportionately benefiting wealthy owners of financial assets.</p>
      <p><strong>Forward guidance</strong>: Communicating the likely future path of interest rates. If the market believes rates will stay low for years, long-term rates fall today even without actual rate changes — managing expectations is itself a policy tool.</p>
      <h3>Quantitative Easing: Mechanics and Transmission</h3>
      <p>QE works through several channels simultaneously — the <strong>monetary policy transmission mechanism</strong>:</p>
      <ul>
        <li><strong>Asset price channel</strong>: The central bank buys government bonds, pushing their prices up and yields down. Investors displaced from bonds seek higher returns in equities, corporate bonds, and property — raising all asset prices and stimulating investment through the "wealth effect."</li>
        <li><strong>Bank lending channel</strong>: New central bank reserves improve bank balance sheets, potentially encouraging more lending to businesses and households — though this channel was weaker than expected post-2008 because banks used excess reserves to rebuild capital rather than lend.</li>
        <li><strong>Exchange rate channel</strong>: Lower domestic yields make the currency less attractive to foreign capital, weakening it. A weaker currency boosts exports and raises import prices, supporting growth and inflation from both sides.</li>
        <li><strong>Expectations channel</strong>: QE signals the central bank's commitment to accommodation, anchoring long-term rate expectations lower and supporting borrowing decisions made years in advance.</li>
      </ul>
      <div class="codex-formula">QE Impact: Central Bank Buys Bonds → Prices Rise → Yields Fall → Borrowing Cheaper → Spending Rises</div>
      <p><strong>Quantitative Tightening (QT)</strong> — the reverse of QE — involves allowing bond holdings to mature without reinvestment (passive QT) or actively selling bonds back into the market (active QT). The Fed began QT in 2022 alongside rate hikes, shrinking its balance sheet from $9 trillion peak. The pace of QT is constrained by financial stability concerns: too aggressive QT can drain bank reserves, causing funding market stress (as happened briefly in September 2019 with the US repo rate spike).</p>`,
    },
    {
      id:'fiscal_policy_entry', cat:'macro', title:'Fiscal Policy',
      subtitle:'Government spending and taxation',
      body:`<p>Fiscal policy uses government spending (G) and taxation (T) to influence aggregate demand and hence output, employment, and inflation. Unlike monetary policy (controlled by independent central banks), fiscal policy is determined by elected governments through the budget process — making it inherently more political.</p>
      <h3>Expansionary vs. Contractionary Policy</h3>
      <ul>
        <li><strong>Expansionary</strong>: Increase spending and/or cut taxes. Increases aggregate demand, supporting growth and employment in a recession. Creates (or increases) a budget deficit — the government borrows the difference between spending and revenue, adding to national debt.</li>
        <li><strong>Contractionary (Austerity)</strong>: Cut spending and/or raise taxes. Reduces aggregate demand, slowing inflation or reducing deficits. Risk: if implemented during a recession, can deepen the downturn (as in the Eurozone 2010-2013 fiscal consolidation).</li>
      </ul>
      <h3>The Keynesian Multiplier</h3>
      <p>Government spending has a multiplier effect: initial spending creates income for recipients, who spend some of it (based on the Marginal Propensity to Consume, MPC), creating income for others, who spend again. Multiplier = 1/(1-MPC). If MPC = 0.8, multiplier = 5: 1 of government spending generates 5 of GDP.</p>
      <p>In practice, the multiplier is smaller because: some is saved, some is spent on imports (leaks from the domestic economy), and crowding-out occurs if higher government borrowing raises interest rates, reducing private investment. Empirical estimates suggest multipliers of 0.5-2.0 depending on conditions — highest during recessions with accommodative monetary policy.</p>
      <h3>Automatic Stabilisers</h3>
      <p>Built-in mechanisms that automatically cushion economic swings without requiring new legislation. In recessions: unemployment benefits automatically rise, tax revenue automatically falls (as incomes and profits fall), providing fiscal stimulus. In booms: the opposite. These prevent fiscal policy from amplifying the cycle, stabilising the economy passively and immediately.</p>
      <h3>Debt Sustainability</h3>
      <p>Governments can run deficits indefinitely if they can sustain debt at a reasonable cost. Debt sustainability requires r &lt; g — the interest rate on debt must be below the GDP growth rate. When r > g, debt/GDP grows explosively without a primary surplus. Japan has maintained debt above 200% of GDP for decades; whether this is sustainable depends on whether the BoJ can maintain low yields indefinitely.</p>
      <h3>The Laffer Curve: Tax Rates and Revenue</h3>
      <p>At 0% tax rate, government collects zero revenue. At 100%, nobody works (all earnings confiscated) — again zero revenue. In between lies a revenue-maximising rate. Arthur Laffer's napkin sketch (1974) formalized this: tax cuts above the revenue-maximising rate can <em>increase</em> tax revenue by stimulating economic activity. This argument was used to justify Reagan's 1981 tax cuts and Trump's 2017 Tax Cuts and Jobs Act. In practice, most economists believe the US is well below the revenue-maximising rate — making pure "supply-side" self-financing claims empirically dubious, though supply-side effects on growth are real.</p>
      <h3>Fiscal vs. Monetary Policy: Coordination and Conflict</h3>
      <p>Optimal macroeconomic management requires coordination between fiscal and monetary authorities. The Weimar Germany hyperinflation resulted from the Reichsbank printing money to finance government deficits — a cautionary tale of fiscal dominance over monetary policy. Modern central bank independence is designed to prevent this. However, when both fiscal and monetary policy push in the same direction — as during COVID (massive fiscal stimulus + QE) — the combined force can overshoot. The 2021-23 inflation surge in developed economies partly reflects this coordination challenge.</p>`,
    },
    {
      id:'inflation', cat:'macro', title:'Inflation',
      subtitle:'Why prices rise over time',
      body:`<p>Inflation is the general and persistent rise in the price level of goods and services in an economy, reducing the purchasing power of money over time. Controlling inflation is the primary mandate of most central banks.</p>
      <div class="codex-formula">Real Return = Nominal Return − Inflation Rate</div>
      <p>At 2% inflation — the central bank target — prices double in approximately 36 years (Rule of 72: 72/2 = 36). Cash that earns no interest loses half its purchasing power in 36 years in a "low inflation" environment. This illustrates why any long-term investment strategy must beat inflation to build real wealth.</p>
      <h3>Causes of Inflation</h3>
      <ul>
        <li><strong>Demand-Pull</strong>: "Too much money chasing too few goods." Occurs when aggregate demand exceeds productive capacity — full employment, high consumer confidence, expansionary fiscal/monetary policy. The post-COVID inflation spike of 2021-23 had strong demand-pull elements from government stimulus.</li>
        <li><strong>Cost-Push</strong>: Supply-side price pressures. Oil price spikes (1973, 1979, 2022) raise costs throughout the economy — transport, manufacturing, heating — driving up prices from the supply side. Businesses pass higher input costs to consumers.</li>
        <li><strong>Built-In (Wage-Price Spiral)</strong>: Workers demand higher wages to compensate for rising living costs; higher wages raise business costs; businesses raise prices to cover costs; workers demand higher wages again. This self-reinforcing cycle was a key feature of 1970s inflation and central banks' nightmare.</li>
        <li><strong>Monetary</strong>: Milton Friedman: "Inflation is always and everywhere a monetary phenomenon." In the long run, excessive money creation relative to output growth leads to inflation. Hyperinflations (Weimar Germany 1923, Zimbabwe 2008, Venezuela 2018) are always ultimately monetary phenomena — governments printing money to fund deficits.</li>
      </ul>
      <h3>Winners and Losers from Inflation</h3>
      <ul>
        <li><strong>Winners</strong>: Debtors (repay with cheaper money), owners of real assets (property, equities hedge inflation long-term), governments (inflate away real value of nominal debt).</li>
        <li><strong>Losers</strong>: Savers holding cash or fixed-rate deposits, creditors with fixed-rate loans, workers on fixed nominal wages, pensioners on fixed nominal incomes.</li>
      </ul>
      <h3>Hyperinflation</h3>
      <p>When inflation exceeds ~50% per month, money loses its function as a store of value and medium of exchange. Historical hyperinflations share a common cause: governments monetising deficits — printing money to pay obligations. Weimar Germany (1923): prices doubled every 3.7 days at the peak; workers were paid twice daily and immediately spent wages before prices rose further. Zimbabwe (2008): monthly inflation reached 79.6 billion percent; the government printed 100-trillion-dollar notes. Venezuela (2018): 1,000,000% annual inflation. These are not abstract economic phenomena — they destroy savings, destabilise societies, and often end in political upheaval or currency reform.</p>
      <h3>Deflation: The Opposite Problem</h3>
      <p>Deflation (falling prices) sounds beneficial but is economically dangerous. If prices fall today, consumers and businesses delay purchases — expecting cheaper prices tomorrow. This depresses demand, causes firms to cut output and employment, further reducing demand. Japan experienced "deflationary stagnation" for decades after the 1990 asset bubble burst. Central banks have asymmetric tools: raising rates to fight inflation is relatively mechanical; escaping entrenched deflation (zero lower bound problem) is genuinely hard.</p>`,
    },
    {
      id:'unemployment', cat:'macro', title:'Unemployment',
      subtitle:'The cost of idle labour',
      body:`<p>Unemployment represents the waste of the most important economic resource — human labour. It carries not just economic costs (lost output, reduced tax revenues, higher social spending) but profound human costs: stress, declining health, skills deterioration, and social isolation. Full employment is a central objective of macroeconomic policy.</p>
      <h3>Types of Unemployment</h3>
      <ul>
        <li><strong>Cyclical (Demand-Deficient)</strong>: Caused by insufficient aggregate demand during recessions. When firms see falling sales, they reduce payrolls. The primary target of Keynesian demand management. The 2008-09 recession saw cyclical unemployment spike dramatically in most developed economies.</li>
        <li><strong>Structural</strong>: Fundamental mismatch between workers' skills and available jobs — often caused by technological change or shifts in comparative advantage. Coal miners cannot easily become software engineers. Requires long-term solutions: retraining, geographic mobility, education reform. Stimulus cannot address structural unemployment.</li>
        <li><strong>Frictional</strong>: Voluntary, short-term unemployment as workers move between jobs or enter the workforce. A healthy 3-4% natural rate of frictional unemployment always exists even in boom conditions — it reflects the time needed to match workers to appropriate roles.</li>
        <li><strong>Seasonal</strong>: Predictable, recurring patterns driven by the season: farm workers in winter, ice cream sellers in autumn, ski instructors in summer. Treated as a normal part of the labour market.</li>
      </ul>
      <h3>Unemployment Rate Measurement</h3>
      <p>The official unemployment rate measures those actively seeking work as a percentage of the labour force. It understates true labour market weakness because it excludes: the "discouraged" — those who have given up looking; the "underemployed" — part-timers who want full-time work; the "hidden unemployed" — those claiming sickness benefits or in early retirement in a weak market. The U-6 measure in the US attempts to capture broader labour underutilisation.</p>
      <h3>The Phillips Curve and NAIRU</h3>
      <p>A.W. Phillips (1958) documented an inverse relationship between unemployment and wage inflation. Policymakers believed they could exploit this trade-off — accept more inflation for less unemployment. The stagflation of the 1970s destroyed this simple trade-off: unemployment and inflation rose simultaneously, refuting the stable Phillips Curve. Milton Friedman and Edmund Phelps (independently) predicted this would happen: there is a Natural Rate of Unemployment (NAIRU) where inflation is stable. Trying to push unemployment below the NAIRU through stimulus just generates accelerating inflation.</p>
      <h3>Okun's Law: Unemployment and GDP</h3>
      <p>Arthur Okun (1962) observed that for every 1% rise in the unemployment rate above its natural rate, GDP falls approximately 2% below its potential. This relationship — known as Okun's Law — provides a practical link between the labor market and economic output. If unemployment rises from 4% to 6% (2 percentage points), GDP is approximately 4% below what the economy could produce at full employment. The rule is approximate and varies across countries and time, but remains a useful benchmark for estimating the output cost of high unemployment.</p>
      <h3>The Great Depression and Mass Unemployment</h3>
      <p>US unemployment reached 25% in 1933 — one in four workers without a job. Industrial output collapsed 47% from 1929-33. Bank failures destroyed savings; international trade collapsed 65% as countries erected tariff barriers (Smoot-Hawley). The Depression fundamentally changed economics: Keynes's <em>General Theory</em> (1936) argued markets do not automatically return to full employment — government intervention was necessary. The lesson that deflation + bank failures + policy inaction create devastating feedback loops directly shaped the aggressive policy responses to 2008 and 2020.</p>`,
    },
    {
      id:'trade_policy', cat:'macro', title:'International Trade and Policy',
      subtitle:'Why nations trade and how they restrict it',
      body:`<p>International trade allows nations to specialise in what they produce most efficiently (comparative advantage) and import goods where others are more efficient. This specialisation raises global living standards — the total global output is larger with free trade than without. But trade also creates distributional winners and losers within countries, generating persistent political tension.</p>
      <h3>Comparative Advantage: The Core Insight</h3>
      <p>Even if Country A is absolutely more productive at everything than Country B, both countries gain from trade. Country A should specialise in what it is relatively best at (lowest opportunity cost); Country B should specialise in what it is relatively least bad at. This sounds counterintuitive but is mathematically robust — it is the insight that drives the entire WTO system.</p>
      <h3>Trade Barriers and Their Costs</h3>
      <ul>
        <li><strong>Tariffs</strong>: Import taxes. Raise revenue and protect domestic producers, but raise prices for domestic consumers and invite retaliation from trading partners. The 2018-2019 US-China trade war demonstrated how quickly retaliatory tariff spirals damage both economies.</li>
        <li><strong>Import quotas</strong>: Quantitative limits on imports. Similar effects to tariffs but without generating government revenue — quota rents go to import licence holders.</li>
        <li><strong>Subsidies to domestic producers</strong>: Make domestic firms more competitive internationally but distort global markets. Agricultural subsidies in the EU and US have historically depressed world food prices, harming developing-country farmers.</li>
        <li><strong>Non-Tariff Barriers</strong>: Technical regulations, standards, and customs procedures that de facto restrict imports. The EU's regulatory regime is effectively a non-tariff barrier for non-EU exporters.</li>
      </ul>
      <h3>Trade Balance and Current Account</h3>
      <div class="codex-formula">Current Account = (X − M) + Net Income + Net Transfers</div>
      <p>A current account deficit means the country is importing more than it exports, financed by foreign capital inflows (capital account surplus). This is not inherently problematic — the US has run persistent deficits for decades, financed by foreigners wanting to hold dollar assets. Problems arise if foreign creditors lose confidence and withdraw financing suddenly.</p>
      <h3>Currency Wars and Exchange Rate Manipulation</h3>
      <p>When a country deliberately weakens its currency (through printing money or market intervention), its exports become cheaper in foreign markets and imports more expensive — improving the trade balance. This is termed "competitive devaluation" or "beggar-thy-neighbour" policy. In the 1930s, countries successively devalued currencies in a global race to the bottom that contracted world trade. The IMF was created in 1944 partly to prevent this. China was accused of currency manipulation through most of the 2000s-2010s, maintaining an artificially weak yuan to support export competitiveness.</p>
      <h3>The WTO and Rules-Based Trade</h3>
      <p>The World Trade Organisation (WTO, 1995) replaced GATT with a more comprehensive rules-based system covering goods, services, and intellectual property. 164 member nations commit to Most Favoured Nation (MFN) treatment — trade preferences given to any one country must be extended to all. The WTO's dispute settlement mechanism adjudicates trade disputes between members. However, the US effectively paralysed the WTO Appellate Body from 2019 by blocking appointments — a major challenge to the multilateral trade system that underpins globalisation.</p>`,
    },

    // ── ADVANCED FINANCE ──
    {
      id:'derivatives_entry', cat:'advanced', title:'Derivatives',
      subtitle:'Financial instruments derived from underlying assets',
      body:`<p>Derivatives are financial contracts whose value depends on (is "derived from") the price of an underlying asset — equities, bonds, commodities, currencies, interest rates, or credit events. They are used for two fundamental purposes: hedging (reducing risk) and speculation (increasing risk for profit). The global derivatives market is measured in hundreds of trillions of dollars notional value — larger than all other financial markets combined.</p>
      <h3>Futures Contracts</h3>
      <p>A futures contract is a <strong>legally binding obligation</strong> to buy or sell a specific quantity of an asset at a specified price on a specified future date. Both buyer and seller are obligated. Traded on exchanges (standardised) with daily mark-to-market settlement through a clearinghouse, which eliminates counterparty risk.</p>
      <p>Uses: commodity producers (farmers, oil companies) lock in selling prices to remove price uncertainty. Airlines buy jet fuel futures to manage input costs. Currency futures hedge FX risk. Index futures allow rapid portfolio adjustment without trading individual stocks.</p>
      <h3>Options Contracts</h3>
      <p>An option gives the buyer the <strong>right but not the obligation</strong> to buy (call) or sell (put) an asset at the strike price before or on expiration. The seller (writer) receives a premium upfront and is obligated to perform if exercised.</p>
      <ul>
        <li><strong>Call option</strong>: Right to buy at strike price. Profits if asset rises above strike + premium paid. Maximum loss = premium paid; theoretically unlimited upside.</li>
        <li><strong>Put option</strong>: Right to sell at strike price. Profits if asset falls below strike − premium paid. Used by investors as insurance against portfolio declines.</li>
        <li><strong>In the Money (ITM)</strong>: Call when price > strike; Put when price &lt; strike. Has intrinsic value.</li>
        <li><strong>At the Money (ATM)</strong>: Price ≈ strike. Maximum time value.</li>
        <li><strong>Out of the Money (OTM)</strong>: Call when price &lt; strike; Put when price > strike. Pure time value, no intrinsic value.</li>
      </ul>
      <h3>The Black-Scholes Model</h3>
      <p>Fischer Black, Myron Scholes, and Robert Merton developed the first rigorous option pricing formula in 1973 — earning the Nobel Prize in Economics in 1997. Key insight: a riskless portfolio can be constructed by combining an option with the underlying stock in the right proportion (delta hedging). If this portfolio earns the risk-free rate, the option price is uniquely determined. The model assumes continuous trading, constant volatility, and log-normally distributed returns. In practice, implied volatility varies — the "volatility smile" — reflecting real-world deviations from these assumptions.</p>`,
    },
    {
      id:'behavioral_finance_entry', cat:'advanced', title:'Behavioral Finance',
      subtitle:'Why investors are irrational',
      body:`<p>Behavioural finance combines insights from psychology, neuroscience, and economics to understand how cognitive biases and emotional reactions systematically cause investors to deviate from the rational, utility-maximising behaviour assumed by classical finance theory. Understanding these biases is the most practical edge most individual investors can develop.</p>
      <h3>Prospect Theory (Kahneman and Tversky, 1979)</h3>
      <p>The Nobel Prize-winning framework that replaced Expected Utility Theory as the best description of actual decision-making under risk. Three key insights:</p>
      <ul>
        <li><strong>Reference dependence</strong>: People evaluate outcomes as gains or losses relative to a reference point (usually the status quo or purchase price), not as absolute final wealth levels.</li>
        <li><strong>Loss aversion</strong>: Losses feel approximately 2-2.5× more painful than equivalent gains feel pleasurable. Losing 100 feels worse than winning 100 feels good. This leads to irrational risk-aversion in gains and risk-seeking in losses.</li>
        <li><strong>Diminishing sensitivity</strong>: The difference between 0 and 100 feels larger than the difference between 900 and 1,000, even though both are 100. The value function is concave in gains (risk-averse) and convex in losses (risk-seeking) — the S-shaped curve.</li>
      </ul>
      <h3>Key Biases and Their Market Impact</h3>
      <ul>
        <li><strong>Overconfidence</strong>: Most investors believe they are above-average stock pickers. Trading frequency correlates with below-average returns — overconfident investors trade too much, incurring transaction costs. Studies show men trade more than women and achieve worse returns on average.</li>
        <li><strong>Anchoring</strong>: Over-relying on the first piece of information encountered (IPO price, past high). Analysts anchored to previous estimates update insufficiently when new information arrives. Investors anchored to purchase price hold losers too long.</li>
        <li><strong>Herd Behaviour</strong>: Following the crowd feels safe and triggers the same brain regions as physical safety. Creates momentum in prices (bubbles and crashes). The Dot-com bubble, housing bubble, and crypto manias all involved strong herding.</li>
        <li><strong>Recency Bias</strong>: Overweighting recent events when forecasting. Investors increase equity allocation after bull markets (buy high) and reduce it after crashes (sell low) — the opposite of optimal behaviour.</li>
        <li><strong>Disposition Effect</strong>: Selling winners too early (lock in gains, avoid regret) and holding losers too long (avoid realising the loss). The tax-rational behaviour is the opposite — realise losses for tax benefits, let winners run.</li>
        <li><strong>Home Bias</strong>: Over-allocating to domestic stocks relative to the global market cap. UK investors hold disproportionately more UK equities (4% of global market) than optimal diversification suggests.</li>
      </ul>
      <h3>Practical Implications</h3>
      <p>The goal is not to eliminate emotions — that is impossible — but to design investment processes that constrain their destructive impact. Systematic, rules-based approaches (automatic rebalancing, dollar-cost averaging, index investing) remove the decision points where biases inflict the most damage.</p>`,
    },
    {
      id:'risk_return', cat:'advanced', title:'Risk and Return',
      subtitle:'The fundamental trade-off in finance',
      body:`<p>The risk-return trade-off is the foundational principle of finance: higher expected returns require accepting higher risk. This is not a preference — it is an equilibrium requirement. Any asset offering higher return with the same risk as another would be immediately bought by all rational investors, bidding its price up and return down until parity was restored.</p>
      <h3>Systematic vs. Idiosyncratic Risk</h3>
      <p><strong>Systematic (market) risk</strong>: Risk that affects all assets to varying degrees — recessions, interest rate changes, geopolitical crises, pandemics. Cannot be diversified away. Investors must be compensated for bearing this risk — the equity risk premium (~5% historically over government bonds) is this compensation.</p>
      <p><strong>Idiosyncratic (specific) risk</strong>: Risk unique to a single company or sector — an individual CEO's fraud, a product liability scandal, a factory fire. Can be diversified away by holding a sufficiently large portfolio. Because it can be eliminated for free through diversification, rational markets do not compensate investors for bearing it. Concentrated portfolios in a few stocks carry idiosyncratic risk without additional expected return — a free lunch in reverse.</p>
      <h3>Risk Measures</h3>
      <ul>
        <li><strong>Standard Deviation (Volatility)</strong>: Most common risk measure. Annualised standard deviation of returns. S&P 500 historical volatility: ~15-17%/year. Not a complete picture — it treats upside and downside deviations equally, while investors care primarily about downside.</li>
        <li><strong>Beta (β)</strong>: Systematic risk relative to the market. β=1: moves with market. β>1: amplifies market moves. β&lt;1: dampens them. Negative β assets (gold, some defensive stocks) provide portfolio insurance.</li>
        <li><strong>Value at Risk (VaR)</strong>: Maximum loss at a given confidence level over a given period. "95% daily VaR = £10M" means 5% probability of losing more than £10M on any day. Limitation: doesn't tell you how bad the tail loss is.</li>
        <li><strong>Expected Shortfall (CVaR)</strong>: Average loss in the worst X% of scenarios. More informative than VaR about tail risk.</li>
      </ul>
      <div class="codex-formula">Sharpe Ratio = (Portfolio Return − Risk-Free Rate) / Portfolio Volatility</div>
      <p>The Sharpe Ratio measures return per unit of risk — the efficiency of the risk taken. A Sharpe above 1.0 is excellent; 0.5-1.0 is good; below 0.5 is poor. Comparing funds on return alone ignores risk taken; the Sharpe ratio enables apples-to-apples comparison.</p>`,
    },
    {
      id:'hedge_funds', cat:'advanced', title:'Hedge Funds',
      subtitle:'Alternative investments for sophisticated capital',
      body:`<p>Hedge funds are private investment partnerships that use sophisticated strategies — short selling, leverage, derivatives, arbitrage — to seek returns uncorrelated with traditional markets. They are available only to institutional investors and high-net-worth individuals, owing to their complexity and risk. The industry manages approximately $4 trillion globally.</p>
      <h3>Key Strategies in Detail</h3>
      <ul>
        <li><strong>Long/Short Equity</strong>: Hold undervalued longs and short overvalued shorts. Net exposure can be market-neutral (equal long/short, pure alpha), equity-biased (mostly long), or short-biased. Returns come from stock selection rather than market direction. The largest hedge fund strategy by assets.</li>
        <li><strong>Global Macro</strong>: Top-down directional bets on interest rates, currencies, commodities, and equity indices based on macroeconomic analysis. George Soros's famous "breaking the Bank of England" trade in September 1992 made approximately $1 billion in a single day by shorting sterling before the UK exited the European Exchange Rate Mechanism.</li>
        <li><strong>Event Driven</strong>: Merger arbitrage (buying targets and shorting acquirers in announced deals), activist investing (taking stakes and pressuring management), distressed debt (buying bonds of companies approaching or in bankruptcy at deep discounts).</li>
        <li><strong>Quantitative/Systematic</strong>: Computer models identify statistical patterns. Renaissance Technologies' Medallion Fund — closed to outside investors — has achieved ~66% annualised gross returns since 1988, the most successful investment track record in history. D.E. Shaw, Two Sigma, and Winton are other prominent quant firms.</li>
        <li><strong>Fixed Income Arbitrage</strong>: Exploiting pricing discrepancies between related fixed income instruments. Typically highly leveraged (30-50× notional) on small mispricings. Long-Term Capital Management's collapse in 1998 demonstrated the catastrophic systemic risk when highly leveraged arbitrage unwinds.</li>
      </ul>
      <h3>Performance Reality</h3>
      <p>Despite their sophisticated strategies, hedge fund returns have disappointed most investors over the past two decades. The HFRI Fund Weighted Composite Index has significantly underperformed a simple 60/40 stock/bond portfolio since 2009. The average fund does not justify the 2-and-20 fee. Returns are concentrated in the top decile of managers — and identifying these in advance is extremely difficult.</p>`,
    },
    {
      id:'private_equity', cat:'advanced', title:'Private Equity',
      subtitle:'Transforming companies away from public markets',
      body:`<p>Private equity (PE) involves acquiring stakes in private companies with the intention of improving them over several years before selling — typically targeting 20%+ annual returns (Internal Rate of Return, or IRR). It is one of the highest-returning and most opaque segments of the investment industry.</p>
      <h3>The Leveraged Buyout (LBO) Mechanics</h3>
      <p>The LBO is the defining PE transaction. A PE firm identifies a stable, cash-generative business and acquires it using a combination of equity (typically 30-40% of purchase price) and debt (60-70%). The debt — secured against the acquired company's assets and cash flows — is placed on the company's balance sheet, not the PE firm's. This debt amplifies equity returns (and risks).</p>
      <p>Example: PE fund buys a company for 500M: 150M equity, 350M debt. Over 5 years, the company's EBITDA grows, the debt is repaid from cash flows to 200M. The company is sold for 700M. Equity return = (700M − 200M) − 150M = 350M gain on 150M invested = ~18% IRR (well above market returns). Without leverage, the same 700M sale on 500M investment would have been ~7% IRR — leverage is the engine of PE returns.</p>
      <h3>Value Creation Levers</h3>
      <ul>
        <li><strong>Operational improvement</strong>: Cost reduction, revenue growth, working capital optimisation, management incentivisation (PE managers typically receive significant equity stakes, creating strong alignment). McKinsey analysis suggests operational improvement accounts for roughly half of PE value creation.</li>
        <li><strong>Multiple expansion</strong>: Buy at 7× EBITDA, sell at 10× EBITDA after improving the business. Even without earnings growth, this multiple re-rating creates substantial returns.</li>
        <li><strong>Financial engineering</strong>: Debt paydown from operating cash flows grows equity value mechanically. Dividend recapitalisations (taking out cash via new debt) can return capital to investors before exit, boosting IRR.</li>
        <li><strong>Strategic repositioning</strong>: Add-on acquisitions (buy-and-build), geographic expansion, product extensions. These increase scale and strategic value to potential acquirers.</li>
      </ul>
      <h3>Risks and Controversies</h3>
      <p>PE's use of leverage means high debt loads can overwhelm companies in recessions, leading to bankruptcies that would not have occurred under lower leverage. Critics argue PE extracts value from companies at the expense of workers, creditors, and the broader economy. Academic evidence on employment effects is mixed. IRR as a performance metric can be gamed through early exits and dividend recapitalisations — the Public Market Equivalent (PME) is a more comparable benchmark.</p>`,
    },

    // ── NEW ENTRIES ──
    {
      id:'game_theory', cat:'basics', title:'Game Theory',
      subtitle:'Strategic decision-making when outcomes depend on others',
      body:`<p>Game theory is the mathematical study of strategic interaction — situations where your best decision depends on what others do. Developed by John von Neumann and John Nash, it is foundational to economics, political science, evolutionary biology, and military strategy.</p>
      <h3>Core Concepts</h3>
      <ul>
        <li><strong>Players</strong>: Decision-makers in the game (individuals, firms, countries).</li>
        <li><strong>Strategies</strong>: The choices available to each player.</li>
        <li><strong>Payoffs</strong>: The outcome each player receives for each combination of strategies.</li>
        <li><strong>Nash Equilibrium</strong>: A set of strategies where no player can improve their payoff by unilaterally changing their strategy. Named after John Nash (depicted in <em>A Beautiful Mind</em>).</li>
      </ul>
      <h3>The Prisoner's Dilemma</h3>
      <p>Two suspects are interrogated separately. If both stay silent: 1 year each. If one betrays the other: betrayer goes free, silent one gets 10 years. If both betray: 5 years each. Individually rational to betray — but both betraying is worse than both staying silent. This models arms races, price wars, and environmental agreements.</p>
      <h3>Real-World Applications</h3>
      <ul>
        <li><strong>OPEC</strong>: Members have incentive to cheat on oil production quotas (prisoner's dilemma), undermining cartel agreements.</li>
        <li><strong>Auction design</strong>: How to structure spectrum auctions, government procurement, or ad bidding systems (Google's Nobel-winning AdWords mechanism).</li>
        <li><strong>Oligopoly pricing</strong>: Boeing vs. Airbus, Coca-Cola vs. Pepsi — strategic interdependence shapes pricing and investment.</li>
        <li><strong>Repeated games</strong>: When games repeat, cooperation becomes stable (tit-for-tat strategies). This explains why reputation matters in business and why countries maintain trade agreements.</li>
      </ul>
      <h3>Tragedy of the Commons</h3>
      <p>When a resource is shared (a commons), individual incentive to over-use it leads to collective depletion. Each user bears the full benefit of extraction but shares the cost of depletion. Solutions: privatisation (assign property rights), regulation (quotas, taxes), or community governance (Elinor Ostrom's Nobel-winning work showed communities can self-govern commons sustainably).</p>`,
    },
    {
      id:'labor_markets', cat:'macro', title:'Labor Markets',
      subtitle:'How wages and employment are determined',
      body:`<p>The labour market is the meeting point of workers selling their time and skills, and employers buying those services. Unlike commodity markets, labour markets are shaped by power, law, social norms, and geography in ways that make them persistently imperfect.</p>
      <h3>Wage Determination</h3>
      <p>In a competitive market, the wage rate settles where labour supply equals demand. Supply: how many hours workers are willing to supply at each wage level. Demand: how productive workers are (their marginal revenue product). In practice, wages reflect skill scarcity, union bargaining, minimum wage laws, and firm-specific factors.</p>
      <h3>Labor Market Concepts</h3>
      <ul>
        <li><strong>Monopsony</strong>: A single dominant employer (like a company town or Amazon in some logistics markets) can hold wages below competitive levels — the labour market equivalent of monopoly. Monopsony power explains why minimum wages sometimes don't reduce employment as textbook models predict.</li>
        <li><strong>Efficiency wages</strong>: Paying above-market wages to attract better workers, reduce turnover, and boost morale — making higher wages profitable for the firm. Henry Ford doubled wages to $5/day in 1914, halving turnover.</li>
        <li><strong>Human capital</strong>: Workers invest in skills (education, training) that raise their productivity. Returns to education — the wage premium from degrees — is a central debate in education policy.</li>
        <li><strong>Structural vs. frictional unemployment</strong>: Structural = skills mismatch (coal miners when coal industry collapses). Frictional = temporary gaps between jobs. Both are distinct from cyclical unemployment (recession-driven).</li>
      </ul>
      <h3>Technological Change and Work</h3>
      <p>Technology eliminates some jobs (ATMs reduced bank tellers) but creates others (ATM technicians, new bank products). The Industrial Revolution caused mass displacement followed by unprecedented prosperity. Today's AI wave follows the same pattern — but the speed and breadth of displacement may be unprecedented. Polarisation: technology complements high-skill work (coding, analysis) and can substitute low-skill routine tasks, squeezing the middle.</p>
      <h3>Gig Economy</h3>
      <p>Platforms like Uber, DoorDash, and Fiverr have created a new class of independent contractors. Benefits: flexibility, entry access. Costs: no benefits, unstable income, no collective bargaining. The classification of gig workers (employee vs. contractor) is one of the defining legal battles of the 2020s, with major implications for labour law globally.</p>`,
    },
    {
      id:'environmental_economics', cat:'advanced', title:'Environmental Economics',
      subtitle:'Pricing the planet — externalities, carbon, and sustainability',
      body:`<p>Environmental economics applies economic tools to environmental problems. The core insight: environmental damage is often a <strong>market failure</strong> — costs imposed on third parties (negative externalities) not reflected in prices. Fix the prices, fix the incentives.</p>
      <h3>Externalities and the Pigouvian Tax</h3>
      <p>A factory emitting pollution imposes costs on neighbours (health damage, cleanup) without compensating them. The market produces too much pollution because the factory ignores these external costs. Arthur Pigou (1920) proposed taxing the factory at the exact social cost of the pollution — making the market price include all costs. This <strong>Pigouvian tax</strong> corrects the externality without government dictating production methods.</p>
      <h3>Carbon Pricing</h3>
      <p>Two main approaches: <strong>carbon tax</strong> (set the price, let the market determine quantity) and <strong>cap-and-trade</strong> (set the quantity, let the market determine price). The EU Emissions Trading System is the world's largest carbon market. British Columbia's carbon tax (since 2008) is among the most studied — evidence suggests it reduced emissions without significant economic harm. Economists almost unanimously prefer carbon pricing to command-and-control regulation as the least-cost way to reduce emissions.</p>
      <h3>The Discount Rate Problem</h3>
      <p>Climate change is a multi-generational problem — costs fall on future generations, benefits of action accrue slowly. The <strong>social discount rate</strong> used to value future climate damage is one of the most contested questions in economics. A 5% rate makes $1 trillion of damage in 50 years worth only ~$87 billion today. A 1% rate makes it worth ~$608 billion. Nordhaus used ~4.5% (less urgent action needed); Stern used ~1.4% (urgent action justified). The choice of discount rate is fundamentally an ethical question about how much we value future generations.</p>
      <h3>Natural Capital and the Doughnut Economy</h3>
      <p>Traditional GDP growth ignores depletion of natural capital (forests, fisheries, aquifers, climate stability). "Green GDP" or "inclusive wealth" accounting attempts to subtract environmental depletion from standard GDP. Kate Raworth's <em>Doughnut Economics</em> model argues economies should operate within a "safe and just space" — above a social foundation (meeting human needs) and below an ecological ceiling (planetary boundaries).</p>`,
    },
    {
      id:'innovation_economics', cat:'advanced', title:'Innovation and Growth Economics',
      subtitle:'Technology, disruption, and the engine of long-run prosperity',
      body:`<p>Mainstream economics long treated technology as falling like manna from heaven — an exogenous factor outside the model. Modern growth theory makes innovation endogenous: it is produced by economic actors responding to incentives, and understanding that process is key to understanding why some countries become rich and others don't.</p>
      <h3>Schumpeter and Creative Destruction</h3>
      <p>Joseph Schumpeter (1942) argued that capitalism's defining feature is not price competition but innovation that renders existing products, processes, and industries obsolete. The automobile destroyed the horse-and-buggy industry. The smartphone destroyed cameras, GPS devices, music players, and landlines. Streaming destroyed video rental. This "creative destruction" causes pain for disrupted workers and industries but drives long-run productivity growth. Schumpeter worried that successful capitalism would eventually generate bureaucratic large firms hostile to the entrepreneurial spirit that creates it.</p>
      <h3>Endogenous Growth Theory</h3>
      <p>Paul Romer (Nobel 2018) showed that knowledge is non-rival (using an idea doesn't deplete it) and partially non-excludable (hard to prevent others from using it). This makes knowledge a special input — it generates increasing returns. Policies that encourage knowledge creation (education, R&D subsidies, patents, immigration of skilled workers) generate permanent increases in growth rates, not just one-time level shifts. This challenges the earlier Solow model, which predicted diminishing returns to capital.</p>
      <h3>The Patent System and IP Trade-offs</h3>
      <p>Patents grant temporary monopoly power (typically 20 years) in exchange for public disclosure of innovations. The rationale: without protection, innovators cannot recoup R&D costs, so they under-invest. The cost: monopoly pricing reduces access. The pharmaceutical industry illustrates this tension acutely — new drug development costs $1-3 billion; without patents, generics undercut immediately and no one funds new drugs. With patents, lifesaving medications are unaffordable in poor countries.</p>
      <h3>Network Effects and Winner-Take-All Markets</h3>
      <p>Many modern industries exhibit strong network effects: the product becomes more valuable as more people use it (telephones, social networks, payment systems). This creates winner-take-all dynamics — one or two platforms dominate. Facebook, Google, and Visa/Mastercard all benefit from network effects that create natural barriers to entry. These industries challenge traditional antitrust thinking built around price competition in commodity markets.</p>`,
    },
  ],
};
