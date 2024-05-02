import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { adminPaths, publicPaths } from "./app/utils/constants";


export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    const isPublicPath = publicPaths.includes(path);
    const cookieStore = cookies();
    const token = request.cookies.get("token")?.value || cookieStore.get("token") || '';

    if(isPublicPath && token && path !== '/') {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if(!isPublicPath && !token && path !== '/') {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    if(adminPaths.includes(request.nextUrl.pathname)) {
        //decode token and check if token is of admin then allow him to access these routes otherwise send an alert that user is not admin hence can't access these routes and then forward them to home page
    }
}

export const config = {
  matcher: ['/', '/login', '/register'],
};