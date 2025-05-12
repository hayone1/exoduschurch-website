<script setup lang="ts">
import type { InlineImageText } from '~/types';
const props = defineProps<{
    textWithImage: InlineImageText
}>();
</script>

<template>
    <div class="flex flex-row text-3xl sm:text-5xl logo-title">
        <span v-if="textWithImage.pretext">
            {{ textWithImage.pretext }}
        </span>
        <NuxtImg v-if="textWithImage.imageUrl" :src="textWithImage.imageUrl"
            :class="textWithImage.imageClass" />
        <span v-if="textWithImage.postText">
            {{ textWithImage.postText }}
        </span>
    </div>
</template>


<style scoped></style>