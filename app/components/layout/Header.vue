<script setup lang="ts">
// import type { NavigationMenuItem } from '@nuxt/ui'
const viewport = useViewport();
const navLabels = [
  "Community", "Sermons", "Events",
  "Give", "Reach out"
];

function navProps(label: string | undefined) {
  var navClass: string;
  var navLabel: string = label ?? "";
  if (viewport.isLessThan('mobileWide')) {
    navClass = "text-lg";
    navLabel = "";
  }
  else if (viewport.isLessOrEquals('tablet')) {
    navClass = "text-sm";
    navLabel = label ?? "";
    if (label === navLabels.at(-1)) {
      navClass = "hidden";
    }
  }
  else {
    navClass = "text-base";
  }
  return { navClass, navLabel };
};

const navItems = computed(() => [
  {
    label: navProps(navLabels[0]).navLabel,
    value: viewport.breakpoint, //workaround to allow computed to run reactively
    icon: 'i-fluent-people-community-20-regular',
    to: '/getting-started',
    class: navProps(navLabels[0]).navClass,
    active: true,
    children: []
  },
  {
    label: navProps(navLabels[1]).navLabel,
    icon: 'i-fluent-headphones-sound-wave-20-filled',
    to: '/composables',
    class: navProps(navLabels[1]).navClass,
    children: []
  },
  {
    label: navProps(navLabels[2]).navLabel,
    icon: 'i-fluent-calendar-20-regular',
    to: '/components',
    class: navProps(navLabels[2]).navClass,
    children: []
  },
  {
    label: navProps(navLabels[3]).navLabel,
    icon: 'i-fluent-handshake-20-regular',
    to: 'https://github.com/nuxt/ui',
    class: navProps(navLabels[3]).navClass,
    target: '_blank'
  },
  {
    label: navProps(navLabels[4]).navLabel,
    to: '/components',
    icon: 'i-fluent-mail-multiple-20-regular',
    class: navProps(navLabels[4]).navClass,
  }
])




// const navItems = reactive<NavigationMenuItem[]>(allNavItems);


</script>

<template>
  <div class="p-4">
    <UContainer class="justify-self-center col-span-10 rounded-full border-solid border-secondary border-1
                        transition delay-150 duration-300 ease-in-out hover:-translate-y-1
                        hover:scale-105 hover:bg-neutral-800 max-w-fit">
      <UNavigationMenu :items="navItems" variant="link" highlight class="flex justify-center-safe" />
    </UContainer>
  </div>
</template>
