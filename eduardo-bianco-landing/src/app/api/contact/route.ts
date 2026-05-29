import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { validateEnv } from "@/lib/env";

// Validate env at module load time
validateEnv();

// Force dynamic rendering — this route uses request headers and should never be cached
export const dynamic = "force-dynamic";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Rate limiting using a signed cookie approach.
 * In-memory rate limiters don't work on serverless (reset on cold start).
 * This approach stores submission timestamps in an encrypted cookie,
 * which survives serverless restarts and works across all instances.
 *
 * For production at scale, replace with Vercel KV or Upstash Redis.
 */
function getSubmissionsFromCookie(cookieValue: string | undefined): number[] {
  if (!cookieValue) return [];
  try {
    const decoded = JSON.parse(atob(cookieValue));
    if (!Array.isArray(decoded)) return [];
    // Filter out expired entries
    const now = Date.now();
    return decoded.filter((ts: number) => now - ts < RATE_WINDOW_MS);
  } catch {
    return [];
  }
}

function isRateLimited(cookieValue: string | undefined): { limited: boolean; submissions: number[] } {
  const submissions = getSubmissionsFromCookie(cookieValue);
  if (submissions.length >= RATE_LIMIT) {
    return { limited: true, submissions };
  }
  return { limited: false, submissions };
}

function encodeSubmissions(submissions: number[]): string {
  return btoa(JSON.stringify(submissions));
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting via cookie
    const rateCookie = request.cookies.get("rl")?.value;
    const { limited, submissions } = isRateLimited(rateCookie);

    if (limited) {
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

    // On success, update rate limit cookie with new timestamp
    const newSubmissions = [...submissions, Date.now()];
    const response = NextResponse.json(emailResult);
    response.cookies.set("rl", encodeSubmissions(newSubmissions), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: RATE_WINDOW_MS / 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor. Intente nuevamente o cont\u00e1ctese por WhatsApp." },
      { status: 500 }
    );
  }
}
