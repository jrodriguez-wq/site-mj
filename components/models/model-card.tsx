"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, X, Bed, Bath, Square, Car, Eye, Heart, Share2, Maximize2, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModelBadge } from "./model-badge";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SEO_CONFIG } from "@/config/seo";

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

function ModelCardImage({
  src,
  name,
  index,
  priority,
}: {
  src: string;
  name: string;
  index: number;
  priority: boolean;
}) {
  const [error, setError] = useState(false);
  const isLocal = src.startsWith("/modelos-optimized");
  return error ? (
    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs p-4 text-center">
      <span>{name} – image {index + 1}</span>
    </div>
  ) : (
    <Image
      src={src}
      alt={index === 0 ? `${name} model home in Florida - New construction home by M.J. Newell Homes - Home builder Florida` : `${name} model home interior ${index + 1} - New home construction Florida`}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={85}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
      unoptimized={isLocal}
      onError={() => setError(true)}
    />
  );
}

export interface ModelCardProps {
  modelKey: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: string;
  rtoPrice?: string; // Precio de RTO (Rent to Own) mensual
  beds: string;
  bedsLabel: string;
  baths: string;
  bathsLabel: string;
  sqft: string;
  sqftLabel: string;
  badges?: Array<{ type: "favorite" | "bestseller" | "satisfied"; label: string }>;
  satisfiedFamilies?: number;
  viewDetailsLabel?: string;
  viewPhotosLabel?: string;
  galleryTitle?: string;
  galleryDescription?: string;
  modelLabel?: string;
  carouselDelay?: number;
  initialDelay?: number;
  community?: "labelle" | "lehigh-acres"; // Comunidad para pasar como query param
}

const ModelCardComponent = (props: ModelCardProps) => {
  const {
    modelKey,
    name,
    description,
    image,
    images,
    price,
    rtoPrice,
    beds,
    bedsLabel,
    baths,
    bathsLabel,
    sqft,
    sqftLabel,
    badges,
    satisfiedFamilies,
    viewDetailsLabel,
    viewPhotosLabel,
    modelLabel,
    carouselDelay = 4000,
    initialDelay = 0,
    community,
  } = props;

  const displayViewDetailsLabel = viewDetailsLabel || "View more details";
  const displayViewMoreLabel = "View more";
  const displayModelLabel = modelLabel || "Model";
  const displayPriceFromLabel = "From";
  const displayRtoLabel = "RTO";
  const displayFeaturesLabel = "Features";
  const addToFavoritesLabel = "Add to favorites";
  const removeFromFavoritesLabel = "Remove from favorites";
  const shareLabel = "Share";
  const linkCopiedLabel = "Link copied!";
  const shareModelLabel = `Share ${name}`;
  const communityLabel = community === "labelle" ? "LaBelle" : community === "lehigh-acres" ? "Lehigh Acres" : null;
  const viewPhotosCountLabel = (count: number) => `${count} photo${count !== 1 ? "s" : ""}`;
  const closeGalleryLabel = "Close gallery";
  const previousImageLabel = "Previous image";
  const nextImageLabel = "Next image";
  const garageLabel = "Garage";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer para lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "50px",
  });

  // Ensure modelKey is available in scope - incluir community como query param si está disponible
  const modelLink = community 
    ? `/models/${modelKey}?community=${community}`
    : `/models/${modelKey}`;
  
  // URL completa para compartir
  const fullModelUrl = `${SEO_CONFIG.siteUrl}${modelLink}`;

  // Use all images if available, otherwise fallback to single image (filter empty/invalid)
  const displayImages = (images.length > 0 ? images : [image]).filter((src) => src && typeof src === "string");
  const hasMultipleImages = displayImages.length > 1;

  // Auto carousel with staggered delay - Only if carouselDelay > 0
  useEffect(() => {
    if (!isGalleryOpen && hasMultipleImages && carouselDelay > 0) {
      // Add initial delay to stagger animations between cards
      const timeoutId = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, carouselDelay);
      }, initialDelay);

      return () => {
        clearTimeout(timeoutId);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGalleryOpen, displayImages.length, hasMultipleImages, carouselDelay, initialDelay]);

  const openGallery = useCallback(() => {
    setIsGalleryOpen(true);
    setGalleryImageIndex(currentImageIndex);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [currentImageIndex]);

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  const changeGalleryImage = useCallback((direction: number) => {
    setGalleryImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return displayImages.length - 1;
      if (newIndex >= displayImages.length) return 0;
      return newIndex;
    });
  }, [displayImages.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  }, []);

  // Función para compartir el modelo
  const handleShare = useCallback(async () => {
    // Limpiar timeout anterior si existe
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    const shareData = {
      title: shareModelLabel,
      text: `${name} - ${description}`,
      url: fullModelUrl,
    };

    // Intentar usar Web Share API si está disponible (móvil principalmente)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        // Si se comparte exitosamente, mostrar confirmación
        setIsLinkCopied(true);
        copyTimeoutRef.current = setTimeout(() => {
          setIsLinkCopied(false);
        }, 3000);
        return;
      } catch (error) {
        // Si el usuario cancela, no hacer nada
        if ((error as Error).name === "AbortError") {
          return;
        }
        // Si hay otro error, continuar con copiar al portapapeles
      }
    }

    // Fallback: Copiar al portapapeles
    try {
      await navigator.clipboard.writeText(fullModelUrl);
      setIsLinkCopied(true);
      copyTimeoutRef.current = setTimeout(() => {
        setIsLinkCopied(false);
      }, 3000);
    } catch (error) {
      // Si falla clipboard API, usar método alternativo
      const textArea = document.createElement("textarea");
      textArea.value = fullModelUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setIsLinkCopied(true);
        copyTimeoutRef.current = setTimeout(() => {
          setIsLinkCopied(false);
        }, 3000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [fullModelUrl, name, description, shareModelLabel]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main Card Container */}
      <AnimatedCard index={initialDelay / 100} className="relative w-full">
        <div ref={ref} className="relative w-full group">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200" />

          <motion.div 
            className="relative bg-card/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-border/50 hover:border-primary/50 transition-all duration-200 hover:shadow-2xl"
          >
          {/* Image Carousel - Responsive height, images with fallback */}
          <div className="relative h-40 min-[400px]:h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <div
              className={cn(
                "flex transition-transform duration-300 ease-out h-full",
                hasMultipleImages && "transform"
              )}
              style={
                hasMultipleImages
                  ? { transform: `translateX(-${currentImageIndex * 100}%)` }
                  : {}
              }
            >
              {displayImages.map((img, index) => (
                <div key={index} className="min-w-full h-full relative flex-shrink-0">
                  {inView || index === 0 ? (
                    <ModelCardImage
                      src={img}
                      name={name}
                      index={index}
                      priority={index === 0 && inView}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Top Actions Bar - Left Side: Badges */}
            <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-20 flex flex-col gap-1.5 sm:gap-2">
              {/* Community Badge - Always visible if community is provided */}
              {community && communityLabel && (
                <div
                  className={cn(
                    "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold border backdrop-blur-md shadow-lg max-w-[45vw] sm:max-w-none",
                    community === "labelle"
                      ? "bg-white/95 dark:bg-gray-900/95 text-indigo-700 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-700/50 shadow-indigo-500/10"
                      : "bg-white/95 dark:bg-gray-900/95 text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-200/80 dark:border-fuchsia-700/50 shadow-fuchsia-500/10"
                  )}
                >
                  <MapPin className={cn(
                    "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0",
                    community === "labelle" 
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-fuchsia-600 dark:text-fuchsia-400"
                  )} />
                  <span className="whitespace-nowrap" suppressHydrationWarning>{communityLabel}</span>
                </div>
              )}
              
              {/* Model Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {badges.map((badge, idx) => (
                    <ModelBadge
                      key={idx}
                      type={badge.type}
                      label={badge.label}
                      count={badge.type === "satisfied" ? satisfiedFamilies : undefined}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Top Actions Bar - Right Side: Action Buttons */}
            <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex gap-1 sm:gap-1.5 z-20">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="bg-background/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full hover:bg-background transition-colors border border-border/70 shadow-sm"
                aria-label={isLiked ? removeFromFavoritesLabel : addToFavoritesLabel}
                type="button"
                suppressHydrationWarning
              >
                <Heart
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 transition-colors",
                    isLiked ? "fill-red-500 text-red-500" : "text-foreground/70"
                  )}
                />
              </button>
              <button
                onClick={handleShare}
                onKeyDown={(e) => handleKeyDown(e, handleShare)}
                className={cn(
                  "bg-background/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full hover:bg-background transition-all border border-border/70 shadow-sm relative",
                  isLinkCopied && "bg-primary/20 border-primary/50"
                )}
                aria-label={isLinkCopied ? linkCopiedLabel : shareLabel}
                type="button"
                suppressHydrationWarning
              >
                <AnimatePresence mode="wait">
                  {isLinkCopied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share"
                      initial={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Toast de confirmación */}
                <AnimatePresence>
                  {isLinkCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg z-50 pointer-events-none"
                    >
                      {linkCopiedLabel}
                      <div className="absolute -top-1 right-3 w-2 h-2 bg-primary rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Price Badge - Responsive size */}
            <div className={cn(
              "absolute right-2 sm:right-3 md:right-4 lg:right-5 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md text-emerald-700 dark:text-emerald-400 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full font-bold text-[10px] sm:text-xs md:text-sm lg:text-base shadow-lg border border-emerald-200/60 dark:border-emerald-700/50 z-20 max-w-[50%] truncate",
              hasMultipleImages 
                ? "bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24"
                : "bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5"
            )}>
              {price}
            </div>

            {/* View Gallery Button - Hidden on mobile, visible on tablet+ */}
            {hasMultipleImages && (
              <button
                onClick={openGallery}
                onKeyDown={(e) => handleKeyDown(e, openGallery)}
                className="hidden sm:flex absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-background/95 backdrop-blur-md px-2 md:px-2.5 py-1 md:py-1.5 rounded-full items-center gap-1 md:gap-1.5 hover:bg-background transition-all border border-border/70 shadow-md z-20"
                aria-label={viewPhotosCountLabel(displayImages.length)}
                type="button"
                suppressHydrationWarning
              >
                <Eye className="w-4 h-4 md:w-4 md:h-4 text-foreground flex-shrink-0" />
                <span className="text-foreground text-xs md:text-sm font-medium whitespace-nowrap" suppressHydrationWarning>
                  {viewPhotosLabel || viewPhotosCountLabel(displayImages.length)}
                </span>
              </button>
            )}
          </div>

          {/* Property Info - Responsive padding and typography */}
          <div className="p-2.5 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 min-w-0">
            {/* Title and Location */}
            <div className="min-w-0">
              <div className="flex items-start sm:items-center justify-between gap-1.5 sm:gap-2 mb-1 sm:mb-2 min-w-0">
                <h2 className="text-[clamp(0.9375rem,2.5vw+0.5rem,1.875rem)] font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex-1 min-w-0 leading-tight break-words">
                  {name}
                </h2>
                <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0" suppressHydrationWarning>
                  {displayModelLabel}
                </span>
              </div>
              {/* Community Badge in Content Area - Secondary display */}
              {community && communityLabel && (
                <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                  <MapPin className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4",
                    community === "labelle" ? "text-blue-500" : "text-purple-500"
                  )} />
                  <span className={cn(
                    "text-xs sm:text-sm font-semibold",
                    community === "labelle" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"
                  )} suppressHydrationWarning>
                    {communityLabel}, Florida
                  </span>
                </div>
              )}
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium line-clamp-2 mt-1 break-words">{description}</p>
            </div>

            {/* Quick Features - Responsive grid */}
            <div className="grid grid-cols-4 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 min-w-0">
              {[
                { icon: Bed, value: beds, label: bedsLabel },
                { icon: Bath, value: baths, label: bathsLabel },
                { icon: Square, value: sqft, label: sqftLabel },
                { icon: Car, value: garageLabel, label: garageLabel },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-md sm:rounded-lg md:rounded-xl p-1 sm:p-1.5 md:p-2 lg:p-2.5 text-center hover:from-primary/10 hover:to-primary/20 transition-colors border border-border/50 min-w-0"
                  >
                    <div className="text-primary flex justify-center mb-0.5 sm:mb-1">
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </div>
                    <div className="font-bold text-foreground text-[9px] sm:text-[10px] md:text-xs leading-tight truncate">{feature.value}</div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground leading-tight mt-0.5 truncate">{feature.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Price and CTA - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 border-t border-border/50 min-w-0">
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5" suppressHydrationWarning>
                  {displayPriceFromLabel}
                </p>
                <p className="text-[clamp(0.875rem,2vw+0.5rem,1.875rem)] font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight break-words">
                  {price}
                </p>
                {rtoPrice && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 font-semibold break-words" suppressHydrationWarning>
                    {displayRtoLabel}: <span className="text-primary font-bold">{rtoPrice}</span>
                  </p>
                )}
              </div>
              <Button
                asChild
                className="relative w-full sm:w-auto min-w-0 bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 group hover:scale-[1.02] hover:-translate-y-0.5 border-2 border-primary/20 hover:border-primary/50 overflow-hidden shrink-0"
              >
                <Link 
                  href={modelLink}
                  aria-label={`View ${name} model home details - New construction home in Florida by M.J. Newell Homes`}
                >
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                    <span className="hidden sm:inline" suppressHydrationWarning>{displayViewDetailsLabel}</span>
                    <span className="sm:hidden" suppressHydrationWarning>{displayViewMoreLabel}</span>
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-125 group-hover:rotate-90 transition-all duration-150 flex-shrink-0" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
        </div>
      </AnimatedCard>

      {/* Gallery Modal - Simplified for mobile, full for desktop */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={closeGallery}
        >
          {/* Mobile: Simple Image Viewer */}
          <div
            className="lg:hidden w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-md border-b border-border">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-foreground truncate">{name}</h3>
                {hasMultipleImages && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {galleryImageIndex + 1} / {displayImages.length}
                  </p>
                )}
              </div>
              <button
                onClick={closeGallery}
                className="ml-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border shrink-0"
                aria-label={closeGalleryLabel}
                type="button"
                suppressHydrationWarning
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Mobile Image Container */}
            <div className="relative flex-1 bg-muted overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={displayImages[galleryImageIndex]}
                  alt={`${name} - ${galleryImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                  priority={galleryImageIndex === 0}
                  loading={galleryImageIndex === 0 ? "eager" : "lazy"}
                  unoptimized={displayImages[galleryImageIndex]?.startsWith("/modelos-optimized") ?? false}
                />
              </div>

              {/* Mobile Navigation Controls */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeGalleryImage(-1);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md p-2.5 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg"
                    aria-label={previousImageLabel}
                    type="button"
                    suppressHydrationWarning
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      changeGalleryImage(1);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md p-2.5 rounded-full hover:bg-background transition-colors border border-border z-10 shadow-lg"
                    aria-label={nextImageLabel}
                    type="button"
                    suppressHydrationWarning
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>

                  {/* Mobile Thumbnail Strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur-md border-t border-border">
                    <div className="flex gap-2 justify-center overflow-x-auto pb-1">
                      {displayImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryImageIndex(index);
                          }}
                          className={cn(
                            "w-12 h-9 rounded-md overflow-hidden border-2 transition-all flex-shrink-0",
                            index === galleryImageIndex
                              ? "border-primary scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
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
                              sizes="48px"
                              quality={75}
                              loading="lazy"
                              unoptimized={img.startsWith("/modelos-optimized")}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop: Full Gallery with Details */}
          <div
            className="hidden lg:flex bg-card rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-2 h-full w-full">
              {/* Left: Image Gallery */}
              <div className="relative bg-muted h-full min-h-[500px]">
                <div className="relative w-full h-full">
                  <Image
                    src={displayImages[galleryImageIndex]}
                    alt={`${name} - ${galleryImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    quality={90}
                    priority={galleryImageIndex === 0}
                    loading={galleryImageIndex === 0 ? "eager" : "lazy"}
                    unoptimized={displayImages[galleryImageIndex]?.startsWith("/modelos-optimized") ?? false}
                  />
                </div>

                {/* Desktop Gallery Controls */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={() => changeGalleryImage(-1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                      aria-label={previousImageLabel}
                      type="button"
                      suppressHydrationWarning
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                    <button
                      onClick={() => changeGalleryImage(1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                      aria-label={nextImageLabel}
                      type="button"
                      suppressHydrationWarning
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  </>
                )}

                {/* Desktop Thumbnail Strip */}
                {hasMultipleImages && (
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center z-10 overflow-x-auto pb-2">
                    {displayImages.map((img, index) => (
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
                            quality={75}
                            loading="lazy"
                            unoptimized={img.startsWith("/modelos-optimized")}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Desktop Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                    <span className="text-foreground text-sm font-medium">
                      {galleryImageIndex + 1} / {displayImages.length}
                    </span>
                  </div>
                )}

                {/* Desktop Close Button */}
                <button
                  onClick={closeGallery}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border z-10"
                  aria-label={closeGalleryLabel}
                  type="button"
                  suppressHydrationWarning
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Right: Property Details - Desktop Only */}
              <div className="p-8 lg:p-10 overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="mb-8">
                  {badges && badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {badges.map((badge, idx) => (
                        <ModelBadge
                          key={idx}
                          type={badge.type}
                          label={badge.label}
                          count={badge.type === "satisfied" ? satisfiedFamilies : undefined}
                        />
                      ))}
                    </div>
                  )}
                  <h1 className="text-4xl font-bold text-foreground mb-2">{name}</h1>
                  <p className="text-muted-foreground font-medium mb-4">{description}</p>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider" suppressHydrationWarning>
                      {displayPriceFromLabel}
                    </p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {price}
                    </p>
                    {rtoPrice && (
                      <p className="text-base text-muted-foreground mt-2 font-semibold" suppressHydrationWarning>
                        {displayRtoLabel}: <span className="text-primary font-bold">{rtoPrice}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4" suppressHydrationWarning>
                    {displayFeaturesLabel}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Bed, value: beds, label: bedsLabel },
                      { icon: Bath, value: baths, label: bathsLabel },
                      { icon: Square, value: sqft, label: sqftLabel },
                      { icon: Car, value: garageLabel, label: garageLabel },
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors border border-border"
                        >
                          <div className="text-primary">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-foreground font-bold">{feature.value}</div>
                            <div className="text-muted-foreground text-xs">{feature.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-6 border-t border-border">
                  <Button
                    asChild
                    className="relative w-full bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground py-4 px-8 rounded-2xl font-bold text-base hover:shadow-2xl hover:shadow-primary/40 transition-all duration-200 group hover:scale-105 border-2 border-primary/20 hover:border-primary/50 overflow-hidden"
                  >
                    <Link href={modelLink} onClick={closeGallery}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {viewDetailsLabel}
                        <Maximize2 className="w-5 h-5 group-hover:scale-125 group-hover:rotate-90 transition-all duration-150" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Memoize component to prevent unnecessary re-renders
export const ModelCard = memo(ModelCardComponent);
