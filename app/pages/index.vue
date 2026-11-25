<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '~/stores/catalog.js'

definePageMeta({
  title: 'Главная',
})

useHead({
  title: 'Главная | Skypro.Music',
  meta: [{ name: 'description', content: 'Слушайте треки онлайн в Skypro.Music' }],
})

const catalogStore = useCatalogStore()

const { data, pending, error } = await useAsyncData('tracks', () => catalogStore.fetchTracks())

const tracks = computed(() => data.value || [])
const isLoading = computed(() => pending.value && !tracks.value.length)
const errorMessage = computed(() =>
  error.value || catalogStore.error
    ? 'Не удалось загрузить треки. Попробуйте обновить страницу.'
    : '',
)
</script>

<template>
  <TrackSection
    title="Треки"
    :tracks="tracks"
    :loading="isLoading"
    :error-message="errorMessage"
  />
</template>
