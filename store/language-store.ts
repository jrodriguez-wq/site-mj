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

// Cache para traducciones cargadas (evita recargar si ya están en memoria)
const translationsCache: Record<Language, Translations | null> = {
  en: null,
  es: null,
};

const loadTranslations = async (lang: Language): Promise<Translations> => {
  // Si ya están en cache, devolverlas inmediatamente
  if (translationsCache[lang]) {
    return translationsCache[lang]!;
  }

  try {
    let data: Translations;
    if (lang === "es") {
      const esModule = await import("@/locales/es.json");
      data = (esModule.default || esModule) as Translations;
    } else {
      const enModule = await import("@/locales/en.json");
      data = (enModule.default || enModule) as Translations;
    }
    
    // Guardar en cache
    translationsCache[lang] = data;
    return data;
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    // Si falla, intentar devolver inglés desde cache si está disponible
    if (lang !== "en" && translationsCache.en) {
      return translationsCache.en;
    }
    return {};
  }
};

// Pre-cargar traducciones en inglés inmediatamente (síncrono si es posible)
const preloadEnglishTranslations = async (): Promise<Translations> => {
  if (translationsCache.en) {
    return translationsCache.en;
  }
  return loadTranslations("en");
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

// Pre-cargar inglés inmediatamente al importar el módulo
let defaultTranslations: Translations = {};
if (typeof window !== "undefined") {
  // En el cliente, pre-cargar de forma asíncrona
  preloadEnglishTranslations().then((translations) => {
    defaultTranslations = translations;
  });
}

const initialState: Omit<LanguageState, "setLanguage" | "t"> = {
  language: "en",
  translations: defaultTranslations,
  isLoading: false,
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
        const { translations } = get();
        
        // Si hay traducciones disponibles, usarlas
        if (Object.keys(translations).length > 0) {
          return getTranslation(translations, key);
        }
        
        // Si no hay traducciones, devolver la clave (no cargar aquí para evitar loops)
        // La carga se maneja en LanguageProvider y onRehydrateStorage
        return key;
      },
    }),
    {
      name: "language-storage",
      // Guardar tanto el idioma como las traducciones en localStorage
      partialize: (state) => ({ 
        language: state.language,
        // Guardar traducciones también para acceso rápido
        translations: state.translations,
      }),
      onRehydrateStorage: () => {
        // Cargar traducciones durante la rehidratación para que estén disponibles inmediatamente
        return async (state) => {
          if (typeof document === "undefined") return;
          
          const lang = state?.language || "en";
          
          // Actualizar el lang del documento
          document.documentElement.lang = lang;
          
          // Si no hay traducciones en el estado rehidratado, cargarlas
          if (!state?.translations || Object.keys(state.translations).length === 0) {
            try {
              const translations = await loadTranslations(lang);
              useLanguageStore.setState({ 
                translations, 
                language: lang,
                isLoading: false 
              });
            } catch (err) {
              console.error("Error loading translations during rehydration:", err);
              // Si falla, cargar inglés por defecto
              try {
                const enTranslations = await loadTranslations("en");
                useLanguageStore.setState({ 
                  translations: enTranslations, 
                  language: "en",
                  isLoading: false 
                });
                document.documentElement.lang = "en";
              } catch (defaultErr) {
                console.error("Error loading default translations:", defaultErr);
                useLanguageStore.setState({ isLoading: false });
              }
            }
          }
        };
      },
      skipHydration: false,
    }
  )
);

