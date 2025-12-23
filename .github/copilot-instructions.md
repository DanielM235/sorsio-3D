# Tarot de Marseille - Copilot Instructions

## Project Overview

This is an interactive educational application for teaching and exploring the Tarot de Marseille card game. Built with Vue 3, Three.js, TypeScript, and GSAP for animations.

## Language & Communication

- **All code, comments, and documentation must be written in English**
- Variable names, function names, component names, and all identifiers in English
- Git commit messages in English
- Code comments in English

## Internationalization (i18n)

The application supports three languages for user-facing content:
- **English (en)** - Default language
- **Portuguese Brazilian (pt-BR)**
- **French (fr)**

### i18n Guidelines

- Use `vue-i18n` for all user-facing text
- Never hardcode user-facing strings in components
- Translation keys should be descriptive and use dot notation: `cards.majorArcana.theFool`
- Organize translations by feature/domain in the locale files
- Always add translations for all three languages when creating new content

## Tech Stack

- **Framework**: Vue 3 with Composition API (`<script setup>` syntax preferred)
- **Routing**: Vue Router 4
- **3D Rendering**: Three.js (native)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Language**: TypeScript (strict mode)
- **Styling**: SCSS with centralized theme variables
- **Build Tool**: Vite
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint with Vue and TypeScript plugins
- **Formatting**: Prettier

## Styling Guidelines

### SCSS Theme Variables

- All theme properties (colors, spacing, typography, shadows) are centralized in `src/assets/styles/`
- Import variables using `@use '@/assets/styles/variables' as *;` (auto-injected by Vite)
- **Never hardcode colors, spacing, or typography values in component styles**
- Use theme variables: `$color-primary`, `$spacing-4`, `$font-size-lg`, etc.
- Component-specific styles should only contain layout and structure, not theme values

### Theme Files Structure

```
src/assets/styles/
├── _colors.scss      # Color palette, gradients, shadows
├── _typography.scss  # Font families, sizes, weights
├── _spacing.scss     # Spacing scale, breakpoints, z-index
├── _variables.scss   # Forwards all variable files
└── main.scss         # Global styles and resets
```

## Code Style & Best Practices

### Vue Components

- Use `<script setup lang="ts">` syntax
- Single File Components (.vue files)
- Component names should be PascalCase and multi-word
- Use `defineProps` and `defineEmits` with TypeScript types
- Prefer Composition API with composables for shared logic

### TypeScript

- Enable strict mode
- Define interfaces/types for all props, emits, and data structures
- Avoid `any` type - use `unknown` if type is truly unknown
- Use type inference where possible, explicit types for function parameters and returns

### File Organization

```
src/
├── assets/           # Static assets (images, fonts, 3d models)
├── components/       # Reusable Vue components
│   ├── cards/        # Card-related components
│   ├── ui/           # Generic UI components
│   └── three/        # TroisJS/3D components
├── composables/      # Vue composables (reusable logic)
├── locales/          # i18n translation files
│   ├── en.json
│   ├── pt-BR.json
│   └── fr.json
├── stores/           # Pinia stores (if needed)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── views/            # Page-level components
```

### Naming Conventions

- **Components**: `PascalCase.vue` (e.g., `TarotCard.vue`)
- **Composables**: `useCamelCase.ts` (e.g., `useCardDeck.ts`)
- **Types**: `PascalCase` (e.g., `TarotCard`, `CardSuit`)
- **Constants**: `UPPER_SNAKE_CASE`
- **CSS Classes**: `kebab-case`

### GSAP Animations

- Create reusable animation functions in composables
- Use GSAP timelines for complex sequences
- Clean up animations in `onUnmounted` lifecycle hook
- Prefer GSAP over CSS animations for complex interactions

### TroisJS / 3D

- Organize 3D scenes in dedicated components
- Use proper disposal of Three.js resources
- Implement loading states for 3D assets
- Consider performance with card count and effects

### Testing

- Write unit tests for composables and utilities
- Write component tests for Vue components
- Use meaningful test descriptions
- Test i18n integration where applicable

## Tarot Domain Knowledge

The Tarot de Marseille consists of 78 cards:
- **Major Arcana (22 cards)**: The Fool through The World
- **Minor Arcana (56 cards)**: Four suits (Wands, Cups, Swords, Coins)

Keep card data structured and typed for easy expansion and educational features.

## Future Considerations

- Backend integration planned for persistence
- Keep API-related code in a dedicated `services/` directory when added
- Design components to be backend-agnostic initially
