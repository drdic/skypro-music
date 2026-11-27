import { ref, watchEffect } from 'vue'
import { usePlayerStore } from '~/stores/player.js'

const audioElement = ref(null)

const CHUNK_SIZE = 256 * 1024
const CHUNK_ATTEMPTS = 4
const HEADER_TIMEOUT = 5000

let frameId = null
let streamToken = 0
let mediaSource = null
let sourceBuffer = null
let objectUrl = null
let chunkQueue = []
let started = false
let wantPlay = false
let finished = false

export function useAudioPlayer() {
  const playerStore = usePlayerStore()

  function getAudio() {
    return audioElement.value
  }

  function trackDuration() {
    const audio = getAudio()
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) return audio.duration

    const fallback = Number(playerStore.currentTrack?.duration_in_seconds)
    if (Number.isFinite(fallback) && fallback > 0) return fallback

    return 0
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

    const duration = trackDuration()
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

  function handlePlaying() {
    playerStore.setPlaying(true)
    startProgressLoop()
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

  function handleError() {
    const audio = getAudio()
    if (!audio || !audio.error) return

    stopProgressLoop()
    playerStore.setPlaying(false)
  }

  const listeners = {
    playing: handlePlaying,
    pause: handlePause,
    ended: handleEnded,
    loadedmetadata: updateProgress,
    error: handleError,
  }

  function bindEvents(element) {
    if (element.dataset.playerBound === 'true') return

    element.dataset.playerBound = 'true'
    Object.entries(listeners).forEach(([event, handler]) => {
      element.addEventListener(event, handler)
    })
  }

  function unbindEvents(element) {
    Object.entries(listeners).forEach(([event, handler]) => {
      element.removeEventListener(event, handler)
    })
    delete element.dataset.playerBound
  }

  function closeStream() {
    if (mediaSource && mediaSource.readyState === 'open') {
      try {
        mediaSource.endOfStream()
      } catch {
        sourceBuffer = null
      }
    }
  }

  function stopStream() {
    streamToken += 1

    if (sourceBuffer) {
      sourceBuffer.removeEventListener('updateend', handleUpdateEnd)
      sourceBuffer = null
    }

    closeStream()
    mediaSource = null

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      objectUrl = null
    }

    chunkQueue = []
    started = false
    wantPlay = false
    finished = false
  }

  function appendNext() {
    if (!sourceBuffer || sourceBuffer.updating || !chunkQueue.length) return

    const chunk = chunkQueue.shift()
    try {
      sourceBuffer.appendBuffer(chunk)
    } catch {
      chunkQueue.unshift(chunk)
    }
  }

  function handleUpdateEnd() {
    const audio = getAudio()

    if (audio && !started && audio.buffered.length) {
      started = true
      if (wantPlay) {
        audio.play().then(handlePlaying, () => playerStore.setPlaying(false))
      }
    }

    appendNext()

    if (
      finished &&
      !chunkQueue.length &&
      !sourceBuffer.updating &&
      mediaSource &&
      mediaSource.readyState === 'open'
    ) {
      closeStream()
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function requestChunk(url, index, token) {
    for (let attempt = 1; attempt <= CHUNK_ATTEMPTS; attempt += 1) {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), HEADER_TIMEOUT)

      try {
        const response = await fetch(url, {
          headers: {
            Range: `bytes=${index * CHUNK_SIZE}-${(index + 1) * CHUNK_SIZE - 1}`,
          },
          signal: controller.signal,
        })
        clearTimeout(timer)
        const buffer = await response.arrayBuffer()

        if (token !== streamToken) return null
        return new Uint8Array(buffer)
      } catch {
        clearTimeout(timer)
        if (token !== streamToken) return null
        await sleep(250)
        if (token !== streamToken) return null
      }
    }

    return null
  }

  async function loadStream(track) {
    const audio = getAudio()
    if (!audio || !track?.track_file) return

    audio.pause()
    stopStream()
    wantPlay = true
    const token = streamToken

    mediaSource = new MediaSource()
    objectUrl = URL.createObjectURL(mediaSource)
    audio.src = objectUrl

    await new Promise((resolve) => mediaSource.addEventListener('sourceopen', resolve, { once: true }))
    if (token !== streamToken) return

    sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg')
    sourceBuffer.addEventListener('updateend', handleUpdateEnd)

    let index = 0
    for (;;) {
      const chunk = await requestChunk(track.track_file, index, token)
      if (token !== streamToken) return

      if (!chunk) {
        if (token === streamToken) {
          wantPlay = false
          playerStore.setPlaying(false)
        }
        return
      }

      chunkQueue.push(chunk)
      appendNext()
      index += 1

      if (chunk.byteLength < CHUNK_SIZE) break
    }

    finished = true
    if (started) appendNext()
  }

  function fallbackToSource(track) {
    const audio = getAudio()
    if (!audio) return

    stopStream()
    audio.src = track.track_file
    audio.play().then(handlePlaying, () => playerStore.setPlaying(false))
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

    unbindEvents(audio)
    stopStream()
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    audioElement.value = null
    playerStore.setPlaying(false)
  }

  function play() {
    const audio = getAudio()
    if (!audio || !audio.src) return

    wantPlay = true

    if (!started) {
      playerStore.setPlaying(true)
      return
    }

    audio.play().then(handlePlaying, () => {
      wantPlay = false
      playerStore.setPlaying(false)
    })
  }

  function pause() {
    const audio = getAudio()
    if (!audio) return

    wantPlay = false
    audio.pause()
    stopProgressLoop()
    playerStore.setPlaying(false)
    updateProgress()
  }

  function playTrack(track) {
    const audio = getAudio()
    if (!audio || !track?.track_file) return

    if (playerStore.currentTrack?._id === track._id) {
      if (audio.ended) {
        audio.currentTime = 0
        playerStore.setTime(0, trackDuration())
        playerStore.setProgress(0)
      }
      play()
      return
    }

    playerStore.setCurrentTrack(track)
    playerStore.setProgress(0)

    if (typeof MediaSource === 'undefined' || !MediaSource.isTypeSupported('audio/mpeg')) {
      fallbackToSource(track)
      return
    }

    playerStore.setPlaying(true)
    loadStream(track)
  }

  function togglePlay() {
    const audio = getAudio()
    if (!audio) return

    if (audio.paused) {
      play()
    } else {
      pause()
    }
  }

  function seekTo(percentage) {
    const audio = getAudio()
    const duration = trackDuration()
    if (!audio || !duration) return

    const value = Math.min(100, Math.max(0, Number(percentage) || 0))
    const target = (value / 100) * duration

    if (audio.seekable.length) {
      const start = audio.seekable.start(0)
      const end = audio.seekable.end(audio.seekable.length - 1)
      if (target < start || target > end) {
        playerStore.setProgress(value)
        return
      }
    }

    audio.currentTime = target
    playerStore.setProgress(value)
    updateProgress()
  }

  function setVolume(value) {
    playerStore.setVolume(value)
    applyVolume()
  }

  watchEffect(() => {
    const audio = getAudio()
    if (!audio) return
    audio.volume = playerStore.volume / 100
  })

  function getPlaylistIndex() {
    const playlist = playerStore.playlist
    return playlist.findIndex((item) => item._id === playerStore.currentTrack?._id)
  }

  function playPlaylistTrack(index) {
    const playlist = playerStore.playlist
    if (!playlist.length) return

    const normalized = (index + playlist.length) % playlist.length
    playTrack(playlist[normalized])
  }

  function nextTrack() {
    const index = getPlaylistIndex()
    if (index === -1) return
    playPlaylistTrack(index + 1)
  }

  function prevTrack() {
    const index = getPlaylistIndex()
    if (index === -1) return
    playPlaylistTrack(index - 1)
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
