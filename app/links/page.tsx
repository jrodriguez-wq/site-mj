import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Globe, Instagram, Linkedin, Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/seo";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";

type LinkItem = {
  href: string;
  label: string;
  hint: string;
  external?: boolean;
  icon: ReactNode;
};

function socialLink(
  href: string,
  label: string,
  hint: string,
  icon: ReactNode,
): LinkItem | null {
  if (!href) return null;
  return { href, label, hint, external: true, icon };
}

const socials: LinkItem[] = [
  socialLink(SOCIAL_LINKS.instagram, "Instagram", "@mjnewellhomes", <Instagram className="h-5 w-5" aria-hidden />),
  socialLink(SOCIAL_LINKS.facebook, "Facebook", "M.J. Newell Homes", <Facebook className="h-5 w-5" aria-hidden />),
  socialLink(SOCIAL_LINKS.tiktok, "TikTok", "@mjnhomesofficial", <TikTokIcon size={20} />),
  socialLink(SOCIAL_LINKS.linkedin, "LinkedIn", "M.J. Newell Homes FL", <Linkedin className="h-5 w-5" aria-hidden />),
  socialLink(SOCIAL_LINKS.youtube, "YouTube", "M.J. Newell Homes", <Youtube className="h-5 w-5" aria-hidden />),
].filter((item): item is LinkItem => item !== null);

export default function LinksPage() {
  return (
    <div className="min-h-dvh bg-foreground text-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src={getCloudinaryImageUrl("/img/logo-blanco.png")}
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
