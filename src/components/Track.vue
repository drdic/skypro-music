<script setup>
import { formatDuration } from '../utils/formatDuration.js'

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
            <use href="/img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div class="track__title-text">
          <a class="track__titleLink" href="#">
            {{ track.name }}
            <span class="track__titleSpan"></span>
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
          <use href="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        <span class="track__timeText">{{
          formatDuration(track.duration_in_seconds)
        }}</span>
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
}

.track__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 447px;
}

.track__titleImage {
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
}

.track__titleSvg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

.track__titleLink {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.track__titleSpan {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
}

.track__author {
  width: 321px;
  display: flex;
  justify-content: flex-start;
}

.track__authorLink {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
}

.track__album {
  width: 245px;
}

.track__albumLink {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
}

.track__time {
  display: flex;
  align-items: center;
}

.track__timeSvg {
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
}

.track__timeText {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
}

@media (max-width: 900px) {
  .playlist__track {
    flex-wrap: wrap;
    gap: 5px;
  }

  .track__title {
    width: 100%;
  }

  .track__author,
  .track__album {
    width: auto;
  }
}
</style>
