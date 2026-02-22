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

const lehighAcresImages = [
  getCloudinaryImageUrl("/recursos/shutterstock-1197062707.webp"),
  getCloudinaryImageUrl("/recursos/shutterstock-2252703911.webp"),
  getCloudinaryImageUrl("/recursos/shutterstock-440999080.webp"),
  getCloudinaryImageUrl("/recursos/shutterstock-1065297917.webp"),
  getCloudinaryImageUrl("/recursos/playa.webp"),
  getCloudinaryImageUrl("/recursos/familia-casa.webp"),
  getCloudinaryImageUrl("/recursos/rto/familia-cocina.webp"),
  getCloudinaryImageUrl("/recursos/familia-conduciendo.webp"),
];

export default function LehighAcresPage() {
  const lehighAcresActivities = [
    {
      icon: "Droplets",
      title: "Beaches",
      description: "Lehigh Acres is within driving distance of Fort Myers Beach, Sanibel, and other Gulf Coast beaches. Perfect for weekend getaways.",
      image: getCloudinaryImageUrl("/recursos/playa.webp"),
    },
    {
      icon: "Users",
      title: "Entertainment",
      description: "Restaurants, shopping, and entertainment are nearby in Fort Myers. You get a quiet home base with city amenities close by.",
      image: getCloudinaryImageUrl("/recursos/shutterstock-2252703911.webp"),
    },
    {
      icon: "TreePine",
      title: "Nature",
      description: "Parks, trails, and outdoor spaces make Lehigh Acres great for families who love the outdoors without leaving the area.",
      image: getCloudinaryImageUrl("/recursos/familia-conduciendo.webp"),
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
      <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={lehighAcresImages[0]}
            alt="Lehigh Acres, Florida - Beautiful community"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl">
              <motion.div 
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="text-sm font-semibold text-white uppercase tracking-wider px-4 py-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-full border border-slate-700/50 shadow-xl">
                    Southwest Florida
                  </span>
                </motion.div>

                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  Lehigh Acres
                </motion.h1>

                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  Your Perfect Home Awaits in Southwest Florida
                </motion.p>

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
                    <span className="relative z-10 flex items-center gap-2">
                      View Available Models
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <ScrollIndicator 
          onClick={() => {
            const modelsSection = document.getElementById("models-section");
            if (modelsSection) {
              modelsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />
      </section>

      <AnimatedSection delay={0.1}>
        <CommunityPageContent
          aboutTitle="About Lehigh Acres"
          aboutDescription="Lehigh Acres is one of the largest communities in Lee County, Florida. It offers affordable new construction homes, good schools, and a convenient location near Fort Myers. M.J. Newell Homes builds here with several floor plans and Rent to Own options, so you can find a home that fits your family and your budget."
          activitiesTitle="Things to do near Lehigh Acres"
          activities={lehighAcresActivities}
          features={[
            { icon: "Square", label: "Spacious lots" },
            { icon: "Home", label: "Great schools" },
            { icon: "Car", label: "Prime location near Fort Myers" },
          ]}
          futureTitle="Your future in Lehigh Acres"
          futureDescription="Join thousands of families who have chosen Lehigh Acres for their new home. We&apos;ll help you pick a floor plan, a lot, and a path to ownership that works for you."
          scheduleTitle="Schedule a visit"
          scheduleDescription="Tour our models and see available homes in Lehigh Acres. We&apos;re here to answer your questions and help you get started."
          scheduleButton="Schedule a visit"
          galleryTitle="Lehigh Acres gallery"
          galleryDescription="Explore our new construction homes and community life in Lehigh Acres."
          galleryImages={lehighAcresImages}
          ctaTitle="Ready to build in Lehigh Acres?"
          ctaDescription="View our floor plans and get in touch. We&apos;ll help you find the right home and the right path to ownership."
          ctaButton="View models"
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <CommunityMap community="lehighAcres" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div id="models-section" className="py-10 md:py-14 lg:py-18">
        <CommunityModelsSection
          modelKeys={lehighAcresModels.map((m) => m.key)}
          title="Homes in Lehigh Acres"
          subtitle="Browse our new construction floor plans available in Lehigh Acres. Rent to Own and traditional purchase options."
          community="lehigh-acres"
        />
        </div>
      </AnimatedSection>

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
