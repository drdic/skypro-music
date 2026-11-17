// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  telemetry: false,
  css: ['~/assets/theme.css', '~/assets/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'skypro.music',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [{ rel: 'stylesheet', href: '/fonts/montserrat.css' }],
    },
  },
})
