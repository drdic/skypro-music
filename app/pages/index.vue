<script setup>
import { publicPath } from '~/utils/publicPath.js'
import { usePlayerStore } from '~/stores/player.js'
import { useAudioPlayer } from '~/composables/useAudioPlayer.js'

const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/'
const UNKNOWN = 'Неизвестно'
const SORT_OPTIONS = ['По умолчанию', 'Сначала новые', 'Сначала старые']

const { data: response, pending, error } = await useFetch(API_URL)

const tracks = computed(() => response.value?.data || [])

const playerStore = usePlayerStore()
const { playTrack } = useAudioPlayer()

const searchQuery = ref('')
const selectedAuthors = ref([])
const selectedYears = ref([])
const selectedGenres = ref([])
const selectedSort = ref(SORT_OPTIONS[0])

function getAuthor(track) {
  const author = String(track.author || '').trim()
  return !author || author === '-' ? UNKNOWN : author
}

function getYear(track) {
  const year = String(track.release_date || '').split('-')[0]
  return year || UNKNOWN
}

function getGenres(track) {
  if (Array.isArray(track.genre)) {
    return track.genre.filter(Boolean).map((item) => item.trim())
  }
  return track.genre ? [track.genre.trim()] : []
}

function sortWithUnknownLast(items, compare) {
  return items.sort((a, b) => {
    if (a === UNKNOWN) return 1
    if (b === UNKNOWN) return -1
    return compare(a, b)
  })
}

const authorItems = computed(() => {
  const items = new Set()
  tracks.value.forEach((track) => items.add(getAuthor(track)))
  return sortWithUnknownLast(Array.from(items), (a, b) => a.localeCompare(b))
})

const yearItems = computed(() => {
  const items = new Set()
  tracks.value.forEach((track) => items.add(getYear(track)))
  return sortWithUnknownLast(Array.from(items), (a, b) => b.localeCompare(a))
})

const genreItems = computed(() => {
  const items = new Set()
  tracks.value.forEach((track) => getGenres(track).forEach((item) => items.add(item)))
  return sortWithUnknownLast(Array.from(items), (a, b) => a.localeCompare(b))
})

const filteredTracks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  const result = tracks.value.filter((track) => {
    if (query && !String(track.name || '').toLowerCase().includes(query)) return false

    if (selectedAuthors.value.length && !selectedAuthors.value.includes(getAuthor(track))) {
      return false
    }

    if (selectedYears.value.length && !selectedYears.value.includes(getYear(track))) {
      return false
    }

    if (selectedGenres.value.length) {
      const genres = getGenres(track)
      if (!genres.some((item) => selectedGenres.value.includes(item))) return false
    }

    return true
  })

  if (selectedSort.value === 'Сначала новые') {
    result.sort((a, b) =>
      String(b.release_date || '').localeCompare(String(a.release_date || '')),
    )
  }

  if (selectedSort.value === 'Сначала старые') {
    result.sort((a, b) =>
      String(a.release_date || '').localeCompare(String(b.release_date || '')),
    )
  }

  return result
})

function handleSelectTrack(track) {
  playTrack(track)
}

watch(
  filteredTracks,
  (list) => {
    playerStore.setPlaylist(list)
  },
  { immediate: true },
)
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <main class="main">
        <Navbar />

        <div class="centerblock">
          <div class="centerblock__search">
            <svg class="search__svg">
              <use :href="publicPath('img/icon/sprite.svg#icon-search')"></use>
            </svg>
            <input
              v-model="searchQuery"
              class="search__text"
              type="search"
              placeholder="Поиск"
              name="search"
            />
          </div>

          <h2 class="centerblock__h2">Треки</h2>

          <FilterControls
            v-model:authors="selectedAuthors"
            v-model:years="selectedYears"
            v-model:genres="selectedGenres"
            v-model:sort="selectedSort"
            :author-options="authorItems"
            :year-options="yearItems"
            :genre-options="genreItems"
            :sort-options="SORT_OPTIONS"
          />

          <div v-if="pending" class="state state_loading">Загрузка…</div>

          <div v-else-if="error" class="state state_error">
            Не удалось загрузить треки. Попробуйте обновить страницу.
          </div>

          <div v-else-if="!filteredTracks.length" class="state">Треки не найдены</div>

          <Playlist
            v-else
            :tracks="filteredTracks"
            :active-track-id="playerStore.currentTrack?._id || null"
            @select="handleSelectTrack"
          />
        </div>

        <div class="main__sidebar">
          <div class="sidebar__personal">
            <p class="sidebar__personalName">Sergey.Ivanov</p>
            <div class="sidebar__icon">
              <svg>
                <use :href="publicPath('img/icon/sprite.svg#logout')"></use>
              </svg>
            </div>
          </div>

          <div class="sidebar__block">
            <div class="sidebar__list">
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    :src="publicPath('img/playlist01.png')"
                    alt="day's playlist"
                    width="250"
                    height="170"
                  />
                </a>
              </div>
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    :src="publicPath('img/playlist02.png')"
                    alt="day's playlist"
                    width="250"
                    height="170"
                  />
                </a>
              </div>
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    :src="publicPath('img/playlist03.png')"
                    alt="day's playlist"
                    width="250"
                    height="170"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PlayerBar />

      <footer class="footer"></footer>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.container {
  max-width: 1920px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: nowrap;
}

.centerblock {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 100px 111px;
}

.centerblock__search {
  flex: 0 0 auto;
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 51px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: var(--color-text-primary);
  fill: transparent;
}

.search__text {
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  outline: none;
}

.search__text::placeholder {
  background-color: transparent;
  color: var(--color-text-primary);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.centerblock__h2 {
  flex: 0 0 auto;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
  color: var(--color-text-primary);
}

.state {
  padding: 40px 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: var(--color-text-secondary);
}

.state_error {
  color: var(--color-accent-hover);
}

.main__sidebar {
  flex: 0 0 auto;
  width: 418px;
  max-width: 418px;
  display: flex;
  flex-direction: column;
  padding: 20px 90px 20px 78px;
}

.sidebar__personal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
}

.sidebar__personalName {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  margin-right: 16px;
}

.sidebar__icon {
  width: 43px;
  height: 43px;
  background-color: var(--color-bg-card);
  border-radius: 50%;
  cursor: pointer;
}

.sidebar__block {
  flex: 1 1 auto;
  padding: 240px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar__item {
  width: 250px;
  height: 150px;
}

.sidebar__item:not(:last-child) {
  margin-bottom: 30px;
}

.sidebar__link {
  width: 100%;
  height: 100%;
}

.sidebar__img {
  width: 100%;
  height: auto;
}

.footer {
  display: none;
}

@media screen and (max-width: 1200px) {
  .centerblock {
    padding: 20px 30px 100px;
  }

  .main__sidebar {
    padding: 20px 30px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    padding-bottom: 120px;
  }

  .main {
    flex-wrap: wrap;
  }

  .centerblock {
    padding: 20px 15px 30px;
    flex-basis: 100%;
  }

  .centerblock__h2 {
    font-size: 42px;
    line-height: 48px;
    margin-bottom: 30px;
  }

  .main__sidebar {
    width: 100%;
    max-width: 100%;
    flex-basis: 100%;
    padding: 0 15px 30px;
  }

  .sidebar__block {
    padding: 30px 0 0 0;
  }

  .sidebar__list {
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }

  .sidebar__item {
    width: 100px;
    height: 60px;
  }

  .sidebar__item:not(:last-child) {
    margin-bottom: 0;
  }
}
</style>
