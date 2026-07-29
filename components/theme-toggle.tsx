"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useClickSound } from "@/hooks/use-click-sound";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [click] = useClickSound();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-5 ">

    </div>
  );
}
