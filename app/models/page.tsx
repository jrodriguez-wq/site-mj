"use client";

import { useEffect, useState, useMemo, Suspense, lazy, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getModelImages, getModelMainImage } from "@/lib/models/model-images";
import { getModelData } from "@/lib/models/model-data";
import { extractPrice } from "@/lib/models/model-utils";
import { ModelData, Community } from "@/types/model";
import { FilterState } from "@/components/models/model-filters";
import { getModelsForCommunity } from "@/lib/models/model-pricing";
import { FurnishedHomesSlider } from "@/components/models/furnished-homes-slider";

// Lazy load heavy components
const ModelCard = lazy(() => 
  import("@/components/models/model-card").then((module) => ({
    default: module.ModelCard,
  }))
);

const ModelFilters = lazy(() => 
  import("@/components/models/model-filters").then((module) => ({
    default: module.ModelFilters,
  }))
);

const MODEL_CONFIG = {
  louisiana: {
    badges: [{ type: "bestseller" as const, label: "Bestseller" }],
    satisfiedFamilies: 150,
  },
  viana: {
    badges: [{ type: "favorite" as const, label: "Favorite" }],
    satisfiedFamilies: 85,
  },
  delanie: {
    badges: [{ type: "satisfied" as const, label: "Satisfied" }],
    satisfiedFamilies: 120,
  },
  langdon: {
    badges: [
      { type: "bestseller" as const, label: "Bestseller" },
      { type: "favorite" as const, label: "Favorite" },
    ],
    satisfiedFamilies: 200,
  },
  emelia: {
    badges: [{ type: "satisfied" as const, label: "Satisfied" }],
    satisfiedFamilies: 95,
  },
  duplex: {
    badges: [{ type: "favorite" as const, label: "Investment" }],
    satisfiedFamilies: 0,
  },
} as const;

interface ModelDisplayData {
  key: string;
  name: string;
  description: string;
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
  community?: Community;
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
        // Obtener modelos de cada comunidad por separado
        const labelleModels = getModelsForCommunity("labelle");
        const lehighModels = getModelsForCommunity("lehigh-acres");

        // Cargar modelos de LaBelle
        const labelleModelKeys = labelleModels.map((key) => ({ key }));

        // Cargar modelos de Lehigh Acres
        const lehighModelKeys = lehighModels.map((key) => ({ key }));

        // Load models in batches to avoid blocking
        const batchSize = 3;

        // Cargar modelos de LaBelle
        for (let i = 0; i < labelleModelKeys.length; i += batchSize) {
          if (!isMounted) break;
          
          const batch = labelleModelKeys.slice(i, i + batchSize);
          const batchData = await Promise.all(
            batch.map(async (model) => {
              const modelData = await getModelData(model.key, "labelle");
              if (!modelData) return [];
              
              return [{
                key: `${model.key}-labelle`,
                name: modelData.name || model.key,
                description: modelData.description || "",
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
                community: "labelle" as Community,
              }];
            })
          );

          const flattened = batchData.flat();
          allModelsWithData.push(...flattened);
        }

        // Cargar modelos de Lehigh Acres
        for (let i = 0; i < lehighModelKeys.length; i += batchSize) {
          if (!isMounted) break;
          
          const batch = lehighModelKeys.slice(i, i + batchSize);
          const batchData = await Promise.all(
            batch.map(async (model) => {
              const modelData = await getModelData(model.key, "lehigh-acres");
              if (!modelData) return [];
              
              return [{
                key: `${model.key}-lehigh-acres`,
                name: modelData.name || model.key,
                description: modelData.description || "",
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
                community: "lehigh-acres" as Community,
              }];
            })
          );

          const flattened = batchData.flat();
          allModelsWithData.push(...flattened);
        }
      } else {
        // Cargar modelos de una comunidad específica
        const communityModels = getModelsForCommunity(selectedCommunity);
        const modelKeys = communityModels.map((key) => ({ key }));

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
                key: model.key,
                name: modelData.name || model.key,
                description: modelData.description || "",
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

      // Bedrooms filter - "2+" means 2 or more, "3+" means 3 or more, etc.
      // If multiple filters are selected, model must match at least one (OR logic)
      if (filters.bedrooms.length > 0) {
        const matchesBedroomFilter = filters.bedrooms.some(minBedrooms => 
          model.bedsNumber >= minBedrooms
        );
        if (!matchesBedroomFilter) {
          return false;
        }
      }

      // Bathrooms filter - "1+" means 1 or more, "2+" means 2 or more, etc.
      // If multiple filters are selected, model must match at least one (OR logic)
      if (filters.bathrooms.length > 0) {
        const matchesBathroomFilter = filters.bathrooms.some(minBathrooms => 
          model.bathsNumber >= minBathrooms
        );
        if (!matchesBathroomFilter) {
          return false;
        }
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
    <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-6 sm:pb-10 md:pb-12 lg:pb-16 xl:pb-20 min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      <div className="container mx-auto px-2.5 sm:px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-10 max-w-[1800px] w-full min-w-0">
        {/* Furnished Homes Slider - Before Header */}
        <FurnishedHomesSlider />

        {/* Header Section - Responsive typography and spacing */}
        <div className="mb-3 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="text-center space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3 mb-3 sm:mb-6 md:mb-8">
            <h1
              className="text-[clamp(1.25rem,4vw+1rem,3.75rem)] font-black tracking-tight text-foreground leading-tight max-w-full break-words px-1"
              suppressHydrationWarning
            >
              New Homes for Sale
            </h1>
            <p
              className="mx-auto max-w-2xl text-muted-foreground text-[clamp(0.6875rem,2vw+0.5rem,1.125rem)] leading-relaxed px-2 sm:px-4 break-words"
              suppressHydrationWarning
            >
              Browse new construction homes for sale in LaBelle and Lehigh Acres. Compare floor plans, purchase prices, and features. Rent to Own available on select models.
            </p>
          </div>

          {/* Community Selector - Visible on all screens */}
          {!isLoading && (
            <div className="mb-3 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-4">
              <label className="text-xs sm:text-sm md:text-base font-semibold text-foreground whitespace-nowrap shrink-0" suppressHydrationWarning>
                Community:
              </label>
              <Select
                value={selectedCommunity}
                onValueChange={(value) => setSelectedCommunity(value as Community | "all")}
              >
                <SelectTrigger className="w-full min-w-0 sm:w-auto sm:min-w-[180px] max-w-full text-xs sm:text-sm">
                  <SelectValue suppressHydrationWarning />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" suppressHydrationWarning>
                    All communities
                  </SelectItem>
                  <SelectItem value="labelle" suppressHydrationWarning>
                    LaBelle - Country living
                  </SelectItem>
                  <SelectItem value="lehigh-acres" suppressHydrationWarning>
                    Lehigh Acres - Near Fort Myers
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
              <div className="mb-3 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm pb-2 sm:pb-4 border-b border-border/30 min-w-0">
                <span className="text-muted-foreground font-medium break-words">
                  <span className="font-semibold text-foreground">{filteredModels.length}</span>{" "}
                  {filteredModels.length === 1 ? "model" : "models"} found
                </span>
                <span className="text-muted-foreground/70 text-[10px] sm:text-xs truncate max-w-full" suppressHydrationWarning>
                  Sorted by price: Low to High
                </span>
              </div>
            )}

            {/* Models Grid - Fully Responsive */}
            {isLoading ? (
              <div className="flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="text-muted-foreground text-xs sm:text-sm md:text-base" suppressHydrationWarning>
                  Loading models…
                </div>
              </div>
            ) : filteredModels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 text-center px-4">
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-3 sm:mb-4" suppressHydrationWarning>
                  No models found matching your filters.
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
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div 
                className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 grid-cols-1 md:grid-cols-2 w-full min-w-0" 
                suppressHydrationWarning
              >
                {filteredModels.map((model, index) => {
                  // Extraer el key base del modelo (sin el sufijo de comunidad)
                  const baseKey = model.key.split("-")[0] as keyof typeof MODEL_CONFIG;
                  const config = MODEL_CONFIG[baseKey];
                  const modelImages = getModelImages(baseKey);
                  const mainImage = getModelMainImage(baseKey);
                  // Auto carousel interval: 4 seconds (4000ms) - each card will cycle through images
                  const carouselInterval = 4000; // 4 seconds
                  const initialDelay = index * 80; // Stagger delay for animations

                  const displayBadges = config?.badges?.map(badge => ({
                    type: badge.type,
                    label: badge.label,
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
                        name={model.name}
                        description={model.description}
                        image={mainImage}
                        images={modelImages}
                        price={model.price}
                        rtoPrice={model.rtoPrice}
                        beds={model.beds}
                        bedsLabel="Beds"
                        baths={model.baths}
                        bathsLabel="Baths"
                        sqft={model.sqft}
                        sqftLabel="Sq ft"
                        badges={displayBadges}
                        satisfiedFamilies={config?.satisfiedFamilies}
                        viewDetailsLabel="More details"
                        viewPhotosLabel={`View photos (${modelImages.length})`}
                        galleryTitle={`Gallery – ${model.name}`}
                        galleryDescription={`${modelImages.length} ${modelImages.length === 1 ? "image" : "images"} available`}
                        modelLabel="Model"
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

