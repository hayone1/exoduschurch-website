<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

// import type { NavigationMenuItem } from '@nuxt/ui'
const viewport = useViewport();
const navLabels = [
  "Community", "Sermons", "Events",
  "Give", "Reach out"
];

function navProps(label: string | undefined) {
  var navClass: string;
  var navLabel: string;
  var borderSize: string;
  if (viewport.isLessThan('mobileWide')) {
    navClass = "text-lg";
    navLabel = "";
    borderSize = "0";
  }
  else if (viewport.isLessOrEquals('tablet')) {
    navClass = "text-xs";
    navLabel = label ?? "";
    borderSize = "1";
  }
  else {
    navLabel = label ?? "";
    navClass = "text-base";
    borderSize = "1";
  }
  return { navClass, navLabel, borderSize };
};

// watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {

// })

const borderSize = ref("1");
const defaultNavItems = reactive<NavigationMenuItem[]>([
  {
    label: navProps(navLabels[0]).navLabel,
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
]);

// const navItems = reactive<NavigationMenuItem[]>(allNavItems);


</script>

<template>
  <UContainer class="pt-4">
    <UContainer :class="`rounded-full border-solid border-secondary border-${borderSize} mx-auto
                    transition delay-150 duration-300 ease-in-out hover:-translate-y-1
                    hover:scale-105 hover:bg-neutral-800`">
      <UNavigationMenu :items="defaultNavItems" variant="link" highlight class="flex justify-center-safe" />

    </UContainer>
  </UContainer>
</template>
