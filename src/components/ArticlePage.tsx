import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import ImageLightbox from "@/components/ImageLightbox";
import ArticleNarration from "@/components/ArticleNarration";

interface ArticlePageProps {
  title: string;
  subtitle?: string;
  date?: string;
  readTime?: string;
  children: React.ReactNode;
}

const ArticlePage = ({ title, subtitle, date, readTime, children }: ArticlePageProps) => {
  const location = useLocation();
  const articleSlug = location.pathname;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const [articleText, setArticleText] = useState("");

  const handleArticleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" && target.closest(".prose")) {
      const img = target as HTMLImageElement;
      setLightbox({ src: img.src, alt: img.alt || "Evidence photo" });
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector(".prose");
    if (container) {
      container.addEventListener("click", handleArticleClick as EventListener);
      // Add cursor pointer to all prose images
      container.querySelectorAll("img").forEach((img) => {
        (img as HTMLElement).style.cursor = "zoom-in";
      });
    }
    return () => {
      container?.removeEventListener("click", handleArticleClick as EventListener);
    };
  }, [handleArticleClick]);

  // Extract plain text from the prose content for TTS
  useEffect(() => {
    if (proseRef.current) {
      const text = proseRef.current.innerText || proseRef.current.textContent || "";
      setArticleText(text.slice(0, 5000));
    }
  }, [children]);

  return (
    <article className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground flex-wrap">
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
            )}
            <ShareButtons title={title} />
          </div>
          {articleText && <ArticleNarration articleSlug={articleSlug} articleText={articleText} />}
          <div className="h-1 w-24 bg-primary mt-6 rounded-full" />
        </header>

        <div ref={proseRef} className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h4:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        <CommentSection articleSlug={articleSlug} />

        <TableOfContents />
        {lightbox && (
          <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}
      </div>
    </article>
  );
};

export default ArticlePage;
