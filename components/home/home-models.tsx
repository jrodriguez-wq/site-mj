"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Bed, Bath, Square } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { ModelDetailsDialog } from "./model-details-dialog";

export const HomeModels = () => {
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const models = [
    {
      key: "louisiana",
      nameKey: "homeModels.models.louisiana.name",
      descriptionKey: "homeModels.models.louisiana.description",
      beds: "3-4",
      baths: "2-3",
      sqft: "1,500-2,000",
    },
    {
      key: "viana",
      nameKey: "homeModels.models.viana.name",
      descriptionKey: "homeModels.models.viana.description",
      beds: "3-4",
      baths: "2-3",
      sqft: "1,600-2,100",
    },
    {
      key: "delanie",
      nameKey: "homeModels.models.delanie.name",
      descriptionKey: "homeModels.models.delanie.description",
      beds: "4",
      baths: "3",
      sqft: "2,000-2,400",
    },
    {
      key: "aurora",
      nameKey: "homeModels.models.aurora.name",
      descriptionKey: "homeModels.models.aurora.description",
      beds: "4-5",
      baths: "3-4",
      sqft: "2,200-2,600",
    },
    {
      key: "langdon",
      nameKey: "homeModels.models.langdon.name",
      descriptionKey: "homeModels.models.langdon.description",
      beds: "4-5",
      baths: "3-4",
      sqft: "2,400-2,800",
    },
    {
      key: "emelia",
      nameKey: "homeModels.models.emelia.name",
      descriptionKey: "homeModels.models.emelia.description",
      beds: "5",
      baths: "4",
      sqft: "2,600-3,000",
    },
  ];

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
              {t("homeModels.title")}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
              {t("homeModels.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card
                key={model.nameKey}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 bg-linear-to-br from-card to-card/50"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <Button
                    variant="outline"
                    className="w-full group/btn"
                    size="lg"
                    onClick={() => setSelectedModel(model.key)}
                  >
                    <span className="flex items-center justify-center gap-2" suppressHydrationWarning>
                      {t("homeModels.viewDetails")}
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedModel && (
        <ModelDetailsDialog
          modelKey={selectedModel}
          open={selectedModel !== null}
          onOpenChange={(open) => !open && setSelectedModel(null)}
        />
      )}
    </>
  );
};
