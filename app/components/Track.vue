<script setup>
import { formatDuration } from '~/utils/formatDuration.js'
import { publicPath } from '~/utils/publicPath.js'

defineProps({
  track: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="playlist__item">
    <div class="playlist__track">
      <div class="track__title">
        <div class="track__titleImage">
          <svg class="track__titleSvg">
            <use :href="publicPath('img/icon/sprite.svg#icon-note')"></use>
          </svg>
        </div>
        <div class="track__title-text">
          <a class="track__titleLink" href="#">
            {{ track.name }}
          </a>
        </div>
      </div>
      <div class="track__author">
        <a class="track__authorLink" href="#">{{ track.author }}</a>
      </div>
      <div class="track__album">
        <a class="track__albumLink" href="#">{{ track.album }}</a>
      </div>
      <div class="track__time">
        <svg class="track__timeSvg">
          <use :href="publicPath('img/icon/sprite.svg#icon-like')"></use>
        </svg>
        <span class="track__timeText">{{ formatDuration(track.duration_in_seconds) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playlist__item {
  width: 100%;
  display: block;
  margin-bottom: 12px;
}

.playlist__track {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.track__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  flex: 1 1 40%;
}

.track__titleImage {
  flex: 0 0 auto;
  width: 51px;
  height: 51px;
  padding: 16px;
  background: var(--color-bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
}

.track__titleSvg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: var(--color-text-muted);
}

.track__title-text {
  flex: 1 1 auto;
  min-width: 0;
}

.track__titleLink {
  display: block;
  min-width: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track__author {
  flex: 0 1 29%;
  min-width: 0;
  display: flex;
  justify-content: flex-start;
}

.track__authorLink {
  min-width: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track__album {
  flex: 0 1 22%;
  min-width: 0;
}

.track__albumLink {
  display: block;
  min-width: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track__time {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.track__timeSvg {
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: var(--color-text-secondary);
}

.track__timeText {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: var(--color-text-secondary);
}

@media screen and (max-width: 900px) {
  .playlist__track {
    flex-wrap: wrap;
    gap: 5px;
  }

  .track__title {
    flex: 1 1 100%;
  }

  .track__author,
  .track__album {
    flex: 0 1 auto;
  }
}
</style>
