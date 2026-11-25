import { defineStore } from 'pinia'
import { request } from '~/utils/api.js'
import { useAuthStore } from '~/stores/auth.js'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    tracks: [],
    collections: [],
    favorites: [],
    loading: false,
    error: '',
  }),

  getters: {
    favoriteIds: (state) => state.favorites.map((track) => track._id),
  },

  actions: {
    async fetchTracks() {
      if (this.tracks.length) return this.tracks

      this.loading = true
      this.error = ''

      try {
        const response = await request('/catalog/track/all/')
        this.tracks = response?.data || []
        return this.tracks
      } catch (error) {
        this.error = error.message
        return []
      } finally {
        this.loading = false
      }
    },

    async fetchCollections() {
      this.error = ''

      try {
        const response = await request('/catalog/selection/all')
        this.collections = (response?.data || []).filter((item) => item.name && item.items?.length)
        return this.collections
      } catch (error) {
        this.error = error.message
        return []
      }
    },

    async fetchCollection(id) {
      const response = await request(`/catalog/selection/${id}/`)
      return response?.data || null
    },

    async fetchCollectionTracks(id) {
      const all = await this.fetchTracks()
      const collection = await this.fetchCollection(id)
      if (!collection) return { collection: null, tracks: [] }

      const ids = collection.items || []
      const map = new Map(all.map((track) => [track._id, track]))
      const tracks = ids.map((itemId) => map.get(itemId)).filter(Boolean)

      return { collection, tracks }
    },

    async fetchFavorites() {
      const authStore = useAuthStore()

      this.loading = true
      this.error = ''

      try {
        const response = await authStore.authorizedRequest('/catalog/track/favorite/all/')
        this.favorites = response?.data || []
        return this.favorites
      } catch (error) {
        this.error = error.message
        this.favorites = []
        return []
      } finally {
        this.loading = false
      }
    },

    isFavorite(trackId) {
      return this.favoriteIds.includes(trackId)
    },

    async toggleFavorite(trackId) {
      const authStore = useAuthStore()
      const method = this.isFavorite(trackId) ? 'DELETE' : 'POST'

      await authStore.authorizedRequest(`/catalog/track/${trackId}/favorite/`, { method })

      if (method === 'DELETE') {
        this.favorites = this.favorites.filter((track) => track._id !== trackId)
      } else {
        const track = this.tracks.find((item) => item._id === trackId)
        if (track) this.favorites = [...this.favorites, track]
      }
    },
  },
})
