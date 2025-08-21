/**
 * @description Middleware for handling
 * user sessions for API requests.
 */
import { NextResponse, NextRequest } from 'next/server'
import { getUserSession } from '@services/interface'

export default async function middleware(request: NextRequest) {
    const res = NextResponse.next()

    const hasUuid = request.cookies.has('UUID')
    const hasJwt = request.cookies.has('JWT')

    if (hasJwt && hasUuid) {
        return res
    }

    // If no current session create session
    // and set cookies 

    try {
        const session = await getUserSession()
        const setCookie = session.headers.get('set-cookie')
        res.headers.set('set-cookie', setCookie || "")
    } catch (error) {
        // Pass through errors
    } finally {
        return res
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|assets).*)",
    ],
}