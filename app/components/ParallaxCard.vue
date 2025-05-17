<script setup lang="ts">
import { useElementBounding, useElementSize, useMouseInElement } from '@vueuse/core'
import type { PointerLocation, ParallaxFlow } from '~/types';
import type { Node } from '@vue-flow/core';
import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background'
import { UseElementSize } from '@vueuse/components';
import { frame, motion, useMotionValue, useSpring } from "motion-v"
import type { WatchHandle } from '@vue/runtime-dom';

const {
    parallaxFlow = {} as ParallaxFlow,
    offset = 0,
} = defineProps<{
    parallaxFlow: ParallaxFlow,
    offset: number
}>();

const xPoint = useMotionValue(0);
const yPoint = useMotionValue(0);
const springConfig = { damping: 3, stiffness: 20, restDelta: 0.001 };

const mouseFollower = useTemplateRef('mouseFollower');
const mouseFollowerSize = useElementSize(mouseFollower);
const mouseFollowerParent = useTemplateRef<HTMLDivElement>('mouseFollowerParent');
const mouseFollowerBounds = useMouseInElement(mouseFollowerParent);

const mouseFollowerX = useSpring(xPoint, springConfig);
const mouseFollowerY = useSpring(yPoint, springConfig);

const handleMouseMove = (elementX: number, elementY: number) => {
//   const element = mouseFollower.value?.$el
//   if (!element) return

  frame.read(() => {
    xPoint.set(elementX - mouseFollowerSize.width.value/2);
    yPoint.set(elementY - mouseFollowerSize.height.value/2);
  })
};

const mouseMovementWatcher = watchEffect(
    () => {
        handleMouseMove(
        mouseFollowerBounds.elementX.value,
        mouseFollowerBounds.elementY.value,
    )
});
watch(mouseFollowerBounds.isOutside, (isOutside) => {
    if (!isOutside) {
        mouseMovementWatcher.resume();
    }
    else {
        mouseMovementWatcher.pause();
    }
})

// onMounted(() => {
//     window.addEventListener("pointermove", handlePointerMove);
// })

// onUnmounted(() => {
//     window.removeEventListener("pointermove", handlePointerMove);
// })

</script>
<template>
    <div ref="mouseFollowerParent" class="absolute size-full overflow-hidden">
        <motion.div class="size-10  bg-transparent
                border-green-500 border-1 rounded-full pointer-events-none"
            :style="{ x: mouseFollowerX, y: mouseFollowerY }" ref="mouseFollower" />
    </div>
    <UseElementSize v-slot="{ width, height }">
        <div :class="`h-screen overfow-hidden ${parallaxFlow.backGroundColor.value.parentBackground}`">
            <VueFlow :nodes="parallaxFlow.nodes(width, height)"
                :edges="parallaxFlow.edges" :zoom-on-scroll="false" :zoom-on-pinch="false"
                :zoom-on-double-click="false" :pan-on-scroll="false" :pan-on-drag="false" :prevent-scrolling="true">
                <Background :patternColor="parallaxFlow.backGroundColor.value.patternBackground" :size="1.4" />
            </VueFlow>

        </div>
    </UseElementSize>

</template>


<style scoped></style>