"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TranslationLoadingScreenProps {
  isLoading: boolean;
  hasValidTranslations: boolean;
  /** true cuando el contenido traducido ya se está mostrando (no mostrar overlay) */
  isContentReady?: boolean;
}

export function TranslationLoadingScreen({
  isLoading,
  hasValidTranslations,
  isContentReady = false,
}: TranslationLoadingScreenProps) {
  const shouldShow = !isContentReady && (isLoading || !hasValidTranslations);
  const [isExiting, setIsExiting] = useState(false);
  const prevShouldShowRef = useRef(shouldShow);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const prev = prevShouldShowRef.current;

    if (prev && !shouldShow) {
      requestAnimationFrame(() => {
        setIsExiting(true);
        timeoutRef.current = setTimeout(() => setIsExiting(false), 400);
      });
    } else if (!prev && shouldShow) {
      requestAnimationFrame(() => setIsExiting(false));
    }

    prevShouldShowRef.current = shouldShow;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldShow]);

  if (!shouldShow && !isExiting) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-white dark:bg-slate-950",
        "transition-all duration-400 ease-out",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading M.J. Newell Homes"
    >
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0">
          <Image
            src="/img/logo.svg"
            alt="M.J. Newell Homes"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-primary animate-spin"
            aria-hidden
          />
          <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading…
          </span>
        </div>
      </div>
    </div>
  );
}
