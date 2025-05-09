<script setup lang="ts">
import { animate, useInView, stagger, motion } from 'motion-v';

const defaultpageCardsData = [
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-7 w-full aspect-21/9"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-3 w-full"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-3 row-span-2 w-full"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-7 w-full"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-7 w-full aspect-21/9"
    },
];
const pageCardsData = ref(defaultpageCardsData.map((cardData, index) => ({
    ...cardData, id: "page-card-" + index
})));
const cardsRefs = useTemplateRef('pageCards');
cardsRefs.value
const rowCount = "grid-rows-" + Math.ceil(pageCardsData.value.length/2);

const mainContainerRef = useTemplateRef('mainContainerRef')
watch(mainContainerRef, () => {
    const elements = 
    inView(cardsRefs.value, (element) => {

    })
}, { once: true });
</script>

<template>
    <UContainer ref="mainContainerRef">
        <div :class="`grid grid-flow-row grid-cols-10 ${rowCount} gap-6`"
                id="index-page-div">
            <motion.div v-for="cardData in pageCardsData" :class="cardData.class">
                <UCard  ref="pageCards"
                       :id="cardData.id" variant="subtle">
                    <template #header>
                        <!-- <Placeholder class="h-8" /> -->
                        <h2>{{ cardData.title }}</h2>
                    </template>
                    
                    <p>{{ cardData.body }}</p>
    
                    <template #footer>
                        <p>This is the card footer</p>
                    </template>
                </UCard>

            </motion.div>
            <!-- <NuxtImg class="col-span-7 rounded-xl w-full"
                src="https://hayone1.github.io/throneofgrace_site-configs/laboratory.jpg" /> -->
        </div>
    </UContainer>
</template>