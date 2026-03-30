"use client";

import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { PROSE_CLASSES } from "@/lib/constants";

const BASE_URL = "https://adamhowellwarning.com";

const content = {
  en: {
    title: "About",
    metaDesc: "About AdamHowellWarning.com — our mission, editorial standards, and commitment to investor protection through evidence-based reporting.",
    mission: "Our Mission",
    missionText: "This site exists for one purpose: to protect investors and raise public awareness about documented patterns of fraud associated with Adam Howell and connected individuals. We believe transparency is the most powerful tool against financial deception.",
    whatWeDo: "What We Do",
    whatWeDoText: "We conduct evidence-based investigative journalism, compiling and analyzing publicly available information including court records, corporate filings, blockchain transaction data, and verified witness accounts. Our reports aim to present facts clearly so readers can make informed decisions.",
    standards: "Editorial Standards",
    standardsText: "Every claim on this site is backed by verifiable evidence. Our sources include:",
    standardsList: [
      "Court records and legal filings",
      "Public corporate registrations and filings",
      "On-chain blockchain data and transaction records",
      "Published media reports and news articles",
      "Verified victim accounts and whistleblower testimony",
    ],
    standardsNote: "We distinguish clearly between verified facts, allegations, and analysis. If you believe any information is inaccurate, we welcome corrections through our secure contact channels.",
    contribute: "How to Contribute",
    contributeText: "If you have been affected by Adam Howell's activities or have evidence to share, you can reach us through the secure victim contact form on this site. All submissions are treated confidentially. Your information helps protect future investors.",
    bilingual: "Bilingual Support",
    bilingualText: "This site is available in both English and Thai to serve communities in regions where Adam Howell has been most active. Investigative articles include full Thai translations, and the site interface is fully localized.",
  },
  th: {
    title: "เกี่ยวกับ",
    metaDesc: "เกี่ยวกับ AdamHowellWarning.com — ภารกิจ มาตรฐานบรรณาธิการ และความมุ่งมั่นในการปกป้องนักลงทุนผ่านการรายงานตามหลักฐาน",
    mission: "ภารกิจของเรา",
    missionText: "เว็บไซต์นี้มีวัตถุประสงค์เดียว: ปกป้องนักลงทุนและสร้างความตระหนักรู้สาธารณะเกี่ยวกับรูปแบบการฉ้อโกงที่มีการบันทึกซึ่งเกี่ยวข้องกับ Adam Howell และบุคคลที่เชื่อมโยง เราเชื่อว่าความโปร่งใสเป็นเครื่องมือที่ทรงพลังที่สุดในการต่อต้านการหลอกลวงทางการเงิน",
    whatWeDo: "สิ่งที่เราทำ",
    whatWeDoText: "เราดำเนินการสืบสวนเชิงข่าวตามหลักฐาน รวบรวมและวิเคราะห์ข้อมูลที่เปิดเผยต่อสาธารณะ รวมถึงเอกสารศาล การยื่นเอกสารบริษัท ข้อมูลธุรกรรมบล็อกเชน และคำให้การของพยานที่ได้รับการยืนยัน รายงานของเรามุ่งนำเสนอข้อเท็จจริงอย่างชัดเจนเพื่อให้ผู้อ่านตัดสินใจได้อย่างมีข้อมูล",
    standards: "มาตรฐานบรรณาธิการ",
    standardsText: "ทุกข้ออ้างบนเว็บไซต์นี้มีหลักฐานที่ตรวจสอบได้สนับสนุน แหล่งข้อมูลของเรารวมถึง:",
    standardsList: [
      "เอกสารศาลและการยื่นเอกสารทางกฎหมาย",
      "การจดทะเบียนบริษัทและการยื่นเอกสารสาธารณะ",
      "ข้อมูลบล็อกเชนออนเชนและบันทึกธุรกรรม",
      "รายงานสื่อและบทความข่าวที่เผยแพร่",
      "คำให้การของเหยื่อที่ได้รับการยืนยันและพยานผู้แจ้งเบาะแส",
    ],
    standardsNote: "เราแยกแยะอย่างชัดเจนระหว่างข้อเท็จจริงที่ยืนยันแล้ว ข้อกล่าวหา และการวิเคราะห์ หากคุณเชื่อว่าข้อมูลใดไม่ถูกต้อง เรายินดีรับการแก้ไขผ่านช่องทางติดต่อที่ปลอดภัย",
    contribute: "วิธีร่วมให้ข้อมูล",
    contributeText: "หากคุณได้รับผลกระทบจากกิจกรรมของ Adam Howell หรือมีหลักฐานที่ต้องการแบ่งปัน คุณสามารถติดต่อเราผ่านแบบฟอร์มติดต่อเหยื่อที่ปลอดภัยบนเว็บไซต์นี้ ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับ ข้อมูลของคุณช่วยปกป้องนักลงทุนในอนาคต",
    bilingual: "รองรับสองภาษา",
    bilingualText: "เว็บไซต์นี้มีทั้งภาษาอังกฤษและภาษาไทย เพื่อให้บริการชุมชนในภูมิภาคที่ Adam Howell มีกิจกรรมมากที่สุด บทความสืบสวนมีการแปลเป็นภาษาไทยครบถ้วน และอินเทอร์เฟซของเว็บไซต์มีการแปลภาษาครบถ้วน",
  },
};

const About = () => {
  const { lang } = useLanguage();
  const c = content[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adam Howell Warning",
    description: c.metaDesc,
    url: BASE_URL,
    sameAs: [],
  };

  return (
    <>
      <SEOHead title={c.title} description={c.metaDesc} jsonLd={jsonLd} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight mb-8 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
          {c.title}
        </h1>
        <div className={PROSE_CLASSES}>
          <h2>{c.mission}</h2>
          <p>{c.missionText}</p>
          <h2>{c.whatWeDo}</h2>
          <p>{c.whatWeDoText}</p>
          <h2>{c.standards}</h2>
          <p>{c.standardsText}</p>
          <ul>
            {c.standardsList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p>{c.standardsNote}</p>
          <h2>{c.contribute}</h2>
          <p>{c.contributeText}</p>
          <h2>{c.bilingual}</h2>
          <p>{c.bilingualText}</p>
        </div>
      </div>
    </>
  );
};

export default About;
