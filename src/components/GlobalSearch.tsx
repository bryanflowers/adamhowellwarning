"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, FileText, Music, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { musicTracks } from "@/data/musicTracks";
import { blogArticles } from "@/data/blogArticles";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n/translations";

const investigativeArticles = [
  { slug: "/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors", title: "Unmasking Adam Howell", type: "article" as const },
  { slug: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned", title: "Exposing the SuperDoge Rug Pull", type: "article" as const },
  { slug: "/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond", title: "Investigative Report: Uncovering the Trail", type: "article" as const },
  { slug: "/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties", title: "Investigative Update: SuperDoge Scam", type: "article" as const },
  { slug: "/keith-shingleton-david-edwards", title: "Keith Shingleton & David Edwards", type: "article" as const },
  { slug: "/the-architect-of-deception-and-adam-howells-web-of-accomplices", title: "The Architect of Deception", type: "article" as const },
];

type SearchResult = {
  title: string;
  slug: string;
  type: "article" | "blog" | "music";
  subtitle?: string;
};

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, localPath } = useLanguage();
  const tr = t[lang];

  const results = useMemo<SearchResult[]>(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();

    const articles: SearchResult[] = investigativeArticles
      .filter((a) => a.title.toLowerCase().includes(q))
      .map((a) => ({ title: a.title, slug: localPath(a.slug), type: "article" }));

    const blogs: SearchResult[] = blogArticles
      .filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
      .map((b) => ({ title: b.title, slug: localPath(`/blog/${b.slug}`), type: "blog", subtitle: b.excerpt.slice(0, 80) }));

    const tracks: SearchResult[] = musicTracks
      .filter((track) => track.title.toLowerCase().includes(q) || track.description.toLowerCase().includes(q) || track.genre.toLowerCase().includes(q))
      .map((track) => ({ title: track.title, slug: localPath(`/music?track=${track.id}`), type: "music", subtitle: `${track.genre} — ${track.description}` }));

    return [...articles, ...blogs, ...tracks].slice(0, 8);
  }, [query, localPath]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const iconMap = {
    article: <FileText className="w-4 h-4 text-primary shrink-0" />,
    blog: <BookOpen className="w-4 h-4 text-primary shrink-0" />,
    music: <Music className="w-4 h-4 text-primary shrink-0" />,
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border rounded-md hover:bg-secondary transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">{tr.search}</span>
        <kbd className="hidden md:inline text-xs border rounded px-1 py-0.5 bg-muted">⌘K</kbd>
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr.search}
            className="pl-9 pr-8 w-56 md:w-72 h-9"
          />
          <button onClick={() => { setOpen(false); setQuery(""); }} className="absolute right-2 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>

      {query.length >= 2 && (
        <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-card border rounded-lg shadow-xl z-[60] max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">{lang === "th" ? "ไม่พบผลลัพธ์" : "No results found"}</p>
          ) : (
            results.map((r, i) => (
              <Link
                key={i}
                href={r.slug}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="flex items-start gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b last:border-b-0"
              >
                {iconMap[r.type]}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  {r.subtitle && <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>}
                </div>
                <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0 mt-1" />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
