"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bed,
  Bath,
  Square,
  Home,
  Car,
  Layers,
  MapPin,
  CheckCircle2,
  X,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface ModelDetailsDialogProps {
  modelKey: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModelDetailsDialog = ({
  modelKey,
  open,
  onOpenChange,
}: ModelDetailsDialogProps) => {
  const { t } = useTranslation();

  const modelData = {
    name: t(`homeModels.models.${modelKey}.name`),
    description: t(`homeModels.models.${modelKey}.description`),
    price: t(`homeModels.models.${modelKey}.price`),
    priceRange: t(`homeModels.models.${modelKey}.priceRange`),
    features: [
      t(`homeModels.models.${modelKey}.features.0`),
      t(`homeModels.models.${modelKey}.features.1`),
      t(`homeModels.models.${modelKey}.features.2`),
      t(`homeModels.models.${modelKey}.features.3`),
      t(`homeModels.models.${modelKey}.features.4`),
      t(`homeModels.models.${modelKey}.features.5`),
    ],
    specifications: {
      bedrooms: t(`homeModels.models.${modelKey}.specifications.bedrooms`),
      bathrooms: t(`homeModels.models.${modelKey}.specifications.bathrooms`),
      squareFeet: t(`homeModels.models.${modelKey}.specifications.squareFeet`),
      garage: t(`homeModels.models.${modelKey}.specifications.garage`),
      stories: t(`homeModels.models.${modelKey}.specifications.stories`),
      lotSize: t(`homeModels.models.${modelKey}.specifications.lotSize`),
    },
  };

  const specIcons = [
    { icon: Bed, label: modelData.specifications.bedrooms },
    { icon: Bath, label: modelData.specifications.bathrooms },
    { icon: Square, label: modelData.specifications.squareFeet },
    { icon: Car, label: modelData.specifications.garage },
    { icon: Layers, label: modelData.specifications.stories },
    { icon: MapPin, label: modelData.specifications.lotSize },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] lg:max-w-7xl xl:max-w-[90vw] 2xl:max-w-[85vw] max-h-[95vh] overflow-hidden p-0 gap-0 rounded-2xl"
        showCloseButton={false}
      >
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 rounded-full bg-background/90 backdrop-blur-sm p-2 shadow-lg hover:bg-background transition-colors border border-border/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="bg-linear-to-br from-primary/5 via-background to-muted/20 p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full max-h-[95vh]">
            <DialogHeader className="space-y-3 mb-6 shrink-0">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <DialogTitle
                    className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight"
                    suppressHydrationWarning
                  >
                    {modelData.name}
                  </DialogTitle>
                  <DialogDescription
                    className="text-lg md:text-xl text-muted-foreground/80 font-light leading-relaxed"
                    suppressHydrationWarning
                  >
                    {modelData.description}
                  </DialogDescription>
                </div>
                <div className="text-left lg:text-right space-y-2 bg-primary/5 rounded-2xl p-5 lg:p-6 border-2 border-primary/10 shadow-lg lg:min-w-[240px] shrink-0">
                  <div className="text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-wide" suppressHydrationWarning>
                    {t("homeModels.startingFrom")}
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black text-primary" suppressHydrationWarning>
                    {modelData.price}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground/70 font-medium" suppressHydrationWarning>
                    {modelData.priceRange}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 flex-1 min-h-0 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold mb-4 text-foreground flex items-center gap-3"
                    suppressHydrationWarning
                  >
                    <Home className="h-6 w-6 text-primary" />
                    {t("homeModels.specifications")}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {specIcons.map((spec, index) => {
                      const Icon = spec.icon;
                      return (
                        <Card
                          key={index}
                          className="border border-border/50 bg-card/80 hover:bg-card transition-all hover:shadow-md hover:border-primary/30"
                        >
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-sm md:text-base font-semibold text-foreground/90 truncate" suppressHydrationWarning>
                              {spec.label}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3
                    className="text-xl md:text-2xl font-bold mb-4 text-foreground flex items-center gap-3"
                    suppressHydrationWarning
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    {t("homeModels.features")}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {modelData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-all border border-border/30 hover:border-primary/30 hover:shadow-md"
                        suppressHydrationWarning
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-foreground/90 font-medium leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 space-y-3 shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/rent-to-own" suppressHydrationWarning>
                    {t("homeModels.applyNow")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2 hover:bg-muted font-bold text-base py-6 hover:border-primary/50 transition-all"
                >
                  <Link href="/contact" suppressHydrationWarning>
                    {t("homeModels.scheduleTour")}
                  </Link>
                </Button>
              </div>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full border border-border/50 hover:bg-muted/50 font-semibold text-sm py-5 transition-all hover:border-primary/30"
              >
                <Link href="/models" onClick={() => onOpenChange(false)} suppressHydrationWarning>
                  {t("homeModels.viewAllModels")} →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

