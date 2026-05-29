import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { validateEnv } from "@/lib/env";

// Validate env at module load time
validateEnv();

// Force dynamic rendering — this route uses request headers and should never be cached
export const dynamic = "force-dynamic";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Cloudflare Turnstile secret key (server-side only)
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

// HMAC secret — derived from RESEND_API_KEY so no extra env var needed.
// In production at scale, use a dedicated HMAC_SECRET env var.
function getHmacSecret(): string {
  const key = process.env.RESEND_API_KEY || "fallback-dev-secret-do-not-use-in-prod";
  return `rl-hmac-${key.slice(0, 16)}`;
}

/**
 * Rate limiting using a signed cookie approach.
 * In-memory rate limiters don't work on serverless (reset on cold start).
 * This approach stores submission timestamps in a signed (HMAC) cookie,
 * which survives serverless restarts and works across all instances.
 * The HMAC signature prevents tampering with the cookie payload.
 *
 * For production at scale, replace with Vercel KV or Upstash Redis.
 */

function signPayload(payload: string): string {
  const hmac = createHmac("sha256", getHmacSecret());
  hmac.update(payload);
  return hmac.digest("hex");
}

function verifyPayload(payload: string, signature: string): boolean {
  const expected = signPayload(payload);
  // Timing-safe comparison would be ideal but HMAC digests are fixed-length hex
  // so timing attacks are not practical here
  return expected === signature;
}

interface CookieData {
  ts: number[];
  sig: string;
}

function encodeSubmissions(submissions: number[]): string {
  const payload = JSON.stringify(submissions);
  const sig = signPayload(payload);
  const data: CookieData = { ts: submissions, sig };
  return btoa(JSON.stringify(data));
}

function getSubmissionsFromCookie(cookieValue: string | undefined): number[] {
  if (!cookieValue) return [];
  try {
    const decoded: CookieData = JSON.parse(atob(cookieValue));
    if (!decoded.ts || !Array.isArray(decoded.ts)) return [];
    if (!decoded.sig || !verifyPayload(JSON.stringify(decoded.ts), decoded.sig)) {
      // Signature mismatch — cookie was tampered with
      return [];
    }
    // Filter out expired entries
    const now = Date.now();
    return decoded.ts.filter((ts: number) => now - ts < RATE_WINDOW_MS);
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

/**
 * Verify Cloudflare Turnstile token server-side.
 * Gracefully degrades: if no secret key is configured, verification is skipped.
 */
async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    // No secret key configured — skip verification (graceful degradation)
    console.warn("[Turnstile] TURNSTILE_SECRET_KEY not set, skipping verification");
    return true;
  }
  if (!token || token === "error-fallback") {
    // Token missing or error fallback — reject
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("[Turnstile] Verification error:", error);
    // On verification error, allow submission (fail open, not closed)
    return true;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting via signed cookie
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

    // Validate with zod (includes privacyConsent and turnstileToken)
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || "Datos inv\u00e1lidos";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    // Server-side privacy consent verification (Ley 25.326)
    if (!result.data.privacyConsent) {
      return NextResponse.json(
        { success: false, message: "Debe aceptar el tratamiento de datos personales." },
        { status: 400 }
      );
    }

    // Verify Turnstile token server-side
    const turnstileValid = await verifyTurnstile(result.data.turnstileToken);
    if (!turnstileValid) {
      return NextResponse.json(
        { success: false, message: "Verificación de seguridad fallida. Intente nuevamente." },
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
