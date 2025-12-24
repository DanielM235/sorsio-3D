<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="simple-draw-container">
    <div class="placeholder-content">
      <h1 class="placeholder-title">{{ t('menu.simpleDraw') }}</h1>
      <p class="placeholder-description">{{ t('app.loading') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.simple-draw-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gradient-background;
}

.placeholder-content {
  text-align: center;
  padding: $spacing-8;
}

.placeholder-title {
  font-family: $font-family-heading;
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-primary-light;
  margin-bottom: $spacing-4;
}

.placeholder-description {
  font-size: $font-size-lg;
  color: $color-text-muted;
}
</style>
