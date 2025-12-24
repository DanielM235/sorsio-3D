<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import gsap from 'gsap';
import CardFilterMenu from '@/components/ui/CardFilterMenu.vue';
import TarotGallery from '@/components/three/TarotGallery.vue';
import type { CardInfo } from '@/data/cards';
import { getCardDetailsFromInfo, type CardDetails } from '@/data/cardDetails';

const { t } = useI18n();

const selectedCard = ref<CardInfo | null>(null);
const cardFilter = ref<'all' | 'major'>('major');
const showDetails = ref(true);
const isAnimating = ref(false);
const detailsPanelRef = ref<HTMLElement | null>(null);
const panelToggleRef = ref<HTMLElement | null>(null);

const cardDetails = computed<CardDetails | null>(() => {
  if (!selectedCard.value) return null;
  return getCardDetailsFromInfo(selectedCard.value);
});

function onCardSelected(card: CardInfo | null): void {
  selectedCard.value = card;
  // Reset showDetails when a new card is selected
  if (card) {
    showDetails.value = true;
  }
}

function toggleDetails(): void {
  if (isAnimating.value) return;
  isAnimating.value = true;

  const isMobile = window.innerWidth <= 768;
  const panel = detailsPanelRef.value;
  const toggle = panelToggleRef.value;

  if (!panel) {
    showDetails.value = !showDetails.value;
    isAnimating.value = false;
    return;
  }

  if (showDetails.value) {
    // ===== CLOSING ANIMATION =====
    const tl = gsap.timeline({
      onComplete: () => {
        showDetails.value = false;
        isAnimating.value = false;
      },
    });

    // Animate toggle button - flip and glow
    if (toggle) {
      tl.to(
        toggle,
        {
          rotateY: 180,
          scale: 1.1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        0
      );
      tl.to(
        toggle.querySelector('.toggle-glow'),
        {
          opacity: 1,
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      );
      tl.to(
        toggle.querySelector('.toggle-glow'),
        {
          opacity: 0,
          scale: 1,
          duration: 0.3,
        },
        0.3
      );
    }

    // Panel closing - dramatic slide with rotation
    tl.to(
      panel,
      {
        x: isMobile ? 0 : '105%',
        y: isMobile ? '105%' : 0,
        rotateY: isMobile ? 0 : -15,
        rotateX: isMobile ? 15 : 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power4.in',
      },
      0.1
    );

    // Content fades and scales with blur effect
    tl.to(
      panel.querySelector('.card-details-content'),
      {
        scale: 0.85,
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power3.in',
      },
      0
    );

    // Stagger animate meaning cards
    tl.to(
      panel.querySelectorAll('.meaning-card'),
      {
        x: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
      },
      0
    );
  } else {
    // ===== OPENING ANIMATION =====
    showDetails.value = true;

    nextTick(() => {
      const newPanel = detailsPanelRef.value;
      const newToggle = panelToggleRef.value;
      if (!newPanel) {
        isAnimating.value = false;
        return;
      }

      // Set initial states
      gsap.set(newPanel, {
        x: isMobile ? 0 : '100%',
        y: isMobile ? '100%' : 0,
        rotateY: isMobile ? 0 : -20,
        rotateX: isMobile ? 20 : 0,
        opacity: 0,
        transformPerspective: 1000,
      });
      gsap.set(newPanel.querySelector('.card-details-content'), {
        scale: 0.9,
        opacity: 0,
        y: 30,
      });
      gsap.set(newPanel.querySelectorAll('.meaning-card'), {
        x: 80,
        opacity: 0,
      });
      gsap.set(newPanel.querySelector('.card-header'), {
        y: -20,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.value = false;
        },
      });

      // Animate toggle button - flip back with glow burst
      if (newToggle) {
        tl.to(
          newToggle,
          {
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          0
        );
        tl.fromTo(
          newToggle.querySelector('.toggle-glow'),
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 2, duration: 0.2, ease: 'power2.out' },
          0
        );
        tl.to(
          newToggle.querySelector('.toggle-glow'),
          {
            opacity: 0,
            scale: 1,
            duration: 0.4,
          },
          0.2
        );
      }

      // Panel sweeps in with 3D rotation
      tl.to(
        newPanel,
        {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        0.1
      );

      // Content rises up with elastic bounce
      tl.to(
        newPanel.querySelector('.card-details-content'),
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.4)',
        },
        0.25
      );

      // Header drops in
      tl.to(
        newPanel.querySelector('.card-header'),
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.3
      );

      // Meaning cards cascade in
      tl.to(
        newPanel.querySelectorAll('.meaning-card'),
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.2)',
        },
        0.4
      );
    });
  }
}

// Animate panel entrance when card is selected
watch(
  () => selectedCard.value,
  (newCard, oldCard) => {
    if (newCard && !oldCard) {
      nextTick(() => {
        const panel = detailsPanelRef.value;
        if (!panel) return;

        const isMobile = window.innerWidth <= 768;

        gsap.fromTo(
          panel,
          {
            x: isMobile ? 0 : '100%',
            y: isMobile ? '100%' : 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          }
        );

        gsap.fromTo(
          panel.querySelector('.card-details-content'),
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, delay: 0.2, ease: 'back.out(1.5)' }
        );
      });
    }
  }
);
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

      <!-- Panel toggle button (separate from panel for z-index) -->
      <button
        v-if="selectedCard && cardDetails && showDetails"
        ref="panelToggleRef"
        class="panel-toggle-btn"
        :title="t('cardDetails.hide')"
        @click="toggleDetails"
      >
        <span class="toggle-glow"></span>
        <span class="toggle-ornament top"></span>
        <span class="toggle-symbol">☽</span>
        <span class="toggle-ornament bottom"></span>
      </button>

      <!-- Card details panel (right side) -->
      <div
        v-if="selectedCard && cardDetails && showDetails"
        ref="detailsPanelRef"
        class="card-details-panel"
      >
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

      <!-- Show details button (when panel is hidden) -->
      <button
        v-if="selectedCard && cardDetails && !showDetails"
        ref="panelToggleRef"
        class="panel-toggle-btn is-closed"
        :title="t('cardDetails.show')"
        @click="toggleDetails"
      >
        <span class="toggle-glow"></span>
        <span class="toggle-ornament top"></span>
        <span class="toggle-symbol">☾</span>
        <span class="toggle-ornament bottom"></span>
      </button>
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

// Mystical panel toggle button
.panel-toggle-btn {
  position: absolute;
  right: 380px; // Positioned at the left edge of the panel
  top: 50%;
  transform: translateY(-50%) translateX(50%);
  width: 48px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-1;
  background: linear-gradient(
    180deg,
    rgba($color-bg-dark, 0.98) 0%,
    rgba(#1a1a2e, 0.95) 50%,
    rgba($color-bg-dark, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  border-image: linear-gradient(
      180deg,
      rgba($color-primary, 0.2) 0%,
      rgba($color-primary, 0.8) 50%,
      rgba($color-primary, 0.2) 100%
    )
    1;
  border-radius: $radius-lg 0 0 $radius-lg;
  color: $color-primary;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    -8px 0 30px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba($color-primary, 0.1);
  z-index: $z-index-modal;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  // Glowing background effect
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba($color-primary, 0.3) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  // Animated border glow
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent 0%, $color-primary 50%, transparent 100%);
    animation: border-pulse 2s ease-in-out infinite;
  }

  &:hover {
    background: linear-gradient(
      180deg,
      rgba($color-primary, 0.15) 0%,
      rgba($color-primary, 0.25) 50%,
      rgba($color-primary, 0.15) 100%
    );
    box-shadow:
      -12px 0 40px rgba(0, 0, 0, 0.6),
      inset 0 0 30px rgba($color-primary, 0.2),
      0 0 20px rgba($color-primary, 0.3);

    &::before {
      opacity: 1;
    }

    .toggle-symbol {
      text-shadow:
        0 0 10px $color-primary,
        0 0 20px $color-primary,
        0 0 30px rgba($color-primary, 0.5);
      transform: scale(1.1);
    }

    .toggle-ornament {
      opacity: 1;
      transform: scaleX(1.2);
    }
  }

  &:active {
    transform: translateY(-50%) translateX(50%) scale(0.95);
  }

  // Closed state - on the right edge
  &.is-closed {
    right: $spacing-4;
    transform: translateY(-50%);
    border-radius: $radius-lg;
    animation: float-mystical 3s ease-in-out infinite;

    &::after {
      left: auto;
      right: 0;
    }
  }

  // Glow burst element for animations
  .toggle-glow {
    position: absolute;
    width: 80px;
    height: 80px;
    background: radial-gradient(
      circle,
      rgba($color-primary, 0.8) 0%,
      rgba($color-primary, 0.4) 30%,
      transparent 70%
    );
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    z-index: -1;
  }

  // Moon/sun symbol
  .toggle-symbol {
    font-size: 24px;
    line-height: 1;
    transition: all 0.4s ease;
    text-shadow: 0 0 10px rgba($color-primary, 0.5);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  // Decorative ornaments
  .toggle-ornament {
    width: 20px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, $color-primary 50%, transparent 100%);
    opacity: 0.6;
    transition: all 0.3s ease;

    &.top {
      margin-bottom: $spacing-1;
    }

    &.bottom {
      margin-top: $spacing-1;
    }
  }
}

@keyframes border-pulse {
  0%,
  100% {
    opacity: 0.5;
    height: 100%;
  }
  50% {
    opacity: 1;
    height: 60%;
    top: 20%;
  }
}

@keyframes float-mystical {
  0%,
  100% {
    transform: translateY(-50%);
    box-shadow:
      0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 20px rgba($color-primary, 0.1),
      0 0 15px rgba($color-primary, 0.2);
  }
  50% {
    transform: translateY(-52%);
    box-shadow:
      0 5px 40px rgba(0, 0, 0, 0.6),
      inset 0 0 25px rgba($color-primary, 0.15),
      0 0 25px rgba($color-primary, 0.4);
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

  // Move toggle button to bottom center on mobile
  .panel-toggle-btn {
    right: auto;
    left: 50%;
    top: auto;
    bottom: 50vh; // Just above the panel
    transform: translateX(-50%) translateY(50%);
    width: 80px;
    height: 40px;
    flex-direction: row;
    border-radius: $radius-lg $radius-lg 0 0;
    border-image: linear-gradient(
        90deg,
        rgba($color-primary, 0.2) 0%,
        rgba($color-primary, 0.8) 50%,
        rgba($color-primary, 0.2) 100%
      )
      1;
    box-shadow:
      0 -4px 20px rgba(0, 0, 0, 0.4),
      inset 0 0 15px rgba($color-primary, 0.1);
    // No cycling animation on mobile
    animation: none;

    &::after {
      left: 0;
      top: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, $color-primary 50%, transparent 100%);
      // No border pulse animation on mobile
      animation: none;
    }

    .toggle-ornament {
      width: 2px;
      height: 16px;
      background: linear-gradient(180deg, transparent 0%, $color-primary 50%, transparent 100%);

      &.top {
        margin-bottom: 0;
        margin-right: $spacing-2;
      }

      &.bottom {
        margin-top: 0;
        margin-left: $spacing-2;
      }
    }

    // Closed state - bottom of screen with minimal margin
    &.is-closed {
      right: auto;
      left: 50%;
      top: auto;
      bottom: $spacing-2; // Minimal margin from bottom
      transform: translateX(-50%);
      border-radius: $radius-lg;
      // No floating animation on mobile
      animation: none;

      &::after {
        top: auto;
        bottom: 0;
        animation: none;
      }
    }

    &:active {
      transform: translateX(-50%) translateY(50%) scale(0.95);
    }

    &.is-closed:active {
      transform: translateX(-50%) scale(0.95);
    }
  }
}
</style>
