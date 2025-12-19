"use client";

import Image from "next/image";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";
import { useTranslation } from "@/hooks/use-translation";

const labelleImages = [
  "/recursos/shutterstock_1065297917.jpg",
  "/recursos/shutterstock_1197062707.jpg",
  "/recursos/shutterstock_2252703911.jpg",
  "/recursos/shutterstock_440999080.jpg",
];

export default function LaBellePage() {
  const { t } = useTranslation();

  const labelleActivities = [
    {
      icon: "Fish",
      title: t("communities.labelle.activities.fishing.title"),
      description: t("communities.labelle.activities.fishing.description"),
      image: "/recursos/shutterstock_1197062707.jpg",
    },
    {
      icon: "TreePine",
      title: t("communities.labelle.activities.outdoor walks.title"),
      description: t("communities.labelle.activities.outdoor walks.description"),
      image: "/recursos/pai.jpg",
    },
    {
      icon: "Sailboat",
      title: t("communities.labelle.activities.boating.title"),
      description: t("communities.labelle.activities.boating.description"),
      image: "/recursos/rio.jpg",
    },
  ];

  const labelleModels = [
    { key: "louisiana" },
    { key: "viana" },
    { key: "delanie" },
    { key: "aurora" },
    { key: "langdon" },
    { key: "emelia" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image - Similar to Home */}
      <section className="relative w-full h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={labelleImages[0]}
            alt={`${t("communities.labelle.name")}, Florida - Beautiful community`}
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
                  {t("communities.labelle.hero.badge") || t("communities.labelle.country.title")}
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
                {t("communities.labelle.name") || "LaBelle"}
              </h1>
              <p
                className="mx-auto max-w-[700px] text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold px-4"
                style={{
                  textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)",
                }}
                suppressHydrationWarning
              >
                {t("communities.labelle.hero.subtitle") || "Discover Your Dream Home in Southwest Florida"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CommunityPageContent
        aboutTitle={t("communities.labelle.about.title")}
        aboutDescription={t("communities.labelle.about.fullDescription")}
        activitiesTitle={t("communities.labelle.activities.title")}
        activities={labelleActivities}
        features={[
          { icon: "Square", label: t("communities.labelle.features.acreLots") },
          { icon: "Home", label: t("communities.labelle.features.noHOA") },
          { icon: "Car", label: t("communities.labelle.features.familyFriendly") },
        ]}
        futureTitle={t("communities.labelle.future.title")}
        futureDescription={t("communities.labelle.future.description")}
        scheduleTitle={t("communities.labelle.schedule.title")}
        scheduleDescription={t("communities.labelle.schedule.description")}
        scheduleButton={t("communities.labelle.schedule.button")}
        galleryTitle={t("communities.labelle.gallery.title")}
        galleryDescription={t("communities.labelle.gallery.description")}
        galleryImages={labelleImages}
        ctaTitle={t("communities.labelle.cta.title")}
        ctaDescription={t("communities.labelle.cta.description")}
        ctaButton={t("communities.labelle.cta.button")}
      />

      <div className="py-10 md:py-14 lg:py-18">
        <CommunityModelsSection
          modelKeys={labelleModels.map((m) => m.key)}
          title={t("communities.labelle.models.title")}
          subtitle={t("communities.labelle.models.subtitle")}
          community="labelle"
        />
      </div>
    </div>
  );
}
