import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { AlertTriangle, FileText, ArrowRight, Shield, Eye, Calendar, Clock } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";
import andrewDrummondPost from "@/assets/andrew-drummond-post-court.png";
import fakeFbMessages from "@/assets/adam-howell-fake-fb-messages.jpg";
import adamHowellPassport from "@/assets/adam-howell-passport.jpeg";
import adamHowellRebillChat from "@/assets/adam-howell-rebill-chat.jpeg";
import adamHowellDmca from "@/assets/adam-howell-dmca-request.jpg";
import drummondDopecoinComment from "@/assets/drummond-dopecoin-comment.jpeg";

const articles = [
  {
    slug: "/unmasking-adam-howell",
    title: "Unmasking Adam Howell: The Serial Scammer, Extortionist, and Crypto Fraudster",
    excerpt: "A comprehensive exposé compiling documented evidence from court records, victim accounts, and public exposes to highlight patterns of deception and failure.",
    tag: "Featured Investigation",
    readTime: "15 min read",
  },
  {
    slug: "/superdoge-rug-pull",
    title: "Exposing the SuperDoge Rug Pull: Adam Howell's Charity-Fueled Crypto Scam",
    excerpt: "Dissecting how SuperDoge operated, the red flags ignored, the unprofessional tactics employed, and the potential legal violations that scream fraud.",
    tag: "Deep Dive",
    readTime: "45 min read",
  },
  {
    slug: "/investigative-report",
    title: "Uncovering the Trail of Adam Howell's Ventures in Crypto and Beyond",
    excerpt: "Mapping out Adam Howell's history through public records, forum archives, crypto news sites, social media, and whistleblower accounts.",
    tag: "Investigative Report",
    readTime: "20 min read",
  },
  {
    slug: "/superdoge-scam-update",
    title: "Exposing the SuperDoge Scam – Anonymous Pitch, Vanished Promises, and Inner Circle Ties",
    excerpt: "A revealing 2021 podcast appearance that showcases Howell's tactics — hiding behind anonymity, dragging credible figures, and warning about scams to position himself as trustworthy.",
    tag: "Update",
    readTime: "15 min read",
  },
  {
    slug: "/keith-shingleton-david-edwards",
    title: "Deep Dive on Keith Shingleton, David Edwards and Connections to Adam Howell",
    excerpt: "Examining the inner circle and mechanisms behind the alleged scams — from co-authored whitepapers to unverified LinkedIn achievements.",
    tag: "Associates",
    readTime: "18 min read",
  },
  {
    slug: "/the-architect-of-deception-and-adam-howells-web-of-accomplices",
    title: "The Architect of Deception and Adam Howell's Web of Accomplices",
    excerpt: "Key enablers like Andrew Drummond and Kanokrat form the backbone of extortion tactics, turning personal grudges into profitable smear operations.",
    tag: "Network Analysis",
    readTime: "12 min read",
  },
  {
    slug: "/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned",
    title: "Exposing the SuperDoge Rug Pull: Adam Howell's Latest Crypto Scheme and the Millions Potentially Siphoned",
    excerpt: "A comprehensive investigative report into the SuperDoge token, its team, blockchain evidence, and estimated losses.",
    tag: "Investigative Report",
    readTime: "35 min read",
  },
];

const Index = () => {
  return (
    <Layout>
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
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Public Warning</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Conduct Profile of Adam Howell – Birthdate 2nd of March 1982
            </h1>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mb-4">
              Warning about Adam Howell (Canadian)
            </p>
            <div className="flex items-center gap-4 text-sm opacity-60 mb-8">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> November 22, 2026</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 25 min read</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Investor Protection</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Evidence-Based Research</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Court Records & Public Sources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h4:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

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
                  <li>Post-collapse, Howell often diverts blame to third parties, continuing the pattern of adversarial displacement.</li>
                </ul>
                <p>He raised 2m USD deceiving his dopecoin supporters, his final attempt was to do a fork which didn't raise as much as he could.</p>
                <p>He did lots of NFT scams, paying for social media comments, likes and views to raise lots of cash.</p>
                <p>This behaviour elevates counterparty risk for anyone considering financial engagement with him.</p>
              </div>
            </div>

            <h4>"Rebill" Schemes and Questionable Commercial Practices</h4>
            <p>Multiple individuals have reported Howell's involvement in online rebill-based revenue models, often designed to:</p>
            <ul>
              <li>Lock consumers into recurring billing unknowingly</li>
              <li>Obscure cancellation pathways</li>
              <li>Exploit gaps in consumer-protection oversight</li>
            </ul>
            <p>
              These tactics are aligned with high-risk "grey-zone commerce models" that routinely trigger disputes, chargebacks, and regulatory scrutiny.
            </p>

            <h5 style={{ fontFamily: "'Playfair Display', serif" }}>Howell's Defamation Campaign Against Bryan Flowers</h5>

            <h4>Fabrication of Criminal Allegations</h4>
            <p>Howell repeatedly accused Flowers of:</p>
            <ul>
              <li>Human trafficking</li>
              <li>Child trafficking</li>
              <li>Fraud</li>
              <li>Operating "mafia-style" criminal enterprises. Here is one of 6 channels which Adam Howell created to try and destroy Bryan Flower's reputation and everything he's got. Look at the nastiness of the videos and the videos doxing his family. (these videos were originally uploaded by Andrew Drummond on his old youtube channel. <a href="https://odysee.com/@Soi6Whistleblower:9" target="_blank" rel="noopener noreferrer">odysee.com/@Soi6Whistleblower:9</a></li>
            </ul>
            <p>
              Adam Howell has paid Andrew Drummond to create 15+ articles in an attempt to extort Bryan, by going after all of his businesses, business partners, family, friends and false police reports. He has no evidence for any of it, but Andrew is a fake journalist that ignores the fact that Adam Howell is crazy and can't produce any evidence. He has even pretended that he won a case against Bryan Flowers, which has no truth to it at all and he ran off from Thailand from all the cases against him.
            </p>
            <p>All of these allegations were unequivocally disproven in the legal analysis issued by Cohen Davis Solicitors and in Thailand to the police and the courts.</p>

            <h4>Absence of Evidence and Manipulation of Sources</h4>
            <p>The legal correspondence confirms:</p>
            <ul>
              <li>Howell's claims had no evidentiary foundation.</li>
              <li>Howell relied on coerced testimony, discredited police processes, and unverified rumours.</li>
              <li>Several videos were built entirely on hearsay, speculation, and narrative engineering.</li>
            </ul>

            <h4>Part of a Larger Harassment Ecosystem</h4>
            <p>The volume, cadence, and cross-platform distribution of Howell's content meet the criteria for:</p>
            <ul>
              <li>A course of conduct under the UK Protection from Harassment Act</li>
              <li>A structured campaign of vilification</li>
              <li>Behaviour causing predictable emotional and reputational harm</li>
            </ul>

            <h4>Why This Website Exists: Public-Interest Disclosure</h4>
            <p>This site serves three strategic purposes:</p>
            <ol>
              <li><strong>Counter-Disinformation Transparency:</strong> Provide clear, factual information for individuals evaluating Howell's credibility.</li>
              <li><strong>Due-Diligence Enablement:</strong> Investors, partners, and stakeholders can use this platform as a risk-screening resource.</li>
              <li><strong>Consumer and Industry Protection:</strong> Prevent others from entering financial, professional, or personal arrangements without full awareness of Howell's behavioural profile.</li>
            </ol>

            <h6 style={{ fontFamily: "'Playfair Display', serif" }}>Key Takeaways for Future Stakeholders</h6>

            <div className="md:flex md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={drummondDopecoinComment} alt="Andrew Drummond commenting on Adam Howell's DopeCoin involvement" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Andrew Drummond confirms Adam Howell's involvement with DopeCoin</figcaption>
              </figure>
              <div>
                <p>Any prospective engagement with Adam Howell should incorporate the following risk-adjusted contingencies:</p>
                <ul>
                  <li><strong>Elevated defamation risk</strong> – Howell frequently retaliates very small issues with smear campaigns.</li>
                  <li><strong>Financial exposure risk</strong> – History of pump-and-dump and rebill schemes.</li>
                  <li><strong>Reputational volatility</strong> – He constructs multi-channel narratives that persist even after factual debunking.</li>
                  <li><strong>Operational unpredictability</strong> – His behaviour pattern includes sudden escalation cycles and adversarial framing.</li>
                </ul>
                <p>Stakeholders should request full transparency, implement enhanced due-diligence protocols, and document all interactions.</p>
              </div>
            </div>

            <p>
              Adam Howell went to Pattaya, Thailand, to have sex with lots of prostitutes, and he invested in some bars. Then he tried to extort his partners for 55m baht (later 110m, then 150m) baht using Andrew Drummond as part of his threats. (he said in front of police officers that he needs to be paid 55m or he will go to Andrew Drummond, someone that he deeply despised before because Andrew hates bar owners) When that failed.
            </p>
            <p>
              Andrew Drummond created 13 articles and multiple social media posts. Adam Howell sent screenshots of private conversations with people who had helped him for years. This is a person whom no one can trust. He tried to ruin everyone's marriages and acted like he never paid for sex.
            </p>

            <div className="md:flex md:flex-row-reverse md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={adamHowellDmca} alt="Adam Howell DMCA takedown request showing his email address" className="rounded-lg shadow-lg w-full" />
                <figcaption className="text-sm text-muted-foreground mt-2">Adam Howell is trying to get this website removed — using the same email address linked to attacks on multiple people.</figcaption>
              </figure>
              <div>
                <p>
                  Andrew Drummond insists that the bars in Thailand are a prostitution business, but they make money from alcohol, not money from what the girls make outside of the bars. He is adding his own moral judgment to all his articles, but he used to frequent bars for sex also, until he was kicked out of Thailand 20 years ago. Andrew Drummond's main informant (whom he admitted) and friend, Ricky Pandora, in Pattaya owns a well-known blow job bar called Lips Lounge on Soi Honey, which is a soi known for happy endings. It is strange that Andrew was a customer of Ricky's years ago and attacked his whole business model. If Andrew hates these bars so much, why is he friends with Ricky? But the truth is, Andrew just uses Bryan's ownership of bars as an excuse to attack Bryan.
                </p>
                <p>
                  Adam Howell is trying to get this website removed, you can see he's using the same email address, which several platforms have confirmed are behind many attacks on people such as Bryan Flowers, he falsely calls Andrew Drummond's blog attacks "news" and he admits he is the one sending all the lies and rubbish to Andrew Drummond, this is being used for evidence in current cases against him.
                </p>
              </div>
            </div>

            <p>
              He used the same email address to sign up to several Thai and Cambodian forums to spread false information, mostly targeting Bryan's wife. He posted an AI video about Bryan's wife not coming home from jail to see her children.
            </p>

            <p>
              The video below was posted by Adam Howell on several forums using his own email address, we have 100% proof. He created this video and posted it, the day he told everyone that Bryan Flowers' wife was put in jail for 3 years. (wasn't true) Adam has targeted Bryan's wife and children repeatedly, mostly through Andrew Drummond as his hired troll. We have documented their attacks on Quora, Reddit, Odysee, Rumble, YouTube, Bitchute, Peertube, Facebook, Facebook and LinkedIn. Luckily, most of it has been taken down, but there are still lots of lies, abuse and harassment left up. (and they repost)
            </p>

            {/* YouTube Embed */}
            <div className="my-8 aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/oDXeUjnsbgg?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
                title="Adam Howell AI-generated disinformation video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="md:flex md:gap-6 my-8">
              <figure className="md:w-1/3 shrink-0 mb-4 md:mb-0">
                <img src={adamHowellPassport} alt="Adam Howell identification" className="rounded-lg shadow-lg w-full" />
              </figure>
              <div>
                <p>
                  If Adam Howell wishes to get this website removed, he needs to delete, apologise and stop all attacks on everyone. This includes deleting the Rumble/Odysee videos he has put up with Andrew Drummond, all the Reddit attacks and the Quora attacks. He will never ever change or be sorry, he will continue attacking all his victims until the end. His alcohol and drug addiction is the reason he won't/can't get a job, it's nothing to do with his nasty behaviour towards the people around him. (including his mum and sister)
                </p>
                <p>
                  You can read more about the person whom Adam Howell is paying to harass several people — Andrew Drummond and 2 of his helpers:{" "}
                  <a href="https://andrewdrummondlinks.com/" target="_blank" rel="noopener noreferrer">andrewdrummondlinks.com</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* Articles Grid */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Investigative Reports
          </h2>
          <p className="text-muted-foreground mb-10">In-depth articles documenting the evidence trail.</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={article.slug}
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
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Crypto Scam Warning Blog
              </h2>
              <p className="text-muted-foreground">Educational articles on identifying and avoiding cryptocurrency fraud.</p>
            </div>
            <Link to="/blog" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogArticles.slice(0, 6).map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 hover:-translate-y-0.5"
              >
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
                  {article.tags[0]}
                </span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  <span className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="text-primary font-medium hover:underline">View all blog articles →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-t py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Have Information to Share?
          </h2>
          <p className="text-muted-foreground">
            If you've been a victim of Adam Howell's schemes or have evidence to contribute, reach out through secure channels. Protecting future investors starts with transparency.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
