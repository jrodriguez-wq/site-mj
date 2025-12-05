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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modelKeys.map((key) => (
            <div key={key} className="h-96 bg-muted animate-pulse rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-20 space-y-12 md:space-y-16">
      <div className="text-center space-y-5 mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" suppressHydrationWarning>{title}</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-full mx-auto"></div>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>{subtitle}</p>
      </div>
      <div className="grid gap-10 md:gap-12 lg:gap-14 md:grid-cols-2 lg:grid-cols-3">
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

