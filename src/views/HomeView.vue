<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LanguageSelector from '@/components/ui/LanguageSelector.vue';
import TarotScene from '@/components/three/TarotScene.vue';

const { t } = useI18n();
</script>

<template>
  <div class="home-container">
    <header class="home-header">
      <h1 class="home-title">{{ t('app.title') }}</h1>
      <p class="home-description">{{ t('app.description') }}</p>
      <LanguageSelector />
    </header>

    <main class="home-main">
      <TarotScene />
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $gradient-background;
}

.home-header {
  padding: $spacing-8;
  text-align: center;
  border-bottom: 1px solid $color-card-border;
}

.home-title {
  font-family: $font-family-heading;
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin: 0 0 $spacing-2 0;
  background: $gradient-primary-horizontal;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-description {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin: 0 0 $spacing-4 0;
}

.home-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-8;
}
</style>
