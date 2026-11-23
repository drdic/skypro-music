import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentTrack: null,
    playlist: [],
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    volume: 50,
  }),

  getters: {
    hasCurrentTrack: (state) => Boolean(state.currentTrack),
    isCurrentTrackPlaying: (state) => Boolean(state.currentTrack) && state.isPlaying,
  },

  actions: {
    setPlaylist(tracks) {
      this.playlist = Array.isArray(tracks) ? tracks : []
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
  },
})
