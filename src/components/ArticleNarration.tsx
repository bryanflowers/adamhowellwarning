import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ArticleNarrationProps {
  articleSlug: string;
  articleText: string;
  language?: string;
  className?: string;
}

const ArticleNarration = ({ articleSlug, articleText, language = "en", className }: ArticleNarrationProps) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [checked, setChecked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check cache on mount
  useEffect(() => {
    const checkCache = async () => {
      const { data } = await supabase
        .from("article_audio")
        .select("audio_url")
        .eq("article_slug", articleSlug)
        .maybeSingle();

      if (data?.audio_url) {
        setAudioUrl(data.audio_url);
      }
      setChecked(true);
    };
    checkCache();
  }, [articleSlug]);

  const handlePlay = async () => {
    // If we already have audio, toggle play/pause
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
      return;
    }

    // Generate audio
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("elevenlabs-tts", {
        body: { articleSlug, articleText, language },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAudioUrl(data.audioUrl);

      // Auto-play after generation
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = data.audioUrl;
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 100);
    } catch (err) {
      console.error("TTS error:", err);
      toast.error(language === "th" ? "ไม่สามารถสร้างเสียงบรรยายได้" : "Failed to generate audio narration");
    } finally {
      setIsLoading(false);
    }
  };

  if (!checked) return null;

  return (
    <div className="flex items-center gap-3 mt-4">
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          toast.error(language === "th" ? "เล่นเสียงไม่สำเร็จ" : "Audio playback failed");
        }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlay}
        disabled={isLoading}
        className={cn("gap-2", className)}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {language === "th" ? "กำลังสร้าง…" : "Generating…"}
          </>
        ) : isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            {language === "th" ? "หยุดชั่วคราว" : "Pause Narration"}
          </>
        ) : audioUrl ? (
          <>
            <Play className="w-4 h-4" />
            {language === "th" ? "เล่นเสียง" : "Play Narration"}
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            {language === "th" ? "ฟังบทความ" : "Listen to Article"}
          </>
        )}
      </Button>
    </div>
  );
};

export default ArticleNarration;
