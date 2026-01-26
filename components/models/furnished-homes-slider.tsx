"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODEL_AMO_IMAGES } from "@/lib/models/model-images";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FurnishedImage {
  image: string;
  modelKey: string;
  modelName: string;
}

const FURNISHED_EN = {
  title: "Furnished Homes",
  subtitle: "See how our models look when fully furnished",
  model: "Model",
  viewModel: "View Model",
  previousImage: "Previous image",
  nextImage: "Next image",
} as const;

const MODEL_NAMES_EN: Record<string, string> = {
  louisiana: "Louisiana",
  viana: "Viana",
  delanie: "Delanie",
  aurora: "Aurora",
  langdon: "Langdon",
  emelia: "Emelia",
  duplex: "Duplex",
};

export const FurnishedHomesSlider = () => {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isEn = language === "en";

  // Recopilar todas las imágenes amobladas de todos los modelos
  const furnishedImages: FurnishedImage[] = [];
  
  Object.entries(MODEL_AMO_IMAGES).forEach(([modelKey, images]) => {
    const nameT = t(`homeModels.models.${modelKey}.name`);
    const keyStr = `homeModels.models.${modelKey}.name`;
    const modelName = nameT !== keyStr ? nameT : (isEn ? (MODEL_NAMES_EN[modelKey] ?? modelKey) : modelKey);
    images.forEach((image) => {
      furnishedImages.push({
        image,
        modelKey,
        modelName,
      });
    });
  });

  // Si no hay imágenes, no mostrar el slider
  if (furnishedImages.length === 0) {
    return null;
  }

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + furnishedImages.length) % furnishedImages.length);
    setIsAutoPlaying(false);
  }, [furnishedImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % furnishedImages.length);
    setIsAutoPlaying(false);
  }, [furnishedImages.length]);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || furnishedImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % furnishedImages.length);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, furnishedImages.length]);

  const currentImage = furnishedImages[currentIndex];

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 max-w-[1800px]">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>
            {isEn ? FURNISHED_EN.title : (t("models.furnishedHomes.title") !== "models.furnishedHomes.title" ? t("models.furnishedHomes.title") : "Casas Amobladas")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
            {isEn ? FURNISHED_EN.subtitle : (t("models.furnishedHomes.subtitle") !== "models.furnishedHomes.subtitle" ? t("models.furnishedHomes.subtitle") : "Ve cómo se ven nuestros modelos cuando están completamente amoblados")}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-xl border border-border/50">
            {currentImage && (
              <>
                <Image
                  src={currentImage.image}
                  alt={`${currentImage.modelName} - Furnished`}
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority={currentIndex === 0}
                  sizes="100vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Model Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-background/90 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-border/50 shadow-lg">
                      <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2" suppressHydrationWarning>
                        {isEn ? FURNISHED_EN.model : (t("models.furnishedHomes.model") !== "models.furnishedHomes.model" ? t("models.furnishedHomes.model") : "Modelo")}
                      </p>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {currentImage.modelName}
                      </h3>
                      <Link
                        href={`/models/${currentImage.modelKey}`}
                        className="inline-block mt-3"
                      >
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs sm:text-sm"
                          suppressHydrationWarning
                        >
                          {isEn ? FURNISHED_EN.viewModel : (t("models.furnishedHomes.viewModel") !== "models.furnishedHomes.viewModel" ? t("models.furnishedHomes.viewModel") : "Ver Modelo")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Arrows */}
            {furnishedImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110 border border-border/50 shadow-lg z-20"
                  aria-label={isEn ? FURNISHED_EN.previousImage : (t("homeModels.modelPage.previousImage") !== "homeModels.modelPage.previousImage" ? t("homeModels.modelPage.previousImage") : "Imagen anterior")}
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground" />
                </button>
                <button
                  onClick={handleNext}
                  onKeyDown={(e) => handleKeyDown(e, handleNext)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110 border border-border/50 shadow-lg z-20"
                  aria-label={isEn ? FURNISHED_EN.nextImage : (t("homeModels.modelPage.nextImage") !== "homeModels.modelPage.nextImage" ? t("homeModels.modelPage.nextImage") : "Siguiente imagen")}
                  type="button"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {furnishedImages.length > 1 && (
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-background/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50 shadow-lg z-20">
                <span className="text-foreground text-xs sm:text-sm font-medium">
                  {currentIndex + 1} / {furnishedImages.length}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {furnishedImages.length > 1 && (
            <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-center overflow-x-auto scrollbar-hide px-4 scroll-smooth pb-2">
              {furnishedImages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, () => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  })}
                  className={cn(
                    "relative w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                    index === currentIndex
                      ? "border-primary opacity-100 scale-105"
                      : "border-transparent opacity-60 hover:opacity-80"
                  )}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                  type="button"
                >
                  <Image
                    src={item.image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
