<script setup lang="ts">
import { useElementBounding, useElementSize, useMouseInElement } from '@vueuse/core'
import type { PointerLocation, IParallaxFlow } from '~/types';
import type { Edge, Node } from '@vue-flow/core';
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background'
import { animate, frame, motion, MotionValue, motionValue, stagger, useMotionValue, useSpring } from "motion-v"
import type { Reactive, WatchHandle } from 'vue';

const {
    parallaxFlow = {} as IParallaxFlow,
    scrollYProgress = motionValue(0),
} = defineProps<{
    parallaxFlow: IParallaxFlow,
    scrollYProgress: MotionValue
}>();


const { fitView } = useVueFlow();
const parallaxFocusThresholds = divideIntoParts(
    1, parallaxFlow.visibilityNodesGroup.length + 1
);

const route = useRoute();
const xPoint = useMotionValue(0);
const yPoint = useMotionValue(0);
const springConfig = { damping: 5, stiffness: 20, restDelta: 0.001 };

const mouseFollower = useTemplateRef('mouseFollower');
const mouseFollowerSize = useElementSize(mouseFollower);
const mainContainer = useTemplateRef<HTMLDivElement>('mainContainer');
const mainContainerSize = useElementSize(mainContainer);
const mouseInMainContainer = useMouseInElement(mainContainer);

const mouseFollowerX = useSpring(xPoint, springConfig);
const mouseFollowerY = useSpring(yPoint, springConfig);
var visibleNodeGroups: string[] = [];

const scrollHintAnim = ({
    opacity: [0, 1, 0],
});
const scrollHintTransition = (delay: number) => ({
        repeat: Infinity,
        duration: 1,
        repeatType: 'mirror' as const,
        ease: 'easeOut',
        delay: delay,
        repeatDelay: 3,
})

var element_id: string;
const elementRef = useTemplateRef('elementRef');
if (typeof (route.fullPath) !== 'undefined' && route.fullPath.includes("#")) {
    element_id = route.fullPath.split("#").at(-1)!;
}

var nodes: globalThis.Ref<
    Node<any, any, string>[],
    Node<any, any, string>[]> = ref([]);
// var nodes: Reactive<Node<any, any, string>[]>;
var edges: Edge[];
var sizeWatcher: WatchHandle;
//---------Nodes Animation-----------
useMotionValueEvent(scrollYProgress, 'change', (currentProgress) => {
    // console.log("[Flow Item]: parallaxScroll Value: ", currentProgress)
    parallaxFocusThresholds.forEach((threshold, index) => {
        const offsetThreshold = (threshold + .05);
        //conditions ensure animation only runs on first scroll down
        if (
            visibleNodeGroups.length <= parallaxFlow.visibilityNodesGroup.flat().length &&
            scrollYProgress.getPrevious() < offsetThreshold &&
            currentProgress >= threshold
        ) {
            visibleNodeGroups = parallaxFlow.visibilityNodesGroup.slice(
                0, index + 1
            ).flat();
            // console.log("current Visibility Group: ", JSON.stringify(visibleNodeGroups));
            updateNodes();
            fitView({
                nodes: visibleNodeGroups,
                // nodes: parallaxFlow.focusNodes.slice(0, index + 1),
                duration: 500
            });

        }
    });
})

const mouseMovementWatcher = watchEffect(
    () => {
        xPoint.set(
            mouseInMainContainer.elementX.value -
            mouseInMainContainer.elementWidth.value / 2
            // mouseFollowerSize.width.value / 2
        );
        yPoint.set(
            mouseInMainContainer.elementY.value -
            mouseFollowerSize.height.value / 2
        );
        // handleMouseMove(
        //     mouseInMainContainer.elementX.value,
        //     mouseInMainContainer.elementY.value,
        // )
    });
watch(mouseInMainContainer.isOutside, (isOutside) => {
    if (!isOutside) {
        mouseMovementWatcher.resume();
    }
    else {
        mouseMovementWatcher.pause();
    }
})

function updateNodes() {
    // updateNodes();
    sizeWatcher = watchEffect(() => {
        nodes.value = parallaxFlow.nodes(
            mainContainerSize.width.value,
            mainContainerSize.height.value,
        ).map(node => ({
            ...node,
            hidden: !visibleNodeGroups.includes(node.id)
        }));
    })
}


onMounted(() => {

    updateNodes();
    edges = parallaxFlow.edges;

    if (element_id === elementRef.value?.id) {
        nextTick(() => {
            setTimeout(() => {
                console.log("element_id found:", element_id);
                elementRef.value?.scrollIntoView(
                    {
                        behavior: "smooth",
                    }
                );
            }, 500) //not sure if this is good code lol
        })
    }
});

// onUnmounted(() => {
//     sizeWatcher.stop();
// })

</script>
<template>
    <div ref="mainContainer">
        <div class="absolute size-full overflow-hidden flex justify-center">
            <motion.div class="size-10 bg-transparent
                border-green-500 border-1 rounded-full pointer-events-none"
                :style="{ x: mouseFollowerX, y: mouseFollowerY }" ref="mouseFollower" />
            <h2 class="absolute self-center font-bold text-8xl opacity-25">
                {{ parallaxFlow.title }}
            </h2>
            <div class="absolute bottom-0 right-1/2 translate-x-1/2 flex flex-col items-center">
                <motion.div :animate="scrollHintAnim" :transition="scrollHintTransition(0.2)"
                    :initial="{ opacity: 1 }">
                    <UIcon name="i-fluent-chevron-down-20-filled" size="30" />
                </motion.div>
                <motion.div :animate="scrollHintAnim" :transition="scrollHintTransition(0.4)"
                    :initial="{ opacity: 1 }" class="-translate-y-6">
                    <UIcon name="i-fluent-chevron-down-20-filled" size="30" />
                </motion.div>
                <p class="text-muted text-center -translate-y-9 ">Scroll</p>
            </div>
        </div>
        <div ref="elementRef" :id="transformToId(parallaxFlow.title)"
            :class="`h-screen overfow-hidden z-3 ${parallaxFlow.backGroundColor.value.parentBackground}`">
            <VueFlow :nodes="nodes" :edges="edges" :zoom-on-scroll="false" :zoom-on-pinch="false"
                :zoom-on-double-click="false" :pan-on-scroll="false" :pan-on-drag="false" :prevent-scrolling="true">
                <Background :patternColor="parallaxFlow.backGroundColor.value.patternBackground" :size="1.4" />
            </VueFlow>
        </div>
    </div>
</template>


<style scoped>
.node-1 {
    opacity: 0.3;
}
</style>