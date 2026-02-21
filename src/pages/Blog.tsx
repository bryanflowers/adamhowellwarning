import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  return (
    <Layout>
      <section className="relative bg-foreground text-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Investor Education</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Crypto Scam Warning Blog
            </h1>
            <p className="text-lg opacity-80 leading-relaxed max-w-2xl">
              Educational articles on identifying and avoiding cryptocurrency scams — from rug pulls and pump-and-dumps to phishing attacks and fake exchanges.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag) => (
                    <span key={tag} className="inline-block text-xs font-bold tracking-widest uppercase text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {article.title}
                </h2>
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

export default Blog;
