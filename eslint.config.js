import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/.nuxt/**', '**/.output/**', '**/coverage/**', 'plans/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        useTheme: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useHead: 'readonly',
        useSeoMeta: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        navigateTo: 'readonly',
        showError: 'readonly',
        clearError: 'readonly',
        definePageMeta: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        useNuxtApp: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        reactive: 'readonly',
        onMounted: 'readonly',
        onBeforeUnmount: 'readonly',
        $fetch: 'readonly',
        __APP_BASE_URL__: 'readonly',
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  skipFormatting,
])
