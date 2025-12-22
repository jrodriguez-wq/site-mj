  "use client";

  import { useMemo } from "react";
  import { cn } from "@/lib/utils";
  import Image from "next/image";
  import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
  import { useTranslation } from "@/hooks/use-translation";

  const familyImages = [
    { src: "/recursos/clientes/testimonio-5.webp" },// quiero que ocupe 1 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-17.webp" },// quiero que ocupe 3 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-1.webp" },// quiero que ocupe 1 columnas y 1 filas
    { src: "/recursos/clientes/testimonio-14.webp" },// quiero que ocupe 2 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-4.webp" },// quiero que ocupe 1 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-2.webp" },// quiero que ocupe 1 columnas y 1 filas
    { src: "/recursos/clientes/testimonio-7.webp" },// quiero que ocupe 3 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-27.webp" },// quiero que ocupe 2 columnas y 1 fila

    { src: "/recursos/clientes/testimonio-9.webp" },// quiero que ocupe 1 columnas y 3 filas
    { src: "/recursos/clientes/testimonio-10.webp" }, // quiero que ocupe 1 columnas y 3 filas
    { src: "/recursos/clientes/testimonio-16.webp" },// quiero que ocupe 2 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-3.webp" },// quiero que ocupe 1 columnas y 1 filas
    { src: "/recursos/clientes/testimonio-12.webp" },// quiero que ocupe 2 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-13.webp" },// quiero que ocupe 1 columnas y 1 filas
    { src: "/recursos/clientes/testimonio-15.webp" }, // quiero que ocupe 1 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-32.webp" }, // quiero que ocupe 3 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-18.webp" }, // quiero que ocupe 3 columnas y 2 filas
    { src: "/recursos/clientes/testimonio-24.webp" },// quiero que ocupe 2 columnas y 1 fila
    { src: "/recursos/clientes/testimonio-25.webp" },// quiero que ocupe 2 columnas y 1 fila
    { src: "/recursos/clientes/testimonio-8.webp" },

    { src: "/img/logo.svg", isLogo: true },// quiero que ocupe 3 columnas y 1 filas
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
    const { t, language, translations } = useTranslation();

    // Usar translations como dependencia para que se re-renderice cuando se carguen
    const title = useMemo(() => t("home.happyFamilies.title"), [t, language, translations]);
    const subtitle = useMemo(() => t("home.happyFamilies.subtitle"), [t, language, translations]);

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
              {familyImages.map((item, i) => {
                // Distribución optimizada para llenar el grid sin espacios vacíos
                // Grid de 3 columnas - Patrón balanceado que llena todos los espacios
                // Combinación de tamaños: 1x1, 1x2, 2x1, 2x2, 3x1, 3x2
                const sizeConfig = [
                  "md:col-span-1 md:row-span-2",      // 0: testimonio-5 - Vertical (1x2)
                  "md:col-span-2 md:row-span-2",      // 1: testimonio-17 - Cuadrado (2x2)
                  "md:col-span-1 md:row-span-1",      // 2: testimonio-1 - Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 3: testimonio-14 - Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 4: testimonio-4 - Pequeño (1x1)
                  "md:col-span-1 md:row-span-2",      // 5: testimonio-2 - Vertical (1x2)
                  "md:col-span-2 md:row-span-1",      // 6: testimonio-7 - Horizontal (2x1)
                  "md:col-span-1 md:row-span-2",      // 7: testimonio-8 - Pequeño (1x1)
                  "md:col-span-1 md:row-span-2",      // 8: testimonio-9 - Vertical (1x2)
                  "md:col-span-1 md:row-span-2",      // 9: testimonio-10 - Vertical (1x2)
                  "md:col-span-2 md:row-span-2",      // 10: testimonio-16 - Cuadrado (2x2)
                  "md:col-span-1 md:row-span-1",      // 11: testimonio-3 - Pequeño (1x1)
                  "md:col-span-2 md:row-span-2",      // 12: testimonio-12 - Cuadrado (2x2)
                  "md:col-span-1 md:row-span-1",      // 13: testimonio-13 - Pequeño (1x1)
                  "md:col-span-1 md:row-span-1",      // 14: testimonio-15 - Vertical (1x2)
                  "md:col-span-3 md:row-span-2",      // 15: testimonio-18 - Horizontal grande (3x2)
                  "md:col-span-1 md:row-span-1",      // 16: testimonio-32 - Pequeño (1x1)
                  "md:col-span-2 md:row-span-1",      // 17: testimonio-24 - Horizontal (2x1)
                  "md:col-span-2 md:row-span-1",      // 18: testimonio-25 - Horizontal (2x1)
                  "md:col-span-1 md:row-span-1",      // 19: testimonio-27 - Vertical (1x2)
                  "md:col-span-3 md:row-span-1",      // 20: logo - Horizontal completo (3x1)
                ];

                return (
                  <BentoGridItem
                    key={`${item.src}-${i}`}
                    header={<ImageHeader src={item.src} isLogo={item.isLogo} />}
                    className={cn(sizeConfig[i] || "")}
                  />
                );
              })}
            </BentoGrid>
          </div>
        </div>
      </section>
    );
  };
