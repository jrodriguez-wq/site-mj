"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HubSpotMeetingsProps {
  /**
   * URL del embed de HubSpot Meetings
   * Ejemplo: "https://meetings.hubspot.com/jrodriguez134/meeting-web?embed=true"
   */
  embedUrl: string;
  /**
   * Clases CSS adicionales para el contenedor
   */
  className?: string;
}

// Declarar el tipo global para el objeto de HubSpot Meetings
declare global {
  interface Window {
    HubSpotConversations?: {
      widget?: {
        load?: () => void;
      };
    };
  }
}

/**
 * Componente para integrar el embed de HubSpot Meetings en Next.js
 * 
 * El script se precarga en el layout global para mejor rendimiento.
 * Este componente fuerza la inicialización del embed cuando se monta,
 * lo que permite que funcione correctamente con la navegación de Next.js.
 * 
 * Uso:
 * <HubSpotMeetings embedUrl="https://meetings.hubspot.com/jrodriguez134/meeting-web?embed=true" />
 */
export const HubSpotMeetings = ({
  embedUrl,
  className,
}: HubSpotMeetingsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initAttemptedRef = useRef(false);
  const mountKeyRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Incrementar el key de montaje para forzar re-inicialización
    mountKeyRef.current += 1;
    const currentMountKey = mountKeyRef.current;

    // Resetear el flag de intento cuando el componente se monta
    initAttemptedRef.current = false;

    const initializeEmbed = () => {
      // Verificar que seguimos en el mismo montaje
      if (!container || initAttemptedRef.current || currentMountKey !== mountKeyRef.current) return;
      
      // Marcar que ya intentamos inicializar
      initAttemptedRef.current = true;

      // Verificar si ya hay un iframe (de una inicialización previa)
      const existingIframe = container.querySelector('iframe');
      if (existingIframe) {
        requestAnimationFrame(() => setIsLoading(false));
        return;
      }

      // Verificar si el script de HubSpot Meetings está cargado
      const script = document.querySelector('script[src*="MeetingsEmbedCode.js"]');
      if (!script) {
        console.warn('HubSpot Meetings script no encontrado');
        requestAnimationFrame(() => setIsLoading(false));
        return;
      }

      // Forzar la inicialización del embed
      // El script de HubSpot busca elementos con la clase 'meetings-iframe-container'
      // y el atributo 'data-src' cuando se ejecuta
      // Para forzar la reinicialización, disparamos un evento de mutación
      
      // Método 1: Remover y re-agregar el atributo data-src para forzar detección
      const dataSrc = container.getAttribute('data-src');
      if (dataSrc) {
        container.removeAttribute('data-src');
        // Usar requestAnimationFrame para asegurar que el DOM se actualice
        requestAnimationFrame(() => {
          container.setAttribute('data-src', dataSrc);
          
          // Método 2: Disparar un evento personalizado que el script podría escuchar
          const event = new Event('DOMContentLoaded', { bubbles: true });
          document.dispatchEvent(event);
          
          // Método 3: Si el script expone una función de inicialización, llamarla
          // Esperar un poco para que el script procese el nuevo elemento
          setTimeout(() => {
            // Verificar si el iframe se creó
            const iframe = container.querySelector('iframe');
            if (iframe) {
              requestAnimationFrame(() => setIsLoading(false));
            } else {
              // Si no se creó, intentar forzar la creación manualmente
              // creando un nuevo script inline que ejecute el código de inicialización
              const initScript = document.createElement('script');
              initScript.textContent = `
                (function() {
                  var containers = document.querySelectorAll('.meetings-iframe-container[data-src]');
                  containers.forEach(function(container) {
                    if (!container.querySelector('iframe') && container.getAttribute('data-src')) {
                      var iframe = document.createElement('iframe');
                      iframe.src = container.getAttribute('data-src');
                      iframe.style.width = '100%';
                      iframe.style.height = '100%';
                      iframe.style.border = 'none';
                      iframe.style.minHeight = '600px';
                      iframe.setAttribute('loading', 'eager');
                      container.appendChild(iframe);
                    }
                  });
                })();
              `;
              document.body.appendChild(initScript);
              document.body.removeChild(initScript);
              requestAnimationFrame(() => setIsLoading(false));
            }
          }, 300);
        });
      }
    };

    // Intentar inicializar inmediatamente
    const immediateTimeout = setTimeout(() => {
      initializeEmbed();
    }, 100);

    // También intentar cuando el script se carga (si aún no está cargado)
    const handleScriptLoad = () => {
      setTimeout(() => {
        initializeEmbed();
      }, 100);
    };

    const existingScript = document.querySelector('script[src*="MeetingsEmbedCode.js"]') as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', handleScriptLoad);
    }

    // Cleanup
    return () => {
      clearTimeout(immediateTimeout);
      if (existingScript) {
        existingScript.removeEventListener('load', handleScriptLoad);
      }
    };
  }, [embedUrl]);

  return (
    <div
      ref={containerRef}
      className={cn("meetings-iframe-container", className)}
      data-src={embedUrl}
      style={{
        minHeight: '600px',
        position: 'relative',
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading appointment scheduler...</p>
          </div>
        </div>
      )}
    </div>
  );
};

