"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Home, FileText, ArrowRight } from "lucide-react";
import { useMemo } from "react";

interface ArticleCTAProps {
  category?: string;
  keywords?: string[];
  showBlogLink?: boolean;
}

export const ArticleCTA = ({ category, keywords = [], showBlogLink = true }: ArticleCTAProps) => {
  // Determine relevant links based on category and keywords
  const links = useMemo(() => {
    type LinkVariant = "default" | "outline" | "ghost" | "link";
    
    const linkList: Array<{
      href: string;
      label: string;
      icon: typeof Calendar;
      variant: LinkVariant;
      description: string;
    }> = [
      {
        href: "/schedule-appointment",
        label: "Schedule Appointment",
        icon: Calendar,
        variant: "default",
        description: "Visit our office and see our homes",
      },
      {
        href: "/rent-to-own",
        label: "Rent to Own Program",
        icon: Home,
        variant: "default",
        description: "$0 down payment program",
      },
    ];

    const existingHrefs = new Set(linkList.map((l) => l.href));

    // Add contextual links based on keywords
    const keywordString = keywords.join(" ").toLowerCase();
    
    // Rent to Own related
    if (/rent.?to.?own|lease.?option|rent.?to.?buy/i.test(keywordString)) {
      if (!existingHrefs.has("/blog/ultimate-guide-rent-to-own-florida")) {
        linkList.push({
          href: "/blog/ultimate-guide-rent-to-own-florida",
          label: "Complete Rent to Own Guide",
          icon: FileText,
          variant: "outline",
          description: "Everything about Rent to Own in Florida",
        });
        existingHrefs.add("/blog/ultimate-guide-rent-to-own-florida");
      }
    }

    // Tax related
    if (/tax|refund|homestead|exemption/i.test(keywordString)) {
      if (!existingHrefs.has("/blog/homestead-exemption-florida-complete-guide")) {
        linkList.push({
          href: "/blog/homestead-exemption-florida-complete-guide",
          label: "Homestead Exemption Guide",
          icon: FileText,
          variant: "outline",
          description: "Save on property taxes",
        });
        existingHrefs.add("/blog/homestead-exemption-florida-complete-guide");
      }
    }

    // Home buying related
    if (/home.?buy|first.?time|buying.?home|homeowner/i.test(keywordString)) {
      if (!existingHrefs.has("/blog/first-time-home-buyer-guide-complete-checklist")) {
        linkList.push({
          href: "/blog/first-time-home-buyer-guide-complete-checklist",
          label: "First-Time Home Buyer Guide",
          icon: FileText,
          variant: "outline",
          description: "Complete checklist for first-time buyers",
        });
        existingHrefs.add("/blog/first-time-home-buyer-guide-complete-checklist");
      }
    }

    // Mortgage/Finance related
    if (/mortgage|finance|loan|financing/i.test(keywordString)) {
      if (!existingHrefs.has("/blog/rent-to-own-vs-traditional-mortgage-comparison")) {
        linkList.push({
          href: "/blog/rent-to-own-vs-traditional-mortgage-comparison",
          label: "Rent to Own vs Mortgage",
          icon: FileText,
          variant: "outline",
          description: "Compare your options",
        });
        existingHrefs.add("/blog/rent-to-own-vs-traditional-mortgage-comparison");
      }
    }

    // Investment related
    if (/invest|wealth|equity|appreciation/i.test(keywordString)) {
      if (!existingHrefs.has("/blog/why-buy-home-2026-investment-florida")) {
        linkList.push({
          href: "/blog/why-buy-home-2026-investment-florida",
          label: "Why Buy a Home in 2026",
          icon: FileText,
          variant: "outline",
          description: "Learn about real estate investment",
        });
        existingHrefs.add("/blog/why-buy-home-2026-investment-florida");
      }
    }

    // Add category-specific links
    if (category === "Rent to Own") {
      if (!existingHrefs.has("/models")) {
        linkList.push({
          href: "/models",
          label: "View Our Models",
          icon: Home,
          variant: "outline",
          description: "Browse our new construction homes",
        });
      }
    } else if (category === "Taxes & Finance") {
      if (!existingHrefs.has("/blog/homestead-exemption-florida-complete-guide")) {
        linkList.push({
          href: "/blog/homestead-exemption-florida-complete-guide",
          label: "Homestead Exemption Guide",
          icon: FileText,
          variant: "outline",
          description: "Save on property taxes",
        });
      }
    } else if (category === "Home Buying Guide") {
      if (!existingHrefs.has("/models")) {
        linkList.push({
          href: "/models",
          label: "Browse Our Models",
          icon: Home,
          variant: "outline",
          description: "Explore our home models",
        });
      }
    }

    return linkList;
  }, [category, keywords]);

  return (
    <section className="mt-12 md:mt-16 py-8 md:py-12 px-6 md:px-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          Ready to Find Your Florida Home?
        </h3>
        <p className="text-base md:text-lg text-muted-foreground">
          Explore your options with M.J. Newell Homes today. We are here to guide you every step of the way.
        </p>
        
        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          {links.slice(0, 2).map((link, index) => {
            const Icon = link.icon;
            return (
              <Button key={index} asChild size="lg" variant={link.variant} className="w-full sm:w-auto">
                <Link href={link.href}>
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Secondary Links */}
        {links.length > 2 && (
          <div className="pt-4 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-3">Related Resources:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {links.slice(2).map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Blog Link */}
        {showBlogLink && (
          <div className="pt-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <FileText className="h-4 w-4" />
              Read more helpful guides in our blog
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
