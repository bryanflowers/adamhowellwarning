import Layout from "@/components/Layout";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";

const InvestigativeReport = () => {
  return (
    <Layout>
      <ArticlePage
        title="Investigative Report: Uncovering the Trail of Adam Howell's Ventures in Crypto and Beyond"
        subtitle="Mapping out Adam Howell's history through public records, forum archives, crypto news sites, social media, and whistleblower accounts."
        readTime="20 min read"
      >
        <p>
          As an investigative reporter with a focus on financial fraud and emerging tech scams, I've spent the past several days diving deep into public records, forum archives, crypto news sites, social media, and whistleblower accounts to map out Adam Howell's history. Howell, a Canadian entrepreneur now reportedly based in Thailand, has positioned himself as a "serial entrepreneur" and early crypto innovator. However, a pattern emerges: unfinished projects, overhyped fundraising, abandoned communities, and allegations of outright scams. He boasts of founding the 103rd crypto listed on CoinMarketCap (DopeCoin in 2014), but his track record is riddled with failures and red flags.
        </p>

        <h2>List of Companies and Projects Associated with Adam Howell</h2>
        <p>
          Based on LinkedIn, Medium, BitcoinTalk threads, and crypto databases, here's every venture verified he's been involved in or founded.
        </p>
        <p>
          Adam Howell borrowed 20,000 USD from one of his business partners in bars in Thailand, to pay Kevin Harrington (American businessman) to endorse his CryptoBilling company, but when Kevin found out he was a scammer, he walked away. Adam never paid back his business partner the 20,000 USD. Despite making millions of USD in 2021 on his SuperDoge fraud, he never paid his landlord, to whom he now owes over 150,000 USD (3-5m Thai baht). Adam Howell has run off to Dubai because of all the charges against him in Thailand.
        </p>

        <ol>
          <li>
            <strong>DopeCoin (DOPE) – Founded February 2014</strong>
            <p>A marijuana-themed cryptocurrency aimed at cannabis payments. Launched as a fork of BlackCoin; rebranded to DopeCoinGold in 2017. Still listed on exchanges but low activity; market cap under $1M. Community accused Howell of poor management and pivots without delivery.</p>
          </li>
          <li>
            <strong>Unacell – CEO/Founder, November 2014</strong>
            <p>Little public info; LinkedIn lists it as a startup, possibly tech or e-commerce related. Defunct or inactive; no recent mentions. No evidence of success or completion.</p>
          </li>
          <li>
            <strong>Smoke Exchange (SMX ICO) – CEO & Founder, September 2017</strong>
            <p>A marijuana advertising platform using blockchain; ICO raised funds for a token burn and exchange. Failed; BitcoinTalk ANN thread shows hype but no sustained development. Investors complained of undelivered promises.</p>
          </li>
          <li>
            <strong>CryptoBillings – Founder, December 2017</strong>
            <p>A free crypto payment gateway for merchants, tied to DopeCoin and Smoke Exchange. Failed; website (cryptobillings.com) is down. Warning sites claim it was overhyped to raise funds without delivery. Essentially a basic site pitched for millions.</p>
          </li>
          <li>
            <strong>Grow Advertising – Founder, January 2018</strong>
            <p>Advertising platform for cannabis industry; tied to DopeCoin rebrand. Inactive; LinkedIn shows Sylvan Lake, Alberta address, but no updates since 2019. Promised 25% bonuses for DopeCoin users but faded; Reddit threads show abandonment.</p>
          </li>
          <li>
            <strong>Alpha Male Blueprint – CEO/Founder</strong>
            <p>Online startup for men's self-improvement; ties to pickup artist (PUA) industry via branding. No evidence of scale; fits pattern of niche online ventures.</p>
          </li>
          <li>
            <strong>SuperDoge – Involved/Founder, circa 2021</strong>
            <p>Meme coin labeled a "rug pull." Failed scam. Warning sites call it a blatant exit scam, leaving investors in ruin. Tied to rebill scams and extortion.</p>
          </li>
          <li>
            <strong>Unnamed Crypto Browser</strong>
            <p>A browser with crypto features; allegedly used others' names without permission. Failed; no launch. Warning sites describe it as a flop where Howell name-dropped influencers to hype it.</p>
          </li>
          <li>
            <strong>KushCoin (KUSH) – Possible involvement, 2017</strong>
            <p>Hybrid PoW/PoS cannabis crypto. Inactive. BitcoinTalk thanks Howell for "believing in the project," suggesting advisory role. Community called it abandoned.</p>
          </li>
        </ol>

        <p>Other mentions: Early rebill scams (pre-2014, charging users via SMS without consent). Howell has hinted at a "bigger project" in Medium posts and interviews, but nothing materialized—likely a tease for funding.</p>

        <h2>Deeper Dive: Scams, Partners, and Funding</h2>
        <ul>
          <li>Howell's ventures often start with hype (e.g., ICOs, cannabis tie-ins) but end in abandonment. SuperDoge is the clearest rug pull: He allegedly pulled liquidity after raising funds. Rebill scams involved fake charges; one site claims he cheated thousands. In Thailand, he's linked to false accusations for extortion. BitcoinTalk users flagged him as a "career scammer."</li>
          <li>"Keith Shingleton" appears in Smoke Exchange as a lawyer/team member. Searches yield scam lists and forums linking them to joint ventures. Whistleblowers suggest Keith aids in legal cover for scams.</li>
          <li>For CryptoBillings, Howell pitched multimillions (e.g., $2-5M estimates), but it was for a "basic website" that could cost under $20K to build. Smoke Exchange ICO sought VC funds via pitch decks. Overall, he asks for "millions of USD" without delivery.</li>
          <li>No evidence of charity app or donations. Zero—blockchain scans and reports show no charitable transfers from his projects. This fits the scam pattern: Promise social good to lure investors, deliver nothing.</li>
        </ul>

        <h2>Exposing the Scams: Evidence and Next Steps</h2>
        <p>
          He's never finished a project fully, always pivoting amid complaints. This isn't just bad business—it's a predatory cycle. Stay vigilant; the crypto space is full of Howells.
        </p>

        <RelatedArticles currentSlug="/investigative-report" />
      </ArticlePage>
    </Layout>
  );
};

export default InvestigativeReport;
