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

</script>
<template>
  <div class="mt-6 pb-20">
    <Divider />
    <footer class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
      <Logo :size="8" />
      <span class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }}, <ULink to="https://dub.sh/hrcd">HugoRCD</ULink> - {{ $t("global.all_rights_reserved") }}.
      </span>
    </footer>
    <!-- <div class="p-4 grid grid-cols-12"></div> -->
    <UButtonGroup class="justify-self-end self-center">
      <UBadge :icon="currentColorMode?.icon" color="neutral" variant="outline"/>
      <UDropdownMenu :items="colorModeitems">
        <UButton
          color="neutral"
          variant="outline"
          icon="i-fluent-chevron-down-20-regular"
        />
      </UDropdownMenu>
    </UButtonGroup>
  </div>
</template>
