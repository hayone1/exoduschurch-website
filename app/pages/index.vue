<script setup lang="ts">
import { card } from '#build/ui';
import { animate, useInView, stagger, motion } from 'motion-v';

interface CardData {
    backgroundImage?: string
    backdropClasses?: string[]
    contentJustification?: string
    title?: string
    titleIcon?: string
    titleIconLink?: string
    textWithImage?: {
        pretext?: string,
        imageUrl: string,
        postText?: string,
        imageClass?: string
    }
    bodyImage?: string
    qrCodeUrl?: string
    buttonsParentClass?: string,
    bodyButtons?: {
        label: string
        variant?: "outline" | "subtle" | "solid" | "soft" | "ghost" | "link"
        class?: string
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
    //could be single images of multiplace image per slot for comparison
    carousalImages?: string[][],
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
        contentJustification: "justify-start",
        textWithImage: {
            pretext: "Ex",
            imageUrl: "/images/exodus-missions-logo-icon.png",
            postText: "dus Church",
            imageClass: "h-15 sm:h-20 pb-5"
        },
        // backgroundImage: "bg-[linear-gradient(to_right,_#1e3a8a_30%,_transparent_70%),url('/images/worship-stock-image-1.jpg')]",
        bodyButtons: [
            { label: "I'm New" },
            { label: "About us", variant: 'outline' },
        ],
        // body: "making disciples of all nations",
        class: "flex flex-row col-span-full -translate-y-3",
        cardClass: "mt-20 bg-gradient-to-r",
        variant: "solid",
        footer: "Making disciples of all nations.",
        showFooter: true,
        showHeader: true,
        backdropClasses: [
            "bg-cover mask-repeat-x mask-[url(/images/brush-mask-1-from-top.svg)] bg-[url(/images/worship-stock-image-1.jpg)]",
            "bg-cover mask-t-from-50% mask-t-to-70% sm:mask-t-from-10% sm:mask-t-to-60%  bg-[url(/images/worship-stock-image-1.jpg)]",
            "backdrop-blur-xs -z-1 mask-r-from-10% mask-r-to-40%",
            "backdrop-grayscale z-0 mask-r-from-40% mask-r-to-80%",
        ]
    },
    {
        // title: "Testimonies",
        contentJustification: "justify-center",
        footerButtons: [
            { label: "Share a testimony" },
            { label: "View testimonies", variant: 'outline' },
        ],
        class: "col-span-full md:col-span-5 lg:col-span-3",
        cardClass: "bg-transparent",
        variant: "solid",
        //should apply to all button?
        buttonsParentClass: "justify-center h-80 pt-20",
        bodyButtons: [{
            label: "Testimonies",
            variant: 'link',
            class: "text-6xl md:text-4xl font-extrabold text-neutral-600"
        }],
        showFooter: true,
        // showHeader: true,
        backdropClasses: [
            "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
        ]
    },
    {
        contentJustification: "justify-center",
        footerButtons: [
            { label: "Join a unit" },
        ],
        class: "col-span-full md:col-span-5 lg:col-span-3",
        cardClass: "bg-transparent",
        variant: "solid",
        //should apply to all button?
        buttonsParentClass: "justify-center h-80 pt-20",
        bodyButtons: [{
            label: "Service",
            variant: 'link',
            class: "text-6xl md:text-4xl font-extrabold text-white-600"
        }],
        showFooter: true,
        // showHeader: true,
        backdropClasses: [
            "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-neutral-600/30"
        ]
    },
    {
        // title: "Testimonies",
        contentJustification: "justify-center",
        footerButtons: [
            { label: "Share a testimony" },
            { label: "View testimonies", variant: 'outline' },
        ],
        class: "col-span-full md:col-span-5 lg:col-span-3" ,
        cardClass: "bg-transparent",
        variant: "solid",
        //should apply to all button?
        buttonsParentClass: "justify-center h-80 pt-20",
        bodyButtons: [{
            label: "Testimonies",
            variant: 'link',
            class: "text-6xl md:text-4xl font-extrabold text-neutral-600"
        }],
        showFooter: true,
        // showHeader: true,
        backdropClasses: [
            "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
        ]
    },
    // {
    //     title: "Service Units",
    //     contentJustification: "justify-start",
    //     footerButtons: [
    //         { label: "Join a unit" },
    //     ],
    //     showFooter: true,
    //     showHeader: true,
    //     body: "At the Exodus Church, everyone is given a chance to serve the Lord and our culture is to serve with all our heart, soul and mind.",
    //     class: "col-span-full sm:col-span-4 md:col-span-3 bg-cover bg-right bg-[url(/images/exoduschurch-technical-unit.jpg)]",
    //     cardClass: "bg-gradient-to-r from-black/60 from-60% to-black/0 to-90%",
    //     variant: "outline",
    //     backdropClasses: [
    //         "backdrop-blur-xs -z-1 [mask-image:linear-gradient(to_right,rgba(0,0,0,.4)_10%,rgba(0,0,0,.4)_100%)]",
    //         "backdrop-grayscale z-0 [mask-image:linear-gradient(to_right,rgba(0,0,0,.3)_0%,rgba(0,0,0,.3)_100%)]",
    //     ]
    // },
    {
        titleIcon: "i-fluent-location-ripple-20-regular",
        contentJustification: "justify-center",
        titleIconLink: "https://github.com/nuxt/ui",
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
        class: "col-span-full md:col-span-5",
        cardClass: "bg-transparent",
        backdropClasses: [
            "bg-cover bg-[url(/images/navigation-illustration.svg)] mask-x-from-20% mask-y-from-20%"
        ],
        variant: "solid"
    },
    {
        carousalImages: [
            ["/images/navigation-illustration.svg"],
            ["/images/exoduschurch-testimony.jpg"],
            ["/images/worship-stock-image-1.jpg"],
        ],
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
        opacity: 0,
        y: 300,
        // opacity: .5,
        filter: "blur(10px)",
    },
    onscreen: {
        opacity: 1,
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
    <!-- The other breakpoints padding is based on defaults -->
    <UContainer ref="mainContainerRef" class="px-0 ">
        <div :class="`grid grid-flow-row-dense grid-cols-10 lg:grid-cols-9 ${rowCount} gap-0 sm:gap-6`" id="index-page-div">
            <motion.div v-for="(cardData, index) in pageCardsData" :class="`rounded-none sm:rounded-lg ${cardData.class}`"
                :initial="pageCardVariant(index).offscreen" :whileInView="pageCardVariant(index).onscreen"
                :inViewOptions="{ once: true, margin: '50% 0px' }">
                <div v-if="cardData.backdropClasses" class="absolute size-full">
                    <motion.div v-for="overlayClass in cardData.backdropClasses"
                        :class="`absolute size-full rounded-none sm:rounded-lg ${overlayClass}`"
                        :initial="pageCardVariant(index).backdropOffscreen"
                        :whileInView="pageCardVariant(index).backdropOnScreen" :inViewOptions="{ once: true }" />

                </div>
                <UCard :variant="cardData.variant" :class="`basis-2/3 text-white z-3 rounded-none sm:rounded-lg ${cardData.cardClass}`">

                    <template v-if="cardData.showHeader" #header>
                        <div :class="`flex w-full ${cardData.contentJustification}`">
                            <UButton v-if="cardData.titleIcon" :icon="cardData.titleIcon" size="xl" variant="link"
                                class="text-6xl text-white" :to="cardData.titleIconLink"
                                target="_blank" />
                            <h2 v-if="cardData.title" class="text-2xl font-semibold">{{ cardData.title }}</h2>
                        </div>
                    </template>
                    <motion.div :id="`main-card-body-${index}`" :initial="pageCardVariant(index).textOffscreen"
                        :class="`flex flex-col ${cardData.contentJustification}`"
                        :whileInView="pageCardVariant(index).textOnScreen"
                        :inViewOptions="{ once: true }">

                        <div v-if="cardData.textWithImage" class="flex flex-row text-3xl sm:text-5xl logo-title">
                            <span v-if="cardData.textWithImage.pretext">
                                {{ cardData.textWithImage.pretext }}
                            </span>
                            <NuxtImg v-if="cardData.textWithImage.imageUrl" :src="cardData.textWithImage.imageUrl"
                                :class="cardData.textWithImage.imageClass" />
                            <span v-if="cardData.textWithImage.postText">
                                {{ cardData.textWithImage.postText }}
                            </span>
                        </div>

                        <Qrcode v-if="cardData.qrCodeUrl" :value="cardData.qrCodeUrl" variant="circle" :radius="1"
                            class="rounded-xl" />

                        <UCarousel v-if="cardData.carousalImages" arrows dots loop v-slot="{ item }"
                            :items="cardData.carousalImages" class="w-full mx-auto" :ui="{
                                controls: 'absolute bottom-8 inset-x-12',
                                dots: 'bottom-7',
                                dot: 'w-6 h-1'
                            }">

                            <div class="size-full">
                                <!-- <NuxtImg v-for="(carousal_item, index) in item as string[]" :src="carousal_item"
                                    class="absolute size-full h-150" /> -->
                                <div class="h-100 bg-[linear-gradient(to_right,transparent_49%,white_51%,white_51%),url('/images/exoduschurch-testimony.jpg')]">
                                </div>
                                <!-- <div class="h-300 bg-[url(/images/exoduschurch-testimony.jpg)]">
                                </div> -->
                                    <!-- <img class="" :src="`/images/navigation-illustration.svg`">

                                    </img> -->
                            </div>

                        </UCarousel>

                        <p v-if="cardData.body" class>{{ cardData.body }}</p>

                        <div v-if="cardData.bodies" class="grid grid-cols-2 gap-2 justify-center divide-x-0 divide-y-2
                                    sm:divide-x-2 sm:divide-y-0 divide-double">
                            <UCard v-for="bodyData in cardData.bodies" variant="solid"
                                class="bg-transparent rounded-none col-span-full sm:col-span-1 text-white">
                                <template #header>
                                    <div class="flex justify-center w-full border-2">
                                        <h2 v-if="bodyData.title" class="text-2xl font-semibold">
                                            {{ bodyData.title }}
                                        </h2>
                                    </div>
                                </template>

                                <div class="flex justify-center w-full">
                                    <h2 v-if="bodyData.body" class="font-semibold">
                                        {{ bodyData.body }}
                                    </h2>
                                </div>

                                <template #footer>
                                    <div class="flex justify-center w-full">
                                        <h2 v-if="bodyData.footer" class="">
                                            {{ bodyData.footer }}
                                        </h2>
                                    </div>
                                </template>
                            </UCard>
                        </div>

                        <div v-if="cardData.bodyButtons" :class="`flex flex-row flex-wrap gap-2 ${cardData.buttonsParentClass}`">
                            <UButton v-for="buttonData in cardData.bodyButtons" :label="buttonData.label"
                                :variant="buttonData.variant" color="neutral" :class="buttonData.class" />

                        </div>

                    </motion.div>
                    <template v-if="cardData.showFooter" #footer>
                        <div :class="`flex w-full ${cardData.contentJustification}`">
                            <span v-if="cardData.footer">{{ cardData.footer }}</span>
                            <div v-if="cardData.footerButtons" class="flex flex-row flex-wrap gap-2">
                                <UButton v-for="buttonData in cardData.footerButtons" :label="buttonData.label"
                                    :variant="buttonData.variant" color="neutral" />
                            </div>

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