"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/config/seo";
import { useTranslation } from "@/hooks/use-translation";

const address = "45 Bridge St, LaBelle, FL 33935";

export const Footer = () => {
  const { t: translationFn, isLoading } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  const t = useMemo(() => {
    return translationFn || ((key: string) => key);
  }, [translationFn]);

  const footerSections = useMemo(() => {
    if (!isMounted || isLoading || !t) {
      return [];
    }
    
    const safeT = (key: string, fallback?: string) => {
      try {
        const result = t(key);
        return result && result !== key ? result : (fallback || key);
      } catch {
        return fallback || key;
      }
    };
    
    return [
      {
        title: safeT("footer.sections.properties", "Properties"),
        links: [
          { label: safeT("nav.models", "Models"), href: "/models" },
          { label: safeT("footer.links.duplex", "Duplex"), href: "/duplex" },
          { label: safeT("nav.rentToOwn", "Rent to Own"), href: "/rent-to-own" },
          { label: safeT("footer.links.rentalApplication", "Rental Application"), href: "/rental-application" },
        ],
      },
      {
        title: safeT("footer.sections.communities", "Communities"),
        links: [
          { label: safeT("nav.labelle", "LaBelle, FL"), href: "/communities/labelle" },
          { label: safeT("nav.lehighAcres", "Lehigh Acres, FL"), href: "/communities/lehigh-acres" },
        ],
      },
      {
        title: safeT("footer.sections.resources", "Resources"),
        links: [
          { label: safeT("nav.warranty", "Warranty"), href: "/warranty" },
          { label: safeT("nav.homeBuyingGuide", "Home Buying Guide"), href: "/home-buying-guide" },
          { label: safeT("footer.links.scheduleAppointment", "Schedule Appointment"), href: "/schedule-appointment" },
        ],
      },
      {
        title: safeT("footer.sections.company", "Company"),
        links: [
          { label: safeT("nav.aboutUs", "About Us"), href: "/about-us" },
          { label: safeT("nav.contact", "Contact"), href: "/contact" },
          { label: safeT("footer.links.privacyPolicy", "Privacy Policy"), href: "/privacy-policy" },
        ],
      },
    ];
  }, [t, isLoading, isMounted]);

  return (
    <footer className="border-t border-border/40 bg-foreground text-background animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="container mx-auto px-4 sm:px-5 md:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info - Larger Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/img/logo-blanco.png"
                alt="M.J. Newell Homes"
                width={200}
                height={60}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-background/80 leading-relaxed max-w-md" suppressHydrationWarning>
              {t ? t("footer.description") || "Building American Homes in South Florida. New constructions in LaBelle and Lehigh Acres. Rent to Own programs with $0 down payment." : "Building American Homes in South Florida. New constructions in LaBelle and Lehigh Acres. Rent to Own programs with $0 down payment."}
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-background/90 mb-1" suppressHydrationWarning>{t ? t("footer.address") || "Address" : "Address"}</p>
                  <p className="text-sm text-background/70">{address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-background/90 mb-1" suppressHydrationWarning>{t ? t("footer.phone") || "Phone" : "Phone"}</p>
                  <div className="space-y-1">
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                      className="text-sm text-background/70 hover:text-primary transition-colors block"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    {CONTACT_INFO.phoneSecondary && (
                      <a
                        href={`tel:${CONTACT_INFO.phoneSecondary.replace(/\s/g, "")}`}
                        className="text-sm text-background/70 hover:text-primary transition-colors block"
                      >
                        {CONTACT_INFO.phoneSecondary}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-background/90 mb-1" suppressHydrationWarning>{t ? t("footer.email") || "Email" : "Email"}</p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-background/70 hover:text-primary transition-colors break-words"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-background/90 mb-3" suppressHydrationWarning>{t ? t("footer.followUs") || "Follow Us" : "Follow Us"}</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.facebook && (
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-background/10 hover:bg-primary/20 text-background/70 hover:text-background transition-all duration-300 hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {SOCIAL_LINKS.instagram && (
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-background/10 hover:bg-primary/20 text-background/70 hover:text-background transition-all duration-300 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {SOCIAL_LINKS.tiktok && (
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-background/10 hover:bg-primary/20 text-background/70 hover:text-background transition-all duration-300 hover:scale-110"
                    aria-label="TikTok"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
                {SOCIAL_LINKS.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-background/10 hover:bg-primary/20 text-background/70 hover:text-background transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.length > 0 && footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="font-bold text-background text-sm uppercase tracking-wider" suppressHydrationWarning>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors inline-block hover:translate-x-1 transition-transform duration-200"
                      suppressHydrationWarning
                    >
                      <span suppressHydrationWarning>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-background/70">
            <p suppressHydrationWarning>
                {t ? t("footer.copyright") || "Copyright © 2026 M.J. Newell Homes. All Rights Reserved" : "Copyright © 2026 M.J. Newell Homes. All Rights Reserved"}
            </p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-background transition-colors" suppressHydrationWarning>
                <span suppressHydrationWarning>{t ? t("footer.links.privacyPolicy") || "Privacy Policy" : "Privacy Policy"}</span>
              </Link>
              <Link href="/terms-conditions" className="hover:text-background transition-colors" suppressHydrationWarning>
                <span suppressHydrationWarning>{t ? t("footer.links.terms") || "Terms & Conditions" : "Terms & Conditions"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
