<script setup lang="ts">
import type { CardTableData } from '~/types';

const route = useRoute();
const stem = route.params.id as string;
const { data: page } = await useAsyncData(stem, () =>
  queryCollection('cardTables')
    .where('stem', '=', stem)
    .first()
)
// const { data: pages } = await useAsyncData('cardTables', () => 
//   queryCollection('cardTables').select('stem', 'title', 'description').all()
// )
// onMounted(() => {
//     console.log("Stem is:", stem);
//     console.log("cardTable is:", JSON.stringify(page.value));
// })
if (route.query.section_id) {
  const section = document.getElementById(route.query.section_id.toString());
  section?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description,
    ogTitle: '%s',
    robots: 'index, follow',
})
defineOgImageComponent('Main', {
    logo: '/images/exodus-missions-logo-icon.png',
    icon: 'i-mdi-instagram',
})


</script>
<template>
    <br />
    <UContainer>
        <CardTable v-if="page?.data" :data="(page.data as CardTableData[])"/>
        <!-- <div v-if="page?.data">Hii</div> -->
        <div v-else>Page not found</div>
    </UContainer>
</template>


<style scoped></style>