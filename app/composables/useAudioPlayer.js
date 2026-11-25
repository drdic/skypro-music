import { usePlayerStore } from '~/stores/player.js'

const audioElement = ref(null)
let frameId = null

export function useAudioPlayer() {
  const playerStore = usePlayerStore()

  function getAudio() {
    return audioElement.value
  }

  function stopProgressLoop() {
    if (frameId !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(frameId)
    }
    frameId = null
  }

  function updateProgress() {
    const audio = getAudio()
    if (!audio) return

    const duration = audio.duration
    const currentTime = audio.currentTime
    playerStore.setTime(currentTime, duration)
    playerStore.setProgress(duration ? (currentTime / duration) * 100 : 0)

    if (!audio.paused && !audio.ended) {
      frameId = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(updateProgress) : null
    } else {
      frameId = null
    }
  }

  function startProgressLoop() {
    stopProgressLoop()
    updateProgress()
  }

  function applyVolume() {
    const audio = getAudio()
    if (!audio) return
    audio.volume = playerStore.volume / 100
  }

  function bindEvents(element) {
    if (element.dataset.playerBound === 'true') return

    element.dataset.playerBound = 'true'
    element.addEventListener('play', startProgressLoop)
    element.addEventListener('pause', handlePause)
    element.addEventListener('ended', handleEnded)
    element.addEventListener('loadedmetadata', updateProgress)
  }

  function initPlayer(element) {
    if (!element) return

    audioElement.value = element
    applyVolume()
    bindEvents(element)

    playerStore.setPlaying(!element.paused)
    updateProgress()
  }

  function destroyPlayer() {
    const audio = getAudio()
    stopProgressLoop()
    if (!audio) return

    audio.removeEventListener('play', startProgressLoop)
    audio.removeEventListener('pause', handlePause)
    audio.removeEventListener('ended', handleEnded)
    audio.removeEventListener('loadedmetadata', updateProgress)
    delete audio.dataset.playerBound
    audio.pause()
    audioElement.value = null
    playerStore.setPlaying(false)
  }

  async function play() {
    const audio = getAudio()
    if (!audio) return

    try {
      await audio.play()
      playerStore.setPlaying(true)
      startProgressLoop()
    } catch {
      playerStore.setPlaying(false)
    }
  }

  function pause() {
    const audio = getAudio()
    if (!audio) return

    audio.pause()
    stopProgressLoop()
    playerStore.setPlaying(false)
    updateProgress()
  }

  function handlePause() {
    stopProgressLoop()
    playerStore.setPlaying(false)
    updateProgress()
  }

  function handleEnded() {
    stopProgressLoop()
    playerStore.setPlaying(false)
    playerStore.setProgress(100)
  }

  async function playTrack(track) {
    const audio = getAudio()
    if (!audio || !track) return

    if (playerStore.currentTrack?._id !== track._id) {
      playerStore.setCurrentTrack(track)
      audio.src = track.track_file
    } else if (audio.ended) {
      audio.currentTime = 0
      playerStore.setTime(0, audio.duration)
      playerStore.setProgress(0)
    }

    await play()
  }

  async function togglePlay() {
    const audio = getAudio()
    if (!audio) return

    if (audio.paused) {
      await play()
    } else {
      pause()
    }
  }

  function seekTo(percentage) {
    const audio = getAudio()
    if (!audio || !audio.duration) return

    const value = Math.min(100, Math.max(0, Number(percentage) || 0))
    audio.currentTime = (value / 100) * audio.duration
    playerStore.setProgress(value)
    updateProgress()
  }

  function setVolume(value) {
    playerStore.setVolume(value)
    applyVolume()
  }

  function getPlaylistIndex() {
    const playlist = playerStore.playlist
    return playlist.findIndex((item) => item._id === playerStore.currentTrack?._id)
  }

  async function playPlaylistTrack(index) {
    const playlist = playerStore.playlist
    if (!playlist.length) return

    const normalized = (index + playlist.length) % playlist.length
    await playTrack(playlist[normalized])
  }

  async function nextTrack() {
    const index = getPlaylistIndex()
    if (index === -1) return
    await playPlaylistTrack(index + 1)
  }

  async function prevTrack() {
    const index = getPlaylistIndex()
    if (index === -1) return
    await playPlaylistTrack(index - 1)
  }

  return {
    initPlayer,
    destroyPlayer,
    play,
    pause,
    playTrack,
    togglePlay,
    seekTo,
    setVolume,
    nextTrack,
    prevTrack,
  }
}
