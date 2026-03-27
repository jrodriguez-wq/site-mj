"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before animation starts once visible */
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

/**
 * AnimatedSection — CSS-only entrance animation via IntersectionObserver.
 *
 * WHY no framer-motion here:
 * - framer-motion v12 is ~180 KiB gzipped when fully parsed
 * - This component wraps every section on the homepage (15+ instances)
 * - Simple fade+slide doesn't need a JS animation library
 * - CSS transitions run on the compositor thread (no main-thread work)
 * - IntersectionObserver is available in all browsers we support
 */
const TRANSFORM: Record<NonNullable<AnimatedSectionProps["direction"]>, string> = {
  up:    "translateY(28px)",
  down:  "translateY(-28px)",
  left:  "translateX(-28px)",
  right: "translateX(28px)",
  fade:  "none",
};

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in viewport on mount (above-fold content) — show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transform = TRANSFORM[direction];
  const delayS = (delay / 1000).toFixed(2);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible || transform === "none" ? "none" : transform,
        transition: visible
          ? `opacity 0.35s cubic-bezier(0.25,0.1,0.25,1) ${delayS}s, transform 0.35s cubic-bezier(0.25,0.1,0.25,1) ${delayS}s`
          : "none",
        // Respect prefers-reduced-motion
        ...(typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? { opacity: 1, transform: "none", transition: "none" }
          : {}),
      }}
    >
      {children}
    </div>
  );
};
