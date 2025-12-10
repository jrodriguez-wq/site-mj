import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/config/seo";

const footerSections = [
  {
    title: "Properties",
    links: [
      { label: "Models", href: "/models" },
      { label: "Duplex", href: "/duplex" },
      { label: "Rent to Own", href: "/rent-to-own" },
      { label: "Rental Application", href: "/rental-application" },
    ],
  },
  {
    title: "Communities",
    links: [
      { label: "LaBelle, FL", href: "/communities/labelle" },
      { label: "Lehigh Acres, FL", href: "/communities/lehigh-acres" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Warranty/Service Request", href: "/warranty" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/img/LOGO BLANCO.png"
                alt="M.J. Newell Homes"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-background/80 mb-4">
              Building American Homes in South Florida. New constructions in
              LaBelle and Lehigh Acres.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-background">Phone:</strong>{" "}
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
                {CONTACT_INFO.phoneSecondary && (
                  <>
                    {" | "}
                    <a
                      href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                      className="text-background/80 hover:text-primary transition-colors"
                    >
                      {CONTACT_INFO.phoneSecondary}
                    </a>
                  </>
                )}
              </p>
              <p>
                <strong className="text-background">Email:</strong>{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              {SOCIAL_LINKS.website && (
                <p>
                  <strong className="text-background">Website:</strong>{" "}
                  <a
                    href={SOCIAL_LINKS.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    {SOCIAL_LINKS.website.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {SOCIAL_LINKS.tiktok && (
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-background">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/70">
          <p>
            Copyright © 2024 M.J. Newell Homes. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

