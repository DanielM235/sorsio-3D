<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { MENU_ITEMS } from '@/constants/menuItems';
import { generateParticles, generateDecorativeCards } from '@/constants/animationConfig';
import { useMenuAnimation } from '@/composables/useMenuAnimation';

const { t } = useI18n();

// Container ref for exit animation
const containerRef = ref<HTMLElement | null>(null);

// Generate background elements
const particles = generateParticles();
const decorativeCards = generateDecorativeCards();

// Use animation composable
const { isReady, navigateTo } = useMenuAnimation(particles, decorativeCards, containerRef);
</script>

<template>
  <div ref="containerRef" class="menu-container">
    <!-- Floating particles background -->
    <div class="particles-layer">
      <div
        v-for="particle in particles"
        :key="`particle-${particle.id}`"
        class="particle"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        }"
      />
    </div>

    <!-- Decorative floating tarot cards -->
    <div class="decorative-cards-layer">
      <div
        v-for="card in decorativeCards"
        :key="`deco-${card.id}`"
        class="decorative-card"
        :style="{
          left: `${card.x}%`,
          top: `${card.y}%`,
          '--rotation': `${card.rotation}deg`,
          '--scale': card.scale,
        }"
      >
        <div class="deco-card-inner">
          <div class="deco-card-pattern" />
          <span class="deco-card-symbol">✦</span>
        </div>
      </div>
    </div>

    <!-- Header section -->
    <header class="menu-header">
      <h1 class="app-title">{{ t('app.title') }}</h1>
      <p class="app-subtitle">{{ t('app.description') }}</p>
    </header>

    <!-- Menu cards grid -->
    <nav class="menu-grid">
      <button
        v-for="item in MENU_ITEMS"
        :key="item.id"
        class="menu-card"
        :disabled="!isReady"
        @click="navigateTo(item.route)"
      >
        <div class="card-glow" />
        <div class="card-content">
          <span class="card-icon">{{ item.icon }}</span>
          <div class="card-text">
            <h2 class="card-title">{{ t(item.titleKey) }}</h2>
            <p class="card-description">{{ t(item.descKey) }}</p>
          </div>
        </div>
        <div class="card-shine" />
      </button>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.menu-container {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $gradient-background;
  overflow: hidden;
  padding: $spacing-4;
  perspective: 1000px;
}

// Particles layer
.particles-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, $color-primary-light 0%, transparent 70%);
  border-radius: $radius-full;
  box-shadow: 0 0 8px $color-primary-light;
}

// Decorative cards layer
.decorative-cards-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.decorative-card {
  position: absolute;
  width: 50px;
  height: 78px;
  transform: translate(-50%, -50%) rotate(var(--rotation)) scale(var(--scale));
  transform-style: preserve-3d;

  @media (max-width: 600px) {
    width: 35px;
    height: 55px;
  }

  .deco-card-inner {
    width: 100%;
    height: 100%;
    background: $gradient-primary;
    border-radius: $radius-sm;
    border: 1px solid $color-primary-dark;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 4px 15px rgba(0, 0, 0, 0.3),
      0 0 20px rgba($color-primary, 0.15);
    position: relative;
    overflow: hidden;
  }

  .deco-card-pattern {
    position: absolute;
    inset: 3px;
    border: 1px solid rgba($color-bg-dark, 0.2);
    border-radius: 2px;
  }

  .deco-card-symbol {
    font-size: 1rem;
    color: $color-bg-dark;
    opacity: 0.7;
    z-index: 1;

    @media (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
}

// Header
.menu-header {
  text-align: center;
  margin-bottom: $spacing-8;
  z-index: 2;

  @media (max-width: 600px) {
    margin-bottom: $spacing-6;
  }
}

.app-title {
  font-family: $font-family-heading;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: $font-weight-bold;
  background: linear-gradient(135deg, #ffffff 0%, $color-primary-light 50%, $color-primary 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: $spacing-3;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5));
  letter-spacing: $letter-spacing-wide;
}

.app-subtitle {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: rgba(255, 255, 255, 0.6);
  max-width: 400px;
  line-height: 1.5;
}

// Menu grid
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-4;
  max-width: 600px;
  width: 100%;
  z-index: 2;
  padding: $spacing-2;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    max-width: 300px;
    gap: $spacing-3;
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 900px;
  }
}

// Menu card
.menu-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-5 $spacing-3;
  background: rgba($color-bg-dark, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba($color-primary, 0.25);
  border-radius: $radius-lg;
  cursor: pointer;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  transform-style: preserve-3d;
  min-height: 140px;
  overflow: hidden;

  @media (max-width: 500px) {
    padding: $spacing-4 $spacing-3;
    min-height: auto;
    flex-direction: row;
    justify-content: flex-start;
    gap: $spacing-3;
  }

  &:hover:not(:disabled) {
    transform: translateY(-6px) scale(1.03) rotateX(5deg);
    border-color: rgba($color-primary, 0.6);
    box-shadow:
      0 15px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba($color-primary, 0.2);

    .card-glow {
      opacity: 1;
    }

    .card-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .card-shine {
      transform: translateX(200%);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-2px) scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba($color-primary, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: skewX(-20deg);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;

  @media (max-width: 500px) {
    flex-direction: row;
    text-align: left;
    gap: $spacing-3;
    width: 100%;
  }
}

.card-icon {
  font-size: 2.2rem;
  margin-bottom: $spacing-2;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: 500px) {
    font-size: 1.8rem;
    margin-bottom: 0;
    flex-shrink: 0;
  }
}

.card-text {
  @media (max-width: 500px) {
    flex: 1;
  }
}

.card-title {
  font-family: $font-family-heading;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-primary-light;
  margin-bottom: $spacing-1;

  @media (max-width: 500px) {
    font-size: $font-size-sm;
  }

  @media (min-width: 800px) {
    font-size: $font-size-sm;
  }
}

.card-description {
  font-size: $font-size-xs;
  color: $color-text-muted;
  line-height: 1.4;

  @media (min-width: 800px) {
    font-size: 0.7rem;
  }
}
</style>
