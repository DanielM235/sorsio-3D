<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSelectorCompact from '@/components/ui/LanguageSelectorCompact.vue';
import TarotGallery from '@/components/three/TarotGallery.vue';
import type { CardInfo } from '@/data/cards';

const { t } = useI18n();

const selectedCard = ref<CardInfo | null>(null);
const showHint = ref(true);

function onCardSelected(card: CardInfo | null): void {
  selectedCard.value = card;
  if (card) {
    showHint.value = false;
  }
}

// Hide hint after a few seconds
setTimeout(() => {
  showHint.value = false;
}, 5000);
</script>

<template>
  <div class="home-container">
    <!-- 3D Gallery takes full screen -->
    <TarotGallery @card-selected="onCardSelected" />

    <!-- Overlay UI -->
    <div class="overlay-ui">
      <!-- Top right: Language selector -->
      <div class="corner-top-right">
        <LanguageSelectorCompact />
      </div>

      <!-- Bottom center: Title and hint -->
      <div class="bottom-center">
        <Transition name="fade">
          <div v-if="!selectedCard" class="title-area">
            <h1 class="app-title">{{ t('app.title') }}</h1>
            <Transition name="fade">
              <p v-if="showHint" class="hint">{{ t('app.description') }}</p>
            </Transition>
          </div>
        </Transition>

        <!-- Selected card info -->
        <Transition name="slide-up">
          <div v-if="selectedCard" class="card-info">
            <span class="card-category">{{ selectedCard.category }}</span>
            <span class="card-number">#{{ selectedCard.number }}</span>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: $color-bg-dark;
}

.overlay-ui {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: $z-index-fixed;

  > * {
    pointer-events: auto;
  }
}

.corner-top-right {
  position: absolute;
  top: $spacing-4;
  right: $spacing-4;
}

.bottom-center {
  position: absolute;
  bottom: $spacing-8;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.title-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-2;
}

.app-title {
  font-family: $font-family-heading;
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin: 0;
  background: $gradient-primary-horizontal;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 40px rgba($color-primary, 0.3);
  letter-spacing: $letter-spacing-wider;
}

.hint {
  font-size: $font-size-sm;
  color: $color-text-muted;
  margin: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.card-info {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-3 $spacing-6;
  background: rgba($color-bg-dark, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid $color-card-border;
  border-radius: $radius-lg;
}

.card-category {
  font-size: $font-size-sm;
  color: $color-primary;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-widest;
  font-weight: $font-weight-semibold;
}

.card-number {
  font-size: $font-size-lg;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
