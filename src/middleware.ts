import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || ''
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
// see 
export const config = {
    matcher: [
        '/',
        '/profile',
        '/home',
        '/login',
        '/signup'
    ]
}