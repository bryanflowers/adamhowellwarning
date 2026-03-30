"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Shield, Menu, X, ArrowUp, Sun, Moon, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import VictimContactSlideIn from "@/components/VictimContactSlideIn";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlobalSearch from "@/components/GlobalSearch";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n/translations";

const ScrollProgressButton = ({ show }: { show: boolean }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress(Math.min(scrollTop / docHeight, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg transition-all hover:scale-110 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="hsl(var(--primary))" />
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
};

const navLinksConfig = [
  { path: "/", labelKey: "home" as const },
  { path: "/articles", labelKey: "allArticles" as const },
  { path: "/timeline", labelKey: "timeline" as const },
  { path: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned", labelKey: "superdogeExpose" as const },
  { path: "/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond", labelKey: "investigativeReport" as const },
  { path: "/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties", labelKey: "superdogeUpdate" as const },
  { path: "/keith-shingleton-david-edwards", labelKey: "associates" as const },
  { path: "/the-architect-of-deception-and-adam-howells-web-of-accomplices", labelKey: "webOfAccomplices" as const },
  { path: "/music", labelKey: "music" as const },
  { path: "/quiz", labelKey: "quiz" as const },
  { path: "/bingo", labelKey: "bingo" as const },
  { path: "/glossary", labelKey: "glossary" as const },
  { path: "/blog", labelKey: "cryptoScamBlog" as const },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLanguage, localPath } = useLanguage();
  const tr = t[lang];

  // Build localized nav links
  const navLinks = navLinksConfig.map((link) => ({
    to: localPath(link.path),
    label: tr[link.labelKey],
  }));

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgressBar />
      {/* Warning Banner */}
      <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm font-semibold tracking-wide">
        <AlertTriangle className="inline-block w-4 h-4 mr-2 -mt-0.5" />
        {tr.banner}
        <AlertTriangle className="inline-block w-4 h-4 ml-2 -mt-0.5" />
      </div>

      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={localPath("/")} className="flex items-center gap-3 group">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                Adam Howell Warning
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">{tr.investigativeReports}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${
                  pathname === link.to
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <GlobalSearch />
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1"
              aria-label="Toggle language"
              title={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold">{lang === "en" ? "TH" : "EN"}</span>
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold">{lang === "en" ? "TH" : "EN"}</span>
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="lg:hidden border-t bg-card px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${
                  pathname === link.to
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 animate-page-fade-in">{children}</main>

      {/* Victim Contact Slide-in */}
      <VictimContactSlideIn />

      {/* Back to Top Button with scroll progress ring */}
      <ScrollProgressButton show={showBackToTop} />

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            {tr.footerLine1}
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            {tr.footerLine2}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <Link href={localPath("/disclaimer")} className="hover:text-primary transition-colors">
              {tr.disclaimer}
            </Link>
            <span aria-hidden="true">|</span>
            <Link href={localPath("/privacy")} className="hover:text-primary transition-colors">
              {tr.privacyPolicy}
            </Link>
            <span aria-hidden="true">|</span>
            <Link href={localPath("/about")} className="hover:text-primary transition-colors">
              {tr.about}
            </Link>
            <span aria-hidden="true">|</span>
            <a
              href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/rss-feed`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              RSS Feed
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
