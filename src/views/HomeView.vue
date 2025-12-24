<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CardFilterMenu from '@/components/ui/CardFilterMenu.vue';
import TarotGallery from '@/components/three/TarotGallery.vue';
import type { CardInfo } from '@/data/cards';
import { getCardDetailsFromInfo, type CardDetails } from '@/data/cardDetails';

const { t } = useI18n();

const selectedCard = ref<CardInfo | null>(null);
const cardFilter = ref<'all' | 'major'>('major');

const cardDetails = computed<CardDetails | null>(() => {
  if (!selectedCard.value) return null;
  return getCardDetailsFromInfo(selectedCard.value);
});

function onCardSelected(card: CardInfo | null): void {
  selectedCard.value = card;
}
</script>

<template>
  <div class="home-container">
    <!-- 3D Gallery takes full screen -->
    <TarotGallery :filter="cardFilter" @card-selected="onCardSelected" />

    <!-- Overlay UI -->
    <div class="overlay-ui">
      <!-- Top left: Card filter menu -->
      <div class="corner-top-left">
        <CardFilterMenu v-model="cardFilter" />
      </div>

      <!-- Card details panel (right side) -->
      <Transition name="slide-left">
        <div v-if="selectedCard && cardDetails" class="card-details-panel">
          <div class="card-details-content">
            <!-- Card header -->
            <div class="card-header">
              <span class="card-category-badge">{{ selectedCard.category }}</span>
              <h2 class="card-name">{{ t(cardDetails.name) }}</h2>
            </div>

            <!-- Divider -->
            <div class="divider" />

            <!-- Description -->
            <div class="card-section">
              <h3 class="section-title">
                <span class="section-icon">📜</span>
                {{ t('cardDetails.description') }}
              </h3>
              <p class="section-text">{{ t(cardDetails.description) }}</p>
            </div>

            <!-- Meanings -->
            <div class="meanings-container">
              <!-- Upright meaning -->
              <div class="meaning-card meaning-upright">
                <div class="meaning-header">
                  <span class="meaning-icon">☀️</span>
                  <h4 class="meaning-title">{{ t('cardDetails.upright') }}</h4>
                </div>
                <p class="meaning-text">{{ t(cardDetails.meaningUp) }}</p>
              </div>

              <!-- Reversed meaning -->
              <div class="meaning-card meaning-reversed">
                <div class="meaning-header">
                  <span class="meaning-icon">🌙</span>
                  <h4 class="meaning-title">{{ t('cardDetails.reversed') }}</h4>
                </div>
                <p class="meaning-text">{{ t(cardDetails.meaningReversed) }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
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

.corner-top-left {
  position: absolute;
  top: $spacing-4;
  left: $spacing-4;
}

// Card Details Panel
.card-details-panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 380px;
  max-width: 90vw;
  background: linear-gradient(
    135deg,
    rgba($color-bg-dark, 0.95) 0%,
    rgba($color-bg-medium, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba($color-primary, 0.3);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba($color-primary, 0.3) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($color-primary, 0.3);
    border-radius: 3px;
  }
}

.card-details-content {
  padding: $spacing-8 $spacing-6;
  display: flex;
  flex-direction: column;
  gap: $spacing-6;
}

.card-header {
  text-align: center;
}

.card-category-badge {
  display: inline-block;
  padding: $spacing-1 $spacing-4;
  background: linear-gradient(
    135deg,
    rgba($color-primary, 0.2) 0%,
    rgba($color-secondary, 0.2) 100%
  );
  border: 1px solid rgba($color-primary, 0.4);
  border-radius: $radius-full;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-widest;
  color: $color-primary;
  margin-bottom: $spacing-3;
}

.card-name {
  font-family: $font-family-heading;
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  margin: 0;
  background: $gradient-primary-horizontal;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba($color-primary, 0.5) 50%,
    transparent 100%
  );
}

.card-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
}

.section-title {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-secondary;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-wider;
  margin: 0;
}

.section-icon {
  font-size: $font-size-base;
}

.section-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  line-height: 1.7;
  margin: 0;
  text-align: justify;
}

.meanings-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
}

.meaning-card {
  padding: $spacing-4;
  border-radius: $radius-lg;
  border: 1px solid;
}

.meaning-upright {
  background: linear-gradient(
    135deg,
    rgba($color-primary, 0.1) 0%,
    rgba($color-primary, 0.05) 100%
  );
  border-color: rgba($color-primary, 0.3);
}

.meaning-reversed {
  background: linear-gradient(
    135deg,
    rgba($color-secondary, 0.1) 0%,
    rgba($color-secondary, 0.05) 100%
  );
  border-color: rgba($color-secondary, 0.3);
}

.meaning-header {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  margin-bottom: $spacing-2;
}

.meaning-icon {
  font-size: $font-size-lg;
}

.meaning-title {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-secondary;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-wide;
}

.meaning-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  line-height: 1.6;
  margin: 0;
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

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// Responsive
@media (max-width: 768px) {
  .card-details-panel {
    width: 100%;
    max-width: 100%;
    top: auto;
    bottom: 0;
    height: 50vh;
    border-left: none;
    border-top: 1px solid rgba($color-primary, 0.3);
    border-radius: $radius-xl $radius-xl 0 0;
  }

  .slide-left-enter-from,
  .slide-left-leave-to {
    transform: translateY(100%);
  }
}
</style>
