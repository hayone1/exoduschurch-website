// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'

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
  // content: {
  //   build: {
  //     markdown: {},
  //     csv: {
  //       // Convert CSV data to JSON objects
  //       json: true,
  //       // Specify custom delimiter (default is ',')
  //       delimiter: ','
  //     }
  //   }
  // },
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
    domains: ['hayone1.github.io'],
    alias: {
      github: 'https://github.com/hayone1/throneofgrace_site-configs'
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-viewport',
    'motion-v/nuxt',
    'nuxt-qrcode',
  ]
})