<template>
  <ClientOnly fallbackTag="span">
    <!-- this component will only be rendered on client side -->
    <layoutBackground />
    <template #fallback>
      <LayoutLoading />
    </template>
  </ClientOnly>

  <ClientOnly fallbackTag="span">
    <layoutHeader class="sticky top-0 z-2"/>
  </ClientOnly>
  
  <section id="main-body">
    <slot ></slot>
  </section>

  <ClientOnly fallbackTag="span">
    <layoutFooter />
  </ClientOnly>
</template>