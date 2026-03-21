"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Calendar, CheckCircle, Home, ChevronLeft } from "lucide-react";
import { HubSpotForm } from "@/components/ui/hubspot-form";
import { getCloudinaryImageUrl } from "@/lib/cloudinary";
import { SEO_CONFIG } from "@/config/seo";

const HUBSPOT_PORTAL_ID = "50215941";
const HUBSPOT_REGION = "na1";
const FORM_ID_CHECK_IN = "7cea1132-08a4-400a-a6ac-04f38e136f28";
const SCHEDULE_MEETING_URL = "https://meetings.hubspot.com/jrodriguez134/meeting-web";
const IDLE_TIMEOUT_MS = 90_000;

type Step = "welcome" | "options" | "check-in" | "success";

export default function ReceptionPage() {
  const [step, setStep] = useState<Step>("welcome");

  const goToOptions = () => setStep("options");
  const goBackToOptions = () => setStep("options");
  const goToWelcome = useCallback(() => setStep("welcome"), []);

  // Idle timeout: return to welcome after inactivity (kiosk-friendly)
  useEffect(() => {
    if (step === "welcome") return;
    const t = setTimeout(goToWelcome, IDLE_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [step, goToWelcome]);

  const onFormSubmitted = useCallback(() => setStep("success"), []);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetIdleTimer = useCallback(() => {
    if (step === "welcome" || step === "success") return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(goToWelcome, IDLE_TIMEOUT_MS);
  }, [step, goToWelcome]);

  useEffect(() => {
    if (step === "welcome" || step === "success") return;
    idleTimerRef.current = setTimeout(goToWelcome, IDLE_TIMEOUT_MS);
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    };
  }, [step, goToWelcome]);

  const showBackButton = step === "options" || step === "check-in";
  const handleBack = step === "check-in" ? goBackToOptions : goToWelcome;

  const isDarkScreen = step === "welcome" || step === "options" || step === "success";

  return (
    <div
      className={`reception-kiosk-root min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10 select-none touch-manipulation relative overflow-hidden ${
        isDarkScreen ? "rk-theme-dark" : "rk-theme-light"
      }`}
      onTouchStart={resetIdleTimer}
      onClick={resetIdleTimer}
    >
      {/* Fondo: capas con hex/rgba (sin backdrop-filter) para TVs / WebKit antiguos */}
      {isDarkScreen ? (
        <>
          <div className="rk-bg-layer rk-bg-dark-base" aria-hidden />
          <div className="rk-bg-layer rk-bg-dark-glow" aria-hidden />
          <div className="rk-bg-layer rk-bg-dark-dots" aria-hidden />
        </>
      ) : (
        <>
          <div className="rk-bg-layer rk-bg-light-base" aria-hidden />
          <div className="rk-bg-layer rk-bg-light-dots" aria-hidden />
          <div className="rk-bg-layer rk-bg-light-fade" aria-hidden />
        </>
      )}

      {showBackButton && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleBack();
          }}
          onTouchEnd={(e) => e.stopPropagation()}
          className="rk-btn-back"
          aria-label="Go back"
        >
          <ChevronLeft className="rk-icon-back" strokeWidth={2.5} aria-hidden />
        </button>
      )}

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {step === "welcome" && (
          <section className="rk-fade-in flex flex-col items-center justify-center text-center max-w-2xl">
            <div className="mb-8 md:mb-10 flex justify-center">
              <div className="rk-panel-glass px-8 py-6">
                <Image
                  src={getCloudinaryImageUrl("/img/logo.svg")}
                  alt={SEO_CONFIG.siteName}
                  width={320}
                  height={112}
                  className="h-28 w-auto md:h-32 lg:h-36 rk-logo-invert"
                  unoptimized
                />
              </div>
            </div>
            <h1 className="rk-heading-xl mb-4 md:mb-6">Welcome to our office</h1>
            <p className="rk-subtitle-dark mb-10 md:mb-14 max-w-lg mx-auto">
              We&apos;re glad you&apos;re here. Tap below to get started.
            </p>
            <button type="button" onClick={goToOptions} className="rk-btn-primary">
              Start
            </button>
          </section>
        )}

        {step === "options" && (
          <section className="rk-fade-in flex flex-col items-center w-full max-w-2xl pt-14 md:pt-16">
            <p className="rk-kicker mb-3 text-center">How can we help you?</p>
            <h2 className="rk-heading-lg mb-10 md:mb-14 px-2">Choose an option</h2>
            <div className="grid gap-4 w-full">
              <button
                type="button"
                onClick={() => setStep("check-in")}
                className="rk-option-card"
              >
                <span className="rk-option-icon-wrap">
                  <CheckCircle className="size-7" strokeWidth={2} aria-hidden />
                </span>
                Check-in (existing appointment)
              </button>
              <a
                href={SCHEDULE_MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rk-option-card"
              >
                <span className="rk-option-icon-wrap">
                  <Calendar className="size-7" strokeWidth={2} aria-hidden />
                </span>
                Schedule an appointment
              </a>
            </div>
          </section>
        )}

        {step === "check-in" && (
          <section className="rk-fade-in w-full flex flex-col items-center pt-12 md:pt-14">
            <h2 className="rk-heading-form mb-2 px-2">Check-in for your appointment</h2>
            <p className="rk-subtitle-light mb-4 text-center px-2">Today&apos;s appointments</p>
            <div className="w-full rk-card-surface overflow-hidden mb-6">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&mode=WEEK&showCalendars=0&showTabs=0&showTitle=0&showTz=0&src=amJvbmlsbGFAbWpuZXdlbGxob21lcy5jb20&src=YWphbnNzb25AbWpuZXdlbGxob21lcy5jb20&src=bWFyYUBtam5ld2VsbGhvbWVzLmNvbQ&src=b21vbnRveWFAbWpuZXdlbGxob21lcy5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%23795548&color=%237986cb&color=%23f6bf26&color=%230b8043"
                title="Office calendar"
                className="w-full min-h-[320px] md:min-h-[500px] lg:min-h-[600px] border-0"
              />
            </div>
            <p className="rk-subtitle-light mb-2 text-center font-semibold">Check-in form</p>
            <div className="w-full rk-form-shell">
              <HubSpotForm
                portalId={HUBSPOT_PORTAL_ID}
                formId={FORM_ID_CHECK_IN}
                region={HUBSPOT_REGION}
                onFormSubmitted={onFormSubmitted}
                className="rk-hubspot-form-wrapper min-h-[400px]"
              />
            </div>
          </section>
        )}

        {step === "success" && (
          <section className="rk-fade-in flex flex-col items-center justify-center text-center max-w-2xl">
            <div className="rk-success-icon-wrap">
              <CheckCircle className="rk-icon-success" aria-hidden />
            </div>
            <h2 className="rk-heading-lg mb-4">Thank you</h2>
            <p className="rk-subtitle-dark mb-10">Someone will be with you shortly.</p>
            <button type="button" onClick={goToWelcome} className="rk-btn-primary min-w-[280px]">
              <Home className="size-6 shrink-0" aria-hidden />
              Return to start
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
