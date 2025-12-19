"use client";

import { useEffect, useState, useMemo, Suspense, lazy, useCallback } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelData } from "@/lib/models/model-data";
import { extractPrice } from "@/lib/models/model-utils";
import { ModelData, Community } from "@/types/model";
import { FilterState } from "@/components/models/model-filters";
import { getModelsForCommunity } from "@/lib/models/model-pricing";

// Lazy load heavy components
const ModelCard = lazy(() => import("@/components/models/model-card").then(module => ({ default: module.ModelCard })));
const ModelFilters = lazy(() => import("@/components/models/model-filters").then(module => ({ default: module.ModelFilters })));

// Configuración de badges y datos adicionales por modelo
// Las etiquetas se obtendrán de las traducciones usando labelKey
const MODEL_CONFIG = {
  louisiana: {
    badges: [{ type: "bestseller" as const, labelKey: "homeModels.badges.bestseller" }],
    satisfiedFamilies: 150,
  },
  viana: {
    badges: [{ type: "favorite" as const, labelKey: "homeModels.badges.favorite" }],
    satisfiedFamilies: 85,
  },
  delanie: {
    badges: [{ type: "satisfied" as const, labelKey: "homeModels.badges.satisfied" }],
    satisfiedFamilies: 120,
  },
  langdon: {
    badges: [
      { type: "bestseller" as const, labelKey: "homeModels.badges.bestseller" },
      { type: "favorite" as const, labelKey: "homeModels.badges.favorite" },
    ],
    satisfiedFamilies: 200,
  },
  emelia: {
    badges: [{ type: "satisfied" as const, labelKey: "homeModels.badges.satisfied" }],
    satisfiedFamilies: 95,
  },
  duplex: {
    badges: [{ type: "favorite" as const, labelKey: "homeModels.badges.investment" }],
    satisfiedFamilies: 0,
  },
} as const;

interface ModelDisplayData {
  key: string;
  nameKey: string;
  descriptionKey: string;
  priceKey: string;
  price: string;
  priceNumber: number;
  rtoPrice?: string;
  beds: string;
  bedsNumber: number;
  baths: string;
  bathsNumber: number;
  sqft: string;
  sqftNumber: number;
  modelData: ModelData | null;
  community?: Community; // Comunidad a la que pertenece este modelo
}


// Helper function to extract numeric value from string like "4" or "3+"
const extractNumber = (value: string): number => {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Helper function to extract sqft number from string like "3,277"
const extractSqft = (sqftString: string): number => {
  const cleaned = sqftString.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
};

export default function ModelsPage() {
  const { t } = useTranslation();
  const [models, setModels] = useState<ModelDisplayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | "all">("all");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 600000],
    bedrooms: [],
    bathrooms: [],
    sqftRange: [0, 4000],
  });

  useEffect(() => {
    let isMounted = true;

    const loadModelsData = async () => {
      setIsLoading(true);
      
      const allModelsWithData: ModelDisplayData[] = [];

      if (selectedCommunity === "all") {
        // Obtener todos los modelos únicos de ambas comunidades
        const labelleModels = getModelsForCommunity("labelle");
        const lehighModels = getModelsForCommunity("lehigh-acres");
        const modelKeysSet = new Set<string>();
        [...labelleModels, ...lehighModels].forEach(key => modelKeysSet.add(key));

        const modelKeys = Array.from(modelKeysSet).map((key) => ({
          key,
          nameKey: `homeModels.models.${key}.name`,
          descriptionKey: `homeModels.models.${key}.description`,
          priceKey: `homeModels.models.${key}.price`,
        }));

        // Load models in batches to avoid blocking
        const batchSize = 3;

        for (let i = 0; i < modelKeys.length; i += batchSize) {
          if (!isMounted) break;
          
          const batch = modelKeys.slice(i, i + batchSize);
          const batchData = await Promise.all(
            batch.map(async (model) => {
              // Cargar el modelo de ambas comunidades y crear entradas separadas
              const labelleData = await getModelData(model.key, "labelle");
              const lehighData = await getModelData(model.key, "lehigh-acres");
              
              const results: ModelDisplayData[] = [];
              
              if (labelleData) {
                results.push({
                  ...model,
                  key: `${model.key}-labelle`,
                  price: labelleData.price,
                  priceNumber: extractPrice(labelleData.price),
                  rtoPrice: labelleData.rtoPrice,
                  beds: labelleData.bedrooms,
                  bedsNumber: extractNumber(labelleData.bedrooms),
                  baths: labelleData.bathrooms,
                  bathsNumber: extractNumber(labelleData.bathrooms),
                  sqft: labelleData.sqft,
                  sqftNumber: extractSqft(labelleData.sqft),
                  modelData: labelleData,
                  community: "labelle",
                });
              }
              
              if (lehighData) {
                results.push({
                  ...model,
                  key: `${model.key}-lehigh-acres`,
                  price: lehighData.price,
                  priceNumber: extractPrice(lehighData.price),
                  rtoPrice: lehighData.rtoPrice,
                  beds: lehighData.bedrooms,
                  bedsNumber: extractNumber(lehighData.bedrooms),
                  baths: lehighData.bathrooms,
                  bathsNumber: extractNumber(lehighData.bathrooms),
                  sqft: lehighData.sqft,
                  sqftNumber: extractSqft(lehighData.sqft),
                  modelData: lehighData,
                  community: "lehigh-acres",
                });
              }
              
              return results;
            })
          );

          // Aplanar los resultados
          const flattened = batchData.flat();
          allModelsWithData.push(...flattened);
        }
      } else {
        // Cargar modelos de una comunidad específica
        const communityModels = getModelsForCommunity(selectedCommunity);
        const modelKeys = communityModels.map((key) => ({
          key,
          nameKey: `homeModels.models.${key}.name`,
          descriptionKey: `homeModels.models.${key}.description`,
          priceKey: `homeModels.models.${key}.price`,
        }));

        // Load models in batches to avoid blocking
        const batchSize = 3;

        for (let i = 0; i < modelKeys.length; i += batchSize) {
          if (!isMounted) break;
          
          const batch = modelKeys.slice(i, i + batchSize);
          const batchData = await Promise.all(
            batch.map(async (model) => {
              const modelData = await getModelData(model.key, selectedCommunity);
              if (!modelData) return [];
              
              return [{
                ...model,
                price: modelData.price,
                priceNumber: extractPrice(modelData.price),
                rtoPrice: modelData.rtoPrice,
                beds: modelData.bedrooms,
                bedsNumber: extractNumber(modelData.bedrooms),
                baths: modelData.bathrooms,
                bathsNumber: extractNumber(modelData.bathrooms),
                sqft: modelData.sqft,
                sqftNumber: extractSqft(modelData.sqft),
                modelData,
                community: selectedCommunity,
              }];
            })
          );

          // Aplanar los resultados
          const flattened = batchData.flat();
          allModelsWithData.push(...flattened);
        }
      }

      if (!isMounted) return;

      // Sort by price (cheapest first)
      const sortedModels = allModelsWithData.sort((a, b) => a.priceNumber - b.priceNumber);
      
      // Set max values for filters
      const maxPrice = Math.max(...sortedModels.map((m) => m.priceNumber), 600000);
      const maxSqft = Math.max(...sortedModels.map((m) => m.sqftNumber), 4000);
      
      setModels(sortedModels);
      setFilters((prev) => ({
        ...prev,
        priceRange: [0, maxPrice],
        sqftRange: [0, maxSqft],
      }));
      setIsLoading(false);
    };

    loadModelsData();

    return () => {
      isMounted = false;
    };
  }, [selectedCommunity]);

  // Filter and sort models
  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      // Price filter
      if (model.priceNumber < filters.priceRange[0] || model.priceNumber > filters.priceRange[1]) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(model.bedsNumber)) {
        return false;
      }

      // Bathrooms filter
      if (filters.bathrooms.length > 0 && !filters.bathrooms.includes(model.bathsNumber)) {
        return false;
      }

      // Sqft filter
      if (model.sqftNumber < filters.sqftRange[0] || model.sqftNumber > filters.sqftRange[1]) {
        return false;
      }

      return true;
    });
  }, [models, filters]);

  const maxPrice = useMemo(() => {
    return models.length > 0 ? Math.max(...models.map((m) => m.priceNumber), 600000) : 600000;
  }, [models]);

  const maxSqft = useMemo(() => {
    return models.length > 0 ? Math.max(...models.map((m) => m.sqftNumber), 4000) : 4000;
  }, [models]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-10 max-w-[1800px]">
        {/* Header Section - All Screens */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="text-center space-y-1.5 sm:space-y-2 md:space-y-3 mb-4 sm:mb-6 md:mb-8">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-foreground leading-tight sm:leading-normal"
              suppressHydrationWarning
            >
              {t("homeModels.allModels")}
            </h1>
            <p
              className="mx-auto max-w-2xl text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2 sm:px-4"
              suppressHydrationWarning
            >
              {t("homeModels.allModelsSubtitle")}
            </p>
          </div>

          {/* Community Selector - Visible on all screens */}
          {!isLoading && (
            <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
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
          )}

          {/* Mobile Filters - Only visible on mobile/tablet */}
          {!isLoading && (
            <div className="lg:hidden">
              <Suspense fallback={<div className="h-20 bg-muted/50 rounded-xl animate-pulse" />}>
                <ModelFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  maxPrice={maxPrice}
                  maxSqft={maxSqft}
                />
              </Suspense>
            </div>
          )}
        </div>

        {/* Main Layout - Desktop: Sidebar Left + Content Right | Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12">
          {/* Desktop Sidebar Filters - Left Side */}
          {!isLoading && (
            <aside className="hidden lg:block w-80 xl:w-96 shrink-0">
              <Suspense fallback={<div className="h-96 bg-muted/50 rounded-2xl animate-pulse" />}>
                <ModelFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  maxPrice={maxPrice}
                  maxSqft={maxSqft}
                />
              </Suspense>
            </aside>
          )}

          {/* Main Content Area - Right Side (Desktop) */}
          <div className="flex-1 min-w-0 w-full">
            {/* Results count and info - All Screens */}
            {!isLoading && (
              <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm pb-3 sm:pb-4 border-b border-border/30">
                <span className="text-muted-foreground font-medium">
                  <span className="font-semibold text-foreground">{filteredModels.length}</span>{" "}
                  {filteredModels.length === 1 ? t("models.results.one") || "model" : t("models.results.many") || "models"} {t("models.results.found") || "found"}
                </span>
                <span className="text-muted-foreground/70 text-[10px] sm:text-xs md:text-sm" suppressHydrationWarning>
                  {t("models.results.sortedBy") || "Sorted by price: Low to High"}
                </span>
              </div>
            )}

            {/* Models Grid - Fully Responsive */}
            {isLoading ? (
              <div className="flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="text-muted-foreground text-xs sm:text-sm md:text-base" suppressHydrationWarning>
                  {t("models.loading")}
                </div>
              </div>
            ) : filteredModels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 text-center px-4">
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-3 sm:mb-4" suppressHydrationWarning>
                  {t("models.noResults") || "No models found matching your filters."}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    priceRange: [0, maxPrice],
                    bedrooms: [],
                    bathrooms: [],
                    sqftRange: [0, maxSqft],
                  })}
                  className="text-xs sm:text-sm"
                >
                  {t("models.filters.reset") || "Reset Filters"}
                </Button>
              </div>
            ) : (
              <div 
                className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 grid-cols-1 md:grid-cols-2 w-full" 
                suppressHydrationWarning
              >
                {filteredModels.map((model) => {
                  // Extraer el key base del modelo (sin el sufijo de comunidad)
                  const baseKey = model.key.split("-")[0] as keyof typeof MODEL_CONFIG;
                  const config = MODEL_CONFIG[baseKey];
                  const modelImages = getModelImages(baseKey);
                  const mainImage = getModelMainImage(baseKey);
                  // Disable auto carousel for better performance
                  const carouselInterval = 0; // Disabled
                  const initialDelay = 0;

                  // Convertir badges con labelKey a badges con label traducida
                  const translatedBadges = config?.badges?.map(badge => ({
                    type: badge.type,
                    label: t(badge.labelKey),
                  }));

                  return (
                    <Suspense 
                      key={model.key} 
                      fallback={
                        <div className="h-96 bg-muted/50 rounded-2xl animate-pulse" />
                      }
                    >
                      <ModelCard
                        modelKey={baseKey}
                        name={t(model.nameKey)}
                        description={t(model.descriptionKey)}
                        image={mainImage}
                        images={modelImages}
                        price={model.price}
                        rtoPrice={model.rtoPrice}
                        beds={model.beds}
                        bedsLabel={t("homeModels.beds")}
                        baths={model.baths}
                        bathsLabel={t("homeModels.baths")}
                        sqft={model.sqft}
                        sqftLabel={t("homeModels.sqft")}
                        badges={translatedBadges}
                        satisfiedFamilies={config?.satisfiedFamilies}
                        viewDetailsLabel={t("homeModels.moreDetails")}
                        viewPhotosLabel={`${t("homeModels.viewPhotos")} (${modelImages.length})`}
                        galleryTitle={`${t("homeModels.gallery")} ${t(model.nameKey)}`}
                        galleryDescription={`${modelImages.length} ${modelImages.length === 1 ? t("homeModels.image") : t("homeModels.images")} ${t("homeModels.available")}`}
                        modelLabel={t("homeModels.model")}
                        carouselDelay={carouselInterval}
                        initialDelay={initialDelay}
                        community={model.community}
                      />
                    </Suspense>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

