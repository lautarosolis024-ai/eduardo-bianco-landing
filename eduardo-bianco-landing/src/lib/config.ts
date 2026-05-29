/**
 * Centralized site configuration.
 * Single source of truth for WhatsApp numbers, emails, URLs, and other business constants.
 * This prevents the inconsistent-number bug found in the CEO/DevEx reviews.
 */

/** The canonical site URL — used in sitemap, robots, JSON-LD, OG tags, and canonical links. */
export const SITE_URL = "https://eduardobianco.com.ar";

// The canonical WhatsApp phone number in international format (no +, no spaces)
export const WHATSAPP_PHONE = "5491145779160";

// Display format for the UI
export const WHATSAPP_DISPLAY = "+54 9 11 4577-9160";

// Phone number in tel: link format
export const PHONE_TEL = `+${WHATSAPP_PHONE}`;

// JSON-LD compatible phone format
export const PHONE_SCHEMA = `+${WHATSAPP_PHONE}`;

// Default WhatsApp message
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Eduardo, necesito una consulta sobre un conflicto patrimonial";

// Constructed WhatsApp URL
export function getWhatsAppUrl(message?: string): string {
  const msg = message || WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

// Email
export const CONTACT_EMAIL = "eduardo@bianco.com.ar";

// Office
export const OFFICE_LOCATION = "Buenos Aires, Argentina";

// Business stats
export const BUSINESS_STATS = {
  yearsExperience: "20+",        // 20+ years specifically in conflict resolution
  consultingYears: "30+",        // 30+ years as international consultant (broader career)
  casesResolved: "500+",
  daysToResults: "30-120",
  satisfactionRate: "98%",
} as const;

/** Professional credentials displayed in hero, footer, and other sections. */
export const CREDENTIALS_DISPLAY = "Economista · Contador · Mediador" as const;

/** Full professional title for JSON-LD and formal contexts. */
export const PROFESSIONAL_TITLE = "Economista, Contador Público y Mediador" as const;

/** Privacy policy last update date — update when policy changes. */
export const PRIVACY_UPDATE_DATE = "mayo 2026" as const;

/** Shared localStorage key for cookie consent — prevents duplication between CookieConsent and AnalyticsConsent. */
export const COOKIE_CONSENT_KEY = "eb-cookie-consent" as const;

// Video CDN URLs (single source of truth)
export const VIDEO_URLS = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4",
  featured: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
  serviceMediacion: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  servicePeritaje: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
  philosophy: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
} as const;
