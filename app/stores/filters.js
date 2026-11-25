import { defineStore } from 'pinia'
import { SORT_OPTIONS, filterTracks } from '~/utils/tracks.js'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    searchQuery: '',
    authors: [],
    years: [],
    genres: [],
    sort: SORT_OPTIONS[0],
  }),

  getters: {
    hasActiveFilters: (state) =>
      Boolean(state.searchQuery.trim()) ||
      state.authors.length > 0 ||
      state.years.length > 0 ||
      state.genres.length > 0,
  },

  actions: {
    setSearchQuery(value) {
      this.searchQuery = String(value || '')
    },

    setAuthors(value) {
      this.authors = Array.isArray(value) ? [...value] : []
    },

    setYears(value) {
      this.years = Array.isArray(value) ? [...value] : []
    },

    setGenres(value) {
      this.genres = Array.isArray(value) ? [...value] : []
    },

    setSort(value) {
      this.sort = value
    },

    toggleAuthor(value) {
      this.authors = this.authors.includes(value)
        ? this.authors.filter((item) => item !== value)
        : [...this.authors, value]
    },

    toggleYear(value) {
      this.years = this.years.includes(value)
        ? this.years.filter((item) => item !== value)
        : [...this.years, value]
    },

    toggleGenre(value) {
      this.genres = this.genres.includes(value)
        ? this.genres.filter((item) => item !== value)
        : [...this.genres, value]
    },

    reset() {
      this.searchQuery = ''
      this.authors = []
      this.years = []
      this.genres = []
      this.sort = SORT_OPTIONS[0]
    },

    apply(tracks) {
      return filterTracks(tracks, {
        searchQuery: this.searchQuery,
        authors: this.authors,
        years: this.years,
        genres: this.genres,
        sort: this.sort,
      })
    },
  },
})
