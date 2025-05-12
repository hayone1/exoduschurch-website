<script setup lang="ts">
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import { animate, useInView, stagger, motion } from 'motion-v';
const props = defineProps<{
    pageCardData: CardData,
    offset: number
}>();

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
    <motion.div :class="`rounded-none sm:rounded-lg ${pageCardData.class}`" :initial="pageCardVariant(offset).offscreen"
        :whileInView="pageCardVariant(offset).onscreen" :inViewOptions="{ once: true, margin: '50% 0px' }">
        <div v-if="pageCardData.backdropClasses" class="absolute size-full">
            <motion.div v-for="overlayClass in pageCardData.backdropClasses"
                :class="`absolute size-full rounded-none sm:rounded-lg ${overlayClass}`"
                :initial="pageCardVariant(offset).backdropOffscreen"
                :whileInView="pageCardVariant(offset).backdropOnScreen" :inViewOptions="{ once: true }" />

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
            <motion.div :data-name="`main-card-body-${offset}`" :initial="pageCardVariant(offset).textOffscreen"
                :class="`flex flex-col ${pageCardData.contentJustification}`"
                :whileInView="pageCardVariant(offset).textOnScreen" :inViewOptions="{ once: true }">

                <div v-if="pageCardData.textWithImage" class="flex flex-row text-3xl sm:text-5xl logo-title">
                    <span v-if="pageCardData.textWithImage.pretext">
                        {{ pageCardData.textWithImage.pretext }}
                    </span>
                    <NuxtImg v-if="pageCardData.textWithImage.imageUrl" :src="pageCardData.textWithImage.imageUrl"
                        :class="pageCardData.textWithImage.imageClass" />
                    <span v-if="pageCardData.textWithImage.postText">
                        {{ pageCardData.textWithImage.postText }}
                    </span>
                </div>

                <Qrcode v-if="pageCardData.qrCodeUrl" :value="pageCardData.qrCodeUrl" variant="circle" :radius="1"
                    class="rounded-xl" />

                <UCarousel v-if="pageCardData.carousals" arrows dots loop v-slot="{ item }"
                    :items="pageCardData.carousals" class="w-full mx-auto" :ui="{
                        controls: 'absolute bottom-8 inset-x-12',
                        dots: 'bottom-7',
                        dot: 'w-6 h-1'
                    }">

                    <div class="size-full">
                        <!-- <ImgComparisonSlider>
                            <PageCard v-for="(cardData, index) in (item as CardData[])" :pageCardData="cardData"
                                :offset="index" />
                        </ImgComparisonSlider> -->
                        <PageCard :pageCardData="((item as CardData[])[0] as CardData)"
                            :offset="0" ></PageCard>
                        <!-- <ImgComparisonSlider>
                            <img slot="first" style="width: 100%"
                                src="/images/worship-stock-image-4.jpg" />
                            <img slot="second" style="width: 100%"
                                src="/images/worship-stock-image-3.jpg" />
                        </ImgComparisonSlider> -->
                    </div>

                </UCarousel>

                <p v-if="pageCardData.body" class>{{ pageCardData.body }}</p>

                <div v-if="pageCardData.bodies" class="grid grid-cols-2 gap-2 justify-center divide-x-0 divide-y-2
                                    sm:divide-x-2 sm:divide-y-0 divide-double">
                    <UCard v-for="bodyData in pageCardData.bodies" variant="solid"
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

                <div v-if="pageCardData.bodyButtons"
                    :class="`flex flex-row flex-wrap gap-2 ${pageCardData.buttonsParentClass}`">
                    <UButton v-for="buttonData in pageCardData.bodyButtons" :label="buttonData.label"
                        :variant="buttonData.variant" color="neutral" :class="buttonData.class" />

                </div>

            </motion.div>
            <template v-if="pageCardData.showFooter" #footer>
                <div :class="`flex w-full ${pageCardData.contentJustification}`">
                    <span v-if="pageCardData.footer">{{ pageCardData.footer }}</span>
                    <div v-if="pageCardData.footerButtons" class="flex flex-row flex-wrap gap-2">
                        <UButton v-for="buttonData in pageCardData.footerButtons" :label="buttonData.label"
                            :variant="buttonData.variant" color="neutral" />
                    </div>
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