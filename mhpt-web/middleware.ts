import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
// import { parseJwt } from "@/lib/Constants";

const protectedRoutes = ['/daily', '/logs', '/']
const publicRoutes = ['/login', '/signup']

export function middleware(req: NextRequest) {
  // const cookies = cookie.parse(req.headers.get("Cookie") || "");
  // const token = cookies.token;
  // const tokenFromOauth = req.cookies.get("token");
  //
  // let tokenData;
  //
  // // if (token) {
  // //   tokenData = parseJwt(token.toString());
  // // }
  // //
  // // if (tokenFromOauth) {
  // //   tokenData = parseJwt(tokenFromOauth.value.toString());
  // // }
  // console.log('token:' + token);
  // console.log('tokenFromOAuth:' + tokenFromOauth);
  // console.log('pathname:' + req.nextUrl.pathname);
  //
  // if (req.nextUrl.pathname.startsWith("/oauth")) {
  //   const oAuthToken = req.nextUrl.searchParams.get("token") || "";
  //
  //   if (oAuthToken.length > 0) {
  //
  //     const response = NextResponse.next();
  //
  //     response.cookies.set({
  //       name: "token",
  //       value: oAuthToken.toString(),
  //       maxAge: 60 * 60 * 24 * 7,
  //       path: '/', // Ensure the cookie is available throughout the site
  //       httpOnly: true, // Cookie cannot be accessed via JavaScript
  //       secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  //       sameSite: 'lax', // Allow cookies to be sent in same-site and cross-site requests
  //     });
  //
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }
  //
  // if (
  //   !token &&
  //   !tokenFromOauth &&
  //   !req.nextUrl.pathname.startsWith("/login")
  // ) {
  //   console.log("cant enter recruiter ");
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  //
  //
  //
  // console.log('middle-e');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.ico$).*)'],
}