"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageContent } from "@/components/layout/page-container";
import Image from "next/image";
import { 
  FileText, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Shield,
  PiggyBank,
  TrendingUp,
  Lock,
  FileCheck,
  Handshake,
  Key,
  Bed,
  Bath,
  Square,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO, SEO_CONFIG } from "@/config/seo";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelPricing } from "@/lib/models/model-pricing";
import { ModelData, Community } from "@/types/model";
import { useTranslation } from "@/hooks/use-translation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { AnimatedSection } from "@/components/ui/animated-section";
import { AnimatedCard } from "@/components/ui/animated-card";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { HUBSPOT_FORMS } from "@/lib/constants";
import { RTOGallery } from "@/components/rent-to-own/rto-gallery";
import { LogoSlider } from "@/components/ui/logo-slider";
import { PARTNER_LOGOS } from "@/config/partner-logos";

// Modelos disponibles para RTO por comunidad
// LaBelle: langdon, emelia, aurora, delanie, viana, louisiana
// Lehigh Acres: langdon, emelia, delanie (duplex solo para renta, no RTO)
const RTO_MODELS_BY_COMMUNITY: Record<Community, string[]> = {
  labelle: ["langdon", "emelia", "aurora", "delanie", "viana", "louisiana"],
  "lehigh-acres": ["langdon", "emelia", "delanie"],
};

interface ModelDisplayData {
  key: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: string; // Precio de compra
  rtoPrice: string; // Precio mensual RTO
  beds: string;
  baths: string;
  sqft: string;
  modelData: ModelData | null;
  community: Community;
}

export default function RentToOwnPage() {
  const { t } = useTranslation();
  const [models, setModels] = useState<ModelDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | "all">("all");

  const redirectUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : SEO_CONFIG.siteUrl;
    return `${baseUrl}/thank-you?type=rent-to-own`;
  }, []);

  // Scroll automático al formulario cuando hay hash en la URL
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window === 'undefined') return;
      
      // Verificar si hay hash en la URL
      if (window.location.hash === '#rto-application-form') {
        // Pequeño delay para asegurar que el DOM esté completamente renderizado
        setTimeout(() => {
          const formSection = document.getElementById('rto-application-form');
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // Ejecutar inmediatamente
    handleHashScroll();

    // También escuchar cambios en el hash (navegación dentro de la misma página)
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      
      const communities: Community[] = selectedCommunity === "all" 
        ? ["labelle", "lehigh-acres"] 
        : [selectedCommunity];

      const allModelsData: ModelDisplayData[] = [];

      for (const community of communities) {
        const rtoModels = RTO_MODELS_BY_COMMUNITY[community] || [];

        const modelsData = await Promise.all(
          rtoModels.map(async (modelKey) => {
            const modelData = await getModelData(modelKey, community);
            const pricing = getModelPricing(modelKey, community);
            const modelImages = getModelImages(modelKey);
            const mainImage = getModelMainImage(modelKey);
            
            return {
              key: selectedCommunity === "all" ? `${modelKey}-${community}` : modelKey,
              name: modelData?.name || modelKey,
              description: modelData?.description || "",
              image: mainImage,
              images: modelImages,
              price: modelData?.price || "",
              rtoPrice: pricing?.rtoPrice || "",
              beds: pricing?.bedrooms || modelData?.bedrooms || "",
              baths: pricing?.bathrooms || modelData?.bathrooms || "",
              sqft: pricing?.sqft || modelData?.sqft || "",
              modelData,
              community,
            };
          })
        );

        allModelsData.push(...modelsData);
      }
      
      // Sort by RTO price (cheapest monthly payment first)
      const sortedModels = allModelsData.sort((a, b) => {
        const aPrice = parseInt(a.rtoPrice.replace(/[^0-9]/g, "")) || 0;
        const bPrice = parseInt(b.rtoPrice.replace(/[^0-9]/g, "")) || 0;
        return aPrice - bPrice;
      });
      
      setModels(sortedModels);
      setIsLoading(false);
    };

    loadModels();
  }, [selectedCommunity]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image - Similar to About Us */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/hero/1w5a0754-e4.webp"
            alt={t("rentToOwn.hero.imageAlt") || "Rent to Own Program - M.J. Newell Homes"}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Lighter for more natural look */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl">
              <motion.div 
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Badge */}
                <motion.div 
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                >
                  <span className="text-sm font-semibold text-white uppercase tracking-wider px-4 py-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-full border border-slate-700/50 shadow-xl" suppressHydrationWarning>
                    <Sparkles className="inline h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                    {t("rentToOwn.hero.badge")}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  }}
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                >
                  {t("rentToOwn.hero.title")}
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  {t("rentToOwn.hero.subtitle")}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                >
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      const modelsSection = document.getElementById("available-models");
                      if (modelsSection) {
                        modelsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    size="lg"
                    className={cn(
                      "bg-primary hover:bg-primary/90 text-white",
                      "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                      "text-base sm:text-lg font-bold",
                      "shadow-2xl hover:shadow-primary/40",
                      "transition-all duration-200 ease-out",
                      "hover:scale-105 active:scale-100",
                      "relative overflow-hidden group",
                      "border-2 border-primary/50"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2" suppressHydrationWarning>
                      <Sparkles className="w-5 h-5" />
                      {t("rentToOwn.hero.cta.primary")}
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      const formSection = document.getElementById("rto-application-form");
                      if (formSection) {
                        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    variant="outline"
                    size="lg"
                    className={cn(
                      "bg-white/10 backdrop-blur-md border-2 border-white/40 text-white",
                      "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                      "text-base sm:text-lg font-bold",
                      "hover:bg-white/20 hover:border-white/60",
                      "shadow-xl hover:shadow-2xl",
                      "transition-all duration-200 ease-out",
                      "hover:scale-105 active:scale-100"
                    )}
                  >
                    <span className="flex items-center gap-2" suppressHydrationWarning>
                      {t("rentToOwn.hero.cta.secondary")}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator 
          onClick={() => {
            const modelsSection = document.getElementById("available-models");
            if (modelsSection) {
              modelsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />

        {/* Natural Fade Out - Smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Main Description Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-background">
          <PageContent size="lg">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <Image
                src="/img/hero/1w5a1456-e5.webp"
                alt={t("rentToOwn.images.newHome")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.whatIs.title")}
                </h2>
                <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.whatIs.description")}
              </p>
              <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 md:p-4 bg-primary/20 rounded-xl sm:rounded-2xl shrink-0">
                      <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 leading-tight" suppressHydrationWarning>{t("rentToOwn.whatIs.objective.title")}</h3>
                      <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed" suppressHydrationWarning>{t("rentToOwn.whatIs.objective.description")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Key Features Section */}
      <AnimatedSection delay={0.1} direction="fade">
        <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-background leading-tight" suppressHydrationWarning>
              {t("rentToOwn.keyFeatures.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-background/80 max-w-2xl mx-auto px-4 leading-relaxed" suppressHydrationWarning>
              {t("rentToOwn.keyFeatures.subtitle")}
            </p>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {[
              { key: "minimumRent" },
              { key: "monthlySavings" },
              { key: "frozenPrices" },
              { key: "maintenanceIncluded" },
              { key: "petsAllowed" },
              { key: "noCreditCheck" },
            ].map((feature, index) => (
              <Card key={index} className="border-2 border-background/20 bg-background/10 backdrop-blur-sm hover:border-primary/50 hover:bg-background/15 hover:shadow-xl transition-all duration-200 hover:-translate-y-2 group">
                <CardContent className="pt-4 sm:pt-5 md:pt-6 p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-2.5 md:p-3 bg-primary/20 rounded-lg sm:rounded-xl shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-200">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-background leading-tight" suppressHydrationWarning>{t(`rentToOwn.keyFeatures.${feature.key}.title`)}</h3>
                      <p className="text-xs sm:text-sm text-background/70 leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.keyFeatures.${feature.key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* RTO Gallery Section */}
      <RTOGallery />


      {/* Pioneers & Savings Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            {/* Left Side - Pioneers */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="inline-block">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-primary uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20" suppressHydrationWarning>
                  {t("rentToOwn.pioneers.badge") || "Industry Leaders"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-background leading-tight" suppressHydrationWarning>
                {t("rentToOwn.pioneers.title") || "Pioneers in Rent to Own"}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-background/80 leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.pioneers.description") || "M.J. Newell Homes was and continues to be a pioneer in the Rent to Own program, helping thousands of families achieve their dream of homeownership."}
              </p>
            </div>

            {/* Right Side - Savings While Living */}
            <Card className="border-2 border-background/20 bg-background/10 backdrop-blur-sm shadow-2xl hover:shadow-primary/20 transition-all duration-200">
              <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 md:p-4 bg-primary/20 rounded-xl sm:rounded-2xl shrink-0">
                      <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-background leading-tight" suppressHydrationWarning>
                      {t("rentToOwn.savingsWhileLiving.title") || "Save While You Live"}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-background/80 leading-relaxed" suppressHydrationWarning>
                    {t("rentToOwn.savingsWhileLiving.description") || "With our Rent to Own program, you can save money while living in your own home. Build equity and work towards ownership at your own pace."}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <div className="text-center p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-background/10 border border-background/20 hover:bg-background/15 transition-colors">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.flexible") || "Flexible"}
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-background/70 leading-tight" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.flexibleDesc") || "Plans from 1-5 years"}
                      </p>
                    </div>
                    <div className="text-center p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-background/10 border border-background/20 hover:bg-background/15 transition-colors">
                      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.monthly") || "Monthly"}
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-background/70 leading-tight" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.monthlyDesc") || "Automatic savings"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Available Models Section */}
      <AnimatedSection delay={0.1}>
        <section id="available-models" className="py-10 md:py-14 lg:py-18 bg-muted/30">
        <PageContent size="lg">
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight px-4" suppressHydrationWarning>
              {t("rentToOwn.availableModels.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
              {t("rentToOwn.availableModels.subtitle")}
            </p>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          {/* Community Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <label className="text-sm sm:text-base font-semibold text-foreground whitespace-nowrap" suppressHydrationWarning>
                {t("models.filters.community")}:
              </label>
              <Select
                value={selectedCommunity}
                onValueChange={(value) => setSelectedCommunity(value as Community | "all")}
              >
                <SelectTrigger className="w-full sm:w-auto min-w-[200px]">
                  <SelectValue suppressHydrationWarning />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" suppressHydrationWarning>
                    {t("models.filters.allCommunities")}
                  </SelectItem>
                  <SelectItem value="labelle" suppressHydrationWarning>
                    {t("communities.labelle.name")} - {t("communities.labelle.country.subtitle")}
                  </SelectItem>
                  <SelectItem value="lehigh-acres" suppressHydrationWarning>
                    {t("communities.lehighAcres.name")} - {t("communities.lehighAcres.country.subtitle")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-lg text-muted-foreground" suppressHydrationWarning>{t("rentToOwn.availableModels.loading")}</div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {models.map((model, index) => {
                const baseKey = model.key.split("-")[0];
                return (
                  <AnimatedCard key={model.key} index={index}>
                    <Card 
                      className="group border-2 border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-200 overflow-hidden bg-background relative py-0 h-full"
                    >
                    {/* Community Badge */}
                    {selectedCommunity === "all" && (
                      <div className={cn(
                        "absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg",
                        model.community === "labelle"
                          ? "bg-white/95 dark:bg-gray-900/95 text-indigo-700 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-700/50"
                          : "bg-white/95 dark:bg-gray-900/95 text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-200/80 dark:border-fuchsia-700/50"
                      )}>
                        {model.community === "labelle" ? t("communities.labelle.name") : t("communities.lehighAcres.name")}
                      </div>
                    )}

                    <div className="relative h-64 sm:h-72 overflow-hidden bg-muted">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white text-xs font-bold rounded-full border border-slate-700/50 shadow-xl" suppressHydrationWarning>
                          {t("rentToOwn.availableModels.rtoAvailable")}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl md:text-2xl font-black mb-2 group-hover:text-primary transition-colors duration-150">
                        {model.name}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-5 line-clamp-2 leading-relaxed" suppressHydrationWarning>
                        {t(`homeModels.descriptions.${baseKey}`)}
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-5 pb-5 border-b border-border/50">
                        <div className="text-center p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-150">
                          <Bed className="h-4 w-4 text-primary mx-auto mb-1" />
                          <p className="text-[10px] text-muted-foreground mb-0.5" suppressHydrationWarning>{t("homeModels.beds")}</p>
                          <p className="font-black text-sm">{model.beds}</p>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-150">
                          <Bath className="h-4 w-4 text-primary mx-auto mb-1" />
                          <p className="text-[10px] text-muted-foreground mb-0.5" suppressHydrationWarning>{t("homeModels.baths")}</p>
                          <p className="font-black text-sm">{model.baths}</p>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-150">
                          <Square className="h-4 w-4 text-primary mx-auto mb-1" />
                          <p className="text-[10px] text-muted-foreground mb-0.5" suppressHydrationWarning>{t("homeModels.sqft")}</p>
                          <p className="font-black text-xs">{model.sqft}</p>
                        </div>
                      </div>
                      {/* RTO Price - Prominent Display */}
                      <div className="mb-5 pb-5 border-b border-border/50">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/50">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold" suppressHydrationWarning>
                            {t("homeModels.rto")} {t("rentToOwn.availableModels.price")}
                          </p>
                          <p className="text-2xl md:text-3xl font-black text-emerald-700 dark:text-emerald-400 mb-1">
                            {model.rtoPrice || "N/A"}
                          </p>
                          {model.price && (
                            <p className="text-xs text-muted-foreground line-through opacity-60">
                              {t("homeModels.priceFrom")} {model.price}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 group/btn"
                      >
                        <Link href={`/models/${baseKey}?community=${model.community}`} className="flex items-center justify-center gap-2">
                          {t("rentToOwn.availableModels.viewDetails")}
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-150" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  </AnimatedCard>
                );
              })}
            </div>
          )}
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Requirements Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.requirements.title")}
                </h2>
                <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.requirements.subtitle")}
              </p>
            </div>
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <Image
                src="/img/hero/1w5a1493-e5.webp"
                alt={t("rentToOwn.images.requirements")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { key: "minimumIncome" },
              { key: "noEvictions" },
              { key: "immigrationStatus" },
            ].map((req, index) => (
              <Card key={index} className="border-2 border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-200 hover:-translate-y-2 group bg-background">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg md:text-xl font-black leading-tight" suppressHydrationWarning>
                    <div className="p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg sm:rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <span className="min-w-0">{t(`rentToOwn.requirements.${req.key}.title`)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.requirements.${req.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Documents Section */}
      <AnimatedSection delay={0.1} direction="fade">
        <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-background leading-tight px-4" suppressHydrationWarning>
              {t("rentToOwn.documents.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-background/80 max-w-2xl mx-auto px-4 leading-relaxed" suppressHydrationWarning>
              {t("rentToOwn.documents.subtitle")}
            </p>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {[
              { key: "taxes" },
              { key: "payStubs" },
              { key: "bankStatements" },
              { key: "id" },
            ].map((doc, index) => (
              <Card key={index} className="border-2 border-background/20 bg-background/10 backdrop-blur-sm hover:border-primary/50 hover:bg-background/15 hover:shadow-xl transition-all duration-200 hover:-translate-y-2 group">
                <CardContent className="pt-4 sm:pt-5 md:pt-6 p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-2.5 md:p-3 bg-primary/20 rounded-lg sm:rounded-xl shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-200">
                      <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold mb-1 sm:mb-2 text-sm sm:text-base md:text-lg text-background leading-tight" suppressHydrationWarning>{t(`rentToOwn.documents.${doc.key}.name`)}</p>
                      <p className="text-xs sm:text-sm md:text-base text-background/70 leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.documents.${doc.key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Process Steps Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 order-2 md:order-1">
              <Image
                src="/img/hero/1w5a1505-e5.webp"
                alt={t("rentToOwn.images.applicationProcess")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 order-1 md:order-2">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.process.title")}
                </h2>
                <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.process.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((stepNum) => {
              const icons = [FileText, FileCheck, Calendar, Handshake, Key];
              const Icon = icons[stepNum - 1] || FileText;
              
              return (
                <Card key={stepNum} className="border-2 border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-200 hover:-translate-y-2 group bg-background">
                  <CardContent className="pt-4 sm:pt-5 md:pt-6 p-4 sm:p-5 md:p-6">
                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                      <div className="relative">
                        <div className="p-2.5 sm:p-3 md:p-4 bg-primary/10 rounded-xl sm:rounded-2xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
                        </div>
                        <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs sm:text-sm font-black shadow-lg">
                          {stepNum}
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-black leading-tight" suppressHydrationWarning>{t(`rentToOwn.process.step${stepNum}.title`)}</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.process.step${stepNum}.description`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Benefits Highlight Section */}
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-muted/30">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden relative hover:shadow-primary/20 transition-all duration-200">
              <CardContent className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="space-y-5 sm:space-y-6 md:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                      {t("rentToOwn.benefits.title")}
                    </h2>
                    <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
                  </div>
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="p-2.5 sm:p-3 md:p-4 bg-primary/20 rounded-lg sm:rounded-xl shrink-0">
                        <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-base sm:text-lg md:text-xl mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>{t("rentToOwn.benefits.saveWhileLiving.title")}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("rentToOwn.benefits.saveWhileLiving.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="p-2.5 sm:p-3 md:p-4 bg-primary/20 rounded-lg sm:rounded-xl shrink-0">
                        <Lock className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-base sm:text-lg md:text-xl mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>{t("rentToOwn.benefits.frozenPrices.title")}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("rentToOwn.benefits.frozenPrices.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="p-2.5 sm:p-3 md:p-4 bg-primary/20 rounded-lg sm:rounded-xl shrink-0">
                        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-base sm:text-lg md:text-xl mb-1 sm:mb-2 leading-tight" suppressHydrationWarning>{t("rentToOwn.benefits.noCreditCheck.title")}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("rentToOwn.benefits.noCreditCheck.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <Image
                src="/img/hero/aurora.webp"
                alt={t("rentToOwn.images.benefits")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Application Form Section */}
      <AnimatedSection delay={0.1} direction="fade">
        <section id="rto-application-form" className="py-12 md:py-16 lg:py-20 bg-background scroll-mt-20">
          <PageContent size="lg">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight px-4" suppressHydrationWarning>
                  {t("rentToOwn.form.title") || "Apply for Rent to Own"}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
                  {t("rentToOwn.form.subtitle") || "Fill out the form below to start your journey to homeownership. Our team will contact you soon."}
                </p>
                <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
              </div>

              <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
                <CardHeader className="text-center space-y-3 pb-6 p-6 sm:p-8">
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black" suppressHydrationWarning>
                    {t("rentToOwn.form.formTitle") || "Rent to Own Application"}
                  </CardTitle>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                  <CardDescription className="text-sm sm:text-base md:text-lg pt-2 text-muted-foreground" suppressHydrationWarning>
                    {t("rentToOwn.form.formDescription") || "Complete the form below and we'll review your application. No credit check required for initial application."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 sm:px-8 md:px-10 pb-8 sm:pb-10">
                  <HubSpotForm
                    portalId={HUBSPOT_FORMS.RENT_TO_OWN.portalId}
                    formId={HUBSPOT_FORMS.RENT_TO_OWN.formId}
                    region={HUBSPOT_FORMS.RENT_TO_OWN.region}
                    redirectUrl={redirectUrl}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </PageContent>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.1} direction="fade">
        <section className="py-12 md:py-16 lg:py-20 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <Card className="border-2 border-background/20 shadow-2xl bg-background/10 backdrop-blur-md relative z-10 hover:bg-background/15 transition-all duration-200">
            <CardContent className="pt-12 md:pt-14 pb-12 md:pb-14 px-6 md:px-10">
              <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 max-w-3xl mx-auto text-background px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.cta.title")}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-background/80 leading-relaxed" suppressHydrationWarning>
                  {t("rentToOwn.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base md:text-lg font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                  >
                    <Link href="/contact" className="relative z-10 flex items-center justify-center gap-2">
                      {t("rentToOwn.cta.applyNow")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-background/40 text-background bg-background/10 hover:bg-background/20 hover:border-background/60 hover:text-background px-8 py-6 text-base md:text-lg font-bold backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                  >
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="relative z-10 flex items-center justify-center gap-2">
                      {t("rentToOwn.cta.call")}: {CONTACT_INFO.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </PageContent>
        </section>
      </AnimatedSection>

      {/* Partner Logos Slider */}
      <AnimatedSection delay={200}>
        <LogoSlider
          logos={PARTNER_LOGOS}
          speed="normal"
          pauseOnHover={true}
          showTitle={false}
          variant="default"
        />
      </AnimatedSection>
    </div>
  );
}
