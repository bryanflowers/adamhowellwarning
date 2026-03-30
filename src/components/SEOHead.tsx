/**
 * SEOHead - Legacy component from React Router / react-helmet-async.
 *
 * In Next.js 15 App Router, metadata is handled via the `metadata` export
 * (or `generateMetadata`) in each page's route file. This component is
 * retained as a no-op so existing page code that renders <SEOHead /> does
 * not break. Migrate metadata to the Next.js metadata API in each
 * page.tsx / layout.tsx instead.
 */

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
  publishedTime?: string;
  author?: string;
}

const SEOHead = (_props: SEOHeadProps) => {
  return null;
};

export default SEOHead;
