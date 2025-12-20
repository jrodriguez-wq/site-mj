"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const labelleImages = [
  "/recursos/shutterstock-1065297917.webp",
  "/recursos/shutterstock-1197062707.webp",
  "/recursos/shutterstock-2252703911.webp",
  "/recursos/shutterstock-440999080.webp",
  "/recursos/rio.webp",
  "/recursos/pai.webp",
];

export default function LaBellePage() {
  const { t } = useTranslation();

  const labelleActivities = [
    {
      icon: "Fish",
      title: t("communities.labelle.activities.fishing.title"),
      description: t("communities.labelle.activities.fishing.description"),
      image: "/recursos/shutterstock-1197062707.webp",
    },
    {
      icon: "TreePine",
      title: t("communities.labelle.activities.outdoor walks.title"),
      description: t("communities.labelle.activities.outdoor walks.description"),
      image: "/recursos/orlandof.webp",
    },
    {
      icon: "Sailboat",
      title: t("communities.labelle.activities.boating.title"),
      description: t("communities.labelle.activities.boating.description"),
      image: "/recursos/rio.webp",
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
      {/* Hero Section with Image - Elegant Design */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={labelleImages[0]}
            alt={t("communities.labelle.hero.imageAlt") || `${t("communities.labelle.name")}, Florida - Beautiful community`}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Gradient Overlay - Lighter for more natural look */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl">
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
                {/* Badge */}
                <div className="inline-block">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/40" suppressHydrationWarning>
                    {t("communities.labelle.hero.badge") || t("communities.labelle.country.title")}
                  </span>
                </div>

                {/* Title */}
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  }}
                  suppressHydrationWarning
                >
                  {t("communities.labelle.name") || "LaBelle"}
                </h1>

                {/* Subtitle */}
                <p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  suppressHydrationWarning
                >
                  {t("communities.labelle.hero.subtitle") || "Discover Your Dream Home in Southwest Florida"}
                </p>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      const modelsSection = document.getElementById("models-section");
                      if (modelsSection) {
                        modelsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    size="lg"
                    className={cn(
                      "bg-primary hover:bg-primary/90 text-white",
                      "px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6",
                      "text-base sm:text-lg font-bold",
                      "shadow-2xl hover:shadow-primary/40",
                      "transition-all duration-300 ease-out",
                      "hover:scale-105 active:scale-100",
                      "relative overflow-hidden group",
                      "border-2 border-primary/50"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2" suppressHydrationWarning>
                      {t("communities.labelle.hero.cta") || "View Available Models"}
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Natural Fade Out - Smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
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

      <div id="models-section" className="py-10 md:py-14 lg:py-18">
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
