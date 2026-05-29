import { Resend } from "resend";
import { sanitizeInput, escapeHtml } from "./validations";
import { conflictTypeLabels } from "./validations";

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

const EMAIL_FROM = process.env.EMAIL_FROM || "Eduardo Bianco <onboarding@resend.dev>";
const EMAIL_TO = process.env.EMAIL_TO || "ejuliobianco@gmail.com";

// TODO: Replace EMAIL_FROM with a verified domain sender (e.g. contacto@eduardobianco.com.ar)
// The onboarding@resend.dev address only delivers to the account owner — not to arbitrary inboxes.
// Once Resend domain is verified, set EMAIL_FROM env var to the real address.

interface EmailPayload {
  name: string;
  phone: string;
  email: string;
  conflictType: string;
  description: string;
}

export async function sendContactEmail(data: EmailPayload): Promise<{ success: boolean; message: string }> {
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
