import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Globe } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import ImageLightbox from "@/components/ImageLightbox";
import ArticleNarration from "@/components/ArticleNarration";
import { useLanguage } from "@/hooks/useLanguage";

import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticlePageProps {
  title: string;
  subtitle?: string;
  date?: string;
  readTime?: string;
  translatable?: boolean;
  children: React.ReactNode;
}

const ArticlePage = ({ title, subtitle, date, readTime, translatable = false, children }: ArticlePageProps) => {
  const location = useLocation();
  const { lang, localPath } = useLanguage();
  const articleSlug = location.pathname;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const [articleText, setArticleText] = useState("");
  const [translatedHtml, setTranslatedHtml] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(false);

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
      container.querySelectorAll("img").forEach((img) => {
        (img as HTMLElement).style.cursor = "zoom-in";
      });
    }
    return () => {
      container?.removeEventListener("click", handleArticleClick as EventListener);
    };
  }, [handleArticleClick, translatedHtml]);

  // Extract plain text from the prose content for TTS
  useEffect(() => {
    if (proseRef.current) {
      const bodyText = proseRef.current.innerText || proseRef.current.textContent || "";
      const header = [title, subtitle].filter(Boolean).join(". ");
      const fullText = header ? `${header}. ${bodyText}` : bodyText;
      setArticleText(fullText.slice(0, 5000));
    }
  }, [children, title, subtitle, translatedHtml]);

  // Fetch Thai translation when language is Thai
  useEffect(() => {
    if (lang !== "th" || !translatable) {
      setTranslatedHtml(null);
      setTranslationError(false);
      return;
    }

    const fetchTranslation = async () => {
      setTranslating(true);
      setTranslationError(false);

      try {
        // Get the English HTML from the prose container
        const tempDiv = document.createElement("div");
        const proseEl = proseRef.current;
        if (!proseEl) {
          setTranslating(false);
          return;
        }
        // We need to grab the innerHTML before translation replaces it
        const englishHtml = proseEl.innerHTML;

        const { data, error } = await supabase.functions.invoke("translate-article", {
          body: {
            slug: articleSlug,
            html: englishHtml,
            targetLang: "th",
          },
        });

        if (error || !data?.translated_html) {
          console.error("Translation error:", error);
          setTranslationError(true);
        } else {
          setTranslatedHtml(data.translated_html);
        }
      } catch (err) {
        console.error("Translation fetch error:", err);
        setTranslationError(true);
      } finally {
        setTranslating(false);
      }
    };

    // Small delay to ensure prose content is rendered first
    const timer = setTimeout(fetchTranslation, 500);
    return () => clearTimeout(timer);
  }, [lang, articleSlug]);

  return (
    <article className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to={localPath("/")}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "th" ? "กลับไปบทความทั้งหมด" : "Back to all articles"}
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
          {lang === "th" && !translating && translatedHtml && (
            <div className="flex items-center gap-2 mt-4 px-3 py-1.5 bg-muted/50 rounded-md text-xs text-muted-foreground w-fit">
              <Globe className="w-3 h-3" />
              แปลอัตโนมัติ · Auto-translated
            </div>
          )}
          <div className="h-1 w-24 bg-primary mt-6 rounded-full" />
        </header>

        {translating && lang === "th" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground mb-6">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
              <span className="text-sm">กำลังแปลบทความ... Translating article...</span>
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-6 w-2/3 mt-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ) : (
          <div
            ref={proseRef}
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h4:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          >
            {lang === "th" && translatedHtml ? (
              <div dangerouslySetInnerHTML={{ __html: translatedHtml }} />
            ) : (
              children
            )}
          </div>
        )}

        {translationError && lang === "th" && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
            Translation failed. Showing English content instead.
          </div>
        )}

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
