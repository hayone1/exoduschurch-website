<script setup lang="ts">
import type { BoundingBox, CardData } from '~/types';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import { useElementSize } from '@vueuse/core';
import { UseElementSize, vElementBounding } from '@vueuse/components';
import { motion, MotionValue, useDomRef } from 'motion-v';
import type { ShallowRef } from 'vue';

interface PositionMotionValue {
    xPosValue: MotionValue<number>
    yPosValue: MotionValue<number>
    boundingBox: Partial<BoundingBox>,
    // width: number
    // height: number
    xPercent: globalThis.Ref<number, number>
    yPercent: globalThis.Ref<number, number>
}
interface PositionTransformValue {
    xPercentCovered: MotionValue<number>
    yPercentCovered: MotionValue<number>
}

const { carousalsContent } = defineProps<{
    carousalsContent: CardData[][]
}>();

const constraintRef = useDomRef();
const dividerDragged = ref(false);
// const x = useMotionValue(0);
// const y = useMotionValue(0);

const constraintRefPrefix = "carousalContent-";
const constraintMotionValues: PositionMotionValue[] = carousalsContent.map((contents, index) => ({
    xPosValue: useMotionValue(0),
    yPosValue: useMotionValue(0),
    boundingBox: {
        left: 100, right: 100,
        top: 100, bottom: 100
    },
    // width: ref(0),
    // height: ref(0),
    xPercent: ref(40),
    yPercent: ref(0)
    // constraintSize: useElementSize(useTemplateRef(constraintRefPrefix + index)),
}));
var constraintMotionTransforms: PositionTransformValue[];

onUpdated(() => {
    // constraintMotionTransforms = constraintMotionValues.map(
    //     positionMotionValue => motionTransform(positionMotionValue)
    // );
    
})

function OnConstraintMounted(index: number) {
    // constraintMotionValues[index]
    // console.log("Slider mounted");
    // console.log("First motionValue: " + constraintMotionValues[0]?.xPosValue.get());
    setMotionTransform(constraintMotionValues[index]!);
}

const testValue = useMotionValue(40);

function setMotionTransform(positionMotionValue: PositionMotionValue) {
    console.log("setting motion value with outndingbox: ", JSON.stringify(positionMotionValue.boundingBox));
    useTransform(
        positionMotionValue.xPosValue,
        [positionMotionValue.boundingBox.left!, positionMotionValue.boundingBox.right!],
        [0, 100]
    ).on("change",
        latest => {
            console.log("xTransform Changed: ", latest);
        }
    );
    useTransform(
        positionMotionValue.yPosValue,
        [positionMotionValue.boundingBox.top!, positionMotionValue.boundingBox.bottom!],
        [0, 100]
    ).on("change",
        latest => {
            console.log("yTransform Changed: ", latest);
        }
    );
}

const slotPosition: Record<string, string> = {
    0: "first",
    1: "second"
};

function setDragConstraints(index: number, width: number, height: number,
    enableAllAxis: boolean = true): Partial<BoundingBox> {

    // constraintMotionValues[index]!.width = width;
    // constraintMotionValues[index]!.height = height;

    const boundingBox = {
        left: -(width / 2),
        right: (width / 2),
        top: enableAllAxis ? -(height / 2) : 0,
        bottom: enableAllAxis ? (height / 2) : 0,
    };

    if (typeof (constraintMotionValues[index]) !== 'undefined') {
        constraintMotionValues[index].boundingBox = boundingBox;
    }

    // console.log("I ran");
    return boundingBox;
};

function enableExtraCarousals(item: any, asString = false) {
    return (item as CardData[]).length > 2
}


</script>

<template>
    <motion.div ref="constraintRef">
        <!-- <PageCard :pageCardData="((item as CardData[])[0] as CardData)" :offset="0" /> -->

        <UCarousel arrows dots loop v-slot="{ item, index }" :items="carousalsContent" class="z-1 w-full"
            :watchDrag="false" :ui="{
                controls: 'bottom-1 inset-x-1 top-78',
                dots: 'bottom-4',
                dot: 'w-6 h-1'
            }">

            <UseElementSize v-slot="{ width, height }" class="flex justify-center">
                <!-- <motion.div drag :dragConstraints="dragConstraints(width, height)" :style="{ x, y }" -->
                <motion.div drag :dragConstraints="setDragConstraints(index, width, height, enableExtraCarousals(item))"
                    :dragElastic="0.2"
                    :style="{ x: constraintMotionValues[index]!.xPosValue, y: constraintMotionValues[index]!.yPosValue }"
                    class="absolute bg-neutral-100 rounded-full self-center
                                flex text-neutral-800 z-2"
                    @vue:updated="OnConstraintMounted(index)">
                    <UIcon name="i-icon-park-outline-direction-adjustment-two" size="30" />
                </motion.div>
                <ImgComparisonSlider class="w-full pointer-events-none" keyboard="disabled"
                    :value="constraintMotionValues[index]!.xPercent.value">
                    <div v-for="(cardData, index) in (item as CardData[]).slice(0, 2)" :slot="slotPosition[index]">
                        <PageCard :pageCardData="cardData" :offset="index" />
                    </div>
                    <UIcon slot="handle" name="i-fluent-arrow-bidirectional-left-right-20-regular" size="40" />
                </ImgComparisonSlider>
                <!-- <PageCard v-for="(cardData, index) in (item as CardData[]).slice(0, 1)"
                    :pageCardData="cardData" :offset="index" />
                <div class="absolute border-2 w-full">
                    <PageCard v-for="(cardData, index) in (item as CardData[]).slice(2, 4)"
                        :pageCardData="cardData" :offset="index" />
                </div> -->
                <div v-if="enableExtraCarousals(item)" class="absolute size-full flex justify-center items-center">
                    <ImgComparisonSlider class="w-full pointer-events-none" keyboard="disabled">
                        <div v-for="(cardData, index) in (item as CardData[]).slice(2, 4)" :slot="slotPosition[index]">
                            <PageCard :pageCardData="cardData" :offset="index" />
                        </div>
                        <UIcon slot="handle" name="i-fluent-arrow-bidirectional-left-right-20-regular" size="40" />
                    </ImgComparisonSlider>
                </div>

            </UseElementSize>


        </UCarousel>

    </motion.div>
</template>


<style scoped>
.mask-bottom-left {
    clip-path: inset(10% 30px 30px 40px);
}
</style>