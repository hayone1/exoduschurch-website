<script setup lang="ts">
import type { CardAnimation, CardData } from '~/types';

import { useWindowSize, useMouseInElement } from '@vueuse/core';


const windowSize = useWindowSize();
const parallaxFlows = useParallax();
const pageCardsData = useCards();
const parallaxFlowsHeight = `h-[${parallaxFlows.length}00vh]`;



//-----------------Parallax---------------------

interface test {key: string}
const niceTest: test = {key: "value"}
// const vnode = h('div', { class: 'my-class' }, 'Hello, Worldx!');
const ok = reactive(niceTest);

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
        <div :class="`cursor-crosshair ${parallaxFlowsHeight}`"> 
            <div v-for="parallaxData in parallaxFlows">
                <ParallaxCard  :parallaxFlow="parallaxData" :offset="0"/>
            </div>

        </div>
    </ClientOnly>
</template>
