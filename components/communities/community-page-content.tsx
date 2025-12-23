"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
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
  image?: string; // Imagen opcional para la actividad
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
  galleryDescription?: string;
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
  galleryDescription,
  galleryImages,
  ctaTitle,
  ctaDescription,
  ctaButton,
}: CommunityPageContentProps) => {
  const { t } = useTranslation();
  return (
    <>
      {/* About Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden bg-muted/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 border border-border/50 shadow-lg">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 md:mb-8 text-foreground tracking-tight" suppressHydrationWarning>
                  {aboutTitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl" suppressHydrationWarning>
                  {aboutDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family-Friendly Activities */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-background tracking-tight" suppressHydrationWarning>
                {activitiesTitle}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {activities.map((activity, index) => {
              const Icon = iconMap[activity.icon];
              if (!Icon) return null;
              return (
                <Card 
                  key={index} 
                  className="border-2 border-background/20 bg-background/10 backdrop-blur-sm hover:border-primary/50 hover:bg-background/15 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-muted">
                    {activity.image ? (
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center">
                        <Icon className="w-16 h-16 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="p-3 bg-background/20 backdrop-blur-md rounded-xl border border-background/30">
                        <Icon className="w-6 h-6 text-background" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-6 p-6">
                    <h3 className="text-xl md:text-2xl font-black text-background mb-3" suppressHydrationWarning>
                      {activity.title}
                    </h3>
                    <p className="text-sm md:text-base text-background/80 leading-relaxed" suppressHydrationWarning>
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                if (!Icon) return null;
                return (
                  <Card key={index} className="border-2 border-primary/20 hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-center bg-gradient-to-br from-primary/5 via-background to-background">
                    <CardContent className="pt-8 pb-8 p-6">
                      <div className="flex flex-col items-center space-y-6">
                        <div className="p-5 bg-primary/10 rounded-2xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                        </div>
                        <div>
                          <p className="text-xl sm:text-2xl md:text-3xl font-black text-foreground" suppressHydrationWarning>
                            {feature.label}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Future of Florida Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-background tracking-tight leading-tight" suppressHydrationWarning>
              {futureTitle}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-background/80 max-w-4xl mx-auto leading-relaxed px-4" suppressHydrationWarning>
              {futureDescription}
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Schedule Your Visit Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
          <CardContent className="p-8 sm:p-10 md:p-12 lg:p-16">
            <div className="text-center space-y-6 md:space-y-8">
              <div className="flex justify-center">
                <div className="p-5 bg-primary/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight" suppressHydrationWarning>
                  {scheduleTitle}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                  {scheduleDescription}
                </p>
              </div>
              <div className="pt-4">
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 md:px-10 py-6 md:py-7 text-base md:text-lg font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 group hover:scale-105">
                  <Link href="/schedule-appointment">
                    {scheduleButton}
                    <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery - Interactive */}
      <InteractiveGallery 
        galleryTitle={galleryTitle}
        galleryDescription={galleryDescription}
        galleryImages={galleryImages}
      />

      {/* CTA Section */}
      <section className="py-10 md:py-14 lg:py-18 bg-background">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
          <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
            <CardContent className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-foreground tracking-tight" suppressHydrationWarning>
                {ctaTitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                {ctaDescription}
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 sm:px-10 md:px-12 py-6 md:py-7 lg:py-8 text-base sm:text-lg md:text-xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                <Link href="/rent-to-own">
                  {ctaButton}
                </Link>
              </Button>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Componente de galería interactiva
const InteractiveGallery = ({
  galleryTitle,
  galleryDescription,
  galleryImages,
}: {
  galleryTitle: string;
  galleryDescription?: string;
  galleryImages: string[];
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openGallery = (index: number) => {
    setSelectedImage(index);
  };

  const closeGallery = () => {
    setSelectedImage(null);
  };

  const changeImage = (direction: number) => {
    if (selectedImage === null) return;
    const newIndex = selectedImage + direction;
    if (newIndex < 0) {
      setSelectedImage(galleryImages.length - 1);
    } else if (newIndex >= galleryImages.length) {
      setSelectedImage(0);
    } else {
      setSelectedImage(newIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
  };

  return (
    <>
      <section className="py-10 md:py-14 lg:py-18 bg-foreground text-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10 lg:space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-background tracking-tight" suppressHydrationWarning>
                {galleryTitle}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
              {galleryDescription && (
                <p className="text-base md:text-lg text-background/80 max-w-2xl mx-auto" suppressHydrationWarning>
                  {galleryDescription}
                </p>
              )}
            </div>
            
            {/* Grid interactivo de imágenes más pequeñas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openGallery(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openGallery(index);
                    }
                  }}
                  className={cn(
                    "relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden",
                    "group cursor-pointer transition-all duration-300",
                    "border-2 border-background/20 hover:border-primary/60",
                    "shadow-lg hover:shadow-2xl hover:shadow-primary/20",
                    "hover:scale-105 active:scale-100",
                    hoveredIndex === index && "ring-2 ring-primary/50 ring-offset-2 ring-offset-foreground"
                  )}
                  aria-label={`View image ${index + 1} of ${galleryImages.length}`}
                  type="button"
                >
                  <Image
                    src={image}
                    alt={`${galleryTitle} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={85}
                  />
                  
                  {/* Overlay con efecto hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icono de expandir */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 bg-background/90 backdrop-blur-sm rounded-full border-2 border-primary/50 shadow-xl">
                      <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Número de imagen */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-lg text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de galería */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
          onClick={closeGallery}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="bg-card rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-border relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-muted h-[90vh]">
              <Image
                src={galleryImages[selectedImage]}
                alt={`${galleryTitle} - ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 80vw"
                quality={95}
                priority
              />

              {/* Controles de navegación */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => changeImage(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg hover:scale-110"
                    aria-label="Previous image"
                    type="button"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={() => changeImage(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg hover:scale-110"
                    aria-label="Next image"
                    type="button"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                </>
              )}

              {/* Strip de miniaturas */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center z-10 overflow-x-auto pb-2">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                        index === selectedImage
                          ? "border-primary scale-105 shadow-lg"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                      aria-label={`View image ${index + 1}`}
                      type="button"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Contador de imágenes */}
              {galleryImages.length > 1 && (
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border shadow-lg">
                  <span className="text-foreground text-sm font-medium">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                </div>
              )}

              {/* Botón de cerrar */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg hover:scale-110"
                aria-label="Close gallery"
                type="button"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

