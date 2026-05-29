/**
 * Validate required environment variables at build/startup time.
 * Call this early in server-side code (API routes, etc.) to fail fast
 * when critical configuration is missing.
 */
export function validateEnv() {
  // These are optional — email sending will gracefully fallback
  const optionalVars = ["RESEND_API_KEY", "EMAIL_FROM", "EMAIL_TO"];

  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      console.warn(
        `[ENV] ${varName} is not set. Related features will use fallback behavior.`
      );
    }
  }
}
