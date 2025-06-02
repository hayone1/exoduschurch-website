<script lang="ts" setup>
import { defineOrganization, defineWebPage, defineWebSite, useSchemaOrg } from '@unhead/schema-org/vue'

// we can remove a lot of boilerplate from Schema.org by providing template params
// const route = useRoute()
const url = useRequestURL();
useHead({
  templateParams: {
    schemaOrg: {
      host: url.href,
      path: url.pathname,
      inLanguage: 'en',
    }
  }
})

useSchemaOrg([
  // much of the data will be inferred such as the title, description and all URLs
  defineWebPage(),
  defineWebSite({
    name: 'Exodus Church',
    description: 'Making disciples of all nations.',
  }),
  // choose an identity, either with definePerson or an defineOrganization
  defineOrganization({
    name: 'Exodus Missions',
  })
])
</script>


<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
