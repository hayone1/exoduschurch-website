<script setup lang="ts">
import type { ParallaxData, CardAnimation, CardData } from '~/types';
import type { Node } from '@vue-flow/core';
import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background'
import { useWindowSize } from '@vueuse/core';
import { UseElementSize } from '@vueuse/components';

const colorMode = useColorMode();
const viewport = useViewport();
const windowSize = useWindowSize();

const defaultCarousalAnimation: CardAnimation = {
    offscreen: { opacity: 1, },
    onscreen: { opacity: 1 },
    textOffscreen: { opacity: 1 },
    textOnScreen: { opacity: 1 },
    backdropOffscreen: { opacity: 1 },
    backdropOnScreen: { opacity: 1 }
};

const defaultCardAnimation: CardAnimation = {
        offscreen: {
            opacity: 0,
        },
        onscreen: {
            opacity: 1,
            // opacity: 1,
            transition: {
                type: "spring",
                // bounce: 0.3,
                duration: .8,
                delay: .4
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
                duration:  .6,
                //will happen after the text animation is complete
                delay:  .6,
                ease: "easeOut"
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
                duration:  .6,
                //will finish after the backdrop animation is complete
                delay: .8,
                ease: "easeOut"
            },
        },
        
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
            { label: "I'm New", color: 'neutral' },
            { label: "About us", color: 'neutral', variant: 'outline' },
        ],
        // body: "making disciples of all nations",
        class: "-z-1 flex flex-row col-span-full -translate-y-3",
        cardClass: "mt-20 bg-gradient-to-r",
        variant: "solid",
        footer: "Making disciples of all nations.",
        showFooter: true,
        showHeader: true,
        backdropClasses: [
            "bg-cover mask-repeat-x mask-[url(/images/brush-mask-1-from-top.svg)] bg-[url(/images/worship-stock-image-1.jpg)]",
            "bg-cover mask-t-from-50% mask-t-to-70% sm:mask-t-from-10% sm:mask-t-to-60%  bg-[url(/images/worship-stock-image-1.jpg)]",
            "backdrop-grayscale mask-r-from-30% mask-r-to-50%",
        ]
    },
    {
        // title: "Testimonies",
        contentJustification: "justify-center",
        footerButtonsParentClass: "justify-center",
        footerButtons: [
            { label: "Share a testimony" },
            { label: "View testimonies", variant: 'outline' },
        ],
        class: "col-span-full md:col-span-5 lg:col-span-3",
        cardClass: "bg-transparent",
        variant: "solid",
        //should apply to all button?
        bodyButtonsParentClass: "justify-center h-80 pt-30",
        bodyButtons: [{
            label: "Testimonies",
            variant: 'link',
            class: "text-5xl md:text-4xl font-extrabold text-neutral-600"
        }],
        showFooter: true,
        // showHeader: true,
        backdropClasses: [
            "mask-contain mask-center mask-no-repeat -z-1 mask-[url(/images/brush-mask-0-linear.svg)] bg-white"
        ]
    },
    {
        contentJustification: "justify-center",
        footerButtonsParentClass: "justify-center",
        footerButtons: [
            { label: "Join a unit" },
        ],
        class: "col-span-full md:col-span-5 lg:col-span-3",
        cardClass: "bg-transparent",
        variant: "solid",
        //should apply to all button?
        bodyButtonsParentClass: "justify-center h-80 pt-30",
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
        footerButtonsParentClass: "justify-center",
        footerButtons: [
            { label: "Share a testimony" },
            { label: "View testimonies", variant: 'outline' },
        ],
        class: "col-span-full md:col-span-5 lg:col-span-3",
        cardClass: "bg-transparent",
        variant: "solid",
        bodyButtonsParentClass: "justify-center h-80 pt-30",
        bodyButtons: [{
            label: "Testimonies",
            variant: 'link',
            class: "text-5xl md:text-4xl font-extrabold text-neutral-600"
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
        title: "Special Meetings",
        showHeader: true,
        contentJustification: "justify-center",
        cardAnimation: defaultCarousalAnimation,
        carousals: [
            [
                {
                    title: "December",
                    bodyButtons: [{
                        label: "Supernatural School",
                        variant: 'link',
                        color: 'secondary',
                        class: "text-3xl md:text-4xl font-extrabold text-white z-0"
                    }],
                    backdropClasses: [
                        "-z-1 bg-cover bg-[url(/images/worship-stock-image-1.jpg)]"
                    ],
                },
                {
                    title: "August",
                    bodyButtons: [{
                        label: "Supernatural School",
                        variant: 'link',
                        class: "text-3xl md:text-4xl font-extrabold text-white"
                    }],
                    backdropClasses: [
                        "-z-1 bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                    ],
                },
            ],
            [
                {
                    class: 'w-50 border-5',
                    title: "Ajah",
                    bodyButtons: [{
                        label: "RISE",
                        variant: 'link',
                        class: "text-3xl md:text-4xl font-extrabold text-white"
                    }],
                    backdropClasses: [
                        "-z-1 bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                    ],
                },
                {
                    title: "Abuja",
                    bodyButtons: [{
                        label: "RISE",
                        variant: 'link',
                        class: "text-3xl md:text-4xl font-extrabold text-white"
                    }],
                    backdropClasses: [
                        "-z-1 bg-cover bg-[url(/images/worship-stock-image-2.jpg)]"
                    ],
                },
                {
                    title: "Ibadan",
                    bodyButtons: [{
                        label: "RISE",
                        variant: 'link',
                        class: "text-3xl md:text-4xl font-extrabold text-white"
                    }],
                    backdropClasses: [
                        "-z-1 bg-cover bg-[url(/images/worship-stock-image-3.jpg)]"
                    ],
                },
                {
                    title: "United Kingdom",
                    bodyButtons: [{
                        label: "RISE",
                        variant: 'link',
                        class: "text-3xl md:text-4xl font-extrabold text-white"
                    }],
                    backdropClasses: [
                        "-z-1 bg-cover bg-[url(/images/worship-stock-image-4.jpg)]"
                    ],
                },
            ],
        ].map(carousal => carousal.map(card => {
            return {
                ...card,
                cardAnimation: defaultCardAnimation,
                contentJustification: "justify-center",
                showFooter: true,
                showHeader: true,
                class: "h-80 -z-1",
                cardClass: "bg-transparent",
                variant: "solid",
                bodyButtonsParentClass: "justify-center h-80",
                // cardAnimation: defaultCarousalAnimation
            } as CardData
        })),
        class: "col-span-full lg:col-span-5",
        variant: "subtle"
    },
];
const pageCardsData = defaultpageCardsData.map((cardData, index) => ({
    ...cardData, id: "page-card-" + index, domRef: ref()
}));

//-----------------Parallax---------------------

const vueFlowColor = computed(() => 
    colorMode.value === 'light' ? {
        parentBackground: "",
        patternBackground: "#1B1C1E"
    } : {
        parentBackground: "bg-black",
        patternBackground: ""
    }
        
)
const pageParallaxData: ParallaxData[] = [

];
// const vnode = h('div', { class: 'my-class' }, 'Hello, Worldx!');
const nodes = (width: number, height: number) => ref([
  {
    id: 'node-ia',
    position: {
        x: viewport.isGreaterThan('mobile') ?
            width/1.4 : width/2,
        y: height/12
    },
    type: 'output',
    data: { label: 'Paypal' },
    class: 'bg-black rounded',
  },
  {
    id: 'node-i',
    color: '#ff00ff',
    position: {
        x: viewport.isGreaterThan('mobile') ?
            width/1.4 : width/2,
        y: (height/12) + 45
    },
    type: 'input',
    data: { label: '@myexoduschurch' }
  },
  {
    id: 'node-1a',
    position: { x: (width/12) - 20, y: height/12 },
    type: 'output',
    data: { label: 'Account No' }
  },
  {
    id: 'node-1',
    color: '#ff00ff',
    position: { x: (width/12) - 20, y: (height/12) + 45 },
    type: 'input',
    data: { label: '3883006315' }
  },
  {
    id: 'node-2a',
    position: {
        x: viewport.isGreaterThan('mobile') ?
            width/2.4 : width/4,
        y: height/2.5
    },
    type: 'output',
    data: { label: 'BANK' }
  },
  {
    id: 'node-2',
    color: '#ff00ff',
    position: {
        x: viewport.isGreaterThan('mobile') ?
            width/2.4 : width/4,
        y: (height/2.5) + 45
    },
    type: 'input',
    data: { label: 'ECOBANK' }
  },
  {
    id: 'node-3a',
    position: {
        x: viewport.isGreaterThan('mobileMedium') ?
            width/1.4 : width/2.4,
        y: height/1.4
    },
    type: 'output',
    data: { label: 'Account Name' }
  },
  {
    id: 'node-3',
    color: '#ff00ff',
    position: {
        x: viewport.isGreaterThan('mobileMedium') ?
            width/1.4 : width/2.4,
        y: (height/1.4) + 45
    },
    type: 'input',
    data: { label: 'Isibor Eseosa Valerie' }
  },
].map(node => ({
    ...node, style: { backgroundColor: '#1B1C1E', color: 'white', borderRadius: '20px' },
})));
const mainContainerRef = useTemplateRef('mainContainerRef');
// const cardsRefs = useTemplateRef('pageCards');
const rowCount = "grid-rows-" + Math.ceil(pageCardsData.length / 2);

</script>

<template>
    <!-- The other breakpoints padding is based on defaults -->
    <!-- <UContainer ref="mainContainerRef" class="px-0 ">
        <div :class="`grid grid-flow-row-dense grid-cols-10
                    lg:grid-cols-9 ${rowCount} gap-0 sm:gap-6`" id="index-page-div">
            <PageCard v-for="(cardData, index) in pageCardsData" :pageCardData="cardData" :offset="index">
            </PageCard>
        </div>
    </UContainer> -->
    <ClientOnly>
        <UseElementSize v-slot="{ width, height }" class="border-green-500 border-2">
            <div :class="`h-screen ${vueFlowColor.parentBackground}`">
                <VueFlow :nodes="nodes(width, height).value" :zoom-on-scroll="false" :zoom-on-pinch="false"
                        :zoom-on-double-click="false" :pan-on-scroll="false">
                    <Background :patternColor="vueFlowColor.patternBackground" :size="1.4"/>
              </VueFlow>
    
            </div>

        </UseElementSize>

    </ClientOnly>
</template>
