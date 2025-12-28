# Architecture Overview

This document describes the structure and key design decisions of the portfolio website.

## Project Structure

```
├── public/               # Static assets served as-is
│   ├── manifest.json     # PWA manifest
│   ├── robots.txt        # SEO robots file
│   ├── sitemap.xml       # SEO sitemap
│   └── og-image.svg      # Social sharing image
│
├── src/
│   ├── index.tsx         # Application entry point
│   ├── index.css         # Global base styles
│   │
│   ├── app/
│   │   └── App.tsx       # Root component with routing
│   │
│   ├── features/         # Feature-based modules
│   │   ├── home/         # Landing page
│   │   ├── projects/     # Projects gallery + detail pages
│   │   ├── blog/         # Blog listing + post pages
│   │   └── game/         # Othello game (iframe embed)
│   │
│   ├── shared/           # Shared utilities and components
│   │   ├── components/   # Reusable UI components
│   │   ├── config/       # Feature flags
│   │   └── utils/        # Helper functions
│   │
│   ├── data/             # Static data and content
│   │   ├── portfolio.ts  # Personal info, projects, skills
│   │   └── blog/         # Blog post content
│   │
│   ├── styles/           # Global CSS
│   │   ├── variables.css # Design tokens (colors, spacing)
│   │   ├── layout.css    # Layout utilities
│   │   └── animations.css# Animation keyframes
│   │
│   └── assets/           # Images and media
│
├── scripts/              # Build and optimization scripts
│   └── optimize-images.js
│
└── docs/                 # Documentation
```

## Design System

### CSS Variables

All design tokens are defined in `src/styles/variables.css`:

- **Colors**: `--bg-primary`, `--text-primary`, `--accent-primary`
- **Spacing**: `--spacing-xs` through `--spacing-xl`
- **Typography**: System font stack (no external fonts)
- **Transitions**: `--transition-fast`, `--transition-normal`, `--transition-slow`

### Theming

Light/dark theme support via `data-theme` attribute:
- Default: Dark theme
- Toggle: `ThemeToggle` component persists preference to localStorage

## Routing

React Router v6 with lazy-loaded routes:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Landing page with hero, projects, skills, contact |
| `/projects` | ProjectsPage | Project gallery with filtering |
| `/projects/:id` | ProjectDetailPage | Individual project details |
| `/blog` | BlogPage | Blog post listing |
| `/blog/:id` | BlogPostPage | Individual blog post |
| `/play` | GamePage | Othello game (iframe) |

## Performance Optimizations

1. **Code Splitting**: Routes are lazy-loaded with `React.lazy()`
2. **Component Memoization**: `React.memo()` for list items
3. **Image Optimization**: Sharp-based pipeline for WebP/AVIF
4. **Bundle Splitting**: Vendor chunks (react, react-dom, router)
5. **CSS**: Scoped per-feature, variables for consistency

## Data Flow

```
portfolio.ts (static data)
       ↓
   Features (HomePage, ProjectsPage, etc.)
       ↓
   Memoized Components (ProjectCard, etc.)
```

No state management library needed - React's built-in state is sufficient.

## Deployment

- **Platform**: GitHub Pages
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Build**: `bun run build` → outputs to `dist/`
- **SPA Routing**: 404.html redirects for client-side routing
