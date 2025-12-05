"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("testimonials.testimonials.1.name"),
      location: t("testimonials.testimonials.1.location"),
      text: t("testimonials.testimonials.1.text"),
      rating: 5,
      image: "/img/testimonios/t1.webp",
    },
    {
      name: t("testimonials.testimonials.2.name"),
      location: t("testimonials.testimonials.2.location"),
      text: t("testimonials.testimonials.2.text"),
      rating: 5,
      image: "/img/testimonios/t2.jpg",
    },
    {
      name: t("testimonials.testimonials.3.name"),
      location: t("testimonials.testimonials.3.location"),
      text: t("testimonials.testimonials.3.text"),
      rating: 5,
      image: "/img/testimonios/t3.jpg",
    },
    {
      name: t("testimonials.testimonials.4.name"),
      location: t("testimonials.testimonials.4.location"),
      text: t("testimonials.testimonials.4.text"),
      rating: 5,
      image: "/img/testimonios/t4.jpg",
    },
    {
      name: t("testimonials.testimonials.5.name"),
      location: t("testimonials.testimonials.5.location"),
      text: t("testimonials.testimonials.5.text"),
      rating: 5,
      image: "/img/testimonios/t5.jpg",
    },
    {
      name: t("testimonials.testimonials.6.name"),
      location: t("testimonials.testimonials.6.location"),
      text: t("testimonials.testimonials.6.text"),
      rating: 5,
      image: "/img/testimonios/t6.jpg",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,106,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,106,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-6 mb-24">
          <div className="inline-block">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent" suppressHydrationWarning>
              {t("testimonials.title")}
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-primary via-primary/80 to-primary/40 mx-auto mt-6 rounded-full shadow-lg shadow-primary/20" />
          </div>
          <p className="mx-auto max-w-[750px] text-muted-foreground/80 text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide" suppressHydrationWarning>
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-0 flex flex-col"
            >
              {/* Image Section - Principal */}
              <div className="relative h-80 md:h-96 bg-muted/30 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.location}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-white/80 z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                
                {/* Gradient Overlay at bottom for smooth transition */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
              </div>

              {/* Content Section - Secundario */}
              <CardContent className="p-6 md:p-8 space-y-5 flex-1 flex flex-col">
                {/* Quote Icon and Text */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="shrink-0 mt-1">
                    <Quote className="h-5 w-5 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base italic flex-1" suppressHydrationWarning>
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Author Info */}
                <div className="space-y-1.5">
                  <div className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                    {testimonial.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                    <span suppressHydrationWarning>{testimonial.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
