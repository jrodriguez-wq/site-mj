import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Globe, Instagram, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/seo";
import { TikTokIcon } from "@/components/icons/tiktok-icon";

type LinkItem = {
  href: string;
  label: string;
  hint: string;
  external?: boolean;
  icon: ReactNode;
};

const socials: LinkItem[] = [
  SOCIAL_LINKS.instagram
    ? {
        href: SOCIAL_LINKS.instagram,
        label: "Instagram",
        hint: "@mjnewellhomes",
        external: true,
        icon: <Instagram className="h-5 w-5" aria-hidden />,
      }
    : null,
  SOCIAL_LINKS.facebook
    ? {
        href: SOCIAL_LINKS.facebook,
        label: "Facebook",
        hint: "M.J. Newell Homes",
        external: true,
        icon: <Facebook className="h-5 w-5" aria-hidden />,
      }
    : null,
  SOCIAL_LINKS.tiktok
    ? {
        href: SOCIAL_LINKS.tiktok,
        label: "TikTok",
        hint: "@mjnhomesofficial",
        external: true,
        icon: <TikTokIcon size={20} />,
      }
    : null,
  SOCIAL_LINKS.linkedin
    ? {
        href: SOCIAL_LINKS.linkedin,
        label: "LinkedIn",
        hint: "M.J. Newell Homes FL",
        external: true,
        icon: <Linkedin className="h-5 w-5" aria-hidden />,
      }
    : null,
].filter((item): item is LinkItem => item !== null);

export default function LinksPage() {
  return (
    <div className="min-h-dvh bg-foreground text-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/img/logo-blanco.png"
            alt="M.J. Newell Homes"
            width={220}
            height={64}
            priority
            className="h-12 w-auto object-contain"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-background">
              M.J. Newell Homes
            </h1>
            <p className="text-sm text-background/75">
              New construction homes in LaBelle and Lehigh Acres, Florida.
            </p>
          </div>
        </div>

        <nav aria-label="Website and social profiles" className="w-full flex flex-col gap-3">
          <Link
            href="/"
            className="flex min-h-14 items-center gap-3 rounded-xl bg-primary px-4 text-primary-foreground shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
              <Globe className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 text-left">
              <span className="block font-semibold leading-tight">Visit our website</span>
              <span className="block text-sm text-primary-foreground/80">mjnewellhomes.com</span>
            </span>
          </Link>

          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center gap-3 rounded-xl border border-background/20 bg-background/10 px-4 text-background transition-colors duration-200 hover:bg-background/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/10">
                {item.icon}
              </span>
              <span className="min-w-0 text-left">
                <span className="block font-semibold leading-tight">{item.label}</span>
                <span className="block text-sm text-background/70">{item.hint}</span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
