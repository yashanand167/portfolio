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
  linkedinUrl: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Aarav Mehta",
    profession: "Product Manager, Dseide",
    image: "/Profile.png",
    description:
      "Yash has a rare mix of design taste and engineering rigour. He shipped flows that looked exactly like the mocks, and then improved the mocks once he saw them running.",
    linkedinUrl: "https://www.linkedin.com/in/aarav-mehta",
  },
  {
    name: "Sara Klein",
    profession: "Founder, Nutriq",
    image: "/Me.png",
    description:
      "He took our nutrition app from a vague idea to a complete design system in weeks. The user research he ran reshaped how we thought about onboarding entirely.",
    linkedinUrl: "https://www.linkedin.com/in/sara-klein",
  },
  {
    name: "Rohan Iyer",
    profession: "Senior Frontend Engineer",
    image: "/Profile.png",
    description:
      "Reviewing Yash's pull requests is easy. Components are small, accessible, and named the way you would expect. He genuinely cares about the person reading the code next.",
    linkedinUrl: "https://www.linkedin.com/in/rohan-iyer",
  },
  {
    name: "Emily Carter",
    profession: "Design Lead",
    image: "/Me.png",
    description:
      "Yash bridges the gap our team always struggled with. Handoff stopped being a negotiation because he could speak to both the design intent and the implementation cost.",
    linkedinUrl: "https://www.linkedin.com/in/emily-carter",
  },
  {
    name: "Daniel Osei",
    profession: "CTO, Layerbase",
    image: "/Profile.png",
    description:
      "We needed a React Native app that felt native on both platforms. He delivered it, along with motion details nobody asked for but everyone noticed.",
    linkedinUrl: "https://www.linkedin.com/in/daniel-osei",
  },
  {
    name: "Priya Nair",
    profession: "UX Researcher",
    image: "/Me.png",
    description:
      "He treats feedback as data rather than criticism. Every round of testing came back with thoughtful changes, and he always explained the reasoning behind them.",
    linkedinUrl: "https://www.linkedin.com/in/priya-nair",
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
        "flex h-full flex-col border border-border bg-card p-5",
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
          width={44}
          height={44}
          loading="lazy"
          className="size-11 shrink-0 rounded-full border border-border object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-foreground">
            {name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">{profession}</p>
        </div>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-primary"
        >
          <TbBrandLinkedin className="size-4" aria-hidden />
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </li>
  );
}

export default function TestimonialSection() {
  return (
    <div>
      <h2 className="text-xl font-medium font-serif">People I worked with</h2>

      <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-6 sm:px-10">
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
