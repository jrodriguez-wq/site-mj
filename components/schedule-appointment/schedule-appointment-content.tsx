"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { MapPin, Phone, Calendar, CheckCircle2, Home, DollarSign, Users, Clock, Map, ExternalLink, Zap, MessageSquare } from "lucide-react";
import { CONTACT_INFO, SEO_CONFIG } from "@/config/seo";
import { getCopy } from "@/lib/constants/copy";
import { AnimatedSection } from "@/components/ui/animated-section";

const address = "45 Bridge St, LaBelle, FL 33935";
const googleMapsUrl = "https://maps.app.goo.gl/iPK2Xa6eG8RCyT8m8";
// Base URL sin parámetros de idioma - los agregaremos dinámicamente
const googleMapsEmbedBaseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.3257077253446!2d-81.43737737748471!3d26.762324092310248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db856a8ff9fc6b%3A0xce6810c83740a1d4!2sMJ%20Newell%20Homes!5e0!4v1765941661174";

const googleMapsEmbedUrl = `${googleMapsEmbedBaseUrl}&hl=en&gl=US`;

export const ScheduleAppointmentContent = () => {

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
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
            <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span suppressHydrationWarning>{getCopy("scheduleAppointment.title")}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight sm:leading-tight" suppressHydrationWarning>
              {getCopy("scheduleAppointment.heroTitle")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0" suppressHydrationWarning>
              {getCopy("scheduleAppointment.heroSubtitle")}
            </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Content - Formulario como elemento principal */}
      <AnimatedSection delay={0.1}>
        <section className="py-6 sm:py-8 md:py-12 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Columna Principal - Opciones de Agendamiento (2/3 del espacio) */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Opciones destacadas */}
                <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-background via-background to-primary/5">
                  <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="mb-6 sm:mb-8 text-center space-y-2 sm:space-y-3">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                        {getCopy("scheduleAppointment.formTitle")}
                      </h2>
                      <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                      <p className="text-muted-foreground text-xs sm:text-sm md:text-base pt-1 sm:pt-2 max-w-2xl mx-auto px-2 sm:px-0" suppressHydrationWarning>
                        {getCopy("scheduleAppointment.formDescription")}
                      </p>
                    </div>
                    
                    <Tabs defaultValue="online" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 h-auto p-1 sm:p-1.5 bg-muted/50 gap-1.5 sm:gap-2">
                        <TabsTrigger 
                          value="online" 
                          className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all rounded-lg text-xs sm:text-sm"
                        >
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold leading-tight text-center" suppressHydrationWarning>
                            {getCopy("scheduleAppointment.options.onlineBooking.title")}
                          </span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="form" 
                          className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all rounded-lg text-xs sm:text-sm"
                        >
                          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold leading-tight text-center" suppressHydrationWarning>
                            {getCopy("scheduleAppointment.options.form.title")}
                          </span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="online" className="space-y-4 sm:space-y-6 mt-0">
                        <div className="space-y-4 sm:space-y-6">
                          <div className="bg-primary/5 rounded-xl p-4 sm:p-6 md:p-8 border border-primary/20">
                            <div className="text-center space-y-3 sm:space-y-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 mb-1 sm:mb-2">
                                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold" suppressHydrationWarning>
                                  {getCopy("scheduleAppointment.options.onlineBooking.title")}
                                </h3>
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary/10 rounded-full">
                                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                                  <span className="text-xs sm:text-sm font-medium text-primary" suppressHydrationWarning>
                                    {getCopy("scheduleAppointment.options.onlineBooking.benefit")}
                                  </span>
                                </div>
                                <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0" suppressHydrationWarning>
                                  {getCopy("scheduleAppointment.options.onlineBooking.description")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center pt-1 sm:pt-2">
                            <Button
                              asChild
                              size="lg"
                              className="gap-2 sm:gap-3 text-sm sm:text-base px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 h-auto hover:scale-105 transition-transform shadow-lg hover:shadow-xl w-full sm:w-auto"
                            >
                              <a
                                href={meetingsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span suppressHydrationWarning>
                                  {getCopy("scheduleAppointment.options.onlineBooking.button")}
                                </span>
                                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="form" className="space-y-4 sm:space-y-6 mt-0">
                        <div className="space-y-4 sm:space-y-6">
                          <div className="bg-primary/5 rounded-xl p-4 sm:p-6 md:p-8 border border-primary/20">
                            <div className="text-center space-y-3 sm:space-y-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 mb-1 sm:mb-2">
                                <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold" suppressHydrationWarning>
                                  {getCopy("scheduleAppointment.options.form.title")}
                                </h3>
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary/10 rounded-full">
                                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                                  <span className="text-xs sm:text-sm font-medium text-primary" suppressHydrationWarning>
                                    {getCopy("scheduleAppointment.options.form.benefit")}
                                  </span>
                                </div>
                                <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0" suppressHydrationWarning>
                                  {getCopy("scheduleAppointment.options.form.description")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="pt-1 sm:pt-2">
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
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                      <span suppressHydrationWarning>{getCopy("scheduleAppointment.whatToExpect.title")}</span>
                    </h3>
                    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
                            <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-xs sm:text-sm" suppressHydrationWarning>
                            {getCopy("scheduleAppointment.whatToExpect.financialEvaluation.title")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-7 sm:pl-0" suppressHydrationWarning>
                          {getCopy("scheduleAppointment.whatToExpect.financialEvaluation.description")}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
                            <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-xs sm:text-sm" suppressHydrationWarning>
                            {getCopy("scheduleAppointment.whatToExpect.viewHomes.title")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-7 sm:pl-0" suppressHydrationWarning>
                          {getCopy("scheduleAppointment.whatToExpect.viewHomes.description")}
                        </p>
                      </div>
                      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
                            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-xs sm:text-sm" suppressHydrationWarning>
                            {getCopy("scheduleAppointment.whatToExpect.personalConsultation.title")}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-7 sm:pl-0" suppressHydrationWarning>
                          {getCopy("scheduleAppointment.whatToExpect.personalConsultation.description")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Información de oficina (1/3 del espacio) */}
              <div className="space-y-4 sm:space-y-6">
                {/* Office Image Card */}
                <Card className="overflow-hidden border-2">
                  <CardContent className="p-0">
                    <div className="relative w-full h-56 sm:h-64 md:h-80">
                      <Image
                        src="/img/hero/1w5a0741-1.webp"
                        alt="M.J. Newell Homes Office - 45 Bridge St, LaBelle, FL"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                        <div className="bg-background/95 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 border border-border/50">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                            <h3 className="text-xs sm:text-sm font-bold" suppressHydrationWarning>
                              {getCopy("scheduleAppointment.officeInfo.title")}
                            </h3>
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Information Card - Sin sticky */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold mb-1 text-muted-foreground" suppressHydrationWarning>
                          {getCopy("scheduleAppointment.officeInfo.address")}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium leading-relaxed">{address}</p>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold mb-1 text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                          <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span suppressHydrationWarning>{getCopy("scheduleAppointment.officeInfo.phone")}</span>
                        </h4>
                        <a
                          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                          className="text-xs sm:text-sm text-primary hover:underline font-medium block mt-0.5"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span suppressHydrationWarning>{getCopy("scheduleAppointment.officeInfo.hours")}</span>
                        </h4>
                        <div className="text-[10px] sm:text-xs text-muted-foreground space-y-0.5 sm:space-y-1 leading-relaxed">
                          <p suppressHydrationWarning>
                            {getCopy("scheduleAppointment.officeInfo.weekdays")}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                          </p>
                          <p suppressHydrationWarning>
                            {getCopy("scheduleAppointment.officeInfo.saturday")}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                          </p>
                          <p suppressHydrationWarning>
                            {getCopy("scheduleAppointment.officeInfo.sunday")}: {CONTACT_INFO.openingHoursDisplay.opens} - {CONTACT_INFO.openingHoursDisplay.closes}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 sm:pt-4 border-t space-y-2">
                        <Button
                          asChild
                          className="w-full text-xs sm:text-sm"
                          size="default"
                        >
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 sm:gap-2"
                          >
                            <Map className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span suppressHydrationWarning>{getCopy("scheduleAppointment.getDirections")}</span>
                          </a>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          className="w-full text-xs sm:text-sm"
                          size="default"
                        >
                          <a
                            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                            className="flex items-center justify-center gap-1.5 sm:gap-2"
                          >
                            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span suppressHydrationWarning>{getCopy("scheduleAppointment.callNow")}</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Card */}
                <Card className="overflow-hidden border-2">
                  <CardContent className="p-0">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px]">
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
