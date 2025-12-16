"use client";

import { ModelCard } from "@/components/models/model-card";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelData } from "@/lib/models/model-data";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";
import type { ModelData } from "@/types/model";

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
      setModelsData(data.filter((m): m is ModelData & { key: string } => m !== null));
      setLoading(false);
    };
    loadModels();
  }, [modelKeys]);

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold" suppressHydrationWarning>{title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>{subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {modelKeys.map((key) => (
            <div key={key} className="h-96 bg-muted animate-pulse rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
      <div className="text-center space-y-3 sm:space-y-4 md:space-y-5 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground px-2" suppressHydrationWarning>{title}</h2>
        <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-full mx-auto"></div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4" suppressHydrationWarning>{subtitle}</p>
      </div>
      <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 md:grid-cols-2">
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
    </section>
  );
};

