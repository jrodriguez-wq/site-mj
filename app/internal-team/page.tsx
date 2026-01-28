"use client";

import { useCallback, useState } from "react";
import { Shield, HardHat, ExternalLink, Copy, Check, ClipboardList } from "lucide-react";

const OPTIONS = [
  {
    id: "certified",
    label: "Montar garantía para casa certificada",
    href: "https://meetings.hubspot.com/customercare76/warrantys-certified-h",
    icon: Shield,
    description: "Usa esta opción para agendar garantía en una casa certificada.",
    guide: {
      firstName: "Property",
      lastName: "Manager",
      email: "propertymanager@mjnewellhomes.com",
    },
  },
  {
    id: "contractor",
    label: "Montar garantía con contratistas",
    href: "https://meetings.hubspot.com/customercare76/warrantys-contractor",
    icon: HardHat,
    description: "Usa esta opción para agendar garantía cuando intervienen contratistas.",
    guide: {
      firstName: "Contractor",
      lastName: "A",
      email: "jcaballero@standardlanddevelopment.com",
    },
  },
] as const;

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      () => {}
    );
  }, [value]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 w-full">
      <span className="text-sm font-medium text-muted-foreground shrink-0 sm:w-28">
        {label}:
      </span>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <code
          className="flex-1 min-w-0 py-2.5 px-3 rounded-lg bg-muted/80 text-sm font-mono text-foreground border border-border break-all select-text cursor-text"
          title={value}
        >
          {value}
        </code>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="shrink-0 p-2.5 rounded-lg border border-border bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Copiar ${label}`}
          title={`Copiar ${label}`}
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-600" aria-hidden />
          ) : (
            <Copy className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}

export default function InternalTeamPage() {
  const handleOpen = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-muted/30 to-background flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Equipo interno
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Elige el tipo de garantía y abre el enlace. En el formulario de
            HubSpot, usa los datos de la guía de cada tarjeta (cópialos y
            pégalos).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10 rounded-2xl border-2 border-primary/20 bg-card shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                      {opt.label}
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1.5 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 sm:p-5 lg:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary shrink-0" aria-hidden />
                    <p className="text-sm font-bold text-foreground">
                      Datos para el formulario de HubSpot
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground -mt-2">
                    Copia cada valor y pégalo en el formulario al agendar.
                  </p>
                  <div className="space-y-4">
                    <CopyableField
                      label="First name"
                      value={opt.guide.firstName}
                    />
                    <CopyableField
                      label="Last name"
                      value={opt.guide.lastName}
                    />
                    <CopyableField
                      label="Correo"
                      value={opt.guide.email}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpen(opt.href)}
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-xl border-2 border-primary bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 hover:border-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 mt-auto"
                  aria-label={`Abrir enlace: ${opt.label}`}
                >
                  Abrir enlace de agendar
                  <ExternalLink className="h-5 w-5" aria-hidden />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
