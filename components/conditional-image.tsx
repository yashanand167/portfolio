"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Coffee, MoonIcon, SunIcon } from "lucide-react";

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

function getTimeOfDay(): TimeOfDay {
  const hours = new Date().getHours();
  if (hours < 12) return "morning";
  if (hours < 18) return "afternoon";
  if (hours < 22) return "evening";
  return "night";
}

const imageMap: Record<TimeOfDay, string> = {
  morning: "/Morning.png",
  afternoon: "/Afternnon.png",
  evening: "/Sunset.png",
  night: "/Night.png",
};

const captions: Record<TimeOfDay, { text: string; icon: ReactNode }> = {
  morning: {
    text: "Good Morning, Where's my Coffee",
    icon: <Coffee className="rotate-12"/>,
  },
  afternoon: {
    text: "Good Afternoon",
    icon: <SunIcon />,
  },
  evening: {
    text: "Good Evening, It's getting dark",
    icon: <SunIcon />,
  },
  night: {
    text: "Good Night",
    icon: <MoonIcon />,
  },
};

export default function ConditionalImage() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);

  useEffect(() => {
    setTimeOfDay(getTimeOfDay());
  }, []);

  if (!timeOfDay) {
    return <div className="mx-auto aspect-[768/431] w-full max-w-3xl" />;
  }

  const caption = captions[timeOfDay];

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <Image
        src={imageMap[timeOfDay]}
        alt="Time of day"
        width={768}
        height={431}
        priority
        className="h-auto w-full rounded-3xl"
      />
      <div
        className="absolute top-0 left-1/2 inline-flex w-max max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 whitespace-nowrap bg-card pt-2 pr-10 pb-3 pl-8 text-xs font-medium text-card-foreground sm:text-sm"
        style={{
          clipPath:
            "shape(from 0 0, curve to 20px 20px with 11px 0 / 20px 9px, line to 20px calc(100% - 16px), curve to 36px 100% with 20px calc(100% - 7px) / 29px 100%, line to calc(100% - 36px) 100%, curve to calc(100% - 20px) calc(100% - 16px) with calc(100% - 29px) 100% / calc(100% - 20px) calc(100% - 7px), line to calc(100% - 20px) 20px, curve to 100% 0 with calc(100% - 20px) 9px / calc(100% - 11px) 0, close)",
        }}
      >
        <span className="italic">{caption.text}</span>
        <span className="text-primary [&_svg]:size-3.5 sm:[&_svg]:size-4">
          {caption.icon}
        </span>
      </div>
    </div>
  );
}
