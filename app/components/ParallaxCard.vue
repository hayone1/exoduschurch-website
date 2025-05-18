<script setup lang="ts">
import { useElementBounding, useElementSize, useMouseInElement } from '@vueuse/core'
import type { PointerLocation, ParallaxFlow } from '~/types';
import type { Edge, Node } from '@vue-flow/core';
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background'
import { UseElementSize } from '@vueuse/components';
import { animate, frame, motion, MotionValue, motionValue, useMotionValue, useSpring } from "motion-v"
import type { Reactive, WatchHandle } from 'vue';

const {
    parallaxFlow = {} as ParallaxFlow,
    scrollYProgress = motionValue(0),
} = defineProps<{
    parallaxFlow: ParallaxFlow,
    scrollYProgress: MotionValue
}>();


const { fitView } = useVueFlow();
const parallaxFocusThresholds = divideIntoParts(
    1, parallaxFlow.focusNodes.length + 1
);
var visibleNodesElement: Element[][];

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
        if (scrollYProgress.getPrevious() < offsetThreshold &&
            currentProgress >= threshold) {
            visibleNodeGroups = parallaxFlow.visibilityNodesGroup.slice(
                0, index + 1
            ).flat();
            updateNodes();
            // fitView({
            //     nodes: parallaxFlow.focusNodes.slice(0, index + 1),
            //     duration: 500
            // });
            // parallaxFlow.visibleNodesGroup[index]?.forEach(node => {
            //     parallaxFlow.nodes.
            // })
            // if (typeof(visibleNodesElement[index]) !== 'undefined') {
            //     // animate(
            //     //     document.querySelector('[data-id="data-1a"]') as {}, 
            //     //     { opacity: 0 }, { duration: 0.5 }
            //     // );
            //     // visibleNodesElement[index]
            //     // console.log("element to animate: " + visibleNodesElement[index][0]);
            // }
            // console.log("visibleNodesElements: " + JSON.stringify(document.querySelectorAll('[data-id]')));

            // console.log("focus on Nodes: ", JSON.stringify(parallaxFlow.focusNodes.slice(0, index + 1)))
        }
        else if (scrollYProgress.getPrevious() > offsetThreshold &&
            currentProgress <= threshold) {
            fitView({
                nodes: parallaxFlow.focusNodes.slice(0, index),
                duration: 500
            });
            console.log("focus on Nodes: ", JSON.stringify(parallaxFlow.focusNodes.slice(0, index)))
        }
    });
})

//-----------Mouse Follower---------------
const handleMouseMove = (elementX: number, elementY: number) => {
    frame.read(() => {
        xPoint.set(elementX - mouseFollowerSize.width.value / 2);
        yPoint.set(elementY - mouseFollowerSize.height.value / 2);
    })
};

const mouseMovementWatcher = watchEffect(
    () => {
        handleMouseMove(
            mouseInMainContainer.elementX.value,
            mouseInMainContainer.elementY.value,
        )
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
        console.log("current Visibility Group: ", JSON.stringify(visibleNodeGroups));
        // console.log("Is hidden values: ",
        //     JSON.stringify(nodes.map(node => node.hidden))
        // );
    })
}

onMounted(() => {
    // visibleNodesElement = parallaxFlow.visibleNodesGroup.map(nodeGroup =>
    //     nodeGroup.map(node => document.querySelector(`[data-id="${node}"]`))
    // ) as Element[][];

    // const mouseMovementWatcher = watchEffect(
    //     () => {
    //         handleMouseMove(
    //             mouseInMainContainer.elementX.value,
    //             mouseInMainContainer.elementY.value,
    //         )
    //     });
    updateNodes();
    edges = parallaxFlow.edges;
    //     nodes = parallaxFlow.nod
    // es(
    //     mouseInMainContainer.elementWidth.value,
    //     mouseInMainContainer.elementHeight.value
    // );
    // console.log("visibleNodesElements: " + visibleNodesElement);
    // console.log("visibleNodesElements: " + JSON.stringify(document.querySelectorAll('[data-id]')));
})

// onUnmounted(() => {
//     window.removeEventListener("pointermove", handlePointerMove);
// })

</script>
<template>
    <div class="absolute size-full overflow-hidden">
        <motion.div class="size-10  bg-transparent
        border-green-500 border-1 rounded-full pointer-events-none" :style="{ x: mouseFollowerX, y: mouseFollowerY }"
            ref="mouseFollower" />
    </div>
    <UseElementSize v-slot="{ width, height }">
        <div ref="mainContainer"
            :class="`h-screen overfow-hidden ${parallaxFlow.backGroundColor.value.parentBackground}`">
            <VueFlow :nodes="nodes" :edges="edges" :zoom-on-scroll="false" :zoom-on-pinch="false"
                :zoom-on-double-click="false" :pan-on-scroll="false" :pan-on-drag="false" :prevent-scrolling="true">
                <Background :patternColor="parallaxFlow.backGroundColor.value.patternBackground" :size="1.4" />
            </VueFlow>

        </div>
    </UseElementSize>

</template>


<style scoped>
.node-1 {
    opacity: 0.3;
}
</style>