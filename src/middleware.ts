// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const locales = ["en", "ka", "ru"];
const defaultLocale = "en";

// Clerk-ის middleware-ის გამოძახება
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const clerkResponse = clerkMiddleware(request, event);
  if (clerkResponse) return clerkResponse;

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    locales.some((locale) => pathname.startsWith(`/${locale}`))
  ) {
    return NextResponse.next();
  }

  const cookieLang = request.cookies.get("language")?.value;
  const browserLang = request.headers
    .get("accept-language")
    ?.split(",")[0]
    .split("-")[0];

  const locale =
    (cookieLang && locales.includes(cookieLang) && cookieLang) ||
    (browserLang && locales.includes(browserLang) && browserLang) ||
    defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}
