"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { getStoredConsent, setStoredConsent } from "@/lib/consent/cookie-consent";

/**
 * Blocks analytics/advertising scripts (GA, Meta Pixel) until the visitor
 * accepts. Declining still allows full site use — only tracking is skipped.
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
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
    >
      <div className="max-w-3xl mx-auto rounded-xl border-2 border-primary/20 bg-background shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies for site analytics and advertising (Google Analytics, Meta Pixel). These only
            run if you accept. Read our{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
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
