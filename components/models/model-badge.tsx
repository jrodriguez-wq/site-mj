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
      bg: "bg-yellow-500/20",
      text: "text-yellow-600 dark:text-yellow-400",
      border: "border-yellow-500/30",
    },
    bestseller: {
      icon: TrendingUp,
      bg: "bg-green-500/20",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-500/30",
    },
    satisfied: {
      icon: Users,
      bg: "bg-blue-500/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/30",
    },
  };

  const { icon: Icon, bg, text, border } = config[type];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm",
        bg,
        text,
        border,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      {count && <span className="font-bold">({count})</span>}
    </div>
  );
};

