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
import {
  RTO_SAVINGS_PLANS,
} from "@/config/rent-to-own-info";
import { CONTACT_INFO } from "@/config/seo";
import { getModelData } from "@/lib/models/model-data";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { ModelData } from "@/types/model";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

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
      
      setModels(modelsData);
      setIsLoading(false);
    };

    loadModels();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
        <Image
          src="/img/hero/1W5A0754 E4.jpg"
          alt="Rent to Own - M.J. Newell Homes"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <PageContent size="lg">
            <div className="max-w-5xl">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary/90 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/50 shadow-xl">
                  <Sparkles className="inline h-4 w-4 mr-2" />
                  {t("rentToOwn.hero.badge")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground drop-shadow-2xl mb-6 leading-tight" suppressHydrationWarning>
                {t("rentToOwn.hero.title")}
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/95 drop-shadow-lg font-semibold max-w-3xl" suppressHydrationWarning>
                {t("rentToOwn.hero.subtitle")}
              </p>
            </div>
          </PageContent>
        </div>
      </div>

      {/* Main Description Section */}
      <PageContent size="lg">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
              <Image
                src="/img/hero/1W5A1456 E5.jpg"
                alt="Casa nueva - Rent to Own"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden relative">
              <CardContent className="pt-8 md:pt-10">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                      {t("rentToOwn.whatIs.title")}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed" suppressHydrationWarning>
                    {t("rentToOwn.whatIs.description")}
                  </p>
                  <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 rounded-xl p-6 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg shrink-0">
                        <PiggyBank className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1" suppressHydrationWarning>{t("rentToOwn.whatIs.objective.title")}</h3>
                        <p className="text-sm md:text-base text-foreground" suppressHydrationWarning>{t("rentToOwn.whatIs.objective.description")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>

      {/* Key Features Section */}
      <section className="py-12 md:py-16 bg-muted/20">
        <PageContent size="lg">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" suppressHydrationWarning>
              {t("rentToOwn.keyFeatures.title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
              {t("rentToOwn.keyFeatures.subtitle")}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { key: "minimumRent" },
              { key: "monthlySavings" },
              { key: "frozenPrices" },
              { key: "maintenanceIncluded" },
              { key: "petsAllowed" },
              { key: "noCreditCheck" },
              { key: "easyEntry" },
            ].map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1.5" suppressHydrationWarning>{t(`rentToOwn.keyFeatures.${feature.key}.title`)}</h3>
                      <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t(`rentToOwn.keyFeatures.${feature.key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
      </section>

      {/* Savings Plans Table Section */}
      <section className="py-12 md:py-16 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20 order-2 md:order-1">
              <Image
                src="/img/hero/1W5A1489 E5.jpg"
                alt="Planes de ahorro - Rent to Own"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3 order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.savingsPlans.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              <p className="text-base md:text-lg text-muted-foreground" suppressHydrationWarning>
                {t("rentToOwn.savingsPlans.subtitle")}
              </p>
            </div>
          </div>

          <Card className="border-2 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary/20 to-primary/10">
                    <tr>
                      <th className="text-left py-5 px-6 font-bold text-foreground text-lg" suppressHydrationWarning>{t("rentToOwn.savingsPlans.table.duration")}</th>
                      <th className="text-left py-5 px-6 font-bold text-foreground text-lg" suppressHydrationWarning>{t("rentToOwn.savingsPlans.table.monthlySavings")}</th>
                      <th className="text-left py-5 px-6 font-bold text-foreground text-lg" suppressHydrationWarning>{t("rentToOwn.savingsPlans.table.totalSavings")}</th>
                      <th className="text-left py-5 px-6 font-bold text-foreground text-lg" suppressHydrationWarning>{t("rentToOwn.savingsPlans.table.description")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RTO_SAVINGS_PLANS.map((plan, index) => {
                      const planKey = `plan${index + 1}` as "plan1" | "plan2" | "plan3" | "plan4";
                      return (
                        <tr 
                          key={index} 
                          className={cn(
                            "border-b border-border/50 transition-colors",
                            index % 2 === 0 ? "bg-background" : "bg-muted/30",
                            "hover:bg-primary/5"
                          )}
                        >
                          <td className="py-5 px-6 font-bold text-lg" suppressHydrationWarning>{t(`rentToOwn.savingsPlans.table.${planKey}.duration`)}</td>
                          <td className="py-5 px-6 text-primary font-black text-xl">{plan.monthlySavings}</td>
                          <td className="py-5 px-6 text-primary font-black text-xl">{plan.totalSavings}</td>
                          <td className="py-5 px-6 text-muted-foreground" suppressHydrationWarning>{t(`rentToOwn.savingsPlans.table.${planKey}.description`)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </PageContent>
      </section>

      {/* Available Models Section */}
      <section className="py-12 md:py-16 bg-muted/20">
        <PageContent size="lg">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" suppressHydrationWarning>
              {t("rentToOwn.availableModels.title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
              {t("rentToOwn.availableModels.subtitle")}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-muted-foreground" suppressHydrationWarning>{t("rentToOwn.availableModels.loading")}</div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <Card 
                  key={model.key} 
                  className="group border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/50 shadow-lg" suppressHydrationWarning>
                        {t("rentToOwn.availableModels.rtoAvailable")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {model.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-3 pb-3 border-b">
                      <div className="text-center">
                        <Bed className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t("homeModels.beds")}</p>
                        <p className="font-bold text-sm">{model.beds}</p>
                      </div>
                      <div className="text-center">
                        <Bath className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t("homeModels.baths")}</p>
                        <p className="font-bold text-sm">{model.baths}</p>
                      </div>
                      <div className="text-center">
                        <Square className="h-4 w-4 text-primary mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t("homeModels.sqft")}</p>
                        <p className="font-bold text-sm">{model.sqft}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t("rentToOwn.availableModels.price")}</p>
                        <p className="text-lg font-black text-primary">{model.price}</p>
                      </div>
                      <Button asChild variant="outline" size="sm" className="group/btn">
                        <Link href={`/models/${model.key}`}>
                          {t("rentToOwn.availableModels.viewDetails")}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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
      <section className="py-12 md:py-16 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.requirements.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              <p className="text-base md:text-lg text-muted-foreground" suppressHydrationWarning>
                {t("rentToOwn.requirements.subtitle")}
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
              <Image
                src="/img/hero/1W5A1493 E5.jpg"
                alt="Requisitos Rent to Own"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { key: "minimumIncome" },
              { key: "noEvictions" },
              { key: "immigrationStatus" },
            ].map((req, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-base" suppressHydrationWarning>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    {t(`rentToOwn.requirements.${req.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t(`rentToOwn.requirements.${req.key}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
      </section>

      {/* Documents Section */}
      <section className="py-12 md:py-16 bg-muted/20">
        <PageContent size="lg">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" suppressHydrationWarning>
              {t("rentToOwn.documents.title")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
              {t("rentToOwn.documents.subtitle")}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { key: "taxes" },
              { key: "payStubs" },
              { key: "bankStatements" },
              { key: "id" },
              { key: "ssn" },
            ].map((doc, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1 text-sm md:text-base" suppressHydrationWarning>{t(`rentToOwn.documents.${doc.key}.name`)}</p>
                      <p className="text-xs md:text-sm text-muted-foreground" suppressHydrationWarning>{t(`rentToOwn.documents.${doc.key}.description`)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContent>
      </section>

      {/* Process Steps Section */}
      <section className="py-12 md:py-16 bg-background">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20 order-2 md:order-1">
              <Image
                src="/img/hero/1W5A1505 E5.jpg"
                alt="Proceso de aplicación - Rent to Own"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3 order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" suppressHydrationWarning>
                {t("rentToOwn.process.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              <p className="text-base md:text-lg text-muted-foreground" suppressHydrationWarning>
                {t("rentToOwn.process.subtitle")}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((stepNum) => {
              const icons = [FileText, FileCheck, Calendar, Handshake, Key];
              const Icon = icons[stepNum - 1] || FileText;
              
              return (
                <Card key={stepNum} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="pt-5">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="relative">
                        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-black shadow-md">
                          {stepNum}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold" suppressHydrationWarning>{t(`rentToOwn.process.step${stepNum}.title`)}</h3>
                        <p className="text-xs text-muted-foreground" suppressHydrationWarning>{t(`rentToOwn.process.step${stepNum}.description`)}</p>
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
      <section className="py-12 md:py-16 bg-muted/20">
        <PageContent size="lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden relative">
              <CardContent className="pt-8 md:pt-10">
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold" suppressHydrationWarning>
                    {t("rentToOwn.benefits.title")}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/20 rounded-lg shrink-0">
                        <PiggyBank className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1" suppressHydrationWarning>{t("rentToOwn.benefits.saveWhileLiving.title")}</h3>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t("rentToOwn.benefits.saveWhileLiving.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/20 rounded-lg shrink-0">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1" suppressHydrationWarning>{t("rentToOwn.benefits.frozenPrices.title")}</h3>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t("rentToOwn.benefits.frozenPrices.description")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/20 rounded-lg shrink-0">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1" suppressHydrationWarning>{t("rentToOwn.benefits.noCreditCheck.title")}</h3>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t("rentToOwn.benefits.noCreditCheck.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20">
              <Image
                src="/img/hero/AURORA.png"
                alt="Beneficios Rent to Own"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </PageContent>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/hero/1W5A0814_1.jpg')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary"></div>
        <PageContent size="lg">
          <Card className="border-2 border-white/20 shadow-2xl bg-white/10 backdrop-blur-md relative z-10">
            <CardContent className="pt-10 md:pt-12 pb-10 md:pb-12">
              <div className="text-center space-y-6 max-w-3xl mx-auto text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black drop-shadow-lg" suppressHydrationWarning>
                  {t("rentToOwn.cta.title")}
                </h2>
                <p className="text-base md:text-lg text-white/90 drop-shadow-md" suppressHydrationWarning>
                  {t("rentToOwn.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-base md:text-lg font-black shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  >
                    <Link href="/contact" className="relative z-10 flex items-center justify-center gap-2">
                      {t("rentToOwn.cta.applyNow")}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 px-8 py-6 text-base md:text-lg font-bold backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
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
