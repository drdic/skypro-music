<script setup>
import { computed, watch } from 'vue'
import { publicPath } from '~/utils/publicPath.js'
import { useTrackList } from '~/composables/useTrackList.js'
import { useAuthStore } from '~/stores/auth.js'
import { useCatalogStore } from '~/stores/catalog.js'
import { useNotifications } from '~/composables/useNotifications.js'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tracks: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  showFilters: {
    type: Boolean,
    default: true,
  },
  emptyText: {
    type: String,
    default: 'Треки не найдены',
  },
})

const tracksRef = computed(() => props.tracks)

const {
  SORT_OPTIONS,
  authorItems,
  yearItems,
  genreItems,
  filteredTracks,
  activeTrackId,
  filtersStore,
  playerStore,
  selectTrack,
} = useTrackList(tracksRef)

const authStore = useAuthStore()
const catalogStore = useCatalogStore()
const { notify } = useNotifications()

const searchQuery = computed({
  get: () => filtersStore.searchQuery,
  set: (value) => filtersStore.setSearchQuery(value),
})

async function handleToggleFavorite(track) {
  if (!authStore.isAuthorized) {
    notify('Войдите, чтобы добавлять треки в избранное', 'info')
    return
  }

  try {
    await catalogStore.toggleFavorite(track._id)
  } catch (error) {
    notify(error.message || 'Не удалось изменить избранное', 'error')
  }
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

  <h2 class="centerblock__h2">{{ title }}</h2>

  <FilterControls
    v-if="showFilters"
    v-model:authors="filtersStore.authors"
    v-model:years="filtersStore.years"
    v-model:genres="filtersStore.genres"
    v-model:sort="filtersStore.sort"
    :author-options="authorItems"
    :year-options="yearItems"
    :genre-options="genreItems"
    :sort-options="SORT_OPTIONS"
  />

  <div v-if="loading" class="state state_loading">Загрузка…</div>

  <div v-else-if="errorMessage" class="state state_error">
    {{ errorMessage }}
  </div>

  <div v-else-if="!filteredTracks.length" class="state">{{ emptyText }}</div>

  <Playlist
    v-else
    :tracks="filteredTracks"
    :active-track-id="activeTrackId"
    :is-playing="playerStore.isPlaying"
    :favorite-ids="catalogStore.favoriteIds"
    @select="selectTrack"
    @toggle-favorite="handleToggleFavorite"
  />
</template>

<style scoped>
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

@media screen and (max-width: 900px) {
  .centerblock__h2 {
    font-size: 42px;
    line-height: 48px;
    margin-bottom: 30px;
  }
}
</style>
