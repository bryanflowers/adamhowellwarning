import { useState, useEffect, useCallback } from "react";
import { List, X } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".prose h2, .prose h3");
    const items: Heading[] = [];
    elements.forEach((el, i) => {
      if (!el.id) {
        el.id = `heading-${i}`;
      }
      items.push({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });
    setHeadings(items);
  }, []);

  const handleScroll = useCallback(() => {
    const offsets = headings.map((h) => {
      const el = document.getElementById(h.id);
      return { id: h.id, top: el ? el.getBoundingClientRect().top : Infinity };
    });
    const current = offsets.filter((o) => o.top <= 120);
    if (current.length > 0) {
      setActiveId(current[current.length - 1].id);
    }
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (headings.length < 3) return null;

  return (
    <div className="fixed bottom-24 left-4 z-40">
      {open ? (
        <div className="bg-card border rounded-xl shadow-xl p-4 w-72 max-h-[60vh] overflow-y-auto animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-foreground">Contents</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-1">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={() => setOpen(false)}
                className={`block text-sm py-1 transition-colors rounded px-2 ${
                  h.level === 3 ? "pl-5" : ""
                } ${
                  activeId === h.id
                    ? "text-primary font-medium bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-card border rounded-full shadow-lg p-3 text-muted-foreground hover:text-primary transition-colors hover:scale-110"
          aria-label="Table of contents"
        >
          <List className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default TableOfContents;
