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
      <Navbar />
      <main className="flex-1">
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
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
}
