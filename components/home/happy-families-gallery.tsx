"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useTranslation } from "@/hooks/use-translation";

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

const ImageHeader = ({ src, isLogo = false }: { src: string; isLogo?: boolean }) => (
  <div className="flex flex-1 w-full h-full min-h-24 rounded-xl relative overflow-hidden bg-muted">
    <Image
      src={src}
      alt={isLogo ? "Logo" : "Familia feliz"}
      fill
      className={cn(
        "object-cover transition-transform duration-300 group-hover/bento:scale-105",
        isLogo && "object-contain p-4"
      )}
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
      quality={75}
    />
  </div>
);

const MobileImageCard = ({ src, isLogo = false }: { src: string; isLogo?: boolean }) => (
  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted group">
    <Image
      src={src}
      alt={isLogo ? "Logo" : "Familia feliz"}
      fill
      className={cn(
        "object-cover transition-transform duration-300 group-hover:scale-105",
        isLogo && "object-contain p-4"
      )}
      sizes="(max-width: 768px) 50vw, 33vw"
      quality={75}
    />
  </div>
);

export const HappyFamiliesGallery = () => {
  const { t, language, translations } = useTranslation();

  // Usar translations como dependencia para que se re-renderice cuando se carguen
  const title = useMemo(() => t("home.happyFamilies.title"), [t]);
  const subtitle = useMemo(() => t("home.happyFamilies.subtitle"), [t]);

  return (
    <section className="py-10 md:py-14 lg:py-18 bg-background">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10 lg:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight" suppressHydrationWarning>
              {title}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full mx-auto"></div>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" suppressHydrationWarning>
              {subtitle}
            </p>
          </div>
          
          {/* Galería móvil - Grid simple de 2 columnas */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {mobileImages.map((item, i) => (
              <MobileImageCard
                key={`mobile-${item.src}-${i}`}
                src={item.src}
                isLogo={item.isLogo}
              />
            ))}
          </div>

          {/* Galería desktop - BentoGrid complejo */}
          <div className="hidden md:block">
            <BentoGrid className="max-w-7xl mx-auto">
              {familyImages.map((item, i) => {
                // Distribución optimizada para 17 elementos (16 imágenes + 1 logo)
                // Grid de 3 columnas - Patrón balanceado que llena todos los espacios
                // El logo al final tiene un tamaño destacado (3x2)
                const sizeConfig = [
                  "md:col-span-1 md:row-span-2",      // 1: Grande (2x2)
                  "md:col-span-2 md:row-span-2",     // 2: Alto (1x2)

                  "md:col-span-1 md:row-span-1",      // 3: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 4: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 5: Alto (1x2)

                  "md:col-span-3 md:row-span-2",      // 6: Ancho (2x1)

                  "md:col-span-1 md:row-span-2",      // 7: Pequeño (1x1)
                  "md:col-span-1 md:row-span-2",      // 8: Alto (1x2)
                  "md:col-span-1 md:row-span-2",      // 9: Grande (2x2)

                  "md:col-span-1 md:row-span-2",      // 10: Pequeño (1x1)
                  "md:col-span-1 md:row-span-2",      // 11: Pequeño (1x1)
                  "md:col-span-1 md:row-span-2",      // 12: Alto (1x2)
                  
                  "md:col-span-1 md:row-span-1",      // 13: Ancho (2x1)
                  "md:col-span-1 md:row-span-1",      // 14: Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 15: Alto (1x2)

                  "md:col-span-3 md:row-span-1",      // 17: Logo destacado (3x2)
                ];

                return (
                  <BentoGridItem
                    key={`desktop-${item.src}-${i}`}
                    header={<ImageHeader src={item.src} isLogo={item.isLogo} />}
                    className={cn(sizeConfig[i] || "")}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
};
