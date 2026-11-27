<script setup>
import { useAuthStore } from '~/stores/auth.js'
import { useCatalogStore } from '~/stores/catalog.js'

const route = useRoute()
const authStore = useAuthStore()
const catalogStore = useCatalogStore()

const pageTitle = computed(() => {
  const title = route.meta.title
  return title ? `${title} | Skypro.Music` : 'Skypro.Music'
})

useHead(() => ({
  title: pageTitle.value,
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'description', content: 'Слушайте музыку онлайн в Skypro.Music' },
    { property: 'og:site_name', content: 'Skypro Music' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: pageTitle.value },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle.value },
  ],
}))

onMounted(async () => {
  authStore.init()

  if (authStore.isAuthorized) {
    catalogStore.fetchFavorites()
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <main class="main">
        <Navbar />
        <div class="main__centerblock">
          <slot />
        </div>
        <MainSidebar />
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

.main__centerblock {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 100px 111px;
}

.footer {
  display: none;
}

@media screen and (max-width: 1200px) {
  .main__centerblock {
    padding: 20px 30px 100px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    padding-bottom: 120px;
  }

  .main {
    flex-wrap: wrap;
  }

  .main__centerblock {
    padding: 20px 15px 30px;
    flex-basis: 100%;
  }
}
</style>
