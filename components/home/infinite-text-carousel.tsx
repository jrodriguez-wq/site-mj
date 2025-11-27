"use client";

import { useTranslation } from "@/hooks/use-translation";

export const InfiniteTextCarousel = () => {
  const { t } = useTranslation();
  const message = t("carousel.message");

  // Duplicar el mensaje varias veces para efecto infinito suave
  const duplicatedMessage = `${message} • `.repeat(8);

  return (
    <section className="py-8 md:py-12 bg-primary/5 border-y-2 border-primary/20 overflow-hidden relative flex items-center justify-center">
      <div className="relative w-full h-[120px] text-center flex items-center justify-center">
        <div className="flex items-center gap-0">
          <div className="flex animate-scroll-left whitespace-nowrap shrink-0">
            <span
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-primary tracking-wide"
              suppressHydrationWarning
            >
              {duplicatedMessage}
            </span>
          </div>
          <div className="flex animate-scroll-left whitespace-nowrap shrink-0">
            <span
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-primary tracking-wide"
              suppressHydrationWarning
            >
              {duplicatedMessage}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

