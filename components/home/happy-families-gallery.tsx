"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useTranslation } from "@/hooks/use-translation";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const familyImages = [
  { src: "/recursos/clientes/testimonio-5.webp" },
  { src: "/recursos/clientes/testimonio-17.webp" },
  { src: "/recursos/clientes/testimonio-1.webp" },
  { src: "/recursos/clientes/testimonio-14.webp" },
  { src: "/recursos/clientes/testimonio-2.webp" },
  { src: "/recursos/clientes/testimonio-7.webp" },
  { src: "/recursos/clientes/testimonio-27.webp" },

  { src: "/recursos/clientes/testimonio-16.webp" },
  { src: "/recursos/clientes/testimonio-9.webp" },
  { src: "/recursos/clientes/testimonio-3.webp" },
  { src: "/recursos/clientes/testimonio-32.webp" },
  { src: "/recursos/clientes/testimonio-15.webp" },
  { src: "/recursos/clientes/testimonio-25.webp" },
  { src: "/recursos/clientes/testimonio-13.webp" },
  { src: "/recursos/clientes/testimonio-8.webp" },

  { src: "/img/logo.svg", isLogo: true },
];

// Selección optimizada de imágenes para móvil (menos imágenes, mejor visualización)
const mobileImages: Array<{ src: string; isLogo?: boolean }> = [
  { src: "/recursos/clientes/testimonio-5.webp" },
  { src: "/recursos/clientes/testimonio-17.webp" },
  { src: "/recursos/clientes/testimonio-1.webp" },
  { src: "/recursos/clientes/testimonio-4.webp" },
  { src: "/recursos/clientes/testimonio-2.webp" },
  { src: "/recursos/clientes/testimonio-7.webp" },
  { src: "/recursos/clientes/testimonio-27.webp" },
  { src: "/recursos/clientes/testimonio-9.webp" },
  { src: "/recursos/clientes/testimonio-16.webp" },
  { src: "/recursos/clientes/testimonio-32.webp" },
];

const ImageHeader = ({ 
  src, 
  isLogo = false, 
  onClick,
  isClickable = false 
}: { 
  src: string; 
  isLogo?: boolean;
  onClick?: () => void;
  isClickable?: boolean;
}) => (
  <div 
    className={cn(
      "flex flex-1 w-full h-full min-h-16 rounded-xl relative overflow-hidden bg-muted",
      isClickable && "cursor-pointer group/image"
    )}
    onClick={isClickable ? onClick : undefined}
  >
    <Image
      src={src}
      alt={isLogo ? "Logo" : "Familia feliz"}
      fill
      className={cn(
        "object-cover transition-all duration-300",
        isClickable && "group-hover/image:scale-110",
        !isClickable && "group-hover/bento:scale-105",
        isLogo && "object-contain p-3"
      )}
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
      quality={75}
    />
    {isClickable && !isLogo && (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
          <div className="p-2 bg-background/90 backdrop-blur-sm rounded-full border-2 border-primary/50 shadow-xl">
            <Maximize2 className="w-4 h-4 text-primary" />
          </div>
        </div>
      </>
    )}
  </div>
);

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
          alt={`Familia feliz - ${selectedIndex + 1}`}
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

const MobileImageCard = ({ 
  src, 
  isLogo = false,
  onClick,
  isClickable = false
}: { 
  src: string; 
  isLogo?: boolean;
  onClick?: () => void;
  isClickable?: boolean;
}) => (
  <div 
    className={cn(
      "relative w-full aspect-square rounded-xl overflow-hidden bg-muted group",
      isClickable && "cursor-pointer"
    )}
    onClick={isClickable ? onClick : undefined}
  >
    <Image
      src={src}
      alt={isLogo ? "Logo" : "Familia feliz"}
      fill
      className={cn(
        "object-cover transition-all duration-300",
        isClickable && "group-hover:scale-110",
        !isClickable && "group-hover:scale-105",
        isLogo && "object-contain p-4"
      )}
      sizes="(max-width: 768px) 50vw, 33vw"
      quality={75}
    />
    {isClickable && !isLogo && (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 bg-background/90 backdrop-blur-sm rounded-full border-2 border-primary/50 shadow-xl">
            <Maximize2 className="w-4 h-4 text-primary" />
          </div>
        </div>
      </>
    )}
  </div>
);

export const HappyFamiliesGallery = () => {
  const { t } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Filtrar solo las imágenes (excluir el logo)
  const galleryImages = useMemo(() => familyImages.filter(img => !img.isLogo).map(img => img.src), []);
  const mobileGalleryImages = useMemo(() => mobileImages.filter(img => !img.isLogo).map(img => img.src), []);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Obtener las imágenes actuales según el tamaño de pantalla
  const currentImages = isMobile ? mobileGalleryImages : galleryImages;

  // Usar translations como dependencia para que se re-renderice cuando se carguen
  const title = useMemo(() => t("home.happyFamilies.title"), [t]);
  const subtitle = useMemo(() => t("home.happyFamilies.subtitle"), [t]);

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
      setSelectedImageIndex(currentImages.length - 1);
    } else if (newIndex >= currentImages.length) {
      setSelectedImageIndex(0);
    } else {
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex, currentImages.length]);

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

  // Función para obtener el índice de la imagen en la galería completa
  const getImageIndex = useCallback((src: string, isMobileView: boolean = false) => {
    const images = isMobileView ? mobileGalleryImages : galleryImages;
    return images.indexOf(src);
  }, [galleryImages, mobileGalleryImages]);

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight" suppressHydrationWarning>
              {title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto" suppressHydrationWarning>
              {subtitle}
            </p>
          </div>
          
          {/* Galería móvil - Grid simple de 2 columnas */}
          <div className="grid grid-cols-2 gap-2.5 md:hidden">
            {mobileImages.map((item, i) => {
              const imageIndex = !item.isLogo ? getImageIndex(item.src, true) : -1;
              return (
                <MobileImageCard
                  key={`mobile-${item.src}-${i}`}
                  src={item.src}
                  isLogo={item.isLogo}
                  isClickable={!item.isLogo}
                  onClick={!item.isLogo ? () => openGallery(imageIndex) : undefined}
                />
              );
            })}
          </div>

          {/* Galería desktop - BentoGrid complejo */}
          <div className="hidden md:block">
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[12rem]">
              {familyImages.map((item, i) => {
                // Distribución optimizada para 17 elementos (16 imágenes + 1 logo)
                // Grid de 3 columnas - Reducido verticalmente manteniendo proporciones
                // Todas las alturas reducidas a la mitad para galería más compacta
                const sizeConfig = [
                  "md:col-span-1 md:row-span-1",      // 1: Mediano (1x1)
                  "md:col-span-2 md:row-span-1",      // 2: Ancho (2x1)

                  "md:col-span-1 md:row-span-1",      // 3: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 4: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 5: Pequeño (1x1)

                  "md:col-span-3 md:row-span-1",      // 6: Ancho (3x1)

                  "md:col-span-1 md:row-span-1",      // 7: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 8: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 9: Pequeño (1x1)

                  "md:col-span-1 md:row-span-1",      // 10: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 11: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 12: Pequeño (1x1)
                  
                  "md:col-span-1 md:row-span-1",      // 13: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 14: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 15: Pequeño (1x1)

                  "md:col-span-3 md:row-span-1",      // 17: Logo ancho (3x1)
                ];

                const imageIndex = !item.isLogo ? getImageIndex(item.src, false) : -1;
                return (
                  <BentoGridItem
                    key={`desktop-${item.src}-${i}`}
                    header={
                      <ImageHeader 
                        src={item.src} 
                        isLogo={item.isLogo}
                        isClickable={!item.isLogo}
                        onClick={!item.isLogo ? () => openGallery(imageIndex) : undefined}
                      />
                    }
                    className={cn(sizeConfig[i] || "")}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </div>

      {/* Modal/Lightbox de galería */}
      {selectedImageIndex !== null && (
        <GalleryModal
          images={currentImages}
          selectedIndex={selectedImageIndex}
          onClose={closeGallery}
          onChangeImage={changeImage}
        />
      )}
    </section>
  );
};
