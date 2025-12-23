# Tarot de Marseille

An interactive educational application for teaching and exploring the Tarot de Marseille card game.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TroisJS** - Vue 3 wrapper for Three.js (3D rendering)
- **TypeScript** - Type-safe JavaScript
- **GSAP** - Professional-grade animation library
- **Vite** - Next-generation frontend build tool
- **Vitest** - Blazing fast unit testing framework
- **vue-i18n** - Internationalization (EN, PT-BR, FR)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint and fix files |
| `npm run format` | Format files with Prettier |
| `npm run type-check` | Run TypeScript type checking |

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, 3d models)
├── components/       # Reusable Vue components
│   ├── cards/        # Card-related components
│   ├── ui/           # Generic UI components
│   └── three/        # TroisJS/3D components
├── composables/      # Vue composables (reusable logic)
├── locales/          # i18n translation files
├── stores/           # Pinia stores (if needed)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── views/            # Page-level components
```

## Internationalization

The app supports three languages:
- English (en) - Default
- Portuguese Brazilian (pt-BR)
- French (fr)

## License

MIT
