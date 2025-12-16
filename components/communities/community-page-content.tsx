"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { 
  Fish, TreePine, Sailboat, Droplets, Users, 
  Home, Square, Car 
} from "lucide-react";

// Mapa de iconos por nombre
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Fish,
  TreePine,
  Sailboat,
  Waves: Droplets, // Waves no existe en lucide-react, usamos Droplets como alternativa
  Droplets,
  Users,
  Home,
  Square,
  Car,
};

interface Activity {
  icon: string; // Nombre del icono como string
  title: string;
  description: string;
}

interface Feature {
  icon: string; // Nombre del icono como string
  label: string;
}

interface CommunityPageContentProps {
  aboutTitle: string;
  aboutDescription: string;
  activitiesTitle: string;
  activities: Activity[];
  features: Feature[];
  futureTitle: string;
  futureDescription: string;
  scheduleTitle: string;
  scheduleDescription: string;
  scheduleButton: string;
  galleryTitle: string;
  galleryImages: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
}

export const CommunityPageContent = ({
  aboutTitle,
  aboutDescription,
  activitiesTitle,
  activities,
  features,
  futureTitle,
  futureDescription,
  scheduleTitle,
  scheduleDescription,
  scheduleButton,
  galleryTitle,
  galleryImages,
  ctaTitle,
  ctaDescription,
  ctaButton,
}: CommunityPageContentProps) => {
  return (
    <>
      {/* About Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="relative overflow-hidden bg-muted/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 border border-border/50 shadow-lg">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-foreground" suppressHydrationWarning>
              {aboutTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl" suppressHydrationWarning>
              {aboutDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Family-Friendly Activities */}
      <section className="pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2" suppressHydrationWarning>
            {activitiesTitle}
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            if (!Icon) return null;
            return (
              <div key={index} className="text-center group">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="p-4 sm:p-5 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground" suppressHydrationWarning>
                      {activity.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2" suppressHydrationWarning>
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            if (!Icon) return null;
            return (
              <div key={index} className="text-center group">
                <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="p-4 sm:p-5 md:p-6 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 shadow-md">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground px-2" suppressHydrationWarning>
                      {feature.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Future of Florida Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl sm:rounded-3xl border border-primary/20 shadow-xl">
          <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground px-2" suppressHydrationWarning>
              {futureTitle}
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-full mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium px-4" suppressHydrationWarning>
              {futureDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Your Visit Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="bg-primary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 border border-primary/10 shadow-lg">
          <div className="text-center space-y-5 sm:space-y-6 md:space-y-8">
            <div className="flex justify-center">
              <div className="p-4 sm:p-5 bg-primary/10 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground px-2" suppressHydrationWarning>
                {scheduleTitle}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
                {scheduleDescription}
              </p>
            </div>
            <div className="pt-4 sm:pt-6">
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group hover:scale-105">
                <Link href="/contact">
                  {scheduleButton}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4 md:space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground px-2" suppressHydrationWarning>
              {galleryTitle}
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-full mx-auto"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Explore the beauty and charm of our community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${galleryTitle} - ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/15 via-primary/8 to-background border-2 border-primary/30 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardContent className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-foreground px-2" suppressHydrationWarning>
                {ctaTitle}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
                {ctaDescription}
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 lg:py-8 text-base sm:text-lg md:text-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                <Link href="/rent-to-own">
                  {ctaButton}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

