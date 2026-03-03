import Layout from "@/components/Layout";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";
import SEOHead from "@/components/SEOHead";
import adamHowellSuitPortrait from "@/assets/adam-howell-suit-portrait.png";
import adamHowellRebillConfession from "@/assets/adam-howell-rebill-confession.jpeg";

const InvestigativeReportUncovering = () => {
  return (
    <Layout>
      <SEOHead
        title="Investigative Report: Adam Howell's Crypto Ventures Trail"
        description="Mapping out Adam Howell's history through public records, forum archives, crypto news sites, social media, and whistleblower accounts."
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org", "@type": "Article",
          "headline": "Investigative Report: Uncovering Adam Howell's Ventures",
          "datePublished": "2026-01-28",
          "dateModified": "2026-02-01",
          "author": { "@type": "Organization", "name": "Adam Howell Warning" },
          "mainEntityOfPage": "https://adamhowellwarning.com/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond",
        }}
      />
      <ArticlePage
        title="Investigative Report: Adam Howell's Crypto Ventures Trail"
        titleTh="รายงานสืบสวน: ตามรอยกิจการคริปโตของ Adam Howell"
        subtitle="Mapping out Adam Howell's history through public records, forum archives, crypto news sites, social media, and whistleblower accounts."
        subtitleTh="แผนที่กิจกรรมของ Adam Howell ผ่านบันทึกสาธารณะ ฟอรัม เว็บข่าวคริปโต โซเชียลมีเดีย และคำให้การของผู้แจ้งเบาะแส"
        date="January 28, 2026"
        dateTh="28 มกราคม 2569"
        readTime="20 min read"
        readTimeTh="อ่าน 20 นาที"
        translatable
      >
        <p>
          As an investigative reporter with a focus on financial fraud and emerging tech scams, I've spent the past several days diving deep into public records, forum archives, crypto news sites, social media, and whistleblower accounts to map out Adam Howell's history. Howell, a Canadian entrepreneur now reportedly based in Thailand, has positioned himself as a "serial entrepreneur" and early crypto innovator. However, a pattern emerges: unfinished projects, overhyped fundraising, abandoned communities, and allegations of outright scams. He boasts of founding the 103rd crypto listed on CoinMarketCap (DopeCoin in 2014), but his track record is riddled with failures and red flags.
        </p>

        <p>
          I've cross-referenced sources from BitcoinTalk.org (the original hub for crypto discussions), major crypto outlets like CryptoSlate and CoinBureau, LinkedIn profiles, Medium posts authored by Howell himself, and recent warning sites dedicated to exposing him. Allegations of scams often stem from investor complaints, blockchain analysis (e.g., rug pulls), and legal disputes. Notably, sites like adamhowellwarning.com and andrew-drummond.news detail extortion attempts, false accusations, and fraud, with some tied to his life in Thailand. Partners like "Keith Shingleton" (likely Keith from the Smoke Exchange team) appear in multiple ventures, often amid scam accusations.
        </p>

        <p>
          Howell has never been convicted of major crimes based on available public records, (however he has been convicted in Thailand and possibly Canada, but we cannot get records without his permission) he's ran from a civil dispute in Thailand and community backlash paint a picture of opportunism. He NEVER finishes projects, frequently pivots (e.g., rebranding DopeCoin to DopeCoinGold), (a failed fork to raise more millions for his prostitute/alcohol fueled lifestyle) and solicits millions in funding for ideas that fizzle out. Living in Thailand (as confirmed by multiple sources and his Facebook), he operates remotely, which complicates accountability. Below is a comprehensive list of companies and projects linked to him, followed by deeper analysis on scams, partners, funding, and his "bigger project" hints.
        </p>

        <figure className="my-8">
          <img
            src={adamHowellSuitPortrait}
            alt="Adam Howell in a suit — bases himself in Asia to stay out of reach of USA law enforcement"
            className="rounded-lg border shadow-md max-w-xs mx-auto"
          />
          <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
            Adam Howell bases himself in Asia to stay out of reach of USA law enforcement. He has ran off from 3 charges in Thailand, after a suspended jail sentence in his latest conviction in Thai courts. Now he is on the run in Dubai.
          </figcaption>
        </figure>

        <h2>List of Companies and Projects Associated with Adam Howell</h2>
        <p>
          Based on LinkedIn, Medium, BitcoinTalk threads, and crypto databases, here's every venture I could verify he's been involved in or founded. I've noted status, key details, and red flags where substantiated.
        </p>

        <p>
          Adam Howell borrowed 20,000 USD from one of his business partners in bars in Thailand, to pay Kevin Harrington (American businessman) to endorse his CryptoBilling company, but when Kevin found out he was a scammer, he walked away. Adam never paid back his business partner the 20,000 USD. Despite making millions of USD in 2021 on his SuperDoge fraud. (He made 2M USD pumping DopeCoin in 2017/18.) He never paid his landlord, to whom he now owes over 150,000 USD (3-5M Thai baht). Adam Howell has run off to Dubai because of all the charges against him in Thailand and we suspect he is wanted in Canada.
        </p>

        <ol>
          <li>
            <strong>DopeCoin (DOPE) – Founded February 2014</strong>
            <p>A marijuana-themed cryptocurrency aimed at cannabis payments. Launched as a fork of BlackCoin; rebranded to DopeCoinGold in 2017. Still listed on exchanges but low activity; market cap under $1M as of recent checks. Community accused Howell of poor management and pivots without delivery. In a 2019 Observer interview, he admitted low adoption despite shops accepting it. A 2020 Leafly piece quoted him saying "no one uses it." BitcoinTalk threads show frustration over undelivered updates.</p>
          </li>
          <li>
            <strong>Unacell – CEO/Founder, November 2014</strong>
            <p>Little public info; LinkedIn lists it as a startup, possibly tech or e-commerce related. Defunct or inactive; no recent mentions. No evidence of success or completion; fits pattern of short-lived ventures.</p>
          </li>
          <li>
            <strong>Smoke Exchange (SMX ICO) – CEO & Founder, September 2017</strong>
            <p>A marijuana advertising platform using blockchain; ICO raised funds for a token burn and exchange. Failed; BitcoinTalk ANN thread shows hype but no sustained development. Linked to "Keith" (team member, possibly a partner in scams); investors complained of undelivered promises. Medium promo articles vanished.</p>
          </li>
          <li>
            <strong>CryptoBillings – Founder, December 2017</strong>
            <p>A free crypto payment gateway for merchants, tied to DopeCoin and Smoke Exchange. Failed; website (cryptobillings.com) is down or redirected. Howell pitched it as revolutionary but it was essentially a basic site. Warning sites claim it was overhyped to raise funds without delivery. BitcoinTalk mentions it as a "bridge" that never materialized.</p>
          </li>
          <li>
            <strong>Grow Advertising – Founder, January 2018</strong>
            <p>Advertising platform for cannabis industry; tied to DopeCoin rebrand. Inactive; LinkedIn shows Sylvan Lake, Alberta address, but no updates since 2019. Promised 25% bonuses for DopeCoin users but faded; Reddit threads in r/DopeCoin show abandonment.</p>
          </li>
          <li>
            <strong>Alpha Male Blueprint – CEO/Founder</strong>
            <p>Online startup for men's self-improvement; ties to pickup artist (PUA) industry via branding and Howell's "high school dropout turned entrepreneur" narrative. No evidence of scale; fits his pattern of niche online ventures.</p>
          </li>
          <li>
            <strong>SuperDoge – Involved/Founder, circa 2024-2025</strong>
            <p>Meme coin or crypto project; details sparse but labeled a "rug pull." Failed scam. Warning sites call it a blatant exit scam, leaving investors in ruin. Tied to rebill scams and extortion.</p>
          </li>
          <li>
            <strong>Unnamed Crypto Browser – Attempted launch</strong>
            <p>A browser with crypto features; allegedly used others' names without permission. Failed; no launch. Warning sites describe it as a flop where Howell name-dropped influencers to hype it. No evidence found of any working product.</p>
          </li>
          <li>
            <strong>KushCoin (KUSH) – Possible involvement, 2017</strong>
            <p>Hybrid PoW/PoS cannabis crypto. Inactive. BitcoinTalk thanks Howell for "believing in the project," suggesting advisory role. Community called it abandoned.</p>
          </li>
        </ol>

        <p>
          Other mentions: Early rebill scams (pre-2014, charging users via SMS without consent). Howell has hinted at a "bigger project" in Medium posts and interviews, but nothing materialized—likely a tease for funding.
        </p>

        <figure className="my-8">
          <img
            src={adamHowellRebillConfession}
            alt="Adam Howell's message confessing to rebill scams"
            className="rounded-lg border shadow-md max-w-md mx-auto"
          />
          <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
            Adam is ashamed of his rebill scams, but not his DopeCoin, which left lots of bag holders.
          </figcaption>
        </figure>

        <h2>Deeper Dive: Scams, Partners, and Funding</h2>

        <p>
          Howell's ventures often start with hype (e.g., ICOs, cannabis tie-ins) but end in abandonment. SuperDoge is the clearest rug pull: He allegedly pulled liquidity after raising funds, per whistleblower sites. Rebill scams involved fake charges; one site claims he cheated thousands. In Thailand, he's linked to filing false accusations for extortion. BitcoinTalk users flagged him as a "career scammer." X searches show general crypto scam warnings but no recent direct posts about him—perhaps due to his low profile.
        </p>

        <p>
          "Keith Shingleton" appears in Smoke Exchange as a lawyer/team member. Searches for "Adam Howell Keith partner scams" yield scam lists and forums linking them to joint ventures. One BitcoinTalk post calls Howell a "con artist" in context of extorting partners like Robin Dey, but Keith is implied in team docs. Whistleblowers suggest Keith aids in legal cover for scams. No direct evidence of Keith's full name (possibly Keith Shingleton from unrelated scam mentions), but he's often behind the scenes.
        </p>

        <p>
          For CryptoBillings, Howell pitched multimillions (e.g., $2-5M estimates from warnings), but it was for a "basic website" that could cost under $20K to build. Smoke Exchange ICO sought VC funds via pitch decks. Overall, he asks for "millions of USD" without delivery. No blockchain proof of large raises beyond ICO hype; communities report losses in the hundreds of thousands collectively.
        </p>

        <p>
          A 2024 Startup Savant interview mentions his entrepreneurial journey but no charity app. Searches for "Adam Howell interview charity app" yield unrelated hits. No evidence of such an app; if it exists, it's likely vaporware. Proof of donations? Zero—blockchain scans and reports show no charitable transfers from his projects. This fits the scam pattern: Promise social good to lure investors, deliver nothing.
        </p>

        <p>
          SuperDoge appears to be his most recent (2024-2025), labeled a rug pull on scam trackers. Hints of a "bigger project" in 2019 Medium posts (e.g., "avalanche of development") went nowhere. In Thailand, he's tied to ongoing fraud via false claims. Crypto legal lists flag similar companies. No active X profile found for him (@dopecoin is old); semantic searches show scam echoes but no new launches.
        </p>

        <h2>Exposing the Scams: Evidence and Next Steps</h2>
        <p>
          He's never finished a project fully, always pivoting amid complaints. This isn't just bad business—it's a predatory cycle. Stay vigilant; the crypto space is full of Howells.
        </p>

        <RelatedArticles currentSlug="/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond" />
      </ArticlePage>
    </Layout>
  );
};

export default InvestigativeReportUncovering;
