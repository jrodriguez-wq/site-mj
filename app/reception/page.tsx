"use client";

import { useState } from "react";
import { UserPlus, Calendar, CheckCircle } from "lucide-react";
import { HubSpotForm } from "@/components/ui/hubspot-form";

const HUBSPOT_PORTAL_ID = "50215941";
const HUBSPOT_REGION = "na1";
const FORM_ID_NEW_CLIENT = "93068cd5-cb63-461a-b7a6-00a3ca4fcd0a";
const FORM_ID_CHECK_IN = "7cea1132-08a4-400a-a6ac-04f38e136f28";
const SCHEDULE_MEETING_URL = "https://meetings.hubspot.com/jrodriguez134/meeting-web";

type Step = "welcome" | "options" | "new-client" | "check-in";

export default function ReceptionPage() {
  const [step, setStep] = useState<Step>("welcome");

  const goToOptions = () => setStep("options");
  const goBackToOptions = () => setStep("options");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 flex flex-col items-center justify-center p-6 md:p-10">
      {step === "welcome" && (
        <section className="flex flex-col items-center justify-center text-center max-w-2xl animate-in fade-in duration-500">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-slate-900">
            Welcome to our office
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 md:mb-14">
            We&apos;re glad you&apos;re here. Tap below to get started.
          </p>
          <button
            type="button"
            onClick={goToOptions}
            className="px-12 py-6 text-2xl md:text-3xl font-semibold rounded-2xl bg-slate-800 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all min-h-[80px] min-w-[240px] touch-manipulation"
          >
            Start
          </button>
        </section>
      )}

      {step === "options" && (
        <section className="flex flex-col items-center w-full max-w-3xl animate-in fade-in duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-slate-900">
            How can we help you today?
          </h2>
          <div className="grid gap-6 w-full">
            <button
              type="button"
              onClick={() => setStep("check-in")}
              className="w-full py-8 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-left text-xl md:text-2xl font-semibold transition-all touch-manipulation flex items-center justify-center gap-3 shadow-sm"
            >
              <CheckCircle className="size-8 text-slate-600 shrink-0" aria-hidden />
              Check-in (existing appointment)
            </button>
            <button
              type="button"
              onClick={() => setStep("new-client")}
              className="w-full py-8 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-left text-xl md:text-2xl font-semibold transition-all touch-manipulation flex items-center justify-center gap-3 shadow-sm"
            >
              <UserPlus className="size-8 text-slate-600 shrink-0" aria-hidden />
              New client
            </button>
            <a
              href={SCHEDULE_MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-8 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-left text-xl md:text-2xl font-semibold transition-all touch-manipulation flex items-center justify-center gap-3 shadow-sm no-underline"
            >
              <Calendar className="size-8 text-slate-600 shrink-0" aria-hidden />
              Schedule an appointment
            </a>
          </div>
        </section>
      )}

      {step === "new-client" && (
        <section className="w-full max-w-2xl flex flex-col items-center animate-in fade-in duration-300">
          <button
            type="button"
            onClick={goBackToOptions}
            className="mb-6 self-start py-3 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-lg font-medium touch-manipulation shadow-sm"
          >
            Back
          </button>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-900">
            New client registration
          </h2>
          <div className="w-full bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
            <HubSpotForm
              portalId={HUBSPOT_PORTAL_ID}
              formId={FORM_ID_NEW_CLIENT}
              region={HUBSPOT_REGION}
              className="min-h-[400px] [&_.hs-form]:!text-slate-800 [&_label]:!text-slate-700 [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:!border-slate-300"
            />
          </div>
        </section>
      )}

      {step === "check-in" && (
        <section className="w-full max-w-2xl flex flex-col items-center animate-in fade-in duration-300">
          <button
            type="button"
            onClick={goBackToOptions}
            className="mb-6 self-start py-3 px-5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-lg font-medium touch-manipulation shadow-sm"
          >
            Back
          </button>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-900">
            Check-in for your appointment
          </h2>
          <div className="w-full bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
            <HubSpotForm
              portalId={HUBSPOT_PORTAL_ID}
              formId={FORM_ID_CHECK_IN}
              region={HUBSPOT_REGION}
              className="min-h-[400px] [&_.hs-form]:!text-slate-800 [&_label]:!text-slate-700 [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:!border-slate-300"
            />
          </div>
        </section>
      )}
    </div>
  );
}
