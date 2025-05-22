<script setup lang="ts">
import type { InlineImageText, BasicContent } from '~/types';
const props = defineProps<{
    content: BasicContent[]
}>();
</script>

<template>
    <div class="grid grid-cols-2 gap-2 justify-center divide-x-0 divide-y-2
            sm:divide-x-2 sm:divide-y-0 divide-double">
        <UCard v-for="contentData in content" variant="solid"
            class="bg-transparent rounded-none col-span-full sm:col-span-1 text-white">
            <template #header>
                <div class="flex justify-center w-full border-2">
                    <h2 v-if="contentData.title" class="text-2xl font-semibold">
                        {{ contentData.title }}
                    </h2>
                </div>
            </template>

            <div class="flex justify-center w-full">
                <h2 v-if="contentData.body" class="font-semibold text-center">
                    {{ contentData.body }}
                </h2>
            </div>

            <template #footer>
                <div class="flex justify-center w-full">
                    <h2 v-if="contentData.footer" class="">
                        {{ contentData.footer }}
                    </h2>
                </div>
            </template>
        </UCard>
    </div>
</template>
