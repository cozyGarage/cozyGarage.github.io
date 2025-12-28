# Trung Nguyen | Portfolio

<div align="center">

🌐 **[View Portfolio](https://cozygarage.github.io/)** • 🎮 **[Play Othello](https://cozygarage.github.io/play)**

A modern portfolio website built with React, TypeScript, and Bun.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.3-f9f1e1?logo=bun&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## Features

- **🏠 Landing Page** — Hero, featured projects, skills, contact form
- **💼 Projects Gallery** — Filterable showcase with detail pages
- **📝 Blog** — Technical articles with tags and reading time
- **🎮 Othello Game** — Embedded playable game via iframe
- **🌙 Dark/Light Theme** — Persisted preference
- **📱 Responsive** — Mobile-first design
- **⚡ Fast** — Lazy-loaded routes, optimized bundles

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun test
```

## Project Structure

```
src/
├── app/          # Root component + routing
├── features/     # Feature modules (home, projects, blog, game)
├── shared/       # Reusable components + utilities
├── data/         # Content (projects, skills, blog posts)
└── styles/       # CSS variables + global styles
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed documentation.

## Customize

1. **Personal info**: Edit `src/data/portfolio.ts`
2. **Projects**: Add entries to the `projects` array
3. **Blog posts**: Add to `src/data/blog/`
4. **Colors**: Modify `src/styles/variables.css`
5. **SEO**: Update `index.html` meta tags

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun test` | Run tests |
| `bun run type-check` | TypeScript validation |
| `bun run optimize-images` | Generate WebP/AVIF images |

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Routing**: React Router v6
- **Deployment**: GitHub Pages + GitHub Actions

## Performance

- ⚡ Lighthouse 95+ scores
- 📦 ~200KB total bundle (gzipped)
- 🚀 Lazy-loaded routes
- 🖼️ Optimized images (WebP/AVIF)

## License

MIT — feel free to use as inspiration for your own portfolio.

---

<div align="center">

**Built by [Trung Nguyen](https://github.com/cozyGarage)**

</div>
