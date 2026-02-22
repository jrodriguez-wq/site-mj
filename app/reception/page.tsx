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
    if (step === "welcome" || step === "success") return; // no auto-return on thank-you screen
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
      className={`min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10 select-none touch-manipulation relative overflow-hidden ${isDarkScreen ? "text-white" : "text-slate-800"}`}
      onTouchStart={resetIdleTimer}
      onClick={resetIdleTimer}
    >
      {/* Fondo: azul oscuro en welcome, options y success; claro solo en check-in */}
      {isDarkScreen ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-200/20 via-transparent to-transparent pointer-events-none" />
        </>
      )}

      {/* Botón atrás: táctil, visible en options y check-in */}
      {showBackButton && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleBack(); }}
          onTouchEnd={(e) => e.stopPropagation()}
          className="fixed top-6 left-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/95 hover:bg-white border-2 border-slate-200/80 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 touch-manipulation backdrop-blur-sm"
          aria-label="Go back"
        >
          <ChevronLeft className="w-8 h-8 md:w-9 md:h-9 text-slate-700" strokeWidth={2.5} />
        </button>
      )}

      <div className="relative z-10 w-full flex flex-col items-center">
      {step === "welcome" && (
        <section className="flex flex-col items-center justify-center text-center max-w-2xl animate-in fade-in duration-500">
          <div className="mb-8 md:mb-10 flex justify-center">
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm px-8 py-6 border border-white/10">
              <Image
                src={getCloudinaryImageUrl("/img/logo.svg")}
                alt={SEO_CONFIG.siteName}
                width={320}
                height={112}
                className="h-28 w-auto md:h-32 lg:h-36 brightness-0 invert"
                unoptimized
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white tracking-tight">
            Welcome to our office
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 md:mb-14 max-w-lg">
            We&apos;re glad you&apos;re here. Tap below to get started.
          </p>
          <button
            type="button"
            onClick={goToOptions}
            className="px-12 py-6 text-2xl md:text-3xl font-semibold rounded-2xl bg-white text-blue-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all min-h-[88px] min-w-[260px] touch-manipulation"
          >
            Start
          </button>
        </section>
      )}

      {step === "options" && (
        <section className="flex flex-col items-center w-full max-w-2xl animate-in fade-in duration-300 pt-14 md:pt-16">
          <p className="text-slate-400 text-sm md:text-base uppercase tracking-widest mb-3">
            How can we help you?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 text-center text-white tracking-tight">
            Choose an option
          </h2>
          <div className="grid gap-4 w-full">
            <button
              type="button"
              onClick={() => setStep("check-in")}
              className="group w-full min-h-[92px] py-6 px-8 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-left text-xl md:text-2xl font-semibold text-white transition-all duration-200 touch-manipulation flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:border-white/30 active:scale-[0.99] backdrop-blur-md"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 group-hover:bg-white/25 transition-colors">
                <CheckCircle className="size-7 text-white" strokeWidth={2} aria-hidden />
              </span>
              Check-in (existing appointment)
            </button>
            <a
              href={SCHEDULE_MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full min-h-[92px] py-6 px-8 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-left text-xl md:text-2xl font-semibold text-white transition-all duration-200 touch-manipulation flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:border-white/30 active:scale-[0.99] backdrop-blur-md no-underline"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 group-hover:bg-white/25 transition-colors">
                <Calendar className="size-7 text-white" strokeWidth={2} aria-hidden />
              </span>
              Schedule an appointment
            </a>
          </div>
        </section>
      )}

      {step === "check-in" && (
        <section className="w-full max-w-4xl flex flex-col items-center animate-in fade-in duration-300 pt-12 md:pt-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-slate-900">
            Check-in for your appointment
          </h2>
          <p className="text-slate-600 mb-4 text-center text-sm md:text-base">
            Today&apos;s appointments
          </p>
          <div className="w-full rounded-2xl overflow-hidden border-2 border-slate-200/80 bg-white shadow-md mb-6">
            <iframe
               src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&mode=WEEK&showCalendars=0&showTabs=0&showTitle=0&showTz=0&src=amJvbmlsbGFAbWpuZXdlbGxob21lcy5jb20&src=YWphbnNzb25AbWpuZXdlbGxob21lcy5jb20&src=bWFyYUBtam5ld2VsbGhvbWVzLmNvbQ&src=b21vbnRveWFAbWpuZXdlbGxob21lcy5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%23795548&color=%237986cb&color=%23f6bf26&color=%230b8043" 
              title="Office calendar"
              className="w-full min-h-[320px] md:min-h-[500px] lg:min-h-[600px]"
            />
          </div>
          <p className="text-slate-600 mb-2 text-center text-sm md:text-base font-medium">
            Check-in form
          </p>
          <div className="w-full bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200/80">
            <HubSpotForm
              portalId={HUBSPOT_PORTAL_ID}
              formId={FORM_ID_CHECK_IN}
              region={HUBSPOT_REGION}
              onFormSubmitted={onFormSubmitted}
              className="min-h-[400px] [&_.hs-form]:!text-slate-800 [&_label]:!text-slate-700 [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:!border-slate-300"
            />
          </div>
        </section>
      )}

      {step === "success" && (
        <section className="flex flex-col items-center justify-center text-center max-w-2xl animate-in fade-in duration-300">
          <div className="rounded-full bg-white/15 backdrop-blur-sm p-5 mb-6 border border-white/20">
            <CheckCircle className="size-16 text-emerald-400" aria-hidden />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
            Thank you
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Someone will be with you shortly.
          </p>
          <button
            type="button"
            onClick={goToWelcome}
            className="inline-flex items-center justify-center gap-2 px-10 py-6 text-xl font-semibold rounded-2xl bg-white text-blue-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all min-h-[88px] min-w-[280px] touch-manipulation"
          >
            <Home className="size-6" aria-hidden />
            Return to start
          </button>
        </section>
      )}
      </div>
    </div>
  );
}
