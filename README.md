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

## Deployment

### Environment Variables

The application supports the following environment variables for deployment configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_BASE_URL` | `/` | Base URL path where the app is served |
| `VITE_CARDS_PATH` | `cards` | Path to card images (relative to base URL or absolute URL) |

### Building for Production

```bash
# Build with default settings (app at domain root)
npm run build

# Build for a subdirectory deployment
VITE_BASE_URL=/tarot/ npm run build

# Build with custom cards path
VITE_BASE_URL=/my-app/ VITE_CARDS_PATH=assets/cards npm run build
```

### Deployment Scenarios

#### 1. Domain Root Deployment

Deploy the app at the root of your domain (e.g., `https://tarot.example.com/`):

```bash
npm run build
# Copy dist/* to your web server root
```

#### 2. Subdirectory Deployment

Deploy the app in a subdirectory (e.g., `https://example.com/tarot/`):

```bash
VITE_BASE_URL=/tarot/ npm run build
# Copy dist/* to /tarot/ directory on your server
```

#### 3. GitHub Pages Deployment

For GitHub Pages with a repository name as subdirectory:

```bash
VITE_BASE_URL=/repository-name/ npm run build
```

#### 4. External CDN for Card Images

Serve card images from a CDN or different server:

```bash
VITE_BASE_URL=/app/ VITE_CARDS_PATH=https://cdn.example.com/tarot/cards npm run build
# Copy dist/* to /app/ on your server
# Ensure card images are available at the CDN path
```

### Production Files

After building, the `dist/` folder contains:

```
dist/
├── index.html          # Entry point
├── assets/             # JS, CSS, and other bundled assets
├── cards/              # Card images (80 JPG files)
│   ├── a01.jpg - a22.jpg  # Major Arcana
│   ├── b01.jpg - b14.jpg  # Wands
│   ├── c01.jpg - c14.jpg  # Cups
│   ├── d01.jpg - d14.jpg  # Swords
│   ├── e01.jpg - e14.jpg  # Coins
│   └── z00.jpg - z01.jpg  # Special cards
└── vite.svg            # Favicon
```

### Server Configuration

#### Apache (.htaccess)

For Single Page Application routing with subdirectory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /tarot/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /tarot/index.html [L]
</IfModule>
```

#### Nginx

```nginx
location /tarot/ {
    alias /var/www/tarot/;
    try_files $uri $uri/ /tarot/index.html;
}
```

#### Vercel (vercel.json)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify (_redirects)

```
/*    /index.html   200
```

### Card Images Management

Card images are located in `public/cards/` during development and are automatically copied to `dist/cards/` during build.

**Options for card images in production:**

1. **Default**: Images bundled with the app in `dist/cards/`
2. **Separate hosting**: Set `VITE_CARDS_PATH` to an absolute URL pointing to your CDN
3. **Custom directory**: Set `VITE_CARDS_PATH` to a different relative path

**Image naming convention:**
- Major Arcana: `a01.jpg` to `a22.jpg`
- Wands: `b01.jpg` to `b14.jpg`
- Cups: `c01.jpg` to `c14.jpg`
- Swords: `d01.jpg` to `d14.jpg`
- Coins: `e01.jpg` to `e14.jpg`
- Special: `z00.jpg` to `z01.jpg`

## License

MIT
