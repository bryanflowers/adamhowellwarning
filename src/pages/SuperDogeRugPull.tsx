import Layout from "@/components/Layout";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";
import adamHowellHeadshot from "@/assets/adam-howell-headshot.png";
import keithShingletonLinkedin from "@/assets/keith-shingleton-linkedin.png";
import superDogeAmaYoutube from "@/assets/superdoge-ama-youtube.png";

const SuperDogeRugPull = () => {
  return (
    <Layout>
      <ArticlePage
        title="Exposing the SuperDoge Rug Pull: Adam Howell's Charity-Fueled Crypto Scam and the Millions Siphoned"
        subtitle="Dissecting how SuperDoge operated, the red flags ignored, the unprofessional tactics employed, and the potential legal violations that scream fraud."
        readTime="45 min read"
      >
        <p>
          In the Wild West of cryptocurrency, where meme coins rise and fall like digital fireworks, SuperDoge promised to be a beacon of hope—a dog-themed token that would save the world through charity while delivering massive returns to investors. Launched in April 2021 on the Binance Smart Chain (BSC), it hyped itself as a "heroic" project, complete with animated series, NFTs, and partnerships. But beneath the fluffy exterior lay a classic rug pull: a scheme orchestrated by serial scammer Adam Howell, who admitted his involvement in interviews and AMAs, only to vanish with potentially millions in investor funds. Four years later, the project's websites have disappeared, social channels are silent, and holders are left with worthless tokens. This extensive exposé, drawn from 20 AMA transcripts, blockchain analysis, and investigative reports (including this website), dissects how SuperDoge operated, the red flags ignored, the unprofessional tactics employed, and the potential legal violations that scream fraud. If you're a victim, this is your roadmap to understanding—and perhaps seeking justice.
        </p>

        <figure className="my-8">
          <img src={adamHowellHeadshot} alt="Adam Howell" className="rounded-lg shadow-lg max-w-[298px]" />
          <figcaption className="text-sm text-muted-foreground mt-2">Adam was convicted in Thailand of defamation and ran from 3 other criminal charges and lost 1 civil case.</figcaption>
        </figure>

        <h2>Background: Adam Howell's Shadowy Role in SuperDoge</h2>
        <p>
          Adam Howell, a Canadian with a history of crypto cons dating back to 2014, is unequivocally the mastermind behind SuperDoge. As detailed on <a href="/unmasking-adam-howell">this site</a>, Howell operated anonymously as "Dev" in the project's early promotions, including a YouTube AMA where he boasted about building "one of the world's earliest cryptocurrencies in 2014 (the 110th ever created)." He promised to reveal his identity within three months—a deadline never met. His voice in the AMAs matches confirmed interviews, and public exposés on forums like BitcoinTalk label him a "career scammer/con artist." Howell's track record includes Dope Coin (where he pocketed $2 million from a pump-and-dump) and destroyed Lendefi (by attacking his partners with falsified documents). He even claimed to be "broke" after these schemes, yet resurfaced with SuperDoge.
        </p>
        <p>
          The project listed a "20-person team" in AMAs and on archived Coinbase pages, but investigations reveal fakery. High-profile names like Dimitri Villard (Hollywood producer), Adam Gilad (Emmy-nominated writer), and Alex Rotaru (director) lent credibility to the creative side—promising animated series and NFTs. However, two key members were outright fabrications: Teddy Saunders (supposed production handler) and Zach Comm (community/tech ops). Emails to these "team members" bounced, as reported on adamhowellwarning.com. Press releases on Yahoo Finance and Cryptonite.co hyped this roster, but no one publicly distanced themselves post-collapse, suggesting complicity or indifference.
        </p>
        <p>
          Presales were conducted privately among "founders," with two using fake names to obscure involvement. While exact presale amounts aren't detailed in the AMA transcripts, adamhowellwarning.com estimates Howell's schemes often involved raising $1-5 million through insider allocations (10-30% of tokens). SuperDoge's BSC token contract (0x622a1297057ea233287ce77bdbf2ab4e63609f23) had a 1 billion total supply, with early liquidity at ~$460,000 and over 1,000 holders hyped in Episode 1. Transaction quantities from adamhowellwarning.com and blockchain data point to insider dumps: At a $13 million market cap peak (within 48 hours of launch), founders could have extracted $1.3-3.9 million. Net "take" after claimed charities: $1.5-4 million, per site estimates.
        </p>
        <p>
          Howell's anonymity was a deliberate shield. In Episode 1, he dodges naming: "You can just call me Dev." This hid his "shady past," including litigation against people he tried to extort with allegations (he lost a defamation case in Pattaya, Thailand) and alleged extortion to his partners in the bars he invested in. His pattern: Hype unsustainable models (like zero-fee crypto billing in related projects), pump prices, then exit abruptly.
        </p>
        <p>
          Adam Howell's COO is called Keith Shingleton, he is a man who is behind all of Adam's scams, he wasn't listed as a founder or partner on any of the sites. But on his LinkedIn, he was listed as COO.
        </p>

        <figure className="my-8">
          <img src={keithShingletonLinkedin} alt="Keith Shingleton LinkedIn profile showing COO role at SuperDoge" className="rounded-lg shadow-lg max-w-[552px]" />
        </figure>

        <h2>How the Scam Allegedly Worked: A Step-by-Step Rug Pull</h2>
        <p>SuperDoge followed a textbook rug pull playbook, leveraging charity as bait while siphoning funds through taxes, insider sales, and unverified outflows.</p>

        <ol>
          <li>
            <strong>Launch with Charity Hook and Private Presales:</strong> The token launched on BSC with a 6% transaction tax: 2% burned, 2% to holders, 2% to charities (later 3%). Presales were private, funneled to fake-named founders, allowing early accumulation at low prices. In Episode 1, Howell hypes: "We're about 13 hours in now and today has been quite successful. We're absolutely crushing it, 4.2 million market cap." This FOMO drove buys, while insiders held large stakes.
          </li>
          <li>
            <strong>Pump via Hype and Tokenomics:</strong> AMAs created buzz, promising audits (Certik by May 2021—Episode 2), listings (Bilaxy in Episode 4), NFTs ("Bored Apes" style—Episode 10), and an animated series (Marvel/DC level—Episode 4). Market cap fluctuated from $1-20 million, with a "20x" pump in November 2021 (Episode 17). Taxes funneled value to team if they were major holders.
          </li>
          <li>
            <strong>Extract Value Through Charity Facade:</strong> Claimed ~$500,000 to three charities via wallets:
            <ul>
              <li>Wallet 1 (0x2A8500831745891D2aC01403Da08883be4D58b72): ~$5-7K at peaks inflows from SUPERDOGE (2021). Outflows: 123 BNB and 58 BNB to single address 0xd1f027... (suspicious consolidation). Balance: ~16 BNB. Inactive since 2021.</li>
              <li>Wallet 2 (0x7Dd4eAE167bc55F9EA5df729936Dcc69af0B54B5): ~10.5 BNB inflows. Outflows: ~187 BNB to single address 0xC212... . Balance: ~2.5 BNB. Inactive since September 2021.</li>
              <li>Wallet 3 (0xdDE25A762653baf7D53725010ab3901E6E527523): Multiple small BNB inflows (~10-15 BNB total). Outflows to various (e.g., 0xa161..., 0x30bf...). Balance: 0 BNB. Fully drained by 2021.</li>
            </ul>
            <p>These inflows total ~$15-30K per wallet—far below $500K claimed (suggesting exaggeration or hidden wallets). Funds quickly outflowed to consolidated addresses, then dormancy. Adamhowellwarning.com notes only two charities contactable; neither lists SuperDoge as a supporter. This indicates potential siphoning: Taxes collected, small amounts sent, rest pocketed via outflows.</p>
          </li>
          <li>
            <strong>Delay, Pivot, and Abandon:</strong> As hype faded, blame "bear markets" (Episode 19). Pivot from 2D kids' show to 3D adult comedy (Episode 17: "We didn't hit that adult comedy level"). No NFTs or episodes released. By Episode 21: "We're very persistent... not throwing in the towel." Yet, superdoge.io vanished, socials silent since 2022. Token now worthless (~$0.000497 USD, zero market cap).
          </li>
        </ol>
        <p>Total raised: $13M peak cap, millions in volume. Siphoned: $1.5-4M net, per estimates—via insider dumps and unverified charity outflows.</p>

        <h2>Building Trust: The Illusion of Transparency and Altruism</h2>
        <p>
          Howell masterfully built a "cult following" (his words, Episode 14). Regular AMAs fostered rapport: "Welcome to our official AMA" (Episode 9). Charity updates were constant: "We've donated 508 BNB to charity, which is $171,000" (only 45,000-90,000 USD transacted to the charity wallets) (Episode 5). Guests like Carrie (Episode 3: "Thank you... you have no idea the impact") added legitimacy.
        </p>
        <p>
          Community involvement sealed it: Charity votes (Episode 9), airdrops (rookie cards—Episode 13), and shilling calls ("The community has a lot of work to do"—Episode 3). Grand visions: "If we can get one viral clip... we become superstars overnight" (Episode 12). This ethical facade attracted "good intent" investors, masking the scam.
        </p>

        <h2>Red Flags and Smoking Guns: Contradictions from the Transcripts</h2>
        <p>The AMAs are riddled with inconsistencies:</p>
        <ul>
          <li><strong>Audits/Listings Unfulfilled:</strong> "Certik... audited by the third week of May" (Episode 2). Never happened. "CoinMarketCap and CoinGecko... Please don't message me" (Episode 5)—stalling tactic.</li>
          <li><strong>NFT/Series Delays:</strong> "NFT drop on November 25th" (Episode 13). Pivoted: "Radically change our approach" (Episode 19). No releases.</li>
          <li><strong>Charity Exaggerations:</strong> "$500,000 donated... drilled wells in Africa" (Episode 21). Wallet data shows peanuts; no proofs.</li>
          <li><strong>Price Manipulation Hype:</strong> "20x in November" (Episode 17), then excuses: "Markets have not been that exciting" (Episode 19).</li>
          <li><strong>Anonymity Excuses:</strong> "Call me Dev" (Episode 1); later: "Out of the loop... larger project" (Episode 20)—exit strategy.</li>
        </ul>
        <p>Fake founders and private presales (adamhowellwarning.com) amplify this: Hype a star team, but two were ghosts.</p>

        <h2>Unprofessionalism: A Hobby Masquerading as a Project</h2>
        <p>
          SuperDoge screamed amateurism. AMAs were rambling: "It's late here guys, it's like 3 a.m." (Episode 8). No agendas, timelines, or bios. Pivots mid-stream (2D to 3D) showed poor planning. Anonymity avoided accountability; inactivity in chats (Episode 20). Encouraging unpaid shilling while team benefited? Unethical. No audits, financials, or KYC—far from professional standards.
        </p>

        <h2>Potential Legal Violations: Breaching SEC and Fraud Laws</h2>
        <p>SuperDoge likely violated U.S. laws:</p>
        <ul>
          <li><strong>Unregistered Securities (SEC Howey Test):</strong> Promoted as investment: "Push the value... everyone benefits financially" (Episode 15). No filings—Securities Act 1933 violation.</li>
          <li><strong>Wire/Mail Fraud (18 U.S.C. § 1343):</strong> Misrepresented charities via AMAs/Telegram; siphoned funds.</li>
          <li><strong>Pump-and-Dump (SEC Rule 10b-5):</strong> Coordinated hype ("Shill"—multiple episodes) for insider gains.</li>
          <li><strong>Charity Fraud (IRS/State Laws):</strong> Unverified donations; if siphoned, violates 501(c)(3) rules.</li>
          <li><strong>Money Laundering (BSA):</strong> Outflows to consolidated wallets suggest laundering.</li>
        </ul>
        <p>Anonymity complicates, but wallet traces and AMAs provide evidence. Report to SEC/FTC.</p>

        <p>The AMA is available on this playlist, we have downloaded copies before he deletes them and we have transcripts backed up.</p>
        <p>9 videos have been hidden before we downloaded them, which is further proof they are hiding evidence.</p>
        <p>
          <a href="https://www.youtube.com/playlist?list=PLqxmWufUt6J4k2rYtrhkd7nVRTk761AJD" target="_blank" rel="noopener noreferrer">
            https://www.youtube.com/playlist?list=PLqxmWufUt6J4k2rYtrhkd7nVRTk761AJD
          </a>
        </p>

        <figure className="my-8">
          <img src={superDogeAmaYoutube} alt="SuperDoge AMA YouTube playlist showing 9 unavailable hidden videos" className="rounded-lg shadow-lg max-w-[771px] w-full" />
        </figure>

        <ul>
          <li><strong>Pivots and Changes as Evidence of Poor Planning/Unprofessionalism:</strong>
            <ul>
              <li>Quote (Episode 10): "On top of that, we have made a considerable pivot. So, originally, we were planning on releasing a trading card battle deck series... We still are planning on releasing that, but before we do that, we're going to be getting into the NFT space in a different way."
                <ul><li>Idea: Discredit as "bait-and-switch"—initial promises shifted to chase "hot" trends (NFTs), delaying originals. Suggests opportunism, not vision.</li></ul>
              </li>
              <li>Quote (Episode 17): "We're going to radically change our approach with Superdoge... We're going to be changing our animation studio."
                <ul><li>Idea: Highlight as admission of failure ("didn't hit that adult comedy level"), wasting resources/time. Ties to unprofessional pivots mid-project.</li></ul>
              </li>
            </ul>
          </li>
          <li><strong>Excuses and Distractions (Other Projects, Market Conditions):</strong>
            <ul>
              <li>Quote (Episode 20): "I have been kind of out of the loop... working specifically on SuperDOGE, but instead on my larger project, which due to kind of market conditions required a recalibration."
                <ul><li>Idea: Discredit as abandonment—Howell prioritizes "larger project" over SuperDoge, using "market conditions" as excuse. Suggests SuperDoge was a side hustle/siphon.</li></ul>
              </li>
              <li>Quote (Episode 15): "My goal is to make sure that we push the value... including myself, I haven't made any money off of superdoge just spent money building it."
                <ul><li>Idea: Contradict with scam claims—If no money made, where did "piles of cash" for marketing come from? Implies investor funds misused.</li></ul>
              </li>
            </ul>
          </li>
          <li><strong>Financial Hype and Contradictions:</strong>
            <ul>
              <li>Quote (Episode 17): "We did do, what, a 20x in November... We went up to 20 million market cap."
                <ul><li>Idea: Discredit as pump admission—celebrates short-term spike, then blames outsiders for not finding content "funny." Suggests manipulated hype.</li></ul>
              </li>
              <li>Quote (Episode 5): "We're dumping piles of cash into... punching through the veil."
                <ul><li>Idea: Vague "cash" spending on marketing/listings—question source (investor funds?) and outcomes (no listings achieved).</li></ul>
              </li>
              <li>Quote (Episode 10): "Hammering all kinds of money that I wish I didn't have to spend, but we'll be spending it to drive traffic."
                <ul><li>Idea: Portray as wasteful—admits reluctance to spend, yet promises big budgets. Ties to unfulfilled deliverables.</li></ul>
              </li>
            </ul>
          </li>
          <li><strong>Charity Hype Without Substance:</strong>
            <ul>
              <li>Quote (Episode 21): "Over $500,000 donated to charity. We've drilled wells in Africa... built additions to foster care home in Georgia."
                <ul><li>Idea: Discredit as unsubstantiated—wallet analysis shows minimal funds; no proofs in transcripts. Suggest exaggeration to maintain trust.</li></ul>
              </li>
              <li>Quote (Episode 18): "We have concluded our charity vote today... clear winner, Move to Improve."
                <ul><li>Idea: Charity votes as gimmick—engages community but diverts from core failures.</li></ul>
              </li>
            </ul>
          </li>
          <li><strong>Apologies and Inactivity as Red Flags:</strong>
            <ul>
              <li>Quote (Episode 19): "I apologize about last night... by the time I looked up it was two in the morning."
                <ul><li>Idea: Pattern of unreliability—late AMAs, missed sessions show disorganization.</li></ul>
              </li>
              <li>Quote (Episode 20): "I apologize that I haven't been checking in that often over the last couple of months."
                <ul><li>Idea: Admit ghosting—ties to abandonment, discrediting "persistent" claims (Episode 21).</li></ul>
              </li>
            </ul>
          </li>
          <li><strong>Community Exploitation:</strong>
            <ul>
              <li>Quote (Episode 3): "The community has a lot of work to do, we have to promote our project."
                <ul><li>Idea: Shifts burden—unpaid "shilling" while team spends vaguely.</li></ul>
              </li>
              <li>Quote (Episode 15): "All of you guys that are putting in all this hard work and shilling and promoting."
                <ul><li>Idea: Exploits loyalty—thanks community for free labor, while project fails.</li></ul>
              </li>
            </ul>
          </li>
        </ul>

        <h3>The Excuse Factory: Adam Howell's Pattern of Deflection and Delay in SuperDoge</h3>
        <p>
          One of the most damning aspects of the SuperDoge scam wasn't the outright lies—though there were plenty—but the relentless stream of excuses that kept investors hooked long after red flags appeared. Adam Howell, the anonymous "Dev," mastered the art of blame-shifting, pivoting, and apologizing just enough to maintain the illusion of progress. This "excuse factory" became a hallmark of the project's AMAs, where Howell repeatedly deflected responsibility onto external factors like market conditions, audits, or his mysterious "other projects." Far from isolated slips, these excuses formed a pattern: Early hype gave way to delays, pivots justified failure, and absences were blamed on bigger priorities—all while community members were urged to "shill" harder. Below, we break down this tactic through key examples from the transcripts, showing how it discredits Howell as unreliable, opportunistic, and ultimately unaccountable.
        </p>

        <ol>
          <li>
            <strong>Pivots and Changes as Evidence of Poor Planning/Unprofessionalism:</strong> Howell frequently admitted to radical shifts in the project's direction, framing them as "improvements" rather than failures of foresight. This not only delayed deliverables but also wasted resources, eroding trust. For instance, in Episode 10, he casually announced: "On top of that, we have made a considerable pivot. So, originally, we were planning on releasing a trading card battle deck series... We still are planning on releasing that, but before we do that, we're going to be getting into the NFT space in a different way." Here, the original trading card idea—hyped as a core feature—is sidelined to chase the "hot" NFT trend, suggesting opportunism over a solid roadmap. Even more telling is Episode 17's overhaul: "We're going to radically change our approach with Superdoge... We're going to be changing our animation studio." This pivot from a 2D "kids' cartoon" to 3D adult comedy came after admitting they "didn't hit that adult comedy level," effectively scrapping months of work. Such flip-flops discredit Howell as a leader incapable of sticking to a plan, turning SuperDoge into a reactive hobby rather than a professional venture.
          </li>
          <li>
            <strong>Excuses and Distractions (Other Projects, Market Conditions):</strong> Perhaps the most egregious excuses revolved around Howell's vague "larger project" and "market conditions," which conveniently explained his growing absences and the project's stagnation. In Episode 20, he openly confessed: "I have been kind of out of the loop... working specifically on SuperDOGE, but instead on my larger project, which due to kind of market conditions required a recalibration." This not only prioritizes an unnamed side hustle over SuperDoge but uses "market conditions" as a blanket scapegoat for delays, ignoring how other projects weathered the same storms. It paints Howell as distracted and disengaged, diverting attention (and possibly funds) elsewhere while holders waited. This pattern peaks in Episode 19: "The markets have not been that exciting over the last couple of months," blaming external volatility for a "huge pump" that fizzled—conveniently overlooking internal shortcomings like undelivered content.
          </li>
          <li>
            <strong>Financial Hype and Contradictions:</strong> Howell hyped financial upsides while contradicting himself on profits and spending, raising questions about where investor money really went. In Episode 17, he bragged about a "20x in November... We went up to 20 million market cap," celebrating a short-lived spike as success, only to later pivot and blame "outsiders" for not finding the content "funny." This selective narrative discredits him as a hype merchant, inflating gains to retain holders during dumps. Contradictions abound in spending claims: Episode 5's "We're dumping piles of cash into... punching through the veil" (for listings) clashes with Episode 15's "I haven't made any money off of superdoge just spent money building it." If no profits were made, whose "piles of cash" funded vague marketing? Episode 10's "Hammering all kinds of money that I wish I didn't have to spend" admits reluctance, suggesting misused funds from token taxes or presales—further discrediting his "altruistic" image.
          </li>
          <li>
            <strong>Charity Hype Without Substance:</strong> Charity was Howell's go-to deflection, hyped as the project's heart but lacking follow-through, turning it into an excuse for underperformance. In Episode 21, he claimed: "Over $500,000 donated to charity. We've drilled wells in Africa... built additions to foster care home in Georgia." Yet, wallet analysis shows minimal verifiable transfers, with no receipts or impact reports ever provided—making this a hollow boast to buy time. Episode 18's charity vote ("We have concluded our charity vote today... clear winner, Move to Improve") served as a distraction, engaging the community in feel-good activities while core promises (NFTs, episodes) languished. This discredits Howell as exploiting altruism: Charity became an excuse to pivot attention from failures, not a genuine pillar.
          </li>
          <li>
            <strong>Apologies and Inactivity as Red Flags:</strong> Apologies were Howell's verbal crutch, appearing frequently to soften delays but never leading to real change—indicating chronic unreliability. Episode 19 opens with: "I apologize about last night... by the time I looked up it was two in the morning," excusing a missed AMA with casual lateness. Episode 20 doubles down: "I apologize that I haven't been checking in that often over the last couple of months," admitting "ghosting" while blaming a "build phase." These half-hearted "sorrys" discredit him as disorganized and indifferent, especially when paired with Episode 8's "It's late here guys, it's like 3 a.m."—rambling sessions at odd hours scream unprofessionalism, not dedication.
          </li>
          <li>
            <strong>Community Exploitation:</strong> Finally, Howell shifted blame to the community, urging unpaid "work" while excusing his own lapses, exploiting loyalty to mask inaction. Episode 3's "The community has a lot of work to do, we have to promote our project" burdens holders with "shilling," turning them into free marketers. Episode 15 echoes: "All of you guys that are putting in all this hard work and shilling and promoting," thanking them for labor while the project stalled. This discredits Howell as manipulative—demanding community effort amid his absences, fostering a "cult following" (Episode 14) to sustain the scam without personal accountability.
          </li>
        </ol>
        <p>
          In sum, Howell's "excuse factory" wasn't accidental; it was a deliberate strategy to prolong the grift. By constantly deflecting—through pivots, market blame, and apologies—he kept investors hopeful long enough to extract value. This pattern, evident across the transcripts, paints him not as a visionary builder, but as a serial excuse-maker whose "persistence" (Episode 21) was merely a facade for abandonment. Victims should see this as a smoking gun: A leader who apologizes more than delivers is one to distrust.
        </p>

        <h2>Conclusion: A Warning to Crypto Investors</h2>
        <p>
          SuperDoge wasn't a failed project—it was a calculated scam by Adam Howell, using charity as cover to siphon millions. Victims: Trace wallets, join class actions. Society: Demand transparency in crypto. Howell's history warns: Anonymity + hype = red flag. Let's expose these rugs to protect the next wave of investors.
        </p>

        <hr className="my-12" />

        <h2>Full AMA Transcripts</h2>
        <p className="text-sm text-muted-foreground mb-6">Below are the complete transcripts from all available SuperDoge AMA episodes, preserved as evidence.</p>

        <h2>Episode 1</h2>
        <p><strong>Adam Howell:</strong> So good. About 13 hours, something like that. Nice, super early man, awesome.</p>
        <p><strong>Community/Other:</strong> Yeah, just getting started. So just wait a moment and let a few other people join. We'll get started with the AMA. Awesome.</p>
        <p><strong>Adam Howell:</strong> All right, let's get started guys. So first of all, I just want to thank all of you for joining us on this epic adventure. We're about 13 hours in now and today has been quite successful. We're absolutely crushing it, 4.2 million market cap, trading volumes up. Liquidity is up to 893 BNB, which is close to 500,000 with 460,000 US dollars. So there's a lot of liquidity there for larger whales to come in and start buying and selling the token. We smashed through 1,000 holders quite quickly. We're going to have to make another graphic here pretty soon to accommodate 2,000 users. We're up to over $42,000 in donations to our charity. So for $14,000 each for each one of our participants. And I just want to say from the bottom of my heart, thank you everyone for helping to make that happen. I'm very grateful for that.</p>
        <p><strong>Adam Howell:</strong> So without further ado, I'd love to answer any questions anyone might have.</p>
        <p><strong>Community/Other:</strong> That's 700 BNB hard cap. I thought you were trolling us, bro. I woke up, I was like, oh my God, I fomo'd in. I was like.</p>
        <p><strong>Adam Howell:</strong> Yeah, no, you'll quickly come to realize if you take a look at our website, our infrastructure, everything that we've built to accommodate for explosive growth... the community has a lot of work to do, we have to promote our project and get it out to as many people as possible... just a quick question before you go man sure what like what how do we refer to you like because your name's obviously like super doge do you obviously you don't want to dox yourself but do you have like an alias we can refer um to us oh you can just call me dev I guess dev sorry yeah that's that's that's simple amazing thanks dev appreciate it man cheers thanks you guys.</p>

        <h2>Episode 2</h2>
        <p><strong>Adam Howell:</strong> Hello everyone and welcome to episode two of the Super Doge Ask Me Anything. So I'll just do a quick recap on where we're at, 7.29 million market cap right now, total supply 947 million, so we've had a burn of 50 million tokens already, which is great. 3,403 addresses, so that's how many holders we have right now, and we've donated $58,397 to each of our three charities. In the pipeline, we've just been speaking with Certik here today, and they're telling us they can have our contract audited by the third week of May, so they are quite backed up. But they are responsible for some of the largest audits in the industry, so it's a great place for our contract to be audited.</p>

        <h2>Episode 3</h2>
        <p><strong>Adam Howell:</strong> And I'm very blessed today to have Carrie from Child Enrichment with us today. So we're sitting at an 8.4 million market cap right now and we've been lucky enough to donate 72,000 to all of our charities. So thank you everyone from the community for your support.</p>
        <p><strong>Carrie (Guest):</strong> I'm the director of Child Enrichment and we are a non-profit in Augusta, Georgia. And what we do is we provide a voice and a path forward for children and families that have experienced abuse or neglect... you have no idea the impact this is going to be making on our organization.</p>

        <h2>Episode 4</h2>
        <p><strong>Adam Howell:</strong> Thanks everyone for joining us. We are sitting at $284,000 in donations. The city had a $4.9 million market cap right now. We've crossed over 4,000 holders. So we've listed with our first centralized exchange, Bilaxy, which is up and running... we're literally going to try to create a franchise here on the same level as DC or Marvel, but have it be kind of the first franchise for crypto related.</p>

        <h2>Episode 5</h2>
        <p><strong>Adam Howell:</strong> We are sitting at a 2.1 million market cap, 4,008 holders, and so far we've donated 508 BNB to charity, which is $171,000 at today's valuation. The markets have been a bit of a bloodbath in the last 48 hours... We're dumping piles of cash into punching through the veil. So bear with us, and I appreciate everyone's patience.</p>

        <h2>Episode 6</h2>
        <p><strong>Adam Howell:</strong> Market cap at the moment is 2.13 million. Our charity contributions are at 547.91 BNB, which is around $190,000 at today's market cap. It's been an interesting kind of month in the crypto industry... market manipulation perhaps is taking place right now, and it has had an effect on Super Doge as well as the entire industry and especially the meme coin industry.</p>

        <h2>Episode 7</h2>
        <p><strong>Adam Howell:</strong> Super Doge is at a $2,049,000 market cap at the moment. We've engaged CCP Digital, which is a crypto-focused marketing agency with an exclusive partnership with the Bad Crypto podcast. And they're going to be working side by side with us on a three-month engagement.</p>

        <h2>Episode 8</h2>
        <p><strong>Adam Howell:</strong> It's late here guys, it's like 3 a.m. so please forgive me. The charity vote has been completed, and the winner is Rocket Dog. Water is Life is also another great cause that we'll be supporting this round, and fathers.com as well... If we can get one of those clips to go viral, I really think that's going to be the catalyst that we need.</p>

        <h2>Episode 9</h2>
        <p><strong>Adam Howell:</strong> Current market cap of Super Doge is at 1.56 million. We've got a lot of interesting updates in the pipeline. I'm just going to share an image with the community now showing our 99% finalized design for our team of superheroes... they may very well be known as the Dog Squad.</p>

        <h2>Episode 10</h2>
        <p><strong>Adam Howell:</strong> We have the wireframe of the new website design completed. On top of that, we have made a considerable pivot. So, originally, we were planning on releasing a trading card battle deck series... We still are planning on releasing that, but before we do that, we're going to be getting into the NFT space in a different way. The NFT space is really hot right now, and we're going to be releasing essentially a Bored Apes collection featuring Super Doge.</p>

        <h2>Episode 12</h2>
        <p><strong>Adam Howell:</strong> We're on the verge of making our move here. And if we can get one viral clip from the animated TV series to make its way through the crypto community, we become superstars overnight. Supertoads is at around a 1.2 million market cap.</p>

        <h2>Episode 13</h2>
        <p><strong>Adam Howell:</strong> We have confirmed dates for our NFT and first episode launch, and that will be November 25th of next month. We will also be airdropping the Super Doge rookie card on November 20th... the reward system is designed to enrich long-term holders and supporters.</p>

        <h2>Episode 14</h2>
        <p><strong>Adam Howell:</strong> New York was amazing. We got to promote like crazy. I even got to get a little video of Gary Vee... Our whole goal is to keep building up the community until we hit critical mass... I think that we have the capability to truly build a cult following within the crypto industry.</p>

        <h2>Episode 15</h2>
        <p><strong>Adam Howell:</strong> One of our main marketing strategies moving forward is to form partnerships and collaborations with other projects and to bring them on board where we can actually create them as a character in the show... including myself, I haven't made any money off of superdoge just spent money building it.</p>

        <h2>Episode 16</h2>
        <p><strong>Adam Howell:</strong> Hello everyone and welcome. Superdoge sitting at around a four million dollar market cap at the moment. We've brought on Keith Shingleton as our COO to handle operations kind of on a day-to-day basis so I can focus on building... We've streamlined our animation production to our objective for January is to be able to produce a piece of content every week.</p>

        <h2>Episode 17</h2>
        <p><strong>Adam Howell:</strong> We've got some big changes upcoming with the Superdoge show. We listened to the feedback from the community and we feel that we didn't hit that adult comedy level that we had originally set out to do. We kind of wound up creating a little bit of a kid's cartoon show to some extent. So we're going to radically change our approach with Superdoge... We did do, what, a 20x in November. We were at a million market cap. We went up to 20 million market cap. We released the episode, the first episode. And as you can see, the first episode didn't go so well.</p>

        <h2>Episode 18</h2>
        <p><strong>Adam Howell:</strong> Currently sitting at around a $2.2 million market cap, and we have concluded our charity vote today... we do have a clear winner, Move to Improve. So congratulations to you guys.</p>

        <h2>Episode 19</h2>
        <p><strong>Adam Howell:</strong> Welcome everyone to tonight's AMA. I apologize about last night, I got caught up in a PowerPoint presentation and by the time I looked up it was two in the morning... the markets have not been that exciting over the last couple of months. We saw a huge pump kind of happen in November... we are working on getting essentially a pilot out... Our objective is to create a South Park style trailer.</p>

        <h2>Episode 20</h2>
        <p><strong>Adam Howell:</strong> Welcome to a very long overdue AMA. I have been kind of out of the loop here for a little bit. I haven't been that active working specifically on SuperDOGE, but instead on my larger project, which due to kind of market conditions required a recalibration of, well, essentially everything... I apologize that I haven't been checking in that often over the last couple of months. I knew we were kind of stuck in a build phase.</p>

        <h2>Episode 21</h2>
        <p><strong>Adam Howell:</strong> Welcome everyone. It's been a while since we did an AMA. Our objective is to use that time and kind of that mentality to push content out and try to get SuperDoge into the crypto community as a comedy and news source... Over $500,000 donated to charity. We've drilled wells in Africa. We've provided life straws to third world countries. We've built additions to foster care home in Georgia. These are great accomplishments... We're very persistent and there's grit on this team. We're not throwing in the towel on anything. We're ready to push this to the next level.</p>

        <RelatedArticles currentSlug="/superdoge-rug-pull" />
      </ArticlePage>
    </Layout>
  );
};

export default SuperDogeRugPull;
