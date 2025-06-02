<script setup lang="ts">

import { LayoutLoading } from "#components";
import { useElementSize } from "@vueuse/core";
import { frame, motion, useMotionValue, useSpring, type AnimationPlaybackControls, type AnimationSequence, type Transition } from "motion-v"
import type { PointerLocation } from '~/types';
const colorMode = useColorMode();
const [scope, animate] = useAnimate();

const animatedBackgroundRef = useTemplateRef("animatedBackgroundRef");


const springConfig = { damping: 3, stiffness: 20, restDelta: 0.001 };
const mouseFollower = useTemplateRef('mouseFollower');
const mouseFollowerSize = useElementSize(mouseFollower);
const xPoint = useMotionValue(0);
const yPoint = useMotionValue(0);
const x = useSpring(xPoint, springConfig);
const y = useSpring(yPoint, springConfig);

const handlePointerMove = ({ clientX, clientY }: PointerLocation) => {
  const element = mouseFollower.value?.$el
  if (!element) return

  frame.read(() => {
    // xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
    // yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
    xPoint.set(clientX - mouseFollowerSize.width.value/2);
    yPoint.set(clientY - mouseFollowerSize.height.value/2);
  })
};

const defaultTransition: Transition = {
  repeat: Infinity,
  repeatType: 'mirror',
  duration: 20,
  ease: 'easeInOut'
}
// const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
const defaultBackgroundBlobs = [
  { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', backGroundColor: "linear-gradient(180deg, #12c2e9 0%, #f64f59 100%)" },
  { borderRadius: '15% 85% 79% 21% / 25% 36% 64% 75%', backGroundColor: "linear-gradient(180deg, #0100EC 0%, #FB36F4 100%)" },
  { borderRadius: '55% 45% 51% 49% / 63% 66% 34% 37%', backGroundColor: "linear-gradient(180deg, #00C0FF 0%, #4218B8 100%)" },
  { borderRadius: '89% 11% 61% 39% / 89% 71% 29% 11%', backGroundColor: "linear-gradient(180deg, #c33764 0%, #1d2671 100%)" },
];

const backgroundBlobs = defaultBackgroundBlobs.map((blob, index) => {
  return { ...blob, id: "background-blob-" + index, index: index, targetIndex: index }
})


function getBlobTargets(blobIndex: number): AnimationSequence {
  const blob = backgroundBlobs[blobIndex]!;
  const validtargets = shuffle(backgroundBlobs.filter((_, targetIndex) =>
    targetIndex !== blobIndex
  ));
  return validtargets.map((target, index) => [
    document.getElementById(blob.id) as {},
    {
      borderRadius: target.borderRadius,
      scale: randomFloat(1.0, 1.6),
      background: target.backGroundColor
      // backgroundColor: 
    },
  ]);
}
// const blobChangeMotion = 

// watch([blobChangeIndex], ([newIndex], oldIndex, onCleanup) => {

// })
const blobsColumsNo = backgroundBlobs.length / 2;

watch(animatedBackgroundRef, () => {
  window.addEventListener("pointermove", handlePointerMove);
  if (colorMode.value === 'light') {
    backgroundBlobs.forEach(blob => {
      // updateblobTarget(blob.index);
      animate(
        getBlobTargets(blob.index),
        {
          repeat: Infinity,
          repeatType: 'mirror',
          duration: randomInt(9, 18),
          // ease: randomElement(['easeInOut', 'circInOut', 'easeInOut']),
        },
      );
    });

  }
}, { once: true });

onUnmounted(() => {
  window.removeEventListener("pointermove", handlePointerMove)
})
</script>



<template>
  <section id="animated-background" ref="animatedBackgroundRef">
    <motion.div v-if="colorMode.value === 'light'" :class="`-z-5 fixed size-full
                    overflow-hidden grid grid-cols-${blobsColumsNo}`"
      :animate="{ scale: 1.4, transition: defaultTransition }">
      <motion.div v-for="(blob, index) in backgroundBlobs" :id=blob.id class="pointer-events-none" :initial="{
        borderRadius: blob.borderRadius,
        background: blob.backGroundColor
      }" />
      <motion.div class="size-24 absolute bg-primary rounded-full pointer-events-none"
        :style="{ x, y }" ref="mouseFollower" />
        <div class="absolute size-full blurred"></div>
    </motion.div>

  </section>
  <section id="grainy-background" class="absolute h-screen pointer-events-none">
    <svg xmlns='http://www.w3.org/2000/svg' class="fixed size-full opacity-25 z-1">
      <filter id='noiseFilter'>
        <feTurbulence type='fractalNoise' baseFrequency='5.2' numOctaves='1' stitchTiles='stitch' />
      </filter>

      <rect width='100%' height='100%' filter='url(#noiseFilter)' />
    </svg>
  </section>
</template>


<style scoped>
.mouse-follower {
  left: 0px;
  top: 0px;
  width: 200px;
  height: 200px;
}

.blurred {
  backdrop-filter: blur( 40px );
  -webkit-backdrop-filter: blur( 40px );
}
</style>