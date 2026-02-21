import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { AlertTriangle, FileText, ArrowRight, Shield, Eye } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";

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
    slug: "/architect-of-deception",
    title: "The Architect of Deception and Adam Howell's Web of Accomplices",
    excerpt: "Key enablers like Andrew Drummond and Kanokrat form the backbone of extortion tactics, turning personal grudges into profitable smear operations.",
    tag: "Network Analysis",
    readTime: "12 min read",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-foreground text-background py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 50px, hsl(var(--primary) / 0.1) 50px, hsl(var(--primary) / 0.1) 51px)",
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Public Warning</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Adam Howell Warning
            </h1>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mb-8">
              Documenting the trail of alleged crypto scams, rug pulls, extortion, and fraud perpetrated by Canadian national Adam Howell — from DopeCoin to SuperDoge and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Investor Protection</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Evidence-Based Research</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Court Records & Public Sources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Investigative Reports
          </h2>
          <p className="text-muted-foreground mb-10">In-depth articles documenting the evidence trail.</p>

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

      {/* Blog Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Crypto Scam Warning Blog
              </h2>
              <p className="text-muted-foreground">Educational articles on identifying and avoiding cryptocurrency fraud.</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogArticles.slice(0, 6).map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-0.5"
              >
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
                  {article.tags[0]}
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
          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="text-primary font-medium hover:underline">View all blog articles →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-t py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Have Information to Share?
          </h2>
          <p className="text-muted-foreground">
            If you've been a victim of Adam Howell's schemes or have evidence to contribute, reach out through secure channels. Protecting future investors starts with transparency.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
