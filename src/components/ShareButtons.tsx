import { Twitter, Facebook, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n/translations";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const { lang } = useLanguage();
  const tr = t[lang];
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success(lang === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied to clipboard");
    } catch {
      toast.error(lang === "th" ? "ไม่สามารถคัดลอกลิงก์ได้" : "Failed to copy link");
    }
  };

  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const btnClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground font-medium">{tr.shareLabel}</span>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        <Twitter className="w-3.5 h-3.5" /> X
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
        <Facebook className="w-3.5 h-3.5" /> Facebook
      </a>
      <button onClick={copyLink} className={btnClass}>
        <Link2 className="w-3.5 h-3.5" /> {lang === "th" ? "คัดลอกลิงก์" : "Copy Link"}
      </button>
    </div>
  );
};

export default ShareButtons;
