<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth.js'
import { useCatalogStore } from '~/stores/catalog.js'
import { useFiltersStore } from '~/stores/filters.js'

definePageMeta({
  middleware: 'auth',
  title: 'Мои треки',
})

useHead({
  title: 'Мои треки | Skypro.Music',
  meta: [{ name: 'description', content: 'Ваши любимые треки в Skypro.Music' }],
})

const router = useRouter()
const authStore = useAuthStore()
const catalogStore = useCatalogStore()
const filtersStore = useFiltersStore()

const ready = ref(false)

const tracks = computed(() => catalogStore.favorites)
const errorMessage = computed(() => catalogStore.error || '')

onMounted(async () => {
  authStore.init()

  if (!authStore.isAuthorized) {
    router.push('/login')
    return
  }

  filtersStore.reset()
  await catalogStore.fetchFavorites()
  ready.value = true
})
</script>

<template>
  <TrackSection
    title="Мои треки"
    :tracks="tracks"
    :loading="!ready"
    :error-message="errorMessage"
    empty-text="Вы ещё не добавили треки в избранное"
  />
</template>
