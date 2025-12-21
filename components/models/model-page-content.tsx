"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Bed, Bath, Square, Car, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { YouTubeVideo } from "@/components/ui/youtube-video";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { PageContent } from "@/components/layout/page-container";
import { ModelData } from "@/types/model";
import { cn } from "@/lib/utils";
import { SEO_CONFIG } from "@/config/seo";
import { useTranslation } from "@/hooks/use-translation";
import { MODEL_FLOORPLANS } from "@/lib/models/model-images";
import { AnimatedSection } from "@/components/ui/animated-section";

interface ModelPageContentProps {
  modelData: ModelData & { images: string[] };
}

export const ModelPageContent = ({ modelData }: ModelPageContentProps) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("inside");
  const [isFloorplanExpanded, setIsFloorplanExpanded] = useState(false);

  const { name, sqft, bedrooms, bathrooms, garage, price, rtoPrice, description, youtubeUrl, images, sections } = modelData;
  
  // Get translated model name if available
  const modelName = t(`homeModels.models.${modelData.key}.name`) || name;
  // Use full description from translations if available, otherwise use JSON description
  const modelDescription = t(`homeModels.models.${modelData.key}.fullDescription`) || description;

  const redirectUrl = useMemo(() => {
    // Usar el siteUrl del config para evitar problemas de hidratación
    return `${SEO_CONFIG.siteUrl}/thank-you?type=model&model=${modelData.key}`;
  }, [modelData.key]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const openGallery = (index: number) => {
    setGalleryImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const changeGalleryImage = (direction: number) => {
    setGalleryImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  // Separar imágenes en categorías (si hay más de 10, asumimos que hay inside y exterior)
  const insideImages = images.length > 0 ? images.slice(0, Math.ceil(images.length / 2)) : [];
  const exteriorImages = images.length > 0 ? images.slice(Math.ceil(images.length / 2)) : [];

  return (
    <>
    <PageContent size="xl">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {/* Hero Section */}
          <AnimatedSection delay={0}>
            <div className="relative">
              <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex]}
                  alt={`${name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                {/* Subtle gradient overlay - minimal to show image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      onKeyDown={(e) => handleKeyDown(e, handlePreviousImage)}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110 border border-border/50 shadow-lg z-20"
                      aria-label={t("homeModels.modelPage.previousImage")}
                      type="button"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      onKeyDown={(e) => handleKeyDown(e, handleNextImage)}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-background transition-all hover:scale-110 border border-border/50 shadow-lg z-20"
                      aria-label={t("homeModels.modelPage.nextImage")}
                      type="button"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground" />
                    </button>
                  </>
                )}

                {/* Image Counter - Moved to top left to avoid overlap */}
                {images.length > 1 && (
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-background/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50 shadow-lg z-20">
                    <span className="text-foreground text-xs sm:text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}

                {/* View Gallery Button - Moved to top right */}
                {images.length > 1 && (
                  <button
                    onClick={() => openGallery(currentImageIndex)}
                    onKeyDown={(e) => handleKeyDown(e, () => openGallery(currentImageIndex))}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-background/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 hover:bg-background transition-all hover:scale-105 border border-border/50 shadow-lg z-20"
                    aria-label={t("homeModels.modelPage.viewGallery")}
                    type="button"
                  >
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                    <span className="text-foreground text-xs sm:text-sm font-medium hidden sm:inline" suppressHydrationWarning>{t("homeModels.modelPage.viewGallery")}</span>
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-base sm:text-lg" suppressHydrationWarning>{t("homeModels.modelPage.noImagesAvailable")}</p>
              </div>
            )}

            {/* Elegant Model Title Overlay - Subtle and modern */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <div className="relative">
                {/* Very subtle gradient background for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent h-32 sm:h-40 md:h-48" />
                
                {/* Title Container - Elegant and subtle */}
                <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
                  <div className="max-w-5xl mx-auto text-center">
                    <h1 
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-white/95"
                      style={{
                        textShadow: "0 2px 8px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
                      }}
                      suppressHydrationWarning
                    >
                      {modelName}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
          </AnimatedSection>

        {/* Model Information Section */}
        <AnimatedSection delay={0.1}>
          <section className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Price Card - Featured */}
            <Card className="lg:col-span-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="p-5 sm:p-6">
                <CardDescription className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2" suppressHydrationWarning>
                  {t("homeModels.modelPage.startingPrice")}
                </CardDescription>
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {price}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0 space-y-4">
                {/* RTO Price Section */}
                {rtoPrice && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2" suppressHydrationWarning>
                      {t("rentToOwn.hero.title")} {t("homeModels.modelPage.startingPrice")}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {rtoPrice}
                    </p>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed" suppressHydrationWarning>
                  {t("homeModels.modelPage.contactForFinancing")}
                </p>
              </CardContent>
            </Card>

            {/* Features Grid - Optimized and Centered */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <Card className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 w-full">
                    <div className="p-3 sm:p-3.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                      <Square className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight mb-1">{sqft}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide" suppressHydrationWarning>
                        {t("homeModels.modelPage.sqft")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 w-full">
                    <div className="p-3 sm:p-3.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                      <Bed className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight mb-1">{bedrooms}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide" suppressHydrationWarning>
                        {t("homeModels.modelPage.bedrooms")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 w-full">
                    <div className="p-3 sm:p-3.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                      <Bath className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight mb-1">{bathrooms}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide" suppressHydrationWarning>
                        {t("homeModels.modelPage.bathrooms")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 w-full">
                    <div className="p-3 sm:p-3.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                      <Car className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-lg sm:text-xl md:text-2xl font-black text-foreground leading-tight mb-1">{garage}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide" suppressHydrationWarning>
                        {t("homeModels.garage")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </section>
        </AnimatedSection>

        {/* Description Section */}
        <AnimatedSection delay={0.15}>
          <section className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" suppressHydrationWarning>{t("homeModels.modelPage.aboutThisModel")}</h2>
              <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            </div>
            <Card className="border-2">
              <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>{modelDescription}</p>
              </CardContent>
            </Card>
          </div>
          </section>
        </AnimatedSection>

        {/* Tabs Section */}
        <AnimatedSection delay={0.15}>
          <section className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-6 sm:mb-8 md:mb-12">
              <TabsList className="inline-flex h-auto p-1 sm:p-1.5 bg-muted/50 rounded-xl border border-border/50 shadow-sm w-full md:w-auto">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full md:w-auto">
                  {sections.inside && (
                    <TabsTrigger 
                      value="inside"
                      className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 flex-1 sm:flex-none"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.inside")}
                    </TabsTrigger>
                  )}
                  {sections.exterior && (
                    <TabsTrigger 
                      value="exterior"
                      className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 flex-1 sm:flex-none"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.exterior")}
                    </TabsTrigger>
                  )}
                  {sections.virtualTour && (
                    <TabsTrigger 
                      value="virtualTour"
                      className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 flex-1 sm:flex-none"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.virtualTour")}
                    </TabsTrigger>
                  )}
                  {sections.floorplan && (
                    <TabsTrigger 
                      value="floorplan"
                      className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 flex-1 sm:flex-none"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.floorplan")}
                    </TabsTrigger>
                  )}
                  {sections.standardFeatures && (
                    <TabsTrigger 
                      value="standardFeatures"
                      className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 flex-1 sm:flex-none"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.standardFeatures")}
                    </TabsTrigger>
                  )}
                </div>
              </TabsList>
            </div>

            {/* Inside Tab */}
            {sections.inside && (
              <TabsContent value="inside" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.inside")}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.inside")}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {insideImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openGallery(index)}
                      onKeyDown={(e) => handleKeyDown(e, () => openGallery(index))}
                      className="relative aspect-video rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200"
                      aria-label={`${t("homeModels.modelPage.viewImage")} ${index + 1}`}
                      type="button"
                    >
                      <Image
                        src={image}
                        alt={`${modelName} inside - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </TabsContent>
            )}

            {/* Exterior Tab */}
            {sections.exterior && (
              <TabsContent value="exterior" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.exterior")}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.exterior")}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {exteriorImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openGallery(insideImages.length + index)}
                      onKeyDown={(e) => handleKeyDown(e, () => openGallery(insideImages.length + index))}
                      className="relative aspect-video rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200"
                      aria-label={`${t("homeModels.modelPage.viewImage")} ${index + 1}`}
                      type="button"
                    >
                      <Image
                        src={image}
                        alt={`${modelName} exterior - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              </TabsContent>
            )}

            {/* Virtual Tour Tab */}
            {sections.virtualTour && youtubeUrl && (
              <TabsContent value="virtualTour" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.virtualTour")}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.virtualTour")}</p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <YouTubeVideo url={youtubeUrl} title={`${modelName} ${t("homeModels.modelPage.virtualTourTitle")}`} />
                </div>
              </TabsContent>
            )}

            {/* Floorplan Tab */}
            {sections.floorplan && (
              <TabsContent value="floorplan" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.floorplan")}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.floorplan")}</p>
                </div>
                {(() => {
                  // Prioridad: 1) Imagen del JSON, 2) Plano optimizado del mapeo, 3) Mensaje de "próximamente"
                  const floorplanImage = sections.floorplan.image || MODEL_FLOORPLANS[modelData.key.toLowerCase()];
                  
                  if (floorplanImage) {
                    return (
                      <>
                        <Card className="border-2 border-border shadow-xl overflow-hidden">
                          <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6">
                            <div className="relative w-full bg-background rounded-lg overflow-hidden">
                              {/* Mobile optimized container - no horizontal scroll */}
                              <div className="relative w-full max-h-[60vh] sm:max-h-[70vh] md:max-h-none">
                                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                                  <Image
                                    src={floorplanImage}
                                    alt={`${modelName} Floorplan - ${t("homeModels.modelPage.sections.floorplan")}`}
                                    fill
                                    className="object-contain p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                                    quality={90}
                                    priority={false}
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                              {/* Expand button for mobile */}
                              <div className="md:hidden mt-3 flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setIsFloorplanExpanded(true)}
                                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                                  type="button"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                  <span suppressHydrationWarning>{t("homeModels.modelPage.expandFloorplan") || "Ver plano completo"}</span>
                                </button>
                              </div>
                              {/* Helper text for desktop */}
                              <div className="hidden md:block mt-3 text-center">
                                <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                                  {t("homeModels.modelPage.floorplanZoomHint") || "Haz clic en la imagen para ampliar"}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Expanded Floorplan Modal for Mobile */}
                        {isFloorplanExpanded && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/95 backdrop-blur-sm md:hidden"
                            onClick={() => setIsFloorplanExpanded(false)}
                          >
                            <div
                              className="bg-card rounded-2xl max-w-full w-full max-h-[95vh] overflow-hidden shadow-2xl border-2 border-border relative"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Close Button */}
                              <button
                                onClick={() => setIsFloorplanExpanded(false)}
                                className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border"
                                aria-label="Close"
                                type="button"
                              >
                                <X className="w-5 h-5 text-foreground" />
                              </button>

                              {/* Expanded Image */}
                              <div className="relative w-full h-[95vh] overflow-auto bg-background">
                                <div className="relative w-full min-h-full p-4 flex items-center justify-center">
                                  <Image
                                    src={floorplanImage}
                                    alt={`${modelName} Floorplan - ${t("homeModels.modelPage.sections.floorplan")} - Expanded`}
                                    width={1200}
                                    height={900}
                                    className="object-contain w-full h-auto max-w-full"
                                    quality={95}
                                    priority={false}
                                  />
                                </div>
                              </div>

                              {/* Helper text */}
                              <div className="absolute bottom-4 left-4 right-4 text-center">
                                <p className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg inline-block" suppressHydrationWarning>
                                  {t("homeModels.modelPage.floorplanScrollHint") || "Desliza para ver el plano completo"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  }
                  
                  return (
                    <Card>
                      <CardContent className="pt-6 p-4 sm:p-6">
                        <p className="text-center text-sm sm:text-base text-muted-foreground" suppressHydrationWarning>{t("homeModels.modelPage.floorplanComingSoon")}</p>
                      </CardContent>
                    </Card>
                  );
                })()}
              </TabsContent>
            )}

            {/* Standard Features Tab */}
            {sections.standardFeatures && (
              <TabsContent value="standardFeatures" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.standardFeatures")}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.standardFeatures")}</p>
                </div>
                {sections.standardFeatures.categories && (
                  <Accordion type="single" collapsible className="w-full">
                    {Object.entries(sections.standardFeatures.categories).map(([key, category]) => (
                      <AccordionItem key={key} value={key}>
                        <AccordionTrigger className="text-left font-semibold" suppressHydrationWarning>
                          {t(`homeModels.modelPage.standardFeaturesCategories.${key}`) || category.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-4">
                            {category.items.map((item, index) => (
                              <li key={index} className="list-disc text-muted-foreground">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </TabsContent>
            )}
          </Tabs>
          </section>
        </AnimatedSection>

        {/* Request Info Section */}
        <AnimatedSection delay={0.2}>
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl text-center" suppressHydrationWarning>{t("homeModels.modelPage.requestInfo.title")}</CardTitle>
              <CardDescription className="text-center text-sm sm:text-base md:text-lg" suppressHydrationWarning>
                {t("homeModels.modelPage.requestInfo.subtitle")}
              </CardDescription>
              <CardDescription className="text-center text-xs sm:text-sm" suppressHydrationWarning>
                {t("homeModels.modelPage.requestInfo.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <HubSpotForm
                portalId="50215941"
                formId="93068cd5-cb63-461a-b7a6-00a3ca4fcd0a"
                region="na1"
                redirectUrl={redirectUrl}
                className="w-full"
              />
            </CardContent>
          </Card>
          </section>
        </AnimatedSection>
      </div>
    </PageContent>

    {/* Gallery Modal */}
    {isGalleryOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
        onClick={closeGallery}
      >
        <div
          className="bg-card rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-muted h-[90vh]">
            <Image
                src={images[galleryImageIndex]}
                alt={`${modelName} - ${galleryImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />

            {/* Gallery Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => changeGalleryImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                  aria-label={t("homeModels.modelPage.previousImage")}
                  type="button"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={() => changeGalleryImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                  aria-label={t("homeModels.modelPage.nextImage")}
                  type="button"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </>
            )}

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center z-10 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryImageIndex(index)}
                    className={cn(
                      "w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                      index === galleryImageIndex
                        ? "border-primary scale-105"
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

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                <span className="text-foreground text-sm font-medium">
                  {galleryImageIndex + 1} / {images.length}
                </span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border z-10"
              aria-label={t("homeModels.modelPage.closeGallery")}
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

