"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const HolidayOverlay = () => {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[150]",
        "bg-gradient-to-b from-black/80 via-black/70 to-black/80",
        "backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
    />
  );
};
