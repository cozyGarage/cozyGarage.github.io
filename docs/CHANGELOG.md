# Changelog

All notable changes to this project are documented here.

## [Unreleased]

## [2.0.0] - 2025-11-25

### Added
- **Blog Content System**
  - Created dedicated `src/data/blog/` module for organized blog content
  - Added 3 comprehensive technical blog posts:
    - "Building an Othello Game with React" (8 min read)
    - "Optimizing React Applications for Performance" (10 min read)
    - "TypeScript Best Practices for Large Applications" (15 min read)
  - Blog helper functions: `getBlogPostById()`, `getBlogPostsByTag()`, `getRecentBlogPosts()`
  
- **Navigation Improvements**
  - ScrollToHash component for smooth anchor navigation across routes
  - Fixed Contact link routing from Projects and Blog pages to home anchor
  
- **Documentation**
  - Comprehensive JSDoc comments in `portfolio.ts` and `BlogPage.tsx`
  - Module-level documentation for better code organization
  - Updated `docs/README.md` with recent changes and architecture overview
  
- **Deployment**
  - Added `.nojekyll` file for proper GitHub Pages asset serving

### Changed
- **Architecture**
  - Flattened repository structure (removed monorepo references)
  - Removed `.husky/` git hooks for simpler development workflow
  - Updated CI workflows to reflect single-package structure
  
- **UI/UX**
  - Unified hero button styles - all buttons now use gradient design matching "View Projects"
  - Replaced Othello-specific favicon with neutral SVG icon featuring initials
  
- **Configuration**
  - Removed `commitlint` enforcement from CI (commented out in workflow)
  - Cleaned up `.gitignore` to remove package-specific entries
  - Updated bundle size check in CI to use `dist/assets` instead of `packages/`

### Removed
- Duplicate `public/index.html` (old CRA template)
- `.husky/` directory and git hooks
- `commitlint.config.js` (enforcement disabled)
- `.github/CODEOWNERS` file
- Monorepo traces from documentation and configuration

### Fixed
- GitHub Pages 404 errors for assets (added `.nojekyll`, triggered fresh deployment)
- Contact navigation not working from non-home pages
- Navbar mobile menu duplication and ordering issues
- TypeScript compilation after blog restructure

## [1.0.0] - 2024-11-08

### Added
- Initial portfolio website with React and TypeScript
- Featured projects showcase with filtering
- Blog section with sample posts
- Othello game integration via iframe
- Dark/light theme toggle
- Responsive navbar with mobile menu
- Contact form with EmailJS integration
- GitHub Pages deployment workflow
- Performance optimizations (React.memo, code splitting)

### Technical Stack
- React 18.2.0
- TypeScript 5.9.3
- Vite 7.2.2
- Bun runtime
- GitHub Actions CI/CD

---

## Version History

- **2.0.0** - Major refactor: flattened structure, blog system, comprehensive docs
- **1.0.0** - Initial release: portfolio website with Othello game integration
