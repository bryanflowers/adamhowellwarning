import { useState, useEffect, useCallback, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { AlertTriangle, FileText, ArrowRight, Shield, Eye, Calendar, Clock, Globe } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
import ShareButtons from "@/components/ShareButtons";
import { useLanguage } from "@/hooks/useLanguage";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { t, articlesMeta } from "@/i18n/translations";
import TableOfContents from "@/components/TableOfContents";
import ImageLightbox from "@/components/ImageLightbox";
import andrewDrummondPost from "@/assets/andrew-drummond-post-court.png";
import fakeFbMessages from "@/assets/adam-howell-fake-fb-messages.jpg";
import adamHowellPassport from "@/assets/adam-howell-passport.jpeg";
import adamHowellRebillChat from "@/assets/adam-howell-rebill-chat.jpeg";
import adamHowellDmca from "@/assets/adam-howell-dmca-request.jpg";
import drummondDopecoinComment from "@/assets/drummond-dopecoin-comment.jpeg";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleNarration from "@/components/ArticleNarration";
import { PROSE_CLASSES } from "@/lib/constants";

const Index = () => {
  const { lang, localPath } = useLanguage();
  useReadingProgress();
  const tr = t[lang];
  const localArticles = articlesMeta[lang];
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const [translatedHtml, setTranslatedHtml] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);

  const handleArticleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" && target.closest(".prose")) {
      const img = target as HTMLImageElement;
      setLightbox({ src: img.src, alt: img.alt || "Evidence photo" });
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector(".prose");
    if (container) {
      container.addEventListener("click", handleArticleClick as EventListener);
      container.querySelectorAll("img").forEach((img) => {
        (img as HTMLElement).style.cursor = "zoom-in";
      });
    }
    return () => {
      container?.removeEventListener("click", handleArticleClick as EventListener);
    };
  }, [handleArticleClick]);

  // Translate Index page prose when in Thai — try DB cache first
  useEffect(() => {
    if (lang !== "th") {
      setTranslatedHtml(null);
      return;
    }
    let cancelled = false;
    const fetchTranslation = async () => {
      // Capture English HTML BEFORE showing skeleton
      const englishHtml = proseRef.current?.innerHTML || "";
      setTranslating(true);
      try {
        // Step 1: Try DB cache directly (instant)
        const { data: cached } = await supabase
          .from("article_translations")
          .select("translated_html")
          .eq("article_slug", "/")
          .eq("language", "th")
          .maybeSingle();

        if (!cancelled && cached?.translated_html) {
          setTranslatedHtml(cached.translated_html);
          setTranslating(false);
          return;
        }

        // Step 2: Fall back to edge function
        if (!englishHtml) { setTranslating(false); return; }

        const { data, error } = await supabase.functions.invoke("translate-article", {
          body: { slug: "/", html: englishHtml, targetLang: "th" },
        });

        if (cancelled) return;
        if (error || !data?.translated_html) {
          console.error("Index translation error:", error);
        } else {
          setTranslatedHtml(data.translated_html);
        }
      } catch (err) {
        if (!cancelled) console.error("Index translation fetch error:", err);
      } finally {
        if (!cancelled) setTranslating(false);
      }
    };
    const timer = setTimeout(fetchTranslation, 100);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [lang]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Adam Howell Warning",
        "url": "https://web-rescu.lovable.app",
        "description": "Documented evidence and investigative reports exposing Adam Howell's crypto fraud, rug pulls, and extortion schemes.",
        "publisher": { "@id": "https://web-rescu.lovable.app/#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://web-rescu.lovable.app/#organization",
        "name": "Adam Howell Warning",
        "url": "https://web-rescu.lovable.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://web-rescu.lovable.app/og-adam-howell.png",
        },
        "sameAs": [
          "https://twitter.com/adamhowellwarning",
        ],
      },
      {
        "@type": "Article",
        "headline": "Conduct Profile of Adam Howell – Birthdate 2nd of March 1982",
        "description": "Documented evidence exposing Adam Howell's crypto fraud, SuperDoge rug pull, DopeCoin pump-and-dump, extortion schemes, and defamation campaigns.",
        "author": { "@id": "https://web-rescu.lovable.app/#organization" },
        "publisher": { "@id": "https://web-rescu.lovable.app/#organization" },
        "datePublished": "2024-11-22",
        "dateModified": "2025-02-01",
        "mainEntityOfPage": "https://web-rescu.lovable.app",
      },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title="Adam Howell Public Warning – Crypto Fraud, Rug Pulls & Extortion"
        description="Documented evidence exposing Adam Howell's crypto fraud, SuperDoge rug pull, DopeCoin pump-and-dump, extortion schemes, and defamation campaigns."
        jsonLd={jsonLd}
      />
      {/* Hero Section */}
      <section className="relative bg-foreground text-background py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 50px, hsl(var(--primary) / 0.1) 50px, hsl(var(--primary) / 0.1) 51px)",
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">{tr.publicWarning}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === "th" ? "ประวัติพฤติกรรมของ Adam Howell – วันเกิด 2 มีนาคม 1982" : "Conduct Profile of Adam Howell – Birthdate 2nd of March 1982"}
            </h1>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mb-4">
              {lang === "th" ? "คำเตือนเกี่ยวกับ Adam Howell (ชาวแคนาดา)" : "Warning about Adam Howell (Canadian)"}
            </p>
            <div className="flex items-center gap-4 text-sm opacity-60 mb-4 flex-wrap">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {lang === "th" ? "22 พฤศจิกายน 2569" : "November 22, 2026"}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {lang === "th" ? "อ่าน 25 นาที" : "25 min read"}</span>
            </div>
            <div className="mb-4">
              <ShareButtons title={lang === "th" ? "ประวัติพฤติกรรมของ Adam Howell" : "Conduct Profile of Adam Howell – Birthdate 2nd of March 1982"} />
            </div>
            <ArticleNarration
              articleSlug={lang === "th" ? "/th" : "/"}
              articleText={lang === "th" ? "ประวัติพฤติกรรมของ Adam Howell วันเกิด 2 มีนาคม 1982 คำเตือนเกี่ยวกับ Adam Howell ชาวแคนาดา" : "Conduct Profile of Adam Howell. Warning about Adam Howell, a Canadian national with a documented history of online harassment, reputational attacks, fabricated allegations, and financially motivated disinformation campaigns."}
              language={lang}
            />
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{tr.investorProtection}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{tr.evidenceBasedResearch}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{tr.courtRecords}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      {translating && lang === "th" ? (
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="flex items-center gap-3 text-muted-foreground mb-6">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
            <span className="text-sm">กำลังแปลบทความ... โดยปกติจะใช้เวลา 5-10 วินาที</span>
          </div>
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          <Skeleton className="h-6 w-2/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ) : lang === "th" && translatedHtml ? (
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-muted/50 rounded-md text-xs text-muted-foreground w-fit">
              <Globe className="w-3 h-3" />
              แปลอัตโนมัติ · Auto-translated
            </div>
            <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: translatedHtml }} />
          </div>
        </article>
      ) : (
      <>
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div ref={proseRef} className={PROSE_CLASSES}>

            <p>
              This website has been established to provide risk-mitigation intelligence regarding Adam Howell, a Canadian national with a documented history of online harassment, reputational attacks, fabricated allegations, and financially motivated disinformation campaigns. Adam Howell has recently been paying Andrew Drummond to attack several business owners and people's families.
            </p>

            <p>
              Adam Howell approaches people, telling them his father threw him out into care homes, blaming his father for everything, saying his sister is also the bad one. But the truth is, he has severe personality disorders that made it impossible for anyone to have a relationship with, anyone that falls for his lies and victim stories, soon finds out what he's really like. He turns on everyone in the end, and he doesn't have any ethics or boundaries when it comes to personal information or any sensitive company data.
            </p>

            <p>
              He is not a serial entrepreneur, everything he has started has ended up with him burning everything down to the ground, by insulting and abusing investors, partners and staff. He has never paid back several people for all the loans he has taken since he arrived in Thailand, namely Per, his landlord, his dad and his visa lady. (who he also tried to get investment money from)
            </p>

            <p>
              Over an extended period, Howell has deployed a multi-platform escalation model—including YouTube, Odysee, Rumble, BitChute, Reddit, and social media—to disseminate a series of factually baseless accusations targeting individuals and businesses across Thailand and beyond.
            </p>

            <div className="md:flex md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={andrewDrummondPost} alt="Andrew Drummond's post about Adam Howell outside court" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">This photo was taken outside of court when Adam Howell lost his defamation case against Bryan Flowers.</figcaption>
              </figure>
              <div>
                <p>His conduct pattern aligns with high-risk behavioural indicators commonly observed in serial online agitators:</p>
                <ul>
                  <li>Repetitive defamation cycles</li>
                  <li>Fabricated claims packaged as "whistleblowing"</li>
                  <li>Financial misrepresentation during disputes</li>
                  <li>Creation of long-form conspiracy narratives</li>
                  <li>Pump-and-dump behaviour on fringe crypto assets</li>
                  <li>"Rebill" schemes and misleading commercial activity</li>
                </ul>
                <p>
                  This portal consolidates verified information, legal findings, and behavioural analysis to support due-diligence processes for anyone evaluating associations, partnerships, or investments involving Howell.
                </p>
              </div>
            </div>

            <p>
              This photo was taken outside of court when Adam Howell lost his defamation case against Bryan Flowers. He also faces 2 more criminal charges of false allegations, a cyber crime case and a civil case. You can see that Andrew Drummond is putting out his lies for him.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Overview of Howell's Harassment and Defamation Campaign Multi-Channel Orchestration</h2>

            <div className="md:flex md:flex-row-reverse md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={fakeFbMessages} alt="Fake Facebook messages from Adam Howell using alias Tom Davidson" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Screenshot submitted by one of Adam Howell's current victims — fake Facebook accounts used to spread threats and disinformation.</figcaption>
              </figure>
              <div>
                <p>
                  Following a financial dispute, (which Adam created in his own mind) Howell initiated a sustained digital hostility cycle, characterised using Andrew Drummond by:
                </p>
                <ul>
                  <li>Creating over 84+ defamatory videos, repeatedly republished after takedowns (Odysee, Rumble, YouTube, BitChute and Peertube). Andrew Drummond added all these videos to every single platform mentioned. <a href="https://andrewdrummondvideos.com/" target="_blank" rel="noopener noreferrer">andrewdrummondvideos.com</a></li>
                  <li>Transnational dissemination of false narratives into Thai-language channels.</li>
                  <li>Attempts to launder misinformation across social media ecosystems and mirrored websites.</li>
                </ul>
                <p>
                  The defamatory content against Bryan Flowers— his friends, his family, his wife, his business partners and others—was systematically debunked in the legal correspondence served under the UK Pre-Action Protocol for Media and Communications Claims. The record demonstrates that Howell's allegations were objectively false and legally unsustainable. These allegations were distributed by a blogger known for harassment and stalking individuals. (Andrew Drummond) who calls himself a journalist, but doesn't check Adams' claims or acknowledge any of the cases against Adam. In fact, Andrew Drummond lies on behalf of Adam Howell, who has made many claims, that not one person would back up.
                </p>
              </div>
            </div>

            <p>
              Below is a screenshot submitted to us by one of his current victims (Adam creates fake Facebook accounts to spread disinformation across Facebook groups), which has already been reported to the Canadian police, and they are taking it seriously. Adam lies about being cheated as an excuse to attack people. He has 3 cases against him in Thailand for false accusations, accusing people of selling child porn, fraud, money laundering and lots of other nasty stuff to damage people's reputation. People who have helped him for years. BE very careful about doing any business with him; he will destroy your reputation if you ever have the smallest issue. He has attacked many ex-partners who dared to ask for a larger salary or percentage, calling them scammers.
            </p>

            <p>
              Adam Howell has fled Thailand with 3 criminal cases against him and one civil case. Despite all this, he claims he has won a libel case against Bryan Flowers, but no such cases existed; he has even pretended that he is back in Thailand and made a new case. But the new case is just an appeal which was submitted by himself and Andrew Drummond's criminal friend. (No lawyer would sign it, and it wasn't a valid appeal, but Andrew Drummond published it as one.)
            </p>

            <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Adam Howell's Behaviour Pattern: A Corporate-Jargon Breakdown</h3>

            <div className="md:flex md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={adamHowellPassport} alt="Adam Howell's Canadian passport" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Adam Howell — Canadian passport, DOB 2nd March 1982</figcaption>
              </figure>
              <div>
                <h4>Manufactured Allegations as a Leverage Mechanism</h4>
                <p>Across multiple cases, Howell's operational pattern shows:</p>
                <ul>
                  <li><strong>Narrative Inflation:</strong> Minor disputes reframed as criminal conspiracies.</li>
                  <li><strong>False Whistleblower Positioning:</strong> Presenting unverified claims as "investigations."</li>
                  <li><strong>Hostile Communications Strategy:</strong> High-volume content drops designed to overwhelm reputational bandwidth.</li>
                  <li><strong>Selective Disclosure:</strong> Withholding contradictory evidence while amplifying unverified speculation.</li>
                </ul>
                <p>
                  In the Flowers matter, Howell positioned himself as a "victim-investor" while simultaneously propagating claims that were explicitly contradicted by court evidence, witness testimony, and police admissions.
                </p>
              </div>
            </div>

            <h4>Historic Attacks on Third Parties</h4>
            <p>
              Howell's conduct has followed a repeatable pattern against unrelated individuals, validating that this is not a single-incident conflict, but rather a documented behavioural template.
            </p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li><strong>Rob Dey</strong> – Howell previously launched an online campaign accusing Dey of misconduct without providing credible verification, mirroring the same rhetorical structure later used against Flowers. Adam was a good friend of Rob Dey and wanted to be his business partner, but after the business had a few road bumps, Adam has been attacking him for 5 or 6 years since.</li>
              <li><strong>Scott Schulz</strong> – Another individual subjected to extended online hostilities, rumour propagation, and defamatory positioning by Howell.</li>
            </ul>
            <p>These historical incidents demonstrate serial escalation behaviour, consistent with high-risk online aggressors who cycle targets over time.</p>

            <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Crypto-Related Pump-and-Dump Activity (Dope Coin &amp; Others)</h4>

            <div className="md:flex md:flex-row-reverse md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={adamHowellRebillChat} alt="Adam Howell rebill scam chat messages" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Adam is ashamed of his rebill scams, but not his dopecoin, which left lots of bag holders.</figcaption>
              </figure>
              <div>
                <p>A notable component of Howell's track record involves involvement in micro-cap cryptocurrency schemes, most notably:</p>
                <p><strong>Dope Coin (and similar fringe tokens)</strong></p>
                <ul>
                  <li>Howell is associated with early-stage hype cycles followed by rapid exit behaviour, characteristic of pump-and-dump operations.</li>
                  <li>These activities generated material losses for participants who relied on his promotional narratives.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Rest of page content rendered from original file lines 258+ */}
      {/* DMCA section, rebill section, legal section, evidence section, etc. */}
      <article className="py-0">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className={PROSE_CLASSES}>

            <p>
              This person has been repeatedly associated with pump-and-dump behaviour targeting low-cap or meme-based crypto tokens. These are coordinated schemes in which the person artificially inflates (pumps) a token's value—often using YouTube content, social media engagement, and direct messaging—before offloading (dumping) their holdings at peak price, leaving other investors with losses.
            </p>
            <p>
              His involvement in DopeCoin, a now-defunct cannabis-themed cryptocurrency, is well-documented. While initially framed as an innovative payment solution, the asset experienced price manipulation patterns consistent with retail-level pump-and-dump activity. Community discussions on platforms like BitcoinTalk.org and Reddit flagged price manipulation, abrupt developer absences, and broken roadmap promises.
            </p>

            <h4 style={{ fontFamily: "'Playfair Display', serif" }}>DMCA Abuse as a Censorship Strategy</h4>

            <div className="md:flex md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={adamHowellDmca} alt="Adam Howell's DMCA takedown request to suppress criticism" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Adam Howell's DMCA takedown request — using copyright claims as a censorship tool to suppress legitimate criticism.</figcaption>
              </figure>
              <div>
                <p>
                  A particularly concerning aspect of Howell's operational toolkit is the strategic misuse of the Digital Millennium Copyright Act (DMCA) takedown system.
                </p>
                <p>
                  Rather than using DMCA for its intended purpose—protecting original intellectual property—Howell uses it to file bogus removal requests against social media posts, YouTube videos, and forum discussions that expose his schemes. This effectively weaponises copyright law to suppress legitimate criticism and whistleblowing content.
                </p>
              </div>
            </div>

            <p>
              <strong>This tactic has been documented against:</strong>
            </p>
            <ul>
              <li>YouTube creators who published exposés about his crypto projects.</li>
              <li>Reddit users who shared verifiable warnings on cryptocurrency subreddits.</li>
              <li>Forum posters on BitcoinTalk who flagged irregularities in his projects.</li>
            </ul>
            <p>
              DMCA abuse undermines the integrity of online platforms and poses a direct threat to freedom of expression. It is also a potential violation of DMCA regulations, which include penalties for knowingly filing false claims. He also does this using Andrew Drummond's content that was written to boost his claims and present himself as a victim.
            </p>

            <h4 style={{ fontFamily: "'Playfair Display', serif" }}>"Rebill" Schemes and Misleading Commercial Structures</h4>
            <div className="md:flex md:flex-row-reverse md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={drummondDopecoinComment} alt="Drummond commenting on DopeCoin while defending Adam Howell" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Andrew Drummond commenting on DopeCoin while simultaneously defending Adam Howell's business activities.</figcaption>
              </figure>
              <div>
                <p>
                  Beyond the crypto space, Howell has been associated with online "rebill" models—subscription-based scams that charge consumers for unwanted recurring services disguised as one-time purchases or free trials.
                </p>
                <p>
                  While rebill schemes can sometimes exist in legal grey areas, they are widely recognised by consumer protection authorities as deceptive when they rely on:
                </p>
                <ul>
                  <li>Hidden terms in fine print</li>
                  <li>Pre-checked subscription boxes</li>
                  <li>Difficult or impossible cancellation flows</li>
                  <li>Misrepresented product quality or purpose</li>
                </ul>
              </div>
            </div>

            <p>
              This type of revenue model is consistent with the broader pattern of generating income through deceptive means, leveraging information asymmetry against unsuspecting users.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Legal Record &amp; Thai Court Outcomes</h2>

            <h4>Defamation Conviction (2025)</h4>
            <p>
              On August 28, 2025, Adam Howell was convicted of criminal defamation under Section 326 of the Thai Penal Code, receiving a six-month prison sentence, suspended for two years. This ruling confirms a Thai court's formal determination that the content Howell published about Bryan Flowers was legally defamatory and injurious.
            </p>
            <p>
              The conviction does not stand in isolation — it is part of a broader legal trajectory involving multiple unresolved criminal and civil claims in the Thai judicial system.
            </p>

            <h4>Pending Criminal &amp; Civil Cases</h4>
            <ul>
              <li><strong>Additional False Allegation Charges:</strong> Howell faces two further criminal complaints, stemming from separate allegations of false accusations against third parties.</li>
              <li><strong>Cybercrime Complaint:</strong> Filed under Thailand's Computer Crimes Act, this charge appears to relate to the digital distribution of defamatory and fabricated material.</li>
              <li><strong>Civil Defamation Suit (Filed Jan 22, 2026):</strong> An additional civil claim from Bryan Flowers is now underway, which carries the potential for significant financial penalties.</li>
            </ul>
            <p>
              Despite these obligations, Howell is currently reported to be outside Thailand and, according to sources, is avoiding judicial appearance.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Evidence Repository</h2>

            <p>
              This section consolidates primary and secondary evidence linked to the behavioural and operational pattern outlined above. Each item is documented from verifiable public sources or third-party records.
            </p>

            <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Key Sources</h3>
            <ul>
              <li><strong>BitcoinTalk.org threads:</strong> Early-stage DopeCoin discussions flagging irregularities and developer silence.</li>
              <li><strong>Reddit threads (r/CryptoCurrency, r/CryptoScams):</strong> Community warnings and first-person accounts of losses linked to Howell-promoted projects.</li>
              <li><strong>YouTube content archives:</strong> Copies or references to takedown-targeted videos that originally exposed Howell's behaviour.</li>
              <li><strong>Legal correspondence (Pre-Action Protocol):</strong> Formal UK legal filings from Flowers' legal team, outlining factual rebuttals to Howell's claims.</li>
              <li><strong>Thai court records (Public Court No.):</strong> Verification of the August 28, 2025 conviction and pending charges. (can be verified via Lawyers in Thailand)</li>
              <li><strong>DMCA complaint logs:</strong> Evidence of repeated misuse of copyright claims to suppress exposure.</li>
            </ul>

            <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Document Index</h3>
            <p>
              The following items are available as reference material or archived evidence. If you are conducting due diligence on Adam Howell, this index will be useful.
            </p>
            <ul>
              <li>Court judgement summary – Criminal Case (Aug 2025)</li>
              <li>Correspondence archive – UK Pre-Action Protocol</li>
              <li>DopeCoin market activity analysis (2014–2020)</li>
              <li>DMCA false claims timeline</li>
              <li>Facebook account network – Howell aliases</li>
              <li>Witness statements (redacted for privacy)</li>
            </ul>

            <blockquote>
              <p>This information is compiled in good faith for the purposes of investor protection, consumer awareness, and freedom of expression. It does not constitute legal advice. For verification or legal consultation, please engage a qualified legal professional in the relevant jurisdiction.</p>
            </blockquote>
          </div>
        </div>
      </article>
      </>
      )}

      {/* Articles Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {tr.investigativeReports}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {localArticles.map((article) => (
              <Link
                key={article.slug}
                to={localPath(article.slug)}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-0.5"
              >
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
                  {article.tag}
                </span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  <span className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {tr.readMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                {tr.investorEducation}
              </h2>
            </div>
            <Link to={localPath("/blog")} className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
              {tr.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {blogArticles.slice(0, 8).map((article) => (
              <Link
                key={article.slug}
                to={localPath(`/blog/${article.slug}`)}
                className="group bg-card border rounded-lg p-4 hover:shadow-md transition-all hover:border-primary/30"
              >
                <div className="flex flex-wrap gap-1 mb-2">
                  {article.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {article.title}
                </h3>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TableOfContents />
      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </Layout>
  );
};

export default Index;
