"use client";

import { useTranslation } from "@/hooks/use-translation";

export const InfiniteTextCarousel = () => {
  const { t } = useTranslation();
  const message = t("carousel.message");

  // Duplicar el mensaje varias veces para efecto infinito suave
  const duplicatedMessage = `${message} • `.repeat(8);

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-primary/5 border-y-2 border-primary/20 overflow-hidden items-center justify-center relative">
      <div className="relative w-full min-h-[60px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-center justify-center">
        <div className="flex items-center justify-center gap-0 w-full overflow-hidden">
          <div className="flex items-center animate-scroll-left whitespace-nowrap shrink-0">
            <span
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-primary tracking-wide leading-none"
              suppressHydrationWarning
            >
              {duplicatedMessage}
            </span>
          </div>
          <div className="flex items-center animate-scroll-left whitespace-nowrap shrink-0">
            <span
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-primary tracking-wide leading-none"
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

