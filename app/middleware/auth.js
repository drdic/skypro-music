import { useAuthStore } from '~/stores/auth.js'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const authStore = useAuthStore()

  if (!authStore.access) {
    authStore.init()
  }

  if (!authStore.isAuthorized) {
    return navigateTo('/login')
  }
})
