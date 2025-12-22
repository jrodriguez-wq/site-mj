"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

// Genera copos de nieve con propiedades aleatorias optimizadas
const generateSnowflakes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 4 + 6,
    delay: Math.random() * 3,
    drift: (Math.random() - 0.5) * 80,
    opacity: Math.random() * 0.4 + 0.4,
    blur: Math.random() > 0.7 ? 1 : 0,
  }));
};

const SnowContainer = () => {
  // Más copos de nieve para efecto más visible
  const snowflakes = useMemo(() => generateSnowflakes(80), []);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white snowflake-fall"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: Math.min(flake.opacity + 0.2, 1), // Más visible
              filter: flake.blur ? "blur(1px)" : "none",
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              ["--drift" as string]: `${flake.drift}px`,
            }}
          />
        ))}
      </div>
      {/* La animación snowfall está ahora en globals.css */}
    </>
  );
};

export const HolidayOverlay = () => {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[150]",
        "bg-gradient-to-b from-black/80 via-black/70 to-black/80",
        "backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
    >
      <SnowContainer />
    </DialogPrimitive.Overlay>
  );
};
