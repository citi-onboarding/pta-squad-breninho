import { NextResponse, type NextRequest, type MiddlewareConfig } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    if (path === '/'){
        // console.log("Tá funcionando");
        return NextResponse.redirect(new URL('/page-atendimento', request.url));
    }
    // else{
    //     console.log("Não tá funcionando");
    // }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config: MiddlewareConfig = {
    matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}