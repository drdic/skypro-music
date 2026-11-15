<script setup>
import Navbar from './components/Navbar.vue'
import FilterControls from './components/FilterControls.vue'
import Playlist from './components/Playlist.vue'
import PlayerBar from './components/PlayerBar.vue'
import { tracks } from './data/tracks.js'
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <main class="main">
        <Navbar />

        <div class="centerblock">
          <div class="centerblock__search">
            <svg class="search__svg">
              <use href="/img/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
              class="search__text"
              type="search"
              placeholder="Поиск"
              name="search"
            />
          </div>

          <h2 class="centerblock__h2">Треки</h2>

          <FilterControls />

          <Playlist :tracks="tracks" />
        </div>

        <div class="main__sidebar">
          <div class="sidebar__personal">
            <p class="sidebar__personalName">Sergey.Ivanov</p>
            <div class="sidebar__icon">
              <svg>
                <use href="/img/icon/sprite.svg#logout"></use>
              </svg>
            </div>
          </div>

          <div class="sidebar__block">
            <div class="sidebar__list">
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    src="/img/playlist01.png"
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
                    src="/img/playlist02.png"
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
                    src="/img/playlist03.png"
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

      <PlayerBar :track="tracks[0]" />

      <footer class="footer"></footer>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
}

.container {
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.centerblock {
  width: auto;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
}

.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
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
  color: #ffffff;
  outline: none;
}

.search__text::placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.centerblock__h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
  color: #ffffff;
}

.main__sidebar {
  max-width: 418px;
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
  color: #ffffff;
  margin-right: 16px;
}

.sidebar__icon {
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
}

.sidebar__block {
  height: 100%;
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
  height: 0;
}

@media (max-width: 1200px) {
  .centerblock {
    padding: 20px 30px;
  }

  .main__sidebar {
    padding: 20px 30px;
  }
}

@media (max-width: 900px) {
  .container {
    height: auto;
    padding-bottom: 120px;
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
