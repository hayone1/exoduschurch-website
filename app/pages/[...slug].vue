<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
    queryCollection('content').path(route.path).first()
);

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description
})
</script>
<template>
    <br />
    <UContainer>
        <UCard v-if="page" variant="subtle" class="flex justify-center">
            <ContentRenderer :value="page" />
        </UCard>
        <div v-else>Page not found</div>
    </UContainer>
</template>


<style scoped></style>