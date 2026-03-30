// Blog hero image mapping - slug to image file key
const slugToImageKey: Record<string, string> = {
  "how-to-identify-crypto-rug-pulls": "hero-rug-pulls",
  "pump-and-dump-schemes-cryptocurrency": "hero-pump-dump",
  "nft-scam-red-flags": "hero-nft-scams",
  "crypto-ponzi-schemes-explained": "hero-ponzi",
  "social-media-crypto-scams": "hero-social-media",
  "fake-crypto-exchanges-warning": "hero-fake-exchanges",
  "crypto-phishing-attacks-guide": "hero-phishing",
  "romance-scams-cryptocurrency": "hero-romance-scams",
  "fake-ico-scams-warning": "hero-fake-ico",
  "crypto-investment-fraud-warning-signs": "hero-warning-signs",
  "celebrity-crypto-endorsement-scams": "hero-celebrity-scams",
  "defi-rug-pulls-how-they-work": "hero-defi-rugpull",
  "crypto-wallet-scams-protection": "hero-wallet-scams",
  "telegram-discord-crypto-scams": "hero-telegram-discord",
  "crypto-recovery-scams": "hero-recovery-scams",
  "fake-crypto-airdrops": "hero-fake-airdrops",
  "crypto-mining-scams": "hero-mining-scams",
  "meme-coin-scams-warning": "hero-meme-coins",
  "crypto-blackmail-extortion-scams": "hero-blackmail",
  "how-to-report-crypto-fraud": "hero-report-fraud",
  "cryptocurrency-due-diligence-checklist": "hero-due-diligence",
  "insider-trading-crypto-markets": "hero-insider-trading",
  "exit-scam-warning-signs": "hero-exit-scam",
  "smart-contract-honeypot-scams": "hero-honeypot",
  "wash-trading-crypto-explained": "hero-wash-trading",
  "crypto-tax-evasion-scams": "hero-tax-scams",
  "dao-governance-attacks": "hero-dao-attacks",
  "crypto-influencer-accountability": "hero-influencer-fraud",
  "layer2-bridge-exploits": "hero-bridge-exploits",
  "address-poisoning-attacks": "hero-address-poisoning",
  "seed-phrase-security-guide": "hero-seed-phrase",
  "stablecoin-depegging-risks": "hero-stablecoin",
  "crypto-scam-psychology": "hero-psychology",
  "crypto-mixer-money-laundering": "hero-mixers",
  "fake-crypto-jobs-scams": "hero-fake-jobs",
  "oracle-manipulation-defi": "hero-oracle-attacks",
  "rug-pull-recovery-what-to-do": "hero-post-rugpull",
  "metaverse-land-scams": "hero-metaverse",
  "crypto-aml-compliance-explained": "hero-aml-kyc",
  "social-engineering-crypto-attacks": "hero-social-engineering",
};

export function getHeroImageForSlug(slug: string): string | undefined {
  const key = slugToImageKey[slug];
  if (!key) return undefined;
  return `/blog/${key}.jpg`;
}
