"use client";

import { useRouter, useParams } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";
import { getArticleBySlug } from "@/data/blogArticles";
import { useLanguage } from "@/hooks/useLanguage";
import SEOHead from "@/components/SEOHead";
import { getHeroImageForSlug } from "@/utils/blogHeroImages";

const BlogPost = () => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const router = useRouter();
  const { localPath } = useLanguage();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    router.replace(localPath("/blog"));
    return null;
  }

  const heroImg = slug ? getHeroImageForSlug(slug) : undefined;

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        ogImage={heroImg}
        ogType="article"
        publishedTime={article.date}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.metaDescription,
          "datePublished": article.date,
          "dateModified": article.date,
          "author": { "@type": "Organization", "name": "Adam Howell Warning" },
          "mainEntityOfPage": `https://adamhowellwarning.com/blog/${article.slug}`,
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
        {localPath("/") !== "/" && (
          <div className="bg-muted/50 border border-border rounded-lg p-3 mb-6 text-sm text-muted-foreground text-center">
            ⚠️ เนื้อหาบทความนี้มีเฉพาะภาษาอังกฤษเท่านั้นในขณะนี้
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <RelatedArticles currentSlug={`/blog/${article.slug}`} />
      </ArticlePage>
    </>
  );
};

export default BlogPost;
