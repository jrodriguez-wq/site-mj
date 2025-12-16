"use client";

import { useTranslation } from "@/hooks/use-translation";

export const InfiniteTextCarousel = () => {
  const { t } = useTranslation();
  const message = t("carousel.message");

  // Duplicar el mensaje varias veces para efecto infinito suave
  const duplicatedMessage = `${message} • `.repeat(8);

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-primary/5 border-y-2 border-primary/20 overflow-hidden relative flex items-center justify-center">
      <div className="relative w-full h-[80px] sm:h-[100px] md:h-[120px] text-center flex items-center justify-center">
        <div className="flex items-center gap-0">
          <div className="flex animate-scroll-left whitespace-nowrap shrink-0">
            <span
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-primary tracking-wide"
              suppressHydrationWarning
            >
              {duplicatedMessage}
            </span>
          </div>
          <div className="flex animate-scroll-left whitespace-nowrap shrink-0">
            <span
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-primary tracking-wide"
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

