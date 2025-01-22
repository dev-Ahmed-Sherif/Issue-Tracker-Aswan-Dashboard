import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "ar"],

//   // Used when no locale matches
//   defaultLocale: "ar",
// });
const publicPages = ["/ar", "/en"];
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "ar",
});

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  // console.log("nextUrl", nextUrl);
  let accessCookie = req.cookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  let refreshCookie = req.cookies.get(`${process.env.REFRESH_TOKEN_COOKIE}`);
  // get the current cookie for local language
  let locale = req.cookies.get(`${process.env.NEXT_LOCALE}`);

  // If access or refresh token exists, return return to dashboard page
  if (
    accessCookie === undefined &&
    refreshCookie === undefined &&
    !publicPages.includes(nextUrl.pathname)
  ) {
    // console.log("in", publicPages.includes(nextUrl.pathname));
    return Response.redirect(
      locale
        ? `${process.env.DOMAIN}/${locale?.value}`
        : `${process.env.DOMAIN}/ar`
    );
  }

  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
