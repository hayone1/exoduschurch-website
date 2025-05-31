<script setup lang="ts">
// import type { setInterval } from '#imports';
import type { CardData, CardAnimation } from '~/types';

//the const defines defaults, the defineProps is used for typing
const {
    carouselCardData = {} as CardData,
    offset = 0,
    bodyButtonHandler = (event: MouseEvent) => { }
} = defineProps<{
    carouselCardData: CardData,
    offset: number
    bodyButtonHandler?: (event: MouseEvent) => void
}>();
const route = useRoute();

const pageCardAnimation = (delayIndex: number): CardAnimation => {
    return carouselCardData.cardAnimation ?? {
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
                delay: ((delayIndex) / 10) + .4,
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
                duration: .6,
                //will finish after the backdrop animation is complete
                delay: ((delayIndex) / 10) + .8,
                ease: "easeOut"
            },
        },

    };


}

var carouselIndex = ref(carouselCardData.carousels?.length - 1);

function overrideCarousalCardClass(cardData: CardData): CardData {
    return {
        ...cardData,
        class: cardData.class + " max-w-80 aspect-1/1",
        cardClass: "bg-transparent h-80 border-2"
    };
}

const carousel = useTemplateRef('carousel');
const autoPlayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
}
const defaultTransition = {
    duration: 1,
    //will happen after the text animation is complete
    // delay: ((delayIndex) / 10) + .4,
    ease: "easeOut"
}

var element_id: string;
const elementRef = useTemplateRef('elementRef');
if (typeof(route.fullPath) !== 'undefined' && route.fullPath.includes("#")) {
    element_id = route.fullPath.split("#").at(-1)!;
}

onMounted(() => {
    carousel.value?.emblaApi?.on('autoplay:select', () => {
        carouselIndex.value++;
        if (carouselIndex.value === carouselCardData.carousels?.length) {
            carouselIndex.value = 0;
        }
        // motionCarouselIndex.set(carouselIndex);
    });
    if (element_id === elementRef.value?.id) {
        nextTick(() => {
            setTimeout(() => {
                elementRef.value?.scrollIntoView(
                    {
                        behavior: "smooth",
                    }
                );
            }, 500) //not sure if this is good code lol
        })
    }
})
</script>

<template>
    <!-- <div :style="{ backgroundColor: 'red' }"></div> -->
    <div :class="carouselCardData.class"
        ref="elementRef" :id="transformToId(carouselCardData.title!)">
        <UCard class="bg-transparent text-white z-3 rounded-none"
            :variant="carouselCardData.variant" :class="carouselCardData.cardClass">
            <template v-if="carouselCardData.showHeader" #header>
                <div :class="`flex w-full ${carouselCardData.contentJustification}`">
                    <UButton v-if="carouselCardData.titleIcon" :icon="carouselCardData.titleIcon" size="xl" variant="link"
                        class="text-6xl text-white" :to="carouselCardData.titleIconLink" target="_blank" />
                    <h2 v-if="carouselCardData.title"
                        class="text-2xl font-semibold">{{ carouselCardData.title }}</h2>
                </div>
            </template>

            <div class="w-full flex justify-center">
                <UCarousel ref="carousel" v-if="carouselCardData.carousels" arrows loop :autoplay="autoPlayOptions"
                        :items="carouselCardData.carousels" v-slot="{ item, index }" :ui="carouselCardData.carouselsUi"
                        :class="carouselCardData.carouselsClass">
                        <PageCard :pageCardData="(item as CardData)" :offset="index" />
                    </UCarousel>
            </div>

            <template v-if="carouselCardData.showFooter" #footer>
                <h2 v-if="carouselCardData.footer" class="w-full flex" :class="carouselCardData.contentJustification">
                    {{ carouselCardData.footer }}
                </h2>
                <div v-if="carouselCardData.footerButtons"
                    :class="`flex flex-row flex-wrap gap-2 ${carouselCardData.footerButtonsParentClass}`">
                    <UButton v-for="buttonData in carouselCardData.footerButtons" :label="buttonData.label"
                        :variant="buttonData.variant" color="neutral" :class="buttonData.class"
                        :icon="buttonData.icon" :to="buttonData.link" />
                </div>
            </template>
        </UCard>
        
    </div>
</template>


<style scoped></style>

<style scoped>
.logo-title {
    font-family: 'Roboto', sans-serif;
}

.timed-card {
    position: absolute;
    height: 15rem;
    align-self: end;
    /* margin-bottom: 1rem; */
}

.timed-card[data-first="true"] {
    position: relative;
    /* border-width: 4px; */
    height: 100%;
    width: 100%;
    align-self: center;
    margin-bottom: 0;
    /* transform: scale(0.5); */
}

/* .neumorphic */
</style>