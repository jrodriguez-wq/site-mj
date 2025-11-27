"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContent } from "@/components/layout/page-container";
import { Bed, Bath, Square, Car, Layers, MapPin, FileText, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { ModelDetailsDialog } from "@/components/home/model-details-dialog";

export default function ModelsPage() {
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const models = [
    {
      key: "louisiana",
      nameKey: "homeModels.models.louisiana.name",
      descriptionKey: "homeModels.models.louisiana.description",
      image: "/img/1.jpg",
      floorPlan: "/img/1.jpg",
      beds: "3-4",
      baths: "2-3",
      sqft: "1,500-2,000",
    },
    {
      key: "viana",
      nameKey: "homeModels.models.viana.name",
      descriptionKey: "homeModels.models.viana.description",
      image: "/img/2.jpg",
      floorPlan: "/img/2.jpg",
      beds: "3-4",
      baths: "2-3",
      sqft: "1,600-2,100",
    },
    {
      key: "delanie",
      nameKey: "homeModels.models.delanie.name",
      descriptionKey: "homeModels.models.delanie.description",
      image: "/img/3.jpg",
      floorPlan: "/img/3.jpg",
      beds: "4",
      baths: "3",
      sqft: "2,000-2,400",
    },
    {
      key: "aurora",
      nameKey: "homeModels.models.aurora.name",
      descriptionKey: "homeModels.models.aurora.description",
      image: "/img/4.jpg",
      floorPlan: "/img/4.jpg",
      beds: "4-5",
      baths: "3-4",
      sqft: "2,200-2,600",
    },
    {
      key: "langdon",
      nameKey: "homeModels.models.langdon.name",
      descriptionKey: "homeModels.models.langdon.description",
      image: "/img/5.jpg",
      floorPlan: "/img/5.jpg",
      beds: "4-5",
      baths: "3-4",
      sqft: "2,400-2,800",
    },
    {
      key: "emelia",
      nameKey: "homeModels.models.emelia.name",
      descriptionKey: "homeModels.models.emelia.description",
      image: "/img/6.jpg",
      floorPlan: "/img/6.jpg",
      beds: "5",
      baths: "4",
      sqft: "2,600-3,000",
    },
  ];

  return (
    <>
      <PageContent size="lg">
        <div className="space-y-12 py-8 md:py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" suppressHydrationWarning>
              {t("homeModels.allModels")}
            </h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl leading-relaxed" suppressHydrationWarning>
              {t("homeModels.allModelsSubtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card
                key={model.key}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 bg-linear-to-br from-card to-card/50"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-64 overflow-hidden bg-muted/30">
                  <Image
                    src={model.image}
                    alt={t(model.nameKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    {t(`homeModels.models.${model.key}.price`)}
                  </div>
                </div>

                <CardHeader className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <CardTitle className="text-2xl md:text-3xl group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                      {t(model.nameKey)}
                    </CardTitle>
                    <div className="text-sm font-black text-primary/20 group-hover:text-primary/40 transition-colors" suppressHydrationWarning>
                      {t("homeModels.model")}
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed" suppressHydrationWarning>
                    {t(model.descriptionKey)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Bed className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.beds")}</div>
                      <div className="font-bold text-lg">{model.beds}</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Bath className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.baths")}</div>
                      <div className="font-bold text-lg">{model.baths}</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Square className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.sqft")}</div>
                      <div className="font-bold text-lg">{model.sqft}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full group/btn border-2"
                      size="lg"
                      onClick={() => setSelectedModel(model.key)}
                    >
                      <span className="flex items-center justify-center gap-2" suppressHydrationWarning>
                        {t("homeModels.moreDetails")}
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full group/btn"
                      size="lg"
                    >
                      <Link href={model.floorPlan} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2" suppressHydrationWarning>
                        <FileText className="h-4 w-4" />
                        {t("homeModels.viewFloorPlan")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageContent>

      {selectedModel && (
        <ModelDetailsDialog
          modelKey={selectedModel}
          open={selectedModel !== null}
          onOpenChange={(open) => !open && setSelectedModel(null)}
        />
      )}
    </>
  );
}

