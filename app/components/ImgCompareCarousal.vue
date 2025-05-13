<script setup lang="ts">
import type { CardData } from '~/types';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import { motion, useDomRef } from 'motion-v';
const props = defineProps<{
    carousalContent: CardData[][]
}>();

const constraintBox = useTemplateRef('constraintBox');

const constraintRef = useDomRef();

const slotPosition: Record<string, string> = {
    0: "first",
    1: "second"
};
</script>

<template>
    <motion.div ref="constraintRef" class="flex justify-center items-center w-full h-80 border-2"
        >
        <!-- <PageCard :pageCardData="((item as CardData[])[0] as CardData)" :offset="0" /> -->
        <motion.div drag :dragConstraints="constraintRef"
                    :dragElastic="0.2" class="rounded-full bg-neutral-100 w-4 flex justify-center">
            <UIcon name="i-icon-park-outline-direction-adjustment-two"
                    class="text-neutral-800" />
        </motion.div>

    </motion.div>
    <UCarousel arrows loop v-slot="{ item }" :items="carousalContent"
        class="mx-auto" :watchDrag="true" :ui="{
            controls: 'absolute bottom-1 inset-x-1 top-78',
            dots: 'bottom-4',
            dot: 'w-6 h-1',
            container: 'h-80'
        }">

        <!-- <ImgComparisonSlider class="w-[90vw] md:w-[85vw] lg:w-[45vw]">
            <div v-for="(cardData, index) in (item as CardData[])" :slot="slotPosition[index]">
                <PageCard :pageCardData="cardData" :offset="index" />
            </div>
            <UIcon slot="handle" name="i-fluent-arrow-bidirectional-left-right-20-regular" class="text-6xl" />
        </ImgComparisonSlider> -->

    </UCarousel>
</template>
