import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticlePage from "@/components/ArticlePage";
import RelatedArticles from "@/components/RelatedArticles";
import { getArticleBySlug } from "@/data/blogArticles";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <ArticlePage
        title={article.title}
        subtitle={article.metaDescription}
        date={article.date}
        readTime={article.readTime}
      >
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <RelatedArticles currentSlug={`/blog/${article.slug}`} />
      </ArticlePage>
    </Layout>
  );
};

export default BlogPost;
