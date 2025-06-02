<script lang="ts" setup>
/**
 * @credits Pergel <https://nuxtlabs.com/>
 */
import { computed } from 'vue'

const {
    title = 'title',
    description = 'description',
} = defineProps<{
    title?: string, description?: string,
    headline?: string, logo?: string,
    socials?: { label: string, icon: string }[]
}>()

// const title = computed(() => props.title.slice(0, 60))
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center bg-[#212121]">
        <svg class="absolute top-0 right-0" width="1200" height="675" viewBox="0 0 1200 675" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g style="mix-blend-mode:overlay" opacity="0.7" filter="url(#filter0_f_448_25)">
                <circle cx="901.5" cy="45.5" r="199.5" fill="#FFA7A7" />
                <circle cx="600.5" cy="216.5" r="199.5" fill="#FFCC49" />
                <circle cx="179.5" cy="317.5" r="199.5" fill="#FFA149" />
            </g>
            <defs>
                <filter id="filter0_f_448_25" x="-240" y="-374" width="1561" height="1111" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="110" result="effect1_foregroundBlur_448_25" />
                </filter>
            </defs>
        </svg>

        <div class="w-[600px] pl-[100px]">
            <p v-if="headline" class="uppercase text-[24px] text-[#FEC476] mb-4 font-semibold">
                {{ headline }}
            </p>
            <h1 class="w-[600px] m-0 text-[75px] font-semibold mb-4 text-white"
                style="display: block; line-clamp: 2; text-overflow: ellipsis;">
                {{ title }}
            </h1>
            <p class="text-[32px] text-[#E4E4E7] leading-tight"
                style="display: block; line-clamp: 3; text-overflow: ellipsis;">
                {{ description }}
            </p>
            <div class="flex flex-row gap-4">
                <div v-for="social in socials"
                    class="flex flex-row gap-1 items-center text-2xl text-white">
                    <UIcon :name="social.icon" mode="svg" class="top-0.5"/>
                    <p>{{ social.label }}</p>
                </div>

            </div>
        </div>

        <div class="rounded-full absolute top-[250px] right-[190px] size-40
        border-2 bg-orange-50 flex justify-center">
            <NuxtImg v-if="logo" height="150" :src="logo" />
        </div>
        <!-- <NuxtImg v-if="logo" class="rounded-full absolute top-[250px] right-[190px] size-40
        border-2 border-black flex" :src="logo"/> -->
    </div>
</template>