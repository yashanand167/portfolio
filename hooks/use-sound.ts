"use client";

import { useCallback, useRef, useState } from "react";

import { playSound } from "@/lib/sound-engine";
import type { SoundAsset, UseSoundOptions, UseSoundReturn } from "@/lib/sound-types";

export function useSound(
  sound: SoundAsset,
  {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
    onStop,
  }: UseSoundOptions = {},
): UseSoundReturn {
  const playbackRef = useRef<{ stop: () => void } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    playbackRef.current?.stop();
    playbackRef.current = null;
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled) return;

      if (interrupt) {
        stop();
      }

      onPlay?.();
      setIsPlaying(true);

      void playSound(sound.dataUri, {
        volume: overrides?.volume ?? volume,
        playbackRate: overrides?.playbackRate ?? playbackRate,
        onEnd: () => {
          playbackRef.current = null;
          setIsPlaying(false);
          onEnd?.();
        },
      }).then((playback) => {
        playbackRef.current = playback;
      });
    },
    [
      interrupt,
      onEnd,
      onPlay,
      playbackRate,
      sound.dataUri,
      soundEnabled,
      stop,
      volume,
    ],
  );

  return [
    play,
    {
      stop,
      pause: stop,
      isPlaying,
      duration: sound.duration,
      sound,
    },
  ];
}
