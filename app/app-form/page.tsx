"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function AppFormPage() {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formCreatedRef = useRef(false)

  useEffect(() => {
    const createForm = () => {
      if (typeof window !== "undefined" && window.hbspt && !formCreatedRef.current) {
        try {
          if (formContainerRef.current) {
            window.hbspt.forms.create({
              portalId: "50215941",
              formId: "6c15d23c-5273-4555-b4cc-b5fb7cfe7b67",
              region: "na1",
              target: "#hubspot-form-container",
            })
            formCreatedRef.current = true
          }
        } catch (error) {
          console.error("Error al crear el formulario de HubSpot:", error)
        }
      }
    }

    // Si el script ya está cargado, crear el formulario inmediatamente
    if (typeof window !== "undefined" && window.hbspt) {
      createForm()
    }
  }, [])

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-2rem)]">
      <div className="w-full max-w-3xl mx-auto">
        <div
          id="hubspot-form-container"
          ref={formContainerRef}
          className="w-full"
        />
      </div>

      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.hbspt && !formCreatedRef.current) {
            try {
              if (formContainerRef.current) {
                window.hbspt.forms.create({
                  portalId: "50215941",
                  formId: "6c15d23c-5273-4555-b4cc-b5fb7cfe7b67",
                  region: "na1",
                  target: "#hubspot-form-container",
                })
                formCreatedRef.current = true
              }
            } catch (error) {
              console.error("Error al crear el formulario de HubSpot:", error)
            }
          }
        }}
      />
    </div>
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
