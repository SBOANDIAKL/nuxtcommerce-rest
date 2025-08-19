import pkg from './package.json'

export default defineNuxtConfig({
  // devtools: { enabled: false },

  modules: ['@vueuse/nuxt', '@nuxt/ui', '@nuxt/image', 'notivue/nuxt', '@nuxt/eslint'],
  css: ['~/assets/css/main.css', 'notivue/notification.css', 'notivue/animations.css'],

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-08-03',
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  notivue: {
    position: 'top-center',
    limit: 3,
    notifications: {
      global: {
        duration: 3000,
      },
    },
  },
})
