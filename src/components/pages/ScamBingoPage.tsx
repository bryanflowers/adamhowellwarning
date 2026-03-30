"use client";

import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { RotateCcw, Share2, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { t, bingoSquaresTh } from "@/i18n/translations";

const allSquares = [
  "Anonymous Team",
  "Locked Telegram",
  '"100x Guaranteed"',
  "Celebrity Endorsement",
  "No Audit",
  "Unlocked Liquidity",
  "Countdown Timer Pressure",
  "Dev Wallet 30%+",
  '"Not Financial Advice"',
  "Fake Partnership",
  "Copy-Paste Whitepaper",
  "Honeypot Contract",
  '"To the Moon"',
  "Bot-Filled Discord",
  "Paid Influencer Shill",
  "Unrealistic Roadmap",
  "DMCA Takedowns on Critics",
  "Charity Wallet Never Used",
  "Team Fled Country",
  "Fake Audit Report",
  "Rebill Scheme",
  "Multiple Failed Projects",
  "Deleted Website",
  "Pump & Dump Pattern",
  "Threats to Whistleblowers",
  "Doxxing Threats",
  "Fake Volume Bots",
  "Roadmap Copy-Paste",
  "Whitelist Presale Scam",
  "Rug Pull Fork",
  "Missing LinkedIn Profiles",
  "VPN-Only Team Calls",
  "Token Tax 20%+",
];

const FREE_SPACE_INDEX = 12; // Center of 5x5

const shuffle = (arr: string[]) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const checkBingo = (marked: boolean[]): boolean => {
  for (let r = 0; r < 5; r++) {
    if ([0, 1, 2, 3, 4].every((c) => marked[r * 5 + c])) return true;
  }
  for (let c = 0; c < 5; c++) {
    if ([0, 1, 2, 3, 4].every((r) => marked[r * 5 + c])) return true;
  }
  if ([0, 6, 12, 18, 24].every((i) => marked[i])) return true;
  if ([4, 8, 12, 16, 20].every((i) => marked[i])) return true;
  return false;
};

const ScamBingo = () => {
  const { lang } = useLanguage();
  const tr = t[lang];
  const [seed, setSeed] = useState(0);
  const board = useMemo(() => {
    const shuffled = shuffle(allSquares);
    const result = shuffled.slice(0, 25);
    result[FREE_SPACE_INDEX] = "FREE SPACE 🎯";
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const [marked, setMarked] = useState<boolean[]>(() => {
    const init = Array(25).fill(false);
    init[FREE_SPACE_INDEX] = true;
    return init;
  });

  const hasBingo = checkBingo(marked);
  const markedCount = marked.filter(Boolean).length;

  const toggleCell = (idx: number) => {
    if (idx === FREE_SPACE_INDEX) return;
    setMarked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const reset = () => {
    setSeed((s) => s + 1);
    const init = Array(25).fill(false);
    init[FREE_SPACE_INDEX] = true;
    setMarked(init);
  };

  const localizeSquare = (text: string): string => {
    if (lang === "th") return bingoSquaresTh[text] || text;
    return text;
  };

  return (
    <>
      <SEOHead
        title={tr.bingoTitle}
        description={tr.bingoSubtitle}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Crypto Scam Bingo",
          "description": "Interactive bingo card game to identify common cryptocurrency scam tactics and warning signs.",
          "applicationCategory": "EducationalApplication",
          "provider": { "@type": "Organization", "name": "Adam Howell Warning" },
        }}
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {tr.bingoTitle}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {tr.bingoSubtitle}
            </p>
          </div>

          {hasBingo && (
            <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-6 text-center animate-scale-in">
              <PartyPopper className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-black text-primary mb-2">🎉 BINGO! 🎉</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {tr.bingoWin}
              </p>
              <div className="flex justify-center gap-3">
                <Button onClick={reset} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" /> {tr.newCard}
                </Button>
                <Button
                  onClick={() => {
                    const text = lang === "th"
                      ? `🎰 BINGO! ฉันพบสัญญาณหลอกลวง ${markedCount} รายการใน Crypto Scam Bingo!`
                      : `🎰 BINGO! I spotted ${markedCount} scam red flags on Crypto Scam Bingo!`;
                    if (navigator.share) {
                      navigator.share({ text, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(`${text} ${window.location.href}`);
                      toast.success(lang === "th" ? "คัดลอกแล้ว!" : "Copied to clipboard!");
                    }
                  }}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" /> {tr.share}
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-5 gap-1.5 md:gap-2 mb-6">
            {board.map((text, idx) => {
              const isMarked = marked[idx];
              const isFree = idx === FREE_SPACE_INDEX;
              return (
                <button
                  key={text}
                  onClick={() => toggleCell(idx)}
                  className={`aspect-square rounded-lg border-2 p-1 md:p-2 flex items-center justify-center text-center transition-all duration-200 text-[10px] sm:text-xs md:text-sm font-medium leading-tight ${
                    isFree
                      ? "bg-primary/20 border-primary text-primary cursor-default"
                      : isMarked
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-95 animate-pulse"
                      : "bg-card border-border hover:border-primary/50 hover:bg-secondary cursor-pointer"
                  }`}
                  style={isMarked && !isFree ? { animationIterationCount: 1, animationDuration: "0.4s" } : undefined}
                >
                  {localizeSquare(text)}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{markedCount}/25 {tr.spotted}</span>
            <Button onClick={reset} variant="outline" size="sm" className="gap-2">
              <RotateCcw className="w-4 h-4" /> {tr.shuffleCard}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScamBingo;
