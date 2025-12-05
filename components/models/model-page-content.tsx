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

interface ModelPageContentProps {
  modelData: ModelData & { images: string[] };
}

export const ModelPageContent = ({ modelData }: ModelPageContentProps) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("inside");

  const { name, sqft, bedrooms, bathrooms, garage, price, description, youtubeUrl, images, sections } = modelData;
  
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
      <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative">
          <div className="relative h-[60vh] min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
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
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      onKeyDown={(e) => handleKeyDown(e, handlePreviousImage)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                      aria-label={t("homeModels.modelPage.previousImage")}
                      type="button"
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      onKeyDown={(e) => handleKeyDown(e, handleNextImage)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                      aria-label={t("homeModels.modelPage.nextImage")}
                      type="button"
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                    <span className="text-foreground text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}

                {/* View Gallery Button */}
                {images.length > 1 && (
                  <button
                    onClick={() => openGallery(currentImageIndex)}
                    onKeyDown={(e) => handleKeyDown(e, () => openGallery(currentImageIndex))}
                    className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-background transition-colors border border-border z-10"
                    aria-label={t("homeModels.modelPage.viewGallery")}
                    type="button"
                  >
                    <Maximize2 className="w-4 h-4 text-foreground" />
                    <span className="text-foreground text-sm font-medium" suppressHydrationWarning>{t("homeModels.modelPage.viewGallery")}</span>
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-lg" suppressHydrationWarning>{t("homeModels.modelPage.noImagesAvailable")}</p>
              </div>
            )}
          </div>

          {/* Model Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-lg" suppressHydrationWarning>{modelName}</h1>
            </div>
          </div>
        </div>

        {/* Model Information Section */}
        <section className="mt-8 md:mt-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Price Card - Featured */}
            <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardDescription className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" suppressHydrationWarning>
                  {t("homeModels.modelPage.startingPrice")}
                </CardDescription>
                <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {price}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                  {t("homeModels.modelPage.contactForFinancing")}
                </p>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="md:col-span-2 lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Square className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-foreground">{sqft}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1" suppressHydrationWarning>{t("homeModels.modelPage.sqft")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Bed className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-foreground">{bedrooms}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1" suppressHydrationWarning>{t("homeModels.modelPage.bedrooms")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Bath className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-foreground">{bathrooms}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium mt-1" suppressHydrationWarning>{t("homeModels.modelPage.bathrooms")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-bold text-foreground leading-tight">{garage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="mt-12 md:mt-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" suppressHydrationWarning>{t("homeModels.modelPage.aboutThisModel")}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            </div>
            <Card className="border-2">
              <CardContent className="pt-6">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>{modelDescription}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mt-16 md:mt-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 md:mb-12">
              <TabsList className="inline-flex h-auto p-1.5 bg-muted/50 rounded-xl border border-border/50 shadow-sm w-full md:w-auto">
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {sections.inside && (
                    <TabsTrigger 
                      value="inside"
                      className="px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.inside")}
                    </TabsTrigger>
                  )}
                  {sections.exterior && (
                    <TabsTrigger 
                      value="exterior"
                      className="px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.exterior")}
                    </TabsTrigger>
                  )}
                  {sections.virtualTour && (
                    <TabsTrigger 
                      value="virtualTour"
                      className="px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.virtualTour")}
                    </TabsTrigger>
                  )}
                  {sections.floorplan && (
                    <TabsTrigger 
                      value="floorplan"
                      className="px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20"
                      suppressHydrationWarning
                    >
                      {t("homeModels.modelPage.sections.floorplan")}
                    </TabsTrigger>
                  )}
                  {sections.standardFeatures && (
                    <TabsTrigger 
                      value="standardFeatures"
                      className="px-6 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20"
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
              <TabsContent value="inside" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.inside")}</h3>
                  <p className="text-lg text-muted-foreground mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.inside")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {insideImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openGallery(index)}
                      onKeyDown={(e) => handleKeyDown(e, () => openGallery(index))}
                      className="relative aspect-video rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
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
              <TabsContent value="exterior" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.exterior")}</h3>
                  <p className="text-lg text-muted-foreground mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.exterior")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exteriorImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openGallery(insideImages.length + index)}
                      onKeyDown={(e) => handleKeyDown(e, () => openGallery(insideImages.length + index))}
                      className="relative aspect-video rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
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
              <TabsContent value="virtualTour" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.virtualTour")}</h3>
                  <p className="text-lg text-muted-foreground mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.virtualTour")}</p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <YouTubeVideo url={youtubeUrl} title={`${modelName} ${t("homeModels.modelPage.virtualTourTitle")}`} />
                </div>
              </TabsContent>
            )}

            {/* Floorplan Tab */}
            {sections.floorplan && (
              <TabsContent value="floorplan" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.floorplan")}</h3>
                  <p className="text-lg text-muted-foreground mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.floorplan")}</p>
                </div>
                {sections.floorplan.image ? (
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={sections.floorplan.image}
                      alt={`${modelName} Floorplan`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground" suppressHydrationWarning>{t("homeModels.modelPage.floorplanComingSoon")}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}

            {/* Standard Features Tab */}
            {sections.standardFeatures && (
              <TabsContent value="standardFeatures" className="space-y-8 mt-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-3" suppressHydrationWarning>{t("homeModels.modelPage.sections.standardFeatures")}</h3>
                  <p className="text-lg text-muted-foreground mb-8" suppressHydrationWarning>{t("homeModels.modelPage.sectionDescriptions.standardFeatures")}</p>
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

        {/* Request Info Section */}
        <section className="py-12 md:py-16 mt-16 md:mt-20">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-center" suppressHydrationWarning>{t("homeModels.modelPage.requestInfo.title")}</CardTitle>
              <CardDescription className="text-center text-lg" suppressHydrationWarning>
                {t("homeModels.modelPage.requestInfo.subtitle")}
              </CardDescription>
              <CardDescription className="text-center" suppressHydrationWarning>
                {t("homeModels.modelPage.requestInfo.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
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

