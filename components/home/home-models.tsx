"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Bath, Square } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { YouTubeVideo } from "@/components/ui/youtube-video";

export const HomeModels = () => {
  const { t } = useTranslation();
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const models = [
    {
      key: "louisiana",
      nameKey: "homeModels.models.louisiana.name",
      descriptionKey: "homeModels.models.louisiana.description",
      beds: "3-4",
      baths: "2-3",
      sqft: "1,500-2,000",
      youtubeUrl: "https://www.youtube.com/watch?v=ekTwRFHRRs4",
    },
    {
      key: "viana",
      nameKey: "homeModels.models.viana.name",
      descriptionKey: "homeModels.models.viana.description",
      beds: "3-4",
      baths: "2-3",
      sqft: "1,600-2,100",
      youtubeUrl: "https://www.youtube.com/watch?v=sy13SHdR3Sk",
    },
    {
      key: "delanie",
      nameKey: "homeModels.models.delanie.name",
      descriptionKey: "homeModels.models.delanie.description",
      beds: "4",
      baths: "3",
      sqft: "2,000-2,400",
      youtubeUrl: "https://www.youtube.com/watch?v=IXASzq9SzKM",
    },
    {
      key: "aurora",
      nameKey: "homeModels.models.aurora.name",
      descriptionKey: "homeModels.models.aurora.description",
      beds: "4-5",
      baths: "3-4",
      sqft: "2,200-2,600",
      youtubeUrl: "https://www.youtube.com/watch?v=Qs4IX3NlGnw",
    },
    {
      key: "langdon",
      nameKey: "homeModels.models.langdon.name",
      descriptionKey: "homeModels.models.langdon.description",
      beds: "4-5",
      baths: "3-4",
      sqft: "2,400-2,800",
      youtubeUrl: "https://www.youtube.com/watch?v=OqARAq2u0Cs",
    },
    {
      key: "emelia",
      nameKey: "homeModels.models.emelia.name",
      descriptionKey: "homeModels.models.emelia.description",
      beds: "5",
      baths: "4",
      sqft: "2,600-3,000",
      youtubeUrl: "https://www.youtube.com/watch?v=z78SX7zUqIc",
    },
  ];

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
              {t("homeModels.title")}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
              {t("homeModels.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {models.map((model) => {
              const isPlaying = playingVideos.has(model.key);
              const isHovered = hoveredCard === model.key;
              const isExpanded = isPlaying || isHovered;
              
              return (
              <Card
                key={model.nameKey}
                className={`group relative overflow-hidden border-2 transition-all duration-700 ease-out ${
                  isExpanded 
                    ? "scale-[1.02] lg:scale-[1.03] shadow-lg border-primary/40 z-10" 
                    : "hover:shadow-md hover:-translate-y-1 hover:border-primary/20"
                } bg-linear-to-br from-card to-card/50`}
                onMouseEnter={() => setHoveredCard(model.key)}
                onMouseLeave={() => !isPlaying && setHoveredCard(null)}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/3 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                
                {/* YouTube Video */}
                {model.youtubeUrl && (
                  <div className="relative w-full mb-6 overflow-hidden px-4 md:px-6">
                    <YouTubeVideo
                      url={model.youtubeUrl}
                      title={t(model.nameKey)}
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
                
                <CardHeader className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <CardTitle className="text-2xl md:text-3xl group-hover:text-primary/80 transition-colors duration-500 ease-out" suppressHydrationWarning>
                      {t(model.nameKey)}
                    </CardTitle>
                    <div className="text-sm font-black text-primary/20 group-hover:text-primary/30 transition-colors duration-500 ease-out" suppressHydrationWarning>
                      {t("homeModels.model")}
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed" suppressHydrationWarning>
                    {t(model.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl border border-border group-hover:bg-muted/60 transition-colors duration-500 ease-out">
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors duration-500 ease-out">
                          <Bed className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.beds")}</div>
                      <div className="font-bold text-lg">{model.beds}</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors duration-500 ease-out">
                          <Bath className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.baths")}</div>
                      <div className="font-bold text-lg">{model.baths}</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors duration-500 ease-out">
                          <Square className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium" suppressHydrationWarning>{t("homeModels.sqft")}</div>
                      <div className="font-bold text-lg">{model.sqft}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group/btn"
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
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
