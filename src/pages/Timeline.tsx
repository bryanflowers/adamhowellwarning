import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar, ExternalLink, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  category: "scam" | "legal" | "evidence" | "milestone";
  link?: string;
  linkLabel?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "2017",
    title: "DopeCoin Involvement",
    description: "Adam Howell begins promoting DopeCoin across social media, employing aggressive hype tactics. Insiders allegedly coordinated pump-and-dump activity.",
    category: "scam",
  },
  {
    date: "2018",
    title: "DopeCoin Collapse",
    description: "DopeCoin's value crashes after suspected insider dumping. Howell deflects blame onto others and moves on to new ventures.",
    category: "scam",
  },
  {
    date: "Early 2021",
    title: "SuperDoge Token Launch",
    description: "SuperDoge launches with promises of charitable donations, a doxxed team, and NFT integration. Raises an estimated $13M from investors.",
    category: "milestone",
    link: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned",
    linkLabel: "Read Full Exposé",
  },
  {
    date: "Mid 2021",
    title: "Anonymous Podcast Appearance",
    description: "Howell appears anonymously on The Edge NFT podcast, pitching SuperDoge while warning listeners about other scams — a classic trust-building tactic.",
    category: "evidence",
    link: "/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties",
    linkLabel: "Read Update",
  },
  {
    date: "Late 2021",
    title: "Charity Promises Unfulfilled",
    description: "On-chain analysis reveals the SuperDoge 'charity wallet' transactions don't match announced donations. Community begins raising concerns.",
    category: "evidence",
  },
  {
    date: "2022",
    title: "SuperDoge Goes Silent",
    description: "Development stops, social media activity ceases, and team members become unreachable. Classic exit scam pattern.",
    category: "scam",
  },
  {
    date: "2022-2023",
    title: "Defamation Campaigns Begin",
    description: "Howell initiates sustained digital harassment against critics, creating 84+ defamatory videos across YouTube, Odysee, Rumble, and BitChute.",
    category: "legal",
  },
  {
    date: "2023",
    title: "Partnership with Andrew Drummond",
    description: "Howell begins paying journalist Andrew Drummond to publish attacks against business owners and their families.",
    category: "evidence",
    link: "/the-architect-of-deception-and-adam-howells-web-of-accomplices",
    linkLabel: "Read Network Analysis",
  },
  {
    date: "2023",
    title: "Keith Shingleton & David Edwards Connections",
    description: "Investigation reveals ties between Howell, Keith Shingleton (COO claims), and David Edwards in the SuperDoge operation.",
    category: "evidence",
    link: "/keith-shingleton-david-edwards",
    linkLabel: "Read Deep Dive",
  },
  {
    date: "2024",
    title: "Defamation Case Lost",
    description: "Adam Howell loses his defamation case against Bryan Flowers in Thai court. Photo evidence of the court outcome captured with Andrew Drummond present.",
    category: "legal",
  },
  {
    date: "2024",
    title: "Criminal Charges Filed",
    description: "Howell faces 3 criminal cases for false allegations, a cybercrime case, and a civil case in Thailand. He flees the country.",
    category: "legal",
  },
  {
    date: "2024",
    title: "Fake Facebook Accounts Exposed",
    description: "Victims submit evidence of Howell creating fake Facebook accounts (alias Tom Davidson) to spread threats and disinformation. Reported to Canadian police.",
    category: "evidence",
  },
  {
    date: "November 2024",
    title: "This Investigation Published",
    description: "AdamHowellWarning.com launches with comprehensive documentation of all evidence, court records, and victim accounts.",
    category: "milestone",
  },
  {
    date: "2025-2026",
    title: "Ongoing Updates",
    description: "Continued investigative reporting, new victim accounts, and additional evidence documented as the investigation expands.",
    category: "milestone",
  },
];

const categoryConfig = {
  scam: { label: "Scam Activity", className: "bg-destructive/10 text-destructive border-destructive/30" },
  legal: { label: "Legal Action", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  evidence: { label: "Evidence", className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  milestone: { label: "Milestone", className: "bg-primary/10 text-primary border-primary/30" },
};

const Timeline = () => {
  const { lang, localPath } = useLanguage();

  return (
    <Layout>
      <SEOHead
        title="Investigation Timeline – Key Events in Adam Howell's Fraud History"
        description="Interactive chronological timeline documenting key events, court dates, and evidence milestones in the investigation of Adam Howell's crypto fraud schemes."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Investigation Timeline",
          description: "Chronological timeline of key events in Adam Howell's documented fraud history.",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://web-rescu.lovable.app" },
              { "@type": "ListItem", position: 2, name: "Timeline", item: "https://web-rescu.lovable.app/timeline" },
            ],
          },
        }}
      />
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === "th" ? "ไทม์ไลน์การสืบสวน" : "Investigation Timeline"}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {lang === "th"
                ? "ลำดับเหตุการณ์สำคัญในประวัติการฉ้อโกงที่ถูกบันทึกไว้ของ Adam Howell"
                : "A chronological record of key events, court actions, and evidence milestones in Adam Howell's documented fraud history."}
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <Badge key={key} variant="outline" className={`${config.className} border`}>
                {config.label}
              </Badge>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {timelineEvents.map((event, idx) => {
                const config = categoryConfig[event.category];
                return (
                  <div key={idx} className="relative pl-16 md:pl-20">
                    {/* Dot */}
                    <div className={`absolute left-[18px] md:left-[26px] top-1 w-4 h-4 rounded-full border-2 ${
                      event.category === "scam"
                        ? "bg-destructive border-destructive"
                        : event.category === "legal"
                        ? "bg-blue-500 border-blue-500"
                        : event.category === "evidence"
                        ? "bg-yellow-500 border-yellow-500"
                        : "bg-primary border-primary"
                    }`} />

                    <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold text-muted-foreground tracking-wide">{event.date}</span>
                        <Badge variant="outline" className={`${config.className} border text-xs`}>
                          {config.label}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-foreground mb-1 text-sm md:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      {event.link && (
                        <Link
                          to={localPath(event.link)}
                          className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-2 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {event.linkLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === "th" ? "มีข้อมูลเพิ่มเติม?" : "Have Additional Information?"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {lang === "th"
                ? "หากคุณมีหลักฐานหรือวันที่ที่สามารถเพิ่มลงในไทม์ไลน์นี้ โปรดติดต่อเราอย่างเป็นความลับ"
                : "If you have evidence or dates that can be added to this timeline, please reach out confidentially."}
            </p>
            <Link to={localPath("/articles")} className="text-primary font-medium hover:underline">
              {lang === "th" ? "อ่านบทความสืบสวนทั้งหมด →" : "Read all investigative articles →"}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Timeline;
