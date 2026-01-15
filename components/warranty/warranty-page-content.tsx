"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { PageContent } from "@/components/layout/page-container";
import { useTranslation } from "@/hooks/use-translation";
import { Shield, CheckCircle2, Clock, HeadphonesIcon, Calendar, ArrowLeft, MapPin } from "lucide-react";
import { SEO_CONFIG } from "@/config/seo";
import { motion, AnimatePresence } from "framer-motion";

type WarrantyFlowStep = "initial" | "community-selection" | "form";

export const WarrantyPageContent = () => {
  const { t } = useTranslation();
  const [flowStep, setFlowStep] = useState<WarrantyFlowStep>("initial");

  const redirectUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=warranty`;
  }, []);

  const handleCommunitySelect = (community: "labelle" | "lehigh" | "other") => {
    if (community === "labelle") {
      window.open("https://meetings.hubspot.com/customercare76/warrantys", "_blank");
    } else if (community === "lehigh") {
      window.open("https://meetings.hubspot.com/customercare76/warrantys-lehigh", "_blank");
    } else {
      setFlowStep("form");
    }
  };

  return (
    <PageContent size="md">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" suppressHydrationWarning>
            {t("warranty.title")}
          </h1>
          <p className="text-xl text-muted-foreground" suppressHydrationWarning>
            {t("warranty.subtitle")}
          </p>
        </div>

        {/* Warranty Coverage - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle suppressHydrationWarning>
              {t("warranty.coverage.title")}
            </CardTitle>
            <CardDescription suppressHydrationWarning>
              {t("warranty.coverage.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-6 space-y-6">
              {/* Structural Warranty */}
              <div className="flex items-start gap-4 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background hover:border-primary/40 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2" suppressHydrationWarning>
                    {t("warranty.coverage.structural.title")}
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-1" suppressHydrationWarning>
                    {t("warranty.coverage.structural.duration")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.coverage.structural.description")}
                  </p>
                </div>
              </div>

              {/* Mechanical Warranty */}
              <div className="flex items-start gap-4 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background hover:border-primary/40 transition-all duration-300">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2" suppressHydrationWarning>
                    {t("warranty.coverage.mechanical.title")}
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-1" suppressHydrationWarning>
                    {t("warranty.coverage.mechanical.duration")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.coverage.mechanical.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span suppressHydrationWarning>{t("warranty.features.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.timely.title")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.timely.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeadphonesIcon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.support.title")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.support.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold" suppressHydrationWarning>
                    {t("warranty.features.quality.title")}
                  </p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("warranty.features.quality.description")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warranty Scheduling Flow */}
        <AnimatePresence mode="wait">
          {flowStep === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg "><CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2" suppressHydrationWarning>
                    <Calendar className="h-6 w-6 text-primary" />
                    <span>Schedule Warranty</span>
                  </CardTitle>
                  <CardDescription className="text-center" suppressHydrationWarning>
                    Select your community to schedule a warranty appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pt-6 pb-8">
                  <Button
                    size="lg"
                    onClick={() => setFlowStep("community-selection")}
                    className="px-10 py-7 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    Schedule Warranty
                    <Calendar className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {flowStep === "community-selection" && (
            <motion.div
              key="community-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2" suppressHydrationWarning>
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>Select Your Community</span>
                  </CardTitle>
                  <CardDescription className="text-center" suppressHydrationWarning>
                    Choose your community to schedule your warranty appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6 pb-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    {/* LaBelle - Soft Indigo Theme */}
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleCommunitySelect("labelle")}
                      className="h-auto py-8 flex flex-col items-center gap-3 border-2 border-indigo-100/80 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50 hover:scale-[1.02] group"
                    >
                      <div className="p-3 bg-indigo-50 group-hover:bg-indigo-100 rounded-full transition-colors">
                        <MapPin className="h-6 w-6 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <span className="text-lg font-semibold text-foreground group-hover:text-indigo-700 transition-colors">LaBelle</span>
                      <span className="text-sm text-muted-foreground group-hover:text-indigo-600/80 transition-colors">
                        Click to schedule
                      </span>
                    </Button>
                    
                    {/* Lehigh - Soft Rose Theme */}
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleCommunitySelect("lehigh")}
                      className="h-auto py-8 flex flex-col items-center gap-3 border-2 border-rose-100/80 hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-700 transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:scale-[1.02] group"
                    >
                      <div className="p-3 bg-rose-50 group-hover:bg-rose-100 rounded-full transition-colors">
                        <MapPin className="h-6 w-6 text-rose-400 group-hover:text-rose-600 transition-colors" />
                      </div>
                      <span className="text-lg font-semibold text-foreground group-hover:text-rose-700 transition-colors">Lehigh</span>
                      <span className="text-sm text-muted-foreground group-hover:text-rose-600/80 transition-colors">
                        Click to schedule
                      </span>
                    </Button>
                    
                    {/* Other - Soft Teal Theme */}
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => handleCommunitySelect("other")}
                      className="h-auto py-8 flex flex-col items-center gap-3 border-2 border-teal-100/80 hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-700 transition-all duration-300 hover:shadow-lg hover:shadow-teal-100/50 hover:scale-[1.02] group"
                    >
                      <div className="p-3 bg-teal-50 group-hover:bg-teal-100 rounded-full transition-colors">
                        <MapPin className="h-6 w-6 text-teal-400 group-hover:text-teal-600 transition-colors" />
                      </div>
                      <span className="text-lg font-semibold text-foreground group-hover:text-teal-700 transition-colors">Other</span>
                      <span className="text-sm text-muted-foreground group-hover:text-teal-600/80 transition-colors">
                        Use form below
                      </span>
                    </Button>
                  </div>
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setFlowStep("initial")}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {flowStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center" suppressHydrationWarning>
                    {t("warranty.form.title")}
                  </CardTitle>
                  <CardDescription className="text-center" suppressHydrationWarning>
                    {t("warranty.form.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      variant="ghost"
                      onClick={() => setFlowStep("community-selection")}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Community Selection
                    </Button>
                  </div>
                  <HubSpotForm
                    portalId="50215941"
                    formId="6c15d23c-5273-4555-b4cc-b5fb7cfe7b67"
                    region="na1"
                    redirectUrl={redirectUrl}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageContent>
  );
};

