<script setup lang="ts">
import { RouterView } from 'vue-router';
import LanguageSelectorCompact from '@/components/ui/LanguageSelectorCompact.vue';
</script>

<template>
  <div class="app-wrapper">
    <RouterView />

    <!-- Global language selector - always visible -->
    <div class="global-language-selector">
      <LanguageSelectorCompact />
    </div>
  </div>
</template>

<style lang="scss">
// Global styles are in main.scss
</style>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.global-language-selector {
  position: fixed;
  top: $spacing-4;
  right: $spacing-4;
  z-index: $z-index-fixed;
}
</style>
