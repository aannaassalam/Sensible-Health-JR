import { NextRequest, NextResponse } from "next/server";
// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  const has_token = request.cookies.get(process.env.NEXT_APP_TOKEN_NAME!);

  const userRole = JSON.parse(request.cookies.get("user")?.value || "{}")
    ?.role?.[0]?.name;
  const auth_routes = [
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify"
  ];

  if (
    (has_token === undefined || has_token === null) &&
    !auth_routes.includes(request.nextUrl.pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  } else if (has_token && request.nextUrl.pathname.startsWith("/auth/")) {
    const url = request.nextUrl.clone();
    url.pathname = userRole === "ROLE_ADMIN" ? "/" : "/staff-roster";
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  } else if (
    (userRole === "ROLE_CARER" &&
      (request.nextUrl.pathname.startsWith("/staff-roster") ||
        request.nextUrl.pathname.startsWith("/user/profile"))) ||
    (userRole === "ROLE_ADMIN" &&
      !request.nextUrl.pathname.startsWith("/staff-roster"))
  ) {
    return NextResponse.next();
  } else if (
    (userRole === "ROLE_CARER" &&
      !(
        request.nextUrl.pathname.startsWith("/staff-roster") ||
        request.nextUrl.pathname.startsWith("/user/profile")
      )) ||
    (userRole === "ROLE_ADMIN" &&
      request.nextUrl.pathname.startsWith("/staff-roster"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = userRole === "ROLE_CARER" ? "/staff-roster" : "/";
    const response = NextResponse.redirect(url);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|sitemap.xml).*)"
  ]
};
