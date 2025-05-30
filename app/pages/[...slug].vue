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
    description: page.value?.description
})


</script>
<template>
    <br />
    <UContainer>
        <UCard v-if="page" variant="subtle" class="justify-center">
            <ContentRenderer :value="page" />
        </UCard>
        <div v-else>Page not found</div>
    </UContainer>
</template>


<style scoped></style>