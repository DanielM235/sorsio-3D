<script setup lang="ts">
import { ref } from 'vue';

export type CardFilter = 'all' | 'major';

const props = defineProps<{
  modelValue: CardFilter;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: CardFilter];
}>();

const isExpanded = ref(false);

const filters: { value: CardFilter; label: string; icon: string; count: number }[] = [
  { value: 'major', label: 'Major Arcana', icon: '✨', count: 22 },
  { value: 'all', label: 'Full Deck', icon: '🎴', count: 78 },
];

function selectFilter(filter: CardFilter): void {
  emit('update:modelValue', filter);
  isExpanded.value = false;
}

function toggleExpanded(): void {
  isExpanded.value = !isExpanded.value;
}

const currentFilter = () => filters.find((f) => f.value === props.modelValue);
</script>

<template>
  <div class="card-filter-menu" :class="{ expanded: isExpanded }">
    <!-- Toggle button -->
    <button class="filter-toggle" :title="currentFilter()?.label" @click="toggleExpanded">
      <span class="toggle-icon">{{ currentFilter()?.icon }}</span>
      <span class="toggle-label">{{ currentFilter()?.count }}</span>
      <span class="toggle-chevron" :class="{ rotated: isExpanded }">▼</span>
    </button>

    <!-- Dropdown options -->
    <Transition name="dropdown">
      <div v-if="isExpanded" class="filter-options">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="filter-option"
          :class="{ active: modelValue === filter.value }"
          @click="selectFilter(filter.value)"
        >
          <span class="option-icon">{{ filter.icon }}</span>
          <span class="option-content">
            <span class="option-label">{{ filter.label }}</span>
            <span class="option-count">{{ filter.count }} cards</span>
          </span>
          <span v-if="modelValue === filter.value" class="option-check">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.card-filter-menu {
  position: relative;
  z-index: $z-index-dropdown;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-3;
  background: rgba($color-bg-dark, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($color-primary, 0.3);
  border-radius: $radius-lg;
  color: $color-text-primary;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba($color-primary, 0.6);
    background: rgba($color-bg-medium, 0.95);
  }
}

.toggle-icon {
  font-size: $font-size-lg;
}

.toggle-label {
  font-weight: $font-weight-semibold;
  color: $color-primary;
}

.toggle-chevron {
  font-size: $font-size-xs;
  color: $color-text-muted;
  transition: transform 0.2s ease;

  &.rotated {
    transform: rotate(180deg);
  }
}

.filter-options {
  position: absolute;
  top: calc(100% + $spacing-2);
  left: 0;
  min-width: 200px;
  background: rgba($color-bg-dark, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba($color-primary, 0.3);
  border-radius: $radius-lg;
  box-shadow: $shadow-xl;
  overflow: hidden;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  width: 100%;
  padding: $spacing-3 $spacing-4;
  background: transparent;
  border: none;
  color: $color-text-primary;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba($color-primary, 0.1);
  }

  &.active {
    background: rgba($color-primary, 0.15);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba($color-primary, 0.1);
  }
}

.option-icon {
  font-size: $font-size-xl;
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
}

.option-count {
  font-size: $font-size-xs;
  color: $color-text-muted;
}

.option-check {
  color: $color-primary;
  font-weight: $font-weight-bold;
}

// Dropdown transition
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
