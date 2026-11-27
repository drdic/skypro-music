import { computed } from 'vue'
import { usePlayerStore } from '~/stores/player.js'
import { useFiltersStore } from '~/stores/filters.js'
import { useAudioPlayer } from '~/composables/useAudioPlayer.js'
import {
  SORT_OPTIONS,
  getAuthor,
  getGenres,
  getYear,
  sortWithUnknownLast,
} from '~/utils/tracks.js'

export function useTrackList(tracks) {
  const playerStore = usePlayerStore()
  const filtersStore = useFiltersStore()
  const { playTrack } = useAudioPlayer()

  const source = computed(() => tracks.value || [])

  const authorItems = computed(() => {
    const items = new Set(source.value.map((track) => getAuthor(track)))
    return sortWithUnknownLast(items, (a, b) => a.localeCompare(b))
  })

  const yearItems = computed(() => {
    const items = new Set(source.value.map((track) => getYear(track)))
    return sortWithUnknownLast(items, (a, b) => b.localeCompare(a))
  })

  const genreItems = computed(() => {
    const items = new Set()
    source.value.forEach((track) => getGenres(track).forEach((item) => items.add(item)))
    return sortWithUnknownLast(items, (a, b) => a.localeCompare(b))
  })

  const filteredTracks = computed(() => filtersStore.apply(source.value))

  const activeTrackId = computed(() => playerStore.currentTrack?._id || null)

  function selectTrack(track) {
    playTrack(track)
  }

  return {
    SORT_OPTIONS,
    authorItems,
    yearItems,
    genreItems,
    filteredTracks,
    activeTrackId,
    filtersStore,
    playerStore,
    selectTrack,
  }
}
