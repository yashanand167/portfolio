import { cn } from "@/lib/utils";

type ExperienceIconProps = {
  className?: string;
};

export default function ExperienceIcon({ className }: ExperienceIconProps) {
  return (
    <svg
      viewBox="0 0 114 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("h-8 w-auto shrink-0", className)}
    >
      <rect y="39.5" width="114" height="55" rx="6" fill="url(#paint0_linear_139_147)" />
      <rect y="13.5" width="114" height="25" rx="5" fill="url(#paint1_linear_139_147)" />
      <path
        d="M31 5.5V11.75C31 12.7165 31.7835 13.5 32.75 13.5C33.7165 13.5 34.5 12.7165 34.5 11.75V6.9C34.5 4.13858 36.7386 1.9 39.5 1.9H74.5C77.2614 1.9 79.5 4.13857 79.5 6.9V11.75C79.5 12.7165 80.2835 13.5 81.25 13.5C82.2165 13.5 83 12.7165 83 11.75V5.5C83 2.73858 80.7614 0.5 78 0.5H36C33.2386 0.5 31 2.73858 31 5.5Z"
        fill="#9F4B0E"
        stroke="white"
      />
      <path
        d="M24 47.5V34.5C24 33.3954 24.8954 32.5 26 32.5H32C33.1046 32.5 34 33.3954 34 34.5V47.5C34 48.6046 33.1046 49.5 32 49.5H26C24.8954 49.5 24 48.6046 24 47.5Z"
        fill="#A44E14"
        stroke="white"
      />
      <path
        d="M82 47.5V34.5C82 33.3954 82.8954 32.5 84 32.5H90C91.1046 32.5 92 33.3954 92 34.5V47.5C92 48.6046 91.1046 49.5 90 49.5H84C82.8954 49.5 82 48.6046 82 47.5Z"
        fill="#A44E14"
        stroke="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_139_147"
          x1="57"
          y1="39.5"
          x2="57"
          y2="94.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DA984D" />
          <stop offset="1" stopColor="#74360F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_139_147"
          x1="57.5429"
          y1="40.8437"
          x2="57.5429"
          y2="13.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DA984D" />
          <stop offset="1" stopColor="#9D5613" />
        </linearGradient>
      </defs>
    </svg>
  );
}
