import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

export function middleware(req: NextRequest) {
  // console.log("req headers", req.headers);
  const { nextUrl } = req;
  // let accessCookie = req.cookies.get("IssueTrackerAccessToken");
  let accessCookie = req.cookies.get(`${process.env.ACCESS_TOKEN_COOKIE}`);
  // let refreshCookie = req.cookies.get("IssueTrackerRefreshToken");
  let refreshCookie = req.cookies.get(`${process.env.REFRESH_TOKEN_COOKIE}`);

  // If no access or refresh token exists, return a 401 Unauthorized response
  if (!accessCookie && !refreshCookie) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
