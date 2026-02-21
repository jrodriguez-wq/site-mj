"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { AnimatedCard } from "@/components/ui/animated-card";
import { motion } from "framer-motion";
import { GoogleReviewsLink } from "@/components/reviews/google-reviews-link";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";

export const Testimonials = () => {
  const { t, translations } = useTranslation();

  const testimonials = useMemo(() => [
    {
      name: t("testimonials.testimonials.1.name"),
      location: t("testimonials.testimonials.1.location"),
      text: t("testimonials.testimonials.1.text"),
      rating: 5,
      image: getCloudinaryImageUrl("/recursos/clientes/testimonio-6.webp"),
    },
    {
      name: t("testimonials.testimonials.2.name"),
      location: t("testimonials.testimonials.2.location"),
      text: t("testimonials.testimonials.2.text"),
      rating: 5,
      image: getCloudinaryImageUrl("/recursos/clientes/testimonio-5.webp"),
    },
    {
      name: t("testimonials.testimonials.3.name"),
      location: t("testimonials.testimonials.3.location"),
      text: t("testimonials.testimonials.3.text"),
      rating: 5,
      image: getCloudinaryImageUrl("/recursos/clientes/testimonio-4.webp"),
    },
    {
      name: t("testimonials.testimonials.4.name"),
      location: t("testimonials.testimonials.4.location"),
      text: t("testimonials.testimonials.4.text"),
      rating: 5,
      image: getCloudinaryImageUrl("/recursos/clientes/testimonio-3.webp"),
    },
    {
      name: t("testimonials.testimonials.5.name"),
      location: t("testimonials.testimonials.5.location"),
      text: t("testimonials.testimonials.5.text"),
      rating: 5,
      image: getCloudinaryImageUrl("/recursos/clientes/testimonio-2.webp"),
    },
    {
      name: t("testimonials.testimonials.6.name"),
      location: t("testimonials.testimonials.6.location"),
      text: t("testimonials.testimonials.6.text"),
      rating: 5,
      image: getCloudinaryImageUrl("/recursos/clientes/testimonio-1.webp"),
    },
  ], [t, translations]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,106,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,106,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <motion.div 
          className="text-center space-y-4 sm:space-y-5 md:space-y-6 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent px-2" suppressHydrationWarning>
              {t("testimonials.title")}
            </h2>
            <div className="h-1 sm:h-1.5 md:h-2 w-24 sm:w-28 md:w-32 bg-gradient-to-r from-primary via-primary/80 to-primary/40 mx-auto mt-3 sm:mt-4 md:mt-6 rounded-full shadow-lg shadow-primary/20" />
          </div>
          <p className="mx-auto max-w-[750px] text-muted-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide px-4" suppressHydrationWarning>
            {t("testimonials.subtitle")}
          </p>
          <div className="flex justify-center pt-2">
            <GoogleReviewsLink variant="outline" />
          </div>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={index} index={index}>
              <Card className="group relative overflow-hidden border-2 bg-card hover:shadow-2xl transition-all duration-200 p-0 flex flex-col h-full">
              {/* Image Section - Principal */}
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-muted/30 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name || `Testimonial ${index + 1}`} - ${testimonial.location || "Florida"}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  suppressHydrationWarning
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-0.5 sm:gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-lg border border-white/80 z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                
                {/* Gradient Overlay at bottom for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
              </div>

              {/* Content Section - Secundario */}
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 flex-1 flex flex-col">
                {/* Quote Icon and Text */}
                <div className="flex items-start gap-2 sm:gap-3 flex-1">
                  <div className="shrink-0 mt-1">
                    <Quote className="h-4 w-4 sm:h-5 sm:w-5 text-primary/40 group-hover:text-primary/60 transition-colors duration-150" />
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed italic flex-1" suppressHydrationWarning>
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Author Info */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="font-bold text-sm sm:text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-150" suppressHydrationWarning>
                    {testimonial.name}
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/60 shrink-0" />
                    <span suppressHydrationWarning>{testimonial.location}</span>
                  </div>
                </div>
              </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
