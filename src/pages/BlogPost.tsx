import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";
import { getArticleBySlug } from "@/data/blogArticles";
import { useLanguage } from "@/hooks/useLanguage";
import SEOHead from "@/components/SEOHead";
import { getHeroImageForSlug } from "@/utils/blogHeroImages";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { localPath } = useLanguage();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to={localPath("/blog")} replace />;
  }

  const heroImg = slug ? getHeroImageForSlug(slug) : undefined;

  return (
    <Layout>
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        ogImage={heroImg}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.metaDescription,
          "datePublished": article.date,
          "dateModified": article.date,
          "author": { "@type": "Organization", "name": "Adam Howell Warning" },
          "mainEntityOfPage": `https://web-rescu.lovable.app/blog/${article.slug}`,
        }}
      />
      <ArticlePage
        title={article.title}
        subtitle={article.metaDescription}
        date={article.date}
        readTime={article.readTime}
      >
        {heroImg && (
          <figure className="mb-8 -mt-2">
            <img src={heroImg} alt={article.title} className="rounded-lg shadow-lg w-full max-h-[400px] object-cover" />
          </figure>
        )}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <RelatedArticles currentSlug={`/blog/${article.slug}`} />
      </ArticlePage>
    </Layout>
  );
};

export default BlogPost;
