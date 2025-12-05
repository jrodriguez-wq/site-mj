import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CacheItem<T = unknown> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheState {
  // Usar objetos planos para mejor serialización
  cache: Record<string, CacheItem>;
  metadataCache: Record<string, CacheItem>;
  imageCache: string[];
  
  // Métodos de cache
  set: <T>(key: string, data: T, ttl?: number) => void;
  get: <T>(key: string) => T | null;
  has: (key: string) => boolean;
  remove: (key: string) => void;
  clear: () => void;
  
  // Cache específico para metadata
  setMetadata: <T>(key: string, data: T, ttl?: number) => void;
  getMetadata: <T>(key: string) => T | null;
  
  // Cache para imágenes pre-cargadas
  addImageToCache: (src: string) => void;
  isImageCached: (src: string) => boolean;
  
  // Limpiar cache expirado
  cleanup: () => void;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos por defecto
const METADATA_TTL = 30 * 60 * 1000; // 30 minutos para metadata
const IMAGE_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas para imágenes

export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      cache: {},
      metadataCache: {},
      imageCache: [],

      set: <T>(key: string, data: T, ttl: number = DEFAULT_TTL) => {
        const now = Date.now();
        const item: CacheItem<T> = {
          data,
          timestamp: now,
          expiresAt: now + ttl,
        };
        
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: item,
          },
        }));
      },

      get: <T>(key: string): T | null => {
        const state = get();
        const item = state.cache[key] as CacheItem<T> | undefined;
        
        if (!item) return null;
        
        const now = Date.now();
        if (now > item.expiresAt) {
          // Item expirado, eliminarlo
          get().remove(key);
          return null;
        }
        
        return item.data;
      },

      has: (key: string) => {
        const item = get().cache[key];
        if (!item) return false;
        
        const now = Date.now();
        if (now > item.expiresAt) {
          get().remove(key);
          return false;
        }
        
        return true;
      },

      remove: (key: string) => {
        set((state) => {
          const { [key]: removed, ...rest } = state.cache;
          return { cache: rest };
        });
      },

      clear: () => {
        set({
          cache: {},
          metadataCache: {},
          imageCache: [],
        });
      },

      setMetadata: <T>(key: string, data: T, ttl: number = METADATA_TTL) => {
        const now = Date.now();
        const item: CacheItem<T> = {
          data,
          timestamp: now,
          expiresAt: now + ttl,
        };
        
        set((state) => ({
          metadataCache: {
            ...state.metadataCache,
            [key]: item,
          },
        }));
      },

      getMetadata: <T>(key: string): T | null => {
        const state = get();
        const item = state.metadataCache[key] as CacheItem<T> | undefined;
        
        if (!item) return null;
        
        const now = Date.now();
        if (now > item.expiresAt) {
          const { [key]: removed, ...rest } = state.metadataCache;
          set({ metadataCache: rest });
          return null;
        }
        
        return item.data;
      },

      addImageToCache: (src: string) => {
        set((state) => {
          if (state.imageCache.includes(src)) {
            return state;
          }
          return {
            imageCache: [...state.imageCache, src].slice(-100), // Limitar a 100 imágenes
          };
        });
      },

      isImageCached: (src: string) => {
        return get().imageCache.includes(src);
      },

      cleanup: () => {
        const state = get();
        const now = Date.now();
        
        // Limpiar cache general
        const cleanedCache = Object.fromEntries(
          Object.entries(state.cache).filter(([, item]) => now <= item.expiresAt)
        );
        
        // Limpiar metadata cache
        const cleanedMetadata = Object.fromEntries(
          Object.entries(state.metadataCache).filter(([, item]) => now <= item.expiresAt)
        );
        
        set({
          cache: cleanedCache,
          metadataCache: cleanedMetadata,
        });
      },
    }),
    {
      name: "cache-storage",
      partialize: (state) => ({
        metadataCache: state.metadataCache,
        imageCache: state.imageCache,
        // No persistir cache general (solo en memoria)
      }),
    }
  )
);

// Hook helper para usar cache fácilmente
export const useCache = () => {
  const store = useCacheStore();
  
  return {
    set: store.set,
    get: store.get,
    has: store.has,
    remove: store.remove,
    clear: store.clear,
    cleanup: store.cleanup,
  };
};

// Hook helper para metadata cache
export const useMetadataCache = () => {
  const store = useCacheStore();
  
  return {
    set: store.setMetadata,
    get: store.getMetadata,
  };
};

// Hook helper para image cache
export const useImageCache = () => {
  const store = useCacheStore();
  
  return {
    add: store.addImageToCache,
    has: store.isImageCached,
  };
};

