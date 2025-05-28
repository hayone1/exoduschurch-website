<script setup lang="ts">
import type { ButtonContent } from '~/types';

const {
    title = "default title",
    positions = {
        body: "order-first",
        image: "order-last"
    },
    buttonColumns = 'grid-cols-1',
    bodyButtons = [],
} = defineProps<{
    title: string,
    positions?: {
        body: string,
        image: string
    }
    buttonColumns?: string
    bodyButtons?: ButtonContent[]
    image?: {
        url: string
        aspectRatio?: string
        placeholder?: string
        alt?: string
    }
    video?: {
        url: string
    }
}>();

const section_id = transformToId(title);
</script>
<template>
    <div :id="section_id" class="grid grid-cols-1 md:grid-cols-2 justify-items-center sm:justify-items-start items-center gap-4">
        <div :class="positions.image">
            <NuxtPicture v-if="image" class="rounded-lg" :class="image.aspectRatio" :src="image.url"
                :placeholder="image.placeholder" :alt="image.alt" loading="lazy" />
            <video v-if="video" class="rounded-lg" controls muted autoplay>
                <source :src="video.url" type="video/mp4">
            </video>
        </div>
        <div :class="positions.body">
            <h2 v-if="title" class="text-2xl font-semibold text-center w-full">{{ title }}</h2>
            <slot></slot>
            <div class="grid gap-1 auto-rows-max" :class="buttonColumns">
                <UButton v-for="buttonData in bodyButtons" :label="buttonData.label" :variant="buttonData.variant"
                    :color="buttonData.color" :class="buttonData.class" :icon="buttonData.icon"
                    class="col-span-full md:col-span-1 justify-center"/>

            </div>
        </div>
    </div>
</template>


<style scoped></style>