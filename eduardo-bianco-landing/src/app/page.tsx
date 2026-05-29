import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedVideoSection from "@/components/sections/FeaturedVideoSection";

// Below-fold sections loaded dynamically for better initial bundle size
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const PhilosophySection = dynamic(() => import("@/components/sections/PhilosophySection"));
const Methodology = dynamic(() => import("@/components/sections/Methodology"));
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const Credentials = dynamic(() => import("@/components/sections/Credentials"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
const ContactForm = dynamic(() => import("@/components/sections/ContactForm"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const PrivacyPolicySection = dynamic(() => import("@/components/sections/PrivacyPolicySection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/sections/WhatsAppButton"));
const ScrollToTop = dynamic(() => import("@/components/sections/ScrollToTop"));
const CookieConsent = dynamic(() => import("@/components/sections/CookieConsent"));

function SectionSkeleton() {
  return (
    <div className="bg-black py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-10 w-64 bg-white/5 rounded-lg mb-8 animate-pulse" />
        <div className="h-6 w-96 bg-white/5 rounded-lg mb-4 animate-pulse" />
        <div className="h-6 w-72 bg-white/5 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

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
        <ContactSection />
        <ContactForm />
        <FAQSection />
        <PrivacyPolicySection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
