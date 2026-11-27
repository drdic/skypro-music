import { defineStore } from 'pinia'
import { request } from '~/utils/api.js'
import {
  clearTokens,
  readTokens,
  readUser,
  saveTokens,
  saveUser,
} from '~/utils/storage.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access: '',
    refresh: '',
    user: null,
    loading: false,
    error: '',
  }),

  getters: {
    isAuthorized: (state) => Boolean(state.access),
    userName: (state) => state.user?.username || state.user?.email || '',
  },

  actions: {
    init() {
      const tokens = readTokens()
      this.access = tokens.access
      this.refresh = tokens.refresh
      this.user = readUser()
    },

    setTokens(access, refresh) {
      this.access = access || ''
      this.refresh = refresh || ''
      saveTokens(this.access, this.refresh)
    },

    setUser(user) {
      this.user = user || null
      saveUser(this.user)
    },

    async login(email, password) {
      this.loading = true
      this.error = ''

      try {
        const user = await request('/user/login/', {
          method: 'POST',
          body: { email, password },
        })
        const tokens = await request('/user/token/', {
          method: 'POST',
          body: { email, password },
        })

        this.setUser(user)
        this.setTokens(tokens.access, tokens.refresh)
        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },

    async signup(email, password, username) {
      this.loading = true
      this.error = ''

      try {
        await request('/user/signup/', {
          method: 'POST',
          body: { email, password, username },
        })
        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },

    async updateAccessToken() {
      if (!this.refresh) throw new Error('Нет данных для обновления токена')

      const tokens = await request('/user/token/refresh/', {
        method: 'POST',
        body: { refresh: this.refresh },
      })

      this.access = tokens.access
      saveTokens(this.access, this.refresh)
      return this.access
    },

    async authorizedRequest(path, options = {}) {
      if (!this.access) throw new Error('Требуется авторизация')

      try {
        return await request(path, { ...options, token: this.access })
      } catch (error) {
        if (error.statusCode !== 401) throw error

        try {
          await this.updateAccessToken()
        } catch {
          this.logout()
          throw new Error('Сессия истекла. Войдите заново.')
        }

        return await request(path, { ...options, token: this.access })
      }
    },

    logout() {
      this.access = ''
      this.refresh = ''
      this.user = null
      clearTokens()
    },
  },
})
