// https://nuxt.com/docs/api/configuration/nuxt-config
const rawBaseURL = (process.env.NUXT_APP_BASE_URL || '/').trim()
const baseURL = rawBaseURL === '/' ? '/' : `${rawBaseURL.replace(/\/+$/, '')}/`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  telemetry: false,
  css: ['~/assets/theme.css', '~/assets/main.css'],
  vite: {
    define: {
      __APP_BASE_URL__: JSON.stringify(baseURL),
    },
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'skypro.music',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
        { rel: 'stylesheet', href: `${baseURL}fonts/montserrat.css` },
      ],
    },
  },
})
