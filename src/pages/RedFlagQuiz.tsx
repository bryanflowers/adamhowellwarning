import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, RotateCcw, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Question {
  id: number;
  scenario: string;
  options: { text: string; isRedFlag: boolean; explanation: string }[];
  correctCount: number;
}

const questions: Question[] = [
  {
    id: 1,
    scenario: "A new DeFi token launches with an anonymous team, promising 500% APY through 'revolutionary AI trading.' The liquidity is unlocked, and the Telegram group bans anyone asking technical questions.",
    options: [
      { text: "Anonymous team with no track record", isRedFlag: true, explanation: "Legitimate teams stake their reputation. Anonymous founders can vanish with funds." },
      { text: "500% APY promise", isRedFlag: true, explanation: "Unsustainable yields are the hallmark of Ponzi schemes." },
      { text: "Unlocked liquidity", isRedFlag: true, explanation: "Unlocked liquidity means devs can drain the pool at any time." },
      { text: "Censored Telegram group", isRedFlag: true, explanation: "Suppressing questions is a classic tactic to prevent scrutiny." },
    ],
    correctCount: 4,
  },
  {
    id: 2,
    scenario: "A well-known blockchain project announces a partnership with a Fortune 500 company. The team is fully doxxed, the code is audited by CertiK, and liquidity is locked for 2 years. However, the token price suddenly spikes 300% in 24 hours.",
    options: [
      { text: "Audited by CertiK", isRedFlag: false, explanation: "A reputable audit is a positive sign, not a red flag." },
      { text: "Doxxed team", isRedFlag: false, explanation: "Transparent teams are typically trustworthy." },
      { text: "300% price spike in 24 hours", isRedFlag: true, explanation: "Rapid price spikes can indicate coordinated pump activity, even on legit projects." },
      { text: "Locked liquidity for 2 years", isRedFlag: false, explanation: "Long liquidity locks protect investors." },
    ],
    correctCount: 1,
  },
  {
    id: 3,
    scenario: "An NFT project promises metaverse integration, play-to-earn gaming, and celebrity partnerships. The roadmap stretches 3 years but the team has no prior completed projects. Mint price is 0.5 ETH with a 10,000 supply.",
    options: [
      { text: "Overly ambitious roadmap", isRedFlag: true, explanation: "Unrealistic promises without a track record suggest the team can't deliver." },
      { text: "No prior completed projects", isRedFlag: true, explanation: "Teams with no delivery history are high risk." },
      { text: "0.5 ETH mint price", isRedFlag: false, explanation: "Price alone isn't a red flag — it depends on the project value." },
      { text: "Celebrity partnership claims", isRedFlag: true, explanation: "Unverified celebrity endorsements are frequently fabricated." },
    ],
    correctCount: 3,
  },
  {
    id: 4,
    scenario: "A crypto influencer with 2M followers promotes a meme coin, saying 'This is financial advice — buy now before it's too late!' The token was created 3 days ago, the top wallet holds 40% of supply, and the smart contract has an unverified code on Etherscan.",
    options: [
      { text: "Influencer saying 'this is financial advice'", isRedFlag: true, explanation: "Legitimate promoters always disclaim. This is reckless or a paid shill." },
      { text: "Token created 3 days ago", isRedFlag: true, explanation: "Brand new tokens with aggressive marketing are classic pump-and-dumps." },
      { text: "40% held by one wallet", isRedFlag: true, explanation: "Concentrated holdings mean one entity can crash the price." },
      { text: "Unverified smart contract", isRedFlag: true, explanation: "Unverified code can contain hidden functions to steal funds." },
    ],
    correctCount: 4,
  },
  {
    id: 5,
    scenario: "SuperDoge launched with promises of charitable donations and a doxxed team. However, the 'charity wallet' transactions don't match announcements, the lead developer appeared anonymously on a podcast, and the project raised $13M before going silent.",
    options: [
      { text: "Charity claims don't match on-chain data", isRedFlag: true, explanation: "If announced donations aren't verifiable on-chain, they likely didn't happen." },
      { text: "Lead dev appeared anonymously", isRedFlag: true, explanation: "Why hide your identity if you're doing legitimate charitable work?" },
      { text: "$13M raised before going silent", isRedFlag: true, explanation: "Raising millions then going quiet is the textbook exit scam pattern." },
      { text: "The project had a website", isRedFlag: false, explanation: "Having a website alone is not suspicious — every project has one." },
    ],
    correctCount: 3,
  },
  {
    id: 6,
    scenario: "A DeFi protocol offers a 'risk-free' staking mechanism with 50% monthly returns. The docs say returns come from 'proprietary trading algorithms.' The team is based in an unregulated jurisdiction and has no third-party audit.",
    options: [
      { text: "'Risk-free' claim", isRedFlag: true, explanation: "Nothing in crypto is risk-free. This is misleading marketing." },
      { text: "50% monthly returns", isRedFlag: true, explanation: "600% annual return is unsustainable and screams Ponzi." },
      { text: "Vague 'proprietary algorithms'", isRedFlag: true, explanation: "If you can't explain where returns come from, the investors ARE the returns." },
      { text: "No third-party audit", isRedFlag: true, explanation: "Unaudited DeFi protocols have the highest exploit and rug-pull rates." },
    ],
    correctCount: 4,
  },
  {
    id: 7,
    scenario: "A token project does a fair launch with no presale. The contract is open-source and verified. However, dev wallets received 15% of supply 'for development,' and the team announced 3 exchange listings that never materialized.",
    options: [
      { text: "Fair launch with no presale", isRedFlag: false, explanation: "Fair launches are generally a positive sign for token distribution." },
      { text: "Open-source verified contract", isRedFlag: false, explanation: "Transparency in code is good practice." },
      { text: "15% dev allocation", isRedFlag: true, explanation: "Large dev allocations can be used for dumps, especially without vesting." },
      { text: "Fake exchange listing announcements", isRedFlag: true, explanation: "Announcing partnerships that never happen is deceptive hype-building." },
    ],
    correctCount: 2,
  },
  {
    id: 8,
    scenario: "A yield farm requires you to lock tokens for 90 days minimum. The APY drops from 1000% to 200% in the first week. The protocol has been forked from a known rugpull project, and the team uses pseudonyms but is active in governance.",
    options: [
      { text: "90-day lock requirement", isRedFlag: true, explanation: "Forced lock-ups prevent you from exiting if things go wrong." },
      { text: "APY dropping from 1000% to 200%", isRedFlag: false, explanation: "Declining APY is normal as more capital enters — this is expected behavior." },
      { text: "Forked from a known rugpull", isRedFlag: true, explanation: "Code from a rugpull may contain the same malicious functions." },
      { text: "Pseudonymous but active governance", isRedFlag: false, explanation: "Active governance with pseudonyms is common in DeFi and not inherently suspicious." },
    ],
    correctCount: 2,
  },
  {
    id: 9,
    scenario: "Adam Howell launched DopeCoin, promoting it across social media with big promises. After the initial pump, he allegedly exited his position and blamed others when the price crashed. He then moved on to SuperDoge with the same pattern.",
    options: [
      { text: "Serial project launches by same person", isRedFlag: true, explanation: "Repeated launch-hype-abandon cycles by the same person is a massive red flag." },
      { text: "Blaming others after price crash", isRedFlag: true, explanation: "Deflecting blame is a classic scammer tactic to avoid accountability." },
      { text: "Moving to a new project immediately", isRedFlag: true, explanation: "Abandoning one project to start another suggests profit extraction, not building." },
      { text: "Social media promotion", isRedFlag: false, explanation: "Marketing itself isn't a red flag — it's normal for any project." },
    ],
    correctCount: 3,
  },
  {
    id: 10,
    scenario: "A new token offers a 'DMCA takedown service' to remove negative reviews about crypto projects. The founder has multiple lawsuits for defamation in Thailand, uses fake Facebook accounts to threaten critics, and claims to be a 'serial entrepreneur' despite no successful exits.",
    options: [
      { text: "DMCA abuse to silence critics", isRedFlag: true, explanation: "Using legal threats to suppress legitimate criticism is a suppression tactic." },
      { text: "Multiple defamation lawsuits", isRedFlag: true, explanation: "A pattern of litigation against critics suggests someone with something to hide." },
      { text: "Fake social media accounts for threats", isRedFlag: true, explanation: "Sock puppet accounts for intimidation is textbook online harassment." },
      { text: "'Serial entrepreneur' with no exits", isRedFlag: true, explanation: "Self-proclaimed titles without verifiable success are empty credentialism." },
    ],
    correctCount: 4,
  },
];

const getRating = (score: number, total: number) => {
  const pct = score / total;
  if (pct >= 0.9) return { label: "Elite Scam Detective 🕵️", color: "text-green-500", desc: "You can spot a rug pull from orbit." };
  if (pct >= 0.7) return { label: "Sharp Investor 🔍", color: "text-blue-500", desc: "You catch most red flags — stay vigilant!" };
  if (pct >= 0.5) return { label: "Learning the Ropes 📚", color: "text-yellow-500", desc: "You're getting there. Study up on common tactics." };
  return { label: "Easy Target 🎯", color: "text-destructive", desc: "You'd benefit from reading our investigative articles." };
};

const RedFlagQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<boolean[]>(() => Array(questions[0].options.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalFlags, setTotalFlags] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    let correct = 0;
    question.options.forEach((opt, i) => {
      if ((selected[i] && opt.isRedFlag) || (!selected[i] && !opt.isRedFlag)) correct++;
    });
    setScore((s) => s + correct);
    setTotalFlags((t) => t + question.options.length);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(Array(questions[currentQ + 1].options.length).fill(false));
      setSubmitted(false);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(Array(questions[0].options.length).fill(false));
    setSubmitted(false);
    setScore(0);
    setTotalFlags(0);
    setFinished(false);
  };

  const rating = getRating(score, totalFlags);

  return (
    <Layout>
      <Helmet>
        <title>Spot the Red Flag Quiz — Test Your Crypto Scam Detection Skills</title>
        <meta name="description" content="Can you spot the red flags in crypto projects? Take our interactive quiz based on real-world scam scenarios and get your Scam Detector Rating." />
        <meta property="og:title" content="Spot the Red Flag — Crypto Scam Detection Quiz" />
        <meta property="og:description" content="Can you spot the red flags in crypto projects? Test your skills with real-world scam scenarios." />
        <meta property="og:image" content="https://web-rescu.lovable.app/og-adam-howell.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Spot the Red Flag — Crypto Scam Detection Quiz" />
        <meta name="twitter:description" content="Can you spot the red flags in crypto projects? Test your skills with real-world scam scenarios." />
        <meta name="twitter:image" content="https://web-rescu.lovable.app/og-adam-howell.png" />
      </Helmet>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Spot the Red Flag
              </h1>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Read real-world crypto scenarios and identify the red flags. How sharp is your scam detector?
            </p>
          </div>

          {!finished ? (
            <div className="bg-card border rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">Question {currentQ + 1} / {questions.length}</Badge>
                <span className="text-sm text-muted-foreground">Score: {score}/{totalFlags}</span>
              </div>
              <Progress value={((currentQ + (submitted ? 1 : 0)) / questions.length) * 100} className="mb-6 h-2" />

              <p className="text-sm leading-relaxed mb-6 text-foreground">{question.scenario}</p>

              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                Select all red flags:
              </p>
              <div className="space-y-3 mb-6">
                {question.options.map((opt, i) => {
                  const isSelected = selected[i];
                  let borderClass = "border-border";
                  if (submitted) {
                    if (opt.isRedFlag && isSelected) borderClass = "border-green-500 bg-green-500/10";
                    else if (opt.isRedFlag && !isSelected) borderClass = "border-yellow-500 bg-yellow-500/10";
                    else if (!opt.isRedFlag && isSelected) borderClass = "border-destructive bg-destructive/10";
                    else borderClass = "border-border";
                  } else if (isSelected) {
                    borderClass = "border-primary bg-primary/10";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      aria-pressed={!!isSelected}
                      role="checkbox"
                      aria-checked={!!isSelected}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${borderClass} ${!submitted ? "hover:border-primary/50 cursor-pointer" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        {submitted ? (
                          opt.isRedFlag ? (
                            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          )
                        ) : (
                          <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 ${isSelected ? "bg-primary border-primary" : "border-muted-foreground"}`} />
                        )}
                        <div>
                          <p className="text-sm font-medium">{opt.text}</p>
                          {submitted && <p className="text-xs text-muted-foreground mt-1">{opt.explanation}</p>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3">
                {!submitted ? (
                  <Button onClick={handleSubmit} disabled={!selected.some(Boolean)}>
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {currentQ + 1 >= questions.length ? "See Results" : "Next Question"}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-card border rounded-xl p-8 text-center">
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Scam Detector Rating
              </h2>
              <div className={`text-4xl font-black mb-2 ${rating.color}`}>{rating.label}</div>
              <p className="text-muted-foreground mb-4">{rating.desc}</p>
              <p className="text-lg font-bold mb-6">
                {score} / {totalFlags} correct identifications ({Math.round((score / totalFlags) * 100)}%)
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Button onClick={restart} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
                <Button
                  onClick={() => {
                    const text = `I scored ${Math.round((score / totalFlags) * 100)}% on the Spot the Red Flag crypto quiz! Rating: ${rating.label}`;
                    if (navigator.share) {
                      navigator.share({ text, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(`${text} ${window.location.href}`);
                      toast.success("Result copied to clipboard!");
                    }
                  }}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" /> Share Result
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RedFlagQuiz;
