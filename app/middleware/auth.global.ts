import { defu } from 'defu'

type MiddlewareOptions = false | {
  /**
   * Only apply auth middleware to guest or user
   */
  only?: 'guest' | 'user'
  /**
   * Redirect authenticated user to this route
   */
  redirectUserTo?: string
  /**
   * Redirect guest to this route
   */
  redirectGuestTo?: string
}

declare module '#app' {
  interface PageMeta {
    auth?: MiddlewareOptions
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: MiddlewareOptions
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useStore<{
    user: {
      id: string
      email: string
      emailVerified: boolean
      name: string
      createdAt: Date
      updatedAt: Date
      image?: string | null
    }
    session: {
      id: string
      userId: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
      ipAddress?: string | null
      userAgent?: string | null
    }
  } | null | undefined>('auth')
  // If auth is disabled, skip middleware
  if (to.meta?.auth === false) {
    return
  }
  const { loggedIn, options, fetchSession } = useAuth()
  const { only, redirectUserTo, redirectGuestTo } = defu(to.meta?.auth, options)

  // If client-side, fetch session between each navigation
  if (import.meta.client && !store.value) {
    store.value = await fetchSession()
  }

  // If guest mode, redirect if authenticated
  if (only === 'guest' && loggedIn.value) {
    // Avoid infinite redirect
    if (to.path === redirectUserTo) {
      return
    }
    return navigateTo(redirectUserTo)
  }

  // If user mode, redirect if not authenticated
  if (only === 'user' && !loggedIn.value) {
    // Avoid infinite redirect
    if (to.path === redirectGuestTo) {
      return
    }
    return navigateTo(redirectGuestTo)
  }
})
