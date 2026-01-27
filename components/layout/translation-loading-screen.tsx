"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TranslationLoadingScreenProps {
  isLoading: boolean;
  hasValidTranslations: boolean;
}

/** Retraso antes de mostrar el loader para dar tiempo a rehidratar desde localStorage */
const SHOW_DELAY_MS = 120;

export function TranslationLoadingScreen({
  isLoading,
  hasValidTranslations,
}: TranslationLoadingScreenProps) {
  const shouldNeedLoad = isLoading || !hasValidTranslations;
  const [canShow, setCanShow] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const prevShouldShowRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Solo mostrar tras un breve delay: si ya hay traducciones en cache, no mostramos nada
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (shouldNeedLoad && !canShow) {
      showDelayRef.current = setTimeout(() => {
        setCanShow(true);
      }, SHOW_DELAY_MS);
    } else {
      if (showDelayRef.current) {
        clearTimeout(showDelayRef.current);
        showDelayRef.current = null;
      }
    }

    return () => {
      if (showDelayRef.current) {
        clearTimeout(showDelayRef.current);
        showDelayRef.current = null;
      }
    };
  }, [shouldNeedLoad, canShow]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const prev = prevShouldShowRef.current;
    const actuallyShowing = shouldNeedLoad && canShow;

    if (prev && !actuallyShowing) {
      requestAnimationFrame(() => {
        setIsExiting(true);
        timeoutRef.current = setTimeout(() => {
          setIsExiting(false);
        }, 400);
      });
    } else if (!prev && actuallyShowing) {
      requestAnimationFrame(() => setIsExiting(false));
    }

    prevShouldShowRef.current = actuallyShowing;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldNeedLoad, canShow]);

  const visible = (shouldNeedLoad && canShow) || isExiting;
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-white dark:bg-slate-950",
        "transition-all duration-400 ease-out",
        isExiting
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading M.J. Newell Homes"
    >
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        {/* Logo M.J. Newell Homes */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex-shrink-0">
          <Image
            src="/img/logo.svg"
            alt="M.J. Newell Homes"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
          />
        </div>

        {/* Spinner + texto */}
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
