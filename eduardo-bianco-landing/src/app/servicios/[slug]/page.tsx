import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import ServicePageHero from "@/components/sections/ServicePageHero";
import ServicePageContent from "@/components/sections/ServicePageContent";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import ServiceCTA from "@/components/sections/ServiceCTA";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import ScrollToTop from "@/components/sections/ScrollToTop";
import CookieConsent from "@/components/sections/CookieConsent";
import { Suspense } from "react";
import SectionSkeleton from "@/components/sections/SectionSkeleton";
import { SITE_URL, PHONE_SCHEMA } from "@/lib/config";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    keywords: [
      service.targetKeyword,
      "Eduardo Bianco",
      "conflictos patrimoniales",
      "Buenos Aires",
      "Argentina",
    ],
    alternates: {
      canonical: service.canonicalUrl,
    },
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url: service.canonicalUrl,
      siteName: "Eduardo Bianco",
      type: "website",
      locale: "es_AR",
      images: [
        {
          url: service.openGraphImage,
          width: 1200,
          height: 630,
          alt: service.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.metaDescription,
      images: [{ url: service.openGraphImage }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // TypeScript doesn't narrow after notFound(), so we assert non-null
  const s = service!;

  // Service schema markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    description: s.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: "Eduardo Bianco — Resolución de Conflictos Patrimoniales",
      url: SITE_URL,
      telephone: PHONE_SCHEMA,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressRegion: "CABA",
        addressCountry: "AR",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    serviceType: s.targetKeyword,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
      description: "Consulta inicial gratuita",
    },
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: s.breadcrumbName,
        item: s.canonicalUrl,
      },
    ],
  };

  // FAQPage schema — enables Google rich results (expandable FAQ snippets in SERP)
  const faqSchema = s.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        {/* Structured data for this service page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        <ServicePageHero
          h1={s.h1}
          subtitle={s.subtitle}
          whatsappMessage={s.whatsappMessage}
        />

        <Suspense fallback={<SectionSkeleton />}>
          <ServicePageContent contentBlocks={s.contentBlocks} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ServiceFAQ
            faqs={s.faqs}
            serviceName={s.breadcrumbName}
          />
        </Suspense>

        <ServiceCTA
          whatsappMessage={s.whatsappMessage}
          serviceName={s.breadcrumbName}
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
