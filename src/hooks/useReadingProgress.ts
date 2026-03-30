"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "article-reading-progress";

interface ProgressMap {
  [slug: string]: number; // 0-100
}

const getProgressMap = (): ProgressMap => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

export const useReadingProgress = () => {
  const pathname = usePathname();

  // Save scroll progress for current page
  const trackProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
    const map = getProgressMap();
    // Only update if higher than previous
    if (pct > (map[pathname] || 0)) {
      map[pathname] = pct;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", trackProgress, { passive: true });
    return () => window.removeEventListener("scroll", trackProgress);
  }, [trackProgress]);

  return null;
};

/** Get reading progress for a specific slug (0-100) */
export const getArticleProgress = (slug: string): number => {
  const map = getProgressMap();
  // Try exact match and with leading slash
  return map[slug] || map[`/${slug}`] || map[slug.replace(/^\//, "")] || 0;
};
