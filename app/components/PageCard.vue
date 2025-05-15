<script setup lang="ts">
import { animate, useInView, stagger, motion } from 'motion-v';
import type { CardData, CardAnimation } from '~/types';

//the const defines defaults, the defineProps is used for typing
const {
    pageCardData = {} as CardData,
    offset = 0,
    bodyButtonHandler = (event: MouseEvent) => {}
} = defineProps<{
    pageCardData: CardData,
    offset: number
    bodyButtonHandler?: (event: MouseEvent) => void
}>();

const pageCardAnimation = (delayIndex: number): CardAnimation => {
    return pageCardData.cardAnimation ?? {
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


</script>

<template>
    <motion.div :class="`rounded-none sm:rounded-lg ${pageCardData.class}`"
        :initial="pageCardAnimation(offset).offscreen" :whileInView="pageCardAnimation(offset).onscreen"
        :inViewOptions="{ once: true, margin: '50% 0px' }">
        <div v-if="pageCardData.backdropClasses" class="absolute size-full">
            <motion.div v-for="overlayClass in pageCardData.backdropClasses"
                :class="`absolute size-full rounded-none sm:rounded-lg ${overlayClass}`"
                :initial="pageCardAnimation(offset).backdropOffscreen"
                :whileInView="pageCardAnimation(offset).backdropOnScreen" :inViewOptions="{ once: true }" />

        </div>
        <UCard :variant="pageCardData.variant"
            :class="`basis-2/3 text-white z-3 rounded-none sm:rounded-lg ${pageCardData.cardClass}`">

            <template v-if="pageCardData.showHeader" #header>
                <div :class="`flex w-full ${pageCardData.contentJustification}`">
                    <UButton v-if="pageCardData.titleIcon" :icon="pageCardData.titleIcon" size="xl" variant="link"
                        class="text-6xl text-white" :to="pageCardData.titleIconLink" target="_blank" />
                    <h2 v-if="pageCardData.title" class="text-2xl font-semibold">{{ pageCardData.title }}</h2>
                </div>
            </template>
            <motion.div :data-name="`main-card-body-${offset}`" :initial="pageCardAnimation(offset).textOffscreen"
                :class="`flex flex-col ${pageCardData.contentJustification}`"
                :whileInView="pageCardAnimation(offset).textOnScreen" :inViewOptions="{ once: true }">

                <TextWithImage v-if="pageCardData.textWithImage" :textWithImage="pageCardData.textWithImage" />

                <Qrcode v-if="pageCardData.qrCodeUrl" :value="pageCardData.qrCodeUrl" variant="circle" :radius="1"
                    class="rounded-xl" />

                <ClientOnly>
                    <ImgCompareCarousal v-if="pageCardData.carousals" :carousalsContent="pageCardData.carousals" />
                </ClientOnly>

                <p v-if="pageCardData.body" class>{{ pageCardData.body }}</p>

                <CardGrid v-if="pageCardData.bodies" :content="pageCardData.bodies" />

                <div v-if="pageCardData.bodyButtons"
                    :class="`flex flex-row flex-wrap gap-2 ${pageCardData.bodyButtonsParentClass}`">
                    <UButton v-for="buttonData in pageCardData.bodyButtons" :label="buttonData.label"
                        :variant="buttonData.variant" :color="buttonData.color" :class="buttonData.class"
                        @click="bodyButtonHandler" />

                </div>

            </motion.div>
            <template v-if="pageCardData.showFooter" #footer>
                <h2 v-if="pageCardData.footer"
                    :class="`w-full flex ${pageCardData.contentJustification}`" >
                    {{ pageCardData.footer }}
                </h2>
                <div v-if="pageCardData.footerButtons"
                    :class="`flex flex-row flex-wrap gap-2 ${pageCardData.footerButtonsParentClass}`">
                    <UButton v-for="buttonData in pageCardData.footerButtons" :label="buttonData.label"
                        :variant="buttonData.variant" color="neutral" :class="buttonData.class" />
                </div>
            </template>
        </UCard>
    </motion.div>
</template>


<style scoped></style>

<style scoped>
.logo-title {
    font-family: 'Roboto', sans-serif;
}
</style>