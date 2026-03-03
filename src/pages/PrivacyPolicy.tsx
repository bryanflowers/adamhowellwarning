import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { PROSE_CLASSES } from "@/lib/constants";

const BASE_URL = "https://adamhowellwarning.com";

const content = {
  en: {
    title: "Privacy Policy",
    metaDesc: "Privacy policy for AdamHowellWarning.com — what data we collect, how it's used, and your rights.",
    dataCollected: "What Data We Collect",
    dataCollectedText: "We collect minimal personal data. The only information collected is what you voluntarily provide through:",
    dataList: [
      "Contact form submissions (name, email, message) — used solely to respond to victim reports and tips",
      "Comments on articles (display name, comment text) — subject to moderation before publication",
    ],
    howUsed: "How Your Data Is Used",
    howUsedText: "Contact form submissions are used exclusively for victim support and investigative tip processing. Comments are reviewed for relevance and published at our discretion. We do not sell, share, or trade personal data with third parties for marketing purposes.",
    cookies: "Cookies & Analytics",
    cookiesText: "This site does not use tracking cookies or third-party analytics services. No advertising networks or retargeting pixels are present.",
    thirdParty: "Third-Party Services",
    thirdPartyText: "This site uses the following third-party services for functionality:",
    thirdPartyList: [
      "Text-to-speech narration (ElevenLabs) — article audio is generated server-side and no user data is sent",
      "AI music generation (Suno) — used for creating educational music content, no user data involved",
    ],
    retention: "Data Retention",
    retentionText: "Contact form submissions and comments are retained indefinitely for investigative and archival purposes. You may request deletion of your submitted data by contacting us.",
    rights: "Your Rights",
    rightsText: "You have the right to request access to, correction of, or deletion of any personal data you have submitted through this site. Contact us through the victim contact form to exercise these rights.",
    contact: "Contact",
    contactText: "For privacy-related inquiries, use the secure contact form available on this site.",
    lastUpdated: "Last updated: February 2026",
  },
  th: {
    title: "นโยบายความเป็นส่วนตัว",
    metaDesc: "นโยบายความเป็นส่วนตัวสำหรับ AdamHowellWarning.com — ข้อมูลที่เราเก็บ การใช้งาน และสิทธิ์ของคุณ",
    dataCollected: "ข้อมูลที่เราเก็บรวบรวม",
    dataCollectedText: "เราเก็บรวบรวมข้อมูลส่วนบุคคลน้อยที่สุด ข้อมูลที่เก็บรวบรวมมีเฉพาะสิ่งที่คุณให้โดยสมัครใจผ่าน:",
    dataList: [
      "แบบฟอร์มติดต่อ (ชื่อ อีเมล ข้อความ) — ใช้เพื่อตอบกลับรายงานจากเหยื่อและเบาะแสเท่านั้น",
      "ความคิดเห็นในบทความ (ชื่อที่แสดง ข้อความ) — ต้องผ่านการตรวจสอบก่อนเผยแพร่",
    ],
    howUsed: "การใช้ข้อมูลของคุณ",
    howUsedText: "ข้อมูลจากแบบฟอร์มติดต่อใช้เฉพาะสำหรับการสนับสนุนเหยื่อและการประมวลผลเบาะแสการสืบสวน ความคิดเห็นจะถูกตรวจสอบความเกี่ยวข้องและเผยแพร่ตามดุลยพินิจของเรา เราไม่ขาย แบ่งปัน หรือแลกเปลี่ยนข้อมูลส่วนบุคคลกับบุคคลภายนอกเพื่อวัตถุประสงค์ทางการตลาด",
    cookies: "คุกกี้และการวิเคราะห์",
    cookiesText: "เว็บไซต์นี้ไม่ใช้คุกกี้ติดตามหรือบริการวิเคราะห์จากบุคคลภายนอก ไม่มีเครือข่ายโฆษณาหรือพิกเซลรีทาร์เก็ตติ้ง",
    thirdParty: "บริการภายนอก",
    thirdPartyText: "เว็บไซต์นี้ใช้บริการภายนอกต่อไปนี้เพื่อการทำงาน:",
    thirdPartyList: [
      "การอ่านบทความออกเสียง (ElevenLabs) — เสียงบทความสร้างที่ฝั่งเซิร์ฟเวอร์ ไม่มีการส่งข้อมูลผู้ใช้",
      "การสร้างเพลง AI (Suno) — ใช้สร้างเนื้อหาเพลงเพื่อการศึกษา ไม่เกี่ยวข้องกับข้อมูลผู้ใช้",
    ],
    retention: "การเก็บรักษาข้อมูล",
    retentionText: "ข้อมูลจากแบบฟอร์มติดต่อและความคิดเห็นจะถูกเก็บรักษาไว้อย่างไม่มีกำหนดเพื่อวัตถุประสงค์ในการสืบสวนและเก็บถาวร คุณสามารถขอลบข้อมูลที่ส่งมาได้โดยติดต่อเรา",
    rights: "สิทธิ์ของคุณ",
    rightsText: "คุณมีสิทธิ์ขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลที่คุณส่งผ่านเว็บไซต์นี้ ติดต่อเราผ่านแบบฟอร์มติดต่อเหยื่อเพื่อใช้สิทธิ์เหล่านี้",
    contact: "ติดต่อ",
    contactText: "สำหรับคำถามเกี่ยวกับความเป็นส่วนตัว ใช้แบบฟอร์มติดต่อที่ปลอดภัยบนเว็บไซต์นี้",
    lastUpdated: "ปรับปรุงล่าสุด: กุมภาพันธ์ 2569",
  },
};

const PrivacyPolicy = () => {
  const { lang } = useLanguage();
  const c = content[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.title,
    description: c.metaDesc,
    url: `${BASE_URL}${lang === "th" ? "/th" : ""}/privacy`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "th" ? "หน้าแรก" : "Home", item: `${BASE_URL}${lang === "th" ? "/th" : ""}` },
        { "@type": "ListItem", position: 2, name: c.title, item: `${BASE_URL}${lang === "th" ? "/th" : ""}/privacy` },
      ],
    },
  };

  return (
    <Layout>
      <SEOHead title={c.title} description={c.metaDesc} jsonLd={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight mb-8 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
          {c.title}
        </h1>
        <div className={PROSE_CLASSES}>
          <h2>{c.dataCollected}</h2>
          <p>{c.dataCollectedText}</p>
          <ul>
            {c.dataList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <h2>{c.howUsed}</h2>
          <p>{c.howUsedText}</p>
          <h2>{c.cookies}</h2>
          <p>{c.cookiesText}</p>
          <h2>{c.thirdParty}</h2>
          <p>{c.thirdPartyText}</p>
          <ul>
            {c.thirdPartyList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <h2>{c.retention}</h2>
          <p>{c.retentionText}</p>
          <h2>{c.rights}</h2>
          <p>{c.rightsText}</p>
          <h2>{c.contact}</h2>
          <p>{c.contactText}</p>
          <p className="text-sm text-muted-foreground mt-8">{c.lastUpdated}</p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
