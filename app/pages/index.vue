<script setup lang="ts">
import { animate, useInView, stagger, motion } from 'motion-v';

interface CardData {
    backgroundImage?: string
    backgroundBlurMask?: string
    backgroundGreyScaleMask?: string
    title: string
    prebodyImageText?: string
    bodyImage?: string
    qrCodeUrl?: string
    bodyImageClass?: string
    postbodyImageText?: string
    bodyButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    }[]
    footerButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    }[]
    body?: string
    showFooter?: boolean
    footer?: string
    class: string
    variant: "outline" | "subtle" | "solid" | "soft"
}

const defaultpageCardsData: CardData[] = [
    {
        title: "Welcome To",
        prebodyImageText: "Ex",
        // backgroundImage: "bg-[linear-gradient(to_right,_#1e3a8a_30%,_transparent_70%),url('/images/worship-stock-image-1.jpg')]",
        bodyImage: "/images/exodus-missions-logo-icon.png",
        bodyImageClass: "h-20 pb-5",
        postbodyImageText: "dus Church",
        bodyButtons: [
            { label: "I'm New" },
            { label: "About us", variant: 'outline' },
        ],
        // body: "making disciples of all nations",
        class: "flex flex-row col-span-full md:col-span-7 rounded-xl bg-cover bg-right bg-[url(/images/worship-stock-image-1.jpg)]",
        variant: "solid",
        footer: "Making disciples of all nations.",
        showFooter: true,
        backgroundBlurMask: "[mask-image:linear-gradient(to_right,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_80%)]",
        backgroundGreyScaleMask: "[mask-image:linear-gradient(to_right,rgba(0,0,0,1)_10%,rgba(0,0,0,0)_40%)]"
    },
    {
        title: "Testimonies",
        qrCodeUrl: "bit.ly/exodus_testimonies",
        footerButtons: [
            { label: "Share a testimony" },
            { label: "View", variant: 'outline' },
        ],
        class: "col-span-full sm:col-span-6 md:col-span-3 bg-cover bg-right bg-[url(/images/exoduschurch-testimony.jpg)]",
        variant: "outline",
        showFooter: true,
        backgroundBlurMask: "[mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_100%)]"
    },
    {
        title: "Service Units",
        footerButtons: [
            { label: "Join a unit" },
        ],
        showFooter: true,
        body: "At the Exodus Church, everyone is given a chance to serve the Lord and our culture is to serve with all our heart, soul and mind.",
        class: "col-span-full sm:col-span-4 md:col-span-3 bg-cover bg-right bg-[url(/images/exoduschurch-technical-unit.jpg)]",
        variant: "outline",
        backgroundBlurMask: "[mask-image:linear-gradient(to_right,rgba(0,0,0,.3)_0%,rgba(0,0,0,.3)_100%)]",
        backgroundGreyScaleMask: "[mask-image:linear-gradient(to_right,rgba(0,0,0,.5)_10%,rgba(0,0,0,.5)_100%)]"
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
        filter: "blur(10px)",
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
    textOffscreen: {
        opacity: 0,
        y: 50,
        // backdropFilter: "blur(15px)"
    },
    textOnScreen: {
        y: 0,
        // backdropFilter: "blur(0px)",
        opacity: 1,
        transition: {
            duration: .6,
            //will happen after the onscreen animation is complete
            delay: ((delayIndex) / 10) + .8,
            ease: "easeOut"
        },
    },
    backdropOffscreen: {
        opacity: 0,
        // backdropFilter: "blur(15px)"
    },
    backdropOnScreen: {
        // backdropFilter: "blur(0px)",
        opacity: 1,
        transition: {
            duration: .6,
            //will happen after the text animation is complete
            delay: ((delayIndex) / 10) + 1,
            ease: "easeOut"
        },
    },
});
</script>

<template>
    <UContainer ref="mainContainerRef">
        <div :class="`grid grid-flow-row-dense grid-cols-10 ${rowCount} gap-6`" id="index-page-div">
            <motion.div v-for="(cardData, index) in pageCardsData" :class="`${cardData.class}`"
                :initial="pageCardVariant(index).offscreen" :whileInView="pageCardVariant(index).onscreen"
                :inViewOptions="{ once: true }">
                <!-- <div v-if="cardData.backgroundGreyScaleMask" :class="`absolute size-full backdrop-grayscale z-0 ${cardData.backgroundGreyScaleMask}`"/> -->
                <motion.div v-if="cardData.backgroundGreyScaleMask"
                            :class="`absolute size-full backdrop-grayscale z-0 ${cardData.backgroundGreyScaleMask}`"
                            :initial="pageCardVariant(index).backdropOffscreen" :whileInView="pageCardVariant(index).backdropOnScreen"
                            :inViewOptions="{ once: true }" />
                <motion.div v-if="cardData.backgroundBlurMask"
                            :class="`absolute size-full backdrop-blur-xs -z-1 ${cardData.backgroundBlurMask}`"
                            :initial="pageCardVariant(index).backdropOffscreen" :whileInView="pageCardVariant(index).backdropOnScreen"
                            :inViewOptions="{ once: true }" />
                <UCard :variant="cardData.variant"
                    :class="`max-h-100 basis-2/3 bg-gradient-to-r from-black/60 from-60% to-black/0 to-90% text-white z-3 `">

                    <template v-if="cardData.title" #header>
                        <h2 class="text-2xl font-semibold">{{ cardData.title }}</h2>
                    </template>
                    <motion.div :initial="pageCardVariant(index).textOffscreen" class="flex flex-col"
                        :whileInView="pageCardVariant(index).textOnScreen" :inViewOptions="{ once: true }">
                        <Qrcode v-if="cardData.qrCodeUrl" :value="cardData.qrCodeUrl"
                                variant="circle" :radius="1" class="rounded-xl max-h-40"/>
                        <div class="flex flex-row text-5xl logo-title">
                            <span v-if="cardData.prebodyImageText">
                                {{ cardData.prebodyImageText }}
                            </span>
                            <NuxtImg v-if="cardData.bodyImage" :src="cardData.bodyImage"
                                :class="cardData.bodyImageClass"/>
                            <span v-if="cardData.postbodyImageText">
                                {{ cardData.postbodyImageText }}
                            </span>
                        </div>
                        <p v-if="cardData.body" class>{{ cardData.body }}</p>
                        <div v-if="cardData.bodyButtons" class="flex flex-row flex-wrap gap-2">
                            <UButton v-for="buttonData in cardData.bodyButtons" :label="buttonData.label"
                                :variant="buttonData.variant" color="neutral" />

                        </div>
                    </motion.div>
                    <template v-if="cardData.showFooter" #footer>
                        <span v-if="cardData.footer">{{ cardData.footer }}</span>
                        <div v-if="cardData.footerButtons" class="flex flex-row flex-wrap gap-2">
                            <UButton v-for="buttonData in cardData.footerButtons" :label="buttonData.label"
                                :variant="buttonData.variant" color="neutral" />

                        </div>
                    </template>
                </UCard>
            </motion.div>
            <!-- <NuxtImg class="col-span-7 rounded-xl w-full"
                src="https://hayone1.github.io/throneofgrace_site-configs/laboratory.jpg" /> -->
        </div>
    </UContainer>
</template>

<style scoped>
/* h2 {
    font-family: 'Intro', 'Elianto', sans-serif;
} */
.logo-title {
    font-family: 'Roboto', sans-serif;
}
</style>