"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef } from "react";

const AUDIO_SRC = "/404.mp3";
const SEEK_SECONDS = 10;

type MusicPlayerProps = {
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
};

export default function MusicPlayer({
  isPlaying,
  onPlayingChange,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleEnded = () => onPlayingChange(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [onPlayingChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      void audio.play().catch(() => onPlayingChange(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, onPlayingChange]);

  const seekBy = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration || 0, audio.currentTime + seconds),
    );
  };

  return (
    <div className="mx-auto flex w-fit max-h-24 items-center gap-3 rounded-full bg-gradient-to-b from-neutral-700 to-black p-2 pr-3">
      <div className="aspect-square size-10 shrink-0 overflow-hidden rounded-full border border-white bg-white">
        <img
          src="https://i.pinimg.com/736x/45/60/0f/45600fcaa03b3d3b64be1bc43695b471.jpg"
          alt="album cover"
          className="size-full object-cover"
        />
      </div>
      <div className="flex shrink-0 items-center gap-1.5 text-white">
        <button
          type="button"
          aria-label="Rewind 10 seconds"
          onClick={() => seekBy(-SEEK_SECONDS)}
          className="flex size-7 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        >
          <SkipBack className="size-3.5 fill-current" />
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={() => onPlayingChange(!isPlaying)}
          className="flex size-8 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-90"
        >
          {isPlaying ? (
            <Pause className="size-3.5 fill-current" />
          ) : (
            <Play className="size-3.5 fill-current" />
          )}
        </button>
        <button
          type="button"
          aria-label="Forward 10 seconds"
          onClick={() => seekBy(SEEK_SECONDS)}
          className="flex size-7 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        >
          <SkipForward className="size-3.5 fill-current" />
        </button>
      </div>
    </div>
  );
}
