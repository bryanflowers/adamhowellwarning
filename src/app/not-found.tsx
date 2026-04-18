"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/th") ? "th" : "en";
  const homeHref = `/${lang}`;

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {lang === "th" ? "ไม่พบหน้าที่คุณต้องการ" : "Oops! Page not found"}
        </p>
        <Link href={homeHref} className="text-primary underline hover:text-primary/90">
          {lang === "th" ? "กลับหน้าหลัก" : "Return to Home"}
        </Link>
      </div>
    </div>
  );
}
