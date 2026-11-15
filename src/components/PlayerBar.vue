<script setup>
import { publicPath } from '@/utils/publicPath.js'

defineProps({
  track: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="bar">
    <div class="bar__content">
      <div class="bar__playerProgress"></div>
      <div class="bar__playerBlock">
        <div class="bar__player">
          <div class="player__controls">
            <div class="player__btnPrev">
              <svg class="player__btnPrevSvg">
                <use :href="publicPath('img/icon/sprite.svg#icon-prev')"></use>
              </svg>
            </div>
            <div class="player__btnPlay btn">
              <svg class="player__btnPlaySvg">
                <use :href="publicPath('img/icon/sprite.svg#icon-play')"></use>
              </svg>
            </div>
            <div class="player__btnNext">
              <svg class="player__btnNextSvg">
                <use :href="publicPath('img/icon/sprite.svg#icon-next')"></use>
              </svg>
            </div>
            <div class="player__btnRepeat btnIcon">
              <svg class="player__btnRepeatSvg">
                <use :href="publicPath('img/icon/sprite.svg#icon-repeat')"></use>
              </svg>
            </div>
            <div class="player__btnShuffle btnIcon">
              <svg class="player__btnShuffleSvg">
                <use :href="publicPath('img/icon/sprite.svg#icon-shuffle')"></use>
              </svg>
            </div>
          </div>

          <div class="player__trackPlay">
            <div class="trackPlay__contain">
              <div class="trackPlay__image">
                <svg class="trackPlay__svg">
                  <use :href="publicPath('img/icon/sprite.svg#icon-note')"></use>
                </svg>
              </div>
              <div class="trackPlay__author">
                <a class="trackPlay__authorLink" href="#">
                  {{ track ? track.name : 'Ты та...' }}
                </a>
              </div>
              <div class="trackPlay__album">
                <a class="trackPlay__albumLink" href="#">
                  {{ track ? track.author : 'Баста' }}
                </a>
              </div>
            </div>

            <div class="trackPlay__likeDis">
              <div class="trackPlay__like btnIcon">
                <svg class="trackPlay__likeSvg">
                  <use :href="publicPath('img/icon/sprite.svg#icon-like')"></use>
                </svg>
              </div>
              <div class="trackPlay__dislike btnIcon">
                <svg class="trackPlay__dislikeSvg">
                  <use :href="publicPath('img/icon/sprite.svg#icon-dislike')"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bar__volumeBlock">
          <div class="volume__content">
            <div class="volume__image">
              <svg class="volume__svg">
                <use :href="publicPath('img/icon/sprite.svg#icon-volume')"></use>
              </svg>
            </div>
            <div class="volume__progress btn">
              <input class="volume__progressLine btn" type="range" name="range" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  flex: 0 0 auto;
  width: 100%;
  background: var(--color-bg-player);
}

.bar__content {
  display: flex;
  flex-direction: column;
}

.bar__playerProgress {
  width: 100%;
  height: 5px;
  background: var(--color-bg-progress);
}

.bar__playerBlock {
  height: 73px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.bar__player {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.bar__volumeBlock {
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 92px 0 0;
}

.player__controls {
  display: flex;
  flex-direction: row;
  padding: 0 27px 0 31px;
}

.player__btnPrev,
.player__btnPlay,
.player__btnNext,
.player__btnRepeat,
.player__btnShuffle {
  padding: 5px;
  display: flex;
  align-items: center;
}

.player__btnPrev {
  margin-right: 23px;
}

.player__btnPrevSvg {
  width: 15px;
  height: 14px;
}

.player__btnPlay {
  margin-right: 23px;
}

.player__btnPlaySvg {
  width: 22px;
  height: 20px;
  fill: var(--color-icon-control);
}

.player__btnNext {
  margin-right: 28px;
  fill: var(--color-icon-accent);
}

.player__btnNextSvg {
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: var(--color-icon-control);
}

.player__btnRepeat {
  margin-right: 24px;
}

.player__btnRepeatSvg {
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: var(--color-text-secondary);
}

.player__btnShuffle {
  display: flex;
  align-items: center;
}

.player__btnShuffleSvg {
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: var(--color-text-secondary);
}

.player__trackPlay {
  display: flex;
  flex-direction: row;
}

.trackPlay__contain {
  width: auto;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'image author'
    'image album';
  align-items: center;
}

.trackPlay__image {
  width: 51px;
  height: 51px;
  background-color: var(--color-bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  grid-area: image;
}

.trackPlay__svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: var(--color-text-muted);
}

.trackPlay__author {
  grid-area: author;
  min-width: 49px;
}

.trackPlay__authorLink {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  white-space: nowrap;
}

.trackPlay__album {
  grid-area: album;
  min-width: 49px;
}

.trackPlay__albumLink {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: var(--color-text-primary);
}

.trackPlay__likeDis {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 26%;
}

.trackPlay__like {
  padding: 5px;
}

.trackPlay__likeSvg {
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: var(--color-text-secondary);
}

.trackPlay__dislike {
  padding: 5px;
  margin-left: 28.5px;
}

.trackPlay__dislikeSvg {
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: var(--color-text-secondary);
}

.volume__content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.volume__image {
  width: 13px;
  height: 18px;
  margin-right: 17px;
}

.volume__svg {
  width: 13px;
  height: 18px;
  fill: transparent;
}

.volume__progress {
  width: 109px;
  display: flex;
  align-items: center;
}

.volume__progressLine {
  width: 100%;
  height: 2px;
  appearance: none;
  background: var(--color-volume);
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.volume__progressLine::-webkit-slider-runnable-track {
  height: 2px;
  background: var(--color-volume);
  border-radius: 5px;
}

.volume__progressLine::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--color-thumb-bg);
  border: 2px solid var(--color-thumb-border);
  border-radius: 50%;
  position: relative;
  margin-top: -7px;
}

.btn {
  cursor: pointer;
}

.btnIcon:hover svg {
  fill: transparent;
  stroke: var(--color-icon-hover);
  cursor: pointer;
}

.btnIcon:active svg {
  fill: transparent;
  stroke: var(--color-text-primary);
  cursor: pointer;
}

.btnIcon:active .trackPlay__likeSvg,
.btnIcon:active .trackPlay__dislikeSvg {
  fill: var(--color-text-secondary);
  stroke: var(--color-text-primary);
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .bar {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .bar__playerBlock {
    height: auto;
    flex-wrap: wrap;
    padding: 8px 0;
  }

  .bar__volumeBlock {
    padding: 0 15px;
  }

  .player__controls {
    padding: 0 10px;
  }

  .trackPlay__likeDis {
    display: none;
  }
}
</style>
