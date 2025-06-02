<script setup lang="ts">
// import type { NavigationMenuItem } from '@nuxt/ui'
const route = useRoute();
const viewport = useViewport();
const colorMode = useColorMode();
const navLabels = [
  "home", "about", "sermons",
  "give","events",
];
const backgroundColor = computed(() =>
  colorMode.value === 'light' ? "bg-white/50" : "bg-neutral-800/60"
);
const hoverStyle = computed(() =>
  colorMode.value === 'light' ? "hover:scale-105" : "hover:scale-105 hover:bg-neutral-800"
);

function navProps(label: string) {
  var navClass: string = "z-20";
  var navLabel: string = label.charAt(0).toUpperCase() + label.slice(1);
  if (colorMode.value === 'light') {
    navClass += " text-neutral-700";
  }
  if (viewport.isLessThan('mobileWide')) {
    navClass += " text-lg";
    navLabel = "";
  }
  else if (viewport.isLessOrEquals('tablet')) {
    navClass += " ";
    // navLabel = label ?? "";
    if (label === navLabels.at(-1)) {
      navClass = "hidden";
    }
  }
  else {
    navClass += " text-base";
  }
  return { navClass, navLabel };
};

const navItems = computed(() => [
  {
    label: navProps(navLabels[0]!).navLabel,
    value: viewport.breakpoint, //workaround to allow computed to run reactively
    icon: 'i-fluent-home-20-regular',
    avatar: {
      icon: 'i-fluent-home-20-regular'
    },
    to: '/',
    class: "hidden",
    // class: navProps(navLabels[0]!).navClass,
    active: route.path === '/',
    children: []
  },
  {
    label: navProps(navLabels[1]!).navLabel,
    icon: 'i-fluent-people-community-20-regular',
    avatar: {
      icon: 'i-fluent-people-community-20-regular'
    },
    // to: '/' + navLabels[3],
    class: navProps(navLabels[1]!).navClass,
    active: route.path.includes(navLabels[1]!),
    children: [
      {
        label: 'About Us',
        to: '/about'
      },
      {
        label: 'Community',
        to: '/community'
      },
      {
        label: 'Technical Unit',
        to: '/community#technical-unit'
      },
      {
        label: 'Ushering Unit',
        to: '/community#ushering-unit'
      },
      {
        label: 'Choir Unit',
        to: '/community#choir-unit'
      },
      {
        label: 'Media & Publicity',
        to: '/community#media-unit'
      },
      // {
      //   label: 'Faith & Fire',
      // },
    ]
    
  },
  {
    label: navProps(navLabels[2]!).navLabel,
    icon: 'i-fluent-headphones-sound-wave-20-filled',
    avatar: {
      icon: 'i-fluent-headphones-sound-wave-20-filled'
    },
    to: '/' + navLabels[2] + "-list",
    class: navProps(navLabels[2]!).navClass,
    active: route.path.includes(navLabels[2]!),
    children: []
  },
  {
    label: navProps(navLabels[3]!).navLabel,
    icon: 'i-fluent-handshake-20-regular',
    avatar: {
      icon: 'i-fluent-handshake-20-regular'
    },
    to: '/#' + navLabels[3],
    class: navProps(navLabels[3]!).navClass,
    active: route.path.includes(navLabels[3]!),
    // target: '_blank'
  },
  {
    label: navProps(navLabels[4]!).navLabel,
    icon: 'i-fluent-calendar-20-regular',
    avatar: {
      icon: 'i-fluent-calendar-20-regular'
    },
    // to: '/' + navLabels[3],
    class: navProps(navLabels[4]!).navClass,
    active: route.path.includes(navLabels[4]!),
    children: [
      {
        label: 'Supernatural School',
        to: '/events#supernatural-school'
      },
      {
        label: 'Rise',
        to: '/events#rise'
      },
      // {
      //   label: 'Faith & Fire',
      // },
    ]
    
  },
  
  // {
  //   label: navProps(navLabels[4]!).navLabel,
  //   to: '/components',
  //   icon: 'i-fluent-mail-multiple-20-regular',
  //   avatar: {
  //     icon: 'i-fluent-mail-multiple-20-regular'
  //   },
  //   class: navProps(navLabels[4]!).navClass,
  // }
].map(navItem => {
  if (colorMode.value === 'light') {
    const { icon, ...newNavItem } = navItem;
    return newNavItem
  }
  else {
    const { avatar, ...newNavItem } = navItem;
    return newNavItem
  }
}))

</script>

<template>
  <!-- <div class="pt-4 sm:py-4"> -->
    <!-- <div class="flex">
    </div> -->
    <div class="pt-4 pointer-events-none">
      <ULink class="absolute top-0 left-0 sm:left-5 bg-transparent pointer-events-auto"
          to="/" aria-label="Home">
        <NuxtImg src="/images/exodus-missions-logo-icon.png" height="70px" />
      </ULink>
      <UContainer class="col-span-10 rounded-full border-solid border-secondary border-1
                          transition delay-150 duration-300 ease-in-out hover:-translate-y-1
                           max-w-fit backdrop-blur-lg pointer-events-auto"
                          :class="`${hoverStyle} ${backgroundColor}`">
        <UNavigationMenu :items="navItems" variant="pill" color="secondary"
          highlight class="flex justify-center-safe" />
      </UContainer>

    </div>
</template>
