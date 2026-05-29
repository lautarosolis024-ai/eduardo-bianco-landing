import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";
import { PHONE_SCHEMA, CONTACT_EMAIL, VIDEO_URLS, SITE_URL, PROFESSIONAL_TITLE } from "@/lib/config";
import AnalyticsConsent from "@/components/sections/AnalyticsConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Eduardo Bianco | Resolución de Conflictos Patrimoniales",
  description:
    "Especialista en resolución de conflictos patrimoniales. Economista, Contador y Mediador con más de 20 años de experiencia. Herencias, socios, propiedades compartidas.",
  keywords: [
    "conflictos patrimoniales",
    "herencia",
    "mediación",
    "socios",
    "propiedad compartida",
    "peritaje",
    "arbitraje",
    "Argentina",
    "Eduardo Bianco",
  ],
  authors: [{ name: "Eduardo Julio Bianco" }],
  alternates: {
    canonical: SITE_URL,
    languages: { "es-AR": SITE_URL },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Eduardo Bianco | Resolución de Conflictos Patrimoniales",
    description:
      "Especialista en resolución de conflictos patrimoniales. Economista, Contador y Mediador con más de 20 años de experiencia.",
    url: SITE_URL,
    siteName: "Eduardo Bianco",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eduardo Bianco — Resolución de Conflictos Patrimoniales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Bianco | Resolución de Conflictos Patrimoniales",
    description:
      "Especialista en resolución de conflictos patrimoniales. Resultados en 30-120 días.",
    images: [{ url: "/og-image.png", alt: "Eduardo Bianco — Resolución de Conflictos Patrimoniales" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Eduardo Bianco — Resolución de Conflictos Patrimoniales",
  description: "Especialista en resolución de conflictos patrimoniales. Economista, Contador y Mediador con más de 20 años de experiencia.",
  url: SITE_URL,
  telephone: PHONE_SCHEMA,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.6037,
    longitude: -58.3816,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "Consulta inicial sin cargo",
  areaServed: {
    "@type": "Country",
    name: "Argentina",
  },
  serviceType: ["Mediación patrimonial", "Peritaje económico", "Resolución de conflictos", "Arbitraje patrimonial"],
  // aggregateRating removed: only 3 testimonials exist; claiming 47 reviews was misleading.
  // Add back only when real review data (e.g. Google Reviews) is integrated.
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: SITE_URL,
    },
  ],
};

// Person schema for Eduardo Bianco — E-E-A-T signal for Google Knowledge Graph
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Julio Bianco",
  jobTitle: `${PROFESSIONAL_TITLE} — Especialista en conflictos patrimoniales`,
  description: "Economista, Contador Público y Mediador con más de 20 años de experiencia en resolución de conflictos patrimoniales en Argentina.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  telephone: PHONE_SCHEMA,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  knowsAbout: [
    "Mediación patrimonial",
    "Peritaje económico",
    "Resolución de conflictos patrimoniales",
    "Herencias disputadas",
    "Sucesiones",
    "Arbitraje patrimonial",
    "Planificación patrimonial",
    "Conflictos entre socios",
    "Propiedad compartida",
  ],
  worksFor: {
    "@type": "ProfessionalService",
    name: "Eduardo Bianco — Resolución de Conflictos Patrimoniales",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <link rel="dns-prefetch" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <link rel="preload" as="video" href={VIDEO_URLS.hero} media="(min-width: 768px)" />
        {/* Cloudflare Turnstile — loaded only if site key is configured */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </LazyMotion>
        <AnalyticsConsent />
      </body>
    </html>
  );
}
