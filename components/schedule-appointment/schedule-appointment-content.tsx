"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HubSpotMeetings } from "@/components/ui/hubspot-meetings";
import { MapPin, Phone, Calendar, CheckCircle2, Home, DollarSign, Users, Clock, Map } from "lucide-react";
import { CONTACT_INFO, SEO_CONFIG } from "@/config/seo";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguageStore } from "@/store/language-store";
import { AnimatedSection } from "@/components/ui/animated-section";

const address = "45 Bridge St, LaBelle, FL 33935";
const googleMapsUrl = "https://maps.app.goo.gl/iPK2Xa6eG8RCyT8m8";
// Base URL sin parámetros de idioma - los agregaremos dinámicamente
const googleMapsEmbedBaseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.3257077253446!2d-81.43737737748471!3d26.762324092310248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db856a8ff9fc6b%3A0xce6810c83740a1d4!2sMJ%20Newell%20Homes!5e0!4v1765941661174";

export const ScheduleAppointmentContent = () => {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  
  // Construir URL del embed con el idioma correcto
  const googleMapsEmbedUrl = useMemo(() => {
    const lang = language === "es" ? "es" : "en";
    const region = language === "es" ? "US" : "US"; // Mantener US como región
    return `${googleMapsEmbedBaseUrl}&hl=${lang}&gl=${region}`;
  }, [language]);

  // URL del embed de HubSpot Meetings
  const meetingsEmbedUrl = "https://meetings.hubspot.com/jrodriguez134/meeting-web?embed=true";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section - Moderno y llamativo */}
      <AnimatedSection delay={0}>
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calendar className="h-4 w-4" />
              <span suppressHydrationWarning>{t("scheduleAppointment.title")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent" suppressHydrationWarning>
              {t("scheduleAppointment.heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
              {t("scheduleAppointment.heroSubtitle")}
            </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Content - Formulario como elemento principal */}
      <AnimatedSection delay={0.1}>
        <section className="py-8 md:py-12 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Columna Principal - Formulario (2/3 del espacio) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Formulario destacado */}
                <Card className="border-2 border-primary/20 shadow-2xl">
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground" suppressHydrationWarning>
                              {t("scheduleAppointment.formTitle")}
                            </h2>
                            <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                              {t("scheduleAppointment.formDescription")}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                        <HubSpotMeetings
                          embedUrl={meetingsEmbedUrl}
                          className="w-full h-full"
                        />
                    </div>
                  </CardContent>
                </Card>

                {/* Beneficios - Diseño moderno */}
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2" suppressHydrationWarning>
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {t("scheduleAppointment.whatToExpect.title")}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-sm" suppressHydrationWarning>
                            {t("scheduleAppointment.whatToExpect.financialEvaluation.title")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("scheduleAppointment.whatToExpect.financialEvaluation.description")}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md">
                            <Home className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-sm" suppressHydrationWarning>
                            {t("scheduleAppointment.whatToExpect.viewHomes.title")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("scheduleAppointment.whatToExpect.viewHomes.description")}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-sm" suppressHydrationWarning>
                            {t("scheduleAppointment.whatToExpect.personalConsultation.title")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("scheduleAppointment.whatToExpect.personalConsultation.description")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Información de oficina (1/3 del espacio) */}
              <div className="space-y-6">
                {/* Office Image Card */}
                <Card className="overflow-hidden border-2">
                  <CardContent className="p-0">
                    <div className="relative w-full h-64 md:h-80">
                      <Image
                        src="/img/hero/1w5a0741-1.webp"
                        alt="M.J. Newell Homes Office - 45 Bridge St, LaBelle, FL"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-bold" suppressHydrationWarning>
                              {t("scheduleAppointment.officeInfo.title")}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground">{address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Information Card - Sin sticky */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-muted-foreground" suppressHydrationWarning>
                          {t("scheduleAppointment.officeInfo.address")}
                        </h4>
                        <p className="text-sm font-medium">{address}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-1 text-muted-foreground flex items-center gap-2" suppressHydrationWarning>
                          <Phone className="h-4 w-4" />
                          {t("scheduleAppointment.officeInfo.phone")}
                        </h4>
                        <a
                          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-muted-foreground flex items-center gap-2" suppressHydrationWarning>
                          <Clock className="h-4 w-4" />
                          {t("scheduleAppointment.officeInfo.hours")}
                        </h4>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p suppressHydrationWarning>
                            {t("scheduleAppointment.officeInfo.weekdays")}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                          </p>
                          <p suppressHydrationWarning>
                            {t("scheduleAppointment.officeInfo.saturday")}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                          </p>
                          <p suppressHydrationWarning>
                            {t("scheduleAppointment.officeInfo.sunday")}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t space-y-2">
                        <Button
                          asChild
                          className="w-full"
                          size="default"
                        >
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Map className="h-4 w-4" />
                            <span suppressHydrationWarning>{t("scheduleAppointment.getDirections")}</span>
                          </a>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          size="default"
                        >
                          <a
                            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                            className="flex items-center justify-center gap-2"
                          >
                            <Phone className="h-4 w-4" />
                            <span suppressHydrationWarning>{t("scheduleAppointment.callNow")}</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Card */}
                <Card className="overflow-hidden border-2">
                  <CardContent className="p-0">
                    <div className="relative w-full h-[300px]">
                      <iframe
                        src={googleMapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="M.J. Newell Homes Office Location"
                        className="absolute inset-0"
                      />
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
