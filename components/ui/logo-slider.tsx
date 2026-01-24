"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface LogoItem {
  src: string
  alt: string
  href?: string
  width?: number
  height?: number
  className?: string
}

interface LogoSliderProps {
  logos: LogoItem[]
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  className?: string
  title?: string
  showTitle?: boolean
  variant?: "default" | "minimal" | "bordered"
}

const speedClasses = {
  slow: "animate-scroll-left-slow",
  normal: "animate-scroll-left",
  fast: "animate-scroll-left-fast",
}

export const LogoSlider = ({
  logos,
  speed = "normal",
  pauseOnHover = true,
  className,
  title,
  showTitle = false,
  variant = "default",
}: LogoSliderProps) => {
  // Duplicar los logos para efecto infinito suave
  const duplicatedLogos = [...logos, ...logos, ...logos]

  if (logos.length === 0) {
    return null
  }

  const variantStyles = {
    default: "py-8 sm:py-10 md:py-12 lg:py-16 bg-muted/30 border-y border-border/50",
    minimal: "py-6 sm:py-8 md:py-10 lg:py-12 bg-transparent",
    bordered: "py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/20 border-y-2 border-primary/10",
  }

  return (
    <section
      className={cn(
        "overflow-hidden relative",
        variantStyles[variant],
        className
      )}
    >
      {showTitle && title && (
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h3>
        </div>
      )}

      <div className="relative w-full">
        {/* Gradient overlays para efecto fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <div
          className={cn(
            "flex items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24",
            pauseOnHover && "hover:[animation-play-state:paused]",
            speedClasses[speed]
          )}
        >
          {duplicatedLogos.map((logo, index) => {
            const logoImage = (
              <div className="relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 group flex items-center justify-center w-40 h-28">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={112}
                  className={cn(
                    "w-full h-full object-contain transition-transform duration-300 group-hover:scale-110",
                    logo.className
                  )}
                  quality={100}
                  loading="lazy"
                />
              </div>
            )

            if (logo.href) {
              return (
                <Link
                  key={`${logo.src}-${index}`}
                  href={logo.href}
                  target={logo.href.startsWith("http") ? "_blank" : "_self"}
                  rel={logo.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center shrink-0"
                >
                  {logoImage}
                </Link>
              )
            }

            return (
              <div
                key={`${logo.src}-${index}`}
                className="flex items-center justify-center shrink-0"
              >
                {logoImage}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
