import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/hooks/useLanguage";
import { PROSE_CLASSES } from "@/lib/constants";

const BASE_URL = "https://adamhowellwarning.com";

const content = {
  en: {
    title: "Disclaimer",
    metaDesc: "Legal disclaimer for AdamHowellWarning.com — purpose, accuracy, fair use, and liability information.",
    purpose: "Purpose of This Site",
    purposeText: "This website exists to document publicly available information regarding Adam Howell and associated individuals for investor protection purposes. All content is based on court records, public filings, blockchain data, media reports, and verifiable sources.",
    notLegal: "Not Legal Advice",
    notLegalText: "Nothing on this website constitutes legal, financial, or investment advice. Readers should consult qualified professionals before making any decisions based on the information presented here.",
    fairUse: "Fair Use & Freedom of Expression",
    fairUseText: "Content on this site is published under principles of fair use, public interest reporting, and freedom of expression. The information presented serves a legitimate public interest in protecting investors and raising awareness about documented patterns of fraud.",
    accuracy: "Accuracy & Sources",
    accuracyText: "We make our best efforts to ensure accuracy and rely on publicly available sources including court documents, corporate filings, blockchain records, and verified witness accounts. If you believe any information is inaccurate, please contact us through the secure channels provided.",
    thirdParty: "Third-Party Links",
    thirdPartyText: "This site may contain links to external websites. We are not responsible for the content, privacy practices, or availability of any third-party sites. Inclusion of a link does not imply endorsement.",
    updates: "Right to Update",
    updatesText: "We reserve the right to modify, update, or remove content on this site at any time as new information becomes available or circumstances change.",
    lastUpdated: "Last updated: February 2026",
  },
  th: {
    title: "ข้อจำกัดความรับผิดชอบ",
    metaDesc: "ข้อจำกัดความรับผิดชอบทางกฎหมายสำหรับ AdamHowellWarning.com — วัตถุประสงค์ ความถูกต้อง การใช้งานโดยชอบธรรม และข้อมูลความรับผิด",
    purpose: "วัตถุประสงค์ของเว็บไซต์นี้",
    purposeText: "เว็บไซต์นี้มีขึ้นเพื่อบันทึกข้อมูลที่เปิดเผยต่อสาธารณะเกี่ยวกับ Adam Howell และบุคคลที่เกี่ยวข้อง เพื่อวัตถุประสงค์ในการปกป้องนักลงทุน เนื้อหาทั้งหมดอ้างอิงจากเอกสารศาล การยื่นเอกสารสาธารณะ ข้อมูลบล็อกเชน รายงานสื่อ และแหล่งข้อมูลที่ตรวจสอบได้",
    notLegal: "ไม่ใช่คำแนะนำทางกฎหมาย",
    notLegalText: "เนื้อหาบนเว็บไซต์นี้ไม่ถือเป็นคำแนะนำทางกฎหมาย การเงิน หรือการลงทุน ผู้อ่านควรปรึกษาผู้เชี่ยวชาญที่มีคุณสมบัติก่อนตัดสินใจใดๆ ตามข้อมูลที่นำเสนอ",
    fairUse: "การใช้งานโดยชอบธรรมและเสรีภาพในการแสดงออก",
    fairUseText: "เนื้อหาบนเว็บไซต์นี้เผยแพร่ภายใต้หลักการใช้งานโดยชอบธรรม การรายงานเพื่อประโยชน์สาธารณะ และเสรีภาพในการแสดงออก ข้อมูลที่นำเสนอมีวัตถุประสงค์เพื่อประโยชน์สาธารณะในการปกป้องนักลงทุนและสร้างความตระหนักรู้เกี่ยวกับรูปแบบการฉ้อโกงที่มีการบันทึก",
    accuracy: "ความถูกต้องและแหล่งข้อมูล",
    accuracyText: "เราพยายามอย่างเต็มที่เพื่อให้ข้อมูลถูกต้อง และอ้างอิงจากแหล่งข้อมูลสาธารณะ รวมถึงเอกสารศาล การยื่นเอกสารบริษัท บันทึกบล็อกเชน และคำให้การของพยานที่ได้รับการยืนยัน หากคุณเชื่อว่าข้อมูลใดไม่ถูกต้อง โปรดติดต่อเราผ่านช่องทางที่ปลอดภัยที่ให้ไว้",
    thirdParty: "ลิงก์ภายนอก",
    thirdPartyText: "เว็บไซต์นี้อาจมีลิงก์ไปยังเว็บไซต์ภายนอก เราไม่รับผิดชอบต่อเนื้อหา แนวปฏิบัติด้านความเป็นส่วนตัว หรือความพร้อมใช้งานของเว็บไซต์ภายนอกใดๆ การรวมลิงก์ไม่ได้หมายความว่าเรารับรอง",
    updates: "สิทธิ์ในการปรับปรุง",
    updatesText: "เราขอสงวนสิทธิ์ในการแก้ไข ปรับปรุง หรือลบเนื้อหาบนเว็บไซต์นี้ได้ตลอดเวลา เมื่อมีข้อมูลใหม่หรือสถานการณ์เปลี่ยนแปลง",
    lastUpdated: "ปรับปรุงล่าสุด: กุมภาพันธ์ 2569",
  },
};

const Disclaimer = () => {
  const { lang, localPath } = useLanguage();
  const c = content[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.title,
    description: c.metaDesc,
    url: `${BASE_URL}${lang === "th" ? "/th" : ""}/disclaimer`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "th" ? "หน้าแรก" : "Home", item: `${BASE_URL}${lang === "th" ? "/th" : ""}` },
        { "@type": "ListItem", position: 2, name: c.title, item: `${BASE_URL}${lang === "th" ? "/th" : ""}/disclaimer` },
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
          <h2>{c.purpose}</h2>
          <p>{c.purposeText}</p>
          <h2>{c.notLegal}</h2>
          <p>{c.notLegalText}</p>
          <h2>{c.fairUse}</h2>
          <p>{c.fairUseText}</p>
          <h2>{c.accuracy}</h2>
          <p>{c.accuracyText}</p>
          <h2>{c.thirdParty}</h2>
          <p>{c.thirdPartyText}</p>
          <h2>{c.updates}</h2>
          <p>{c.updatesText}</p>
          <p className="text-sm text-muted-foreground mt-8">{c.lastUpdated}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;
