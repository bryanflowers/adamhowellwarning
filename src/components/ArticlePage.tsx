import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Globe } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import ImageLightbox from "@/components/ImageLightbox";
import ArticleNarration from "@/components/ArticleNarration";
import { useLanguage } from "@/hooks/useLanguage";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { PROSE_CLASSES } from "@/lib/constants";

interface ArticlePageProps {
  title: string;
  titleTh?: string;
  subtitle?: string;
  subtitleTh?: string;
  date?: string;
  dateTh?: string;
  readTime?: string;
  readTimeTh?: string;
  translatable?: boolean;
  children: React.ReactNode;
}

/** Normalize slug for DB cache key — strip /th prefix, ensure leading slash */
const normalizeSlug = (pathname: string): string => {
  let slug = pathname.startsWith("/th/") ? pathname.slice(3) : pathname === "/th" ? "/" : pathname;
  if (!slug.startsWith("/")) slug = "/" + slug;
  return slug;
};

const ArticlePage = ({
  title, titleTh, subtitle, subtitleTh,
  date, dateTh, readTime, readTimeTh,
  translatable = false, children,
}: ArticlePageProps) => {
  const location = useLocation();
  const { lang, localPath } = useLanguage();
  const articleSlug = location.pathname;
  const cacheSlug = normalizeSlug(articleSlug);
  useReadingProgress();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const [articleText, setArticleText] = useState("");
  const [translatedHtml, setTranslatedHtml] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(false);

  // Resolved display values
  const displayTitle = lang === "th" && titleTh ? titleTh : title;
  const displaySubtitle = lang === "th" && subtitleTh ? subtitleTh : subtitle;
  const displayDate = lang === "th" && dateTh ? dateTh : date;
  const displayReadTime = lang === "th" && readTimeTh ? readTimeTh : readTime;

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
  // Use requestAnimationFrame + small delay to ensure DOM is fully painted
  useEffect(() => {
    let cancelled = false;
    const extract = () => {
      if (!proseRef.current || cancelled) return;
      const bodyText = proseRef.current.innerText || proseRef.current.textContent || "";
      // Guard: if body text is suspiciously short, retry once after a delay
      if (bodyText.length < 200) {
        setTimeout(() => {
          if (cancelled || !proseRef.current) return;
          const retryText = proseRef.current.innerText || proseRef.current.textContent || "";
          const prefix = [displayTitle, displaySubtitle].filter(Boolean).join(". ") + ". ";
          const maxLen = lang === "th" ? 5000 : 50000;
          setArticleText((prefix + retryText).slice(0, maxLen));
        }, 500);
        return;
      }
      const prefix = [displayTitle, displaySubtitle].filter(Boolean).join(". ") + ". ";
      const maxLen2 = lang === "th" ? 5000 : 50000;
      setArticleText((prefix + bodyText).slice(0, maxLen2));
    };
    // Wait for next frame to ensure DOM is committed
    requestAnimationFrame(() => setTimeout(extract, 50));
    return () => { cancelled = true; };
  }, [children, displayTitle, displaySubtitle, translatedHtml]);

  // Fetch Thai translation — try DB cache first (instant), then edge function
  useEffect(() => {
    if (lang !== "th" || !translatable) {
      setTranslatedHtml(null);
      setTranslationError(false);
      return;
    }

    let cancelled = false;

    const fetchTranslation = async () => {
      setTranslationError(false);

      // Capture English HTML BEFORE showing skeleton (proseRef would be null during skeleton)
      const englishHtml = proseRef.current?.innerHTML || "";

      try {
        // Step 1: Try DB cache directly — check multiple possible slug formats
        const slugVariants = [cacheSlug, articleSlug, `/th${cacheSlug}`];
        let cachedHtml: string | null = null;

        for (const slug of slugVariants) {
          const { data } = await supabase
            .from("article_translations")
            .select("translated_html")
            .eq("article_slug", slug)
            .eq("language", "th")
            .maybeSingle();
          if (data?.translated_html) {
            cachedHtml = data.translated_html;
            break;
          }
        }

        if (!cancelled && cachedHtml) {
          setTranslatedHtml(cachedHtml);
          setTranslating(false);
          return;
        }

        // Step 2: Not cached — call edge function to generate + cache
        if (!englishHtml) {
          return;
        }

        setTranslating(true);

        const { data, error } = await supabase.functions.invoke("translate-article", {
          body: {
            slug: cacheSlug,
            html: englishHtml,
            targetLang: "th",
          },
        });

        if (cancelled) return;

        if (error || !data?.translated_html) {
          console.error("Translation error:", error);
          setTranslationError(true);
        } else {
          setTranslatedHtml(data.translated_html);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Translation fetch error:", err);
          setTranslationError(true);
        }
      } finally {
        if (!cancelled) setTranslating(false);
      }
    };

    // Small delay to ensure prose content is rendered (only needed for edge function fallback)
    const timer = setTimeout(fetchTranslation, 100);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lang, articleSlug, cacheSlug]);

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
            {displayTitle}
          </h1>
          {displaySubtitle && (
            <p className="text-lg text-muted-foreground leading-relaxed">{displaySubtitle}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground flex-wrap">
            {displayDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {displayDate}
              </span>
            )}
            {displayReadTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {displayReadTime}
              </span>
            )}
            <ShareButtons title={displayTitle} />
          </div>
          {articleText && !(lang === "th" && translatable && !translatedHtml) && <ArticleNarration articleSlug={articleSlug} articleText={articleText} language={lang} />}
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
              <span className="text-sm">กำลังแปลบทความ... โดยปกติจะใช้เวลา 5-10 วินาที</span>
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
            className={PROSE_CLASSES}
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
            การแปลล้มเหลว แสดงเนื้อหาภาษาอังกฤษแทน · Translation failed. Showing English content instead.
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
