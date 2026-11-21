"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { ModelSheet } from "@/lib/models/model-images";

interface ModelPlanSheetProps {
  sheet: ModelSheet;
  name: string;
}

export const ModelPlanSheet = ({ sheet, name }: ModelPlanSheetProps) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <section aria-labelledby="plan-sheet-title" className="mt-8 sm:mt-10 md:mt-12">
      <div className="mb-4 sm:mb-6 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Model sheet
        </p>
        <h2
          id="plan-sheet-title"
          className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
        >
          Elevation and 3D floor plan
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {name} from the street, with the furnished layout drawn in three dimensions.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full rounded-2xl border border-border bg-muted/40 p-3 sm:p-6 md:p-8 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`Enlarge the ${name} elevation and 3D floor plan`}
      >
        <span
          className="relative mx-auto block w-full max-w-3xl"
          style={{ aspectRatio: `${sheet.width} / ${sheet.height}` }}
        >
          <Image
            src={sheet.src}
            alt={`${name} front elevation and furnished 3D floor plan`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
            loading="eager"
          />
        </span>
        <span className="mt-3 block text-center text-sm font-semibold text-primary">
          Tap to enlarge
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-3 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} elevation and 3D floor plan`}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg"
            aria-label="Close floor plan"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[92vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={sheet.src}
              alt={`${name} front elevation and furnished 3D floor plan, enlarged`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
};
