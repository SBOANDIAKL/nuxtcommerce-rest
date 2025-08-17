import pkg from './package.json';

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [ '@vueuse/nuxt', '@nuxt/ui', '@nuxt/image', 'notivue/nuxt', '@nuxt/eslint'],

  future: { compatibilityVersion: 4 },

  notivue: {
    position: 'top-center',
    limit: 3,
    notifications: {
      global: {
        duration: 3000,
      },
    },
  },
  css: ['~/assets/css/main.css', 'notivue/notification.css', 'notivue/animations.css'],

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  compatibilityDate: '2024-08-03',
});
