import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Play, Pause, Volume2, VolumeX, Music as MusicIcon, SkipForward, SkipBack } from "lucide-react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { musicTracks, allGenres, type MusicTrack } from "@/data/musicTracks";

const Music = () => {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredTracks = activeGenre
    ? musicTracks.filter((t) => t.genre === activeGenre)
    : musicTracks;

  const playableTracks = filteredTracks.filter((t) => !!t.audioUrl);

  const playAll = () => {
    if (playableTracks.length === 0) return;
    setCurrentTrack(playableTracks[0]);
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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    if (!currentTrack) return;
    const pool = playableTracks.length > 0 ? playableTracks : musicTracks.filter((t) => !!t.audioUrl);
    const idx = pool.findIndex((t) => t.id === currentTrack.id);
    if (idx === -1 || pool.length === 0) return;
    const next = pool[(idx + 1) % pool.length];
    setCurrentTrack(next);
    setIsPlaying(true);
    setProgress(0);
  };

  const skipPrev = () => {
    if (!currentTrack) return;
    const pool = playableTracks.length > 0 ? playableTracks : musicTracks.filter((t) => !!t.audioUrl);
    const idx = pool.findIndex((t) => t.id === currentTrack.id);
    if (idx === -1 || pool.length === 0) return;
    const prev = pool[(idx - 1 + pool.length) % pool.length];
    setCurrentTrack(prev);
    setIsPlaying(true);
    setProgress(0);
  };

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
      <Helmet>
        <title>The Soundtrack of Deception – 50 Investigative Tracks | Adam Howell Warning</title>
        <meta name="description" content="Listen to 50 original AI-generated songs across Hip-Hop, Rock, Jazz, and more — each inspired by the investigative findings into Adam Howell's crypto fraud." />
        <link rel="canonical" href="https://web-rescu.lovable.app/music" />
        <meta property="og:title" content="The Soundtrack of Deception – 50 Investigative Tracks" />
        <meta property="og:description" content="50 original songs across multiple genres, each inspired by investigative findings into Adam Howell's crypto scams." />
        <meta property="og:image" content="https://web-rescu.lovable.app/og-adam-howell.png" />
        <meta property="og:url" content="https://web-rescu.lovable.app/music" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Soundtrack of Deception – 50 Investigative Tracks" />
        <meta name="twitter:description" content="50 original songs across multiple genres, each inspired by investigative findings into Adam Howell's crypto scams." />
        <meta name="twitter:image" content="https://web-rescu.lovable.app/og-adam-howell.png" />
      </Helmet>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipNext}
        preload="metadata"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MusicIcon className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Soundtrack of Deception
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              50 original AI-generated tracks across multiple genres — each one inspired by the investigative findings on this site.
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={activeGenre === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveGenre(null)}
            >
              All Genres
            </Button>
            {allGenres.map((genre) => (
              <Button
                key={genre}
                variant={activeGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>

          {/* Play All */}
          {playableTracks.length > 0 && (
            <div className="flex justify-center mb-8">
              <Button onClick={playAll} size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Play All{activeGenre ? ` ${activeGenre}` : ""} ({playableTracks.length} tracks)
              </Button>
            </div>
          )}

          {/* Track Grid */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTracks.map((track) => {
              const isActive = currentTrack?.id === track.id;
              const hasAudio = !!track.audioUrl;
              return (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  disabled={!hasAudio}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
                  } ${!hasAudio ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
                    <p className="text-xs text-destructive mt-1">Generating...</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            {/* Progress bar */}
            <Slider
              value={[progress]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="mb-2"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
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

              <div className="hidden sm:flex items-center gap-2 w-32">
                <button onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-foreground">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(v) => { setVolume(v[0]); setIsMuted(false); }}
                />
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {formatTime(progress)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Music;
