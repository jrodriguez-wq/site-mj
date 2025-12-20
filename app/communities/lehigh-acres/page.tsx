"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const lehighAcresImages = [
  "/recursos/shutterstock-1197062707.webp",
  "/recursos/shutterstock-2252703911.webp",
  "/recursos/shutterstock-440999080.webp",
  "/recursos/shutterstock-1065297917.webp",
  "/recursos/playa.webp",
  "/recursos/familia-casa.webp",
];

export default function LehighAcresPage() {
  const { t } = useTranslation();

  const lehighAcresActivities = [
    {
      icon: "Droplets",
      title: t("communities.lehighAcres.activities.beaches.title"),
      description: t("communities.lehighAcres.activities.beaches.description"),
      image: "/recursos/playa.webp",
    },
    {
      icon: "Users",
      title: t("communities.lehighAcres.activities.entertainment.title"),
      description: t("communities.lehighAcres.activities.entertainment.description"),
      image: "/recursos/shutterstock-2252703911.webp",
    },
    {
      icon: "TreePine",
      title: t("communities.lehighAcres.activities.nature.title"),
      description: t("communities.lehighAcres.activities.nature.description"),
      image: "/recursos/familia-conduciendo.webp",
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
      {/* Hero Section with Image - Elegant Design */}
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={lehighAcresImages[0]}
            alt={t("communities.lehighAcres.hero.imageAlt") || `${t("communities.lehighAcres.name")}, Florida - Beautiful community`}
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
                    {t("communities.lehighAcres.hero.badge") || t("communities.lehighAcres.country.title")}
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
                  {t("communities.lehighAcres.country.subtitle") || "Lehigh Acres"}
                </h1>

                {/* Subtitle */}
                <p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  suppressHydrationWarning
                >
                  {t("communities.lehighAcres.hero.subtitle") || "Your Perfect Home Awaits in Southwest Florida"}
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
                      {t("communities.lehighAcres.hero.cta") || "View Available Models"}
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

      <div id="models-section" className="py-10 md:py-14 lg:py-18">
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
