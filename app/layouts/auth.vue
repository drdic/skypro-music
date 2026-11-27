<script setup>
const route = useRoute()

const pageTitle = computed(() => {
  const title = route.meta.title
  return title ? `${title} | Skypro.Music` : 'Skypro.Music'
})

useHead(() => ({
  title: pageTitle.value,
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'description', content: 'Вход и регистрация в Skypro.Music' },
    { property: 'og:site_name', content: 'Skypro Music' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: pageTitle.value },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: pageTitle.value },
  ],
}))
</script>

<template>
  <div class="wrapper">
    <div class="containerEnter">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}

.containerEnter {
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
}
</style>
