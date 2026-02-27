import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['hy', 'en', 'ru']
const defaultLocale = 'hy'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.) and payload routes (admin, api)
    '/((?!admin|_next/static|_next/image|api|next/|favicon.ico|.*\\.).*)',
  ],
}
