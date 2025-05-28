import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    tables: defineCollection({
      type: 'data',
      source: '*.yml',
      schema: z.object({
        data: z.array(z.object({
          name: z.string(),
          title: z.string(),
          date: z.date(),
          body: z.string(),
          event: z.string()
        }))
      })
    }),
  }
})
