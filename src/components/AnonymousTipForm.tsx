import { useState } from "react";
import { EyeOff, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

const texts = {
  en: {
    title: "Report a Tip",
    desc: "Fully anonymous. No email, no name — just your information. We review every submission.",
    placeholder: "Share what you know... (e.g., wallet addresses, transaction details, screenshots links, dates, people involved)",
    submit: "Submit Anonymously",
    submitting: "Submitting...",
    successTitle: "Tip Received",
    successDesc: "Thank you. Your anonymous tip has been securely submitted and will be reviewed.",
    error: "Failed to submit. Please try again.",
    empty: "Please enter your tip before submitting.",
    badge: "🔒 No identifying information is collected",
  },
  th: {
    title: "แจ้งเบาะแส",
    desc: "ไม่ระบุตัวตน ไม่ต้องใส่อีเมลหรือชื่อ — แค่ข้อมูลของคุณ เราตรวจสอบทุกการส่ง",
    placeholder: "แบ่งปันสิ่งที่คุณรู้... (เช่น ที่อยู่กระเป๋าเงิน รายละเอียดธุรกรรม ลิงก์ภาพหน้าจอ วันที่ บุคคลที่เกี่ยวข้อง)",
    submit: "ส่งโดยไม่ระบุตัวตน",
    submitting: "กำลังส่ง...",
    successTitle: "ได้รับเบาะแสแล้ว",
    successDesc: "ขอบคุณ เบาะแสของคุณถูกส่งอย่างปลอดภัยและจะได้รับการตรวจสอบ",
    error: "ส่งไม่สำเร็จ กรุณาลองใหม่",
    empty: "กรุณาป้อนเบาะแสก่อนส่ง",
    badge: "🔒 ไม่มีการเก็บข้อมูลระบุตัวตน",
  },
};

const AnonymousTipForm = () => {
  const { lang } = useLanguage();
  const s = texts[lang];
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tip.trim().slice(0, 5000);
    if (!trimmed) {
      toast.error(s.empty);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("anonymous_tips").insert({ tip_text: trimmed });
      if (error) throw error;
      setSubmitted(true);
      setTip("");
    } catch {
      toast.error(s.error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card border rounded-xl p-6 text-center">
        <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="font-bold text-foreground mb-1">{s.successTitle}</h3>
        <p className="text-sm text-muted-foreground">{s.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <EyeOff className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">{s.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          maxLength={5000}
          rows={4}
          placeholder={s.placeholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-1"
        />
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground">{tip.length}/5000</p>
          <p className="text-xs text-muted-foreground">{s.badge}</p>
        </div>
        <Button type="submit" disabled={loading || !tip.trim()} className="w-full gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? s.submitting : s.submit}
        </Button>
      </form>
    </div>
  );
};

export default AnonymousTipForm;
