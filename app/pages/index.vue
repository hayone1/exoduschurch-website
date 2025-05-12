<script setup lang="ts">
import type { CardAnimation, CardData } from '~/types';

const defaultCarousalAnimation: CardAnimation = {
    offscreen: { opacity: 1},
    onscreen: {opacity: 1},
    textOffscreen: {opacity: 1},
    textOnScreen: {opacity: 1},
    backdropOffscreen: {opacity: 1},
    backdropOnScreen: {opacity: 1}
};

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
        class: "col-span-full md:col-span-5 lg:col-span-4",
        cardClass: "bg-transparent",
        backdropClasses: [
            "bg-cover bg-[url(/images/navigation-illustration.svg)] mask-x-from-20% mask-y-from-20%"
        ],
        variant: "solid"
    },
    {
        carousals: [
            [
                {
                    body: "testBody",
                    class: "",
                    contentJustification: "justify-center",
                    backdropClasses: [
                        "bg-cover bg-[url(/images/worship-stock-image-1.jpg)]"
                    ],
                    cardAnimation: defaultCarousalAnimation
                },
                {
                    body: "testBody 111",
                    class: "",
                    contentJustification: "justify-center",
                    backdropClasses: [
                        "bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                    ],
                    cardAnimation: defaultCarousalAnimation
                },
            ],
            [
                {
                    body: "testBody",
                    class: "",
                    contentJustification: "justify-center",
                    backdropClasses: [
                        "bg-cover bg-[url(/images/worship-stock-image-3.jpg)]"
                    ],
                    cardAnimation: defaultCarousalAnimation
                },
                {
                    body: "testBody 111",
                    class: "",
                    contentJustification: "justify-center",
                    backdropClasses: [
                        "bg-cover bg-[url(/images/worship-stock-image-4.jpg)]"
                    ],
                    cardAnimation: defaultCarousalAnimation
                },
            ],
        ],
        class: "col-span-full lg:col-span-5",
        variant: "subtle"
    },
];
const pageCardsData = defaultpageCardsData.map((cardData, index) => ({
    ...cardData, id: "page-card-" + index, domRef: ref()
}));
const mainContainerRef = useTemplateRef('mainContainerRef');
// const cardsRefs = useTemplateRef('pageCards');
const rowCount = "grid-rows-" + Math.ceil(pageCardsData.length / 2);

</script>

<template>
    <!-- The other breakpoints padding is based on defaults -->
    <UContainer ref="mainContainerRef" class="px-0 ">
        <div :class="`grid grid-flow-row-dense grid-cols-10
                    lg:grid-cols-9 ${rowCount} gap-0 sm:gap-6`" id="index-page-div">
            <PageCard v-for="(cardData, index) in pageCardsData" :pageCardData="cardData" :offset="index">
            </PageCard>

            <!-- <NuxtImg class="col-span-7 rounded-xl w-full"
                src="https://hayone1.github.io/throneofgrace_site-configs/laboratory.jpg" /> -->
        </div>
    </UContainer>
</template>
