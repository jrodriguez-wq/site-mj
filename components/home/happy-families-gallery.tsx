"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useTranslation } from "@/hooks/use-translation";

const familyImages = [
  { src: "/recursos/clientes/testimonio-5.webp" },
  { src: "/recursos/clientes/testimonio-17.webp" },
  { src: "/recursos/clientes/testimonio-4.webp" },
  { src: "/recursos/clientes/testimonio-1.webp" },
  { src: "/recursos/clientes/testimonio-14.webp" },
  { src: "/recursos/clientes/testimonio-2.webp" },
  { src: "/recursos/clientes/testimonio-7.webp" },
  { src: "/recursos/clientes/testimonio-8.webp" },
  { src: "/recursos/clientes/testimonio-9.webp" },
  { src: "/recursos/clientes/testimonio-10.webp" },
  { src: "/recursos/clientes/testimonio-16.webp" },
  { src: "/recursos/clientes/testimonio-11.webp" },
  { src: "/recursos/clientes/testimonio-3.webp" },
  { src: "/recursos/clientes/testimonio-12.webp" },
  { src: "/recursos/clientes/testimonio-13.webp" },
  { src: "/recursos/clientes/testimonio-15.webp" },
  { src: "/recursos/clientes/testimonio-18.webp" },
  { src: "/img/logo.svg", isLogo: true },
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
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={75}
    />
  </div>
);

export const HappyFamiliesGallery = () => {
  const { t, translations } = useTranslation();

  const title = useMemo(() => t("home.happyFamilies.title"), [t, translations]);
  const subtitle = useMemo(() => t("home.happyFamilies.subtitle"), [t, translations]);

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
          
          <BentoGrid className="max-w-7xl mx-auto">
            {familyImages.map((item, i) => (
              <BentoGridItem
                key={`${item.src}-${i}`}
                header={<ImageHeader src={item.src} isLogo={item.isLogo} />}
                className={cn(
                  // Crear un diseño bento grid variado y elegante
                  i === 1 || i === 6 ? "md:col-span-2" : "",
                  i === 11 ? "md:col-span-2 md:row-span-2" : "",
                  i === 17 && "md:col-span-2" // Logo ocupa 2 columnas
                )}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
};
