"use client";

import { cn } from "@/lib/utils";

interface FloorplanMeasuresProps {
  livingArea?: string; // Ejemplo: "2,316 SQ. FT."
  entry?: string; // Ejemplo: "113 SQ. FT."
  garage?: string; // Ejemplo: "689 SQ. FT." (solo el valor, no el label)
  garageLabel?: string; // Ejemplo: "3 Car Garage" (para el label)
  lanai?: string; // Ejemplo: "159 SQ. FT."
  totalArea: string; // Ejemplo: "3,277 SQ. FT."
  className?: string;
}

export const FloorplanMeasures = ({
  livingArea,
  entry,
  garage,
  garageLabel,
  lanai,
  totalArea,
  className,
}: FloorplanMeasuresProps) => {
  // Construir la lista de medidas (solo mostrar las que tienen valor)
  const measuresList = [
    livingArea && { label: "Living Area (A/C)", value: livingArea },
    entry && { label: "Entry", value: entry },
    garage && garageLabel && { label: garageLabel, value: garage },
    lanai && { label: "Lanai", value: lanai },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  const isRelative = className?.includes("relative");
  
  return (
    <div
      className={cn(
        "bg-background/95 backdrop-blur-md",
        "rounded-lg sm:rounded-xl border-2 border-border/50",
        "shadow-2xl",
        "overflow-hidden",
        // Desktop: always absolute positioning (más abajo pero con espacio para chat)
        "md:absolute md:-bottom-4 md:right-4 md:z-20 md:w-[280px]",
        // Mobile: conditional positioning
        isRelative 
          ? "relative w-full" 
          : "absolute bottom-2 right-2 z-20 w-[200px] sm:w-[240px]",
        className
      )}
    >
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-2.5 sm:py-3 border-b border-primary/20">
        <h3 className="text-xs sm:text-sm font-bold text-center uppercase tracking-wide">
          Area Tabulation
        </h3>
      </div>

      {/* Measures Table */}
      <div className="divide-y divide-border/50">
        {measuresList.map((measure, index) => (
          <div
            key={index}
            className={cn(
              "px-3 sm:px-4 py-2 sm:py-2.5",
              "flex items-center justify-between gap-2",
              index % 2 === 0 ? "bg-background" : "bg-muted/30"
            )}
          >
            <span className="text-xs sm:text-sm font-medium text-foreground/90 shrink-0">
              {measure.label}:
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground text-right whitespace-nowrap">
              {measure.value}
            </span>
          </div>
        ))}

        {/* Total Area - Destacado */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-muted/60 border-t-2 border-primary/40">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-bold text-foreground">
              TOTAL AREA:
            </span>
            <span className="text-xs sm:text-sm md:text-base font-black text-primary whitespace-nowrap">
              {totalArea}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

