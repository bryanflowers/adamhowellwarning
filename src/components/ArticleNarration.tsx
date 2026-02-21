import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ArticleNarrationProps {
  articleSlug: string;
  articleText: string;
}

const ArticleNarration = ({ articleSlug, articleText }: ArticleNarrationProps) => {
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
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // Generate audio
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ articleSlug, articleText }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to generate audio");
      }

      const data = await response.json();
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
      toast.error("Failed to generate audio narration");
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
          toast.error("Audio playback failed");
        }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlay}
        disabled={isLoading}
        className="gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating…
          </>
        ) : isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            Pause Narration
          </>
        ) : audioUrl ? (
          <>
            <Play className="w-4 h-4" />
            Play Narration
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            Listen to Article
          </>
        )}
      </Button>
    </div>
  );
};

export default ArticleNarration;
