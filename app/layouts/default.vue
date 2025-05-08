<script setup lang="ts">
  
import { frame, motion, useMotionValue, useSpring, type AnimationPlaybackControls, type AnimationSequence, type Transition } from "motion-v"
const time = useTime();
const [scope, animate] = useAnimate()

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };
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
  { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
  { borderRadius: '15% 85% 79% 21% / 25% 36% 64% 75%' },
  { borderRadius: '55% 45% 51% 49% / 63% 66% 34% 37%' },
  { borderRadius: '89% 11% 61% 39% / 89% 71% 29% 11%' },
];
const backgroundBlobs = defaultBackgroundBlobs.map((blob, index) => {
  return { ...blob, scale: 1.2, id: "background-blob-" + index, index: index, targetIndex: index }
})

const backgroundBlobsAnimation: AnimationPlaybackControls[] = []
const blobMirror = (index: number) => {
  return backgroundBlobs[(backgroundBlobs.length - 1) - index]!
};
// will be used to control the destination blobs.
const blobChangeIndex = reactive(backgroundBlobs);

function getBlobTargets(blobIndex: number): AnimationSequence {
  const blob = backgroundBlobs[blobIndex]!;
  const validtargets = shuffle(backgroundBlobs.filter((_, targetIndex) =>
    targetIndex !== blobIndex
  ));
  return validtargets.map((target, index) => [
      document.getElementById(blob.id) as {},
      { borderRadius: target.borderRadius, scale: randomFloat(0.6, 1.4)  },
  ]);
}
// const blobChangeMotion = 

// watch([blobChangeIndex], ([newIndex], oldIndex, onCleanup) => {

// })
const blobsColumsNo = backgroundBlobs.length / 2;

onMounted(() => {
  window.addEventListener("pointermove", handlePointerMove)
  backgroundBlobs.forEach(blob => {
    // updateblobTarget(blob.index);
      animate(
        getBlobTargets(blob.index),
        {
          repeat: Infinity,
          delay: 1,
          repeatType: 'reverse',
          duration: 10,
          ease: 'easeInOut',
          // onComplete: () => updateblobTarget(blob.index)
        },
      );
  });
})

onUnmounted(() => {
  window.removeEventListener("pointermove", handlePointerMove)
})
</script>



<template>
  <!-- <div class="-z-1 fixed w-screen h-screen bg-gradient-to-b from-black to-primary from-80% -->
  <motion.div :class="`-z-1 fixed w-screen h-screen
              overflow-hidden grid grid-cols-${blobsColumsNo}`"
              :animate="{scale: 1.4, transition: defaultTransition}">
    <!-- <div v-for="blob in backgroundBlobs" class="border-3"
    >Hiii</div> -->
    <motion.div v-for="(blob, index) in backgroundBlobs" :id=blob.id
      class="bg-primary pointer-events-none blur-3xl"
      :initial="{ borderRadius: blob.borderRadius }" />
    <!-- :animate="{ borderRadius: backgroundBlobs[blob.targetIndex]?.borderRadius }" -->
    <!-- rotate: 360, -->
    <motion.div class="mouse-follower absolute bg-primary rounded-full pointer-events-none blur-3xl" :style="{ x, y }"
      ref="mouseFollower">

    </motion.div>
  </motion.div>
  <layoutHeader />
  <slot />
  <footer>
    Footer content
  </footer>
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