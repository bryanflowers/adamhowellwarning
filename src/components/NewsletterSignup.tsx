"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";

const texts = {
  en: {
    title: "Stay Informed",
    desc: "Get investigative updates and scam alerts delivered to your inbox.",
    placeholder: "your@email.com",
    subscribe: "Subscribe",
    subscribing: "Subscribing...",
    success: "Check your inbox to confirm your subscription.",
    successTitle: "Almost there!",
    error: "Failed to subscribe. Please try again.",
    duplicate: "This email is already subscribed.",
    invalid: "Please enter a valid email address.",
    privacy: "We respect your privacy. Unsubscribe anytime.",
  },
  th: {
    title: "ติดตามข่าวสาร",
    desc: "รับข้อมูลการสืบสวนและการแจ้งเตือนการหลอกลวงส่งตรงถึงอีเมลของคุณ",
    placeholder: "your@email.com",
    subscribe: "สมัครรับข่าว",
    subscribing: "กำลังสมัคร...",
    success: "ตรวจสอบกล่องจดหมายของคุณเพื่อยืนยันการสมัคร",
    successTitle: "เกือบเสร็จแล้ว!",
    error: "สมัครไม่สำเร็จ กรุณาลองใหม่",
    duplicate: "อีเมลนี้สมัครไปแล้ว",
    invalid: "กรุณากรอกอีเมลที่ถูกต้อง",
    privacy: "เราเคารพความเป็นส่วนตัวของคุณ ยกเลิกได้ตลอดเวลา",
  },
};

const NewsletterSignup = () => {
  const { lang } = useLanguage();
  const s = texts[lang];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase().slice(0, 255);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      toast.error(s.invalid);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed });

      if (error) {
        if (error.code === "23505") {
          toast.info(s.duplicate);
        } else {
          throw error;
        }
      } else {
        setSubmitted(true);
        // Trigger confirmation email via edge function
        await supabase.functions.invoke("newsletter-confirm", {
          body: { email: trimmed, action: "send" },
        });
      }
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
        <p className="text-sm text-muted-foreground">{s.success}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">{s.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          placeholder={s.placeholder}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <Button type="submit" disabled={loading} className="gap-2 shrink-0">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
          {loading ? s.subscribing : s.subscribe}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-2">{s.privacy}</p>
    </div>
  );
};

export default NewsletterSignup;
