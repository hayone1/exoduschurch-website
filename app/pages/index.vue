<script setup lang="ts">
import type { CardAnimation, CardData } from '~/types';

import { useWindowSize } from '@vueuse/core';
import type { MotionValue } from 'motion-v';


const windowSize = useWindowSize();
const parallaxFlows = useParallaxFlows();
const parallaxVariants = useParallaxVariants();
const pageCardsData = useCards();
const timedCarousals = useTimedCarousels();
// the additions is to account for the extra empty section that aids in the sticky
// scrolling
const parallaxTotal = parallaxFlows.length + parallaxVariants.length;
const parallaxSectionHeight = `${parallaxTotal + 1}00vh`;
// const parallaxSectionHeight = `h-[${parallaxFlows.length + 1}00vh]`;
// const parallaxSectionHeight = `h-[${parallaxFlows.length + 1}00vh]`;
const parallaxScrollSections = divideIntoParts(1, parallaxTotal + 1 + 1);
const parallaxSectionParent = useTemplateRef('parallaxSectionParent');
var parallaxScroll: {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
};
var parallaxFlowsProgress: MotionValue<number>[];
var parallaxVariantProgress: MotionValue<number>[];

onMounted(() => {
    // console.log("parallaxScrollSections: ", JSON.stringify(parallaxScrollSections));
    parallaxScroll = useScroll({
        target: parallaxSectionParent,
        offset: ['start start', 'end start'],
    });
    parallaxFlowsProgress = parallaxFlows.map((parallaxFlowData, index) =>
        getParallaxScrollProgress(index)
    );
    parallaxVariantProgress = parallaxVariants.map((parallaxVariantData, index) =>
        getParallaxScrollProgress(parallaxFlows.length + index)
    );
})

//to detect scroll progress for an individual parallax flow component
function getParallaxScrollProgress(index: number) {
    return useTransform(
        parallaxScroll.scrollYProgress,
        [parallaxScrollSections[index]!, parallaxScrollSections[index + 1]!],
        [0, 1]
    )
}

// useMotionValueEvent(parallaxScroll.scrollYProgress, 'change', (current) => {
//     console.log("[Flow Parent]: parallaxScroll Value: ", current)
// })
// useMotionValueEvent(parallaxScrollProgress(0), 'change', (current) => {
//     console.log("[0 - Flow Parent's child]: parallaxScroll Value: ", current)
// })
// useMotionValueEvent(parallaxScrollProgress(1), 'change', (current) => {
//     console.log("[1 - Flow Parent's child]: parallaxScroll Value: ", current)
// })

//-----------------Parallax---------------------

const mainContainerRef = useTemplateRef('mainContainerRef');
// const cardsRefs = useTemplateRef('pageCards');

const rowCount = "grid-rows-" + Math.ceil(pageCardsData.length / 2);

// watch(parallaxSectionParent, () => {
//     parallaxScroll = useScroll({
//         target: parallaxSectionParent,
//         offset: ['start start', 'end start'],
//     });
// }, { once: true });

</script>

<template>
    <!-- The other breakpoints padding is based on defaults -->
    <UContainer ref="mainContainerRef" class="px-0 sm:mb-5">
        <div :class="`grid grid-flow-row-dense grid-cols-10
                    lg:grid-cols-9 ${rowCount} gap-0 sm:gap-6`" id="index-page-div">
            <PageCard v-for="(cardData, index) in pageCardsData" :pageCardData="cardData" :offset="index">
            </PageCard>
        </div>
    </UContainer>
    <!-- <br /> -->
    <ClientOnly>
        <div ref="parallaxSectionParent" class="cursor-crosshair" :style="{ height: parallaxSectionHeight }">
            <div v-for="(parallaxFlowData, index) in parallaxFlows" class="sticky top-0">
                <ParallaxFlow :parallaxFlow="parallaxFlowData" :scrollYProgress="parallaxFlowsProgress[index]" />
            </div>
            <div v-for="(parallaxVariantData, index) in parallaxVariants" class="sticky top-0">
                <ParallaxVariant :parallaxVariant="parallaxVariantData"
                    :scrollYProgress="parallaxVariantProgress[index]" />
            </div>
        </div>
        <TimedCarousel v-for="timedCarousal in timedCarousals" :carouselCardData="timedCarousal" :offset="0" />
    </ClientOnly>
</template>

<style lang="css" scoped></style>
