import Image from "next/image";
import { TbBrandLinkedin } from "react-icons/tb";

import { cn } from "@/lib/utils";

const horizontalRuleClassName =
  "pointer-events-none z-10 h-0.5 bg-[repeating-linear-gradient(to_right,var(--border)_0_5px,transparent_5px_10px)]";

const verticalRuleClassName =
  "pointer-events-none z-10 w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--border)_0_5px,transparent_5px_10px)]";

type Testimonial = {
  name: string;
  profession: string;
  image: string;
  description: string;
  linkedinUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Nikhila CR",
    profession: "CEO, Dseide",
    image: "/Nikhila.png",
    description:
      "Yash brought a level of craft to our product that showed up in every screen. His design sensibility and frontend work made Dseide feel polished and intentional from day one.",
    linkedinUrl: "https://www.linkedin.com/in/nikhila-c-r-925190197/",
  },
  {
    name: "Bharath M",
    profession: "CSO, Dseide",
    image: "/Bharath.png",
    description:
      "He doesn't just implement designs — he improves them. Yash's frontend work consistently elevated how our product looked and felt, without slowing down delivery.",
    linkedinUrl: "https://www.linkedin.com/in/bharath-dseide/",
  },
  {
    name: "Luvkush Sharma",
    profession: "Product Lead, Dseide",
    image: "/Luvkush.png",
    description:
      "Working with Yash on product flows was seamless. He translated rough ideas into clean UI, built reusable components, and kept design and engineering aligned throughout.",
    linkedinUrl: "https://www.linkedin.com/in/luvkushsharma/",
  },
  {
    name: "Sahan Angadi",
    profession: "Full-Stack Engineer, Dseide",
    image: "/Sahan.png",
    description:
      "Yash's frontend code was always structured and easy to integrate with. He cared about spacing, motion, and edge cases — the details that make interfaces feel finished.",
    linkedinUrl: "https://www.linkedin.com/in/sahanangadi39/",
  },
  {
    name: "Jotham",
    profession: "Frontend Engineer, Dseide",
    image: "/Jotham.png",
    description:
      "As a fellow frontend engineer, I saw how thoughtfully Yash approached components and layout. His design eye showed in every PR — consistent, accessible, and pixel-aware.",
    linkedinUrl: "https://www.linkedin.com/in/jp69/",
  },
  {
    name: "Cheluva Nyandeep",
    profession: "Backend Engineer, Dseide",
    image: "/Deepu.png",
    description:
      "Yash made backend integration feel effortless on the UI side. He designed interfaces that mapped cleanly to our APIs and always pushed for clarity in how data showed up on screen.",
    linkedinUrl: "https://www.linkedin.com/in/chevula-jnyandeep/",
  },
];

function TestimonialCard({
  name,
  profession,
  image,
  description,
  linkedinUrl,
  index,
  total,
}: Testimonial & { index: number; total: number }) {
  return (
    <li
      className={cn(
        "flex h-full flex-col border border-border bg-card p-3 sm:p-5",
        "border-x-0",
        index === 0 ? "border-t-0" : "border-t",
        index === total - 1 ? "border-b-0" : "border-b",
        index < 2 ? "sm:border-t-0" : "sm:border-t",
        index >= total - 2 ? "sm:border-b-0" : "sm:border-b",
        index % 2 === 0 ? "sm:border-l-0" : "sm:border-l",
        index % 2 === 1 ? "sm:border-r-0" : "sm:border-r",
        index < 3 ? "lg:border-t-0" : "lg:border-t",
        index >= total - 3 ? "lg:border-b-0" : "lg:border-b",
        index % 3 === 0 ? "lg:border-l-0" : "lg:border-l",
        index % 3 === 2 ? "lg:border-r-0" : "lg:border-r",
      )}
    >
      <div className="flex items-start gap-3">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          loading="lazy"
          className="size-10 shrink-0 rounded-full border border-border object-cover sm:size-11"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-foreground">
            {name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{profession}</p>
        </div>

        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <TbBrandLinkedin className="size-4" aria-hidden />
          </a>
        ) : null}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
        {description}
      </p>
    </li>
  );
}

export default function TestimonialSection() {
  return (
    <div>
      <h2 className="page-subheading">People I worked with</h2>

      <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 px-4 sm:mt-6 sm:px-10">
        <span
          aria-hidden
          className={cn("absolute inset-x-0 top-0", horizontalRuleClassName)}
        />
        <span
          aria-hidden
          className={cn("absolute inset-x-0 bottom-0", horizontalRuleClassName)}
        />

        <div className="relative mx-auto max-w-7xl">
          <span
            aria-hidden
            className={cn(
              "absolute -top-8 -bottom-8 left-0",
              verticalRuleClassName,
            )}
          />
          <span
            aria-hidden
            className={cn(
              "absolute -top-8 -bottom-8 right-0",
              verticalRuleClassName,
            )}
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                index={index}
                total={testimonials.length}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
