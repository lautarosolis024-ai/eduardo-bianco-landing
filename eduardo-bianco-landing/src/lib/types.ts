export interface CaseStudy {
  id: string;
  title: string;
  conflict: string;
  approach: string;
  result: string;
  icon: string;
}

export interface MethodologyStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  type: string;
}

// ContactFormData is deprecated — use ContactFormValues from validations.ts instead
// (auto-derived from the Zod schema so it can never go out of sync)
export type { ContactFormValues as ContactFormData } from "./validations";

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
