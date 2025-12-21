"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  className?: string;
  onClick?: () => void;
  targetId?: string;
}

export const ScrollIndicator = ({ 
  className = "", 
  onClick,
  targetId 
}: ScrollIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling down a bit
      if (window.scrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Default: scroll down by viewport height
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 ${className}`}
    >
      <motion.button
        onClick={handleClick}
        className="flex flex-col items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-3"
        aria-label="Scroll down to see more content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, duration: 0.4, ease: "easeOut" }}
      >
        {/* Container with backdrop blur and shadow for better visibility */}
        <div className="flex flex-col items-center gap-3 px-4 py-3 rounded-full bg-slate-900/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-700/50 shadow-2xl group-hover:bg-slate-900/90 dark:group-hover:bg-slate-950/95 group-hover:border-slate-600/70 transition-all duration-300">
          {/* Multiple chevrons for a more natural arrow effect */}
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Top chevron - smaller and lighter */}
            <motion.div
              animate={{
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            >
              <ChevronDown 
                className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                strokeWidth={2.5}
              />
            </motion.div>
            
            {/* Middle chevron - main arrow */}
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <ChevronDown 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-300" 
                strokeWidth={3}
              />
            </motion.div>
            
            {/* Bottom chevron - smaller and fades out */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <ChevronDown 
                className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                strokeWidth={2}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
};

