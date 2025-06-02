<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import type { ButtonContent } from '~/types';

const colorMode = useColorMode();
const colorModeitems = computed<DropdownMenuItem[]>(() => [
  {
    label: 'System',
    icon: 'i-fluent-desktop-20-regular',
    type: 'checkbox' as const,
    checked: colorMode.preference === 'system',
    onUpdateChecked(checked: boolean) {
      colorMode.preference = 'system'
    }
  },
  {
    label: 'Light',
    icon: 'i-fluent-weather-sunny-20-filled',
    type: 'checkbox' as const,
    checked: colorMode.preference === 'light',
    onUpdateChecked(checked: boolean) {
      colorMode.preference = 'light'
    }
  },
  {
    label: 'Dark',
    icon: 'i-fluent-weather-moon-20-regular',
    type: 'checkbox' as const,
    checked: colorMode.preference === 'dark',
    onUpdateChecked(checked: boolean) {
      colorMode.preference = 'dark'
    }
  },
])
const currentColorMode = computed(() => colorModeitems.value.find(
  menuItem => menuItem.checked === true
));
// const textStyle = computed(() =>
//   colorMode.value === 'light' ? "text-2xl text-white" : "text-2xl text-white"
// );
const socialButtons: ButtonContent[] = [
  {
    label: "email",
    icon: "i-mdi-gmail",
    color: "neutral",
    link: "mailto:marchintogrowth@gmail.com"
  },
  {
    label: "phone",
    icon: "i-mdi-whatsapp",
    color: "primary",
    link: "https://wa.me/2348166785058"
  },
  {
    label: "instagram",
    icon: "i-mdi-instagram",
    color: "neutral",
    link: "https://www.instagram.com/exoduschurch_/#"
  },
  {
    label: "youtube",
    icon: "i-mdi-youtube",
    color: "error",
    link: "https://www.youtube.com/@ExodusMissions"
  },
  {
    label: "telegram",
    icon: "i-mdi-telegram",
    color: "info",
    link: "https://t.me/ExodusChurch"
  },
]
</script>
<template>
  <br />
  <footer class="bottom-0 w-full mb-2 px-2">
    <USeparator :label="`© ${new Date().getFullYear()} Exodus Church`" />
    <div class="grid grid-cols-3 max-w-full my-2">
      <div
        class="justify-self-start grid grid-cols-2 justify-items-center content-center divide-x-1 divide-muted max-w-30">
        <!-- <div>ok</div> -->
        <!-- <NuxtImg src="/images/light/exodus-missions-logo.png" class="h-5"/> -->
        <UButtonGroup>
          <UBadge :icon="currentColorMode?.icon" color="neutral" variant="outline" />
          <UDropdownMenu :items="colorModeitems">
            <UButton color="neutral" variant="outline" icon="i-fluent-chevron-down-20-regular" />
          </UDropdownMenu>
        </UButtonGroup>
      </div>
      <div class="justify-self-center text-white">Making disciples of all nations</div>
      <UButtonGroup orientation="horizontal" class="justify-self-end flex flex-wrap ">
        <UButton v-for="(socialButton, index) in socialButtons" :icon="socialButton.icon"
          :to="socialButton.link" variant="link" :color="socialButton.color"
          target="_blank" class="text-white"
          :class='(index === socialButtons.length-1 ? "hidden sm:block": "block")' />
      </UButtonGroup>
    </div>
  </footer>
</template>
