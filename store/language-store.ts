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
 * Versión del schema de traducciones - incrementar cuando cambie la estructura
 * Esto permite invalidar cache antiguo automáticamente
 */
const TRANSLATIONS_VERSION = "2.0.0";

/**
 * Verifica si las traducciones son válidas y completas
 */
const isValidTranslations = (translations: unknown): translations is Translations => {
  if (
    !translations ||
    translations === null ||
    translations === undefined ||
    typeof translations !== "object" ||
    Array.isArray(translations)
  ) {
    return false;
  }

  const keys = Object.keys(translations);

  // Debe tener al menos algunas claves básicas
  if (keys.length === 0) {
    return false;
  }

  // Verificar que tenga claves esenciales (home, nav, etc.)
  const essentialKeys = ["home", "nav", "faq", "privacyPolicy", "termsConditions"];
  const hasEssentialKeys = essentialKeys.some(key => key in translations);

  if (!hasEssentialKeys) {
    return false;
  }

  // Verificar que no sea un objeto vacío o corrupto
  // Si todas las claves tienen valores vacíos o son objetos vacíos, es inválido
  let hasValidContent = false;
  for (const key of keys.slice(0, 10)) { // Verificar solo las primeras 10 claves para performance
    const value = (translations as Record<string, unknown>)[key];
    if (value && typeof value === "object" && Object.keys(value).length > 0) {
      hasValidContent = true;
      break;
    }
    if (typeof value === "string" && value.length > 0) {
      hasValidContent = true;
      break;
    }
  }

  return hasValidContent;
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

        // Si ya está cargando ese idioma o ya lo tiene cargado Y es válido, no hacer nada
        if (currentState.language === lang && isValidTranslations(currentState.translations)) {
          // Verificar que las traducciones no estén corruptas
          const testKey = lang === "en" ? "home.title" : "home.title";
          const testTranslation = getTranslation(currentState.translations, testKey);
          if (testTranslation !== testKey) {
            // Las traducciones funcionan correctamente
            return;
          }
          // Si las traducciones no funcionan, forzar recarga
          console.warn(`[LanguageStore] Translations for ${lang} appear corrupted, forcing reload...`);
        }

        set({ isLoading: true });

        try {
          const translations = await loadTranslations(lang);

          // Verificar que las traducciones cargadas sean válidas
          if (!isValidTranslations(translations)) {
            console.error(`[LanguageStore] Loaded translations for ${lang} are invalid`);
            throw new Error(`Invalid translations for ${lang}`);
          }

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
              if (isValidTranslations(enTranslations)) {
                set({
                  language: "en",
                  translations: enTranslations,
                  isLoading: false
                });
                if (typeof document !== "undefined") {
                  document.documentElement.lang = "en";
                }
              } else {
                throw new Error("English translations are also invalid");
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
        // Si hay traducciones válidas, guardarlas con versión
        if (isValidTranslations(state.translations)) {
          return {
            _version: TRANSLATIONS_VERSION,
            language: state.language,
            translations: state.translations,
          };
        }

        // Si no hay traducciones pero inglés está en cache, guardarlo como fallback
        if (translationsCache.en && isValidTranslations(translationsCache.en)) {
          return {
            _version: TRANSLATIONS_VERSION,
            language: "en",
            translations: translationsCache.en,
          };
        }

        // Último recurso: solo guardar idioma (sin traducciones corruptas)
        return {
          _version: TRANSLATIONS_VERSION,
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

          // Verificar versión del cache - si es antigua, limpiar y recargar
          const storedVersion = (state as unknown as { _version?: string })?._version;
          let shouldReload = false;

          if (storedVersion !== TRANSLATIONS_VERSION) {
            console.warn("[LanguageStore] Cache version mismatch, clearing and reloading...");
            // Limpiar cache corrupto
            if (typeof window !== "undefined") {
              try {
                localStorage.removeItem("language-storage");
              } catch (e) {
                console.error("[LanguageStore] Error clearing cache:", e);
              }
            }
            // Forzar recarga
            shouldReload = true;
            state = undefined;
          }

          // Determinar idioma: usar el de localStorage o inglés por defecto
          const lang = (state?.language as Language) || "en";

          // Actualizar lang del documento inmediatamente
          document.documentElement.lang = lang;

          // Verificar si hay traducciones válidas desde localStorage
          if (state?.translations && isValidTranslations(state.translations) && !shouldReload) {
            // Sincronizar cache en memoria
            if (!translationsCache[lang]) {
              translationsCache[lang] = state.translations;
            }

            // El estado ya tiene traducciones válidas, todo listo
            // IMPORTANTE: El estado ya está rehidratado con las traducciones
            return;
          }

          // Si no hay traducciones válidas o están corruptas, limpiar y recargar
          if (!state?.translations || !isValidTranslations(state.translations) || shouldReload) {
            console.warn("[LanguageStore] Invalid or missing translations, reloading...");

            // Limpiar traducciones corruptas del estado
            useLanguageStore.setState({
              translations: {},
              isLoading: true,
            });
          }

          // Si no hay traducciones válidas, cargar INMEDIATAMENTE de forma síncrona si es posible
          // Priorizar inglés para primera carga
          const targetLang = lang === "en" || !state?.language ? "en" : lang;

          // Intentar cargar traducciones de forma asíncrona pero lo más rápido posible
          loadTranslations(targetLang)
            .then((translations) => {
              // Verificar que las traducciones cargadas sean válidas
              if (!isValidTranslations(translations)) {
                console.error("[LanguageStore] Loaded translations are invalid, forcing English reload");
                return loadTranslations("en");
              }
              return translations;
            })
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

      // Verificar versión del cache
      const storedVersion = parsed?.state?._version;
      if (storedVersion !== TRANSLATIONS_VERSION) {
        // Versión antigua, limpiar cache
        console.warn("[LanguageStore] Old cache version detected, clearing...");
        localStorage.removeItem("language-storage");
      } else if (parsed?.state?.translations && isValidTranslations(parsed.state.translations)) {
        // Sincronizar cache inmediatamente solo si es válido
        const lang = parsed.state.language || "en";
        translationsCache[lang as Language] = parsed.state.translations;
      } else {
        // Traducciones corruptas, limpiar
        console.warn("[LanguageStore] Corrupted translations detected, clearing cache...");
        localStorage.removeItem("language-storage");
      }
    }
  } catch (error) {
    // Error al parsear, limpiar cache corrupto
    console.error("[LanguageStore] Error parsing cache, clearing...", error);
    try {
      localStorage.removeItem("language-storage");
    } catch (e) {
      // Ignorar errores al limpiar
    }
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
