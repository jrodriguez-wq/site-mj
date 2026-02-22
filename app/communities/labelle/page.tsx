"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CommunityModelsSection } from "@/components/communities/community-models-section";
import { CommunityPageContent } from "@/components/communities/community-page-content";
import { CommunityMap } from "@/components/communities/community-map";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { AnimatedSection } from "@/components/ui/animated-section";
import { LogoSlider } from "@/components/ui/logo-slider";
import { PARTNER_LOGOS } from "@/config/partner-logos";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";

const labelleImages = [
  getCloudinaryImageUrl("/recursos/shutterstock-1065297917.webp"),
  getCloudinaryImageUrl("/recursos/shutterstock-1197062707.webp"),
  getCloudinaryImageUrl("/recursos/shutterstock-2252703911.webp"),
  getCloudinaryImageUrl("/recursos/shutterstock-440999080.webp"),
  getCloudinaryImageUrl("/recursos/rio.webp"),
  getCloudinaryImageUrl("/recursos/pai.webp"),
  getCloudinaryImageUrl("/recursos/familia-casa.webp"),
  getCloudinaryImageUrl("/recursos/orlandof.webp"),
];

export default function LaBellePage() {
  const labelleActivities = [
    {
      icon: "Fish",
      title: "Fishing",
      description: "Enjoy fishing on the Caloosahatchee River and nearby lakes. LaBelle is known for its peaceful waterways and great catches.",
      image: getCloudinaryImageUrl("/recursos/shutterstock-1197062707.webp"),
    },
    {
      icon: "TreePine",
      title: "Outdoor walks",
      description: "Explore nature trails and parks. LaBelle offers a quiet, rural setting perfect for walking and outdoor activities.",
      image: getCloudinaryImageUrl("/recursos/orlandof.webp"),
    },
    {
      icon: "Sailboat",
      title: "Boating",
      description: "Launch your boat and explore the Caloosahatchee River. Easy water access makes boating a popular pastime for residents.",
      image: getCloudinaryImageUrl("/recursos/rio.webp"),
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
            alt="LaBelle, Florida - Beautiful community"
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
              <motion.div 
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Badge */}
                <motion.div 
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="text-sm font-semibold text-white uppercase tracking-wider px-4 py-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-full border border-slate-700/50 shadow-xl" suppressHydrationWarning>
                    Southwest Florida
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  }}
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  LaBelle
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  Discover Your Dream Home in Southwest Florida
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
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
                      View Available Models
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator 
          onClick={() => {
            const modelsSection = document.getElementById("models-section");
            if (modelsSection) {
              modelsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />

        {/* Natural Fade Out - Smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />
      </section>

      <AnimatedSection delay={0.1}>
        <CommunityPageContent
          aboutTitle="About LaBelle"
          aboutDescription="LaBelle is a small, friendly community in Hendry County, Florida. Known for its rural charm, outdoor recreation, and affordable new construction homes, it's the perfect place for families who want space, nature, and a strong sense of community. M.J. Newell Homes offers several floor plans here, including Rent to Own options."
          activitiesTitle="Things to do in LaBelle"
          activities={labelleActivities}
          features={[
            { icon: "Square", label: "Acre+ lots available" },
            { icon: "Home", label: "No HOA" },
            { icon: "Car", label: "Family-friendly" },
          ]}
          futureTitle="Your future in LaBelle"
          futureDescription="Build your new home in LaBelle and enjoy a relaxed lifestyle with easy access to Fort Myers, Lehigh Acres, and the Gulf Coast. Our team will guide you from lot selection to keys."
          scheduleTitle="Schedule a visit"
          scheduleDescription="Come see our models and available lots in LaBelle. We're happy to show you around and answer your questions."
          scheduleButton="Schedule a visit"
          galleryTitle="LaBelle gallery"
          galleryDescription="See what life looks like in LaBelle and explore our new construction homes and community."
          galleryImages={labelleImages}
          ctaTitle="Ready to build in LaBelle?"
          ctaDescription="View our available floor plans and get in touch. We'll help you find the right home and the right path to ownership."
          ctaButton="View models"
        />
      </AnimatedSection>

      {/* Community Map Section */}
      <AnimatedSection delay={0.1}>
        <CommunityMap community="labelle" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div id="models-section" className="py-10 md:py-14 lg:py-18">
        <CommunityModelsSection
          modelKeys={labelleModels.map((m) => m.key)}
          title="Homes in LaBelle"
          subtitle="Browse our new construction floor plans available in LaBelle. Rent to Own and traditional purchase options."
          community="labelle"
        />
        </div>
      </AnimatedSection>

      {/* Partner Logos Slider */}
      <AnimatedSection delay={200}>
        <LogoSlider
          logos={PARTNER_LOGOS}
          speed="normal"
          pauseOnHover={true}
          showTitle={false}
          variant="default"
        />
      </AnimatedSection>
    </div>
  );
}
