"use client";

import { ModelCard } from "@/components/models/model-card";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelData } from "@/lib/models/model-data";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";
import type { ModelData } from "@/types/model";
import { sortModelsByPrice } from "@/lib/models/model-utils";

interface CommunityModelsSectionProps {
  modelKeys: string[];
  title: string;
  subtitle: string;
}

export const CommunityModelsSection = ({ modelKeys, title, subtitle }: CommunityModelsSectionProps) => {
  const { t } = useTranslation();
  const [modelsData, setModelsData] = useState<(ModelData & { key: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      const data = await Promise.all(
        modelKeys.map(async (key) => {
          const modelData = await getModelData(key);
          return modelData ? { ...modelData, key } : null;
        })
      );
      const validModels = data.filter((m): m is ModelData & { key: string } => m !== null);
      // Sort by price (cheapest first)
      const sortedModels = sortModelsByPrice(validModels);
      setModelsData(sortedModels);
      setLoading(false);
    };
    loadModels();
  }, [modelKeys]);

  if (loading) {
    return (
      <section className="py-10 md:py-14 lg:py-18">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight" suppressHydrationWarning>{title}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>{subtitle}</p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {modelKeys.map((key) => (
                <div key={key} className="h-96 bg-muted animate-pulse rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14 lg:py-18">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          <div className="text-center space-y-4 mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight" suppressHydrationWarning>{title}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>{subtitle}</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {modelsData.map((modelData) => {
              const modelImages = getModelImages(modelData.key);
              const mainImage = getModelMainImage(modelData.key);
              return (
                <ModelCard
                  key={modelData.key}
                  modelKey={modelData.key}
                  name={t(`homeModels.models.${modelData.key}.name`)}
                  description={t(`homeModels.models.${modelData.key}.description`)}
                  image={mainImage}
                  images={modelImages}
                  price={modelData.price}
                  beds={modelData.bedrooms}
                  bedsLabel={t("homeModels.beds")}
                  baths={modelData.bathrooms}
                  bathsLabel={t("homeModels.baths")}
                  sqft={modelData.sqft}
                  sqftLabel={t("homeModels.sqft")}
                  viewDetailsLabel={t("homeModels.moreDetails")}
                  viewPhotosLabel={`${t("homeModels.viewPhotos")} (${modelImages.length})`}
                  galleryTitle={`${t("homeModels.gallery")} ${t(`homeModels.models.${modelData.key}.name`)}`}
                  galleryDescription={`${modelImages.length} ${modelImages.length === 1 ? t("homeModels.image") : t("homeModels.images")} ${t("homeModels.available")}`}
                  modelLabel={t("homeModels.model")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

