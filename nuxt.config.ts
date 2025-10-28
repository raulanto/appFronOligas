// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt','nuxt-charts'],

  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase:
      process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  colorMode: {
    preference: 'light',
  },



})