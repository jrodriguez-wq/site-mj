"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

const HUBSPOT_PORTAL_ID = "50215941"
const HUBSPOT_FORM_ID = "bec27b9a-bcf9-406d-9867-532e1e5dddf3"
const HUBSPOT_REGION = "na1"
const FORM_CONTAINER_ID = "hubspot-form-container-app-contractor"

export default function AppContractorPage() {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formCreatedRef = useRef(false)

  const createForm = () => {
    if (typeof window === "undefined" || !window.hbspt || formCreatedRef.current) return
    try {
      if (formContainerRef.current) {
        window.hbspt.forms.create({
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID,
          region: HUBSPOT_REGION,
          target: `#${FORM_CONTAINER_ID}`,
        })
        formCreatedRef.current = true
      }
    } catch (error) {
      console.error("[AppContractor] Error al crear el formulario de HubSpot:", error)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.hbspt) {
      createForm()
    }
  }, [])

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-2rem)]">
      <div className="w-full max-w-3xl mx-auto">
        <div
          id={FORM_CONTAINER_ID}
          ref={formContainerRef}
          className="w-full hubspot-form-container"
        />
      </div>

      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => createForm()}
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
