<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/locales';

const { locale } = useI18n();
const isOpen = ref(false);

const localeFlags: Record<SupportedLocale, string> = {
  en: '🇬🇧',
  'pt-BR': '🇧🇷',
  fr: '🇫🇷',
};

function changeLocale(newLocale: SupportedLocale): void {
  locale.value = newLocale;
  isOpen.value = false;
}

function toggleMenu(): void {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (!target.closest('.language-compact')) {
    isOpen.value = false;
  }
}
</script>

<template>
  <div class="language-compact" @click.stop>
    <button class="language-toggle" :class="{ active: isOpen }" @click="toggleMenu">
      <span class="flag">{{ localeFlags[locale as SupportedLocale] }}</span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" v-click-outside="handleClickOutside" class="language-dropdown">
        <button
          v-for="loc in SUPPORTED_LOCALES"
          :key="loc"
          class="language-option"
          :class="{ selected: locale === loc }"
          @click="changeLocale(loc)"
        >
          <span class="flag">{{ localeFlags[loc] }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.language-compact {
  position: relative;
  z-index: $z-index-dropdown;
}

.language-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: $radius-full;
  background: rgba($color-bg-dark, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid $color-card-border;
  cursor: pointer;
  transition: all $transition-base;

  &:hover,
  &.active {
    background: rgba($color-bg-dark, 0.95);
    border-color: $color-primary;
    box-shadow: $shadow-glow-primary;
  }

  .flag {
    font-size: $font-size-xl;
  }
}

.language-dropdown {
  position: absolute;
  top: calc(100% + #{$spacing-2});
  right: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-1;
  padding: $spacing-2;
  background: rgba($color-bg-dark, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid $color-card-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
}

.language-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  background: transparent;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    background: rgba($color-primary, 0.2);
  }

  &.selected {
    background: rgba($color-primary, 0.3);
    box-shadow: inset 0 0 0 1px $color-primary;
  }

  .flag {
    font-size: $font-size-lg;
  }
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
</style>
