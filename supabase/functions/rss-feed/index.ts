const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://web-rescu.lovable.app";

const articles = [
  {
    title: "Conduct Profile of Adam Howell – Birthdate 2nd of March 1982",
    slug: "/",
    date: "2024-11-22",
    description: "Documented evidence exposing Adam Howell's crypto fraud, SuperDoge rug pull, DopeCoin pump-and-dump, extortion schemes, and defamation campaigns.",
  },
  {
    title: "Unmasking Adam Howell: The Serial Scammer, Extortionist, and Crypto Fraudster",
    slug: "/unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors",
    date: "2024-11-22",
    description: "A comprehensive exposé compiling documented evidence from court records, victim accounts, and public exposés.",
  },
  {
    title: "Exposing the SuperDoge Rug Pull",
    slug: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned",
    date: "2024-11-22",
    description: "A comprehensive investigative report into the SuperDoge token, its team, blockchain evidence, and estimated losses.",
  },
  {
    title: "Investigative Report: Uncovering the Trail of Adam Howell's Ventures",
    slug: "/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond",
    date: "2024-11-22",
    description: "Mapping out Adam Howell's history through public records, forum archives, crypto news sites, social media, and whistleblower accounts.",
  },
  {
    title: "Investigative Update: Exposing the SuperDoge Scam",
    slug: "/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties",
    date: "2024-11-22",
    description: "A revealing 2021 podcast appearance showcases Howell's tactics.",
  },
  {
    title: "Deep Dive on Keith Shingleton, David Edwards and Connections to Adam Howell",
    slug: "/keith-shingleton-david-edwards",
    date: "2024-11-22",
    description: "Examining the inner circle and mechanisms behind the alleged scams.",
  },
  {
    title: "The Architect of Deception and Adam Howell's Web of Accomplices",
    slug: "/the-architect-of-deception-and-adam-howells-web-of-accomplices",
    date: "2024-11-22",
    description: "Key enablers like Andrew Drummond and Kanokrat form the backbone of extortion tactics.",
  },
];

// Blog articles (subset for RSS)
const blogPosts = [
  { title: "How to Identify Crypto Rug Pulls Before You Lose Everything", slug: "how-to-identify-crypto-rug-pulls", date: "2026-02-10", description: "Learn the warning signs of crypto rug pulls." },
  { title: "Pump and Dump Schemes in Cryptocurrency", slug: "pump-and-dump-schemes-cryptocurrency", date: "2026-02-08", description: "How crypto pump and dump schemes manipulate markets." },
  { title: "NFT Scams: 10 Red Flags Every Collector Must Know", slug: "nft-scam-red-flags", date: "2026-02-06", description: "Protect yourself from NFT scams." },
  { title: "Crypto Ponzi Schemes Explained", slug: "crypto-ponzi-schemes-explained", date: "2026-02-04", description: "How billions are stolen through false returns." },
  { title: "Social Media Crypto Scams", slug: "social-media-crypto-scams", date: "2026-02-02", description: "How fraudsters use Twitter, Telegram, and Discord." },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const allItems = [
    ...articles.map((a) => ({
      title: a.title,
      link: `${BASE_URL}${a.slug === "/" ? "" : a.slug}`,
      description: a.description,
      pubDate: new Date(a.date).toUTCString(),
      guid: `${BASE_URL}${a.slug === "/" ? "" : a.slug}`,
    })),
    ...blogPosts.map((b) => ({
      title: b.title,
      link: `${BASE_URL}/blog/${b.slug}`,
      description: b.description,
      pubDate: new Date(b.date).toUTCString(),
      guid: `${BASE_URL}/blog/${b.slug}`,
    })),
  ];

  // Sort by date descending
  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Adam Howell Warning – Investigative Reports</title>
    <link>${BASE_URL}</link>
    <description>Documented evidence and investigative reports exposing Adam Howell's crypto fraud, rug pulls, and extortion schemes.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/og-adam-howell.png</url>
      <title>Adam Howell Warning</title>
      <link>${BASE_URL}</link>
    </image>
${allItems.map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
    </item>`).join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
