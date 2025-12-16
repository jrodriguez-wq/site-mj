"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Home } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

// Configuración estática de comunidades (fuera del componente para evitar problemas de hidratación)
const COMMUNITIES_CONFIG = [
  {
    nameKey: "labelle",
    alt: "LaBelle community",
    href: "/communities/labelle",
    image: "/recursos/shutterstock_1065297917.jpg",
    featureKeys: [
      "communities.labelle.features.acreLots",
      "communities.labelle.features.noHOA",
      "communities.labelle.features.familyFriendly",
    ],
  },
  {
    nameKey: "lehighAcres",
    alt: "Lehigh Acres community",
    href: "/communities/lehigh-acres",
    image: "/recursos/shutterstock_1197062707.jpg",
    featureKeys: [
      "communities.lehighAcres.features.spaciousLots",
      "communities.lehighAcres.features.greatSchools",
      "communities.lehighAcres.features.primeLocation",
    ],
  },
] as const;

export const CommunitiesShowcase = () => {
  const { t } = useTranslation();

  const communities = COMMUNITIES_CONFIG.map((config) => ({
    ...config,
    name: t(`communities.${config.nameKey}.name`),
    description: t(`communities.${config.nameKey}.description`),
    features: config.featureKeys.map((key) => t(key)),
    exploreText: t(`communities.${config.nameKey}.explore`),
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter px-2" suppressHydrationWarning>
            {t("communities.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl px-4" suppressHydrationWarning>
            {t("communities.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {communities.map((community) => (
            <Card
              key={community.nameKey}
              className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 p-0"
            >
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                <Image
                  key={community.image}
                  src={community.image}
                  alt={community.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={community.nameKey === "labelle"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-2 sm:gap-3 text-white mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black drop-shadow-lg" suppressHydrationWarning>
                      {community.name}
                    </h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6 md:p-8">
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed" suppressHydrationWarning>
                  {community.description}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {community.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 border border-primary/20"
                    >
                      <Home className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                      <span suppressHydrationWarning>{feature}</span>
                    </span>
                  ))}
                </div>
                <Button asChild size="lg" className="w-full sm:w-auto group/btn text-sm sm:text-base">
                  <Link href={community.href} className="flex items-center gap-2">
                    <span suppressHydrationWarning>{community.exploreText}</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

