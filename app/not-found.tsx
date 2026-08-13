"use client";

import { Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import MusicPlayer from "@/components/music-player";
import ThemeButton from "@/components/ui/theme-button";
import { useColorTheme } from "@/context/theme-provider";
import type { Theme } from "@/lib/theme";

const THEME_IMAGES: Record<Theme, string> = {
  default:
    "https://i.pinimg.com/736x/04/22/ec/0422ecc0a5e1f28b7badb1f2ffd7a3d4.jpg",
  orange:
    "https://i.pinimg.com/1200x/e1/1d/43/e11d43ddba9f60b850cb3d86de575e59.jpg",
  rose: "https://i.pinimg.com/1200x/f0/bd/8d/f0bd8dbcf36daf7d2855f8721363abbf.jpg",
  blue: "https://i.pinimg.com/736x/a1/02/2f/a1022f4ecfdf1a511595608d339623eb.jpg",
  green:
    "https://i.pinimg.com/1200x/e2/a8/e3/e2a8e337e0f93cbf3859f9b37ddc3f2d.jpg",
  purple:
    "https://i.pinimg.com/1200x/8b/0d/50/8b0d50618f7fff4b8f1647da8035c717.jpg",
};

function usePreloadedThemeImage(theme: Theme) {
  const nextSrc = THEME_IMAGES[theme];
  const [src, setSrc] = useState(nextSrc);

  useEffect(() => {
    for (const url of Object.values(THEME_IMAGES)) {
      const preload = new window.Image();
      preload.src = url;
    }
  }, []);

  useEffect(() => {
    if (nextSrc === src) return;

    let cancelled = false;
    const preload = new window.Image();
    preload.src = nextSrc;
    const apply = () => {
      if (!cancelled) setSrc(nextSrc);
    };

    if (preload.complete) {
      apply();
    } else {
      preload.onload = apply;
    }

    return () => {
      cancelled = true;
    };
  }, [nextSrc, src]);

  return src;
}

function Equalizer({ playing }: { playing: boolean }) {
  const bars = [10, 16, 12, 18, 9];

  return (
    <div className="flex h-4 items-end gap-[3px]" aria-hidden>
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-[2px] rounded-full bg-current"
          style={{
            height: playing ? height : height * 0.35,
            transition: "height 0.25s ease",
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  const { theme } = useColorTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);
  const imageSrc = usePreloadedThemeImage(theme);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center overflow-hidden bg-background px-4 pt-4 pb-6 text-foreground transition-colors duration-300 sm:px-6 sm:pt-5 sm:pb-32">
      <div className="z-50 flex w-full items-center justify-between">
        <Link
          href="/"
          className="aspect-square shrink-0 rounded-lg border border-border bg-card transition-opacity hover:opacity-80"
        >
          <Image
            src="/Logo.png"
            alt="Home"
            width={32}
            height={32}
            loading="lazy"
            className="size-8 sm:size-10"
          />
        </Link>
        <ThemeButton />
      </div>

      <div className="relative mt-12 flex w-full max-w-3xl flex-col items-center text-center sm:mt-10">
        <h1 className="font-serif text-6xl leading-none tracking-tight sm:text-8xl md:text-9xl">
          404
        </h1>

        <p className="mt-3 text-base font-medium sm:mt-5 sm:text-lg">
          Looks like you took a wrong turn.
        </p>
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground sm:mt-2 sm:text-[0.95rem]">
          Even in the wrong places, something beautiful exists.
        </p>

        <div className="mt-5 flex w-full max-w-3xl items-center justify-center gap-4 sm:mt-8 sm:gap-5">
          <div className="relative hidden h-48 w-10 shrink-0 sm:block">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] tracking-[0.18em] uppercase md:text-[11px]">
              New York, NY{" "}
              <span className="tracking-normal text-muted-foreground normal-case">
                40.7128° N, 74.0060° W
              </span>
            </p>
          </div>

          <div className="relative min-w-0 max-w-xl flex-1 p-2.5 sm:p-4">
            <span
              aria-hidden
              className="pointer-events-none absolute top-2.5 right-0 left-0 border-t border-dotted border-foreground/65 sm:top-4"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 bottom-2.5 left-0 border-t border-dotted border-foreground/65 sm:bottom-4"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-2.5 border-l border-dotted border-foreground/65 sm:left-4"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 right-2.5 bottom-0 border-l border-dotted border-foreground/65 sm:right-4"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-0 left-0 -translate-y-1/2 border-t border-dotted border-foreground/40"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dotted border-foreground/40"
            />

            <img
              src={imageSrc}
              alt="Theme scenery"
              className="relative z-0 aspect-[16/10] w-full object-cover"
            />
          </div>

          <div className="relative hidden h-48 w-10 shrink-0 sm:block">
            <p className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 rotate-90 items-center gap-2 whitespace-nowrap text-[10px] tracking-[0.18em] uppercase md:text-[11px]">
              <span className="inline-block size-1.5 shrink-0 rounded-full bg-foreground" />
              07:24 PM
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((value) => !value)}
          className="mt-5 flex flex-col items-center gap-2 text-foreground transition-opacity hover:opacity-80 sm:mt-8"
          aria-pressed={isPlaying}
        >
          <Equalizer playing={isPlaying} />
          <span className="inline-flex items-center gap-1.5 text-sm">
            {isPlaying
              ? "Now playing."
              : "Since you're here, how about some music."}
              <Music className="size-3.5 shrink-0" aria-hidden />
          </span>
        </button>
      </div>

      <div className="mt-6 flex w-full justify-center sm:mt-auto sm:pt-12">
        <MusicPlayer
          isPlaying={isPlaying}
          onPlayingChange={handlePlayingChange}
        />
      </div>
    </div>
  );
}
