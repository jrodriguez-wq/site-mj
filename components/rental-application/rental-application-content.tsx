"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { FileText, CheckCircle2, Home, DollarSign, Users, Clock, Shield, Phone, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/config/seo";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguageStore } from "@/store/language-store";
import { AnimatedSection } from "@/components/ui/animated-section";

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

// Configuración del formulario de HubSpot para aplicación de alquiler
const HUBSPOT_FORM_CONFIG = {
  portalId: "50215941",
  formId: "77bc0a99-fc8a-4509-8eb5-1b457f3452df", // Usar el mismo formulario o crear uno específico
  region: "na1" as const,
};

export const RentalApplicationContent = () => {
  const { t } = useTranslation();
  const translations = useLanguageStore((state) => state.translations);

  const benefits = useMemo(() => [
    {
      icon: DollarSign,
      title: t("rentalApplication.benefits.downPayment.title"),
      description: t("rentalApplication.benefits.downPayment.description"),
    },
    {
      icon: Home,
      title: t("rentalApplication.benefits.moveInFast.title"),
      description: t("rentalApplication.benefits.moveInFast.description"),
    },
    {
      icon: Shield,
      title: t("rentalApplication.benefits.buildEquity.title"),
      description: t("rentalApplication.benefits.buildEquity.description"),
    },
    {
      icon: Users,
      title: t("rentalApplication.benefits.familyFriendly.title"),
      description: t("rentalApplication.benefits.familyFriendly.description"),
    },
  ], [t]);

  const requirements = useMemo(() => {
    const value = getNestedValue(translations, "rentalApplication.requirements.items");
    return Array.isArray(value) ? (value as string[]) : [];
  }, [translations]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <AnimatedSection delay={0}>
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FileText className="h-4 w-4" />
                <span suppressHydrationWarning>{t("rentalApplication.title")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight px-4" suppressHydrationWarning>
                {t("rentalApplication.heroTitle")}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
                {t("rentalApplication.heroSubtitle")}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Content */}
      <AnimatedSection delay={0.1}>
        <section className="py-8 md:py-12 pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Column - Application Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Application Form */}
                  <Card className="border-2 border-primary/20 shadow-2xl">
                    <CardContent className="p-6 md:p-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight" suppressHydrationWarning>
                                {t("rentalApplication.formTitle")}
                              </h2>
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>
                                {t("rentalApplication.formDescription")}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* HubSpot Form */}
                        <div className="rounded-xl p-6">
                          <HubSpotForm
                            portalId={HUBSPOT_FORM_CONFIG.portalId}
                            formId={HUBSPOT_FORM_CONFIG.formId}
                            region={HUBSPOT_FORM_CONFIG.region}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Requirements Card */}
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 leading-tight" suppressHydrationWarning>
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                        <span className="min-w-0">{t("rentalApplication.requirements.title")}</span>
                      </h3>
                      <div className="space-y-3">
                        <p className="text-muted-foreground" suppressHydrationWarning>
                          {t("rentalApplication.requirements.description")}
                        </p>
                        <ul className="space-y-2">
                          {requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground" suppressHydrationWarning>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Benefits Card */}
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight" suppressHydrationWarning>
                        {t("rentalApplication.whyApply")}
                      </h3>
                      <div className="space-y-4">
                        {benefits.map((benefit, index) => {
                          const Icon = benefit.icon;
                          return (
                            <div key={index} className="flex items-start gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                  {benefit.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Process Timeline */}
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 leading-tight" suppressHydrationWarning>
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                        <span className="min-w-0">{t("rentalApplication.process.title")}</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                              1
                            </div>
                            <div className="w-0.5 h-full bg-border mt-2" />
                          </div>
                          <div className="flex-1 pb-4">
                            <h4 className="font-semibold text-foreground" suppressHydrationWarning>
                              {t("rentalApplication.process.step1.title")}
                            </h4>
                            <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                              {t("rentalApplication.process.step1.description")}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                              2
                            </div>
                            <div className="w-0.5 h-full bg-border mt-2" />
                          </div>
                          <div className="flex-1 pb-4">
                            <h4 className="font-semibold text-foreground" suppressHydrationWarning>
                              {t("rentalApplication.process.step2.title")}
                            </h4>
                            <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                              {t("rentalApplication.process.step2.description")}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                              3
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground" suppressHydrationWarning>
                              {t("rentalApplication.process.step3.title")}
                            </h4>
                            <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                              {t("rentalApplication.process.step3.description")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Card */}
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight" suppressHydrationWarning>
                        {t("rentalApplication.needHelp.title")}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed" suppressHydrationWarning>
                        {t("rentalApplication.needHelp.description")}
                      </p>
                      <div className="space-y-3">
                        <a
                          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="h-5 w-5 text-primary" />
                          <span className="text-sm">{CONTACT_INFO.phone}</span>
                        </a>
                        <a
                          href={`mailto:${CONTACT_INFO.email}`}
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="h-5 w-5 text-primary" />
                          <span className="text-sm break-all">{CONTACT_INFO.email}</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

