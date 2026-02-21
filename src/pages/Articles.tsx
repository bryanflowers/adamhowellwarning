import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "/unmasking-adam-howell",
    title: "Unmasking Adam Howell: The Serial Scammer, Extortionist, and Crypto Fraudster",
    excerpt: "A comprehensive exposé compiling documented evidence from court records, victim accounts, and public exposes to highlight patterns of deception and failure.",
    tag: "Featured Investigation",
    readTime: "15 min read",
  },
  {
    slug: "/superdoge-rug-pull",
    title: "Exposing the SuperDoge Rug Pull: Adam Howell's Charity-Fueled Crypto Scam",
    excerpt: "Dissecting how SuperDoge operated, the red flags ignored, the unprofessional tactics employed, and the potential legal violations that scream fraud.",
    tag: "Deep Dive",
    readTime: "45 min read",
  },
  {
    slug: "/investigative-report",
    title: "Uncovering the Trail of Adam Howell's Ventures in Crypto and Beyond",
    excerpt: "Mapping out Adam Howell's history through public records, forum archives, crypto news sites, social media, and whistleblower accounts.",
    tag: "Investigative Report",
    readTime: "20 min read",
  },
  {
    slug: "/superdoge-scam-update",
    title: "Exposing the SuperDoge Scam – Anonymous Pitch, Vanished Promises, and Inner Circle Ties",
    excerpt: "A revealing 2021 podcast appearance that showcases Howell's tactics — hiding behind anonymity, dragging credible figures, and warning about scams to position himself as trustworthy.",
    tag: "Update",
    readTime: "15 min read",
  },
  {
    slug: "/keith-shingleton-david-edwards",
    title: "Deep Dive on Keith Shingleton, David Edwards and Connections to Adam Howell",
    excerpt: "Examining the inner circle and mechanisms behind the alleged scams — from co-authored whitepapers to unverified LinkedIn achievements.",
    tag: "Associates",
    readTime: "18 min read",
  },
  {
    slug: "/the-architect-of-deception-and-adam-howells-web-of-accomplices",
    title: "The Architect of Deception and Adam Howell's Web of Accomplices",
    excerpt: "Key enablers like Andrew Drummond and Kanokrat form the backbone of extortion tactics, turning personal grudges into profitable smear operations.",
    tag: "Network Analysis",
    readTime: "12 min read",
  },
  {
    slug: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned",
    title: "Exposing the SuperDoge Rug Pull: Adam Howell's Latest Crypto Scheme and the Millions Potentially Siphoned",
    excerpt: "A comprehensive investigative report into the SuperDoge token, its team, blockchain evidence, and estimated losses.",
    tag: "Investigative Report",
    readTime: "35 min read",
  },
  {
    slug: "/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties",
    title: "Investigative Update: Exposing the SuperDoge Scam – Adam Howell's Anonymous Pitch, Vanished Promises, and Inner Circle Ties",
    excerpt: "A revealing 2021 podcast appearance showcases Howell's tactics — hiding behind anonymity, dragging credible figures, and warning about scams to position himself as trustworthy.",
    tag: "Investigative Update",
    readTime: "15 min read",
  },
];

const Articles = () => {
  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            All Investigative Articles
          </h1>
          <p className="text-muted-foreground mb-10 text-lg">In-depth reports documenting the evidence trail against Adam Howell.</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={article.slug}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-0.5"
              >
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
                  {article.tag}
                </span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  <span className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
