<script setup lang="ts">
import type { BoundingBox, CardData } from '~/types';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import { useElementSize } from '@vueuse/core';
import { UseElementSize, vElementBounding } from '@vueuse/components';
import { motion, motionValue, MotionValue, useDomRef } from 'motion-v';
import type { ShallowRef } from 'vue';

interface PositionMotionValue {
    xPosValue: MotionValue<number>
    yPosValue: MotionValue<number>
    // width: globalThis.Ref<number, number>
    // height: globalThis.Ref<number, number>
    constraint: BoundingBox
    // clipPathTransform?: ClipPathTransform
}
interface ClipPathTransform {
    leftClipPath: MotionValue<string>
    rightClipPath: MotionValue<string>
    topLeftClipPath: MotionValue<string>
    topRightClipPath: MotionValue<string>
    bottomLeftClipPath: MotionValue<string>
    bottomRightClipPath: MotionValue<string>
}

const { carousalsContent } = defineProps<{
    carousalsContent: CardData[][]
}>();

const constraintRef = useDomRef();
const constraintSize = useElementSize(constraintRef);
const dividerDragged = ref(false);
// const x = useMotionValue(0);
// const y = useMotionValue(0);

const constraintRefPrefix = "carousalContent-";
const dividerMotionValues = () => carousalsContent.map(
    (contents, index) => computed(() => {
        const xPosValue = useMotionValue(0);
        const yPosValue = useMotionValue(0);
        // const width = ref(0);
        // const height = ref(0);
        const constraint = ref({
            left: 0, right: 0,
            bottom: 0, top: 0
        });
        // const clipPathTransform = getMotionTransform(
        //     xPosValue, yPosValue, widthValue, heightValue
        // );
        return { xPosValue, yPosValue, constraint }
        // constraintSize: useElementSize(useTemplateRef(constraintRefPrefix + index)),
    }));

function OnConstraintMounted(index: number, width: number, height: number,
    enableAllAxis: boolean = true) {
    // dividerMotionValues[index]
    console.log("initial data: ", JSON.stringify({ index, width: constraintSize.width.value, height: constraintSize.height.value, enableAllAxis }));
    // console.log("First motionValue: " + dividerMotionValues[0]?.xPosValue.get());
    dividerMotionValues[0]!.clipPathTransform.leftClipPath.on("change", latestvalue => {
        console.log("Latest dividersTransform is: " + latestvalue);
    })
    // dividerMotionValues.forEach(
    //     motionObject => {
    //         motionObject.clipPathTransform = getMotionTransform(motionObject)
    //     }
    // );
    // if (typeof (dividerMotionValues[index]) !== 'undefined') {
    //     dividerMotionValues[index].boundingBox.value = getDragConstraints(
    //         width, height, enableAllAxis
    //     );
    // }
    // setMotionTransform(dividerMotionValues[index]!);
}

const globalDragConstraints = computed(() => getDragConstraints(
    constraintSize.width.value, constraintSize.height.value
));

// const clipPath = getMotionTransform({
//     xPosValue: motionValue(40),
//     yPosValue: motionValue(60),
// }).leftClipPath;

// const testClipPath = getMotionTransform(dividerMotionValues[0]!);

function getMotionTransform(
    xPosValue: MotionValue<number>, yPosValue: MotionValue<number>,
    constraint: Partial<BoundingBox>) {
    // console.log("setting motion value with outndingbox: ", JSON.stringify(positionMotionValue.boundingBox));
    const xPercentTransform = useTransform(
        xPosValue,
        [constraint.left!, constraint.right!],
        // [globalDragConstraints.value.left!, globalDragConstraints.value.right!],
        [0, 100]
    );
    const xPercentAlternateTransform = useTransform(() =>
        100 - xPercentTransform.get()
    );
    const yPercentTransform = useTransform(
        yPosValue,
        [constraint.top!, constraint.bottom!],
        // [globalDragConstraints.value.top!, globalDragConstraints.value.bottom!],
        [0, 100]
    );
    const yPercentAlternateTransform = useTransform(() =>
        100 - yPercentTransform.get()
    );

    const leftClipPath = useMotionTemplate`inset(0% ${xPercentAlternateTransform}% 0% 0%)`;
    const rightClipPath = useMotionTemplate`inset(0% 0% 0% ${xPercentTransform}%)`;
    const topLeftClipPath = useMotionTemplate`inset(0% ${xPercentAlternateTransform}% ${yPercentAlternateTransform}% 0%)`;
    const topRightClipPath = useMotionTemplate`inset(0% 0% ${yPercentAlternateTransform}% ${xPercentTransform}%)`;
    const bottomLeftClipPath = useMotionTemplate`inset(${yPercentTransform}% ${xPercentAlternateTransform}% 0% 0%)`;
    const bottomRightClipPath = useMotionTemplate`inset(${yPercentTransform}% 0% 0% ${xPercentTransform}%)`;

    return {
        leftClipPath, rightClipPath,
        topLeftClipPath, topRightClipPath,
        bottomLeftClipPath, bottomRightClipPath
    }
}

const slotPosition: Record<string, string> = {
    0: "first",
    1: "second"
};

function getDragConstraints(width: number, height: number,
    enableAllAxis: boolean = true): Partial<BoundingBox> {
    console.log("getDragConstraints called");
    // dividerMotionValues[index]!.width = width;
    // dividerMotionValues[index]!.height = height;

    return {
        left: -(width / 2),
        right: (width / 2),
        top: enableAllAxis ? -(height / 2) : 0,
        bottom: enableAllAxis ? (height / 2) : 0,
    };

    // if (typeof (dividerMotionValues[index]) !== 'undefined') {
    //     dividerMotionValues[index].boundingBox = boundingBox;
    // }

    // // console.log("I ran");
    // return boundingBox;
};

function enableExtraCarousals(item: any, asString = false) {
    return (item as CardData[]).length > 2
}


</script>

<template>
    <motion.div>
        <!-- <PageCard :pageCardData="((item as CardData[])[0] as CardData)" :offset="0" /> -->

        <UCarousel ref="constraintRef" arrows dots loop v-slot="{ item, index }" :items="carousalsContent"
            class="z-1 w-full" :watchDrag="false" :ui="{
                controls: 'bottom-1 inset-x-1 top-78',
                dots: 'bottom-4',
                dot: 'w-6 h-1'
            }">

            <UseElementSize v-slot="{ width, height }" class="flex justify-center">
                <!-- <motion.div drag :dragConstraints="dragConstraints(width, height)" :style="{ x, y }" -->
                <motion.div drag :dragConstraints="getDragConstraints(width, height, enableExtraCarousals(item))"
                    :dragElastic="0.2"
                    :style="{ x: dividerMotionValues[index]!.xPosValue, y: dividerMotionValues[index]!.yPosValue }"
                    class="absolute bg-neutral-100 rounded-full self-center
                                flex text-neutral-800 z-2"
                    @vue:mounted="OnConstraintMounted(index, width, height, enableExtraCarousals(item))">
                    <UIcon name="i-icon-park-outline-direction-adjustment-two" size="30" />
                </motion.div>
                <!-- <ImgComparisonSlider class="w-full pointer-events-none" keyboard="disabled"
                    :value="dividerMotionValues[index]!.xPercent.value">
                    <div v-for="(cardData, index) in (item as CardData[]).slice(0, 2)" :slot="slotPosition[index]">
                        <PageCard :pageCardData="cardData" :offset="index" />
                    </div>
                    <UIcon slot="handle" name="i-fluent-arrow-bidirectional-left-right-20-regular" size="40" />
                </ImgComparisonSlider> -->
                <motion.div class="w-full" :style="{
                    clipPath: dividerMotionValues[index]!.clipPathTransform?.leftClipPath
                }">
                    <PageCard v-for="(cardData, inner_index) in (item as CardData[]).slice(0, 1)"
                        :pageCardData="cardData" :offset="index" class="w-full border-2 bg-cover border-amber-500" />

                </motion.div>
                <!-- <div class="absolute border-2 w-full">
                    <PageCard v-for="(cardData, index) in (item as CardData[]).slice(2, 4)"
                        :pageCardData="cardData" :offset="index" />
                </div> -->
                <!-- <div v-if="enableExtraCarousals(item)" class="absolute size-full flex justify-center items-center">
                    <ImgComparisonSlider class="w-full pointer-events-none" keyboard="disabled">
                        <div v-for="(cardData, index) in (item as CardData[]).slice(2, 4)" :slot="slotPosition[index]">
                            <PageCard :pageCardData="cardData" :offset="index" />
                        </div>
                        <UIcon slot="handle" name="i-fluent-arrow-bidirectional-left-right-20-regular" size="40" />
                    </ImgComparisonSlider>
                </div> -->

            </UseElementSize>


        </UCarousel>

    </motion.div>
</template>


<style scoped>
.mask-bottom-left {
    clip-path: inset(0% 40% 60% 0%);
}
</style>