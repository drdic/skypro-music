import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'skypro-music-theme'
const DEFAULT_THEME = 'dark'
const THEMES = ['dark', 'light']

function readStoredTheme() {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }

  let stored = null

  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    stored = null
  }

  return THEMES.includes(stored) ? stored : DEFAULT_THEME
}

const theme = ref(readStoredTheme())

function applyTheme(value) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value)
  }
}

function saveTheme(value) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    return
  }
}

watch(
  theme,
  (value) => {
    applyTheme(value)
    saveTheme(value)
  },
  { immediate: true },
)

export function useTheme() {
  const isLight = computed(() => theme.value === 'light')

  function setTheme(value) {
    if (THEMES.includes(value)) {
      theme.value = value
    }
  }

  function toggleTheme() {
    theme.value = isLight.value ? 'dark' : 'light'
  }

  return {
    theme,
    isLight,
    setTheme,
    toggleTheme,
  }
}
