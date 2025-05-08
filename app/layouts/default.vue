<script setup lang="ts">
  
import { frame, motion, useMotionValue, useSpring, type AnimationPlaybackControls, type AnimationSequence, type Transition } from "motion-v"
const colorMode = useColorMode();
const time = useTime();
const [scope, animate] = useAnimate()

const spring = { damping: 3, stiffness: 20, restDelta: 0.001 };
const mouseFollower = ref(null);
const xPoint = useMotionValue(0);
const yPoint = useMotionValue(0);
const x = useSpring(xPoint, spring);
const y = useSpring(yPoint, spring);

const handlePointerMove = ({ clientX, clientY }) => {
  const element = mouseFollower.value?.$el
  if (!element) return

  frame.read(() => {
    xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
    yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
  })
};

const defaultTransition: Transition = {
  repeat: Infinity,
  repeatType: 'mirror',
  duration: 20,
  ease: 'easeInOut'
}
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
const defaultBackgroundBlobs = [
  { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', backGroundColor: "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)" },
  { borderRadius: '15% 85% 79% 21% / 25% 36% 64% 75%', backGroundColor: "linear-gradient(to bottom left, #0100EC, #FB36F4)" },
  { borderRadius: '55% 45% 51% 49% / 63% 66% 34% 37%', backGroundColor: "linear-gradient(to right, #00C0FF, #4218B8)" },
  { borderRadius: '89% 11% 61% 39% / 89% 71% 29% 11%', backGroundColor: "linear-gradient(to top right, #c33764, #1d2671)" },
];
const backgroundBlobs = defaultBackgroundBlobs.map((blob, index) => {
  return { ...blob, id: "background-blob-" + index, index: index, targetIndex: index }
})

const backgroundBlobsAnimation: AnimationPlaybackControls[] = []
// will be used to control the destination blobs.
const blobChangeIndex = reactive(backgroundBlobs);

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

onMounted(() => {
  window.addEventListener("pointermove", handlePointerMove)
  if (colorMode.value === 'light') {
    backgroundBlobs.forEach(blob => {
      // updateblobTarget(blob.index);
        animate(
          getBlobTargets(blob.index),
          {
            repeat: Infinity,
            repeatType: 'mirror',
            duration: randomInt(9,18),
            // ease: randomElement(['easeInOut', 'circInOut', 'easeInOut']),
          },
        );
    });
    
  }
})

onUnmounted(() => {
  window.removeEventListener("pointermove", handlePointerMove)
})
</script>



<template>
  <!-- <div class="-z-1 fixed w-screen h-screen bg-gradient-to-b from-black to-primary from-80% -->
  <motion.div v-if="colorMode.value === 'light'" :class="`-z-1 fixed w-screen h-screen
              overflow-hidden grid grid-cols-${blobsColumsNo}`"
              :animate="{scale: 1.4, transition: defaultTransition}">
    <motion.div v-for="(blob, index) in backgroundBlobs" :id=blob.id
      class="pointer-events-none blur-3xl"
      :initial="{
        borderRadius: blob.borderRadius,
        background: blob.backGroundColor
      }" />
    <motion.div class="mouse-follower absolute bg-primary rounded-full pointer-events-none blur-3xl" :style="{ x, y }"
      ref="mouseFollower">

    </motion.div>
  </motion.div>
  
  <div class="fixed w-screen h-screen opacity-25">
    <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='5.2' 
          numOctaves='1' 
          stitchTiles='stitch'/>
      </filter>
      
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>

  </div>
  <layoutHeader />
  <slot />
  <layoutFooter />
</template>


<style scoped>
.mouse-follower {
  left: 200px;
  top: 0px;
  width: 200px;
  height: 200px;
}

.blob-1 {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: animatedBlob 5s infinite alternate ease-in-out;
  left: 200px;
}

@keyframes animatedBlob {
  0% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }

  50% {
    border-radius: 15% 85% 79% 21% / 25% 36% 64% 75%;
  }

  100% {
    border-radius: 55% 45% 51% 49% / 63% 66% 34% 37%;
  }
}
</style>