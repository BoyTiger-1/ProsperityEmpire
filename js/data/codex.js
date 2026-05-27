/* ── CODEX DATA — Financial Encyclopedia entries ── */
const CODEX_DATA = {
  categories: [
    { id:'basics',   name:'📘 Economics Basics' },
    { id:'personal', name:'💳 Personal Finance' },
    { id:'business', name:'🏢 Business Finance' },
    { id:'markets',  name:'📈 Markets & Investing' },
    { id:'macro',    name:'🌍 Macroeconomics' },
    { id:'advanced', name:'🔬 Advanced Theory' },
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

    // ── MORE BASICS ──
    {
      id:'monopoly_power', cat:'basics', title:'Monopoly and Market Power',
      subtitle:'When sellers control prices',
      body:`<p>A monopoly exists when a single seller faces no close competition. Unlike the competitive firm which is a <em>price taker</em>, a monopolist is a <em>price maker</em> — it can choose any point on the demand curve, trading off higher price against lower quantity sold.</p>
      <h3>The Monopolist's Rule</h3>
      <p>Profit maximisation still requires MR = MC, but for a monopolist marginal revenue is always below price (because selling one more unit requires lowering price on all previous units). The result: monopolists produce less and charge more than competitive markets would.</p>
      <div class="codex-formula">Deadweight Loss = ½ × (P_M − MC) × (Q_C − Q_M)</div>
      <p>This deadweight loss is the social cost of monopoly: transactions that would benefit both buyer and seller don't happen. Antitrust regulators attempt to prevent or break up monopolies for this reason.</p>
      <h3>Sources of Monopoly Power</h3>
      <ul><li><strong>Natural monopoly:</strong> economies of scale so large that one firm can serve the market more cheaply than two (water, electricity grids)</li>
      <li><strong>Patents and IP:</strong> temporary legal monopoly to reward innovation</li>
      <li><strong>Control of key resources:</strong> De Beers and diamonds historically</li>
      <li><strong>Network effects:</strong> switching costs lock in customers</li></ul>
      <h3>Price Discrimination</h3>
      <p>A monopolist with information about willingness to pay can charge different customers different prices. First-degree (perfect) discrimination extracts all consumer surplus. Airlines, software subscriptions, and pharmaceutical companies all practise forms of price discrimination — it can increase output and reduce deadweight loss, but distributional consequences are often regressive.</p>`,
    },
    {
      id:'consumer_theory', cat:'basics', title:'Consumer Theory and Utility',
      subtitle:'How rational agents make choices',
      body:`<p>Consumer theory formalises how individuals allocate limited income across goods to maximise wellbeing. It underpins demand curves and is the microeconomic foundation for welfare analysis.</p>
      <h3>Utility and Indifference Curves</h3>
      <p>Utility is a numerical representation of preferences — not pleasure per se, but an ordinal ranking. Indifference curves show all combinations of goods giving equal utility; they slope downward (to get more of one good you give up the other) and are convex to the origin (reflecting diminishing marginal rate of substitution).</p>
      <h3>The Budget Constraint</h3>
      <p>The budget line shows all affordable bundles: P_x·X + P_y·Y = I. Its slope is −P_x/P_y, the relative price. The consumer optimises at the tangency: MRS = P_x/P_y — the rate at which you're willing to trade goods equals the rate at which the market lets you.</p>
      <h3>Revealed Preference and Demand</h3>
      <p>When prices change, consumption adjusts. The <strong>substitution effect</strong> (move along new indifference curve to cheaper good) is always negative. The <strong>income effect</strong> depends on whether the good is normal or inferior. Slutsky's equation decomposes these: ∂x/∂p = (∂x/∂p)|utility_const − x·(∂x/∂I).</p>
      <h3>Giffen and Veblen Goods</h3>
      <p>Giffen goods have upward-sloping demand — as price rises, consumption rises. This requires a strong positive income effect for an inferior good (bread during Irish famine). Veblen goods are different: demand rises with price because high price signals status (luxury watches, handbags). Both violate the ordinary law of demand but for different reasons.</p>`,
    },
    {
      id:'production_costs', cat:'basics', title:'Production Theory and Costs',
      subtitle:'How firms turn inputs into output',
      body:`<p>Production theory studies how firms combine inputs to produce output efficiently. The production function Q = f(K, L) maps capital and labour into output.</p>
      <h3>Short Run vs. Long Run</h3>
      <p>In the short run at least one input (typically capital) is fixed. In the long run, all inputs are variable. This distinction drives the cost curve shapes that determine competitive market outcomes.</p>
      <h3>The Cost Curves</h3>
      <ul>
        <li><strong>Fixed costs (FC)</strong>: don't vary with output — rent, loan payments</li>
        <li><strong>Variable costs (VC)</strong>: change with output — materials, hourly labour</li>
        <li><strong>Marginal cost (MC)</strong>: cost of one more unit — dTC/dQ</li>
        <li><strong>Average total cost (ATC)</strong>: TC/Q — U-shaped due to spreading FC then rising MC</li>
      </ul>
      <div class="codex-formula">MC crosses ATC at ATC's minimum (the efficient scale)</div>
      <h3>Returns to Scale</h3>
      <p>Doubling all inputs: if output doubles = constant returns; more than doubles = increasing returns (economies of scale); less than doubles = decreasing returns. Most industries exhibit increasing returns at low output, eventually transitioning to decreasing returns (management complexity, coordination costs).</p>
      <h3>Economies of Scope</h3>
      <p>Cost savings from producing multiple products jointly. A firm producing both cars and trucks shares a factory; a bank providing savings and loans shares a customer base and risk systems. Scope economies explain diversified conglomerates and supermarkets.</p>`,
    },
    {
      id:'oligopoly', cat:'basics', title:'Oligopoly and Strategic Interaction',
      subtitle:'Markets with a few powerful players',
      body:`<p>An oligopoly is a market dominated by a small number of firms whose decisions are <em>interdependent</em> — each firm's optimal strategy depends on what others do. This makes oligopoly analysis inherently game-theoretic.</p>
      <h3>The Cournot Model</h3>
      <p>Firms simultaneously choose output quantities. Each firm's best response (reaction function) is a downward-sloping function of the rival's output. The Nash equilibrium occurs where reaction functions intersect: output is between the competitive and monopoly levels, and price is between competitive price and monopoly price.</p>
      <h3>The Bertrand Model</h3>
      <p>Firms simultaneously choose prices. With homogeneous goods and constant costs, Bertrand predicts the competitive outcome even with just two firms — prices are driven to marginal cost. This is the Bertrand paradox: two competitors produce the competitive result, contradicting intuition about market power.</p>
      <h3>Price Leadership and Tacit Collusion</h3>
      <p>Without explicit coordination (which is illegal cartel behaviour), oligopolists may tacitly collude through price signalling, following an industry price leader, or practising price rigidity (kinked demand curve). These mechanisms sustain prices above competitive levels without overt agreement.</p>
      <h3>OPEC and Real-World Cartels</h3>
      <p>OPEC is an explicit production cartel attempting to maintain prices by coordinating output cuts. The fundamental problem: each member has an incentive to cheat (produce more at the high cartel price). Cartels tend to be unstable for exactly this reason — the prisoner's dilemma logic applies at the national scale.</p>`,
    },

    // ── MORE MACROECONOMICS ──
    {
      id:'business_cycles', cat:'macro', title:'Business Cycles',
      subtitle:'Expansions, recessions, and the rhythms of economic activity',
      body:`<p>A business cycle is the fluctuation in economic activity around its long-run growth trend. Phases include expansion (rising output, employment, confidence), peak (activity at maximum), contraction/recession (two or more consecutive quarters of negative GDP growth), and trough (the low point before recovery).</p>
      <h3>Stylised Facts</h3>
      <p>Investment is far more volatile than consumption. Inventories lead the cycle — firms accumulate stocks in expansion and deplete them in recession. Consumer durables are procyclical and volatile. Services are stable. Unemployment lags output — firms hoard labour in mild downturns rather than fire and rehire. Credit conditions tighten at peaks, amplifying the downturn.</p>
      <h3>Theories of the Cycle</h3>
      <ul>
        <li><strong>Keynesian:</strong> demand shocks drive cycles; expectations are self-fulfilling; fiscal policy can stabilise</li>
        <li><strong>Monetarist:</strong> cycles caused by erratic money supply growth (Friedman and Schwartz); monetary policy is the key stabiliser</li>
        <li><strong>Real Business Cycle:</strong> cycles are efficient responses to technology shocks; government intervention is counterproductive</li>
        <li><strong>New Keynesian:</strong> sticky prices mean demand shocks have real effects; monetary policy has traction</li>
        <li><strong>Financial accelerator:</strong> Bernanke-Gertler: credit frictions amplify and propagate shocks; collateral values and balance sheets matter</li>
      </ul>
      <h3>Leading vs. Lagging Indicators</h3>
      <p>Leading indicators (stock prices, building permits, consumer confidence, yield curve shape) predict turning points. Coincident indicators (GDP, payrolls, personal income) move with the cycle. Lagging indicators (unemployment duration, business loans outstanding) confirm turning points after they occur.</p>`,
    },
    {
      id:'keynesian_economics', cat:'macro', title:'Keynesian Economics',
      subtitle:'Demand management and the role of government',
      body:`<p>John Maynard Keynes's <em>General Theory</em> (1936) argued that market economies can get stuck in equilibria below full employment — and that government spending can cure this. Published in the depths of the Great Depression, it fundamentally reshaped macroeconomics and economic policy.</p>
      <h3>The Fundamental Insight</h3>
      <p>In a depression, the problem is insufficient aggregate demand. Saving is a virtue individually but collectively dangerous: if everyone saves simultaneously, income falls (the paradox of thrift), making it harder to save. This fallacy of composition means decentralised decisions produce socially bad outcomes, justifying intervention.</p>
      <h3>The Multiplier</h3>
      <p>Government spending injects income, which gets spent again (partially), creating further income. The multiplier k = 1/(1−MPC), where MPC is the marginal propensity to consume. If MPC = 0.8, k = 5: each £1 of government spending raises GDP by £5 in theory. In practice, leakages (imports, saving, taxes) reduce the multiplier substantially, and Ricardian equivalence (people save now to pay future taxes) reduces it further.</p>
      <div class="codex-formula">Multiplier = 1 / (1 − MPC × (1 − t))</div>
      <h3>Liquidity Trap</h3>
      <p>When interest rates hit zero, conventional monetary policy (lowering rates) loses traction. People and banks hoard cash rather than invest. Keynes called this the liquidity trap. Japan in the 1990s–2000s and the post-2008 world both illustrated this, reviving interest in fiscal policy as the only remaining stabilisation tool.</p>
      <h3>New Keynesianism</h3>
      <p>Modern Keynesian economics adds microfoundations — rational agents, sticky wages and prices. The New Keynesian IS-LM gives monetary policy real effects via the Taylor rule, and the New Keynesian Phillips Curve relates inflation to expected inflation and the output gap.</p>`,
    },
    {
      id:'monetarism', cat:'macro', title:'Monetarism',
      subtitle:'Money, inflation, and the limits of stabilisation policy',
      body:`<p>Monetarism, associated with Milton Friedman, holds that the money supply is the primary determinant of nominal spending and that monetary instability is the main cause of macroeconomic instability. The Federal Reserve's erratic money supply contraction turned a recession into the Great Depression, Friedman argued — not capitalism's inherent instability.</p>
      <h3>The Quantity Theory of Money</h3>
      <div class="codex-formula">MV = PQ</div>
      <p>M = money supply, V = velocity of circulation, P = price level, Q = real output. If V is stable (Friedman's key empirical claim) and Q grows at its natural rate, M growth determines inflation 1-for-1 in the long run. Therefore: control money growth, and you control inflation.</p>
      <h3>The Natural Rate of Unemployment</h3>
      <p>Friedman (1968) introduced the natural rate: the unemployment rate consistent with stable inflation. Attempts to push unemployment below it through demand stimulus generate accelerating inflation as workers demand higher wages to compensate for rising prices. The short-run Phillips Curve (inflation-unemployment trade-off) exists; the long-run curve is vertical at the natural rate.</p>
      <h3>Rules vs. Discretion</h3>
      <p>Friedman advocated a constant money growth rule (the k-percent rule). Discretionary policy suffers from long and variable lags, political pressure, and time-inconsistency (policymakers promise low inflation but inflate away debts). Rules constrain policymakers and anchor expectations. This debate between rules and discretion remains central to central banking — modern central banks use inflation targeting as a rule-like framework.</p>`,
    },
    {
      id:'solow_growth', cat:'macro', title:'The Solow Growth Model',
      subtitle:'Capital accumulation, diminishing returns, and convergence',
      body:`<p>Robert Solow's 1956 model (Nobel 1987) is the canonical framework for understanding long-run economic growth. It explains why poor countries can grow faster than rich ones, why growth eventually slows, and what determines the long-run standard of living.</p>
      <h3>The Core Equation</h3>
      <div class="codex-formula">Δk = sf(k) − (δ + n + g)k</div>
      <p>Where k = capital per effective worker, s = savings rate, f(k) = output per worker, δ = depreciation, n = population growth, g = technology growth. Capital accumulates when investment (sf(k)) exceeds break-even investment ((δ + n + g)k). The economy converges to a <strong>steady state</strong> where Δk = 0.</p>
      <h3>Key Predictions</h3>
      <ul>
        <li>Countries converge to a steady state determined by s, δ, n, g and technology</li>
        <li>Higher saving rate → higher steady-state capital and output, but not higher long-run growth rate</li>
        <li>Long-run growth is driven entirely by exogenous technological progress (TFP)</li>
        <li>Conditional convergence: poor countries grow faster than rich ones IF they have similar fundamentals</li>
      </ul>
      <h3>The Solow Residual</h3>
      <p>Growth accounting decomposes output growth into contributions from capital growth, labour growth, and the residual — Total Factor Productivity (TFP). In most advanced economies TFP explains 50–80% of growth. Yet the model treats it as exogenous — it "fell from the sky." This motivated endogenous growth theory (Romer, Lucas) which seeks to explain where TFP comes from.</p>
      <h3>Golden Rule</h3>
      <p>The savings rate that maximises consumption in steady state is called the Golden Rule. At the Golden Rule: MPK = δ + n + g. If MPK > δ + n + g, the economy is dynamically efficient (as in most rich countries) — saving more would help, but future generations benefit at the cost of current consumption.</p>`,
    },
    {
      id:'ad_as_model', cat:'macro', title:'Aggregate Demand and Supply',
      subtitle:'The workhorse model of macroeconomics',
      body:`<p>The AD-AS model is the standard framework for analysing short-run fluctuations and long-run trends in output and the price level, distinguishing the roles of demand-side and supply-side factors.</p>
      <h3>Aggregate Demand (AD)</h3>
      <p>AD shows combinations of price level and output where both the goods market (IS) and money market (LM) are in equilibrium. It slopes downward: a higher price level reduces real money supply (tightening money markets), raises interest rates, and reduces investment spending. AD shifts with fiscal and monetary policy, consumer confidence, and foreign demand.</p>
      <h3>Short-Run Aggregate Supply (SRAS)</h3>
      <p>SRAS is upward sloping because wages and prices are sticky in the short run — firms respond to higher demand by increasing output before fully adjusting prices. SRAS shifts with input cost changes (oil prices, wages), supply shocks, and productivity changes.</p>
      <h3>Long-Run Aggregate Supply (LRAS)</h3>
      <p>LRAS is vertical at the potential (full-employment) output level. In the long run, wages and prices fully adjust; only real factors determine output. Shifts come from changes in capital, labour, or technology — not demand.</p>
      <h3>The Self-Correcting Mechanism vs. Policy Intervention</h3>
      <p>After a negative demand shock (AD shifts left), output falls below potential. Classical economists say: wait — wages fall, SRAS shifts right, restoring potential output. Keynesians say: the adjustment is slow and painful; use fiscal/monetary policy to shift AD right now. This tension between the self-correcting market and active stabilisation policy is the central debate in macroeconomic policy.</p>`,
    },
    {
      id:'international_macro', cat:'macro', title:'Balance of Payments and Exchange Rates',
      subtitle:'How countries interact financially with the world',
      body:`<p>Every transaction between residents of different countries is recorded in the Balance of Payments (BoP), which must always balance. Understanding it is essential for grasping exchange rate movements, current account deficits, and international financial crises.</p>
      <h3>Structure of the Balance of Payments</h3>
      <ul>
        <li><strong>Current Account:</strong> trade in goods and services, income flows, transfers. A deficit means spending exceeds production; the country borrows from abroad.</li>
        <li><strong>Capital Account:</strong> transfers of wealth (debt forgiveness, migrant remittances)</li>
        <li><strong>Financial Account:</strong> foreign direct investment, portfolio flows, reserve changes</li>
      </ul>
      <p>Current Account + Capital Account + Financial Account = 0 (by accounting identity)</p>
      <h3>Exchange Rate Determination</h3>
      <p>In the long run, <strong>Purchasing Power Parity (PPP)</strong> holds: exchange rates adjust so that identical goods cost the same in both countries. In the short run, exchange rates are driven by capital flows, interest rate differentials, and expectations. The <strong>uncovered interest parity (UIP)</strong> condition: the interest rate differential equals the expected exchange rate change.</p>
      <h3>Fixed vs. Flexible Exchange Rates</h3>
      <p>Fixed rates provide stability for trade but require giving up monetary policy independence (Mundell's impossible trinity: you cannot simultaneously have free capital flows, a fixed exchange rate, AND independent monetary policy). Flexible rates allow monetary policy but create exchange rate volatility that disrupts trade. The Euro experiment: fixed exchange rates within the Eurozone eliminated currency risk but prevented national monetary adjustment to asymmetric shocks.</p>`,
    },
    {
      id:'financial_crises', cat:'macro', title:'Financial Crises and Systemic Risk',
      subtitle:'When the financial system amplifies shocks into catastrophes',
      body:`<p>Financial crises — bank runs, credit crunches, sovereign debt crises — are recurring features of capitalism with devastating real consequences. Understanding their mechanics is essential for regulation and policy.</p>
      <h3>The Anatomy of a Crisis: Minsky's View</h3>
      <p>Hyman Minsky argued that stability breeds instability. During long expansions, optimism grows; borrowing becomes increasingly speculative ("Ponzi finance" — borrowing even interest payments). Asset prices rise, reinforcing confidence — until some trigger causes values to fall, exposing overleveraged positions. A "Minsky moment" ensues: forced asset sales collapse prices, credit freezes, and the real economy implodes.</p>
      <h3>Bank Runs and Self-Fulfilling Crises</h3>
      <p>Banks are inherently fragile: they borrow short (deposits) and lend long (mortgages). If depositors fear insolvency, a run is individually rational even for a solvent bank — the run itself causes insolvency. Diamond-Dybvig (1983) formalised this multiple-equilibria problem: deposit insurance eliminates the bad equilibrium by removing the incentive to run.</p>
      <h3>Systemic Risk and Contagion</h3>
      <p>Financial institutions are interconnected through interbank lending, derivatives exposures, and common asset holdings. Failure of one can propagate through the system. The 2008 Lehman bankruptcy froze global interbank markets overnight — demonstrating that "too interconnected to fail" is as dangerous as "too big to fail." Macroprudential regulation (stress tests, countercyclical capital buffers) targets these systemic risks rather than individual bank safety.</p>`,
    },
    {
      id:'development_economics', cat:'macro', title:'Development Economics',
      subtitle:'Why nations escape poverty — or don\'t',
      body:`<p>Development economics studies why some countries grow rich while others remain trapped in poverty, and what policies accelerate growth and reduce inequality. It is one of the most contested and policy-relevant fields in economics.</p>
      <h3>Traps and Vicious Circles</h3>
      <p>Poor countries may face <strong>poverty traps</strong>: too poor to save and invest enough to grow. The "big push" model (Rosenstein-Rodan, Murphy-Shleifer-Vishny): industrialisation is a coordination problem — investment is only profitable if others also invest, creating demand. Without a coordinating mechanism, each agent under-invests. Foreign aid or large-scale state investment might break the trap.</p>
      <h3>Institutions as the Deep Cause</h3>
      <p>Acemoglu, Johnson, and Robinson (Nobel 2024) argue that institutions — the rules of the political and economic game — are the fundamental cause of prosperity. Inclusive institutions (property rights, rule of law, competitive markets, political voice) enable sustained growth. Extractive institutions concentrate power and wealth, blocking innovation. Geography and culture matter less than institutions: North and South Korea have the same geography and culture; their institutional divergence explains the 20:1 income gap.</p>
      <h3>The Role of Trade</h3>
      <p>Export-led growth (South Korea, Taiwan, China) has been the most consistent path out of poverty. Access to global markets provides scale and technology transfer. However, Rodrik argues that good growth strategies are context-specific and often involve selective industrial policy, not pure free-market orthodoxy. The "Washington Consensus" — privatise, liberalise, stabilise — produced mixed results in Africa and Latin America.</p>`,
    },
    {
      id:'public_choice', cat:'macro', title:'Public Choice Theory',
      subtitle:'Applying economic thinking to political behaviour',
      body:`<p>Public choice theory (Buchanan, Nobel 1986; Tullock) applies the tools of economics — rational self-interest, incentives, information problems — to political decision-making. Its central insight: politicians and bureaucrats are not benevolent social planners; they respond to incentives just like anyone else.</p>
      <h3>Rent-Seeking</h3>
      <p>Rent-seeking is spending resources to obtain transfers from others rather than creating new value. Lobbying for tariffs, subsidies, or regulations that protect incumbents is pure rent-seeking. The social cost is not just the subsidy itself but the resources wasted in lobbying — the competition for rents dissipates much of the rent value.</p>
      <h3>The Problem of Special Interests</h3>
      <p>Small, concentrated interest groups (steel producers) have strong incentives to lobby for policies that benefit them at diffuse cost to the general public (higher steel prices spread across millions of consumers). Each consumer loses little and has weak incentive to organise; the producer gains a lot and lobbies intensely. This asymmetry systematically biases policy toward special interests — explaining protectionism, occupational licensing, and agricultural subsidies in democratic societies.</p>
      <h3>Median Voter and Electoral Competition</h3>
      <p>The median voter theorem (Downs, 1957): in a two-party system with single-issue voting on a spectrum, both parties converge to the position of the median voter. This predicts centrist policies but fails to explain polarisation, abstention, and multi-issue politics. Real-world politics adds party activism, primaries, money in politics, and information costs.</p>`,
    },

    // ── MORE MARKETS & INVESTING ──
    {
      id:'capm_factors', cat:'markets', title:'CAPM and Factor Models',
      subtitle:'Pricing risk in financial markets',
      body:`<p>The Capital Asset Pricing Model (CAPM) is the foundational framework for understanding how financial assets are priced in equilibrium. It links expected return to systematic (undiversifiable) risk.</p>
      <h3>The CAPM Equation</h3>
      <div class="codex-formula">E(R_i) = R_f + β_i × [E(R_m) − R_f]</div>
      <p>Where R_f is the risk-free rate, E(R_m) is the expected market return, and β_i is the asset's sensitivity to market movements. Beta measures systematic risk: a stock with β = 1.5 moves 1.5% for every 1% market move. High-beta stocks demand higher expected returns — you're taking on more market risk.</p>
      <h3>Beyond CAPM: Factor Models</h3>
      <p>CAPM's single-factor model fails empirically — certain stock characteristics predict returns beyond beta. Fama and French (Nobel 2013) documented the size premium (small stocks outperform large stocks) and value premium (cheap stocks outperform expensive ones). Their three-factor model adds SMB (small minus big) and HML (high minus low book-to-market) to market beta.</p>
      <p>Carhart added momentum (winners continue to outperform losers). The current Fama-French five-factor model adds profitability and investment factors. These "smart beta" factors underpin the modern factor-investing industry — hundreds of billions in systematic quantitative strategies.</p>
      <h3>Are Factors Risk or Anomaly?</h3>
      <p>The debate: are factor premia compensation for systematic risks we haven't fully identified (rational pricing), or persistent mispricings due to behavioural biases? The data survival bias and factor zoo problem (hundreds of factors "discovered" by data mining) complicates interpretation. After publication, many factors decay — suggesting at least some are arbitraged away.</p>`,
    },
    {
      id:'options_pricing', cat:'markets', title:'Options Pricing and Black-Scholes',
      subtitle:'Valuing contingent claims with mathematics',
      body:`<p>Options give the right, but not the obligation, to buy (call) or sell (put) an asset at a set price (strike) before or at a set date (expiry). Pricing them correctly requires solving one of the most elegant problems in financial mathematics.</p>
      <h3>The Black-Scholes Formula</h3>
      <div class="codex-formula">C = S·N(d₁) − K·e^(−rT)·N(d₂)</div>
      <p>Where d₁ = [ln(S/K) + (r + σ²/2)T] / (σ√T), d₂ = d₁ − σ√T, S = stock price, K = strike, r = risk-free rate, T = time to expiry, σ = volatility, N(·) = cumulative normal distribution. The formula assumes log-normally distributed stock prices, constant volatility, no dividends, and continuous trading.</p>
      <h3>The Greeks</h3>
      <p>Options traders manage risk through the Greeks: <strong>Delta</strong> (sensitivity to stock price) is N(d₁); <strong>Gamma</strong> (rate of change of delta) is highest near strike at expiry; <strong>Vega</strong> (sensitivity to volatility) explains why options are bets on uncertainty; <strong>Theta</strong> (time decay) erodes option value as expiry approaches; <strong>Rho</strong> (sensitivity to interest rates) is small for short-dated options but significant for long-dated ones.</p>
      <h3>Volatility Smile and Real-World Departures</h3>
      <p>If Black-Scholes were exactly right, implied volatility (backed out from option prices) would be constant across strikes. It isn't — options on the same stock at different strikes show a "volatility smile" or "smirk." This reflects fat tails, jump risk, and leverage effects that the log-normal assumption misses. Modern practitioners use local volatility, stochastic volatility (Heston model), or jump-diffusion models to fit the smile.</p>`,
    },
    {
      id:'fixed_income_math', cat:'markets', title:'Fixed Income Mathematics',
      subtitle:'Duration, convexity, and yield curve analysis',
      body:`<p>Bonds are promises to pay fixed cash flows. Bond mathematics governs how price and yield relate, how sensitive bond prices are to interest rate changes, and how to construct and manage fixed income portfolios.</p>
      <h3>Price-Yield Relationship</h3>
      <div class="codex-formula">P = Σ C_t / (1+y)^t + F / (1+y)^n</div>
      <p>Bond price is the present value of all cash flows discounted at yield y. Price and yield move inversely — when interest rates rise, existing bond prices fall. A 10-year bond falls much more than a 2-year bond for the same yield change.</p>
      <h3>Duration and Convexity</h3>
      <p><strong>Modified Duration</strong> measures interest rate sensitivity: ΔP/P ≈ −D × Δy. A bond with duration 8 loses about 8% for each 1% rise in yield. Duration is the weighted average time to receive cash flows.<br>
      <strong>Convexity</strong> is the second-order correction: actual price changes are better than duration predicts because the price-yield curve is convex (curves toward the investor). Portfolio managers use duration-matched positions and then tilt for convexity.</p>
      <h3>Yield Curve and the Term Premium</h3>
      <p>The yield curve plots yields against maturity. Normally upward sloping (longer maturities demand higher yield — term premium for inflation risk, uncertainty). An inverted yield curve (short rates > long rates) has predicted every US recession since 1960 — because it reflects expected future short-rate cuts (central bank easing in response to anticipated slowdown).</p>`,
    },
    {
      id:'commodities_markets', cat:'markets', title:'Commodities Markets',
      subtitle:'Raw materials, futures, and real asset investing',
      body:`<p>Commodities — oil, gold, copper, wheat, natural gas — form the physical foundation of industrial economies. Their markets have unique features: seasonality, storage costs, supply shocks, and geopolitical sensitivity.</p>
      <h3>Spot and Futures Prices</h3>
      <p>A futures contract locks in a price today for delivery at a future date. The futures price F = S·e^(r+u−y)T, where S is spot price, r is risk-free rate, u is storage cost, and y is convenience yield (the premium from holding physical inventory — avoids stockout risk). Commodity futures markets in contango (F > S) reflect storage costs; backwardation (F < S) reflects high convenience yield from tight supply.</p>
      <h3>The "Super-Cycle"</h3>
      <p>Long commodity price cycles (15–20 years) reflect the slow supply response to demand booms. High prices stimulate investment in mines, wells, and farms — but the lag between investment decision and new supply coming online (often 5–10 years) creates overshoots and crashes. China's industrialisation drove a commodity super-cycle from 2000–2014; the subsequent bust hurt resource-dependent economies severely.</p>
      <h3>Oil as a Macro Asset</h3>
      <p>Oil occupies a unique position: it is simultaneously an industrial input (cost to firms and consumers), a financial asset (traded by speculators), and a geopolitical instrument (petrodollar recycling, OPEC bargaining). Every major global recession since 1970 except 2001 was preceded by a sharp oil price spike. The shale revolution (US hydraulic fracturing from ~2010) fundamentally changed the oil market's supply dynamics — OPEC lost its monopoly on swing production.</p>`,
    },

    // ── MORE BUSINESS FINANCE ──
    {
      id:'capital_structure', cat:'business', title:'Capital Structure: Modigliani-Miller',
      subtitle:'Does how you finance a firm matter?',
      body:`<p>How a firm is financed — the mix of debt and equity — is one of corporate finance's central questions. Modigliani and Miller (Nobel 1985 and 1990) provided the benchmark framework: in perfect markets, capital structure is irrelevant. The real world deviates from this in ways that define optimal financing.</p>
      <h3>The MM Theorems</h3>
      <p><strong>MM Proposition I (no taxes):</strong> firm value is independent of capital structure. Leverage does not create or destroy value — investors can borrow on their own account (homemade leverage). <strong>MM Proposition II:</strong> as debt increases, equity becomes riskier, demanding higher expected return. The benefit of cheap debt is exactly offset by the higher required return on equity — weighted average cost of capital (WACC) is unchanged.</p>
      <h3>With Taxes: The Trade-Off Theory</h3>
      <p>Interest payments are tax-deductible but equity dividends are not. This creates a tax shield worth τD (tax rate × debt). With taxes, firm value rises with leverage: V_L = V_U + τD. But debt also creates financial distress costs (bankruptcy, agency costs, foregone investment). The optimal capital structure balances tax shields against distress costs — the trade-off theory.</p>
      <h3>Pecking Order Theory</h3>
      <p>Myers-Majluf (1984): firms prefer internal finance (retained earnings) > debt > equity, because equity issuance signals management believes the stock is overvalued. This information asymmetry creates an ordering — a "pecking order" — that explains observed financing patterns better than the static trade-off model.</p>
      <h3>Practical Implications</h3>
      <p>Highly profitable, stable-cashflow businesses (utilities, supermarkets) can sustain high leverage. Young, growth-oriented, asset-light firms should use equity. Buyouts load debt onto targets because interest tax shields are valuable and private equity can monitor management. Capital structure signals — stock repurchases signal undervaluation; rights issues signal overvaluation.</p>`,
    },
    {
      id:'wacc', cat:'business', title:'WACC and the Cost of Capital',
      subtitle:'What return must investments earn to create value?',
      body:`<p>A firm creates value only if its investments earn a return exceeding the cost of the capital used to finance them. The Weighted Average Cost of Capital (WACC) is the minimum required return — the hurdle rate for investment decisions.</p>
      <div class="codex-formula">WACC = (E/V)·Re + (D/V)·Rd·(1−T)</div>
      <p>Where E = equity value, D = debt value, V = E+D, Re = cost of equity, Rd = cost of debt (pre-tax), T = tax rate. The cost of equity Re comes from CAPM: Re = Rf + β(Rm − Rf).</p>
      <h3>Using WACC in Practice</h3>
      <p>Discount a project's free cash flows at WACC to get NPV. If NPV > 0, the project earns more than its cost of capital — value is created. Corporate strategy often involves buying businesses where the acquirer can lower the target's WACC (by diversifying revenue, adding debt capacity, or improving credit rating).</p>
      <h3>Common Pitfalls</h3>
      <p>Using book value instead of market value weights gives wrong WACC. Using historical returns for cost of equity is backward-looking. Applying the same WACC to divisions with different risk levels is wrong — use divisional WACCs. Ignoring non-operating assets in firm value computations understates value.</p>`,
    },
    {
      id:'mergers_acquisitions', cat:'business', title:'Mergers and Acquisitions',
      subtitle:'Corporate control, synergies, and the market for companies',
      body:`<p>M&A activity — one firm buying another — is a major channel for capital reallocation, corporate restructuring, and wealth creation or destruction. It is also one of the most reliably overpriced transactions in corporate finance.</p>
      <h3>Why Mergers Happen</h3>
      <ul>
        <li><strong>Synergies:</strong> combined entity is worth more than sum of parts (cost savings from combining operations, revenue cross-selling, financial synergies from increased debt capacity)</li>
        <li><strong>Market power:</strong> acquiring competitors reduces competition (regulators watch this)</li>
        <li><strong>Undervaluation:</strong> acquirer believes target is worth more than market price</li>
        <li><strong>Managerial hubris:</strong> Roll (1986): acquirer CEOs overestimate their ability to create value, pay too much</li>
        <li><strong>Diversification:</strong> usually destroys value — investors can diversify themselves more cheaply</li>
      </ul>
      <h3>The Acquirer's Curse</h3>
      <p>On average, acquirer stock prices fall on announcement by 1–3%; target stock prices rise 20–30%. The merger premium (amount paid above market price) consistently exceeds estimated synergies. CEO overconfidence, empire-building incentives, and the winner's curse (you win the auction by overestimating value) explain this persistent pattern.</p>
      <h3>Hostile Takeovers and Defence</h3>
      <p>A hostile bid bypasses the target's board and goes directly to shareholders. Defences include poison pills (rights issue flooding the market to dilute acquirer), staggered boards (only ⅓ of directors elected each year), white knights (find a preferred bidder), and leveraged buyouts (take the company private to avoid takeover). Takeover defences reduce the disciplining role of the market for corporate control.</p>`,
    },
    {
      id:'corporate_governance', cat:'business', title:'Corporate Governance',
      subtitle:'Agency problems, boards, and shareholder rights',
      body:`<p>Corporate governance is the system of rules, practices, and incentives by which corporations are directed and controlled. It addresses a fundamental agency problem: managers (agents) run companies on behalf of shareholders (principals) but may pursue their own interests.</p>
      <h3>The Principal-Agent Problem in Corporations</h3>
      <p>Shareholders want maximum long-term value; managers may prefer empire-building, perks, job security, or excessive risk aversion. Separation of ownership and control (Berle and Means, 1932) creates this tension. Shareholders can't perfectly monitor management — this is the core corporate governance challenge.</p>
      <h3>Mechanisms of Governance</h3>
      <ul>
        <li><strong>Board of directors:</strong> monitor and fire management; independent directors supposed to be objective</li>
        <li><strong>Executive compensation:</strong> equity-based pay aligns incentives; also creates short-termism and manipulation risks</li>
        <li><strong>Market for corporate control:</strong> takeover threat disciplines management</li>
        <li><strong>Institutional investors:</strong> large shareholders (pension funds, BlackRock) can engage management</li>
        <li><strong>Debt as discipline:</strong> debt covenants and bankruptcy threat constrain managers</li>
      </ul>
      <h3>International Differences</h3>
      <p>Anglo-American model: dispersed ownership, active capital markets, shareholder primacy. German stakeholder model: concentrated ownership, worker codetermination on boards, long-term relationship banking. Japanese keiretsu: cross-shareholdings with banks and suppliers, patient capital, lifetime employment. Each model has different strengths — Anglo-American is better at innovation and reallocation; German/Japanese at long-horizon investment and worker stability.</p>`,
    },

    // ── ADVANCED ──
    {
      id:'principal_agent', cat:'advanced', title:'Principal-Agent Theory',
      subtitle:'Incentives, hidden information, and mechanism design',
      body:`<p>Agency relationships are everywhere: shareholders and managers, voters and politicians, patients and doctors, employers and workers, clients and lawyers. The agent has private information or takes hidden actions; the principal must design contracts to align incentives. Principal-agent theory formalises this challenge.</p>
      <h3>Moral Hazard</h3>
      <p>Moral hazard arises when an agent takes actions hidden from the principal. A worker paid a fixed salary has incentive to shirk; an insured driver may drive less carefully. The solution: performance-related pay that shares risk between principal and agent. The optimal contract balances incentives (variable pay creates effort) against insurance (fixed pay protects the risk-averse agent from income volatility). Neither pure fixed nor pure variable pay is optimal in general.</p>
      <h3>Adverse Selection</h3>
      <p>Adverse selection occurs when one party has private information before contracting. In insurance, high-risk individuals select in (Akerlof's "Market for Lemons," 1970). In labour markets, firms cannot observe worker quality — good workers may be unable to credibly signal their quality. Solutions: screening (ask workers to reveal information through education, costly signalling), or second-best contracts that sort types.</p>
      <h3>Mechanism Design (Reverse Game Theory)</h3>
      <p>Standard game theory asks: given the rules, what do agents do? Mechanism design asks: given desired outcomes, what rules should we design? Hurwicz, Maskin, and Myerson (Nobel 2007) formalised this. The revelation principle: any equilibrium outcome of any mechanism can be achieved by a direct mechanism where agents truthfully report their private information. This powerful result underlies auction theory, voting systems, and market design.</p>`,
    },
    {
      id:'auction_theory', cat:'advanced', title:'Auction Theory',
      subtitle:'Designing markets for selling valuable objects',
      body:`<p>Auction theory studies how to sell (or buy) goods when buyers have private information about their values. It is pure mechanism design — the auctioneer chooses rules to achieve desired outcomes such as efficiency, revenue maximisation, or fairness.</p>
      <h3>The Four Classic Auction Formats</h3>
      <ul>
        <li><strong>English (ascending):</strong> open bidding, last bidder wins; dominant strategy is bid up to your value</li>
        <li><strong>Dutch (descending):</strong> price falls until someone accepts; equivalent to sealed-bid first price</li>
        <li><strong>First-price sealed bid:</strong> highest bid wins and pays their bid; bid below value to balance winning probability against payment</li>
        <li><strong>Second-price (Vickrey):</strong> highest bid wins but pays second-highest; dominant strategy is bid exactly your true value — truthful revelation</li>
      </ul>
      <h3>Revenue Equivalence Theorem</h3>
      <p>Under standard conditions (risk-neutral bidders, symmetric private values, independent signals), all four formats yield the same expected revenue and the same expected payment by each bidder type. This elegant result shows that format choice matters less than common intuition suggests — what matters are the information and incentive structures.</p>
      <h3>Common Value Auctions and the Winner's Curse</h3>
      <p>In common value auctions (oil field leases, spectrum licences — the good has the same value to all bidders but no one knows it exactly), winning reveals you are the most optimistic bidder — hence you probably overpaid. Rational bidders shade bids below their estimates. Naive bidders don't shade enough and suffer the winner's curse. Milgrom and Wilson (Nobel 2020) designed FCC spectrum auctions accounting for these effects.</p>`,
    },
    {
      id:'general_equilibrium', cat:'advanced', title:'General Equilibrium Theory',
      subtitle:'How all markets clear simultaneously',
      body:`<p>Partial equilibrium (supply and demand in one market) ignores interactions with other markets. General equilibrium analyses all markets simultaneously, asking whether prices exist that clear all markets at once and whether such an equilibrium is desirable.</p>
      <h3>Walras and Tâtonnement</h3>
      <p>Léon Walras (1874) first formalised the idea that all markets are interconnected. His auctioneer calls prices, agents reveal excess demand, prices adjust (tâtonnement), and the process converges (hopefully) to equilibrium. Arrow and Debreu (Nobel 1972 and 1983) gave the first rigorous existence proof: under standard convexity and continuity assumptions, a competitive equilibrium always exists.</p>
      <h3>The Welfare Theorems</h3>
      <p><strong>First Welfare Theorem:</strong> every competitive equilibrium is Pareto efficient (cannot make anyone better off without making someone else worse off). This is the formal foundation of the invisible hand — decentralised markets achieve efficient allocation. <strong>Second Welfare Theorem:</strong> any Pareto efficient allocation can be achieved as a competitive equilibrium after appropriate lump-sum redistribution. Equity and efficiency are separable in theory — redistribute first, then let markets allocate. In practice, lump-sum transfers are impossible, so there are efficiency costs to redistribution.</p>
      <h3>Market Failures and the Limits</h3>
      <p>The welfare theorems require no externalities, no public goods, complete markets for all goods (including contingent claims on all possible states of nature — Arrow-Debreu securities), and perfect information. The real world violates all these. Market failures are not anomalies to be ignored but systematic departures from the Arrow-Debreu ideal that justify targeted intervention.</p>`,
    },
    {
      id:'dsge_models', cat:'advanced', title:'DSGE Models',
      subtitle:'The frontier of macroeconomic modelling',
      body:`<p>Dynamic Stochastic General Equilibrium (DSGE) models are the state-of-the-art framework for macroeconomic analysis and policy evaluation. They describe the economy as the outcome of decisions by optimising households and firms, subject to constraints and aggregate shocks.</p>
      <h3>Structure of a DSGE Model</h3>
      <ul>
        <li><strong>Households:</strong> choose consumption and labour supply by maximising lifetime utility, subject to an intertemporal budget constraint</li>
        <li><strong>Firms:</strong> choose prices and labour demand to maximise profits, subject to technology and Calvo pricing frictions (sticky prices)</li>
        <li><strong>Government/Central bank:</strong> fiscal and monetary policy rules (Taylor rule)</li>
        <li><strong>Market clearing:</strong> goods, labour, and asset markets clear in every period</li>
      </ul>
      <h3>The Smets-Wouters Model</h3>
      <p>The Smets-Wouters (2007) model became a benchmark for central banks worldwide. It includes nominal rigidities (sticky prices and wages), real rigidities (habit formation in consumption, investment adjustment costs), and multiple shocks (technology, demand, monetary, fiscal, risk premium). It fits US data well and is used for policy counterfactuals — "what would GDP be if the Fed had not cut rates?"</p>
      <h3>Criticism and Limitations</h3>
      <p>DSGE models failed to predict the 2008 crisis because they had no meaningful financial sector or endogenous crisis mechanism. Their linearisation around steady state breaks down for large shocks. Their micro-foundations are controversial — rational expectations, representative agent, no heterogeneity. Post-2008 development has focused on adding heterogeneous agents (HANK models — Heterogeneous Agent New Keynesian) and financial frictions.</p>`,
    },
    {
      id:'behavioral_economics', cat:'advanced', title:'Behavioural Economics',
      subtitle:'How real people actually make decisions',
      body:`<p>Behavioural economics (Kahneman, Nobel 2002; Thaler, Nobel 2017) documents systematic departures from rational expected-utility maximisation and builds richer models of how people actually think and choose.</p>
      <h3>Prospect Theory</h3>
      <p>Kahneman and Tversky's (1979) prospect theory replaced expected utility with a framework capturing real patterns: people evaluate outcomes as gains and losses relative to a reference point; losses loom roughly twice as large as equivalent gains (loss aversion); probability weighting overweights small probabilities and underweights moderate-to-large ones.</p>
      <div class="codex-formula">V = Σ π(p_i) · v(x_i − reference)</div>
      <h3>Cognitive Biases Catalogue</h3>
      <ul>
        <li><strong>Anchoring:</strong> first number seen disproportionately influences estimates</li>
        <li><strong>Availability heuristic:</strong> probability judged by how easily examples come to mind</li>
        <li><strong>Representativeness:</strong> judge probability by similarity to prototype (base rate neglect)</li>
        <li><strong>Overconfidence:</strong> people systematically overestimate their knowledge and skill</li>
        <li><strong>Present bias:</strong> hyperbolic discounting — disproportionate preference for the present</li>
        <li><strong>Status quo bias:</strong> default options have powerful hold; inertia is real</li>
      </ul>
      <h3>Nudge Theory</h3>
      <p>Thaler and Sunstein (2008): policymakers can improve outcomes by changing "choice architecture" — the way choices are presented — without restricting freedom. Default enrolment in pension plans dramatically increases retirement savings. Placing healthy food first in school cafeterias reduces obesity. Opt-out organ donation increases donor rates. These nudges exploit behavioural biases for socially beneficial ends — a "libertarian paternalism."</p>`,
    },
    {
      id:'risk_management', cat:'advanced', title:'Risk Management: VaR, CVaR, and Stress Testing',
      subtitle:'Measuring and managing the risk of loss',
      body:`<p>Risk management quantifies potential losses and ensures institutions hold sufficient capital to absorb them. After major failures (LTCM 1998, Lehman 2008, Archegos 2021), risk management practice has evolved substantially.</p>
      <h3>Value at Risk (VaR)</h3>
      <div class="codex-formula">P(Loss > VaR) = 1 − confidence level</div>
      <p>The 99% one-day VaR is the loss that will not be exceeded on 99% of trading days — equivalently, the loss that <em>will</em> be exceeded on roughly 2-3 days per year. VaR is simple, comparable across desks, and widely used for regulatory capital (Basel rules). Its fatal flaw: it says nothing about the magnitude of losses when they exceed VaR — the tail beyond VaR can be catastrophic.</p>
      <h3>Conditional VaR (CVaR / Expected Shortfall)</h3>
      <p>CVaR is the expected loss given that the loss exceeds VaR — the average of the worst outcomes. It is more informative about tail risk and mathematically coherent (subadditive — diversification always helps). Basel III/IV regulations have shifted from VaR to Expected Shortfall as the primary risk measure. CVaR is also a coherent risk measure satisfying monotonicity, subadditivity, homogeneity, and translation invariance.</p>
      <h3>Stress Testing</h3>
      <p>Statistical models assume the future resembles the past. Stress tests ask: what happens in scenarios that history doesn't include — a 40% equity crash, a 300bp rate rise, a housing collapse? Post-2008, central banks (Fed, EBA) run mandatory annual stress tests on systemically important banks, requiring them to hold capital sufficient to survive scenarios as severe as the 2008 crisis.</p>`,
    },
    {
      id:'asset_pricing_theory', cat:'advanced', title:'Stochastic Asset Pricing',
      subtitle:'Pricing assets in a world of uncertainty',
      body:`<p>Modern asset pricing theory unifies the pricing of all financial assets — stocks, bonds, derivatives, real estate — through the concept of the stochastic discount factor (SDF). It provides a coherent framework derived from first principles of investor optimisation.</p>
      <h3>The Stochastic Discount Factor</h3>
      <div class="codex-formula">P_t = E_t[M_{t+1} · X_{t+1}]</div>
      <p>Every asset with payoff X_{t+1} has price P_t equal to the expected product of the SDF (pricing kernel) M_{t+1} and the payoff. The SDF is the intertemporal marginal rate of substitution of a representative investor — high in bad states (when the investor values wealth most), low in good states. This implies: assets that pay off in bad states are priced expensively (low expected return); assets that pay off in good states are priced cheaply (high expected return).</p>
      <h3>The Equity Premium Puzzle</h3>
      <p>Mehra and Prescott (1985): over the 20th century, US stocks returned ~7% real annually while T-bills returned ~1%. This 6% equity premium requires implausibly high risk aversion in standard models. Various explanations: rare disasters (Rietz-Barro), habit formation (Campbell-Cochrane), long-run risks (Bansal-Yaron), ambiguity aversion (Ellsberg). None fully resolves the puzzle.</p>
      <h3>The Term Premium Puzzle</h3>
      <p>Long-term bonds should yield more than short-term bonds for bearing duration risk — this is the term premium. Empirically, the term premium varies over time and is sometimes negative (as in 2010s Japan and Europe). Affine term structure models (Vasicek, CIR, Nelson-Siegel) attempt to model yield curve dynamics through the evolution of state variables.</p>`,
    },
    {
      id:'search_theory', cat:'advanced', title:'Search Theory and Matching',
      subtitle:'How agents find each other in decentralised markets',
      body:`<p>In many real markets, buyers and sellers don't automatically find each other — they must search. Search theory (Diamond, Mortensen, Pissarides, Nobel 2010) models this friction, with profound implications for labour markets, marriage, housing, and more.</p>
      <h3>The Diamond-Mortensen-Pissarides Model</h3>
      <p>The DMP model of the labour market has three key elements: a job creation condition (firms post vacancies until the cost equals the discounted value of a filled job); a job destruction condition (matches separate when the match value falls below a threshold); and Nash bargaining over the wage split. The equilibrium determines unemployment, vacancies, and wages jointly.</p>
      <h3>Why Unemployment Persists</h3>
      <p>Search frictions mean unemployment always exists in equilibrium — workers and jobs take time to match. The Beveridge curve plots unemployment against vacancies: it slopes downward (more vacancies → lower unemployment). Structural unemployment shifts the Beveridge curve outward (mismatch between skills available and skills demanded). Cyclical unemployment is a movement along the curve (few vacancies in recession).</p>
      <h3>Applications Beyond Labour</h3>
      <p>Search theory applies widely: housing markets (buyers and sellers search; matching quality determines prices — Wheaton model); marriage and matching (Gale-Shapley stable matching algorithm, Nobel 2012); money (Diamond 1982: money arises endogenously as a medium of exchange to reduce search costs); credit markets (banks and borrowers search for each other).</p>`,
    },
    {
      id:'health_economics', cat:'advanced', title:'Health Economics',
      subtitle:'Markets, information failures, and healthcare policy',
      body:`<p>Healthcare markets are uniquely prone to market failure: insurance creates moral hazard, asymmetric information between doctors and patients creates a principal-agent problem, and uninsured externalities (infectious disease) justify public provision. Understanding these failures is essential for healthcare policy design.</p>
      <h3>The Peculiarities of Healthcare Markets</h3>
      <p>Kenneth Arrow's seminal 1963 paper identified what makes healthcare different: uncertainty about illness (demand is unpredictable); asymmetric information (patients can't evaluate treatment quality — doctors are both advisors and sellers); externalities (your vaccination protects others); and the non-competitive nature of medical licensing. These failures justify departures from pure market provision.</p>
      <h3>The RAND Health Insurance Experiment</h3>
      <p>The largest randomised experiment in social science history: 6,000 people randomly assigned to insurance plans with different cost-sharing from 1971–82. Results: higher cost-sharing reduces use of all types of care; it also reduces health for the poor and sick (who are most price sensitive) but not for the healthy and well-off. This landmark study still shapes policy debates about copays and deductibles.</p>
      <h3>Single-Payer vs. Multi-Payer Systems</h3>
      <p>Single-payer (Canada, UK's NHS) uses monopsony purchasing power to reduce prices, achieves universal coverage, has lower administrative costs, but may reduce innovation incentives and supply responsiveness. Multi-payer (US, Germany) achieves more system diversity and potentially more innovation but faces adverse selection, higher administrative costs, and coverage gaps. No country has found a perfect solution to the cost-quality-access trilemma.</p>`,
    },
    {
      id:'urban_economics', cat:'advanced', title:'Urban Economics and Agglomeration',
      subtitle:'Why cities exist and why they matter so much',
      body:`<p>Urban economics studies why people and firms cluster in cities, what determines city size, and the implications of urbanisation for productivity, housing prices, and inequality. It sits at the intersection of economic geography, labour economics, and public finance.</p>
      <h3>Agglomeration Economies</h3>
      <p>Workers and firms in denser areas are more productive. Three mechanisms (Marshall, 1890): <strong>labour market pooling</strong> (firms and workers find better matches in thick labour markets); <strong>input sharing</strong> (specialised suppliers cluster where demand is concentrated); and <strong>knowledge spillovers</strong> (ideas spread more easily face-to-face). Silicon Valley, Wall Street, and London's City all illustrate different agglomeration stories.</p>
      <h3>The Housing Crisis as a Zoning Problem</h3>
      <p>Glaeser and Gyourko (2003): high housing prices in productive cities are driven by <em>supply restrictions</em> — zoning laws, height limits, historic preservation, NIMBYism — not inherent scarcity. San Francisco is expensive because regulations prevent building; Houston is affordable because it lets markets respond. Restricting housing supply in productive cities prevents workers from moving to opportunity, reducing aggregate productivity and increasing inequality.</p>
      <h3>Urban Inequality and Gentrification</h3>
      <p>Productive cities attract high-skill workers, bidding up rents and displacing low-income residents — gentrification. The policy challenge: gentrification brings investment and reduces crime but harms existing residents. Rent control protects current residents but reduces housing supply and efficiency. Inclusionary zoning (requiring affordable units in new developments) raises costs and reduces overall construction. No policy dominates; there are genuine trade-offs.</p>`,
    },
    {
      id:'institutional_economics', cat:'advanced', title:'Institutional Economics',
      subtitle:'Rules, norms, and transaction costs as foundations of economic life',
      body:`<p>Institutional economics places the rules of the game — property rights, contracts, norms, organisations — at the centre of economic analysis. Markets don't spring from thin air; they require institutions that make promises credible, reduce transaction costs, and provide coordination mechanisms.</p>
      <h3>Transaction Cost Economics (Coase, Williamson)</h3>
      <p>Ronald Coase's (Nobel 1991) insight: firms exist because markets have transaction costs — the cost of using the price mechanism (search, bargaining, contract writing, enforcement). When transaction costs are high, internalising transactions within a firm (hierarchy) is cheaper than using markets. Oliver Williamson (Nobel 2009) systematised this into a framework for choosing between markets, hybrid arrangements, and hierarchy based on asset specificity, uncertainty, and frequency.</p>
      <h3>Property Rights and the Coase Theorem</h3>
      <p>The Coase Theorem: if property rights are well-defined and transaction costs are zero, private bargaining will achieve an efficient outcome regardless of initial rights assignment. (If the factory damages the laundry, efficiency is achieved whether the factory has the right to pollute or the laundry has the right to clean air — they bargain to the optimal outcome.) In practice, transaction costs are never zero, so initial rights assignment matters enormously. This reframes regulation: the question is not "should government regulate?" but "which assignment of rights minimises transaction costs?"</p>
      <h3>North's Institutional Framework</h3>
      <p>Douglass North (Nobel 1993) argued that institutions — both formal (constitutions, laws, property rights) and informal (customs, norms, codes of conduct) — determine economic performance by shaping incentives. Institutional change is slow (path dependence) because powerful groups benefit from existing rules and resist change. This explains persistent poverty: countries don't escape poverty traps because their institutions are captured by elites who gain from them.</p>`,
    },
    {
      id:'environmental_econ_advanced', cat:'advanced', title:'Carbon Pricing and Climate Economics',
      subtitle:'The economics of the world\'s greatest externality',
      body:`<p>Climate change is the largest market failure in history: burning fossil fuels imposes costs on the entire world and on future generations who have no voice in current decisions. Economics provides the tools to understand and address it — though translating theory into policy faces profound political challenges.</p>
      <h3>The Social Cost of Carbon</h3>
      <p>The SCC is the marginal damage from emitting one additional tonne of CO₂ — the present value of all future climate harms. Estimates range from $50 to $1,000 per tonne depending on discount rate, damage function, and treatment of catastrophic risk. The Biden administration used $51/tonne; many economists advocate $200+. An efficient carbon tax equals the SCC — setting the price of emissions to their true social cost.</p>
      <h3>Carbon Tax vs. Cap and Trade</h3>
      <p>Both correct the externality by making emitters pay. A carbon tax sets the price and lets quantity adjust; cap-and-trade sets quantity (a cap on total emissions) and lets price adjust. Under certainty, they're equivalent. Under uncertainty: if damage is highly convex (cliff-edge tipping points), quantitative limits (cap) are better; if damage is smoothly increasing, price instruments (tax) are more efficient. The EU ETS is the world's largest cap-and-trade system; Sweden has the highest carbon tax (~$130/tonne).</p>
      <h3>The Stern-Nordhaus Debate</h3>
      <p>The choice of discount rate dominates climate cost-benefit analysis. Stern (2007) used a near-zero social discount rate (future generations matter as much as current), finding climate change costs ~20% of global GDP — recommending immediate dramatic action. Nordhaus (Nobel 2018) used market-based discount rates (~5%), finding optimal policy is gradual — a slowly rising carbon price. The deep question is ethical: how much do we discount the welfare of people born in 2100?</p>`,
    },
    {
      id:'political_economy', cat:'advanced', title:'Political Economy and Institutions',
      subtitle:'Why bad policies persist and how institutions shape outcomes',
      body:`<p>Political economy analyses how political systems and economic incentives interact to produce policies, regulations, and institutions. Why do governments adopt policies that reduce welfare? Why do some democracies deliver good governance and others don't?</p>
      <h3>The Logic of Collective Action (Olson)</h3>
      <p>Mancur Olson's (1965) insight: groups with concentrated interests (steel companies) overcome free-rider problems more easily than dispersed groups (consumers). Steel companies can organise and lobby for tariffs; millions of consumers cannot organise to oppose them. This asymmetry produces systematic policy bias toward organised interests — tariffs, subsidies, occupational licensing — that reduce overall welfare.</p>
      <h3>Political Business Cycles</h3>
      <p>Opportunistic politicians manipulate economic policy before elections — loose monetary/fiscal policy boosts output and employment in the election year; austerity comes after. Partisan models predict different policies depending on which party wins — left governments run higher deficits and accept more inflation; right governments prioritise price stability. Central bank independence is partly a mechanism to insulate monetary policy from these cycles.</p>
      <h3>Why Do Nations Fail? (Acemoglu-Robinson)</h3>
      <p>Extractive political institutions concentrate power in the hands of elites who benefit from the status quo and block economic and political change. Creative destruction threatens existing elites — they resist technology adoption and market competition even when it would raise aggregate welfare. The critical juncture thesis: historical accidents (colonial contact, disease environment, geography) determined whether countries developed inclusive or extractive institutions — and these path-dependent outcomes explain most of today's income differences.</p>`,
    },
    {
      id:'inequality_economics', cat:'advanced', title:'The Economics of Inequality',
      subtitle:'Measurement, causes, and consequences of income and wealth gaps',
      body:`<p>Inequality has risen sharply in many rich countries since the 1980s — understanding why, and what the consequences are, is one of the most actively debated topics in economics.</p>
      <h3>Measuring Inequality</h3>
      <p>The <strong>Gini coefficient</strong> summarises the income distribution in a single number: 0 = perfect equality, 1 = one person has everything. The US Gini (~0.45) is much higher than Nordic countries (~0.25). But the Gini misses distributional shape — the same Gini can reflect very different distributions. Piketty, Saez, and Zucman use tax records to show the <strong>top 1% and 0.1%</strong> income and wealth shares — finding dramatic concentration at the very top not captured by survey data.</p>
      <h3>Causes of Rising Inequality</h3>
      <ul>
        <li><strong>Skill-biased technical change:</strong> technology (computers, automation) raises demand for high-skill workers and reduces demand for routine tasks, widening the wage gap</li>
        <li><strong>Globalisation:</strong> trade with low-wage countries reduces manufacturing wages; financial globalisation gives capital more bargaining power over labour</li>
        <li><strong>Winner-take-all markets:</strong> network effects mean the best songwriter, software, or fund manager captures global markets; superstar effects compress the distribution at the top</li>
        <li><strong>Policy changes:</strong> declining unionisation, weakened minimum wages, tax cuts at the top have amplified pre-tax trends</li>
      </ul>
      <h3>Piketty's r > g Thesis</h3>
      <p>Thomas Piketty (2014) argues that when the rate of return on capital (r) exceeds economic growth (g), wealth concentrates without bound. Historical data shows this gap prevailed before WWI and is returning today. The policy implication: progressive wealth taxes are needed to prevent dynastic inequality. Critics note that r varies by asset class and by who invests, and that historically high r > g did not always produce extreme wealth concentration.</p>`,
    },
    {
      id:'information_economics', cat:'advanced', title:'Information Economics',
      subtitle:'How asymmetric information shapes markets and institutions',
      body:`<p>Information economics (Akerlof, Spence, Stiglitz, Nobel 2001) analyses how markets function when participants have different information — one of the most pervasive features of real economic life.</p>
      <h3>The Market for Lemons (Akerlof, 1970)</h3>
      <p>In used car markets, sellers know whether their car is good or a "lemon" but buyers don't. Buyers will only pay the average quality price. This drives good car owners out of the market (price below their reservation price), lowering average quality, lowering the price, driving out more sellers — a death spiral. In the limit, the market collapses entirely. Credit markets, labour markets, and insurance all face similar adverse selection problems.</p>
      <h3>Signalling (Spence)</h3>
      <p>Education as a signal: if education is cheaper for high-ability workers (they find it less costly to sit in class), employers can use education as a signal of ability even if education adds no skills. Workers get education to signal ability; firms pay more to educated workers. This is a separating equilibrium — but potentially wasteful: if education is just signalling, all the resources spent on degrees create no social value. Sheepskin effects (the degree itself, not the years of study, raises wages) support the signalling view.</p>
      <h3>Screening (Stiglitz)</h3>
      <p>When the uninformed party moves first, they can screen — design contracts that make different types self-select. Insurance companies offer contracts with different deductibles: high-risk individuals choose low deductibles, low-risk choose high. This reveals private information through revealed preference, solving adverse selection without direct information. The key insight: second-best contracts can achieve near-efficient outcomes despite information asymmetry.</p>`,
    },
    {
      id:'network_economics', cat:'advanced', title:'Network Economics and Platforms',
      subtitle:'Two-sided markets, platforms, and the economics of the digital age',
      body:`<p>Network effects, platform markets, and two-sided businesses represent a major frontier in economics — accounting for the largest firms in the world (Alphabet, Meta, Amazon, Alibaba) and requiring new theoretical tools to analyse.</p>
      <h3>Direct and Indirect Network Effects</h3>
      <p><strong>Direct network effects:</strong> each additional user makes the network more valuable to all existing users (telephones, messaging apps, cryptocurrencies). Value approximately proportional to n² (Metcalfe's Law). <strong>Indirect network effects:</strong> platforms serve two sides that benefit each other — more iPhone users attract more app developers, who attract more users. The value of each side depends on the size of the other.</p>
      <h3>Two-Sided Market Pricing</h3>
      <p>Rochet and Tirole (2003): the optimal price to each side of a platform depends on the demand elasticity of that side and the cross-side network effect. Platforms often subsidise one side (users get free email; content creators get free platforms) to attract the other side (advertisers pay). This means price ≠ marginal cost even in competitive platform markets — the conventional pricing rule breaks down. Antitrust analysis must recognise that "free" services on one side are funded by fees on the other.</p>
      <h3>Winner-Take-All and Antitrust</h3>
      <p>Strong network effects, low marginal costs, and switching costs naturally lead to monopolisation. Google has >90% of search globally; Facebook/Instagram/WhatsApp dominate social networking. Traditional antitrust (predatory pricing, mergers that raise prices) struggles with free digital services. New frameworks focus on data concentration, interoperability, and the competitive effects of platform self-preferencing — the issues motivating EU Digital Markets Act and US antitrust actions against Big Tech.</p>`,
    },
    {
      id:'econometrics', cat:'advanced', title:'Econometrics and Causal Inference',
      subtitle:'How economists establish what causes what',
      body:`<p>Economics generates much of its value from causal claims: minimum wages reduce employment (or don't), immigration lowers native wages (or doesn't), education increases earnings (or reflects pre-existing ability). Establishing causation — not just correlation — requires careful statistical methods.</p>
      <h3>The Fundamental Problem of Causal Inference</h3>
      <p>To know the causal effect of a policy on person i, we need to compare their outcome with vs. without the policy. But we can only observe one — the <em>fundamental problem of causal inference</em>. All econometric methods are ways of constructing a plausible <em>counterfactual</em> — what would have happened without the policy.</p>
      <h3>The Credibility Revolution</h3>
      <p>Angrist and Pischke (2009) describe the "credibility revolution": the shift from structural modelling (imposing theoretical assumptions to identify effects) to quasi-experimental methods that find natural experiments in data. Four key methods:</p>
      <ul>
        <li><strong>Randomised Controlled Trials (RCTs):</strong> gold standard; random assignment ensures treatment and control groups are identical in expectation</li>
        <li><strong>Instrumental Variables (IV):</strong> find a variable that affects treatment but affects outcomes only through treatment (e.g., Vietnam draft lottery as instrument for military service)</li>
        <li><strong>Difference-in-Differences:</strong> compare changes over time in treated vs. untreated groups (parallel trends assumption)</li>
        <li><strong>Regression Discontinuity:</strong> exploit sharp cut-offs in policy assignment (test score just above vs. just below scholarship threshold)</li>
      </ul>
      <h3>Machine Learning in Econometrics</h3>
      <p>Modern methods combine ML (lasso, random forests, deep learning) with causal inference. Double-machine-learning (Chernozhukov 2018) uses ML to control for high-dimensional confounders while preserving valid causal inference. Causal forests extend regression discontinuity to heterogeneous treatment effects — identifying which subgroups benefit most from a policy.</p>`,
    },
    {
      id:'international_finance', cat:'advanced', title:'International Finance and Capital Flows',
      subtitle:'Cross-border investment, crises, and the global monetary system',
      body:`<p>International capital flows — foreign direct investment, portfolio investment, bank lending — now dwarf trade flows in scale. Understanding their drivers, benefits, and risks is essential for modern macroeconomics.</p>
      <h3>The Impossible Trinity (Mundell-Fleming)</h3>
      <p>A country cannot simultaneously have all three of: free capital mobility, fixed exchange rate, and independent monetary policy. The trade-offs:</p>
      <ul>
        <li>Fixed rate + free capital → monetary policy follows the anchor country (Eurozone periphery)</li>
        <li>Fixed rate + independent monetary policy → capital controls (China historically)</li>
        <li>Free capital + independent monetary policy → floating exchange rate (US, UK, Japan)</li>
      </ul>
      <h3>Sudden Stops and Currency Crises</h3>
      <p>Emerging market crises (Mexico 1994, Asia 1997–98, Russia 1998, Argentina 2001) followed a pattern: external borrowing finances consumption and investment booms; the real exchange rate appreciates; current account deficit widens; a trigger (political uncertainty, US rate rise) causes capital outflow reversal — a "sudden stop." Without foreign exchange reserves, the currency crashes, domestic debt burdens explode, and banking crises follow. IMF bailouts provide liquidity but often impose harsh austerity conditions.</p>
      <h3>Global Imbalances and the Dollar's Role</h3>
      <p>The US runs persistent current account deficits financed by the rest of the world's desire to hold dollar assets (Triffin's dilemma: the reserve currency issuer must run deficits to supply the world with safe assets, creating dollar overvaluation). China's massive export surplus and reserve accumulation represent a structural imbalance. Eichengreen and others debate whether this "exorbitant privilege" will persist as China's renminbi internationalises.</p>`,
    },
    {
      id:'public_finance', cat:'advanced', title:'Public Finance and Optimal Taxation',
      subtitle:'Government revenue, spending, and redistribution',
      body:`<p>Public finance studies what governments should do, why private markets may under-provide certain goods, and how to finance public expenditure with minimum efficiency cost and maximum equity.</p>
      <h3>The Optimal Tax Problem (Mirrlees)</h3>
      <p>James Mirrlees (Nobel 1996) formalised the optimal income tax problem: government wants to redistribute from high- to low-earners but can't observe ability — only income (which reflects effort as well as ability). High tax rates cause high-ability workers to work less. The optimal nonlinear income tax balances equity (redistribute) against efficiency (preserve incentives). Key result: the marginal tax rate at the top of the income distribution should be less than 100% — there are always incentive costs to redistribution.</p>
      <h3>Ramsey Taxation</h3>
      <p>For commodity taxes, the Ramsey rule (1927) minimises deadweight loss: tax goods in inverse proportion to their price elasticity of demand. Inelastic goods (necessities) should face higher taxes — the quantity doesn't change much, so the efficiency cost is low. But taxing necessities is regressive — it takes more from poor people as a share of income. The equity-efficiency trade-off is inescapable. Diamonds' optimal commodity tax rule extends this to account for cross-price elasticities.</p>
      <h3>Fiscal Federalism</h3>
      <p>Tiebout (1956): decentralised governments allow "voting with feet" — people choose jurisdictions offering their preferred tax-service package, revealing preferences and creating competition among governments. But race-to-the-bottom dynamics (tax competition) may lead to underprovision of public goods and excessive tax breaks for mobile capital. Optimal fiscal federalism assigns expenditures to the lowest level of government that can internalise all costs and benefits, while centralising redistribution (since local redistribution attracts poor and repels rich).</p>`,
    },
  ],
};
