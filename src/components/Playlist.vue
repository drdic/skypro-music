<script setup>
import Track from '@/components/Track.vue'
import { publicPath } from '@/utils/publicPath.js'

defineProps({
  tracks: {
    type: Array,
    required: true,
  },
})
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
      <Track v-for="track in tracks" :key="track._id" :track="track" />
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
  width: 447px;
}

.col02 {
  width: 321px;
}

.col03 {
  width: 245px;
}

.col04 {
  width: 60px;
  text-align: end;
}

@media screen and (max-width: 900px) {
  .col01 {
    width: 45%;
  }

  .col02 {
    width: 30%;
  }

  .col03 {
    width: 20%;
  }

  .col04 {
    width: 5%;
  }
}
</style>
