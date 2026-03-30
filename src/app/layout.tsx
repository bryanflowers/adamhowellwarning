import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adam Howell Warning – Crypto Fraud, Rug Pulls & Extortion",
    template: "%s | Adam Howell Warning",
  },
  description:
    "Documented evidence exposing Adam Howell's crypto fraud, SuperDoge rug pull, DopeCoin pump-and-dump, extortion schemes, and defamation campaigns.",
  metadataBase: new URL("https://adamhowellwarning.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adamhowellwarning.com",
    siteName: "Adam Howell Warning",
    title: "Adam Howell Warning – Crypto Fraud, Rug Pulls & Extortion",
    description:
      "Documented evidence exposing Adam Howell's crypto fraud, SuperDoge rug pull, DopeCoin pump-and-dump, extortion schemes, and defamation campaigns.",
    images: [{ url: "/og-adam-howell.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Howell Warning",
    description:
      "Documented evidence exposing Adam Howell's crypto fraud and extortion schemes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
