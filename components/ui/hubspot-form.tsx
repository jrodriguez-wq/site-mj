"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface HubSpotFormProps {
  /**
   * El portal ID de HubSpot (lo encuentras en el código del formulario que te da HubSpot)
   */
  portalId: string
  /**
   * El form ID de HubSpot (lo encuentras en el código del formulario que te da HubSpot)
   */
  formId: string
  /**
   * Clases CSS adicionales para el contenedor
   */
  className?: string
  /**
   * Región de HubSpot (por defecto: "na1")
   * Otras opciones: "eu1", "ap1", etc.
   */
  region?: string
  /**
   * Target CSS selector para el contenedor (por defecto: `#hubspot-form-${formId}`)
   */
  target?: string
  /**
   * URL a la que redirigir después de enviar el formulario
   */
  redirectUrl?: string
}

/**
 * Componente para integrar formularios de HubSpot en Next.js
 * 
 * Uso:
 * <HubSpotForm portalId="12345678" formId="abc12345-def6-7890-ghij-klmnopqrstuv" />
 * 
 * Para obtener el portalId y formId:
 * 1. Ve a tu cuenta de HubSpot
 * 2. Marketing > Forms
 * 3. Selecciona tu formulario
 * 4. Haz clic en "Share" o "Embed"
 * 5. Copia el código embed y extrae el portalId y formId
 */
export const HubSpotForm = ({
  portalId,
  formId,
  className,
  region = "na1",
  target,
  redirectUrl,
}: HubSpotFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)
  const formCreatedRef = useRef(false)

  useEffect(() => {
    // Evitar crear múltiples instancias
    if (formCreatedRef.current) return

    const targetSelector = target || `#hubspot-form-${formId}`
    const container = containerRef.current

    if (!container) return

    // Cargar el script de HubSpot si no está cargado
    const loadHubSpotScript = () => {
      if (scriptLoadedRef.current) {
        createForm()
        return
      }

      // Verificar si el script ya existe
      const existingScript = document.querySelector(
        'script[src*="js.hsforms.net"]'
      )

      if (existingScript) {
        scriptLoadedRef.current = true
        createForm()
        return
      }

      // Crear y cargar el script
      const script = document.createElement("script")
      script.src = `https://js.hsforms.net/forms/embed/v2.js`
      script.async = true
      script.defer = true
      script.charset = "utf-8"

      script.onload = () => {
        scriptLoadedRef.current = true
        createForm()
      }

      script.onerror = () => {
        console.error("Error al cargar el script de HubSpot")
      }

      document.body.appendChild(script)
    }

    // Crear el formulario
    const createForm = () => {
      if (!window.hbspt || formCreatedRef.current) return

      try {
        const formOptions: {
          portalId: string
          formId: string
          target: string
          region?: string
          redirectUrl?: string
          [key: string]: unknown
        } = {
          portalId,
          formId,
          target: targetSelector,
          region,
        }

        if (redirectUrl) {
          formOptions.redirectUrl = redirectUrl
        }

        window.hbspt.forms.create(formOptions)
        formCreatedRef.current = true
      } catch (error) {
        console.error("Error al crear el formulario de HubSpot:", error)
      }
    }

    // Cargar el script
    loadHubSpotScript()

    // Cleanup
    return () => {
      // El script se mantiene en el DOM para reutilización
      // Solo limpiamos el formulario si es necesario
    }
  }, [portalId, formId, region, target])

  return (
    <div
      id={target || `hubspot-form-${formId}`}
      ref={containerRef}
      className={cn("hubspot-form-container", className)}
    />
  )
}

// Extender el tipo Window para incluir hbspt
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string
          formId: string
          target: string
          region?: string
          [key: string]: unknown
        }) => void
      }
    }
  }
}

