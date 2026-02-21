import { useState, useRef, useEffect, useCallback } from "react";
import SEOHead from "@/components/SEOHead";
import { useSearchParams } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, Music as MusicIcon, SkipForward, SkipBack, Shuffle, Heart, ListMusic } from "lucide-react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { musicTracks, allGenres, type MusicTrack } from "@/data/musicTracks";
import AudioVisualizer from "@/components/AudioVisualizer";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/i18n/translations";

const Music = () => {
  const { lang } = useLanguage();
  const tr = t[lang];
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [shuffledQueue, setShuffledQueue] = useState<MusicTrack[]>([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { favorites, toggle, isFavorite } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  const baseTracks = showPlaylist
    ? musicTracks.filter((t) => favorites.includes(t.id))
    : activeGenre
    ? musicTracks.filter((t) => t.genre === activeGenre)
    : musicTracks;

  const filteredTracks = baseTracks;
  const playableTracks = filteredTracks.filter((t) => !!t.audioUrl);

  const buildShuffledQueue = useCallback((pool: MusicTrack[]) => {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledQueue(shuffled);
    return shuffled;
  }, []);

  // Handle ?track= param for auto-play from search
  useEffect(() => {
    const trackId = searchParams.get("track");
    if (trackId) {
      const track = musicTracks.find((t) => t.id === Number(trackId));
      if (track?.audioUrl) {
        setCurrentTrack(track);
        setIsPlaying(true);
        setProgress(0);
      }
      setSearchParams({}, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playAll = () => {
    if (playableTracks.length === 0) return;
    if (shuffleMode) {
      const queue = buildShuffledQueue(playableTracks);
      setCurrentTrack(queue[0]);
    } else {
      setCurrentTrack(playableTracks[0]);
    }
    setIsPlaying(true);
    setProgress(0);
  };

  const playTrack = (track: MusicTrack) => {
    if (!track.audioUrl) return;
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const skipNext = useCallback(() => {
    if (!currentTrack) return;
    const pool = shuffleMode && shuffledQueue.length > 0
      ? shuffledQueue
      : (playableTracks.length > 0 ? playableTracks : musicTracks.filter((t) => !!t.audioUrl));
    if (pool.length === 0) return;
    const idx = pool.findIndex((t) => t.id === currentTrack.id);
    setCurrentTrack(pool[(idx + 1) % pool.length]);
    setIsPlaying(true);
    setProgress(0);
  }, [currentTrack, shuffleMode, shuffledQueue, playableTracks]);

  const skipPrev = useCallback(() => {
    if (!currentTrack) return;
    const pool = shuffleMode && shuffledQueue.length > 0
      ? shuffledQueue
      : (playableTracks.length > 0 ? playableTracks : musicTracks.filter((t) => !!t.audioUrl));
    if (pool.length === 0) return;
    const idx = pool.findIndex((t) => t.id === currentTrack.id);
    setCurrentTrack(pool[(idx - 1 + pool.length) % pool.length]);
    setIsPlaying(true);
    setProgress(0);
  }, [currentTrack, shuffleMode, shuffledQueue, playableTracks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (currentTrack) togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          skipNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipPrev();
          break;
        case "KeyM":
          e.preventDefault();
          setIsMuted(prev => !prev);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentTrack, isPlaying, togglePlay, skipNext, skipPrev]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.play().catch(() => setIsPlaying(false));
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (val: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val[0];
    setProgress(val[0]);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Layout>
      <SEOHead
        title="The Soundtrack of Deception – 50 Investigative Tracks"
        description="Listen to 50 original AI-generated songs across Hip-Hop, Rock, Jazz, and more — each inspired by the investigative findings into Adam Howell's crypto fraud."
        ogImage="/og-music.png"
      />
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipNext}
        onError={() => {
          toast.error(lang === "th" ? "ไม่สามารถโหลดเพลงได้ กำลังข้ามไป..." : "Track failed to load, skipping...");
          skipNext();
        }}
        crossOrigin="anonymous"
        preload="metadata"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MusicIcon className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {tr.musicTitle}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {tr.musicSubtitle}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2 max-w-xl mx-auto italic">
              {lang === "th" ? "เพลงเหล่านี้สร้างขึ้นเพื่อสร้างความตระหนักรู้เกี่ยวกับการหลอกลวงคริปโตเคอร์เรนซี ไม่มีการแสวงกำไรจากเพลงเหล่านี้" : "These songs were created solely to raise awareness about cryptocurrency scams and help protect potential victims. No profit is made from this music."}
            </p>
          </div>

          {/* Genre Filters + Playlist Toggle */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Button
              variant={!showPlaylist && activeGenre === null ? "default" : "outline"}
              size="sm"
              onClick={() => { setActiveGenre(null); setShowPlaylist(false); }}
            >
              {tr.allGenres}
            </Button>
            {allGenres.map((genre) => (
              <Button
                key={genre}
                variant={!showPlaylist && activeGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => { setActiveGenre(genre); setShowPlaylist(false); }}
              >
                {genre}
              </Button>
            ))}
          </div>
          <div className="flex justify-center mb-8">
            <Button
              variant={showPlaylist ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setShowPlaylist(!showPlaylist)}
            >
              <ListMusic className="w-4 h-4" />
              {tr.myPlaylist} ({favorites.length})
            </Button>
          </div>

          {/* Play All */}
          {playableTracks.length > 0 && (
            <div className="flex justify-center items-center gap-3 mb-8">
              <Button onClick={playAll} size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                {tr.playAll}{showPlaylist ? ` ${tr.myPlaylist}` : activeGenre ? ` ${activeGenre}` : ""} ({playableTracks.length})
              </Button>
              <Button
                variant={shuffleMode ? "default" : "outline"}
                size="lg"
                className="gap-2"
                onClick={() => {
                  const next = !shuffleMode;
                  setShuffleMode(next);
                  if (next) buildShuffledQueue(playableTracks);
                  else setShuffledQueue([]);
                }}
              >
                <Shuffle className="w-5 h-5" />
                {lang === "th" ? "สุ่ม" : "Shuffle"} {shuffleMode ? tr.shuffleOn : tr.shuffleOff}
              </Button>
            </div>
          )}

          {showPlaylist && favorites.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {lang === "th" ? "ยังไม่มีเพลงโปรด คลิกไอคอน ♥ บนเพลงใดก็ได้เพื่อเพิ่มในเพลย์ลิสต์ของคุณ" : "No favorites yet. Click the ♥ icon on any track to add it to your playlist."}
            </p>
          )}

          {/* Track Grid */}
          <div className={`grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${currentTrack ? "pb-28" : ""}`}>
            {filteredTracks.map((track) => {
              const isActive = currentTrack?.id === track.id;
              const hasAudio = !!track.audioUrl;
              return (
                <div
                  key={track.id}
                  className={`relative text-left p-4 rounded-lg border transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
                  } ${!hasAudio ? "opacity-50" : ""}`}
                >
                  <button
                    onClick={() => playTrack(track)}
                    disabled={!hasAudio}
                    className={`w-full text-left ${!hasAudio ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {track.genre}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{track.duration}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                      {isActive && isPlaying ? (
                        <Pause className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <Play className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      {track.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{track.description}</p>
                    {!hasAudio && (
                      <p className="text-xs text-destructive mt-1">{lang === "th" ? "กำลังสร้าง..." : "Generating..."}</p>
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggle(track.id); }}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-secondary transition-colors"
                    aria-label={isFavorite(track.id) ? "Remove from playlist" : "Add to playlist"}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(track.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="mb-2"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <AudioVisualizer audioElement={audioRef.current} isPlaying={isPlaying} />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
                  <p className="text-xs text-muted-foreground">{currentTrack.genre}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={skipPrev} className="h-8 w-8">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button variant="default" size="icon" onClick={togglePlay} className="h-9 w-9 rounded-full">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={skipNext} className="h-8 w-8">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
              <div className="hidden sm:flex items-center gap-2 w-28">
                <button onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-foreground">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(v) => { setVolume(v[0]); setIsMuted(false); }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Music;
