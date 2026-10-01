"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  delay?: number;
  className?: string;
}

/**
 * AnimatedCard — fade-in + lift on hover, CSS only.
 *
 * The previous version used framer-motion but had a bug:
 * both animate branches were identical {opacity:1, y:0, scale:1},
 * meaning the entrance animation never ran — but framer-motion
 * was still fully bundled. Replaced with CSS for zero JS cost.
 *
 * Hover lift (y: -4px, scale: 1.01) is done via CSS class to run
 * on the compositor thread, avoiding layout recalculations.
 */
export const AnimatedCard = ({
  children,
  index = 0,
  delay = 0,
  className = "",
}: AnimatedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
      { rootMargin: "0px 0px -20px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalDelay = ((delay + index * 30) / 1000).toFixed(2);

  return (
    <div
      ref={ref}
      className={[
        "transition-[transform] duration-150 ease-out",
        "hover:-translate-y-1 hover:scale-[1.01]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(18px)",
        transition: visible
          ? `opacity 0.25s ease ${totalDelay}s, transform 0.25s ease ${totalDelay}s`
          : "none",
      }}
    >
      {children}
    </div>
  );
};
