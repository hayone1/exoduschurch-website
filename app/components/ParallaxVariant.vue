<script setup lang="ts">
import { motion, MotionValue, motionValue } from 'motion-v';
import type { IParallaxVariant } from '~/types';
// import '@zumer/orbit/dist/orbit.js';


const {
    parallaxVariant = {} as IParallaxVariant,
    scrollYProgress = motionValue(0),
} = defineProps<{
    parallaxVariant: IParallaxVariant,
    scrollYProgress: MotionValue
}>();
const yInsetTransform = useTransform(
    scrollYProgress,
    [0, 0.2],
    // [globalDragConstraints.value.left!, globalDragConstraints.value.right!],
    [100, 0]
);
const springConfig = { damping: 5, stiffness: 20, restDelta: 0.001 };
const yClipPathSpring = useSpring(yInsetTransform, springConfig);
const yClipPath = useMotionTemplate`inset(${yClipPathSpring}%  0%)`;

const showNodes = parallaxVariant.nodes.map(node =>
    ref(false)
);
var animationComplete = false;
useMotionValueEvent(yClipPathSpring, "change", (latestValue) => {
    if (latestValue < 5 && !animationComplete) {
        showNodes.forEach(showNode =>
            showNode.value = true
        );
        animationComplete = true;
    }
    if (latestValue > 90 && animationComplete) {
        showNodes.forEach(showNode =>
            showNode.value = false
        );
        animationComplete = false;
    }
})



</script>
<template>
    <motion.div class="overflow-hidden" :style="{ clipPath: yClipPath }">
        <div class="magicpattern-1 h-screen grid grid-cols-4
            gap-4 pt-10 px-4 justify-items-center" :class="parallaxVariant.backGroundColor">

            <div class="z-0 absolute size-full flex justify-center">
                <h2 class="absolute self-center font-bold text-6xl sm:text-8xl opacity-25 text-black">
                {{ parallaxVariant.title }}
            </h2>
            </div>
            <div v-for="(node, index) in parallaxVariant.nodes"
                    :class="node.locationClass"
                class="size-full z-1">
                <AnimatePresence>
                    <motion.div v-if="showNodes[index]?.value" class="size-full"
                        :initial="{ scale: 0 }"
                        :animate="{ scale: 1 }"
                        :transition="{ type: 'spring', bounce: 0.25, delay: (index/10) + 0.1 }">
                        <UButton class="min-h-1/3 text-wrap w-full justify-center" color="neutral" :label="node.label">
                            {{ node.label }}
                        </UButton>

                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
        <div class="bigbang">
            <div class="gravity-spot">
                <div class="orbit-6 range-240 from-240">
                    <div class="satellite grow-4x at-center">
                        <div class="capsule -translate-y-6 translate-x-1">
                            <NuxtImg sizes="150px" :src="parallaxVariant.graphic.centralImage" />
                        </div>
                    </div>
                    <!-- <div class="capsule  -translate-y-6">
                        <NuxtImg sizes="150px" src="/images/light/exodus-missions-logo.png" />
                    </div> -->
                    <div v-for="icon in parallaxVariant.graphic.icons" class="satellite grow-1x">
                        <div class="capsule text-white">
                            <UIcon :name="icon" size="25" />
                            <!-- <UIcon :name="`i-lucide-image`" size="20"/> -->
                            <!-- <UAvatar icon="i-lucide-image" size="md" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>


</template>


<style scoped>
.satellite {
    background: black;
    outline: thick double black;
}

</style>