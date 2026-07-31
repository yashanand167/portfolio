import type { IconType } from "react-icons";
import {
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
  TbMail,
} from "react-icons/tb";

type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

const socialLinks: SocialLink[] = [
  { name: "X", href: "https://x.com/yashanand167", icon: TbBrandX },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-anand-b7264b308/",
    icon: TbBrandLinkedin,
  },
  { name: "Email", href: "mailto:yash.anand167@gmail.com", icon: TbMail },
  {
    name: "Instagram",
    href: "https://www.instagram.com/yash.anand167",
    icon: TbBrandInstagram,
  },
];

function SocialLinkBadge({ href, icon: Icon }: SocialLink) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-muted p-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
    >
      <Icon className="size-4 shrink-0" aria-hidden />
    </a>
  );
}

export default function SocialLinks() {
  return (
    <div className="mt-4">
      <p className="text-muted-foreground">Reach me out on</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <SocialLinkBadge key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
}
