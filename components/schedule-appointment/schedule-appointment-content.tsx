"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { MapPin, Phone, Calendar, CheckCircle2, Home, DollarSign, Users, Clock, Map, ExternalLink, Zap, MessageSquare } from "lucide-react";
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

  // URL de HubSpot Meetings para redirección
  const meetingsUrl = "https://meetings.hubspot.com/jrodriguez134/meeting-web";

  // URL de redirección después de enviar el formulario
  const redirectUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=contact`;
  }, []);

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
              {/* Columna Principal - Opciones de Agendamiento (2/3 del espacio) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Opciones destacadas */}
                <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-background via-background to-primary/5">
                  <CardContent className="p-6 md:p-8 lg:p-10">
                    <div className="mb-8 text-center space-y-3">
                      <h2 className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                        {t("scheduleAppointment.formTitle")}
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                      <p className="text-muted-foreground text-sm md:text-base pt-2 max-w-2xl mx-auto" suppressHydrationWarning>
                        {t("scheduleAppointment.formDescription")}
                      </p>
                    </div>
                    
                    <Tabs defaultValue="online" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1.5 bg-muted/50 gap-2">
                        <TabsTrigger 
                          value="online" 
                          className="flex flex-col items-center justify-center gap-2 py-4 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all rounded-lg"
                        >
                          <Zap className="h-5 w-5" />
                          <span className="text-sm font-semibold" suppressHydrationWarning>
                            {t("scheduleAppointment.options.onlineBooking.title")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="form" 
                          className="flex flex-col items-center justify-center gap-2 py-4 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all rounded-lg"
                        >
                          <MessageSquare className="h-5 w-5" />
                          <span className="text-sm font-semibold" suppressHydrationWarning>
                            {t("scheduleAppointment.options.form.title")}
                          </span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="online" className="space-y-6 mt-0">
                        <div className="space-y-6">
                          <div className="bg-primary/5 rounded-xl p-6 md:p-8 border border-primary/20">
                            <div className="text-center space-y-4">
                              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-2">
                                <Calendar className="h-10 w-10 text-primary" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl font-bold" suppressHydrationWarning>
                                  {t("scheduleAppointment.options.onlineBooking.title")}
                                </h3>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                  <Zap className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-primary" suppressHydrationWarning>
                                    {t("scheduleAppointment.options.onlineBooking.benefit")}
                                  </span>
                                </div>
                                <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed" suppressHydrationWarning>
                                  {t("scheduleAppointment.options.onlineBooking.description")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center pt-2">
                            <Button
                              asChild
                              size="lg"
                              className="gap-3 text-base px-10 py-7 h-auto hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                            >
                              <a
                                href={meetingsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Calendar className="h-5 w-5" />
                                <span suppressHydrationWarning>
                                  {t("scheduleAppointment.options.onlineBooking.button")}
                                </span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="form" className="space-y-6 mt-0">
                        <div className="space-y-6">
                          <div className="bg-primary/5 rounded-xl p-6 md:p-8 border border-primary/20">
                            <div className="text-center space-y-4">
                              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-2">
                                <MessageSquare className="h-10 w-10 text-primary" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-xl md:text-2xl font-bold" suppressHydrationWarning>
                                  {t("scheduleAppointment.options.form.title")}
                                </h3>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                                  <Users className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-primary" suppressHydrationWarning>
                                    {t("scheduleAppointment.options.form.benefit")}
                                  </span>
                                </div>
                                <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed" suppressHydrationWarning>
                                  {t("scheduleAppointment.options.form.description")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="pt-2">
                            <HubSpotForm
                              portalId="50215941"
                              formId="cde5f2ab-dd73-49f1-be0d-e7fa20bfbd23"
                              region="na1"
                              redirectUrl={redirectUrl}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
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
