"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter, DollarSign, Bed, Bath, Square, RotateCcw, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export interface FilterState {
  priceRange: [number, number];
  bedrooms: number[];
  bathrooms: number[];
  sqftRange: [number, number];
}

interface ModelFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
  maxSqft: number;
}

export const ModelFilters = ({ filters, onFiltersChange, maxPrice, maxSqft }: ModelFiltersProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    });
  };

  const handleSqftChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      sqftRange: [value[0], value[1]] as [number, number],
    });
  };

  const toggleBedroom = (bedrooms: number) => {
    const newBedrooms = filters.bedrooms.includes(bedrooms)
      ? filters.bedrooms.filter((b) => b !== bedrooms)
      : [...filters.bedrooms, bedrooms];
    onFiltersChange({
      ...filters,
      bedrooms: newBedrooms,
    });
  };

  const toggleBathroom = (bathrooms: number) => {
    const newBathrooms = filters.bathrooms.includes(bathrooms)
      ? filters.bathrooms.filter((b) => b !== bathrooms)
      : [...filters.bathrooms, bathrooms];
    onFiltersChange({
      ...filters,
      bathrooms: newBathrooms,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      priceRange: [0, maxPrice],
      bedrooms: [],
      bathrooms: [],
      sqftRange: [0, maxSqft],
    });
  };

  const activeFiltersCount =
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0) +
    (filters.bedrooms.length > 0 ? 1 : 0) +
    (filters.bathrooms.length > 0 ? 1 : 0) +
    (filters.sqftRange[0] > 0 || filters.sqftRange[1] < maxSqft ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className={cn(
          "lg:hidden w-full justify-between h-11 mb-4",
          "border border-border/50 hover:border-primary/50",
          "bg-background hover:bg-muted/50 transition-all"
        )}
      >
        <span className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium" suppressHydrationWarning>
            {t("models.filters.title") || "Filters"}
          </span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {/* Mobile Filter Panel */}
      <div className={cn(
        "lg:hidden mt-4 p-5 rounded-xl border border-border/50 bg-card shadow-lg space-y-6",
        isOpen ? "block animate-in fade-in-0 slide-in-from-top-2" : "hidden"
      )}>
        <div className="flex items-center justify-between pb-4 border-b border-border/30">
          <h3 className="font-semibold text-lg" suppressHydrationWarning>
            {t("models.filters.title") || "Filters"}
          </h3>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs h-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <RotateCcw className="h-3 w-3 mr-1.5" />
              {t("models.filters.reset") || "Reset"}
            </Button>
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold" suppressHydrationWarning>
              {t("models.filters.priceRange") || "Price Range"}
            </span>
          </div>
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={maxPrice}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>${(filters.priceRange[0] / 1000).toFixed(0)}k</span>
            <span>${(filters.priceRange[1] / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold" suppressHydrationWarning>
              {t("models.filters.bedrooms") || "Bedrooms"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[2, 3, 4].map((bedrooms) => {
              const isActive = filters.bedrooms.includes(bedrooms);
              return (
                <button
                  key={bedrooms}
                  onClick={() => toggleBedroom(bedrooms)}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                  )}
                >
                  {bedrooms}+
                </button>
              );
            })}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold" suppressHydrationWarning>
              {t("models.filters.bathrooms") || "Bathrooms"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((bathrooms) => {
              const isActive = filters.bathrooms.includes(bathrooms);
              return (
                <button
                  key={bathrooms}
                  onClick={() => toggleBathroom(bathrooms)}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                  )}
                >
                  {bathrooms}+
                </button>
              );
            })}
          </div>
        </div>

        {/* Square Feet */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold" suppressHydrationWarning>
              {t("models.filters.sqftRange") || "Square Feet"}
            </span>
          </div>
          <Slider
            value={filters.sqftRange}
            onValueChange={handleSqftChange}
            min={0}
            max={maxSqft}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>{(filters.sqftRange[0] / 1000).toFixed(1)}k</span>
            <span>{(filters.sqftRange[1] / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Fixed Left */}
      <aside className="hidden lg:block w-80 xl:w-96 shrink-0">
        <div className="sticky top-32 xl:top-36 p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg" suppressHydrationWarning>
                {t("models.filters.title") || "Filters"}
              </h3>
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs h-8 hover:bg-destructive/10 hover:text-destructive"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                {t("models.filters.reset") || "Reset"}
              </Button>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <label className="text-sm font-semibold cursor-pointer" suppressHydrationWarning>
                {t("models.filters.priceRange") || "Price Range"}
              </label>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={maxPrice}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm font-semibold">
                  ${(filters.priceRange[0] / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="h-px w-6 bg-border/50" />
              <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm font-semibold">
                  ${(filters.priceRange[1] / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bed className="h-4 w-4 text-primary" />
              </div>
              <label className="text-sm font-semibold cursor-pointer" suppressHydrationWarning>
                {t("models.filters.bedrooms") || "Bedrooms"}
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4].map((bedrooms) => {
                const isActive = filters.bedrooms.includes(bedrooms);
                return (
                  <button
                    key={bedrooms}
                    onClick={() => toggleBedroom(bedrooms)}
                    className={cn(
                      "flex-1 min-w-[70px] px-4 py-2.5 text-sm font-semibold rounded-lg transition-all",
                      "hover:scale-105 active:scale-95",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                    )}
                  >
                    {bedrooms}+
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bath className="h-4 w-4 text-primary" />
              </div>
              <label className="text-sm font-semibold cursor-pointer" suppressHydrationWarning>
                {t("models.filters.bathrooms") || "Bathrooms"}
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((bathrooms) => {
                const isActive = filters.bathrooms.includes(bathrooms);
                return (
                  <button
                    key={bathrooms}
                    onClick={() => toggleBathroom(bathrooms)}
                    className={cn(
                      "flex-1 min-w-[70px] px-4 py-2.5 text-sm font-semibold rounded-lg transition-all",
                      "hover:scale-105 active:scale-95",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                    )}
                  >
                    {bathrooms}+
                  </button>
                );
              })}
            </div>
          </div>

          {/* Square Feet */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Square className="h-4 w-4 text-primary" />
              </div>
              <label className="text-sm font-semibold cursor-pointer" suppressHydrationWarning>
                {t("models.filters.sqftRange") || "Square Feet"}
              </label>
            </div>
            <Slider
              value={filters.sqftRange}
              onValueChange={handleSqftChange}
              min={0}
              max={maxSqft}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm font-semibold">
                  {(filters.sqftRange[0] / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="h-px w-6 bg-border/50" />
              <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm font-semibold">
                  {(filters.sqftRange[1] / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
