<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const isOpen = ref(false);

function toggleMenu(): void {
  isOpen.value = !isOpen.value;
}

function closeMenu(): void {
  isOpen.value = false;
}

function navigateHome(): void {
  closeMenu();
  router.push({ name: 'menu' });
}

// Check if we're already on home
const isOnHome = () => route.name === 'menu';
</script>

<template>
  <div class="burger-menu" @click.stop>
    <button
      class="burger-toggle"
      :class="{ active: isOpen }"
      :aria-label="t('navigation.menu')"
      @click="toggleMenu"
    >
      <span class="burger-line" />
      <span class="burger-line" />
      <span class="burger-line" />
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="burger-dropdown">
        <button
          class="menu-option"
          :class="{ disabled: isOnHome() }"
          :disabled="isOnHome()"
          @click="navigateHome"
        >
          <span class="menu-icon">🏠</span>
          <span class="menu-label">{{ t('navigation.home') }}</span>
        </button>
      </div>
    </Transition>

    <!-- Backdrop to close menu -->
    <Transition name="fade">
      <div v-if="isOpen" class="burger-backdrop" @click="closeMenu" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.burger-menu {
  position: relative;
  z-index: $z-index-dropdown;
}

.burger-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  border-radius: $radius-full;
  background: rgba($color-bg-dark, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid $color-card-border;
  cursor: pointer;
  transition: all $transition-base;
  padding: $spacing-2;

  &:hover,
  &.active {
    background: rgba($color-bg-dark, 0.95);
    border-color: $color-primary;
    box-shadow: $shadow-glow-primary;

    .burger-line {
      background: $color-primary;
    }
  }

  // Animated burger lines
  .burger-line {
    width: 20px;
    height: 2px;
    background: $color-text-primary;
    border-radius: $radius-full;
    transition: all 0.3s ease;
  }

  // Transform to X when active
  &.active {
    .burger-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .burger-line:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }

    .burger-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
}

.burger-dropdown {
  position: absolute;
  top: calc(100% + #{$spacing-2});
  left: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-1;
  padding: $spacing-2;
  background: rgba($color-bg-dark, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid $color-card-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
  min-width: 160px;
}

.menu-option {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-3 $spacing-4;
  border-radius: $radius-md;
  background: transparent;
  border: none;
  color: $color-text-primary;
  cursor: pointer;
  transition: all $transition-base;
  text-align: left;
  width: 100%;

  &:hover:not(.disabled) {
    background: rgba($color-primary, 0.2);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-icon {
    font-size: $font-size-lg;
  }

  .menu-label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
  }
}

.burger-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

// Dropdown animation
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

// Fade animation for backdrop
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
