"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeVideoProps {
  url: string;
  title?: string;
  className?: string;
  onPlayingChange?: (isPlaying: boolean) => void;
}

// Convierte URL de YouTube a formato embed
const getEmbedUrl = (url: string, autoplay: boolean = false): string => {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : url;
  return `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1&rel=0&modestbranding=1" : ""}`;
};

// Obtiene el ID del video
const getVideoId = (url: string): string => {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return videoIdMatch ? videoIdMatch[1] : url;
};

export const YouTubeVideo = ({
  url,
  title,
  className,
  onPlayingChange,
}: YouTubeVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getVideoId(url);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = getEmbedUrl(url, true);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlayingChange?.(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    onPlayingChange?.(false);
  };

  // Usar valores consistentes para evitar errores de hidratación
  const displayTitle = title || "Video";
  const ariaLabel = `Play ${displayTitle} video`;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)} suppressHydrationWarning>
      {!isPlaying ? (
        // Thumbnail con botón de play
        <div
          className="relative group cursor-pointer aspect-video w-full bg-muted overflow-hidden"
          onClick={handlePlay}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePlay();
            }
          }}
          aria-label={ariaLabel}
          suppressHydrationWarning
        >
          <img
            src={thumbnailUrl}
            alt={`${displayTitle} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
          
          {/* Botón de Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 bg-primary/90 rounded-full group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
        </div>
      ) : (
        // Video embebido directamente en la card
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group/video">
          <button
            onClick={handleStop}
            className="absolute top-2 right-2 z-10 rounded-full bg-black/80 backdrop-blur-sm p-2 text-white hover:bg-black transition-all hover:scale-110 opacity-0 group-hover/video:opacity-100"
            aria-label="Close video"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
          <iframe
            src={embedUrl}
            title={`${displayTitle} video player`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
            frameBorder="0"
            suppressHydrationWarning
          />
        </div>
      )}
    </div>
  );
};
