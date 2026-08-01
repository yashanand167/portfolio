import Image from "next/image";

type Inspiration = {
  image: string;
  name: string;
  description: string;
  link: string;
};

const inspirations: Inspiration[] = [
  {
    image: "/Paaji.png",
    name: "Manu Arora aka Manu Paaji",
    description: "Inspired my shift from product design into frontend engineering.",
    link: "https://manuarora.in",
  },
  {
    image: "/Kirat.png",
    name: "Harkirat Singh",
    description: "Helped strengthen my foundation in software engineering.",
    link: "https://x.com/kirat_tw",
  },
  {
    image: "/Chanhdai.png",
    name: "Chanhdai",
    description: "Inspired the personal lab and my push into animated UI components.",
    link: "https://chanhdai.com",
  },
  {
    image: "/Saptarshi.png",
    name: "Saptarshi Prakash",
    description: "Inspired my approach to clean, intentional and human centric interfaces.",
    link: "https://www.sapta.me/",
  },
  {
    image: "/Ansh.png",
    name: "Ansh Mehra",
    description: "Practical AI, prompting, and creative problem-solving.",
    link: "https://anshmehra.com",
  },
  {
    image: "/Praha.png",
    name: "Praha",
    description: "Set the bar for detail and running design like a studio.",
    link: "https://x.com/Praha37v",
  },
  {
    image: "/Apple.png",
    name: "Apple, Inc.",
    description: "Changed how I think about depth, motion, and interface hierarchy.",
    link: "https://www.apple.com",
  },
  {
    image: "/ShadCN.png",
    name: "Shadcn UI",
    description: "My go-to reference for building clean, composable React UI.",
    link: "https://ui.shadcn.com",
  },
  {
    image: "/Naval.png",
    name: "Naval",
    description: "Pushed me to think past today's tools and toward what's next in AI",
    link: "https://nav.al",
  },
];

export default function Inspirations() {
  return (
    <ul className="mt-6 flex flex-col gap-4 sm:mt-8">
      {inspirations.map((inspiration) => (
        <li key={inspiration.name} className="flex items-start gap-3 sm:gap-4">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/50 shadow-[0_1px_3px_oklch(0_0_0/0.08),0_1px_2px_oklch(0_0_0/0.04)] sm:size-10">
            <Image
              src={inspiration.image}
              alt={inspiration.name}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 36px, 40px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <a
              href={inspiration.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary sm:text-base"
            >
              {inspiration.name}
            </a>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {inspiration.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
