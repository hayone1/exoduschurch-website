<script setup lang="ts">
// import type { NavigationMenuItem } from '@nuxt/ui'
const viewport = useViewport();

watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  if (viewport.isLessThan('mobileWide')) {
        items.forEach(item => {
            item.class = "text-lg";
            item.label = "";
        })
    }
    else if (viewport.isLessThan('tablet')) {
        items.forEach(item => {
            item.class = "text-xs";
            item.label = item.value;
        })
  }
  else {
    items.forEach(item => {
        item.label = item.value;
        item.class = "text-base";
    })
  }
})


const items = reactive<NavigationMenuItem[]>([
  {
    label: 'Community',
    value: 'Community',
    icon: 'i-fluent-people-community-20-regular',
    to: '/getting-started',
    class: 'text-base',
    children: []
  },
  {
    label: 'Sermons',
    value: 'Sermons',
    icon: 'i-fluent-headphones-sound-wave-20-filled',
    to: '/composables',
    class: 'text-base',
    active: true,
    children: []
  },
  {
    label: 'Events',
    value: 'Events',
    icon: 'i-fluent-calendar-20-regular',
    to: '/components',
    class: 'text-base',
    active: false,
    children: []
  },
  {
    label: 'Give',
    value: 'Give',
    icon: 'i-fluent-handshake-20-regular',
    to: 'https://github.com/nuxt/ui',
    class: 'text-base',
    target: '_blank'
  },
  {
    label: 'Reach out',
    value: 'Reach out',
    icon: 'i-fluent-mail-multiple-20-regular',
    class: 'text-base',
  }
])
</script>

<template>
    <UContainer class="pt-2">
        <div class="rounded-full border-solid border-secondary border-1 max-w-xl mx-auto
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-neutral-800">
            <UNavigationMenu :items="items" variant="link"
                highlight class="flex justify-center-safe"
                />

        </div>
    </UContainer>
</template>
