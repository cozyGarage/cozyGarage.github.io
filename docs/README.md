# Documentation

This project uses a single, comprehensive README.md as the main documentation. See the [main README](../README.md) for:

- 📖 **About** - Project overview and features
- 🚀 **Getting Started** - Installation and development setup
- 📁 **Project Structure** - Code organization and architecture (flattened single-package design)
- 🎨 **Design System** - Colors, typography, and unified button styles
- 🎮 **Game Integration** - How the Othello game is embedded via iframe
- 📝 **Blog System** - Organized blog content in `src/data/blog/` with detailed technical posts
- 🔧 **Development** - Scripts, workflow, and customization
- 🚀 **Deployment** - GitHub Pages setup and live URLs

## Recent Updates (November 2025)

### Architecture Improvements
- **Flattened repository structure** - Removed monorepo traces for simpler single-package design
- **Blog content organization** - Separated blog posts into dedicated module (`src/data/blog/`)
- **Comprehensive documentation** - Added JSDoc comments throughout codebase

### Features Added
- **Hash-based navigation** - ScrollToHash component for smooth anchor navigation across routes
- **Contact link fix** - Proper routing from any page to home contact section
- **Unified button styles** - All hero buttons use consistent gradient design
- **Neutral favicon** - Custom SVG favicon replacing Othello-specific icon
- **3 detailed blog posts** - Production-quality technical content with code examples

### Build & Deployment
- **GitHub Pages optimization** - Added `.nojekyll` for proper asset serving
- **CI/CD updates** - Streamlined workflows, removed commitlint enforcement
- **Bundle optimization** - Manual chunk splitting and tree shaking configured

## Additional Documentation

- **[OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md)** - Performance improvements and benchmarks
- **[PERFORMANCE.md](./PERFORMANCE.md)** - Detailed performance metrics and strategies
