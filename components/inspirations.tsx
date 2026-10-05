import Image from "next/image";

type Inspiration = {
  image: string;
  name: string;
  description: string;
  link: string;
};

const otherInspirations: Inspiration[] = [
  {
    image: "/Kirat.png",
    name: "Harkirat Singh",
    description: "Helped strengthen my foundation in building optimized and high performing software systems.",
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
    description: "Practical AI, prompting,creative problem-solving and AI integration in our daily lives.",
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

function InspirationItem({ inspiration }: { inspiration: Inspiration }) {
  return (
    <li className="relative z-10 flex items-start gap-3 sm:gap-4">
      <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/50 bg-card shadow-[0_1px_3px_oklch(0_0_0/0.08),0_1px_2px_oklch(0_0_0/0.04)] sm:size-10">
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
  );
}

function UltimateItem({
  image,
  name,
  description,
  link,
}: {
  image: string;
  name: string;
  description: string;
  link: string;
}) {
  return (
    <li className="relative z-10 flex items-start gap-3 sm:gap-4">
      <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/50 bg-card shadow-[0_1px_3px_oklch(0_0_0/0.08),0_1px_2px_oklch(0_0_0/0.04)] sm:size-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground transition-colors hover:text-primary sm:text-base"
        >
          {name}
        </a>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
    </li>
  );
}

export default function Inspirations() {
  return (
    <div className="relative z-10 mt-6 flex flex-col gap-8 sm:mt-8">
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          Ultimate Inspirations
        </p>
        <ul className="flex flex-col gap-4">
          <UltimateItem
            image="/Paaji.png"
            name="Manu Arora aka Manu Paaji"
            description="Inspired my shift from product design into design engineering and frontend architecture."
            link="https://manuarora.in"
          />
          <UltimateItem
            image="https://i.pinimg.com/736x/cb/a2/d2/cba2d219fc54e6aa54a15d1f140a6147.jpg"
            name="Beverly Yip"
            description="Showed me what it looks like to run design and engineering as one practice, solo."
            link="https://www.bevyip.com"
          />
          <UltimateItem
            image="https://i.pinimg.com/736x/cb/a2/d2/cba2d219fc54e6aa54a15d1f140a6147.jpg"
            name="Eric Fillingame"
            description="Proved that craft and systems thinking can coexist in one person shipping real products."
            link="https://ericfillingame.com"
          />
          <UltimateItem
            image="https://i.pinimg.com/736x/cb/a2/d2/cba2d219fc54e6aa54a15d1f140a6147.jpg"
            name="Sebiomo"
            description="Inspired my approach to building with intention as a solo designer and developer."
            link="https://www.sebiomo.com"
          />
        </ul>
      </div>

      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          Others
        </p>
        <ul className="flex flex-col gap-4">
          {otherInspirations.map((inspiration) => (
            <InspirationItem key={inspiration.name} inspiration={inspiration} />
          ))}
        </ul>
      </div>
    </div>
  );
}
