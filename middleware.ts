import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  privateRoutes,
  publicRoutes,
  apiAuthPrefix,
  apiUploadthingAuthPrefix,
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  const isUploadthing = nextUrl.pathname.startsWith(apiUploadthingAuthPrefix)

  if (isApiAuthRoute) {
    // public for everyone and next-auth
    return null
  }

  if (isUploadthing) {
    // public for UPLOADTHING
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // stop logged in user from visiting the auth routes
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  if (!isLoggedIn && isPrivateRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
