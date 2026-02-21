import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, Shield, Menu, X, ArrowUp, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import VictimContactSlideIn from "@/components/VictimContactSlideIn";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import GlobalSearch from "@/components/GlobalSearch";

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

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/articles", label: "All Articles" },
  { to: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned", label: "SuperDoge Exposé" },
  { to: "/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond", label: "Investigative Report" },
  { to: "/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties", label: "SuperDoge Update" },
  { to: "/keith-shingleton-david-edwards", label: "Associates" },
  { to: "/the-architect-of-deception-and-adam-howells-web-of-accomplices", label: "Web of Accomplices" },
  { to: "/blog", label: "Crypto Scam Blog" },
  { to: "/music", label: "Music" },
  { to: "/quiz", label: "Quiz" },
  { to: "/bingo", label: "Bingo" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

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
        PUBLIC WARNING: Investor & Partner Alert
        <AlertTriangle className="inline-block w-4 h-4 ml-2 -mt-0.5" />
      </div>

      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                Adam Howell Warning
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Investigative Reports</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${
                  location.pathname === link.to
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <GlobalSearch />
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
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary ${
                  location.pathname === link.to
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
            This site documents publicly available information for investor protection purposes.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            If you have information to share, please reach out through secure channels.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
