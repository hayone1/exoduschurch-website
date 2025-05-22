<script setup lang="ts">
// import type { setInterval } from '#imports';
import { motion } from 'motion-v';
import type { StyleValue } from 'vue';
import type { CardData, CardAnimation } from '~/types';

//the const defines defaults, the defineProps is used for typing
const {
    carouselCardData = {} as CardData,
    offset = 0,
    bodyButtonHandler = (event: MouseEvent) => {}
} = defineProps<{
    carouselCardData: CardData,
    offset: number
    bodyButtonHandler?: (event: MouseEvent) => void
}>();

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
                duration:  .6,
                //will happen after the text animation is complete
                delay:  ((delayIndex) / 10) + .4,
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
                delay: ((delayIndex) / 10) + .8,
                ease: "easeOut"
            },
        },
        
    };


}

const springConfig = { damping: 5, stiffness: 20, restDelta: 0.001 };
const backGroundColor = useMotionValue('#4f42b5');
const backgroundColorSpring = useSpring(backGroundColor, springConfig);

const activeCarouselIndex = ref(0);
onMounted(() => {
    // window.setInterval(() => {

    // }, 1000)
    carousel.value?.emblaApi?.on('autoplay:select', () => {
        activeCarouselIndex.value++;
        if (activeCarouselIndex.value === carouselCardData.carousels?.length) {
            activeCarouselIndex.value = 0;
        }
        backGroundColor.set(
            carouselCardData.carousels[activeCarouselIndex.value].motionStyle?.backgroundColor ?? 'black'
        )
    });
})

function overrideCarousalCardClass(cardData: CardData): CardData{
    return {
        ...cardData,
        cardClass: "bg-transparent size-full"
    };
    // newCardData.carousels.forEach(carousel => {
    //     carousel.cardClass = "size-full"
    // });
    // return newCardData;
}

const carousel = useTemplateRef('carousel');
const autoPlayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
}
</script>

<template>
    <motion.div :class="`h-screen rounded-none sm:rounded-lg ${carouselCardData.class}`"
        :style="{ backgroundColor: backgroundColorSpring }">

        <div v-if="carouselCardData.backdropClasses" class="absolute size-full">
            <motion.div v-for="overlayClass in carouselCardData.backdropClasses"
                :class="`absolute size-full rounded-none sm:rounded-lg ${overlayClass}`"
                :initial="pageCardAnimation(offset).backdropOffscreen"
                :whileInView="pageCardAnimation(offset).backdropOnScreen" :inViewOptions="{ once: true }" />

        </div>
        <ul class="absolute size-full flex justify-center">
            <motion.li v-for="(carouselCard, index) in carouselCardData.carousels.slice(0,2)"
                class="timed-card" :data-first="(index === 0)">
                <PageCard :pageCardData="overrideCarousalCardClass(carouselCard)" :offset="offset" />
            </motion.li>
        </ul>
        <div class="size-full flex flex-nowrap flex-row justify-end
            items-end overflow-hidden">
            <UCarousel ref="carousel" v-if="carouselCardData.carousels" arrows loop
                    :autoplay="autoPlayOptions"
                    :items="carouselCardData.carousels" v-slot="{ item, index }"
                    :ui="carouselCardData.carouselsUi" :class="carouselCardData.carouselsClass">
                    <PageCard :pageCardData="(item as CardData)" :offset="index"
                        />
                </UCarousel>
            <!-- <PageCard :pageCardData="carouselCardData" :offset="offset"
                /> -->
        </div>
    </motion.div>
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
</style>