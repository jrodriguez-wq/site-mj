"use client";

import { useMemo } from "react";
import { PageContent } from "@/components/layout/page-container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";
import { CONTACT_INFO } from "@/config/seo";
import { CURRENT_YEAR } from "@/config/version";
import { getCopy, COPY } from "@/lib/constants/copy";

// Helper function to get nested value from translations
const getNestedValue = (obj: unknown, path: string): unknown => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      key in current
    ) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
};

export const TermsConditionsContent = () => {
  const lastUpdated = `January ${CURRENT_YEAR}`;

  const sections = useMemo(() => {
    const getArray = (path: string): string[] => {
      const value = getNestedValue(COPY, path);
      return Array.isArray(value) ? (value as string[]) : [];
    };

    return [
      {
        icon: FileText,
        title: getCopy("termsConditions.sections.acceptance.title"),
        content: getArray("termsConditions.sections.acceptance.content"),
      },
      {
        icon: Scale,
        title: getCopy("termsConditions.sections.useOfWebsite.title"),
        content: getArray("termsConditions.sections.useOfWebsite.content"),
      },
      {
        icon: AlertCircle,
        title: getCopy("termsConditions.sections.propertyInformation.title"),
        content: getArray(
          "termsConditions.sections.propertyInformation.content"
        ),
      },
      {
        icon: CheckCircle,
        title: getCopy("termsConditions.sections.rentToOwn.title"),
        content: getArray("termsConditions.sections.rentToOwn.content"),
      },
    ];
  }, []);

  return (
    <PageContent size="md">
      <div className="space-y-12 py-8 md:py-12">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4">
              <Scale className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight"
              suppressHydrationWarning
            >
              {getCopy("termsConditions.title")}
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed"
              suppressHydrationWarning
            >
              {getCopy("termsConditions.lastUpdated")} {lastUpdated}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
              {getCopy("termsConditions.intro")}
            </p>
          </div>
        </AnimatedSection>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <AnimatedSection key={section.title} delay={index * 50}>
                <div className="bg-card border rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                      <Icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight min-w-0">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    {section.content.map((item, itemIndex) => (
                      <p
                        key={itemIndex}
                        className={item.startsWith("•") ? "pl-4" : ""}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Additional Sections */}
        <AnimatedSection delay={200}>
          <div className="space-y-6">
            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2
                className="text-2xl font-bold text-foreground"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.limitation.title")}
              </h2>
              <p
                className="text-muted-foreground leading-relaxed"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.limitation.description")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2
                className="text-2xl font-bold text-foreground"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.intellectualProperty.title")}
              </h2>
              <p
                className="text-muted-foreground leading-relaxed"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.intellectualProperty.description")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2
                className="text-2xl font-bold text-foreground"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.disputeResolution.title")}
              </h2>
              <p
                className="text-muted-foreground leading-relaxed"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.disputeResolution.description")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2
                className="text-2xl font-bold text-foreground"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.governingLaw.title")}
              </h2>
              <p
                className="text-muted-foreground leading-relaxed"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.governingLaw.description")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2
                className="text-2xl font-bold text-foreground"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.changes.title")}
              </h2>
              <p
                className="text-muted-foreground leading-relaxed"
                suppressHydrationWarning
              >
                {getCopy("termsConditions.sections.changes.description")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Information */}
        <AnimatedSection delay={250}>
          <div className="bg-primary/5 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 text-center space-y-3 sm:space-y-4 border border-primary/10">
            <h3
              className="text-xl sm:text-2xl font-bold text-foreground leading-tight px-4"
              suppressHydrationWarning
            >
              {getCopy("termsConditions.sections.contact.title")}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-4" suppressHydrationWarning>
              {getCopy("termsConditions.sections.contact.description")}
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT_INFO.emailLinkLabel}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href={CONTACT_INFO.phoneTelHref}
                  className="text-primary hover:underline"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <strong>Address:</strong> 45 Bridge St, LaBelle, FL 33935
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageContent>
  );
};
