import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t, articlesMeta } from "@/i18n/translations";

const Articles = () => {
  const { lang, localPath } = useLanguage();
  const tr = t[lang];
  const articles = articlesMeta[lang];

  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            {tr.articlesTitle}
          </h1>
          <p className="text-muted-foreground mb-10 text-lg">{tr.articlesSubtitle}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={localPath(article.slug)}
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
                    {tr.readMore} <ArrowRight className="w-4 h-4" />
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
