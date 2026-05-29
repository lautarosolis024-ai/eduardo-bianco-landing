import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedVideoSection from "@/components/sections/FeaturedVideoSection";
import SectionSkeleton from "@/components/sections/SectionSkeleton";

// Below-fold sections loaded dynamically for better initial bundle size
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const PhilosophySection = dynamic(() => import("@/components/sections/PhilosophySection"));
const Methodology = dynamic(() => import("@/components/sections/Methodology"));
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const Credentials = dynamic(() => import("@/components/sections/Credentials"));
const ContactCombined = dynamic(() => import("@/components/sections/ContactCombined"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const PrivacyPolicySection = dynamic(() => import("@/components/sections/PrivacyPolicySection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/sections/WhatsAppButton"));
const ScrollToTop = dynamic(() => import("@/components/sections/ScrollToTop"));
const CookieConsent = dynamic(() => import("@/components/sections/CookieConsent"));
const ExitIntentPopup = dynamic(() => import("@/components/sections/ExitIntentPopup"));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Skip to content link for keyboard users — WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" aria-label="Contenido principal">
        <Hero />
        <AboutSection />
        <FeaturedVideoSection />
        <Suspense fallback={<SectionSkeleton />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <PhilosophySection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Methodology />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Credentials />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactCombined />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <PrivacyPolicySection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
    </div>
  );
}
