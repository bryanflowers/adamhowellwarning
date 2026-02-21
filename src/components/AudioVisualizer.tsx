import { useRef, useEffect, useState } from "react";

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
}

const AudioVisualizer = ({ audioElement, isPlaying }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number>(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!audioElement || initialized) return;

    try {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      const source = ctx.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      contextRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      setInitialized(true);
    } catch {
      // Already connected or not supported
    }
  }, [audioElement, initialized]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const barCount = Math.min(bufferLength, 24);
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i] / 255;
        const barHeight = val * height * 0.9;
        const x = i * (barWidth + 2);

        const hue = 15 + i * 2;
        ctx.fillStyle = `hsla(${hue}, 90%, 55%, ${0.6 + val * 0.4})`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      }
    };

    if (isPlaying) {
      contextRef.current?.resume();
      draw();
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, initialized]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={32}
      className="hidden sm:block rounded opacity-80"
    />
  );
};

export default AudioVisualizer;
