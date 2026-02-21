import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const BASE_URL = "https://web-rescu.lovable.app";

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

const SEOHead = ({
  title,
  description,
  ogImage = "/og-adam-howell.png",
  ogType = "website",
  noindex = false,
  jsonLd,
  publishedTime,
  author = "Adam Howell Warning",
}: SEOHeadProps) => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  // Strip /th prefix to get the base path
  const isThai = pathname === "/th" || pathname.startsWith("/th/");
  const basePath = isThai ? pathname.slice(3) || "/" : pathname;
  const canonicalUrl = `${BASE_URL}${basePath === "/" ? "" : basePath}`;
  const enUrl = `${BASE_URL}${basePath === "/" ? "" : basePath}`;
  const thUrl = `${BASE_URL}/th${basePath === "/" ? "" : basePath}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
  const fullTitle = title.includes("Adam Howell") ? title : `${title} | Adam Howell Warning`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="th" href={thUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Adam Howell Warning" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta property="og:locale" content={lang === "th" ? "th_TH" : "en_US"} />
      <meta property="og:locale:alternate" content={lang === "th" ? "en_US" : "th_TH"} />
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && (
        <meta property="article:author" content={author} />
      )}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
