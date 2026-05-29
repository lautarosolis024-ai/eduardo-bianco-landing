/**
 * Validate required environment variables at build/startup time.
 * Call this early in server-side code (API routes, etc.) to fail fast
 * when critical configuration is missing.
 */
export function validateEnv() {
  // RESEND_API_KEY is optional — email sending will gracefully fallback
  const optionalVars = ["RESEND_API_KEY", "EMAIL_TO"];

  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      console.warn(
        `[ENV] ${varName} is not set. Related features will use fallback behavior.`
      );
    }
  }

  // EMAIL_FROM is critical in production — onboarding@resend.dev only delivers to account owner
  if (!process.env.EMAIL_FROM && process.env.NODE_ENV === "production") {
    console.error(
      "[ENV] EMAIL_FROM is not set in production. Email sending will fail. " +
      "Set it to a verified Resend sender (e.g. 'Eduardo Bianco <contacto@eduardobianco.com.ar>')."
    );
  }
}
