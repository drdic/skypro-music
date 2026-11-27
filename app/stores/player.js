import { defineStore } from 'pinia'

function shuffleIds(ids) {
  const result = [...ids]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const buffer = result[index]
    result[index] = result[randomIndex]
    result[randomIndex] = buffer
  }

  return result
}

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentTrack: null,
    playlist: [],
    shuffleOrder: [],
    isShuffled: false,
    isLooping: false,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    volume: 50,
  }),

  getters: {
    hasCurrentTrack: (state) => Boolean(state.currentTrack),
    isCurrentTrackPlaying: (state) => Boolean(state.currentTrack) && state.isPlaying,

    orderedPlaylist: (state) => {
      if (!state.isShuffled || !state.shuffleOrder.length) return state.playlist

      const byId = new Map(state.playlist.map((track) => [track._id, track]))
      const result = []

      state.shuffleOrder.forEach((id) => {
        const track = byId.get(id)
        if (track) result.push(track)
      })

      state.playlist.forEach((track) => {
        if (!result.some((item) => item._id === track._id)) result.push(track)
      })

      return result
    },

    currentIndex: (state) => {
      return state.playlist.findIndex((item) => item._id === state.currentTrack?._id)
    },

    canNext: (state) => state.playlist.length > 0,

    canPrev: (state) => state.playlist.length > 0,
  },

  actions: {
    buildShuffleOrder() {
      if (!this.isShuffled) {
        this.shuffleOrder = []
        return
      }

      const ids = this.playlist.map((track) => track._id)
      this.shuffleOrder = shuffleIds(ids)
    },

    setPlaylist(tracks) {
      this.playlist = Array.isArray(tracks) ? [...tracks] : []
      this.buildShuffleOrder()
    },

    setCurrentTrack(track) {
      this.currentTrack = track || null
      this.progress = 0
      this.currentTime = 0
      this.duration = 0
    },

    setPlaying(value) {
      this.isPlaying = Boolean(value)
    },

    setProgress(value) {
      const progress = Number(value)
      this.progress = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0
    },

    setTime(currentTime, duration) {
      const current = Number(currentTime)
      const total = Number(duration)
      this.currentTime = Number.isFinite(current) ? current : 0
      this.duration = Number.isFinite(total) ? total : 0
    },

    setVolume(value) {
      const volume = Number(value)
      this.volume = Number.isFinite(volume) ? Math.min(100, Math.max(0, volume)) : 0
    },

    toggleShuffle() {
      this.isShuffled = !this.isShuffled
      if (this.isShuffled) {
        this.isLooping = false
      }
      this.buildShuffleOrder()
    },

    toggleLoop() {
      this.isLooping = !this.isLooping
      if (this.isLooping) {
        this.isShuffled = false
        this.buildShuffleOrder()
      }
    },

    nextTrack() {
      if (!this.playlist.length) return null

      if (this.currentIndex === -1) return this.playlist[0]
      if (this.currentIndex < this.playlist.length - 1) {
        return this.playlist[this.currentIndex + 1]
      }

      return this.playlist[0]
    },

    prevTrack() {
      if (!this.playlist.length) return null

      if (this.currentIndex <= 0) return this.playlist[this.playlist.length - 1]
      return this.playlist[this.currentIndex - 1]
    },

    autoNextTrack() {
      const order = this.isShuffled ? this.orderedPlaylist : this.playlist
      if (!order.length) return null

      const index = order.findIndex((item) => item._id === this.currentTrack?._id)
      if (index === -1) return null
      if (index < order.length - 1) return order[index + 1]

      return order[0]
    },
  },
})
