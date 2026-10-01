"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getStoredConsent, onConsentChange } from "@/lib/consent/cookie-consent";

/**
 * Google Analytics + Meta Pixel. Renders only after the visitor accepts
 * cookies — required so these never fire before consent (Meta Business
 * Tools Terms require this regardless of applicable state law).
 */
export const ConsentedTrackingScripts = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getStoredConsent() === "accepted");
    return onConsentChange((status) => setEnabled(status === "accepted"));
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Google Analytics - Google tag (gtag.js) */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XBCDDYFMJQ"
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XBCDDYFMJQ');
          `,
        }}
      />

      {/* Meta (Facebook) Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1266988268208353');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1266988268208353&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
};
