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
// También expuesto en window para precarga desde script inline
const translationsCache: Record<Language, Translations | null> = {
  en: null,
  es: null,
};

// Exponer cache en window para precarga desde script inline
if (typeof window !== "undefined") {
  (window as unknown as { __TRANSLATIONS_CACHE__?: typeof translationsCache }).__TRANSLATIONS_CACHE__ = translationsCache;
}

// Flag para prevenir múltiples cargas simultáneas
const loadingPromises: Record<Language, Promise<Translations> | null> = {
  en: null,
  es: null,
};

/**
 * Carga traducciones de forma optimizada con cache y prevención de duplicados
 * PRIORIDAD: Cargar inglés de forma inmediata para primera carga
 */
const loadTranslations = async (lang: Language): Promise<Translations> => {
  // 1. Verificar cache en memoria (más rápido)
  if (translationsCache[lang]) {
    return translationsCache[lang]!;
  }

  // 1.5. Verificar si hay traducciones precargadas desde script inline
  if (typeof window !== "undefined") {
    const precached = (window as unknown as { __TRANSLATIONS_CACHE__?: typeof translationsCache }).__TRANSLATIONS_CACHE__;
    if (precached?.[lang] && isValidTranslations(precached[lang])) {
      translationsCache[lang] = precached[lang];
      return precached[lang]!;
    }
  }

  // 2. Si ya hay una carga en progreso, reutilizar esa promesa
  if (loadingPromises[lang]) {
    return loadingPromises[lang]!;
  }

  // 3. Crear nueva promesa de carga
  const loadPromise = (async () => {
    try {
      // Dynamic import optimizado por Next.js
      // Para inglés, usar import() con prioridad alta
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
const TRANSLATIONS_VERSION = "2.1.0";

/**
 * Claves esenciales que deben existir en las traducciones
 * Si alguna de estas claves falta, las traducciones se consideran incompletas
 */
const ESSENTIAL_KEYS = [
  "home",
  "nav",
  "faq",
  "privacyPolicy",
  "termsConditions",
  "rentToOwn",
] as const;

/**
 * Claves específicas dentro de secciones importantes que deben existir
 * Esto ayuda a detectar traducciones parcialmente cargadas o corruptas
 */
const REQUIRED_NESTED_KEYS = [
  "rentToOwn.form",
  "rentToOwn.hero",
  "rentToOwn.cta",
] as const;

/**
 * Verifica si las traducciones son válidas y completas
 * Ahora incluye verificación de claves anidadas para detectar traducciones incompletas
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

  // Verificar que tenga TODAS las claves esenciales (no solo algunas)
  const hasAllEssentialKeys = ESSENTIAL_KEYS.every(key => key in translations);

  if (!hasAllEssentialKeys) {
    console.warn("[LanguageStore] Missing essential keys:", 
      ESSENTIAL_KEYS.filter(key => !(key in translations))
    );
    return false;
  }

  // Verificar claves anidadas importantes
  const translationsObj = translations as Record<string, unknown>;
  for (const nestedKey of REQUIRED_NESTED_KEYS) {
    const keyParts = nestedKey.split(".");
    let current: unknown = translationsObj;
    
    for (const part of keyParts) {
      if (!current || typeof current !== "object" || Array.isArray(current)) {
        console.warn(`[LanguageStore] Missing nested key: ${nestedKey}`);
        return false;
      }
      current = (current as Record<string, unknown>)[part];
    }
    
    // Verificar que el valor final no esté vacío
    if (!current || (typeof current === "object" && Object.keys(current).length === 0)) {
      console.warn(`[LanguageStore] Empty nested key: ${nestedKey}`);
      return false;
    }
  }

  // Verificar que no sea un objeto vacío o corrupto
  // Si todas las claves tienen valores vacíos o son objetos vacíos, es inválido
  let hasValidContent = false;
  for (const key of keys.slice(0, 10)) { // Verificar solo las primeras 10 claves para performance
    const value = translationsObj[key];
    if (value && typeof value === "object" && Object.keys(value).length > 0) {
      hasValidContent = true;
      break;
    }
    if (typeof value === "string" && value.length > 0) {
      hasValidContent = true;
      break;
    }
  }

  if (!hasValidContent) {
    console.warn("[LanguageStore] Translations appear to have no valid content");
    return false;
  }

  return true;
};

/**
 * Limpia el storage de idioma de forma segura
 * Útil cuando se detectan traducciones corruptas o desactualizadas
 */
const clearLanguageStorage = (): void => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem("language-storage");
    console.info("[LanguageStore] Language storage cleared successfully");
    
    // También limpiar el cache en memoria
    translationsCache.en = null;
    translationsCache.es = null;
  } catch (error) {
    console.error("[LanguageStore] Error clearing language storage:", error);
  }
};

// Función para obtener el idioma guardado o inglés por defecto
// IMPORTANTE: Esta función se ejecuta durante la inicialización del store
// En el servidor siempre retorna "en" para evitar problemas de hidratación
const getInitialLanguage = (): Language => {
  // En el servidor, siempre usar inglés por defecto
  if (typeof window === "undefined") return "en";
  
  try {
    const stored = localStorage.getItem("language-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      const lang = parsed?.state?.language;
      // Validar que el idioma sea válido
      if (lang === "en" || lang === "es") {
        return lang;
      }
    }
  } catch {
    // Si hay error leyendo localStorage, usar inglés por defecto
  }
  
  // Por defecto, siempre usar inglés
  return "en";
};

// Función para obtener traducciones iniciales desde localStorage de forma síncrona
const getInitialTranslations = (): Translations => {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem("language-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      const storedVersion = parsed?.state?._version;
      
      // Solo usar si la versión coincide
      if (storedVersion === TRANSLATIONS_VERSION && parsed?.state?.translations && isValidTranslations(parsed.state.translations)) {
        // Sincronizar cache en memoria
        const lang = parsed.state.language || "en";
        translationsCache[lang as Language] = parsed.state.translations;
        return parsed.state.translations;
      }
    }
  } catch {
    // Si hay error, retornar objeto vacío
  }
  
  return {};
};

const initialState: Omit<LanguageState, "setLanguage" | "t"> = {
  language: getInitialLanguage(),
  translations: getInitialTranslations(), // Cargar traducciones desde localStorage de forma síncrona
  isLoading: !isValidTranslations(getInitialTranslations()), // Marcar como cargando si no hay traducciones válidas
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Cambia el idioma y carga las traducciones
       * Optimizado para evitar cargas duplicadas
       * Incluye auto-limpieza cuando detecta traducciones corruptas
       */
      setLanguage: async (lang: Language) => {
        const currentState = get();

        // Si ya está cargando ese idioma o ya lo tiene cargado Y es válido, no hacer nada
        if (currentState.language === lang && isValidTranslations(currentState.translations)) {
          // Verificar que las traducciones funcionen correctamente con una prueba real
          const testKeys = ["nav.home", "rentToOwn.hero.title"];
          let allTestsPass = true;
          
          for (const testKey of testKeys) {
            const testTranslation = getTranslation(currentState.translations, testKey);
            // Si devuelve la misma clave, significa que no encontró la traducción
            if (testTranslation === testKey) {
              allTestsPass = false;
              break;
            }
          }
          
          if (allTestsPass) {
            // Las traducciones funcionan correctamente
            return;
          }
          
          // Si las traducciones no funcionan, limpiar y forzar recarga
          console.warn(`[LanguageStore] Translations for ${lang} appear corrupted or incomplete, clearing storage and reloading...`);
          clearLanguageStorage();
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
       * CRÍTICO: Si no hay traducciones en el store pero hay en cache, usarlas inmediatamente
       */
      t: (key: string): string => {
        const state = get();

        // Early return con validación optimizada
        if (isValidTranslations(state.translations)) {
          return getTranslation(state.translations, key);
        }

        // Si no hay traducciones en el store, verificar cache
        // Esto es crítico para primera carga cuando las traducciones aún se están cargando
        const lang = state.language || "en";
        const cached = translationsCache[lang];
        if (cached && isValidTranslations(cached)) {
          // Actualizar store de forma síncrona si es posible (sin causar re-renders innecesarios)
          // Solo actualizar si realmente no hay traducciones válidas
          if (!isValidTranslations(state.translations)) {
            // Usar setState de forma condicional para evitar loops
            const currentState = useLanguageStore.getState();
            if (!isValidTranslations(currentState.translations)) {
              useLanguageStore.setState({ translations: cached, isLoading: false });
            }
          }
          return getTranslation(cached, key);
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
            console.warn(`[LanguageStore] Cache version mismatch (stored: ${storedVersion}, current: ${TRANSLATIONS_VERSION}), clearing and reloading...`);
            clearLanguageStorage();
            // Forzar recarga
            shouldReload = true;
            state = undefined;
          }
          
          // Verificar que las traducciones almacenadas sean válidas incluso si la versión coincide
          if (state?.translations && !isValidTranslations(state.translations)) {
            console.warn("[LanguageStore] Stored translations are invalid, clearing and reloading...");
            clearLanguageStorage();
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

          // Si no hay traducciones válidas o están corruptas, cargar INMEDIATAMENTE
          // Priorizar inglés para primera carga
          const targetLang = lang === "en" || !state?.language ? "en" : lang;

          // Limpiar storage si hay problemas (pero solo después de determinar targetLang)
          if (shouldReload || (!state?.translations && !isValidTranslations(state?.translations))) {
            clearLanguageStorage();
          }

          // Limpiar traducciones corruptas del estado y marcar como cargando
          useLanguageStore.setState({
            translations: {},
            isLoading: true,
          });

          // Si inglés ya está en cache, usarlo inmediatamente (síncrono)
          if (targetLang === "en" && translationsCache.en && isValidTranslations(translationsCache.en)) {
            useLanguageStore.setState({
              translations: translationsCache.en,
              language: "en",
              isLoading: false,
            });
            document.documentElement.lang = "en";
            return;
          }

          // Cargar traducciones de forma asíncrona pero lo más rápido posible
          // Usar void para evitar que el return espere la promesa
          void loadTranslations(targetLang)
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
 * CRÍTICO: Esto debe ejecutarse lo más rápido posible para evitar mostrar claves sin traducir
 */
if (typeof window !== "undefined") {
  (() => {
    // Verificar si ya hay traducciones en localStorage y cargarlas inmediatamente
    try {
      const stored = localStorage.getItem("language-storage");
      if (stored) {
        const parsed = JSON.parse(stored);

        // Verificar versión del cache
        const storedVersion = parsed?.state?._version;
        if (storedVersion !== TRANSLATIONS_VERSION) {
          // Versión antigua, limpiar cache
          console.warn(`[LanguageStore] Old cache version detected (${storedVersion} vs ${TRANSLATIONS_VERSION}), clearing...`);
          clearLanguageStorage();
        } else if (parsed?.state?.translations && isValidTranslations(parsed.state.translations)) {
          // Sincronizar cache inmediatamente solo si es válido
          const lang = parsed.state.language || "en";
          translationsCache[lang as Language] = parsed.state.translations;
          
          // Inicializar el store inmediatamente con las traducciones guardadas
          const currentState = useLanguageStore.getState();
          if (!isValidTranslations(currentState.translations)) {
            useLanguageStore.setState({
              translations: parsed.state.translations,
              language: lang as Language,
              isLoading: false,
            });
            document.documentElement.lang = lang;
            // Ya tenemos traducciones válidas, no necesitamos cargar más
            return;
          }
        } else {
          // Traducciones corruptas o incompletas, limpiar
          console.warn("[LanguageStore] Corrupted or incomplete translations detected, clearing cache...");
          clearLanguageStorage();
        }
      }
    } catch (error) {
      // Error al parsear, limpiar cache corrupto
      console.error("[LanguageStore] Error parsing cache, clearing...", error);
      clearLanguageStorage();
    }

    // Precargar inglés inmediatamente y guardar en cache
    // Esto asegura que esté disponible antes de cualquier render
    // Cargar de forma inmediata si no hay traducciones válidas
    const currentState = useLanguageStore.getState();
    if (!isValidTranslations(currentState.translations)) {
      // Cargar inglés inmediatamente sin delay
      // Iniciar la carga de forma inmediata (no esperar microtask)
      // Esto es crítico para la primera carga de la HOME page
      loadTranslations("en")
        .then((translations) => {
          // Asegurar que el cache esté poblado
          translationsCache.en = translations;

          // Inicializar el store con inglés si aún no tiene traducciones válidas
          const updatedState = useLanguageStore.getState();
          if (!isValidTranslations(updatedState.translations)) {
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
  })();
}
