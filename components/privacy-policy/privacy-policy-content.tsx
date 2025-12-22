"use client";

import { useMemo } from "react";
import { PageContent } from "@/components/layout/page-container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { CONTACT_INFO } from "@/config/seo";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguageStore } from "@/store/language-store";

// Helper function to get nested value from translations
const getNestedValue = (obj: unknown, path: string): unknown => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && !Array.isArray(current) && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
};

export const PrivacyPolicyContent = () => {
  const { t } = useTranslation();
  const translations = useLanguageStore((state) => state.translations);
  const lastUpdated = "January 2025";

  const sections = useMemo(() => {
    const getArray = (path: string): string[] => {
      const value = getNestedValue(translations, path);
      return Array.isArray(value) ? (value as string[]) : [];
    };

    return [
      {
        icon: FileText,
        title: t("privacyPolicy.sections.informationWeCollect.title"),
        content: getArray("privacyPolicy.sections.informationWeCollect.content"),
      },
      {
        icon: Eye,
        title: t("privacyPolicy.sections.howWeUse.title"),
        content: getArray("privacyPolicy.sections.howWeUse.content"),
      },
      {
        icon: Lock,
        title: t("privacyPolicy.sections.informationSharing.title"),
        content: getArray("privacyPolicy.sections.informationSharing.content"),
      },
      {
        icon: Shield,
        title: t("privacyPolicy.sections.dataSecurity.title"),
        content: getArray("privacyPolicy.sections.dataSecurity.content"),
      },
    ];
  }, [t, translations]);

  return (
    <PageContent size="md">
      <div className="space-y-12 py-8 md:py-12">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" suppressHydrationWarning>
              {t("privacyPolicy.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground" suppressHydrationWarning>
              {t("privacyPolicy.lastUpdated")} {lastUpdated}
            </p>
            <p className="text-muted-foreground" suppressHydrationWarning>
              {t("privacyPolicy.intro")}
            </p>
          </div>
        </AnimatedSection>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <AnimatedSection key={section.title} delay={index * 50}>
                <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    {section.content.map((item, itemIndex) => (
                      <p key={itemIndex} className={item.startsWith("•") ? "pl-4" : ""}>
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
              <h2 className="text-2xl font-bold text-foreground" suppressHydrationWarning>
                {t("privacyPolicy.sections.yourRights.title")}
              </h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p suppressHydrationWarning>{t("privacyPolicy.sections.yourRights.description")}</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  {(() => {
                    const rights = getNestedValue(translations, "privacyPolicy.sections.yourRights.rights");
                    return Array.isArray(rights) ? (rights as string[]).map((right, index) => (
                      <li key={index} suppressHydrationWarning>{right}</li>
                    )) : null;
                  })()}
                </ul>
                <p className="pt-4" suppressHydrationWarning>
                  {t("privacyPolicy.sections.yourRights.contact")}
                </p>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-foreground" suppressHydrationWarning>
                {t("privacyPolicy.sections.cookies.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("privacyPolicy.sections.cookies.description")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-foreground" suppressHydrationWarning>
                {t("privacyPolicy.sections.changes.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("privacyPolicy.sections.changes.description")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Information */}
        <AnimatedSection delay={250}>
          <div className="bg-primary/5 rounded-xl p-8 md:p-12 text-center space-y-4 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground" suppressHydrationWarning>
              {t("privacyPolicy.sections.contact.title")}
            </h3>
            <p className="text-muted-foreground" suppressHydrationWarning>
              {t("privacyPolicy.sections.contact.description")}
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {CONTACT_INFO.phone}
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

