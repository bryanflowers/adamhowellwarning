import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { t, articlesMeta } from "@/i18n/translations";
import SEOHead from "@/components/SEOHead";
import { getArticleProgress } from "@/hooks/useReadingProgress";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const Articles = () => {
  const { lang, localPath } = useLanguage();
  const tr = t[lang];
  const articles = articlesMeta[lang];
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const { data } = await supabase
        .from("comments")
        .select("article_slug")
        .eq("status", "approved");
      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((c) => {
          counts[c.article_slug] = (counts[c.article_slug] || 0) + 1;
        });
        setCommentCounts(counts);
      }
    };
    fetchCounts();
  }, []);

  return (
    <Layout>
      <SEOHead
        title={tr.articlesTitle}
        description={tr.articlesSubtitle}
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            {tr.articlesTitle}
          </h1>
          <p className="text-muted-foreground mb-10 text-lg">{tr.articlesSubtitle}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const progress = getArticleProgress(article.slug);
              const isRead = progress >= 90;
              const commentCount = Object.entries(commentCounts).reduce((sum, [slug, count]) => {
                // Match slug variants (with/without leading slash, with /th prefix)
                if (slug.endsWith(article.slug.replace(/^\//, ""))) return sum + count;
                return sum;
              }, 0);

              return (
                <Link
                  key={article.slug}
                  to={localPath(article.slug)}
                  className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-0.5 relative"
                >
                  {isRead && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        {lang === "th" ? "อ่านแล้ว" : "Read"}
                      </Badge>
                    </div>
                  )}
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
                    {article.tag}
                  </span>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      {commentCount > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          {commentCount}
                        </span>
                      )}
                    </div>
                    <span className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {tr.readMore} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  {/* Reading progress bar */}
                  {progress > 0 && progress < 90 && (
                    <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/60 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
