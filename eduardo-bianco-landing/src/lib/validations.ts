import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  phone: z
    .string()
    .min(6, "Ingrese un tel\u00e9fono v\u00e1lido")
    .max(30, "El tel\u00e9fono no puede exceder 30 caracteres"),
  email: z.string().email("Ingrese un email v\u00e1lido"),
  conflictType: z.enum(
    [
      "herencia",
      "socios",
      "propiedad-compartida",
      "otro",
    ],
    {
      message: "Seleccione un tipo de conflicto",
    }
  ),
  description: z
    .string()
    .min(10, "Describa brevemente su situaci\u00f3n (m\u00ednimo 10 caracteres)")
    .max(2000, "La descripci\u00f3n no puede exceder 2000 caracteres"),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const conflictTypeLabels: Record<string, string> = {
  herencia: "Herencia / Sucesi\u00f3n",
  socios: "Conflicto entre socios",
  "propiedad-compartida": "Propiedad compartida",
  otro: "Otro",
};

/** Strip HTML tags from user input to prevent injection in email body */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF.,;:!?@()\-+/"']$/gmu, "")
    .trim();
}

/** HTML-escape user input for safe interpolation in email templates.
 *  Prevents XSS via attribute injection (quotes) or tag injection.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
