<script setup lang="ts">
import type { BoundingBox, CardData, ClipPathTransform, PositionMotionValue } from '~/types';
import { UseElementSize } from '@vueuse/components';
import { animate, motion, MotionValue, useDomRef } from 'motion-v';
import { useResizeObserver } from '@vueuse/core';
import type { Reactive } from 'vue';

const { carousalsContent } = defineProps<{
    carousalsContent: CardData[][]
}>();

const constraintRef = useDomRef();
var showPageCard = ref(false);
// const constraintSize = useElementSize(constraintRef);

const defaultClipPath: ClipPathTransform = {
    leftClipPath: useMotionTemplate`inset(0% 50% 0% 0%)`,
    rightClipPath: useMotionTemplate`inset(0% 0% 0% 50%)`,
    topLeftClipPath: useMotionTemplate`inset(0% 50% 50% 0%)`,
    topRightClipPath: useMotionTemplate`inset(0% 0% 50% 50%)`,
    bottomLeftClipPath: useMotionTemplate`inset(50% 50% 0% 0%)`,
    bottomRightClipPath: useMotionTemplate`inset50% 0% 0% 50%`,
}
const defaultBoundingBox: BoundingBox = {
    left: 0, right: 0,
    top: 0, bottom: 0,
};
const dividerMotionPosition: PositionMotionValue[] = carousalsContent.map(
    (contents, index) => {
        const xPosValue = useMotionValue(0);
        const yPosValue = useMotionValue(0);
        const constraint = ref(defaultBoundingBox);
        return { xPosValue, yPosValue, constraint }
        // constraintSize: useElementSize(useTemplateRef(constraintRefPrefix + index)),
    });

var dividerMotionTransform: MotionValue<string>[][] = dividerMotionPosition.map(
    () => [defaultClipPath.leftClipPath, defaultClipPath.rightClipPath]
);

onMounted(() => {
    // carousalControlsAnimationControl = animate('.carousal-control',
    animate('.carousal-control',
        { y: [0, 10, 0], },
        {
            repeat: Infinity,
            duration: 1.8,
            repeatType: 'mirror',
            ease: 'circInOut',
            repeatDelay: 10,

        }
    );
    // dividerMotionTransform = 
    dividerMotionPosition.forEach(
        (motionPosition, index) => {
            watch(motionPosition.constraint, (box) => {
                const motionTransform = getMotionTransform(motionPosition);
                if (carousalsContent[index]?.length === 2) {
                    dividerMotionTransform[index] = [motionTransform.leftClipPath, motionTransform.rightClipPath]
                }
                else {
                    dividerMotionTransform[index] = [
                        motionTransform.topLeftClipPath, motionTransform.topRightClipPath,
                        motionTransform.bottomLeftClipPath, motionTransform.bottomRightClipPath
                    ]

                }
                showPageCard.value = true;
            })

        },
    )
})

// function onResize(entries: any) {

// }
useResizeObserver(constraintRef, (entries) => {
    //reset divider arrow
    resetDivider();
})

function resetDivider() {
    dividerMotionPosition.forEach(motionPosition => {
        if (typeof (motionPosition) === 'undefined') {
            return;
        }
        if (motionPosition.xPosValue.get() !== 0) {
            motionPosition.xPosValue.jump(0);
        }
    });
}

function getMotionTransform(positionMotionValue: PositionMotionValue): ClipPathTransform {
    //     defaultBoundingBox == positionMotionValue.constraint.value);
    if (!positionMotionValue) { return defaultClipPath };
    if (JSON.stringify(positionMotionValue.constraint.value) ===
        JSON.stringify(defaultBoundingBox)) {
        // console.log("setting motion value with default boundingbox: ");
        return defaultClipPath;
    }

    // console.log("setting motion value with updated boundingbox: ");
    const xPercentTransform = useTransform(
        positionMotionValue.xPosValue,
        [positionMotionValue.constraint.value.left!, positionMotionValue.constraint.value.right!],
        // [globalDragConstraints.value.left!, globalDragConstraints.value.right!],
        [1, 99]
    );
    const xPercentAlternateTransform = useTransform(() =>
        99 - xPercentTransform.get()
    );
    const yPercentTransform = useTransform(
        positionMotionValue.yPosValue,
        [positionMotionValue.constraint.value.top!, positionMotionValue.constraint.value.bottom!],
        // [globalDragConstraints.value.top!, globalDragConstraints.value.bottom!],
        [1, 99]
    );
    const yPercentAlternateTransform = useTransform(() =>
        99 - yPercentTransform.get()
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

function getDragConstraints(index: number, width: number, height: number,
    enableAllAxis: boolean = true): Partial<BoundingBox> {
    // dividerMotionPosition[index]!.width = width;
    // dividerMotionPosition[index]!.height = height;
    const constraint = {
        left: -(width / 2),
        right: (width / 2),
        top: enableAllAxis ? -(height / 2) : 0,
        bottom: enableAllAxis ? (height / 2) : 0,
    };
    // console.log("getDragConstraints called: ", JSON.stringify(constraint));

    if (JSON.stringify(constraint) !==
        JSON.stringify(defaultBoundingBox)) {
        dividerMotionPosition[index]!.constraint.value = constraint;
    }
    return constraint;
};

// function getClipPath

function enableExtraCarousals(item: any, asString = false) {
    return (item as CardData[]).length > 2
}


</script>

<template>
    <motion.div>
        <!-- <div vresiz>

        </div> -->
        <UCarousel ref="constraintRef" arrows dots loop v-slot="{ item, index }" :items="carousalsContent"
            class="z-0 w-full border-2" :watchDrag="false" :ui="{
                controls: 'carousal-control absolute -top-12 sm:-top-14 -inset-x-6 sm:inset-x-12',
                dots: 'top-1',
                dot: 'w-6 h-1'
            }">

            <UseElementSize v-slot="{ width, height }" class="flex justify-center border-green-500">
                <!-- <motion.div drag :dragConstraints="dragConstraints(width, height)" :style="{ x, y }" -->
                <motion.div drag :dragConstraints="getDragConstraints(index, width, height, enableExtraCarousals(item))"
                    :dragElastic="0.2"
                    :style="{ x: dividerMotionPosition[index]!.xPosValue, y: dividerMotionPosition[index]!.yPosValue }"
                    class="absolute bg-neutral-100 rounded-full self-center
                                flex text-neutral-800 z-2">
                    <UIcon name="i-icon-park-outline-direction-adjustment-two" size="30" />
                </motion.div>

                <!-- visual divider lines -->
                <motion.div :class='`absolute self-center border-1 z-1 h-full`'
                    :style="{ x: dividerMotionPosition[index]!.xPosValue }" />
                <motion.div v-if="(item as CardData[]).length > 2" :class='`absolute self-center border-1 z-1 w-full`'
                    :style="{ y: dividerMotionPosition[index]!.yPosValue }" />
                <!-- visual divider lines -->

                <!-- :style="{clipPath: dividerMotionTransform[index]!.value.leftClipPath}"> -->
                <motion.div v-if="showPageCard" v-for="(cardData, inner_index) in (item as CardData[])"
                    :class='`w-full ${(inner_index === 0 ? "" : "absolute")}`'
                    :style="{ clipPath: dividerMotionTransform[index][inner_index] }">
                    <LazyPageCard hydrate-on-idle :pageCardData="cardData" :offset="index" class="w-full bg-cover" />
                </motion.div>

            </UseElementSize>


        </UCarousel>

    </motion.div>
</template>


<style scoped>
.mask-bottom-left {
    clip-path: inset(0% 40% 60% 0%);
}
</style>