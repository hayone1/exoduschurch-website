<script setup lang="ts">
import type { ButtonContent, ImageContent } from '~/types';

const {
    title = "default title",
    positions = {
        body: "order-first",
        image: "order-last"
    },
    buttonColumns = 'grid-cols-1',
    bodyButtons = [],
} = defineProps<{
    id: string
    title: string,
    positions?: {
        body: string,
        image: string
    }
    buttonColumns?: string
    bodyButtons?: ButtonContent[]
    image?: ImageContent
    video?: {
        url: string
    }
}>();

const route = useRoute();
// const section_id = transformToId(title);
var element_id: string;
const elementRef = useTemplateRef('elementRef');
if (typeof (route.fullPath) !== 'undefined' && route.fullPath.includes("#")) {
    element_id = route.fullPath.split("#").at(-1)!;
}

onMounted(() => {
    if (element_id === elementRef.value?.id) {
        nextTick(() => {
            setTimeout(() => {
                // console.log("element_id found:", element_id);
                elementRef.value?.scrollIntoView(
                    {
                        behavior: "smooth",
                    }
                );
            }, 500) //not sure if this is good code lol
        })
    }
});

</script>
<template>
    <div :id="id" ref="elementRef"
        class="grid grid-cols-1 md:grid-cols-2 justify-items-center sm:justify-items-start items-center gap-4">
        <div :class="positions.image">
            <NuxtImg v-if="image" class="rounded-lg" :class="image.aspectRatio" :src="image.url"
                :placeholder="image.placeholder" :alt="image.alt" loading="lazy" />
            <video v-if="video" class="rounded-lg" controls muted autoplay>
                <source :src="video.url" type="video/mp4">
            </video>
        </div>
        <div :class="positions.body">
            <h2 v-if="title" class="text-2xl font-semibold text-center w-full">
                {{ title }}
            </h2>
            <slot></slot>
            <div class="grid gap-1 auto-rows-max" :class="buttonColumns">
                <UButton v-for="buttonData in bodyButtons" :label="buttonData.label" :variant="buttonData.variant"
                    :color="buttonData.color" :class="buttonData.class" :icon="buttonData.icon"
                    :to="buttonData.link" class="col-span-full md:col-span-1 justify-center" />

            </div>
        </div>
    </div>
</template>


<style scoped></style>