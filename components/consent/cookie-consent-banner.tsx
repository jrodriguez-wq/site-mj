"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { getStoredConsent, setStoredConsent } from "@/lib/consent/cookie-consent";

/**
 * Blocks analytics/advertising scripts (GA, Meta Pixel) until the visitor
 * accepts. Declining still allows full site use — only tracking is skipped.
 *
 * Centered modal on mobile (avoids fighting the HubSpot chat bubble docked
 * bottom-right, which sits at z-index 9990); bottom bar on desktop.
 */
export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    setStoredConsent(accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/50 sm:bg-transparent sm:items-end sm:p-6"
    >
      <div className="w-full max-w-sm sm:max-w-3xl mx-auto rounded-xl border-2 border-primary/20 bg-background shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 flex-1">
          <Cookie className="h-6 w-6 sm:h-5 sm:w-5 text-primary sm:mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground sm:hidden mb-1">Cookies</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies for site analytics and advertising. Read our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => handleChoice(false)}>
            Decline
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none" onClick={() => handleChoice(true)}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
