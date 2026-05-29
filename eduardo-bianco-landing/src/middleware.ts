import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to add security headers to all responses.
 * These headers protect against clickjacking, MIME sniffing,
 * XSS, and enforce HTTPS.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Prevent clickjacking — only allow framing from same origin
  response.headers.set("X-Frame-Options", "SAMEORIGIN");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS filter in browsers
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Control referrer information
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Force HTTPS for 1 year (include subdomains)
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  // Content Security Policy — restrictive but allows necessary resources
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://d8j0ntlcm91z4.cloudfront.net",
      "media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://challenges.cloudflare.com https://o1.ingest.vercel-analytics.com",
      "frame-src https://challenges.cloudflare.com",
    ].join("; ")
  );

  // Permissions policy — deny unnecessary browser features
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, apple-touch-icon.png, og-image.png (static assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|og-image.png).*)",
  ],
};
