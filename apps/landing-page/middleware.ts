import { NextRequest, NextResponse, userAgent } from 'next/server'
import acceptLanguage from 'accept-language'

import { LOCALES } from '@vcare/const'
import { COOKIE, DEFAULT } from '@/shared/const'

acceptLanguage.languages([...LOCALES])

export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req: NextRequest) {
    const { device } = userAgent(req)
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('X-device', device.type ?? 'desktop')

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // Uncomment when ready to initialize default language in the URL
    /*
    let lng: string | null = acceptLanguage.get(req.cookies.get(COOKIE.LOCALE)?.value)

    if (!lng) {
        lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    }

    if (!lng) {
        lng = DEFAULT.LANG
    }

    if (
        !LANGUAGES.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer')!)
        const lngInReferer = LANGUAGES.find((l) => refererUrl.pathname.startsWith(`/${l}`))
        const response = NextResponse.next()
        if (lngInReferer) response.cookies.set(COOKIE.LOCALE, lngInReferer)
        return response
    }
    
    */
    return response
}