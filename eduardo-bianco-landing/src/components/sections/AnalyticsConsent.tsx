"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const COOKIE_CONSENT_KEY = "eb-cookie-consent";

/**
 * AnalyticsConsent gates Vercel Analytics + Speed Insights behind cookie consent.
 * Required for Ley 25.326 (Argentina data protection law) compliance.
 * Analytics scripts only load after the user explicitly accepts cookies.
 * If the user declines or hasn't decided yet, no analytics are sent.
 */
export default function AnalyticsConsent() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHasConsent(parsed.accepted === true);
      }
    } catch {
      // No consent data yet — don't load analytics
    }

    // Listen for consent changes from CookieConsent component
    const handleStorage = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setHasConsent(parsed.accepted === true);
        } catch {}
      }
    };

    // Also listen for a custom event (same-tab storage changes don't fire StorageEvent)
    const handleConsentChange = () => {
      try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setHasConsent(parsed.accepted === true);
        }
      } catch {}
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("cookie-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
