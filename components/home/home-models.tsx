"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, Car } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { YouTubeVideo } from "@/components/ui/youtube-video";
import { getModelMainImage } from "@/lib/models/model-images";
import louisianaData from "@/data/models/louisiana.json";
import vianaData from "@/data/models/viana.json";
import delanieData from "@/data/models/delanie.json";
import auroraData from "@/data/models/aurora.json";
import langdonData from "@/data/models/langdon.json";
import emeliaData from "@/data/models/emelia.json";
import duplexData from "@/data/models/duplex.json";
import { cn } from "@/lib/utils";

const modelsData = [
  louisianaData,
  vianaData,
  delanieData,
  auroraData,
  langdonData,
  emeliaData,
  duplexData,
];

export const HomeModels = () => {
  const { t } = useTranslation();
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
            {t("homeModels.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            {t("homeModels.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modelsData.map((model, index) => {
            const mainImage = getModelMainImage(model.key);
            
            return (
              <div
                key={model.key}
                className={cn(
                  "group relative overflow-hidden border-2 rounded-xl bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col animate-fade-in-up will-change-transform"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Section - Principal */}
                <div className="relative h-56 sm:h-64 md:h-72 bg-muted/30 overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={model.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={model.key === "louisiana"}
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border border-white/80 z-10">
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">Starting at</div>
                    <div className="text-base sm:text-lg font-bold text-primary">{model.price}</div>
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 flex-1 flex flex-col">
                  {/* Title and Description */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                      {model.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3" suppressHydrationWarning>
                      {model.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
                        <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.beds")}</div>
                        <div className="font-bold text-sm sm:text-base">{model.bedrooms}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
                        <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.baths")}</div>
                        <div className="font-bold text-sm sm:text-base">{model.bathrooms}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
                        <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.sqft")}</div>
                        <div className="font-bold text-xs sm:text-base">{model.sqft} sq ft</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
                        <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">Garage</div>
                        <div className="font-bold text-xs sm:text-sm">{model.garage}</div>
                      </div>
                    </div>
                  </div>

                  {/* YouTube Video (if available) */}
                  {model.youtubeUrl && (
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <YouTubeVideo
                        url={model.youtubeUrl}
                        title={model.name}
                        className="w-full"
                        onPlayingChange={(playing) => {
                          if (playing) {
                            setPlayingVideos((prev) => new Set(prev).add(model.key));
                          } else {
                            setPlayingVideos((prev) => {
                              const next = new Set(prev);
                              next.delete(model.key);
                              return next;
                            });
                          }
                        }}
                      />
                    </div>
                  )}

                  {/* View Details Button */}
                  <Button
                    variant="default"
                    className="w-full group/btn mt-auto text-sm sm:text-base"
                    size="lg"
                    asChild
                  >
                    <Link href={`/models/${model.key}`}>
                      <span className="flex items-center justify-center gap-2" suppressHydrationWarning>
                        {t("homeModels.viewDetails")}
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
