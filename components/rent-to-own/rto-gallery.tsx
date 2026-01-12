"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";
import { X, ChevronLeft, ChevronRight, Maximize2, Heart, Home } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

// Imágenes de la galería RTO
const rtoGalleryImages = [
  "/recursos/rto/familia-cocina.webp",
  "/recursos/rto/testimonio-19.webp",
  "/recursos/rto/testimonio-20.webp",
  "/recursos/rto/testimonio-21.webp",
  "/recursos/rto/testimonio-22.webp",
  "/recursos/rto/testimonio-26.webp",
];

// Componente Modal de Galería
const GalleryModal = ({
  images,
  selectedIndex,
  onClose,
  onChangeImage,
}: {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onChangeImage: (direction: number) => void;
}) => (
  <div
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md animate-in fade-in-0 duration-200"
    onClick={onClose}
    tabIndex={-1}
  >
    <div
      className="bg-card rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-border relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative bg-muted h-[90vh]">
        <Image
          src={images[selectedIndex]}
          alt={`Familia feliz en RTO - ${selectedIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 80vw"
          quality={95}
          priority
        />

        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChangeImage(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg hover:scale-110"
              aria-label="Imagen anterior"
              type="button"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChangeImage(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg hover:scale-110"
              aria-label="Siguiente imagen"
              type="button"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </>
        )}

        {/* Contador de imágenes */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border shadow-lg">
            <span className="text-foreground text-sm font-medium">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Botón de cerrar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg hover:scale-110"
          aria-label="Cerrar galería"
          type="button"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  </div>
);

export const RTOGallery = () => {
  const { t } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openGallery = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const changeImage = useCallback((direction: number) => {
    if (selectedImageIndex === null) return;
    const newIndex = selectedImageIndex + direction;
    if (newIndex < 0) {
      setSelectedImageIndex(rtoGalleryImages.length - 1);
    } else if (newIndex >= rtoGalleryImages.length) {
      setSelectedImageIndex(0);
    } else {
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex]);

  // Navegación con teclado
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGallery();
      } else if (e.key === "ArrowLeft") {
        changeImage(-1);
      } else if (e.key === "ArrowRight") {
        changeImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, closeGallery, changeImage]);

  return (
    <>
      <AnimatedSection delay={0.1}>
        <section className="py-10 md:py-14 lg:py-18 bg-background">
          <div className="container mx-auto px-4 sm:px-5 md:px-6">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-2">
                  <Heart className="h-4 w-4" />
                  <span suppressHydrationWarning>{t("rentToOwn.gallery.badge")}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight" suppressHydrationWarning>
                  {t("rentToOwn.gallery.title")}
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" suppressHydrationWarning>
                  {t("rentToOwn.gallery.subtitle")}
                </p>
                <p className="text-base text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed" suppressHydrationWarning>
                  {t("rentToOwn.gallery.description")}
                </p>
              </div>

              {/* Grid de imágenes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {rtoGalleryImages.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => openGallery(index)}
                    className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 border-2 border-border/40 hover:border-primary/60 shadow-lg hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-100"
                    aria-label={`Ver imagen ${index + 1} de ${rtoGalleryImages.length}`}
                    type="button"
                  >
                    <Image
                      src={src}
                      alt={`Familia feliz en RTO - ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
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
                  </button>
                ))}
              </div>

              {/* Información adicional */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 pt-4">
                <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                  <Home className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2" suppressHydrationWarning>
                    {t("rentToOwn.gallery.stats.homeowners")}
                  </h3>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("rentToOwn.gallery.stats.homeownersDesc")}
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2" suppressHydrationWarning>
                    {t("rentToOwn.gallery.stats.satisfaction")}
                  </h3>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("rentToOwn.gallery.stats.satisfactionDesc")}
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                  <Maximize2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2" suppressHydrationWarning>
                    {t("rentToOwn.gallery.stats.growth")}
                  </h3>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t("rentToOwn.gallery.stats.growthDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Modal/Lightbox de galería */}
      {selectedImageIndex !== null && (
        <GalleryModal
          images={rtoGalleryImages}
          selectedIndex={selectedImageIndex}
          onClose={closeGallery}
          onChangeImage={changeImage}
        />
      )}
    </>
  );
};

