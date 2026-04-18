"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Language = "en" | "th";

export const useLanguage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Detect language from URL — first segment
  const lang: Language =
    pathname === "/th" || pathname.startsWith("/th/") ? "th" : "en";

  const toggleLanguage = () => {
    const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

    // Strip existing language prefix from pathname
    const stripped = pathname.replace(/^\/(en|th)(?=\/|$)/, "") || "";

    // Build new URL with the opposite language
    const newLang: Language = lang === "en" ? "th" : "en";
    const newPath = `/${newLang}${stripped}` || `/${newLang}`;

    router.push(newPath + search);
  };

  // Always prefix with current language — both /en and /th need prefixes
  const localPath = (path: string) => {
    // If path is already absolute with a locale, return as-is
    if (path.startsWith("/en/") || path.startsWith("/th/") || path === "/en" || path === "/th") {
      return path;
    }
    // Root path becomes /en or /th
    if (path === "/") {
      return `/${lang}`;
    }
    // Everything else gets the lang prefix
    return `/${lang}${path}`;
  };

  return { lang, toggleLanguage, localPath };
};
