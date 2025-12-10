"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { ModelCard } from "@/components/models/model-card";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelData } from "@/lib/models/model-data";
import { ModelData } from "@/types/model";

// Configuración de badges y datos adicionales por modelo
const MODEL_CONFIG = {
  louisiana: {
    badges: [{ type: "bestseller" as const, label: "Más Vendido" }],
    satisfiedFamilies: 150,
  },
  viana: {
    badges: [{ type: "favorite" as const, label: "Modelo Favorito" }],
    satisfiedFamilies: 85,
  },
  delanie: {
    badges: [{ type: "satisfied" as const, label: "Familias Satisfechas" }],
    satisfiedFamilies: 120,
  },
  langdon: {
    badges: [
      { type: "bestseller" as const, label: "Más Vendido" },
      { type: "favorite" as const, label: "Modelo Favorito" },
    ],
    satisfiedFamilies: 200,
  },
  emelia: {
    badges: [{ type: "satisfied" as const, label: "Familias Satisfechas" }],
    satisfiedFamilies: 95,
  },
  duplex: {
    badges: [{ type: "favorite" as const, label: "Inversión" }],
    satisfiedFamilies: 0,
  },
};

interface ModelDisplayData {
  key: string;
  nameKey: string;
  descriptionKey: string;
  priceKey: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  modelData: ModelData | null;
}

export default function ModelsPage() {
  const { t } = useTranslation();
  const [models, setModels] = useState<ModelDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModelsData = async () => {
      const modelKeys = [
        {
          key: "louisiana",
          nameKey: "homeModels.models.louisiana.name",
          descriptionKey: "homeModels.models.louisiana.description",
          priceKey: "homeModels.models.louisiana.price",
        },
        {
          key: "viana",
          nameKey: "homeModels.models.viana.name",
          descriptionKey: "homeModels.models.viana.description",
          priceKey: "homeModels.models.viana.price",
        },
        {
          key: "delanie",
          nameKey: "homeModels.models.delanie.name",
          descriptionKey: "homeModels.models.delanie.description",
          priceKey: "homeModels.models.delanie.price",
        },
        {
          key: "aurora",
          nameKey: "homeModels.models.aurora.name",
          descriptionKey: "homeModels.models.aurora.description",
          priceKey: "homeModels.models.aurora.price",
        },
        {
          key: "langdon",
          nameKey: "homeModels.models.langdon.name",
          descriptionKey: "homeModels.models.langdon.description",
          priceKey: "homeModels.models.langdon.price",
        },
        {
          key: "emelia",
          nameKey: "homeModels.models.emelia.name",
          descriptionKey: "homeModels.models.emelia.description",
          priceKey: "homeModels.models.emelia.price",
        },
        {
          key: "duplex",
          nameKey: "homeModels.models.duplex.name",
          descriptionKey: "homeModels.models.duplex.description",
          priceKey: "homeModels.models.duplex.price",
        },
      ];

      const modelsWithData = await Promise.all(
        modelKeys.map(async (model) => {
          const modelData = await getModelData(model.key);
          return {
            ...model,
            price: modelData?.price || "",
            beds: modelData?.bedrooms || "",
            baths: modelData?.bathrooms || "",
            sqft: modelData?.sqft || "",
            modelData,
          };
        })
      );

      setModels(modelsWithData);
      setIsLoading(false);
    };

    loadModelsData();
  }, []);

  return (
    <div className="pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12 py-8 md:py-12">
          <div className="text-center space-y-4">
            <h1
              className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              suppressHydrationWarning
            >
              {t("homeModels.allModels")}
            </h1>
            <p
              className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl leading-relaxed"
              suppressHydrationWarning
            >
              {t("homeModels.allModelsSubtitle")}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-muted-foreground">Cargando modelos...</div>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2" suppressHydrationWarning>
              {models.map((model, index) => {
                const config = MODEL_CONFIG[model.key as keyof typeof MODEL_CONFIG];
                const modelImages = getModelImages(model.key);
                const mainImage = getModelMainImage(model.key);
                // Stagger initial delays: each card starts at a different time (index * 800ms)
                // But all cards change images at the same interval (4000ms)
                const initialDelay = index * 800;
                const carouselInterval = 4000;

                return (
                  <ModelCard
                    key={model.key}
                    modelKey={model.key}
                    name={t(model.nameKey)}
                    description={t(model.descriptionKey)}
                    image={mainImage}
                    images={modelImages}
                    price={model.price}
                    beds={model.beds}
                    bedsLabel={t("homeModels.beds")}
                    baths={model.baths}
                    bathsLabel={t("homeModels.baths")}
                    sqft={model.sqft}
                    sqftLabel={t("homeModels.sqft")}
                    badges={config?.badges}
                    satisfiedFamilies={config?.satisfiedFamilies}
                    viewDetailsLabel={t("homeModels.moreDetails")}
                    viewPhotosLabel={`${t("homeModels.viewPhotos")} (${modelImages.length})`}
                    galleryTitle={`${t("homeModels.gallery")} ${t(model.nameKey)}`}
                    galleryDescription={`${modelImages.length} ${modelImages.length === 1 ? t("homeModels.image") : t("homeModels.images")} ${t("homeModels.available")}`}
                    modelLabel={t("homeModels.model")}
                    carouselDelay={carouselInterval}
                    initialDelay={initialDelay}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

