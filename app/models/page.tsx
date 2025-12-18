"use client";

import { useEffect, useState, useMemo, Suspense, lazy, useCallback } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelData } from "@/lib/models/model-data";
import { extractPrice } from "@/lib/models/model-utils";
import { ModelData } from "@/types/model";
import { FilterState } from "@/components/models/model-filters";

// Lazy load heavy components
const ModelCard = lazy(() => import("@/components/models/model-card").then(module => ({ default: module.ModelCard })));
const ModelFilters = lazy(() => import("@/components/models/model-filters").then(module => ({ default: module.ModelFilters })));

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
  priceNumber: number;
  beds: string;
  bedsNumber: number;
  baths: string;
  bathsNumber: number;
  sqft: string;
  sqftNumber: number;
  modelData: ModelData | null;
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
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 600000],
    bedrooms: [],
    bathrooms: [],
    sqftRange: [0, 4000],
  });

  useEffect(() => {
    let isMounted = true;

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

      // Load models in batches to avoid blocking
      const batchSize = 3;
      const modelsWithData: ModelDisplayData[] = [];

      for (let i = 0; i < modelKeys.length; i += batchSize) {
        if (!isMounted) break;
        
        const batch = modelKeys.slice(i, i + batchSize);
        const batchData = await Promise.all(
          batch.map(async (model) => {
            const modelData = await getModelData(model.key);
            const price = modelData?.price || "";
            const beds = modelData?.bedrooms || "";
            const baths = modelData?.bathrooms || "";
            const sqft = modelData?.sqft || "";
            
            return {
              ...model,
              price,
              priceNumber: extractPrice(price),
              beds,
              bedsNumber: extractNumber(beds),
              baths,
              bathsNumber: extractNumber(baths),
              sqft,
              sqftNumber: extractSqft(sqft),
              modelData,
            };
          })
        );

        modelsWithData.push(...batchData);
        
        // Update state incrementally for better perceived performance
        if (isMounted && i === 0) {
          const sortedModels = [...modelsWithData].sort((a, b) => a.priceNumber - b.priceNumber);
          setModels(sortedModels);
        }
      }

      if (!isMounted) return;

      // Sort by price (cheapest first)
      const sortedModels = modelsWithData.sort((a, b) => a.priceNumber - b.priceNumber);
      
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
  }, []);

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
    <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 max-w-[1800px]">
        {/* Header Section - All Screens */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground"
              suppressHydrationWarning
            >
              {t("homeModels.allModels")}
            </h1>
            <p
              className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed px-2"
              suppressHydrationWarning
            >
              {t("homeModels.allModelsSubtitle")}
            </p>
          </div>

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
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-sm pb-4 border-b border-border/30">
                <span className="text-muted-foreground font-medium">
                  <span className="font-semibold text-foreground">{filteredModels.length}</span>{" "}
                  {filteredModels.length === 1 ? t("models.results.one") || "model" : t("models.results.many") || "models"} {t("models.results.found") || "found"}
                </span>
                <span className="text-muted-foreground/70 text-xs sm:text-sm" suppressHydrationWarning>
                  {t("models.results.sortedBy") || "Sorted by price: Low to High"}
                </span>
              </div>
            )}

            {/* Models Grid - Fully Responsive */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
                <div className="text-muted-foreground text-sm sm:text-base">Loading models...</div>
              </div>
            ) : filteredModels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-center">
                <p className="text-muted-foreground text-sm sm:text-base mb-4" suppressHydrationWarning>
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
                className="grid gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 w-full" 
                suppressHydrationWarning
              >
                {filteredModels.map((model) => {
                  const config = MODEL_CONFIG[model.key as keyof typeof MODEL_CONFIG];
                  const modelImages = getModelImages(model.key);
                  const mainImage = getModelMainImage(model.key);
                  // Disable auto carousel for better performance
                  const carouselInterval = 0; // Disabled
                  const initialDelay = 0;

                  return (
                    <Suspense 
                      key={model.key} 
                      fallback={
                        <div className="h-96 bg-muted/50 rounded-2xl animate-pulse" />
                      }
                    >
                      <ModelCard
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

