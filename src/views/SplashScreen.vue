<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import gsap from 'gsap';

const router = useRouter();
const { t } = useI18n();

const containerRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const enterButtonRef = ref<HTMLElement | null>(null);

const isReady = ref(false);
let timeline: gsap.core.Timeline | null = null;

// Generate floating stars/particles
const stars = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 3,
}));

// Generate tarot card elements for the animation
const tarotCards = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  rotation: (i - 3) * 15,
  delay: i * 0.1,
}));

function navigateToHome(): void {
  if (!isReady.value) return;

  // Exit animation
  const exitTimeline = gsap.timeline({
    onComplete: () => {
      router.push('/home');
    },
  });

  exitTimeline
    .to('.tarot-card', {
      y: -window.innerHeight,
      rotation: '+=360',
      stagger: 0.05,
      duration: 0.8,
      ease: 'power2.in',
    })
    .to(
      [titleRef.value, subtitleRef.value, enterButtonRef.value],
      {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.in',
      },
      '-=0.6'
    )
    .to(
      containerRef.value,
      {
        opacity: 0,
        duration: 0.3,
      },
      '-=0.2'
    );
}

onMounted(() => {
  timeline = gsap.timeline();

  // Initial state
  gsap.set([titleRef.value, subtitleRef.value, enterButtonRef.value], {
    opacity: 0,
    y: 50,
  });
  gsap.set('.tarot-card', {
    opacity: 0,
    y: 100,
    rotation: -180,
    scale: 0,
  });
  gsap.set('.star', {
    opacity: 0,
    scale: 0,
  });

  // Animation sequence
  timeline
    // Stars twinkle in
    .to('.star', {
      opacity: (_i) => 0.3 + Math.random() * 0.7,
      scale: 1,
      duration: 0.5,
      stagger: {
        each: 0.02,
        from: 'random',
      },
      ease: 'power2.out',
    })
    // Cards fan out from center
    .to(
      '.tarot-card',
      {
        opacity: 1,
        y: 0,
        rotation: (i) => (i - 3) * 15,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
      },
      '-=0.3'
    )
    // Title reveals with golden glow
    .to(
      titleRef.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    // Subtitle fades in
    .to(
      subtitleRef.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    )
    // Enter button appears with pulse
    .to(
      enterButtonRef.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: () => {
          isReady.value = true;
          // Add floating animation to cards
          gsap.to('.tarot-card', {
            y: '-=10',
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.2,
          });
          // Pulse animation on button
          gsap.to(enterButtonRef.value, {
            boxShadow: '0 0 30px rgba(201, 162, 39, 0.6)',
            duration: 1,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        },
      },
      '-=0.2'
    );

  // Continuous star twinkling
  gsap.to('.star', {
    opacity: 'random(0.2, 1)',
    duration: 'random(1, 3)',
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
      each: 0.1,
      from: 'random',
    },
  });
});

onUnmounted(() => {
  timeline?.kill();
  gsap.killTweensOf('.tarot-card');
  gsap.killTweensOf('.star');
  gsap.killTweensOf(enterButtonRef.value);
});
</script>

<template>
  <div ref="containerRef" class="splash-container">
    <!-- Animated stars background -->
    <div ref="starsRef" class="stars-container">
      <div
        v-for="star in stars"
        :key="star.id"
        class="star"
        :style="{
          left: star.left,
          top: star.top,
          width: `${star.size}px`,
          height: `${star.size}px`,
        }"
      />
    </div>

    <!-- Mystical circle backdrop -->
    <div class="mystic-circle" />

    <!-- Tarot cards animation -->
    <div ref="cardsRef" class="cards-container">
      <div
        v-for="card in tarotCards"
        :key="card.id"
        class="tarot-card"
        :style="{ '--rotation': `${card.rotation}deg` }"
      >
        <div class="card-inner">
          <div class="card-pattern" />
          <div class="card-symbol">★</div>
        </div>
      </div>
    </div>

    <!-- Title and content -->
    <div class="content">
      <h1 ref="titleRef" class="title">{{ t('app.title') }}</h1>
      <p ref="subtitleRef" class="subtitle">{{ t('app.description') }}</p>
      <button
        ref="enterButtonRef"
        class="enter-button"
        :disabled="!isReady"
        @click="navigateToHome"
      >
        <span class="button-text">{{ t('navigation.home') }}</span>
        <span class="button-arrow">→</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.splash-container {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $gradient-background;
  overflow: hidden;
}

.stars-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  background: $color-primary-light;
  border-radius: $radius-full;
  box-shadow: 0 0 6px $color-primary-light;
}

.mystic-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border: 2px solid rgba($color-primary, 0.2);
  border-radius: $radius-full;
  animation: rotate 60s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 20px;
    border: 1px solid rgba($color-primary, 0.15);
    border-radius: $radius-full;
  }

  &::after {
    inset: 50px;
    border-style: dashed;
    animation: rotate-reverse 30s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.cards-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tarot-card {
  position: absolute;
  width: 80px;
  height: 130px;
  transform-origin: center 200%;
  transform: rotate(var(--rotation));

  .card-inner {
    width: 100%;
    height: 100%;
    background: $gradient-primary;
    border-radius: $radius-md;
    border: 2px solid $color-primary-dark;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $shadow-lg;
    position: relative;
    overflow: hidden;
  }

  .card-pattern {
    position: absolute;
    inset: 4px;
    border: 1px solid rgba($color-bg-dark, 0.3);
    border-radius: $radius-sm;

    &::before {
      content: '';
      position: absolute;
      inset: 4px;
      border: 1px solid rgba($color-bg-dark, 0.2);
      border-radius: 2px;
    }
  }

  .card-symbol {
    font-size: $font-size-2xl;
    color: $color-bg-dark;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    z-index: 1;
  }
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-top: $spacing-16;
}

.title {
  font-family: $font-family-heading;
  font-size: $font-size-5xl;
  font-weight: $font-weight-bold;
  background: $gradient-primary-horizontal;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  margin-bottom: $spacing-4;
  letter-spacing: $letter-spacing-wide;
}

.subtitle {
  font-size: $font-size-lg;
  color: $color-text-secondary;
  margin-bottom: $spacing-10;
  max-width: 400px;
}

.enter-button {
  display: inline-flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-4 $spacing-8;
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-bg-dark;
  background: $gradient-primary;
  border-radius: $radius-lg;
  cursor: pointer;
  transition:
    transform $transition-base,
    box-shadow $transition-base;
  box-shadow: $shadow-glow-primary;

  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px) scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button-arrow {
    transition: transform $transition-base;
  }

  &:hover .button-arrow {
    transform: translateX(4px);
  }
}
</style>
