"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { HUBSPOT_PAYMENTS } from "@/lib/constants"

const PAYMENTS_SCRIPT_SRC = HUBSPOT_PAYMENTS.RESERVATION_500.scriptSrc

declare global {
  interface Window {
    startPaymentsEmbedScriptImmediate?: () => void
  }
}

interface HubSpotPaymentsEmbedProps {
  embedUrl: string
  className?: string
  onReady?: () => void
  onError?: () => void
}

function loadPaymentsEmbedScript(): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${PAYMENTS_SCRIPT_SRC}"]`
  )

  if (existing && window.startPaymentsEmbedScriptImmediate) {
    return Promise.resolve()
  }

  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener(
        "error",
        () => reject(new Error("HubSpot payments embed failed to load")),
        { once: true }
      )
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = PAYMENTS_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () =>
      reject(new Error("HubSpot payments embed failed to load"))
    document.body.appendChild(script)
  })
}

/**
 * HubSpot Payments iframe. The official script looks for
 * `.payments-iframe-container[data-src]` and injects an iframe with payment
 * permissions. Call `startPaymentsEmbedScriptImmediate` so Next.js client
 * navigations do not wait on the script's 5s fallback timer.
 */
export const HubSpotPaymentsEmbed = ({
  embedUrl,
  className,
  onReady,
  onError,
}: HubSpotPaymentsEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let pollId = 0
    let timeoutId = 0

    const stopWaiting = () => {
      if (pollId) window.clearInterval(pollId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }

    const markReady = () => {
      if (cancelled) return
      stopWaiting()
      setStatus("ready")
      onReady?.()
    }

    const markError = () => {
      if (cancelled) return
      stopWaiting()
      setStatus("error")
      onError?.()
    }

    loadPaymentsEmbedScript()
      .then(() => {
        if (cancelled) return
        window.startPaymentsEmbedScriptImmediate?.()

        const existingIframe = container.querySelector("iframe")
        if (existingIframe) {
          markReady()
          return
        }

        pollId = window.setInterval(() => {
          if (container.querySelector("iframe")) {
            markReady()
          }
        }, 200)

        timeoutId = window.setTimeout(() => {
          if (!container.querySelector("iframe")) {
            markError()
          }
        }, 8000)
      })
      .catch(() => {
        markError()
      })

    return () => {
      cancelled = true
      stopWaiting()
    }
  }, [embedUrl, onError, onReady])

  return (
    <div className={cn("relative w-full", className)}>
      {status === "loading" && (
        <div
          className="absolute inset-0 z-10 flex min-h-[500px] items-center justify-center rounded-lg bg-muted/40"
          aria-live="polite"
        >
          <p className="text-sm text-muted-foreground">Loading secure checkout…</p>
        </div>
      )}
      {status === "error" && (
        <div
          className="absolute inset-0 z-10 flex min-h-[500px] items-center justify-center rounded-lg bg-muted/40 px-6"
          role="status"
        >
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            The checkout form could not load here. Use{" "}
            <span className="font-medium text-foreground">Open payment page</span>{" "}
            below, or scan the QR code.
          </p>
        </div>
      )}
      <div
        ref={containerRef}
        className="payments-iframe-container w-full overflow-hidden rounded-lg"
        data-src={embedUrl}
        style={{ minHeight: "500px" }}
      />
    </div>
  )
}
