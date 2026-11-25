<script setup>
import { computed, onMounted, ref } from 'vue'
import { publicPath } from '~/utils/publicPath.js'
import { useAuthStore } from '~/stores/auth.js'
import { useCatalogStore } from '~/stores/catalog.js'

const authStore = useAuthStore()
const catalogStore = useCatalogStore()

const isMounted = ref(false)

const collections = computed(() =>
  catalogStore.collections.length ? catalogStore.collections.slice(0, 3) : [],
)

const showAuthorized = computed(() => isMounted.value && authStore.isAuthorized)

onMounted(() => {
  isMounted.value = true
  catalogStore.fetchCollections()
})
</script>

<template>
  <div class="main__sidebar">
    <div class="sidebar__personal">
      <NuxtLink v-if="!showAuthorized" class="sidebar__login" to="/login">Войти</NuxtLink>
      <template v-else>
        <p class="sidebar__personalName">{{ authStore.userName }}</p>
        <NuxtLink class="sidebar__icon" to="/favorites" aria-label="Избранные треки">
          <svg>
            <use :href="publicPath('img/icon/sprite.svg#icon-like')"></use>
          </svg>
        </NuxtLink>
      </template>
    </div>

    <div class="sidebar__block">
      <div class="sidebar__list">
        <div v-for="(collection, index) in collections" :key="collection._id" class="sidebar__item">
          <NuxtLink class="sidebar__link" :to="`/category/${collection._id}`">
            <img
              class="sidebar__img"
              :src="publicPath(`img/playlist0${index + 1}.png`)"
              :alt="collection.name"
              width="250"
              height="170"
            />
          </NuxtLink>
        </div>
        <div v-if="!collections.length" class="sidebar__list_empty">
          <div v-for="index in 3" :key="index" class="sidebar__item">
            <img
              class="sidebar__img"
              :src="publicPath(`img/playlist0${index}.png`)"
              alt="Подборка"
              width="250"
              height="170"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.sidebar__login {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  transition: color 0.2s ease-in-out;
}

.sidebar__login:hover {
  color: var(--color-accent);
}

.sidebar__icon {
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-card);
  border-radius: 50%;
  cursor: pointer;
}

.sidebar__icon svg {
  width: 14px;
  height: 12px;
  fill: var(--color-icon-control);
  stroke: var(--color-icon-control);
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

.sidebar__list_empty {
  display: contents;
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

@media screen and (max-width: 1200px) {
  .main__sidebar {
    padding: 20px 30px;
  }
}

@media screen and (max-width: 900px) {
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
