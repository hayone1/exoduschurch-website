<script setup lang="ts">
import type { ParallaxData } from '~/types';


const {
    parallaxData = {} as ParallaxData,
    offset = 0,
} = defineProps<{
    parallaxData: ParallaxData,
    offset: number
}>();

</script>
<template>
    <div>

    </div>
</template>


<style scoped>

</style>