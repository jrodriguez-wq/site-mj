"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CONTACT_INFO } from "@/config/seo";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { sortModelsByPrice } from "@/lib/models/model-utils";
import { ModelData } from "@/types/model";
import { useTranslation } from "@/hooks/use-translation";

// Modelos disponibles para RTO (todos excepto duplex)
const RTO_MODELS = ["louisiana", "viana", "delanie", "aurora", "langdon", "emelia"];

interface ModelDisplayData {
  key: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  modelData: ModelData | null;
}

export default function RentToOwnPage() {
  const { t } = useTranslation();
  const [models, setModels] = useState<ModelDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      const modelsData = await Promise.all(
        RTO_MODELS.map(async (modelKey) => {
          const modelData = await getModelData(modelKey);
          const modelImages = getModelImages(modelKey);
          const mainImage = getModelMainImage(modelKey);
          
          return {
            key: modelKey,
            name: modelData?.name || modelKey,
            description: modelData?.description || "",
            image: mainImage,
            images: modelImages,
            price: modelData?.price || "",
            beds: modelData?.bedrooms || "",
            baths: modelData?.bathrooms || "",
            sqft: modelData?.sqft || "",
            modelData,
          };
        })
      );
      
      // Sort by price (cheapest first)
      const sortedModels = sortModelsByPrice(modelsData);
      setModels(sortedModels);
      setIsLoading(false);
    };

    loadModels();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image - Similar to Home */}
      <section className="relative w-full h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/hero/1W5A0754 E4.jpg"
            alt={t("rentToOwn.images.hero")}
            fill
            className="object-cover animate-subtle-zoom"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55 z-20" />
        </div>

        <div className="relative z-30 w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-5 md:px-6">
            <div className="max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 mx-auto">
              <div className="mb-4 sm:mb-5">
                <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold rounded-full border-2 border-white/60 shadow-2xl">
                  <Sparkles className="inline h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                  {t("rentToOwn.hero.badge")}
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white px-2"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
                suppressHydrationWarning
              >
                {t("rentToOwn.hero.title")}
              </h1>
              <p
                className="mx-auto max-w-[700px] text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold px-4"
                style={{
                  textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)",
                }}
                suppressHydrationWarning
              >
                {t("rentToOwn.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Description Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <Image
                src="/img/hero/1W5A1456 E5.jpg"
                alt={t("rentToOwn.images.newHome")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.whatIs.title")}
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.whatIs.description")}
              </p>
              <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-primary/20 rounded-2xl shrink-0">
                      <PiggyBank className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black mb-3" suppressHydrationWarning>{t("rentToOwn.whatIs.objective.title")}</h3>
                      <p className="text-base md:text-lg text-foreground leading-relaxed" suppressHydrationWarning>{t("rentToOwn.whatIs.objective.description")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContent>
      </section>

      {/* Key Features Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <div className="text-center space-y-4 mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-background" suppressHydrationWarning>
              {t("rentToOwn.keyFeatures.title")}
            </h2>
            <p className="text-base md:text-lg text-background/80 max-w-2xl mx-auto" suppressHydrationWarning>
              {t("rentToOwn.keyFeatures.subtitle")}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
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
              <Card key={index} className="border-2 border-background/20 bg-background/10 backdrop-blur-sm hover:border-primary/50 hover:bg-background/15 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="pt-6 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-background" suppressHydrationWarning>{t(`rentToOwn.keyFeatures.${feature.key}.title`)}</h3>
                      <p className="text-sm text-background/70 leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.keyFeatures.${feature.key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
      </section>

      {/* Pioneers & Savings Section */}
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
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm sm:text-base font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-primary/10 rounded-full border border-primary/20" suppressHydrationWarning>
                  {t("rentToOwn.pioneers.badge") || "Industry Leaders"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-background leading-tight" suppressHydrationWarning>
                {t("rentToOwn.pioneers.title") || "Pioneers in Rent to Own"}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-background/80 leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.pioneers.description") || "M.J. Newell Homes was and continues to be a pioneer in the Rent to Own program, helping thousands of families achieve their dream of homeownership."}
              </p>
            </div>

            {/* Right Side - Savings While Living */}
            <Card className="border-2 border-background/20 bg-background/10 backdrop-blur-sm shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="p-8 md:p-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary/20 rounded-2xl">
                      <PiggyBank className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-background" suppressHydrationWarning>
                      {t("rentToOwn.savingsWhileLiving.title") || "Save While You Live"}
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-background/80 leading-relaxed" suppressHydrationWarning>
                    {t("rentToOwn.savingsWhileLiving.description") || "With our Rent to Own program, you can save money while living in your own home. Build equity and work towards ownership at your own pace."}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-5 rounded-xl bg-background/10 border border-background/20 hover:bg-background/15 transition-colors">
                      <div className="text-3xl md:text-4xl font-black text-primary mb-2" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.flexible") || "Flexible"}
                      </div>
                      <p className="text-xs sm:text-sm text-background/70" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.flexibleDesc") || "Plans from 1-5 years"}
                      </p>
                    </div>
                    <div className="text-center p-5 rounded-xl bg-background/10 border border-background/20 hover:bg-background/15 transition-colors">
                      <div className="text-3xl md:text-4xl font-black text-primary mb-2" suppressHydrationWarning>
                        {t("rentToOwn.savingsWhileLiving.monthly") || "Monthly"}
                      </div>
                      <p className="text-xs sm:text-sm text-background/70" suppressHydrationWarning>
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

      {/* Available Models Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-muted/30">
        <PageContent size="lg">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight" suppressHydrationWarning>
              {t("rentToOwn.availableModels.title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
              {t("rentToOwn.availableModels.subtitle")}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-lg text-muted-foreground" suppressHydrationWarning>{t("rentToOwn.availableModels.loading")}</div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {models.map((model) => (
                <Card 
                  key={model.key} 
                  className="group border-2 border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-background"
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-muted">
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-primary/95 backdrop-blur-md text-white text-xs font-bold rounded-full border-2 border-white/60 shadow-xl" suppressHydrationWarning>
                        {t("rentToOwn.availableModels.rtoAvailable")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl md:text-2xl font-black mb-3 group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                      {model.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-border/50">
                      <div className="text-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <Bed className="h-5 w-5 text-primary mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground mb-1" suppressHydrationWarning>{t("homeModels.beds")}</p>
                        <p className="font-black text-base">{model.beds}</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <Bath className="h-5 w-5 text-primary mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground mb-1" suppressHydrationWarning>{t("homeModels.baths")}</p>
                        <p className="font-black text-base">{model.baths}</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <Square className="h-5 w-5 text-primary mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground mb-1" suppressHydrationWarning>{t("homeModels.sqft")}</p>
                        <p className="font-black text-sm">{model.sqft}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1" suppressHydrationWarning>{t("rentToOwn.availableModels.price")}</p>
                        <p className="text-xl md:text-2xl font-black text-primary">{model.price}</p>
                      </div>
                      <Button asChild variant="outline" size="sm" className="group/btn hover:bg-primary hover:text-white hover:border-primary">
                        <Link href={`/models/${model.key}`} className="flex items-center gap-2">
                          {t("rentToOwn.availableModels.viewDetails")}
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </PageContent>
      </section>

      {/* Requirements Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.requirements.title")}
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.requirements.subtitle")}
              </p>
            </div>
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20">
              <Image
                src="/img/hero/1W5A1493 E5.jpg"
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
              <Card key={index} className="border-2 border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-background">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-4 text-lg md:text-xl font-black" suppressHydrationWarning>
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    {t(`rentToOwn.requirements.${req.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.requirements.${req.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
      </section>

      {/* Documents Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <div className="text-center space-y-4 mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-background" suppressHydrationWarning>
              {t("rentToOwn.documents.title")}
            </h2>
            <p className="text-base md:text-lg text-background/80 max-w-2xl mx-auto" suppressHydrationWarning>
              {t("rentToOwn.documents.subtitle")}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {[
              { key: "taxes" },
              { key: "payStubs" },
              { key: "bankStatements" },
              { key: "id" },
            ].map((doc, index) => (
              <Card key={index} className="border-2 border-background/20 bg-background/10 backdrop-blur-sm hover:border-primary/50 hover:bg-background/15 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="pt-6 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl shrink-0 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                      <FileCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold mb-2 text-base md:text-lg text-background" suppressHydrationWarning>{t(`rentToOwn.documents.${doc.key}.name`)}</p>
                      <p className="text-sm md:text-base text-background/70 leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.documents.${doc.key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
      </section>

      {/* Process Steps Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 order-2 md:order-1">
              <Image
                src="/img/hero/1W5A1505 E5.jpg"
                alt={t("rentToOwn.images.applicationProcess")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.process.title")}
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed" suppressHydrationWarning>
                {t("rentToOwn.process.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((stepNum) => {
              const icons = [FileText, FileCheck, Calendar, Handshake, Key];
              const Icon = icons[stepNum - 1] || FileText;
              
              return (
                <Card key={stepNum} className="border-2 border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-background">
                  <CardContent className="pt-6 p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative">
                        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-black shadow-lg">
                          {stepNum}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base md:text-lg font-black" suppressHydrationWarning>{t(`rentToOwn.process.step${stepNum}.title`)}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>{t(`rentToOwn.process.step${stepNum}.description`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PageContent>
      </section>

      {/* Benefits Highlight Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-muted/30">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden relative hover:shadow-primary/20 transition-all duration-300">
              <CardContent className="pt-10 md:pt-12 p-8 md:p-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                      {t("rentToOwn.benefits.title")}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="p-4 bg-primary/20 rounded-xl shrink-0">
                        <PiggyBank className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg md:text-xl mb-2" suppressHydrationWarning>{t("rentToOwn.benefits.saveWhileLiving.title")}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("rentToOwn.benefits.saveWhileLiving.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="p-4 bg-primary/20 rounded-xl shrink-0">
                        <Lock className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg md:text-xl mb-2" suppressHydrationWarning>{t("rentToOwn.benefits.frozenPrices.title")}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
                          {t("rentToOwn.benefits.frozenPrices.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="p-4 bg-primary/20 rounded-xl shrink-0">
                        <TrendingUp className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg md:text-xl mb-2" suppressHydrationWarning>{t("rentToOwn.benefits.noCreditCheck.title")}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed" suppressHydrationWarning>
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
                src="/img/hero/AURORA.png"
                alt={t("rentToOwn.images.benefits")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </PageContent>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <PageContent size="lg">
          <Card className="border-2 border-background/20 shadow-2xl bg-background/10 backdrop-blur-md relative z-10 hover:bg-background/15 transition-all duration-300">
            <CardContent className="pt-12 md:pt-14 pb-12 md:pb-14 px-6 md:px-10">
              <div className="text-center space-y-6 max-w-3xl mx-auto text-background">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight" suppressHydrationWarning>
                  {t("rentToOwn.cta.title")}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-background/80 leading-relaxed" suppressHydrationWarning>
                  {t("rentToOwn.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base md:text-lg font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  >
                    <Link href="/contact" className="relative z-10 flex items-center justify-center gap-2">
                      {t("rentToOwn.cta.applyNow")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-background/40 text-background bg-background/10 hover:bg-background/20 hover:border-background/60 hover:text-background px-8 py-6 text-base md:text-lg font-bold backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
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
    </div>
  );
}
