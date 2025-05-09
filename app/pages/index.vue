<script setup lang="ts">
import { animate, useInView, stagger, motion } from 'motion-v';

interface CardData {
    backgroundImage?: string
    title: string
    prebodyImageText?: string
    bodyImage?: string
    postbodyImageText?: string
    bodyButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    }[]
    body?: string
    footer?: string
    class: string
    variant: "outline" | "subtle" | "solid" | "soft"
}

const defaultpageCardsData: CardData[] = [
    {
        title: "Welcome To",
        prebodyImageText: "Ex",
        // backgroundImage: "bg-[linear-gradient(to_right,_#1e3a8a_30%,_transparent_70%),url('/images/worship-stock-image-1.jpg')]",
        backgroundImage: "bg-[url(/images/worship-stock-image-1.jpg)]",
        bodyImage: "/images/exodus-missions-logo-icon.png",
        postbodyImageText: "dus Church",
        bodyButtons: [
            { label: "I'm New" },
            { label: "About us", variant: 'outline' },
        ],
        // body: "making disciples of all nations",
        class: "col-span-7 w-full aspect-21/9",
        variant: "outline",
        footer: "Making disciples of all nations."
    },
    {
        title: "Lorem Ipsum 2",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-3 w-full",
        variant: "outline"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-3 row-span-2 w-full",
        variant: "subtle"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-7 w-full",
        variant: "subtle"
    },
    {
        title: "Lorem Ipsum",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        class: "col-span-7 w-full aspect-21/9",
        variant: "subtle"
    },
];
const pageCardsData = defaultpageCardsData.map((cardData, index) => ({
    ...cardData, id: "page-card-" + index, domRef: ref()
}));
const mainContainerRef = useTemplateRef('mainContainerRef');
// const cardsRefs = useTemplateRef('pageCards');
const rowCount = "grid-rows-" + Math.ceil(pageCardsData.length / 2);

const pageCardVariant = (delayIndex: number) => ({
    offscreen: {
        y: 300,
        // opacity: .5,
        filter: "blur(10px)"
    },
    onscreen: {
        y: 0,
        // opacity: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            // bounce: 0.3,
            duration: .8,
            delay: (delayIndex) / 10
        },
    },
});
</script>

<template>
    <UContainer ref="mainContainerRef">
        <div :class="`grid grid-flow-row grid-cols-10 ${rowCount} gap-6`" id="index-page-div">
            <motion.div v-for="(cardData, index) in pageCardsData" :class="cardData.class"
                        :initial="pageCardVariant(index).offscreen" :whileInView="pageCardVariant(index).onscreen"
                        :inViewOptions="{ once: true }">
                <UCard :variant="cardData.variant"
                    :class="`${cardData.backgroundImage} bg-cover bg-right`">
                    <div class="backdrop-blur-xs size-full z-0">

                    </div>
                    <template v-if="cardData.title" #header>
                        <h2 class="text-2xl font-semibold">{{ cardData.title }}</h2>
                    </template>
                    <div class="flex flex-row text-5xl">
                        <span v-if="cardData.prebodyImageText">
                            {{ cardData.prebodyImageText }}
                        </span>
                        <NuxtImg v-if="cardData.bodyImage" :src="cardData.bodyImage"
                                class="rounded-2xl h-20 pb-5" />
                        <span v-if="cardData.postbodyImageText">
                            {{ cardData.postbodyImageText }}
                        </span>
                    </div>
                    <p v-if="cardData.body" class>{{ cardData.body }}</p>
                    
                    <div v-if="cardData.bodyButtons" class="flex flex-row flex-wrap gap-2">
                        <UButton v-for="buttonData in cardData.bodyButtons"
                        :label="buttonData.label" :variant="buttonData.variant"
                        color="neutral" />
                        
                    </div>
                    <template v-if="cardData.footer" #footer>
                        <span>{{ cardData.footer }}</span>
                    </template>
                </UCard>
            </motion.div>
            <!-- <NuxtImg class="col-span-7 rounded-xl w-full"
                src="https://hayone1.github.io/throneofgrace_site-configs/laboratory.jpg" /> -->
        </div>
    </UContainer>
</template>

<style scoped>
h2 {
    font-family: 'Elianto', sans-serif;
}
</style>