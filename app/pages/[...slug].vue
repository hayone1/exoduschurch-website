<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
    queryCollection('content').path(route.path).first()
);
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
        <UCard v-if="page" variant="subtle" class="justify-center">
            <template v-if="page?.title" #header>
                <h1 class="w-full text-center text-4xl">
                    {{ page.title }}
                </h1>
            </template>
            <ContentRenderer :value="page" />
        </UCard>
        <NotFound v-else />
    </UContainer>
</template>


<style scoped></style>