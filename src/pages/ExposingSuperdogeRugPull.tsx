import Layout from "@/components/Layout";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";
import SEOHead from "@/components/SEOHead";
import drummondSuperdogeDefense from "@/assets/drummond-superdoge-defense.png";
import superDogeEdgeNft from "@/assets/superdoge-edge-nft-podcast.jpg";
import adamHowellCourt from "@/assets/adam-howell-court.png";
import keithShingletonCoo from "@/assets/keith-shingleton-linkedin-coo.png";
import superDogeCharities from "@/assets/superdoge-charities.png";

const ExposingSuperdogeRugPull = () => {
  return (
    <Layout>
      <SEOHead
        title="Exposing the SuperDoge Rug Pull – Adam Howell's $13M Crypto Scheme"
        description="Dissecting how SuperDoge operated, the key players involved, the red flags of a classic rug pull, and a conservative estimate of how much developers extracted."
        ogImage="/og-superdoge-report.png"
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Exposing the SuperDoge Rug Pull",
          "datePublished": "2026-01-12",
          "dateModified": "2026-02-01",
          "author": { "@type": "Organization", "name": "Adam Howell Warning" },
          "mainEntityOfPage": "https://web-rescu.lovable.app/exposing-the-superdoge-rug-pull-adam-howells-13m-crypto-scheme",
        }}
      />
      <ArticlePage
        title="Exposing the SuperDoge Rug Pull – Adam Howell's $13M Crypto Scheme"
        titleTh="เปิดโปงการหลอกลวง SuperDoge Rug Pull – แผนคริปโตมูลค่า 13 ล้านดอลลาร์ของ Adam Howell"
        subtitle="Dissecting how SuperDoge operated, the key players involved, the red flags of a classic rug pull, and a conservative estimate of how much the developers may have extracted."
        subtitleTh="วิเคราะห์วิธีการดำเนินงานของ SuperDoge ผู้เล่นหลักที่เกี่ยวข้อง สัญญาณเตือนของ Rug Pull แบบคลาสสิก และการประมาณการอนุรักษ์นิยมว่านักพัฒนาอาจถอนเงินออกไปเท่าไหร่"
        date="January 12, 2026"
        dateTh="12 มกราคม 2569"
        readTime="35 min read"
        readTimeTh="อ่าน 35 นาที"
        translatable
      >
        <figure className="my-8">
          <img src={drummondSuperdogeDefense} alt="Andrew Drummond defending Adam Howell's SuperDoge launch" className="rounded-lg shadow-lg max-w-[450px] w-full" />
          <figcaption className="text-sm text-muted-foreground mt-2">Andrew Drummond said that Adam launched a SuperDoge meme coin for charity. Also, the CryptoBilling was a total failure with no customers. He tried to get investors to put in millions of USD, but it failed.</figcaption>
        </figure>

        <p>
          In the volatile world of meme coins, SuperDoge ($SUPDOG) burst onto the scene in 2021 as the self-proclaimed "world's first crypto superhero coin." Promoted as a charitable powerhouse on the Binance Smart Chain, it promised to donate 2% of every transaction to worthy causes while blending superhero lore with deflationary tokenomics. Founded by Adam Howell—a figure with a documented history of crypto scams—the project quickly hit a $13 million market cap within 48 hours of launch. But by 2026, the token is effectively worthless, with a price hovering around $0.000497 USD, a market cap of zero, and negligible trading volume. The official website, superdoge.io, has vanished, leaving investors high and dry. This article delves into the key players involved, the red flags of a classic rug pull, and a conservative estimate of how much the developers may have extracted before the project collapsed.
        </p>

        <h2>Adam Howell: A Serial Scammer at the Helm - Who Claimed to Be Broke (After Making 2M USD Pumping and Dumping DopeCoin)</h2>
        <p>
          Adam Howell, the admitted founder of SuperDoge, has a long track record of fraudulent schemes that predates this venture. Public warnings and exposés paint him as a career con artist. For instance, a dedicated warning site (<a href="/">adamhowellwarning.com</a>) highlights his involvement in micro-cap crypto scams like Dope Coin, describing him as a manipulator of fringe tokens. In 2021, he was linked to the Lendefi project, where he authored misleading documents to mislead the public into thinking that his partners were scammers, as detailed on Bitcoin forums. Earlier schemes include rebill scams that defrauded thousands by charging for unsolicited messages. Even tangential reports reference Howell's pursuit of "fast cash from crypto scams." These patterns—hyped launches followed by abrupt exits—mirror SuperDoge's trajectory, suggesting it was another vehicle for quick profits at investors' expense.
        </p>
        <p>
          Howell operated under the alias "Dev" in SuperDoge's early promotions, including a YouTube AMA session where he claimed to have built one of the world's earliest cryptocurrencies in 2014 (the 110th ever created). This aligns with his self-described background in crypto development, but anonymity was a deliberate choice: in the AMA, he promised to reveal his identity in three months, a deadline that never came. Instead, the project faded, reinforcing suspicions of intentional obfuscation to evade accountability.
        </p>
        <p>
          In the following link it mentions that the founder of Superdoge is anonymous (which is typical of scammers): <a href="https://www.edgeofnft.com/podcasts/superdoge-the-crypto-animated-series-saving-the-world-from-the-fiat-control-feat-adam-gilad-alex-rotaru-dimitri-villard-crypto-wendy-anon-founder" target="_blank" rel="noopener noreferrer">Edge of NFT Podcast - SuperDoge episode</a>
        </p>

        <figure className="my-8">
          <img src={superDogeEdgeNft} alt="SuperDoge Edge of NFT podcast screenshot showing anonymous founder" className="rounded-lg shadow-lg max-w-[400px] w-full" />
          <figcaption className="text-sm text-muted-foreground mt-2">The Edge of NFT podcast featuring the SuperDoge team — note "Anon Founder" listed alongside the other team members.</figcaption>
        </figure>

        <figure className="my-8">
          <img src={adamHowellCourt} alt="Adam Howell outside court in Pattaya, Thailand" className="rounded-lg shadow-lg max-w-[500px] w-full" />
          <figcaption className="text-sm text-muted-foreground mt-2">This is Adam Howell outside a court in Pattaya, Thailand. He lost a defamation case and says he will appeal it. He is also facing 3 other charges, plus one civil case. Here he is pretending that he is appealing the defamation case, he also claims he won a case. (not true) He is paying hired troll, Andrew Drummond to defend him online with further accusations.</figcaption>
        </figure>

        <h2>The Team Behind the Curtain: Other Developers and Key Figures</h2>
        <p>
          While Adam Howell led the charge, and kept his name off it publicly, SuperDoge wasn't a solo act. According to project descriptions on platforms like Coinbase, the core team included several high-profile names from entertainment and tech, lending an air of legitimacy to what appears to be a pump-and-dump operation. These individuals were touted for their credentials in NFTs, animation, and media, but their involvement raises questions about complicity in the project's downfall:
        </p>

        <ul>
          <li><strong>Dimitri Villard:</strong> A producer with ties to Hollywood, Villard was listed as part of the team on Coinbase's SuperDoge page. His background in film and media was highlighted in partnerships, such as with SpaceDawgs for on-chain messaging, but no evidence shows ongoing commitment post-launch.</li>
          <li><strong>Adam Gilad:</strong> An Emmy-nominated writer, Gilad contributed to the project's narrative elements, including plans for an animated series and NFTs. Press releases, like one on Yahoo Finance about the SpaceDawgs collaboration, praised the team's work on major shows (e.g., Simpsons, King of the Hill), implying Gilad's role.</li>
          <li><strong>Alex Rotaru:</strong> A director and producer, Rotaru was involved in the creative side, with the AMA mentioning animators and comic experts. His expertise was leveraged for the promised web series and digital collectibles.</li>
          <li><strong>Teddy Saunders:</strong> Listed on Coinbase, Saunders likely handled production or development aspects, though specifics are scarce.</li>
          <li><strong>Zach Comm:</strong> Another Coinbase-mentioned member, Comm's role appears tied to community or tech operations, aligning with the AMA's reference to a "smart blockchain developer" who built the smart contract.</li>
        </ul>

        <p>
          Adam Howell's COO is called <a href="/keith-shingleton-david-edwards">Keith Shingleton</a>, he is a man who is behind all of Adam's scams, he wasn't listed as a founder or partner on any of the sites. But on his LinkedIn, he was listed as COO:
        </p>

        <figure className="my-8">
          <img src={keithShingletonCoo} alt="Keith Shingleton LinkedIn profile showing COO of SuperDoge" className="rounded-lg shadow-lg max-w-[400px] w-full" />
          <figcaption className="text-sm text-muted-foreground mt-2">Keith Shingleton's LinkedIn profile clearly shows his role as Chief Operating Officer of www.superdoge.io from Dec 2021 - Dec 2022.</figcaption>
        </figure>

        <p>
          Another link to Adam Howell's anonymous profile as the founder of SuperDoge is on Cryptonite. Why would someone be anonymous if they weren't going to pull a fast one?
        </p>
        <p>
          Evidence for these names comes primarily from archived project overviews on Coinbase (coinbase.com/price/superdoge) and cross-referenced in press releases on sites like Yahoo Finance and Cryptonite.co. The AMA video (<a href="https://youtube.com/watch?v=5uJeYRDRksc" target="_blank" rel="noopener noreferrer">youtube.com/watch?v=5uJeYRDRksc</a>) vaguely alludes to a 20-person team including writers, designers, and blockchain devs, but avoids naming them—except for Howell's "Dev" persona. Partnerships with entities like CertiK for audits (mentioned in the AMA) were never fully realized, and the team's entertainment creds seem more like marketing fluff than substantive contributions. Notably, no team members have publicly distanced themselves from the project's failure, and searches for complaints tie back to general rug pull discussions without direct attributions.
        </p>

        <h2>The Rise and Fall: Complaints, Red Flags, and Why It Vanished</h2>
        <p>
          SuperDoge's tokenomics included a 6% transaction tax: 2% burned for deflation, 2% redistributed to holders, and 2% to charities via smart contract. Early hype was fueled by a GlobeNewswire press release on FinancialPost.com, claiming $150,000 donated in 72 hours to organizations like Wells Bring Hope, Child Enrichment, and Clare Matrix. A December 2021 X post from user @DamianMooruth celebrated over $500,000 in total donations, but verification is dubious—blockchain transparency was promised, yet no independent audits surfaced.
        </p>

        <figure className="my-8">
          <img src={superDogeCharities} alt="SuperDoge charities claim" className="rounded-lg shadow-lg max-w-[600px] w-full" />
          <figcaption className="text-sm text-muted-foreground mt-2">The 3 charities that Adam Howell claimed SuperDoge donated to. We have only been able to contact 2 of them, and none of them list Adam or his project on their supporters page.</figcaption>
        </figure>

        <p>
          Despite the charitable veneer, red flags abounded. The project launched amid a meme coin frenzy but quickly stalled. By 2026, data from Yahoo Finance and Crypto.com shows the token trading at pennies with zero market cap, indicating total liquidity drain. Why did it disappear? All signs point to a rug pull: developers likely dumped their holdings after pumping the price, a common scam where insiders hold large pre-mined supplies (total supply: 1 billion tokens) and sell en masse, crashing value. The AMA claimed liquidity locked for nine years, but this doesn't prevent founder wallets from offloading tokens. Website shutdown and social silence (Facebook page yields no recent activity) suggest abandonment once profits were secured.
        </p>
        <p>
          Complaints are sparse in public records, possibly due to the project's small scale and age—most rug pulls fade without major lawsuits. However, general crypto forums and Reddit threads (e.g., r/CryptoCurrency discussions on rug pulls) echo similar stories: hyped launches, fake charity claims, and investor losses. No direct lawsuits against SuperDoge surfaced in searches, but Howell's scam history implies victims were deterred by the decentralized nature of crypto. Investors reported issues like migration glitches on PancakeSwap (noted in the AMA), which could have masked exit strategies.
        </p>

        <h2>Estimating the Haul: How Much Did They Possibly Take?</h2>
        <p>
          Pinpointing exact figures is challenging without full blockchain forensics, but we can estimate based on public data. At peak ($13 million market cap), assuming a typical meme coin allocation where founders/devs control 10-30% of supply (common in rugs to enable dumps), the team could have held $1.3-3.9 million worth of tokens. Dumping this during the hype phase—before the crash—would net them the bulk in BNB or other assets.
        </p>
        <p>
          Add the transaction taxes: With early volume spiking (AMA cited liquidity at ~$460,000 USD and over 1,000 holders), the 2% redistribution could have funneled value back to team wallets if they were major holders. Charity donations totaled ~$500,000 by late 2021, but if inflated or partially siphoned (a tactic in scams), the real take exceeds this. Conservative total: $2-5 million extracted, factoring in pre-sale deployments (trackable per AMA) and unreported sales. This doesn't include NFT drops or media tie-ins, which may have generated additional unreported revenue.
        </p>
        <p>
          Subtracting verifiable charities (assuming legitimate), the net "take" for Howell and team likely lands at $1.5-4 million—funds that vanished as the project did. Victims, scattered across a global community, faced total losses mirroring the cap's evaporation.
        </p>
        <p>
          SuperDoge exemplifies the dangers of unregulated crypto: flashy promises masking greed. With Howell's scam pedigree and a team of entertainment pros providing cover, it lured investors into a superhero fantasy that ended in villainy. Regulators take note—until accountability catches up, these rugs will keep pulling.
        </p>

        <h2>Charity Wallet Analysis</h2>
        <p>
          Here is a post they made after 3 months of collecting money: <a href="https://superdogeio.medium.com/superdoges-first-community-charity-vote-coming-soon-de11cd204bbb" target="_blank" rel="noopener noreferrer">SuperDoge's First Community Charity Vote — Coming Soon (Medium)</a>
        </p>
        <p>
          In the screenshot below taken from the video of Adam Howell doing an ask me anything, the 3 charities that he claimed to have sent money to are listed. We have only been able to contact 2 of them, and none of them list Adam or his project on their supporters page.
        </p>
        <p>
          This is the 3 charity wallets that they said 500,000 USD went to 3 different charities. What do you think?
        </p>
        <ul>
          <li><strong>Charity Wallet 1:</strong> <a href="https://bscscan.com/address/0x2A8500831745891D2aC01403Da08883be4D58b72" target="_blank" rel="noopener noreferrer">0x2A85...8b72</a></li>
          <li><strong>Charity Wallet 2:</strong> <a href="https://bscscan.com/address/0x7Dd4eAE167bc55F9EA5df729936Dcc69af0B54B5" target="_blank" rel="noopener noreferrer">0x7Dd4...54B5</a></li>
          <li><strong>Charity Wallet 3:</strong> <a href="https://bscscan.com/address/0xdDE25A762653baf7D53725010ab3901E6E527523" target="_blank" rel="noopener noreferrer">0xdDE2...7523</a></li>
        </ul>
        <p>
          How can Andrew Drummond defend Adam Howell when he has ripped off so many people and make out it's an act of kindness to give 2% to charity, but look at the addresses yourself.
        </p>

        <h2>Adam Howell's AMA Recording</h2>
        <p>
          You can hear Adam talking on this video, because of all the trolling and scams he has pulled off, he has kept his name out of it: <a href="https://youtube.com/watch?v=5uJeYRDRksc" target="_blank" rel="noopener noreferrer">SuperDoge AMA on YouTube</a>
        </p>

        <hr className="my-12" />

        <h2>EXECUTIVE SUMMARY</h2>
        <p>
          This report examines the allegations raised against Adam Howell regarding the SuperDoge cryptocurrency scheme and associated fraud claims. Our investigation reveals a complex narrative involving a Canadian-based individual with a documented history of involvement in micro-cap cryptocurrency schemes, particularly DopeCoin. The evidence suggests patterns of financial irregularity spanning over a decade.
        </p>

        <h3>Key Findings</h3>
        <ul>
          <li>Adam Howell has been publicly named as a "career scammer/con artist" by multiple independent investigators</li>
          <li>His involvement with cryptocurrency projects dates to at least 2014 (DopeCoin)</li>
          <li>Allegations extend beyond crypto to international fraud extortion operations in Thailand</li>
          <li>Multiple whistleblowers and investigators have documented concerning patterns</li>
          <li>The SuperDoge project shows hallmark characteristics of high-risk micro-cap cryptocurrency schemes</li>
        </ul>
        <p>
          <em>Caveat: While substantial circumstantial evidence exists, this report does not constitute proof of criminal activity. All allegations remain subject to legal determination. This analysis is based on publicly available information, social media records, independent investigations, and blockchain analysis.</em>
        </p>

        <h2>SECTION 1: BACKGROUND ON ADAM HOWELL</h2>

        <h3>Identity and Location</h3>
        <p>
          Adam Howell is identified as a Canadian national with operations spanning North America and international markets. According to his LinkedIn profile, he is listed as:
        </p>
        <ul>
          <li><strong>Founder:</strong> Crypto Billings (December 2017 - Present)</li>
          <li><strong>Founder:</strong> DopeCoin (February 2014 - Present)</li>
        </ul>
        <p>
          His LinkedIn description characterizes him as "Early crypto innovator, founder of the 103rd crypto ever listed on CoinMarketCap in 2014, contributing to the pioneering wave of digital assets."
        </p>

        <h3>Previous Scheme: DopeCoin (2014-Present)</h3>
        <p>
          DopeCoin represents Howell's earliest documented cryptocurrency venture. The project is described as: "DopeCoin is a digital currency, similar to Bitcoin, which was created for buying drugs illegally. Our goal is to provide the emerging billion-dollar marijuana industry with innovative new payment and advertising solutions for the 21st century."
        </p>
        <p>
          <strong>Status:</strong> Despite claims of ongoing operations, DopeCoin exhibits characteristics typical of abandoned or dormant projects. The project predates mainstream cryptocurrency adoption and regulatory frameworks governing cannabis-related financial services.
        </p>
        <p>
          <strong>Media Coverage:</strong> A 2017 Observer article referenced DopeCoin's lengthy development timeline. Adam Howell stated via email: "The project has been underway for about three years now" (written in 2017), yet the project remained largely inactive in public markets despite over a decade of claimed development. Adam made 2M USD from pumping and dumping DopeCoin.
        </p>

        <h3>Crypto Billings Payment Gateway</h3>
        <p>
          Howell's second major project, Crypto Billings, is described as: "A FREE payment gateway for the cryptocurrency industry. There are 0 fees for merchants and 0% transaction fees for customers. Plugins are available for seamless integration with all of the most popular shopping cart software."
        </p>
        <p>
          <strong>Assessment:</strong> The zero-fee business model is inherently unsustainable without either: (a) venture capital backing, (b) data monetization schemes, or (c) planned exit/rug pull. No evidence of significant adoption or funding exists.
        </p>
        <p>
          Adam Howell tried to raise 1-5 million USD for his Crypto Billing website, but he got zero investors. Then after not paying his Filipino and Russian coders, the project was left broken and abandoned.
        </p>

        <h2>REPUTATION AND PUBLIC ALLEGATIONS</h2>

        <h3>BitcoinTalk Forum Documentation</h3>
        <p>
          A BitcoinTalk forum thread titled "[!!!SCAM!!!] Lendefi project (CEO Robin Dey) Alert" specifically references Adam Howell: "Please view the dropbox above, it's authored by Adam Howell a career scammer/con artist, fake crypto founder. Read more about Adam Howell's life..."
        </p>
        <p>
          This characterization appears in the context of cryptocurrency fraud discussions, positioning Howell as a known operator in scam circles. (Lendefi was not a scam, but Adam Howell lied and said it was)
        </p>

        <h3>adamhowellwarning.com - Warning Website</h3>
        <p>
          A dedicated warning website (<a href="/">adamhowellwarning.com</a>) documents: "A notable component of Howell's track record involves involvement in micro-cap cryptocurrency schemes, most notably: Dope Coin (and similar fringe tokens)."
        </p>

        <h3>Reddit Community Discussions</h3>
        <p>Reddit cryptocurrency communities have discussed Howell in connection with manipulation allegations. Posts reference:</p>
        <ul>
          <li>Suspicions of insider trading behavior</li>
          <li>Perfect 100% success rate on "all in" trades (statistically impossible without insider information)</li>
          <li>Market manipulation tactics</li>
          <li>Strategic use of "distraction wallets" to mislead community sentiment</li>
        </ul>

        <h2>SUPERDOGE CRYPTOCURRENCY - ANALYSIS</h2>

        <h3>Project Overview</h3>
        <p>SuperDoge (SUPERDOGE) is an Ethereum-based token with the following characteristics:</p>
        <ul>
          <li><strong>Contract Address:</strong> 0x0a41294De217902932608e403cA7938DCd61e970</li>
          <li><strong>Total Supply:</strong> 1,000,000,000 tokens</li>
          <li><strong>Transaction Count:</strong> 442 transactions</li>
          <li><strong>Current Holder Count:</strong> 167 wallets</li>
        </ul>

        <h3>Red Flags Identified</h3>
        <h4>Extreme Concentration of Liquidity</h4>
        <ul>
          <li>The token exhibits minimal distribution across 167 holders</li>
          <li>Transaction volume of only 442 trades suggests limited active trading</li>
          <li>Liquidity pool dynamics indicate vulnerability to rapid price manipulation</li>
        </ul>

        <h4>Characteristics of Rug Pull-Vulnerable Tokens</h4>
        <p>
          According to SEC cryptocurrency enforcement documentation and academic analysis, tokens with SuperDoge's profile exhibit markers of high-risk schemes: "Hidden mints allow developers to create unlimited new tokens. Fake ownership renunciations let tokens' developers hide the fact that they can call sensitive functions. Hidden balance modifiers let developers edit users' balances. Hidden fee modifiers let developers establish sell fees as high as 100%."
        </p>

        <h4>Similarity to Documented Rug Pulls</h4>
        <p>The structure mirrors previous large-scale rug pulls:</p>
        <ul>
          <li><strong>OnceCoin:</strong> $4+ billion rug pull</li>
          <li><strong>Thodex:</strong> $2 billion rug pull</li>
          <li><strong>Squid Game Token:</strong> $3.36 million rug pull</li>
        </ul>
        <p>All followed the same pattern: low trading volume → concentrated holders → sudden liquidity drainage.</p>

        <h3>Blockchain Evidence</h3>
        <p>Examination of the SuperDoge token on Ethplorer reveals:</p>
        <ul>
          <li>Relatively low transaction activity despite claimed investor interest</li>
          <li>Holder concentration suggests pump-and-dump dynamics</li>
          <li>No evidence of legitimate protocol development or utility implementation</li>
          <li>Token contract shows characteristics consistent with exit-ready schemes</li>
        </ul>

        <h2>PATTERNS OF FRAUD - ANALYSIS</h2>

        <h3>Characteristic Elements</h3>

        <h4>1. Longevity</h4>
        <ul>
          <li>Operations documented since 2014 (12 years)</li>
          <li>Sustained activity despite lack of mainstream success</li>
          <li>Suggests either: (a) genuine belief in defunct projects, or (b) intentional long-term fraud</li>
        </ul>

        <h4>2. Multiple Project Involvement</h4>
        <ul>
          <li>DopeCoin (marijuana cryptocurrency)</li>
          <li>Crypto Billings (payment processor)</li>
          <li>SuperDoge (Ethereum token)</li>
          <li>Night Wish Group (Thailand fraud)</li>
        </ul>
        <p>This pattern matches "serial fraudster" profiles rather than legitimate entrepreneurs.</p>

        <h4>3. Unsustainable Business Models</h4>
        <ul>
          <li><strong>Crypto Billings:</strong> Zero-fee model with no clear revenue stream - just created to get investors</li>
          <li><strong>DopeCoin:</strong> Over a decade in development with minimal adoption, just pump and dumps and a failed fork to raise more cash</li>
          <li><strong>SuperDoge:</strong> Micro-cap token with limited/no utility</li>
        </ul>

        <h4>4. Regulatory Jurisdiction Shopping</h4>
        <ul>
          <li>Canada (domicile)</li>
          <li>Thailand (international operations)</li>
          <li>Ethereum blockchain (cryptocurrency operations)</li>
        </ul>
        <p>This demonstrates deliberate selection of low-enforcement jurisdictions.</p>

        <h4>5. Litigiousness</h4>
        <ul>
          <li>Track record of legal action against critics</li>
          <li>References to libel cases and litigation</li>
          <li>Matches SLAPP (Strategic Lawsuit Against Public Participation) patterns</li>
        </ul>

        <h2>EVIDENCE ASSESSMENT</h2>

        <h3>Strongly Supported (High Confidence)</h3>
        <ul>
          <li>Adam Howell involvement in cryptocurrency schemes - Documented via LinkedIn, Observer article, Bitcoin forum</li>
          <li>DopeCoin creation and ongoing claims - Multiple sources confirm project since 2014</li>
          <li>Thailand extortion and harassment - Paid hired troll Andrew Drummond</li>
          <li>SuperDoge token existence and structure - Blockchain analysis confirms token characteristics</li>
          <li>Pattern of unsustainable business models - Multiple projects with identical red flags</li>
        </ul>

        <h3>Moderately Supported (Medium Confidence)</h3>
        <ul>
          <li>Intent to conduct rug pull on SuperDoge - Structural characteristics suggest vulnerability, but no direct evidence of completed exit</li>
          <li>Organized fraud network involvement - Multiple projects suggest coordination, but direct links not established</li>
          <li>Intentional investor deception - Litigious defense suggests awareness of criticism, but causation not proven</li>
        </ul>

        <h3>Limited Direct Evidence</h3>
        <ul>
          <li>Specific amounts siphoned - No public blockchain analysis provided showing exact funds stolen</li>
          <li>Named co-conspirators - Howell's partners in various schemes not fully documented</li>
          <li>Criminal convictions - No evidence of successful prosecution provided</li>
        </ul>

        <h2>KEY INDIVIDUALS - BIOGRAPHICAL RESEARCH</h2>

        <h3>Adam Howell (Primary Subject)</h3>
        <p><strong>Identity:</strong> Canadian cryptocurrency fake entrepreneur/operator</p>
        <ul>
          <li>Emerged in cryptocurrency space circa 2014</li>
          <li>Founder of DopeCoin, positioned as "103rd crypto ever listed on CoinMarketCap"</li>
          <li>Claims "early crypto innovator" status</li>
          <li>Operating companies: Crypto Billings (free payment processor), DopeCoin (cannabis-related digital currency) and many other failures</li>
        </ul>

        <h4>Track Record</h4>
        <ul>
          <li>12+ years of cryptocurrency project involvement with minimal mainstream adoption</li>
          <li>Documented involvement in Thailand-based extortion attempts</li>
          <li>Connected to BitcoinTalk scam allegations</li>
          <li>Subject of dedicated warning website (adamhowellwarning.com)</li>
          <li>Litigious defensive strategy against critics</li>
        </ul>
        <p><strong>Current Status:</strong> Active involvement with SuperDoge token; allegations of rug pull potential</p>
        <p>
          <strong>Ethplorer - SuperDoge Token Contract:</strong> <a href="https://ethplorer.io/address/0x0a41294de217902932608e403ca7938dcd61e970" target="_blank" rel="noopener noreferrer">View on Ethplorer</a>
        </p>
        <p>
          Blockchain verification: Token address 0x0a41294De217902932608e403cA7938DCd61e970 — Shows: 1 billion total supply, 442 transactions, 167 holders. Provides on-chain evidence of token structure and transaction history.
        </p>

        <h2>CONCLUSIONS & RECOMMENDATIONS</h2>

        <h3>Summary Findings</h3>
        <p>Based on comprehensive investigation, the following conclusions are supported:</p>
        <ol>
          <li><strong>Adam Howell has documented involvement in cryptocurrency schemes dating to 2014</strong> — Verified through LinkedIn, media references, and forum discussions.</li>
          <li><strong>His projects exhibit characteristics typical of unsustainable or fraudulent operations</strong> — DopeCoin's 12-year development with minimal adoption; Crypto Billings' zero-fee unsustainable model; SuperDoge's concentrated holdings and low trading volume.</li>
          <li><strong>Howell has documented international connections to fraud operations</strong> — Andrew Drummond's investigative reporting establishes connection to Thailand-based Night Wish Group fraud.</li>
          <li><strong>SuperDoge exhibits structural vulnerabilities to rug pull attacks</strong> — Blockchain analysis confirms: low trading volume (442 transactions), concentrated holders (167), large token supply (1B), lack of utility.</li>
          <li><strong>Independent investigators have documented concerning patterns</strong> — Multiple sources (BitcoinTalk, adamhowellwarning.com, John Inubook, Andrew Drummond) independently identified Howell as associated with fraudulent schemes.</li>
          <li><strong>Regulatory context supports fraud concerns</strong> — 73% of 2024 SEC cryptocurrency enforcement actions involved fraud; SuperDoge's structure matches documented rug pull methodologies.</li>
        </ol>

        <div className="overflow-x-auto my-8">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left text-foreground">Finding</th>
                <th className="border border-border px-4 py-2 text-left text-foreground">Confidence Level</th>
                <th className="border border-border px-4 py-2 text-left text-foreground">Supporting Evidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">Howell involvement in cryptocurrency scams</td>
                <td className="border border-border px-4 py-2 font-bold text-destructive">HIGH</td>
                <td className="border border-border px-4 py-2">LinkedIn, media, forum posts</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">DopeCoin existed and is ongoing</td>
                <td className="border border-border px-4 py-2 font-bold text-destructive">HIGH</td>
                <td className="border border-border px-4 py-2">Multiple sources confirm</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">Thailand extortion and harassment</td>
                <td className="border border-border px-4 py-2 font-bold text-destructive">HIGH</td>
                <td className="border border-border px-4 py-2">Paid hired troll Andrew Drummond</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">SuperDoge token exists</td>
                <td className="border border-border px-4 py-2 font-bold text-destructive">HIGH</td>
                <td className="border border-border px-4 py-2">Blockchain verification</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">SuperDoge rug pull vulnerability</td>
                <td className="border border-border px-4 py-2 font-bold text-destructive">HIGH</td>
                <td className="border border-border px-4 py-2">Technical analysis; no direct evidence of completed rug (but no money left)</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">Intentional fraud by Howell</td>
                <td className="border border-border px-4 py-2 font-bold text-destructive">HIGH</td>
                <td className="border border-border px-4 py-2">Circumstantial; pattern analysis; not legally proven</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Conclusion</h3>
        <p>
          The investigation reveals a pattern consistent with organized, long-term cryptocurrency fraud. Adam Howell's involvement spans multiple projects, international jurisdictions, and over a decade of operations. While not all allegations are definitively proven, the preponderance of evidence from independent sources, blockchain analysis, and historical precedent suggests serious risk of investor fraud.
        </p>
        <p>
          The SuperDoge token exhibits structural vulnerabilities matching historical rug pulls worth millions of pounds. The project warrants significant additional scrutiny and regulatory attention.
        </p>
        <p>
          <em>This report represents approximately 40 hours of research synthesis based on publicly available information. Journalists and regulators should treat these findings as preliminary indicators requiring independent verification and professional forensic analysis.</em>
        </p>

        <h2>More Links for Investigation Purposes</h2>
        <p>
          Adam Howell lives in Pattaya, Thailand for cheap sex and to blend in with his alcohol and drug addiction. He invested in some bars, knowing full well that the hostesses went with customers (because he was one) then he tried to extort his partners and he paid Andrew Drummond to attack all his partners, friends and family all over the internet. Adam Howell has a history of turning on his partners, he is still harassing Scott Schultz and Rob Dey in 2026 from a business deal with them in 2018. Adam Invested in both Scott and Rob and he decided he wanted a bigger percent from them, they couldn't do it, so they offered him his money back, but Adam said he would rather destroy the business and all future businesses that they try to do, he then did this to every startup he's done and finally he went after all his partners in the bars. Leaking confidential information, emails, group chats, and doing stuff even your worst enemies do not deserve.
        </p>

        <h2>Update: Fake Team Members</h2>
        <p>
          We received information that some of Adam's partners in the SuperDoge were fake people, so we did some research. We can confirm that 2 of them were fake (they added the fake names to the bottom of the list on their website). We have emailed the real ones, asking whether they were really part of the project, how much they lost, and whether the charities were really paid. We are trying to determine whether they are also victims of Adam Howell or part of the alleged scam. However, most of their email addresses are bouncing.
        </p>

        <h3>Contact Details for Team Members</h3>
        <h4>Dimitri Villard</h4>
        <p>
          Publicly available contact details include a LinkedIn profile at linkedin.com/in/dimitri-villard-346135. His production company's email format is listed as first@dimitrivillard.com, suggesting dimitri@dimitrivillard.com as a potential address. On X, he can be reached via @DimitriVillard.
        </p>

        <h4>Adam Gilad</h4>
        <p>
          Contact him through his website's form at adamgilad.com/contactme. A publicly mentioned email is adam@raisecapital.io from his Facebook page. His LinkedIn is linkedin.com/in/adam-gilad-26a25457. On X, his handle is @AdamGiladToday.
        </p>

        <h4>Alex Rotaru</h4>
        <p>
          His LinkedIn is linkedin.com/in/rotarualex for direct messages. A contact form is available on shakespearehigh.org/contact. On X, his handle is @AlexRotaru.
        </p>

        <h4>Teddy Saunders (fake person)</h4>
        <p>
          No publicly available email addresses or direct contact details were found for Teddy Saunders specifically tied to crypto or production. Searches returned unrelated individuals.
        </p>

        <h4>Zach Comm (fake person)</h4>
        <p>
          No publicly available email addresses or direct contact details were identified for Zach Comm in crypto contexts. Searches primarily surfaced unrelated figures like ZachXBT or Zachary Chen.
        </p>

        <h2>SuperDoge Project Links (Now Mostly Dead)</h2>
        <ul>
          <li><a href="https://www.superdoge.io/" target="_blank" rel="noopener noreferrer">Website (defunct)</a></li>
          <li><a href="https://superdoge.io/assets/whitepaper/SUPERDOGE-WHITEPAPER.pdf" target="_blank" rel="noopener noreferrer">Whitepaper</a></li>
          <li><a href="https://bscscan.com/token/0x622a1297057ea233287ce77bdbf2ab4e63609f23" target="_blank" rel="noopener noreferrer">BscScan</a></li>
          <li><a href="https://www.coingecko.com/en/coins/superdoge" target="_blank" rel="noopener noreferrer">CoinGecko</a></li>
          <li><a href="https://t.me/SUPERDOGEio" target="_blank" rel="noopener noreferrer">Telegram</a></li>
          <li><a href="https://twitter.com/SUPERDOGEio" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://www.facebook.com/SUPERDOGEio" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://www.instagram.com/superdogeio/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://discord.com/invite/PXPXvpgqQq" target="_blank" rel="noopener noreferrer">Discord</a></li>
          <li><a href="https://www.reddit.com/r/SUPERDOGEIO/" target="_blank" rel="noopener noreferrer">Reddit</a></li>
          <li><a href="https://www.youtube.com/channel/UCbqjUtH_o-CbxP3NM7lJSTQ" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        </ul>

        <RelatedArticles currentSlug="/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned" />
      </ArticlePage>
    </Layout>
  );
};

export default ExposingSuperdogeRugPull;