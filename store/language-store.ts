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
        const { translations, isLoading, language } = get();
        
        // Si hay traducciones disponibles, usarlas
        if (Object.keys(translations).length > 0) {
          return getTranslation(translations, key);
        }
        
        // Si no hay traducciones y no está cargando, cargar inmediatamente
        if (!isLoading) {
          const defaultLang = language || "en";
          set({ isLoading: true });
          
          // Cargar traducciones de forma asíncrona
          loadTranslations(defaultLang)
            .then((loadedTranslations) => {
              set({ 
                translations: loadedTranslations, 
                isLoading: false, 
                language: defaultLang 
              });
              if (typeof document !== "undefined") {
                document.documentElement.lang = defaultLang;
              }
            })
            .catch((err) => {
              console.error("Error loading translations:", err);
              // Si falla, intentar cargar inglés
              if (defaultLang !== "en") {
                return loadTranslations("en").then((enTranslations) => {
                  set({ 
                    translations: enTranslations, 
                    isLoading: false, 
                    language: "en" 
                  });
                  if (typeof document !== "undefined") {
                    document.documentElement.lang = "en";
                  }
                });
              }
              set({ isLoading: false });
            });
        }
        
        // Mientras carga, devolver la clave temporalmente
        // Esto solo debería pasar en el primer render
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
        // Cargar traducciones inmediatamente durante la hidratación
        return async (state, error) => {
          if (error) {
            console.error("Error rehydrating language store:", error);
            // Aún así, cargar inglés por defecto
            try {
              const translations = await loadTranslations("en");
              useLanguageStore.setState({ 
                language: "en", 
                translations, 
                isLoading: false 
              });
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
          
          // Si ya hay traducciones guardadas en localStorage, usarlas
          if (state?.translations && Object.keys(state.translations).length > 0) {
            // Verificar que las traducciones sean válidas
            const hasValidTranslations = typeof state.translations === "object" && 
                                         state.translations !== null &&
                                         !Array.isArray(state.translations);
            
            if (hasValidTranslations) {
              useLanguageStore.setState({ 
                language: lang, 
                translations: state.translations, 
                isLoading: false 
              });
              if (typeof document !== "undefined") {
                document.documentElement.lang = lang;
              }
              return;
            }
          }
          
          // Si no hay traducciones guardadas, cargarlas
          try {
            const translations = await loadTranslations(lang);
            
            // Actualizar el estado
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
            } catch (defaultErr) {
              console.error("Error loading default translations:", defaultErr);
              useLanguageStore.setState({ isLoading: false });
            }
          }
        };
      },
      skipHydration: false,
    }
  )
);

// Inicializar traducciones en inglés inmediatamente en el cliente
if (typeof window !== "undefined") {
  // Pre-cargar inglés al iniciar
  preloadEnglishTranslations().then((translations) => {
    const currentState = useLanguageStore.getState();
    // Solo actualizar si no hay traducciones cargadas
    if (Object.keys(currentState.translations).length === 0) {
      useLanguageStore.setState({ 
        translations, 
        language: currentState.language || "en",
        isLoading: false 
      });
      if (typeof document !== "undefined") {
        document.documentElement.lang = currentState.language || "en";
      }
    }
  });
}

