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

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  conflictType: string;
  description: string;
  honeypot: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
