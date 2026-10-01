/**
 * Cookie consent state. Analytics/ads scripts (GA, Meta Pixel) must not fire
 * until "accepted" — required cookies (site function, HubSpot forms actually
 * submitted by the user) are exempt and always allowed.
 */
export type ConsentStatus = "accepted" | "declined";

const STORAGE_KEY = "mjnh_cookie_consent";
const CONSENT_EVENT = "mjnh-cookie-consent-change";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setStoredConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}

export function onConsentChange(callback: (status: ConsentStatus) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (event: Event) => {
    callback((event as CustomEvent<ConsentStatus>).detail);
  };
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
