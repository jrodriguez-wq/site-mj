import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "es";
type Translations = Record<string, unknown>;

interface LanguageState {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  isLoading: boolean;
}

// Cache en memoria para acceso ultra-rápido (evita imports repetidos)
const translationsCache: Record<Language, Translations | null> = {
  en: null,
  es: null,
};

// Flag para prevenir múltiples cargas simultáneas
const loadingPromises: Record<Language, Promise<Translations> | null> = {
  en: null,
  es: null,
};

/**
 * Carga traducciones de forma optimizada con cache y prevención de duplicados
 */
const loadTranslations = async (lang: Language): Promise<Translations> => {
  // 1. Verificar cache en memoria (más rápido)
  if (translationsCache[lang]) {
    return translationsCache[lang]!;
  }

  // 2. Si ya hay una carga en progreso, reutilizar esa promesa
  if (loadingPromises[lang]) {
    return loadingPromises[lang]!;
  }

  // 3. Crear nueva promesa de carga
  const loadPromise = (async () => {
    try {
      // Dynamic import optimizado por Next.js
      const translationModule = lang === "es" 
        ? await import("@/locales/es.json")
        : await import("@/locales/en.json");
      
      const data = (translationModule.default || translationModule) as Translations;
      
      // Guardar en cache inmediatamente
      translationsCache[lang] = data;
      loadingPromises[lang] = null; // Limpiar promesa de carga
      
      return data;
    } catch (error) {
      console.error(`[LanguageStore] Error loading ${lang} translations:`, error);
      loadingPromises[lang] = null; // Limpiar promesa de carga en caso de error
      
      // Fallback: intentar inglés si falla otro idioma
      if (lang !== "en" && translationsCache.en) {
        return translationsCache.en;
      }
      
      // Último recurso: objeto vacío
      return {};
    }
  })();

  loadingPromises[lang] = loadPromise;
  return loadPromise;
};

/**
 * Función optimizada para obtener traducciones con path notation
 * Usa early returns y acceso directo para máximo rendimiento
 */
const getTranslation = (translations: Translations, key: string): string => {
  // Early return si no hay traducciones válidas
  if (!translations || typeof translations !== "object" || Array.isArray(translations)) {
    return key;
  }

  // Split una sola vez
  const keys = key.split(".");
  let current: unknown = translations;
  const keysLength = keys.length;

  // Loop optimizado con early returns
  for (let i = 0; i < keysLength; i++) {
    const k = keys[i];
    
    if (!current || typeof current !== "object") {
      return key;
    }

    // Manejo eficiente de arrays
    if (Array.isArray(current)) {
      const index = Number.parseInt(k, 10);
      if (Number.isNaN(index) || index < 0 || index >= current.length) {
        return key;
      }
      current = current[index];
      continue;
    }

    // Acceso directo a objeto
    if (k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  // Retornar string o clave si no es string
  return typeof current === "string" ? current : key;
};

/**
 * Verifica si las traducciones son válidas
 */
const isValidTranslations = (translations: unknown): translations is Translations => {
  return (
    translations !== null &&
    translations !== undefined &&
    typeof translations === "object" &&
    !Array.isArray(translations) &&
    Object.keys(translations).length > 0
  );
};

const initialState: Omit<LanguageState, "setLanguage" | "t"> = {
  language: "en",
  translations: {}, // Se llenará en onRehydrateStorage
  isLoading: false,
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Cambia el idioma y carga las traducciones
       * Optimizado para evitar cargas duplicadas
       */
      setLanguage: async (lang: Language) => {
        const currentState = get();
        
        // Si ya está cargando ese idioma o ya lo tiene cargado, no hacer nada
        if (currentState.language === lang && isValidTranslations(currentState.translations)) {
          return;
        }

        set({ isLoading: true });

        try {
          const translations = await loadTranslations(lang);
          
          set({ 
            language: lang, 
            translations, 
            isLoading: false 
          });

          // Actualizar atributo lang del documento
          if (typeof document !== "undefined") {
            document.documentElement.lang = lang;
          }
        } catch (error) {
          console.error(`[LanguageStore] Error setting language to ${lang}:`, error);
          set({ isLoading: false });
          
          // Fallback a inglés si falla
          if (lang !== "en") {
            try {
              const enTranslations = await loadTranslations("en");
              set({ 
                language: "en", 
                translations: enTranslations, 
                isLoading: false 
              });
              if (typeof document !== "undefined") {
                document.documentElement.lang = "en";
              }
            } catch (fallbackError) {
              console.error("[LanguageStore] Fallback to English failed:", fallbackError);
              set({ isLoading: false });
            }
          }
        }
      },

      /**
       * Función de traducción optimizada
       * Acceso directo al cache para máximo rendimiento
       */
      t: (key: string): string => {
        const { translations } = get();
        
        // Early return con validación optimizada
        if (isValidTranslations(translations)) {
          return getTranslation(translations, key);
        }
        
        // Si no hay traducciones, devolver la clave
        return key;
      },
    }),
    {
      name: "language-storage",
      
      /**
       * Guarda solo lo esencial para reducir tamaño de localStorage
       * Siempre guarda traducciones válidas para disponibilidad inmediata en próxima carga
       */
      partialize: (state) => {
        // Si hay traducciones válidas, guardarlas
        if (isValidTranslations(state.translations)) {
          return {
            language: state.language,
            translations: state.translations,
          };
        }
        
        // Si no hay traducciones pero inglés está en cache, guardarlo como fallback
        if (translationsCache.en) {
          return {
            language: "en",
            translations: translationsCache.en,
          };
        }
        
        // Último recurso: solo guardar idioma
        return {
          language: state.language || "en",
          translations: {},
        };
      },

      /**
       * Rehidratación optimizada: carga traducciones inmediatamente
       * Asegura que inglés esté disponible por defecto en la primera carga
       * Esta función se ejecuta ANTES del primer render, así que es crítico que funcione
       */
      onRehydrateStorage: () => {
        return (state) => {
          // Solo ejecutar en cliente
          if (typeof window === "undefined") return;

          // Determinar idioma: usar el de localStorage o inglés por defecto
          const lang = (state?.language as Language) || "en";
          
          // Actualizar lang del documento inmediatamente
          document.documentElement.lang = lang;

          // Verificar si hay traducciones válidas desde localStorage
          if (state?.translations && isValidTranslations(state.translations)) {
            // Sincronizar cache en memoria
            if (!translationsCache[lang]) {
              translationsCache[lang] = state.translations;
            }
            
            // El estado ya tiene traducciones válidas, todo listo
            // IMPORTANTE: El estado ya está rehidratado con las traducciones
            return;
          }

          // Si no hay traducciones válidas, cargar INMEDIATAMENTE de forma síncrona si es posible
          // Priorizar inglés para primera carga
          const targetLang = lang === "en" || !state?.language ? "en" : lang;
          
          // Intentar cargar traducciones de forma asíncrona pero lo más rápido posible
          loadTranslations(targetLang)
            .then((translations) => {
              // Actualizar estado con traducciones cargadas
              useLanguageStore.setState({
                translations,
                language: targetLang,
                isLoading: false,
              });
              
              // Actualizar lang del documento
              document.documentElement.lang = targetLang;
            })
            .catch((error) => {
              console.error("[LanguageStore] Error loading translations during rehydration:", error);
              
              // Fallback: cargar inglés por defecto (siempre debe funcionar)
              loadTranslations("en")
                .then((enTranslations) => {
                  useLanguageStore.setState({
                    translations: enTranslations,
                    language: "en",
                    isLoading: false,
                  });
                  document.documentElement.lang = "en";
                })
                .catch((fallbackError) => {
                  console.error("[LanguageStore] Fallback to English failed during rehydration:", fallbackError);
                  useLanguageStore.setState({ isLoading: false });
                });
            });
        };
      },
      
      skipHydration: false,
    }
  )
);

/**
 * Pre-carga agresiva de inglés para disponibilidad inmediata
 * Se ejecuta cuando el módulo se carga (antes del primer render)
 */
if (typeof window !== "undefined") {
  // Verificar si ya hay traducciones en localStorage y cargarlas inmediatamente
  try {
    const stored = localStorage.getItem("language-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.state?.translations && isValidTranslations(parsed.state.translations)) {
        // Sincronizar cache inmediatamente
        const lang = parsed.state.language || "en";
        translationsCache[lang as Language] = parsed.state.translations;
      }
    }
  } catch (error) {
    // Continuar con precarga asíncrona si hay error
  }
  
  // Precargar inglés inmediatamente y guardar en cache
  // Esto asegura que esté disponible antes de cualquier render
  loadTranslations("en")
    .then((translations) => {
      // Asegurar que el cache esté poblado
      translationsCache.en = translations;
      
      // Si el store aún no tiene traducciones válidas, inicializarlo con inglés
      const currentState = useLanguageStore.getState();
      if (!isValidTranslations(currentState.translations)) {
        useLanguageStore.setState({
          translations,
          language: "en",
          isLoading: false,
        });
        document.documentElement.lang = "en";
      }
    })
    .catch(() => {
      // Silenciar error, se intentará cargar nuevamente cuando se necesite
      // El error ya se maneja en loadTranslations
    });
}
