"use client";

import { clickSoftSound } from "@/lib/click-soft";
import type { UseSoundOptions, UseSoundReturn } from "@/lib/sound-types";

import { useSound } from "@/hooks/use-sound";

export function useClickSound(options?: UseSoundOptions): UseSoundReturn {
  return useSound(clickSoftSound, options);
}
