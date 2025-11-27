"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Home } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const CommunitiesShowcase = () => {
  const { t } = useTranslation();

  const communities = [
    {
      name: t("communities.labelle.name"),
      nameKey: "labelle",
      alt: "LaBelle community", // Alt estático para consistencia SSR
      href: "/communities/labelle",
      description: t("communities.labelle.description"),
      features: [
        t("communities.labelle.features.acreLots"),
        t("communities.labelle.features.noHOA"),
        t("communities.labelle.features.familyFriendly"),
      ],
      image: "/img/4.jpg",
      exploreText: t("communities.labelle.explore"),
    },
    {
      name: t("communities.lehighAcres.name"),
      nameKey: "lehighAcres",
      alt: "Lehigh Acres community", // Alt estático para consistencia SSR
      href: "/communities/lehigh-acres",
      description: t("communities.lehighAcres.description"),
      features: [
        t("communities.lehighAcres.features.spaciousLots"),
        t("communities.lehighAcres.features.greatSchools"),
        t("communities.lehighAcres.features.primeLocation"),
      ],
      image: "/img/1.jpg",
      exploreText: t("communities.lehighAcres.explore"),
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" suppressHydrationWarning>
            {t("communities.title")}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl" suppressHydrationWarning>
            {t("communities.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {communities.map((community) => (
            <Card
              key={community.name}
              className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2"
            >
              <div className="relative h-72 md:h-96 overflow-hidden">
                <Image
                  src={community.image}
                  alt={community.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 text-white mb-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black drop-shadow-lg" suppressHydrationWarning>
                      {community.name}
                    </h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 md:p-8">
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed" suppressHydrationWarning>
                  {community.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {community.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold rounded-full transition-colors duration-300 border border-primary/20"
                    >
                      <Home className="h-4 w-4" />
                      <span suppressHydrationWarning>{feature}</span>
                    </span>
                  ))}
                </div>
                <Button asChild size="lg" className="w-full md:w-auto group/btn">
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

