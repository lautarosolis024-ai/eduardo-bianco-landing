import { Resend } from "resend";
import { sanitizeInput, escapeHtml, conflictTypeLabels, type ContactFormValues } from "./validations";

// Lazy-init Resend to avoid build-time crash when API key is missing
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _resend = new Resend(key);
  }
  return _resend;
}

// EMAIL_FROM must be set to a verified sender in production.
// onboarding@resend.dev ONLY delivers to the Resend account owner — NOT to the recipient.
// In production, set EMAIL_FROM env var to a verified domain address (e.g. "Eduardo Bianco <contacto@eduardobianco.com.ar>").
// In development/demo, we fall back to onboarding@resend.dev which works for account-owner testing only.
const EMAIL_FROM = process.env.EMAIL_FROM ||
  (process.env.NODE_ENV === "production"
    ? undefined  // Will fail loudly in production if not set
    : "Eduardo Bianco <onboarding@resend.dev>");
const EMAIL_TO = process.env.EMAIL_TO || "ejuliobianco@gmail.com";

export async function sendContactEmail(data: ContactFormValues): Promise<{ success: boolean; message: string }> {
  // In production, EMAIL_FROM must be explicitly set to a verified domain sender
  if (!EMAIL_FROM) {
    console.error("[EMAIL] EMAIL_FROM is not set. In production, set this to a verified Resend sender address.");
    return { success: false, message: "El servicio de email no está configurado. Por favor, contáctese por WhatsApp." };
  }

  const sanitized = {
    name: sanitizeInput(data.name),
    phone: sanitizeInput(data.phone),
    email: sanitizeInput(data.email),
    conflictType: conflictTypeLabels[data.conflictType] || data.conflictType,
    description: sanitizeInput(data.description),
  };

  // HTML-escape ALL user input before interpolation into email HTML template
  // This prevents XSS via attribute injection (quotes) or tag injection
  const safe = {
    name: escapeHtml(sanitized.name),
    phone: escapeHtml(sanitized.phone),
    email: escapeHtml(sanitized.email),
    conflictType: escapeHtml(sanitized.conflictType),
    description: escapeHtml(sanitized.description),
  };

  const subject = `Nueva consulta: ${sanitized.conflictType} - ${sanitized.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1A2330; border-bottom: 2px solid #D4875A; padding-bottom: 10px;">
        Nueva consulta desde la web
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #3A3430; width: 140px;">Nombre:</td>
          <td style="padding: 8px 0; color: #3A3430;">${safe.name}</td>
        </tr>
        <tr style="background-color: #F8F0EB;">
          <td style="padding: 8px 0; font-weight: bold; color: #3A3430;">Tel\u00e9fono:</td>
          <td style="padding: 8px 0; color: #3A3430;">${safe.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #3A3430;">Email:</td>
          <td style="padding: 8px 0; color: #3A3430;">${safe.email}</td>
        </tr>
        <tr style="background-color: #F8F0EB;">
          <td style="padding: 8px 0; font-weight: bold; color: #3A3430;">Tipo de conflicto:</td>
          <td style="padding: 8px 0; color: #3A3430;">${safe.conflictType}</td>
        </tr>
      </table>
      <h3 style="color: #1A2330; margin-top: 20px;">Descripci\u00f3n:</h3>
      <p style="color: #3A3430; line-height: 1.6; background-color: #F8F0EB; padding: 12px; border-radius: 4px;">
        ${safe.description}
      </p>
      <hr style="border: none; border-top: 1px solid #E8E0DA; margin: 20px 0;" />
      <p style="color: #908880; font-size: 12px;">
        Este email fue enviado desde el formulario de contacto de eduardobianco.com.ar
      </p>
    </div>
  `;

  try {
    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: sanitized.email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: "Error al enviar el email. Intente nuevamente." };
    }

    return { success: true, message: "Consulta enviada correctamente. Responderemos dentro de 24 horas." };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, message: "Error al enviar el email. Intente nuevamente." };
  }
}
