import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "es";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translations = Record<string, any>;

interface LanguageState {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  isLoading: boolean;
}

const loadTranslations = async (lang: Language): Promise<Translations> => {
  try {
    if (lang === "es") {
      const data = await import("@/locales/es.json");
      return (data.default || data) as Translations;
    } else {
      const data = await import("@/locales/en.json");
      return (data.default || data) as Translations;
    }
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    return {};
  }
};

const getTranslation = (translations: Translations, key: string): string => {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object") {
      // Si es un array y la clave es un número, acceder por índice
      if (Array.isArray(value)) {
        const index = parseInt(k, 10);
        if (!isNaN(index) && index >= 0 && index < value.length) {
          value = value[index];
        } else {
          return key;
        }
      } else if (k in value) {
        value = value[k] as string | Translations;
      } else {
        return key;
      }
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
};

const initialState: Omit<LanguageState, "setLanguage" | "t"> = {
  language: "en",
  translations: {},
  isLoading: true,
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLanguage: async (lang: Language) => {
        set({ isLoading: true });
        const translations = await loadTranslations(lang);
        set({ language: lang, translations, isLoading: false });
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang;
        }
      },

      t: (key: string) => {
        const { translations, isLoading, language } = get();
        // Si no hay traducciones y no está cargando, cargar inglés por defecto inmediatamente
        if (Object.keys(translations).length === 0 && !isLoading) {
          const defaultLang = language || "en";
          // Cargar traducciones de forma síncrona si es posible
          set({ isLoading: true });
          loadTranslations(defaultLang)
            .then((loadedTranslations) => {
              set({ translations: loadedTranslations, isLoading: false, language: defaultLang });
              if (typeof document !== "undefined") {
                document.documentElement.lang = defaultLang;
              }
            })
            .catch((err) => {
              console.error("Error loading translations:", err);
              // Si falla, intentar cargar inglés
              if (defaultLang !== "en") {
                return loadTranslations("en").then((enTranslations) => {
                  set({ translations: enTranslations, isLoading: false, language: "en" });
                  if (typeof document !== "undefined") {
                    document.documentElement.lang = "en";
                  }
                });
              }
              set({ isLoading: false });
            });
          // Mientras carga, devolver la clave (se actualizará cuando cargue)
          return key;
        }
        // Si están cargando o no hay traducciones, devolver la clave
        if (isLoading || Object.keys(translations).length === 0) {
          return key;
        }
        return getTranslation(translations, key);
      },
    }),
    {
      name: "language-storage",
      partialize: (state) => ({ language: state.language }),
      onRehydrateStorage: () => {
        // Cargar traducciones inmediatamente durante la hidratación
        return async (state, error) => {
          if (error) {
            console.error("Error rehydrating language store:", error);
            // Aún así, cargar inglés por defecto
            try {
              const translations = await loadTranslations("en");
              useLanguageStore.setState({ language: "en", translations, isLoading: false });
              if (typeof document !== "undefined") {
                document.documentElement.lang = "en";
              }
            } catch (err) {
              console.error("Error loading default translations:", err);
            }
            return;
          }
          
          // Determinar el idioma a cargar
          const lang = state?.language || "en";
          
          try {
            // Cargar traducciones inmediatamente
            const translations = await loadTranslations(lang);
            
            // Actualizar el estado
            if (state) {
              state.translations = translations;
              state.isLoading = false;
            }
            
            // Forzar actualización del store
            useLanguageStore.setState({ 
              language: lang, 
              translations, 
              isLoading: false 
            });
            
            // Actualizar el atributo lang del documento
            if (typeof document !== "undefined") {
              document.documentElement.lang = lang;
            }
          } catch (err) {
            console.error("Error loading translations during rehydration:", err);
            // Si falla, intentar cargar inglés por defecto
            try {
              const defaultTranslations = await loadTranslations("en");
              useLanguageStore.setState({ 
                language: "en", 
                translations: defaultTranslations, 
                isLoading: false 
              });
              if (typeof document !== "undefined") {
                document.documentElement.lang = "en";
              }
              if (state) {
                state.translations = defaultTranslations;
                state.language = "en";
                state.isLoading = false;
              }
            } catch (defaultErr) {
              console.error("Error loading default translations:", defaultErr);
              if (state) {
                state.isLoading = false;
              }
              useLanguageStore.setState({ isLoading: false });
            }
          }
        };
      },
      // Asegurar que las traducciones se carguen rápidamente
      skipHydration: false,
    }
  )
);

