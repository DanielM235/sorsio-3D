<script setup lang="ts">
import { RouterView } from 'vue-router';
import LanguageSelectorCompact from '@/components/ui/LanguageSelectorCompact.vue';
import BurgerMenu from '@/components/ui/BurgerMenu.vue';
</script>

<template>
  <div class="app-wrapper">
    <RouterView />

    <!-- Global navigation controls - always visible -->
    <div class="global-nav-left">
      <BurgerMenu />
    </div>

    <div class="global-nav-right">
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

.global-nav-left {
  position: fixed;
  top: $spacing-4;
  left: $spacing-4;
  z-index: $z-index-fixed;
}

.global-nav-right {
  position: fixed;
  top: $spacing-4;
  right: $spacing-4;
  z-index: $z-index-fixed;
}
</style>
