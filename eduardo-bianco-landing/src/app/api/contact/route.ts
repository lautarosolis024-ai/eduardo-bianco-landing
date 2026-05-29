import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { validateEnv } from "@/lib/env";

// Validate env at module load time
validateEnv();

// Force dynamic rendering — this route uses request headers and should never be cached
export const dynamic = "force-dynamic";

// Simple in-memory rate limiter (per IP, 5 submissions per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Demasiadas consultas. Intente nuevamente en una hora." },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();

    // Honeypot check — if filled, silently accept (bot detection)
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Consulta enviada correctamente. Responderemos dentro de 24 horas.",
      });
    }

    // Validate with zod
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || "Datos inv\u00e1lidos";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    // Send email with 10s timeout
    const emailResult = await Promise.race([
      sendContactEmail(result.data),
      new Promise<{ success: false; message: string }>((resolve) =>
        setTimeout(
          () => resolve({ success: false, message: "El servidor tard\u00f3 demasiado. Intente nuevamente o cont\u00e1ctese por WhatsApp." }),
          10000
        )
      ),
    ]);

    if (!emailResult.success) {
      return NextResponse.json(emailResult, { status: 500 });
    }

    return NextResponse.json(emailResult);
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor. Intente nuevamente o cont\u00e1ctese por WhatsApp." },
      { status: 500 }
    );
  }
}
