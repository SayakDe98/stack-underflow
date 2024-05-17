import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { publicPaths } from "./app/utils/constants";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(path);
  const cookieStore = cookies();
  const token =
    request.cookies.get("token")?.value || cookieStore.get("token") || "";

  if (isPublicPath && token && path !== "/") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token && path !== "/") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

export const config = {
  matcher: ["/", "/login", "/register"],
};
