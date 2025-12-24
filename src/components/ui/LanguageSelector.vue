<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/locales';

const { t, locale } = useI18n();

function changeLocale(newLocale: SupportedLocale): void {
  locale.value = newLocale;
}
</script>

<template>
  <div class="language-selector">
    <label for="language-select" class="language-label"> {{ t('language.select') }}: </label>
    <select
      id="language-select"
      :value="locale"
      class="language-select"
      @change="changeLocale(($event.target as HTMLSelectElement).value as SupportedLocale)"
    >
      <option v-for="loc in SUPPORTED_LOCALES" :key="loc" :value="loc">
        {{ t(`language.${loc}`) }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.language-selector {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  justify-content: center;
}

.language-label {
  font-size: $font-size-sm;
  color: $color-text-secondary;
}

.language-select {
  padding: $spacing-2 $spacing-4;
  font-size: $font-size-sm;
  border-radius: $radius-md;
  border: 1px solid $color-card-border;
  background-color: $color-card-bg;
  color: $color-text-primary;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    border-color: $color-primary;
    background-color: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 2px rgba($color-primary, 0.3);
  }

  option {
    background-color: $color-bg-dark;
    color: $color-text-primary;
  }
}
</style>
