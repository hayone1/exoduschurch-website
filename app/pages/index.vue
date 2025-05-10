<script setup lang="ts">
import { card } from '#build/ui';
import { animate, useInView, stagger, motion } from 'motion-v';

interface CardData {
    backgroundImage?: string
    backdropClasses?: string[]
    title?: string
    titleIcon?: string
    textWithImage?: {
        pretext?: string,
        imageUrl: string,
        postText?: string,
        imageClass?: string
    }
    bodyImage?: string
    qrCodeUrl?: string
    bodyButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    }[]
    footerButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
    }[]
    body?: string
    bodies?: {
        title: string,
        body: string,
        footer: string
    }[],
    showFooter?: boolean
    showHeader?: boolean
    footer?: string
    class: string
    cardClass?: string
    variant: "outline" | "subtle" | "solid" | "soft"
}

const defaultpageCardsData: CardData[] = [
    {
        title: "Welcome To",
        textWithImage: {
            pretext: "Ex",
            imageUrl: "/images/exodus-missions-logo-icon.png",
            postText: "dus Church",
            imageClass: "h-15 pb-5"
        },
        // backgroundImage: "bg-[linear-gradient(to_right,_#1e3a8a_30%,_transparent_70%),url('/images/worship-stock-image-1.jpg')]",
        bodyButtons: [
            { label: "I'm New" },
            { label: "About us", variant: 'outline' },
        ],
        // body: "making disciples of all nations",
        class: "flex flex-row col-span-full md:col-span-7 rounded-xl bg-cover bg-[url(/images/worship-stock-image-1.jpg)]",
        cardClass: "bg-gradient-to-r from-black/60 from-60% to-black/0 to-90%",
        variant: "solid",
        footer: "Making disciples of all nations.",
        showFooter: true,
        showHeader: true,
        backdropClasses: [
            "backdrop-blur-xs -z-1 mask-r-from-10% mask-r-to-40%",
            "backdrop-grayscale z-0 mask-r-from-40% mask-r-to-80%",
        ]
    },
    {
        title: "Testimonies",
        qrCodeUrl: "bit.ly/exodus_testimonies",
        footerButtons: [
            { label: "Share a testimony" },
            { label: "View", variant: 'outline' },
        ],
        class: "col-span-full sm:col-span-6 md:col-span-3 bg-cover bg-[url(/images/exoduschurch-testimony.jpg)]",
        cardClass: "bg-gradient-to-r from-black/60 from-60% to-black/0 to-90%",
        variant: "outline",
        showFooter: true,
        showHeader: true,
        backdropClasses: ["backdrop-blur-xs -z-1 mask-r-from-100%"]
    },
    {
        title: "Service Units",
        footerButtons: [
            { label: "Join a unit" },
        ],
        showFooter: true,
        showHeader: true,
        body: "At the Exodus Church, everyone is given a chance to serve the Lord and our culture is to serve with all our heart, soul and mind.",
        class: "col-span-full sm:col-span-4 md:col-span-3 bg-cover bg-right bg-[url(/images/exoduschurch-technical-unit.jpg)]",
        cardClass: "bg-gradient-to-r from-black/60 from-60% to-black/0 to-90%",
        variant: "outline",
        backdropClasses: [
            "backdrop-blur-xs -z-1 [mask-image:linear-gradient(to_right,rgba(0,0,0,.4)_10%,rgba(0,0,0,.4)_100%)]",
            "backdrop-grayscale z-0 [mask-image:linear-gradient(to_right,rgba(0,0,0,.3)_0%,rgba(0,0,0,.3)_100%)]",
        ]
    },
    {
        titleIcon: "i-fluent-location-ripple-20-regular",
        showHeader: true,
        bodies: [
            {
                title: "SUNDAY",
                body: "Kobi's food, Oregun, Ikeja",
                footer: "10:00 AM"
            },
            {
                title: "THURSDAY",
                body: "Online",
                footer: "6:00 PM"
            },
        ],
        class: "col-span-7",
        cardClass: "bg-transparent",
        backdropClasses: [
            "bg-cover bg-[url(/images/navigation-illustration.svg)] mask-x-from-20% mask-y-from-20%"
        ],
        variant: "solid"
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
\hy6
<template>
    <UContainer ref="mainContainerRef">
        <div :class="`grid grid-flow-row-dense grid-cols-10 ${rowCount} gap-6`" id="index-page-div">
            <motion.div v-for="(cardData, index) in pageCardsData" :class="`${cardData.class}`"
                :initial="pageCardVariant(index).offscreen" :whileInView="pageCardVariant(index).onscreen"
                :inViewOptions="{ once: true, margin: '50% 0px' }">
                <!-- <div v-if="cardData.backgroundGreyScaleMask" :class="`absolute size-full backdrop-grayscale z-0 ${cardData.backgroundGreyScaleMask}`"/> -->
                 <div v-if="cardData.backdropClasses" class="absolute size-full">
                     <motion.div v-for="overlayClass in cardData.backdropClasses"
                         :class="`absolute size-full ${overlayClass}`"
                         :initial="pageCardVariant(index).backdropOffscreen"
                         :whileInView="pageCardVariant(index).backdropOnScreen" :inViewOptions="{ once: true }" />

                 </div>
                <UCard :variant="cardData.variant"
                    :class="`max-h-100 basis-2/3 text-white z-3 ${cardData.cardClass}`">

                    <template v-if="cardData.showHeader" #header>
                        <UButton v-if="cardData.titleIcon" :icon="cardData.titleIcon" size="xl"
                            variant="link" class="text-6xl text-white justify-center w-full" />
                        <h2 v-if="cardData.title" class="text-2xl font-semibold">{{ cardData.title }}</h2>
                    </template>
                    <motion.div :id="`main-card-body-${index}`" :initial="pageCardVariant(index).textOffscreen"
                        class="flex flex-col" :whileInView="pageCardVariant(index).textOnScreen"
                        :inViewOptions="{ once: true }">

                        <div v-if="cardData.textWithImage" class="flex flex-row text-3xl sm:text-5xl logo-title">
                            <span v-if="cardData.textWithImage.pretext">
                                {{ cardData.textWithImage.pretext }}
                            </span>
                            <NuxtImg v-if="cardData.textWithImage.imageUrl" :src="cardData.textWithImage.imageUrl"
                                class="h-15 sm:h-20 pb-5" />
                            <span v-if="cardData.textWithImage.postText">
                                {{ cardData.textWithImage.postText }}
                            </span>
                        </div>
                        <Qrcode v-if="cardData.qrCodeUrl" :value="cardData.qrCodeUrl" variant="circle" :radius="1"
                            class="rounded-xl max-h-40" />
                        <p v-if="cardData.body" class>{{ cardData.body }}</p>
                        <div v-if="cardData.bodies" class="grid grid-cols-2 gap-2 justify-items-center border-2 border-solid divide-dashed divide-indigo-200">
                            <UCard v-for="bodyData in cardData.bodies" variant="solid"
                                class="bg-transparent col-span-full sm:col-span-1 text-white">
                                <template #header>
                                    <h2 v-if="bodyData.title" class="text-2xl font-semibold">{{ bodyData.title }}</h2>
                                </template>

                                <Placeholder class="h-32" />

                                <template #footer>
                                    <Placeholder class="h-8" />
                                </template>
                            </UCard>
                        </div>
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