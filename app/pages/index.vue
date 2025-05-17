<script setup lang="ts">
import type { CardAnimation, CardData } from '~/types';

import { useWindowSize, useMouseInElement } from '@vueuse/core';


const windowSize = useWindowSize();
const parallaxFlows = useParallax();
const pageCardsData = useCards();
const parallaxFlowsHeight = `h-[${parallaxFlows.length}00vh]`;
const parallaxFlowsParent = useTemplateRef('parallaxFlowsParent');
const parallaxScroll = useScroll({
    target: parallaxFlowsParent,
    offset: ['start start', 'end start'],
});
const parallaxScrollSections = divideIntoParts(1, parallaxFlows.length + 1);

// onMounted(() => {
//     console.log("parallaxScrollSections: ", JSON.stringify(parallaxScrollSections));
// })

//to detect scroll profress for an individual parallax flow component
const parallaxFlowScroll = (index: number) => useTransform(
    parallaxScroll.scrollYProgress,
    [ parallaxScrollSections[index]!, parallaxScrollSections[index+1]! ],
    [0, 1]
)

// useMotionValueEvent(parallaxScroll.scrollYProgress, 'change', (current) => {
//     console.log("[Flow Parent]: parallaxScroll Value: ", current)
// })
// useMotionValueEvent(parallaxFlowScroll(0), 'change', (current) => {
//     console.log("[0 - Flow Parent's child]: parallaxScroll Value: ", current)
// })
// useMotionValueEvent(parallaxFlowScroll(1), 'change', (current) => {
//     console.log("[1 - Flow Parent's child]: parallaxScroll Value: ", current)
// })

//-----------------Parallax---------------------

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
        <div ref="parallaxFlowsParent" :class="`cursor-crosshair border-2 border-red-800 ${parallaxFlowsHeight}`"> 
            <div v-for="(parallaxData, index) in parallaxFlows" class="sticky top-0">
                <ParallaxCard  v-if="(index < 1)" :parallaxFlow="parallaxData" :scrollYProgress="parallaxFlowScroll(index)"/>
            </div>

        </div>
    </ClientOnly>
    <div class="h-screen w-screen border-2"></div>
</template>
