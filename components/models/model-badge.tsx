"use client";

import { Star, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelBadgeProps {
  type: "favorite" | "bestseller" | "satisfied";
  label: string;
  count?: number;
  className?: string;
}

export const ModelBadge = ({ type, label, count, className }: ModelBadgeProps) => {
  const config = {
    favorite: {
      icon: Star,
      bg: "bg-white/95 dark:bg-gray-900/95",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200/80 dark:border-amber-700/50",
      shadow: "shadow-lg shadow-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    bestseller: {
      icon: TrendingUp,
      bg: "bg-white/95 dark:bg-gray-900/95",
      text: "text-rose-700 dark:text-rose-400",
      border: "border-rose-200/80 dark:border-rose-700/50",
      shadow: "shadow-lg shadow-rose-500/10",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    satisfied: {
      icon: Users,
      bg: "bg-white/95 dark:bg-gray-900/95",
      text: "text-violet-700 dark:text-violet-400",
      border: "border-violet-200/80 dark:border-violet-700/50",
      shadow: "shadow-lg shadow-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
  };

  const { icon: Icon, bg, text, border, shadow, iconColor } = config[type];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-md transition-all duration-200 hover:shadow-xl",
        bg,
        text,
        border,
        shadow,
        className
      )}
    >
      <Icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", iconColor)} />
      <span className="whitespace-nowrap">{label}</span>
      {count && <span className="font-bold ml-0.5 opacity-90">({count})</span>}
    </div>
  );
};

