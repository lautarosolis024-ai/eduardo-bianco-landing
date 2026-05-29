import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionConfig } from "framer-motion";
import { PHONE_SCHEMA, CONTACT_EMAIL } from "@/lib/config";
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
  metadataBase: new URL("https://eduardobianco.com.ar"),
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
    canonical: "https://eduardobianco.com.ar",
    languages: { "es-AR": "https://eduardobianco.com.ar" },
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
    url: "https://eduardobianco.com.ar",
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
  "@type": "LegalService",
  name: "Eduardo Bianco — Resolución de Conflictos Patrimoniales",
  description: "Especialista en resolución de conflictos patrimoniales. Economista, Contador y Mediador con más de 20 años de experiencia.",
  url: "https://eduardobianco.com.ar",
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
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
