"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/language-store";

export function LanguageProvider() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const translations = useLanguageStore((state) => state.translations);
  const isLoading = useLanguageStore((state) => state.isLoading);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const hasTranslations = Object.keys(translations).length > 0;
    
    if (!hasTranslations && !isLoading) {
      setLanguage(language).catch(console.error);
    }
    
    if (hasTranslations) {
      document.documentElement.lang = language;
    }
  }, [language, translations, isLoading, setLanguage]);

  return null;
}

