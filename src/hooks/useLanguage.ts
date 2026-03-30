"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Language = "en" | "th";

export const useLanguage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const lang: Language = (pathname === "/th" || pathname.startsWith("/th/")) ? "th" : "en";

  const toggleLanguage = () => {
    const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    if (lang === "en") {
      router.push(`/th${pathname === "/" ? "" : pathname}${search}`);
    } else {
      router.push((pathname.replace(/^\/th/, "") || "/") + search);
    }
  };

  const localPath = (path: string) => (lang === "th" ? `/th${path}` : path);

  return { lang, toggleLanguage, localPath };
};
