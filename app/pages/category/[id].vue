<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '~/stores/catalog.js'
import { useFiltersStore } from '~/stores/filters.js'

definePageMeta({
  title: 'Подборка',
})

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()
const filtersStore = useFiltersStore()

const { data, pending, error } = await useAsyncData(
  () => `collection-${route.params.id}`,
  () => catalogStore.fetchCollectionTracks(route.params.id),
  { watch: [() => route.params.id] },
)

const collection = computed(() => data.value?.collection || null)
const tracks = computed(() => data.value?.tracks || [])
const collectionName = computed(() => collection.value?.name || 'Подборка')

watch(
  () => route.params.id,
  () => {
    filtersStore.reset()
  },
)

useHead(() => ({
  title: `${collectionName.value} | Skypro.Music`,
  meta: [
    {
      name: 'description',
      content: `Подборка треков «${collectionName.value}» в Skypro.Music`,
    },
  ],
}))

const errorMessage = computed(() => {
  if (error.value) return error.value.message || 'Не удалось загрузить подборку'
  if (!pending.value && !collection.value) return 'Подборка не найдена'
  return ''
})
</script>

<template>
  <TrackSection
    :title="collectionName"
    :tracks="tracks"
    :loading="pending"
    :error-message="errorMessage"
    empty-text="В подборке пока нет треков"
  />

  <button class="back" type="button" @click="router.push('/')">Вернуться на главную</button>
</template>

<style scoped>
.back {
  align-self: flex-start;
  margin-top: 10px;
  padding: 10px 24px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
  transition:
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}

.back:hover {
  color: var(--color-text-primary);
  border-color: var(--color-accent);
}
</style>
