import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface GlossaryTerm {
  term: string;
  definition: string;
  relatedBlog?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const glossaryTerms: GlossaryTerm[] = [
  { term: "Rug Pull", definition: "A scam where crypto developers create a token, attract investment, then suddenly withdraw all liquidity — leaving investors with worthless tokens.", relatedBlog: "how-to-identify-crypto-rug-pulls" },
  { term: "Pump and Dump", definition: "A market manipulation scheme where insiders inflate a token's price through coordinated buying and hype, then sell at the peak, crashing the price.", relatedBlog: "pump-and-dump-schemes-cryptocurrency" },
  { term: "Ponzi Scheme", definition: "An investment fraud paying existing investors with new investor funds rather than legitimate profits. Inevitably collapses when new investment slows.", relatedBlog: "crypto-ponzi-schemes-explained" },
  { term: "Exit Scam", definition: "When a project's team disappears with investor funds after a period of apparent legitimacy, often after raising substantial capital." },
  { term: "Honeypot Contract", definition: "A smart contract designed to trap funds — users can buy tokens but the contract prevents them from selling." },
  { term: "Wash Trading", definition: "Creating artificial trading volume by buying and selling the same asset to yourself, simulating demand." },
  { term: "Doxxing", definition: "Publicly revealing someone's private information as a form of intimidation or harassment." },
  { term: "DMCA Abuse", definition: "Misusing Digital Millennium Copyright Act takedown requests to suppress legitimate criticism or investigative journalism." },
  { term: "Liquidity Lock", definition: "A mechanism that prevents token creators from withdrawing liquidity pool funds for a set period, protecting investors from rug pulls." },
  { term: "KYC (Know Your Customer)", definition: "Identity verification processes that legitimate projects use to ensure accountability and comply with regulations.", relatedBlog: "aml-kyc-crypto-explained" },
  { term: "Smart Contract Audit", definition: "A security review of a smart contract's code by independent experts to identify vulnerabilities, backdoors, or malicious functions." },
  { term: "Seed Phrase", definition: "A series of 12-24 words that serves as the master key to a crypto wallet. Never share your seed phrase — anyone with it controls your funds.", relatedBlog: "seed-phrase-scams-protection" },
  { term: "Phishing", definition: "Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity, often via fake websites or emails.", relatedBlog: "crypto-phishing-attacks-guide" },
  { term: "Social Engineering", definition: "Psychological manipulation tactics used to trick people into revealing confidential information or making security mistakes.", relatedBlog: "social-engineering-crypto-scams" },
  { term: "Address Poisoning", definition: "An attack where scammers send tiny transactions from addresses similar to ones you've used, hoping you'll accidentally copy the wrong address.", relatedBlog: "address-poisoning-attacks" },
  { term: "Whale", definition: "An individual or entity holding a large amount of cryptocurrency, capable of significantly moving market prices through their trades." },
  { term: "DEX (Decentralized Exchange)", definition: "A cryptocurrency exchange that operates without a central authority, allowing direct peer-to-peer trading through smart contracts." },
  { term: "CEX (Centralized Exchange)", definition: "A cryptocurrency exchange operated by a centralized company (e.g., Binance, Coinbase) that holds custody of user funds." },
  { term: "Airdrop Scam", definition: "Fake token distributions designed to trick users into connecting wallets to malicious contracts or paying 'gas fees' to claim worthless tokens.", relatedBlog: "fake-airdrop-scams" },
  { term: "Rebill Scheme", definition: "A recurring billing fraud where victims are charged repeatedly without clear consent, often hidden in complex subscription terms." },
];

const faqItems: FAQ[] = [
  { question: "What is a cryptocurrency rug pull?", answer: "A rug pull is when crypto developers create a token, hype it up, and then suddenly withdraw all the money (liquidity), leaving investors with worthless tokens. It's one of the most common scams in DeFi." },
  { question: "How can I verify if a crypto team is legitimate?", answer: "Check LinkedIn profiles, GitHub activity, and public records. Verify their claims through independent sources. Be cautious of teams using pseudonyms with no verifiable track record." },
  { question: "What should I do if I've been scammed?", answer: "Document everything: screenshots, wallet addresses, transaction hashes, communications. Report to local authorities and relevant financial regulators. Consider reaching out through our confidential contact form." },
  { question: "How do I check if liquidity is locked?", answer: "Use tools like Unicrypt, Team Finance, or check the liquidity pool contract on blockchain explorers. Locked liquidity should be verifiable on-chain, not just claimed by the team." },
  { question: "Are all anonymous crypto teams scams?", answer: "Not necessarily. Some legitimate projects have anonymous teams (like Bitcoin's Satoshi Nakamoto). However, anonymity combined with other red flags (unaudited code, unlocked liquidity, hype marketing) significantly increases risk." },
  { question: "What is the SuperDoge scam?", answer: "SuperDoge was a token that raised approximately $13M with promises of charitable donations and NFT integration. The project went silent, charity wallet transactions didn't match announcements, and investors lost their funds. Read our full exposé for details." },
  { question: "How can I report new evidence about Adam Howell?", answer: "Use our anonymous tip form or confidential contact form. All submissions are reviewed and your identity is protected. Evidence can include wallet addresses, transaction records, communications, or witness accounts." },
  { question: "Can stolen crypto be recovered?", answer: "Recovery is difficult but not impossible. Law enforcement agencies like the FBI and Europol have recovered funds in some cases. Blockchain analysis firms can trace stolen crypto. The sooner you report, the better the chances." },
];

const Glossary = () => {
  const { lang, localPath } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredTerms = useMemo(() => {
    if (!search.trim()) return glossaryTerms;
    const q = search.toLowerCase();
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [search]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Layout>
      <SEOHead
        title="Crypto Scam Glossary & FAQ – Essential Terms Explained"
        description="Searchable glossary of cryptocurrency scam terms and frequently asked questions. Learn about rug pulls, pump-and-dumps, phishing, and how to protect yourself."
        jsonLd={faqJsonLd}
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === "th" ? "อภิธานศัพท์และคำถามที่พบบ่อย" : "Glossary & FAQ"}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {lang === "th"
                ? "คำศัพท์สำคัญเกี่ยวกับการหลอกลวงคริปโตและคำถามที่พบบ่อย"
                : "Essential cryptocurrency scam terminology and frequently asked questions to help you stay safe."}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "th" ? "ค้นหาคำศัพท์..." : "Search terms..."}
              maxLength={100}
              className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Glossary */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === "th" ? "อภิธานศัพท์" : "Glossary"}
            </h2>
            <div className="space-y-3">
              {filteredTerms.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {lang === "th" ? "ไม่พบคำศัพท์" : "No terms found matching your search."}
                </p>
              ) : (
                filteredTerms.map((item) => (
                  <div key={item.term} className="bg-card border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground text-sm">{item.term}</h3>
                      {item.relatedBlog && (
                        <Link
                          to={localPath(`/blog/${item.relatedBlog}`)}
                          className="text-xs text-primary hover:underline shrink-0"
                        >
                          {lang === "th" ? "อ่านเพิ่มเติม" : "Learn more →"}
                        </Link>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.definition}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === "th" ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <details key={idx} className="bg-card border rounded-lg group">
                  <summary className="p-4 cursor-pointer font-medium text-foreground text-sm hover:text-primary transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Glossary;
