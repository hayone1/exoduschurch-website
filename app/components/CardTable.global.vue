<script setup lang="ts">
import { motion } from 'motion-v';
const {
    data = []
} = defineProps<{
    data: {
        id: string
        name: string,
        title: string,
        date: Date,
        body: string
        event: string
    }[]
}>();
const filteredData = computed(() => data);
</script>
<template>
    <UCard>
        <
    </UCard>
    <motion.ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-2 justify-items-stretch">
        <AnimatePresence>
            <motion.li v-for="cardData in data" :key="cardData.id"
                :exit="{ opacity: 0 }" layout>
                <UCard class="size-full">
                    <template #header>
                        <h2 v-if="cardData.title" class="text-2xl font-semibold">
                            {{ cardData.title }}
                        </h2>
                    </template>
    
                    <p class="line-clamp-3 text-wrap">
                        {{ cardData.body }}
                    </p>
    
                    <template #footer>
                        <p class="italic text-xs text-muted">
                            {{ cardData.name }} | {{ cardData.date }} | {{ cardData.event }}
                        </p>
                    </template>
                </UCard>
            </motion.li>
        </AnimatePresence>
    </motion.ul>
</template>


<style scoped></style>