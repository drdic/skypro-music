<script setup>
defineProps({
  authorOptions: {
    type: Array,
    required: true,
  },
  yearOptions: {
    type: Array,
    required: true,
  },
  genreOptions: {
    type: Array,
    required: true,
  },
  sortOptions: {
    type: Array,
    required: true,
  },
})

const selectedAuthors = defineModel('authors', { type: Array, default: () => [] })
const selectedYears = defineModel('years', { type: Array, default: () => [] })
const selectedGenres = defineModel('genres', { type: Array, default: () => [] })
const selectedSort = defineModel('sort', { type: String, default: '' })

const activeFilter = ref(null)

function toggleFilter(name) {
  activeFilter.value = activeFilter.value === name ? null : name
}

function toggleInList(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function toggleAuthor(value) {
  selectedAuthors.value = toggleInList(selectedAuthors.value || [], value)
}

function toggleYear(value) {
  selectedYears.value = toggleInList(selectedYears.value || [], value)
}

function toggleGenre(value) {
  selectedGenres.value = toggleInList(selectedGenres.value || [], value)
}

function selectSort(option) {
  selectedSort.value = option
}
</script>

<template>
  <div class="centerblock__filter">
    <div class="filter__title">Искать по:</div>

    <div class="filter__wrapper">
      <button
        class="filter__button"
        :class="{ filter__button_active: activeFilter === 'author' }"
        type="button"
        @click="toggleFilter('author')"
      >
        исполнителю
        <span v-if="selectedAuthors.length" class="filter__counter">{{ selectedAuthors.length }}</span>
      </button>
      <div v-show="activeFilter === 'author'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in authorOptions"
            :key="item"
            class="filter__item"
            :class="{ filter__item_active: selectedAuthors.includes(item) }"
            @click="toggleAuthor(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="filter__wrapper">
      <button
        class="filter__button"
        :class="{ filter__button_active: activeFilter === 'year' }"
        type="button"
        @click="toggleFilter('year')"
      >
        году выпуска
        <span v-if="selectedYears.length" class="filter__counter">{{ selectedYears.length }}</span>
      </button>
      <div v-show="activeFilter === 'year'" class="filter__dropdown">
        <ul class="filter__list filter__list_sort">
          <li
            v-for="item in sortOptions"
            :key="item"
            class="filter__item"
            :class="{ filter__item_active: selectedSort === item }"
            @click="selectSort(item)"
          >
            {{ item }}
          </li>
        </ul>
        <div class="filter__divider"></div>
        <ul class="filter__list">
          <li
            v-for="item in yearOptions"
            :key="item"
            class="filter__item"
            :class="{ filter__item_active: selectedYears.includes(item) }"
            @click="toggleYear(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="filter__wrapper">
      <button
        class="filter__button"
        :class="{ filter__button_active: activeFilter === 'genre' }"
        type="button"
        @click="toggleFilter('genre')"
      >
        жанру
        <span v-if="selectedGenres.length" class="filter__counter">{{ selectedGenres.length }}</span>
      </button>
      <div v-show="activeFilter === 'genre'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in genreOptions"
            :key="item"
            class="filter__item"
            :class="{ filter__item_active: selectedGenres.includes(item) }"
            @click="toggleGenre(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centerblock__filter {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 51px;
  flex-wrap: wrap;
  gap: 10px;
}

.filter__title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 5px;
  color: var(--color-text-primary);
}

.filter__wrapper {
  position: relative;
}

.filter__button {
  position: relative;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid var(--color-text-primary);
  border-radius: 60px;
  padding: 6px 20px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition:
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.filter__button:hover,
.filter__button_active {
  border-color: var(--color-accent-hover);
  color: var(--color-accent-hover);
}

.filter__button:active {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter__counter {
  position: absolute;
  top: -8px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: var(--color-accent);
  color: #ffffff;
  font-size: 12px;
  line-height: 1;
}

.filter__dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 10;
  min-width: 210px;
  padding: 12px 0;
  border-radius: 12px;
  background-color: var(--color-bg-card);
}

.filter__list {
  max-height: 150px;
  overflow-y: auto;
}

.filter__list_sort {
  max-height: none;
}

.filter__item {
  padding: 6px 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.filter__item:hover {
  color: var(--color-accent-hover);
}

.filter__item_active {
  color: var(--color-accent);
  text-decoration: underline;
}

.filter__divider {
  height: 1px;
  margin: 6px 20px;
  background-color: var(--color-text-secondary);
  opacity: 0.4;
}

@media screen and (max-width: 900px) {
  .centerblock__filter {
    margin-bottom: 30px;
  }
}
</style>
