"use client";

import Image from "next/image";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";
import { useTranslation } from "@/hooks/use-translation";

const lehighAcresImages = [
  "/recursos/shutterstock_1197062707.jpg",
  "/recursos/shutterstock_2252703911.jpg",
  "/recursos/shutterstock_440999080.jpg",
  "/recursos/shutterstock_1065297917.jpg",
];

export default function LehighAcresPage() {
  const { t } = useTranslation();

  const lehighAcresActivities = [
    {
      icon: "Droplets",
      title: t("communities.lehighAcres.activities.beaches.title"),
      description: t("communities.lehighAcres.activities.beaches.description"),
      image: "/recursos/playa.jpg",
    },
    {
      icon: "Users",
      title: t("communities.lehighAcres.activities.entertainment.title"),
      description: t("communities.lehighAcres.activities.entertainment.description"),
      image: "/recursos/shutterstock_2252703911.jpg",
    },
    {
      icon: "TreePine",
      title: t("communities.lehighAcres.activities.nature.title"),
      description: t("communities.lehighAcres.activities.nature.description"),
      image: "/recursos/pai.jpg",
    },
  ];

  const lehighAcresModels = [
    { key: "langdon" },
    { key: "emelia" },
    { key: "delanie" },
    { key: "duplex" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image - Similar to Home */}
      <section className="relative w-full h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={lehighAcresImages[0]}
            alt={`${t("communities.lehighAcres.name")}, Florida - Beautiful community`}
            fill
            className="object-cover animate-subtle-zoom"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55 z-20" />
        </div>

        <div className="relative z-30 w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-5 md:px-6">
            <div className="max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 mx-auto">
              <div className="mb-4 sm:mb-5">
                <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold rounded-full border-2 border-white/60 shadow-2xl" suppressHydrationWarning>
                  {t("communities.lehighAcres.hero.badge") || t("communities.lehighAcres.country.title")}
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white px-2"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
                suppressHydrationWarning
              >
                {t("communities.lehighAcres.country.subtitle") || "Lehigh Acres"}
              </h1>
              <p
                className="mx-auto max-w-[700px] text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold px-4"
                style={{
                  textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)",
                }}
                suppressHydrationWarning
              >
                {t("communities.lehighAcres.hero.subtitle") || "Your Perfect Home Awaits in Southwest Florida"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CommunityPageContent
        aboutTitle={t("communities.lehighAcres.about.title")}
        aboutDescription={t("communities.lehighAcres.about.fullDescription")}
        activitiesTitle={t("communities.lehighAcres.activities.title")}
        activities={lehighAcresActivities}
        features={[
          { icon: "Square", label: t("communities.lehighAcres.features.spaciousLots") },
          { icon: "Home", label: t("communities.lehighAcres.features.greatSchools") },
          { icon: "Car", label: t("communities.lehighAcres.features.primeLocation") },
        ]}
        futureTitle={t("communities.lehighAcres.future.title")}
        futureDescription={t("communities.lehighAcres.future.description")}
        scheduleTitle={t("communities.lehighAcres.schedule.title")}
        scheduleDescription={t("communities.lehighAcres.schedule.description")}
        scheduleButton={t("communities.lehighAcres.schedule.button")}
        galleryTitle={t("communities.lehighAcres.gallery.title")}
        galleryDescription={t("communities.lehighAcres.gallery.description")}
        galleryImages={lehighAcresImages}
        ctaTitle={t("communities.lehighAcres.cta.title")}
        ctaDescription={t("communities.lehighAcres.cta.description")}
        ctaButton={t("communities.lehighAcres.cta.button")}
      />

      <div className="py-10 md:py-14 lg:py-18">
        <CommunityModelsSection
          modelKeys={lehighAcresModels.map((m) => m.key)}
          title={t("communities.lehighAcres.models.title")}
          subtitle={t("communities.lehighAcres.models.subtitle")}
          community="lehigh-acres"
        />
      </div>
    </div>
  );
}
