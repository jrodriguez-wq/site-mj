"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Bed, Bath, Square, Car, Eye, Heart, Share2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModelBadge } from "./model-badge";

export interface ModelCardProps {
  modelKey: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: string;
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
}

export const ModelCard = (props: ModelCardProps) => {
  const {
    modelKey,
    name,
    description,
    image,
    images,
    price,
    beds,
    bedsLabel,
    baths,
    bathsLabel,
    sqft,
    sqftLabel,
    badges,
    satisfiedFamilies,
    viewDetailsLabel = "Ver más detalles",
    viewPhotosLabel,
    modelLabel = "Modelo",
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure modelKey is available in scope
  const modelLink = `/models/${modelKey}`;

  // Use all images if available, otherwise fallback to single image
  const displayImages = images.length > 0 ? images : [image];
  const hasMultipleImages = displayImages.length > 1;

  // Auto carousel
  useEffect(() => {
    if (!isGalleryOpen && hasMultipleImages) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isGalleryOpen, displayImages.length, hasMultipleImages]);

  const openGallery = () => {
    setIsGalleryOpen(true);
    setGalleryImageIndex(currentImageIndex);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const changeGalleryImage = (direction: number) => {
    setGalleryImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return displayImages.length - 1;
      if (newIndex >= displayImages.length) return 0;
      return newIndex;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <>
      {/* Main Card Container */}
      <div className="relative max-w-md w-full group">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

        <div className="relative bg-card/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          {/* Image Carousel */}
          <div className="relative h-72 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <div
              className={cn(
                "flex transition-transform duration-700 ease-out h-full",
                hasMultipleImages && "transform"
              )}
              style={
                hasMultipleImages
                  ? { transform: `translateX(-${currentImageIndex * 100}%)` }
                  : {}
              }
            >
              {displayImages.map((img, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <Image
                    src={img}
                    alt={`${name} - ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Top Actions Bar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
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

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border/50"
                  aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                  type="button"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isLiked ? "fill-red-500 text-red-500" : "text-foreground/70"
                    )}
                  />
                </button>
                <button
                  className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border/50"
                  aria-label="Share"
                  type="button"
                >
                  <Share2 className="w-5 h-5 text-foreground/70" />
                </button>
              </div>
            </div>

            {/* View Gallery Button */}
            {hasMultipleImages && (
              <button
                onClick={openGallery}
                onKeyDown={(e) => handleKeyDown(e, openGallery)}
                className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-background transition-colors border border-border/50 z-10"
                aria-label={`View ${displayImages.length} photos`}
                type="button"
              >
                <Eye className="w-4 h-4 text-foreground" />
                <span className="text-foreground text-sm font-medium">
                  {viewPhotosLabel || `Ver ${displayImages.length} fotos`}
                </span>
              </button>
            )}

            {/* Price Badge */}
            <div className="absolute top-16 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
              {price}
            </div>
          </div>

          {/* Property Info */}
          <div className="p-6 space-y-6">
            {/* Title and Location */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {name}
                </h2>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {modelLabel}
                </span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">{description}</p>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Bed, value: beds, label: bedsLabel },
                { icon: Bath, value: baths, label: bathsLabel },
                { icon: Square, value: sqft, label: sqftLabel },
                { icon: Car, value: "2", label: "Garajes" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-3 text-center hover:from-primary/10 hover:to-primary/20 transition-colors border border-border/50"
                  >
                    <div className="text-primary flex justify-center mb-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-bold text-foreground text-sm">{feature.value}</div>
                    <div className="text-xs text-muted-foreground">{feature.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Price and CTA */}
            <div className="flex items-end justify-between pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Precio desde</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {price}
                </p>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 group"
              >
                <Link href={modelLink}>
                  {viewDetailsLabel}
                  <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

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
            <div className="grid lg:grid-cols-2 h-full">
              {/* Left: Image Gallery */}
              <div className="relative bg-muted h-[400px] lg:h-auto">
                <div className="relative w-full h-full">
                  <Image
                    src={displayImages[galleryImageIndex]}
                    alt={`${name} - ${galleryImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Gallery Controls */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={() => changeGalleryImage(-1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                      aria-label="Previous image"
                      type="button"
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                    <button
                      onClick={() => changeGalleryImage(1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors border border-border z-10"
                      aria-label="Next image"
                      type="button"
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  </>
                )}

                {/* Thumbnail Strip */}
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
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                    <span className="text-foreground text-sm font-medium">
                      {galleryImageIndex + 1} / {displayImages.length}
                    </span>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={closeGallery}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors border border-border z-10"
                  aria-label="Close gallery"
                  type="button"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Right: Property Details */}
              <div className="p-8 lg:p-10 overflow-y-auto max-h-[90vh] lg:max-h-auto">
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
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Precio desde</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {price}
                    </p>
                  </div>
                </div>

                {/* Quick Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">Características</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Bed, value: beds, label: bedsLabel },
                      { icon: Bath, value: baths, label: bathsLabel },
                      { icon: Square, value: sqft, label: sqftLabel },
                      { icon: Car, value: "2", label: "Garajes" },
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
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 px-6 rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <Link href={modelLink} onClick={closeGallery}>
                      {viewDetailsLabel}
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
