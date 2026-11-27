<script setup>
import { publicPath } from '~/utils/publicPath.js'

const props = defineProps({
  tracks: {
    type: Array,
    required: true,
  },
  activeTrackId: {
    type: [Number, String],
    default: null,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
  favoriteIds: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select', 'toggle-favorite'])

function isFavorite(trackId) {
  return props.favoriteIds.includes(trackId)
}
</script>

<template>
  <div class="centerblock__content">
    <div class="content__title">
      <div class="playlistTitle__col col01">Трек</div>
      <div class="playlistTitle__col col02">Исполнитель</div>
      <div class="playlistTitle__col col03">Альбом</div>
      <div class="playlistTitle__col col04">
        <svg class="playlistTitle__svg">
          <use :href="publicPath('img/icon/sprite.svg#icon-watch')"></use>
        </svg>
      </div>
    </div>
    <div class="content__playlist">
      <Track
        v-for="track in tracks"
        :key="track._id"
        :track="track"
        :is-active="track._id === activeTrackId"
        :is-playing="isPlaying && track._id === activeTrackId"
        :is-favorite="isFavorite(track._id)"
        @select="emit('select', $event)"
        @toggle-favorite="emit('toggle-favorite', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.centerblock__content {
  display: flex;
  flex-direction: column;
}

.content__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 24px;
}

.content__playlist {
  display: flex;
  flex-direction: column;
}

.playlistTitle__col {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.playlistTitle__svg {
  width: 12px;
  height: 12px;
  fill: transparent;
  stroke: var(--color-text-secondary);
}

.col01 {
  flex: 1 1 40%;
  min-width: 0;
}

.col02 {
  flex: 0 1 29%;
  min-width: 0;
}

.col03 {
  flex: 0 1 22%;
  min-width: 0;
}

.col04 {
  flex: 0 0 auto;
  width: 60px;
  text-align: end;
}

@media screen and (max-width: 900px) {
  .col01 {
    flex: 1 1 45%;
  }

  .col02 {
    flex: 0 1 30%;
  }

  .col03 {
    flex: 0 1 20%;
  }

  .col04 {
    flex: 0 0 auto;
    width: 5%;
  }
}
</style>
