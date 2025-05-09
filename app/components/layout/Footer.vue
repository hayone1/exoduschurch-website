<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

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
const textStyle = computed(() =>
  colorMode.value === 'light' ? "text-2xl text-black" : "text-2xl text-white"
);
</script>
<template>
  <footer class="bottom-0 w-full mb-2 px-2">
    <USeparator :label="`© ${new Date().getFullYear()} Exodus Church`" />
    <div class="grid grid-cols-3 max-w-full my-2">
      <div class="justify-self-start grid grid-cols-2 justify-items-center content-center divide-x-1 divide-muted max-w-30">
        <div>logo</div>
        <UButtonGroup>
          <UBadge :icon="currentColorMode?.icon" color="neutral" variant="outline" />
          <UDropdownMenu :items="colorModeitems">
            <UButton color="neutral" variant="outline" icon="i-fluent-chevron-down-20-regular" />
          </UDropdownMenu>
        </UButtonGroup>
      </div>
      <div class="justify-self-center">middle</div>
      <UButtonGroup orientation="horizontal" class="justify-self-end grid grid-cols-3">
        <UButton icon="i-mdi-instagram" variant="link" color="neutral" :class="textStyle" />
        <UButton icon="i-mdi-youtube" variant="link" color="error" :class="textStyle" />
        <UButton icon="i-mdi-telegram" variant="link" color="info" :class="textStyle" />
      </UButtonGroup>
    </div>
  </footer>
</template>
