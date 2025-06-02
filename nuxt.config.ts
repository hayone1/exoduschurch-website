// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['o-arc', 'o-progress'].includes(tag),
    }
  },
  site: {
    // url: 'https://localhost.com',
    name: 'Exodus Church',
    description: 'Welcome to Exodus Church',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
  app: {
    head: {
      titleTemplate: '%s - %siteName',
    }
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  // vite: {
  //   plugins: [
  //     Components({
  //       dts: true,
  //       resolvers: [
  //         MotionResolver()
  //       ],
  //     }),
  //   ],
  // },
  image: {
    provider: "ipx",
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-viewport',
    'motion-v/nuxt',
    'nuxt-qrcode',
  ]
})