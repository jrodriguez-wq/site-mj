"use client"

import Link from "next/link"
import { ArrowUpRight, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HubSpotPaymentsEmbed } from "@/components/ui/hubspot-payments"
import { HUBSPOT_PAYMENTS } from "@/lib/constants"
import { PageContent } from "@/components/layout/page-container"
import { CONTACT_INFO } from "@/config/seo"

const PAYMENT = HUBSPOT_PAYMENTS.RESERVATION_500

export default function PayLinksPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageContent size="lg" className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-10 md:mb-14">
          <p className="text-sm font-medium tracking-[0.18em] uppercase text-primary">
            M.J. Newell Homes
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Reserve your home — $500
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            This $500 reservation holds your home while we complete the next
            steps with your advisor. Checkout is processed securely by HubSpot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 lg:gap-10 items-start">
          <section
            aria-labelledby="checkout-heading"
            className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h2
                  id="checkout-heading"
                  className="text-xl sm:text-2xl font-bold"
                >
                  Pay online
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Card checkout opens on this page. Amount is fixed at $500.00 USD.
                </p>
              </div>
              <p className="text-3xl font-black text-primary tabular-nums">
                $500
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  USD
                </span>
              </p>
            </div>

            <HubSpotPaymentsEmbed embedUrl={PAYMENT.embedUrl} />

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={PAYMENT.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open payment page
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground sm:max-w-sm">
                If the form does not load, use this link. It is the same $500
                HubSpot checkout.
              </p>
            </div>
          </section>

          <aside
            aria-labelledby="qr-heading"
            className="rounded-xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28"
          >
            <h2 id="qr-heading" className="text-lg font-bold">
              Pay with your phone
            </h2>
            <p className="text-sm text-muted-foreground mt-1 mb-5">
              Scan this QR to open the same $500 reservation checkout.
            </p>
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-lg border border-border">
                {/* Native img: Next optimizer would recompress the QR and can break scans. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PAYMENT.qrSrc}
                  alt="QR code to pay the $500 home reservation"
                  width={240}
                  height={240}
                  className="w-[240px] h-[240px]"
                />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" aria-hidden />
            Payments processed by HubSpot over HTTPS
          </p>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <p className="inline-flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden />
            Questions?{" "}
            <a
              href={CONTACT_INFO.phoneTelHref}
              className="text-primary font-medium underline underline-offset-2 hover:no-underline"
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
          </p>
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4">
          Need an advisor first?{" "}
          <Link
            href="/contact"
            className="text-primary font-medium underline underline-offset-2 hover:no-underline"
          >
            Contact us
          </Link>
        </p>
      </PageContent>
    </div>
  )
}
