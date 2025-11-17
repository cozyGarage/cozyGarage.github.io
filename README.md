# Portfolio Website - Trung Nguyen �

<div align="center">

� **[View Portfolio](https://cozygarage.github.io/)** • 🎮 **[Play Othello](https://cozygarage.github.io/play)**

_A modern, interactive portfolio website built with React, TypeScript, and Bun - featuring a fully playable Othello game!_

**Latest Update:** November 8, 2025 - Complete refactoring with feature-based architecture, iframe game integration, and comprehensive cleanup.

![Bun](https://img.shields.io/badge/Bun-1.3.2-orange?style=flat-square&logo=bun)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=flat-square&logo=vite)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-2088FF?style=flat-square&logo=github)

</div>

---

## 🎯 About This Project

This is a modern, professional portfolio website that showcases my work as a Full Stack Developer & ML Enthusiast. The site features:

- **🏠 Landing Page**: Hero section with interactive code snippet, featured projects, skills showcase, and contact information
- **🎮 Othello Game**: Fully playable strategy board game (embedded from separate repository)
- **💼 Projects Gallery**: Showcase of development projects with filtering and details
- **📝 Blog System**: Technical articles and thoughts (ready for content)
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎨 Design Philosophy

Inspired by modern developer portfolios with clean aesthetics, smooth animations, and professional presentation. Features a dark theme with cyan accents, inspired by platforms like Chess.com and developer-focused designs.

---

## ✨ Key Features

### 🏠 Landing Page

- **Hero Section**: Split layout with personal introduction and animated code snippet
- **Featured Projects**: Interactive cards showcasing key work
- **Skills Matrix**: Progress bars showing proficiency in Frontend, Backend, ML, and Tools
- **About Section**: Personal story with achievement stats
- **Contact Section**: Direct links to email, GitHub, and LinkedIn

### 🎮 Othello Game Integration

- **iframe Embed**: Always shows the latest version from dedicated game repository
- **Dynamic Favicon**: Changes to Othello icon when playing the game
- **Seamless Experience**: Game loads instantly with full functionality
- **Independent Development**: Game can be updated without touching portfolio code

### 💼 Projects & Blog

- **Project Filtering**: Browse by category (Web, Game, ML, Other)
- **Blog System**: Markdown-based posts with tags and read time
- **Responsive Cards**: Hover effects and smooth animations
- **SEO Ready**: Proper meta tags and structured content

### 🛠️ Technical Excellence

- **⚡ Lightning Fast**: Powered by Bun runtime (1.3+)
- **🔥 Hot Reload**: Vite dev server with instant updates
- **🎯 Type-Safe**: Full TypeScript with strict mode
- **🧩 Simple Structure**: Single-package project with feature-based organization (`src/features`) — no monorepo or workspaces
- **🎨 Modular CSS**: Design tokens and component-scoped styling
- **📱 Mobile-First**: Responsive design that works everywhere

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0 or higher) - Fast all-in-one JavaScript runtime

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/cozyGarage/cozyGarage.github.io.git
cd cozyGarage.github.io
```

2. **Install dependencies:**

```bash
bun install
```

3. **Start development server:**

```bash
bun run dev
```

4. **Open in browser:**
   - Portfolio: [http://localhost:3000/](http://localhost:3000/)
   - Projects: [http://localhost:3000/projects](http://localhost:3000/projects)
   - Blog: [http://localhost:3000/blog](http://localhost:3000/blog)
   - Game: [http://localhost:3000/play](http://localhost:3000/play)

### Why Bun? ⚡

This project uses **Bun** for its incredible performance:

- **10-100x faster** package installation than npm
- **Built-in bundler** and test runner
- **Native TypeScript** support
- **Drop-in replacement** for Node.js

---

## 🎯 Make this your Portfolio (Personalization Guide)

Perfect for developers who want a modern, fast, and accessible portfolio — here are the practical steps to make this site your own:

- 1) Personal info: Update your name, title, short bio and links in `src/data/portfolio.ts`.
- 2) Projects: Add new `Project` entries to `src/data/portfolio.ts` and set `featured: true` for those you want on the landing page. Use a unique `id` and provide `demoUrl` and `githubUrl` as needed.
- 3) Images & assets: Replace files in `public/` or add project images to `public/projects`. Update `image` fields in the `projects` entries.
- 4) Add technical blog posts in `src/data/portfolio.ts` (the `blogPosts` array), or create a content folder and import Markdown/MDX if you want a richer workflow.
- 5) Change theme colors and spacing in `src/styles/variables.css`. This file contains the CSS custom properties used across the site.
- 6) Hide or show pages: Change routes in `src/app/App.tsx` to add or remove pages. Remove the `GamePage` route if you don't want the iframe embedded.
  - 7) Contact & analytics: Update the contact email in `src/data/portfolio.ts`. Analytics is initialized in `src/shared/utils/analytics.ts` — supply your tracking id or disable it for local development.
- 8) Testing & type check: `bun run test` (unit tests) and `bun run type-check` for types — ensure everything compiles cleanly before deploying.

### Personalization Checklist

1. Edit `personalInfo` in `src/data/portfolio.ts`.
2. Replace project images in `public/projects` and add projects to the `projects` array.
3. Update `public/manifest.json` and `index.html` meta tags for SEO and social sharing.
4. Replace favicon(s) if you want unique branding: check `public/favicon-*.png` files.
5. Run `bun run dev` to preview changes locally.

> Tip: Keep copy short and impactful — the homepage is the first interaction your visitors have.


## Project Structure

This repository is a single-package portfolio website. The structure is intentionally simple:

```
.
├── public/               # Static assets (images, manifest, favicon)
├── src/                  # Application source
│   ├── app/              # App core and routing (`App.tsx`)
│   ├── features/         # Feature modules (home, projects, blog, game)
│   ├── shared/           # Shared components and utilities
│   ├── data/             # Content and site data (projects, skills, blog posts)
│   ├── styles/           # Global CSS variables and utilities
│   └── index.tsx         # Entry point
├── docs/                 # Project documentation and contribution guides
├── .github/              # CI workflows and community files
├── package.json          # Scripts and dependencies
├── vite.config.js        # Development/build config
└── tsconfig.json         # TypeScript config
```

This keeps the repository focused and easy to maintain as a personal website — no separate engine packages are required because the Othello game is embedded via an iframe.

---

## 🎨 Design System

### Color Palette

```css
/* Background Colors */
--bg-primary: #0f0f0f; /* Near black */
--bg-secondary: #1a1a1a; /* Dark gray */
--bg-tertiary: #2a2a2a; /* Medium gray */

/* Text Colors */
--text-primary: #ffffff; /* White */
--text-secondary: rgba(255, 255, 255, 0.85); /* Off-white */
--text-tertiary: rgba(255, 255, 255, 0.6); /* Muted */

/* Accent Colors */
--accent-primary: #00b4d8; /* Cyan blue */
--accent-secondary: #0096c7; /* Deep cyan */

/* Gradients */
--gradient-hero: linear-gradient(135deg, #00b4d8 0%, #0096c7 100%);
--gradient-cards: linear-gradient(135deg, #00b4d8 0%, #0096c7 100%);
```

### Typography

- **Headings**: System fonts (optimized for performance)
  - H1: 4rem (64px) - Bold 800
  - H2: 2.5rem (40px) - Bold 700
  - H3: 1.5rem (24px) - Bold 600
- **Body**: 1rem (16px) normal, 1.25rem (20px) large
- **Small**: 0.875rem (14px)

### Interactive Elements

- **Buttons**: Gradient backgrounds with hover lift effects
- **Cards**: Shadow effects that lift on hover
- **Animations**: Smooth transitions (0.2-0.3s ease)
- **Navbar**: Dynamic content based on current route

---

## 🎮 Game Integration Strategy

### Why iframe Embed? 🤔

After evaluating three approaches, I chose **iframe embedding** because:

1. **Independent Development**: Game lives in separate repository
2. **Automatic Updates**: Portfolio always shows latest game version
3. **Simple Maintenance**: Single codebase to maintain
4. **Flexible Deployment**: Update game without rebuilding portfolio

### Implementation

```tsx
// features/game/GamePage.tsx
export const GamePage = () => {
  useEffect(() => {
    // Change favicon to Othello icon
    const originalFavicon = getFavicon();
    setFavicon('https://cozygarage.github.io/Othello/favicon.ico');

    return () => {
      // Restore portfolio favicon
      setFavicon(originalFavicon);
    };
  }, []);

  return (
    <div className="game-container">
      <iframe
        src="https://cozygarage.github.io/Othello/"
        className="game-iframe"
        title="Othello Game"
      />
    </div>
  );
};
```

**Result**: Game loads instantly with dynamic favicon switching! ⚫⚪

---

## 🔧 Development Workflow

### Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build
bun run clean    # Clean build artifacts
```

### Git Workflow

Following [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature commits
git commit -m "feat: add project filtering functionality"

# Bug fixes
git commit -m "fix: correct mobile navbar spacing"

# Documentation
git commit -m "docs: update portfolio data with new projects"

# Refactoring
git commit -m "refactor: reorganize components by feature"
```

### Code Organization

- **Feature-Based**: Each feature is self-contained in `features/`
- **Shared Code**: Reusable components in `shared/`
- **Type Safety**: Full TypeScript with strict mode
- **Modular CSS**: Component-scoped styling with design tokens

---

## 🎯 Recent Refactoring (Complete!)

### Major Improvements ✅

1. **Fixed Routing**: Changed Vite base from `/Othello/` to `/` for proper SPA routing
2. **Package Rename**: `othello-react` → `portfolio` for clarity
3. **Feature Architecture**: Organized code by features (home, projects, blog, game)
4. **Clean Structure**: Removed duplicate files, consolidated CSS
5. **Dynamic Navbar**: Context-aware navigation with active states
6. **Game Integration**: iframe embed with dynamic favicon switching

### Before vs After

**Before:**

- Mixed folder structure (pages/, components/, old structure)
- Duplicate CSS files across directories
- Full game codebase (~20 files) in portfolio
- Confusing navigation flow

**After:**

- Clean feature-based architecture
- Single source of truth for each component
- Game as lightweight iframe embed (2 files)
- Intuitive navigation with active states
- **70% reduction** in bundle size!

---

## 📝 Customization Guide

### Update Personal Information

Edit `packages/portfolio/src/data/portfolio.ts`:

```typescript
export const personalInfo = {
  name: 'Trung Nguyen',
  title: 'Full Stack Developer & ML Enthusiast',
  bio: 'Passionate developer building interactive web apps...',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
};
```

### Add New Projects

```typescript
export const projects: Project[] = [
  {
    id: 'your-project',
    title: 'Amazing Project',
    description: 'Built with cutting-edge technology...',
    technologies: ['React', 'TypeScript', 'Node.js'],
    demoUrl: '/projects/your-project',
    githubUrl: 'https://github.com/...',
    category: 'web',
    featured: true,
  },
];
```

### Write Blog Posts

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 'my-first-post',
    title: 'Building Modern Web Apps with React',
    excerpt: 'Learn how to build scalable React applications...',
    content: `# Markdown content here...`,
    date: '2025-11-08',
    tags: ['React', 'Tutorial', 'Web Development'],
    readTime: 5,
  },
];
```

---

## 🚀 Deployment

### GitHub Pages (Automatic)

The project deploys automatically to GitHub Pages on push to `main`:

```bash
git add .
git commit -m "feat: add new project showcase"
git push origin main
```

**Live URLs:**

- Portfolio: [https://cozygarage.github.io/](https://cozygarage.github.io/)
- Game: [https://cozygarage.github.io/play](https://cozygarage.github.io/play)

### Manual Deployment

```bash
# Build the portfolio
bun run build

# The dist folder contains production files
# Upload to your hosting provider
```

---

## 📊 Project Stats

- **Bundle Size**: ~150KB (70% reduction after cleanup)
- **Performance**: Lighthouse 95+ scores
- **Features**: 4 main sections + embedded game
- **Architecture**: Feature-based with shared components
- **Deployment**: Automated GitHub Pages
- **Maintenance**: Single iframe dependency

---

## 🎨 Design Implementation

### Layout Preview

```
┌─────────────────────────────────────────────────────────┐
│                        NAVBAR                           │
│  [Logo] Home  [Play Othello]  [Projects]  [Blog]  Contact│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      HERO SECTION                       │
│                                                         │
│   Hi, I'm Trung Nguyen        ┌───────────────┐         │
│   Full Stack Developer        │  const dev =  │         │
│                               │  {            │         │
│   [View Projects]             │    name: "…", │         │
│   [Play Othello]              │    skills: [] │         │
│   [Contact]                   │  }            │         │
│                               └───────────────┘         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  FEATURED PROJECTS                      │
│                                                         │
│  ┌────────┐    ┌──────────┐    ┌────────┐               │
│  │ 🎮     │    │ 🌐       │    │ 🤖     │               │
│  │Othello │    │Portfolio │    │ML Model│               │
│  │        │    │ Website  │    │        │               │
│  └────────┘    └──────────┘    └────────┘               │
└─────────────────────────────────────────────────────────┘
```

### Mobile Responsive

- Single column layout on mobile
- Hamburger menu navigation
- Touch-friendly interactions
- Optimized for all screen sizes

---

## 🔮 Future Enhancements

- [ ] Add project images and screenshots
- [ ] Write technical blog posts
- [x] Implement contact form
- [x] Add light/dark theme toggle
- [ ] Create detailed project pages
- [ ] Add scroll animations
- [ ] Implement search functionality
- [ ] Add analytics tracking

---

## 🧭 SEO & Best Practices for Portfolio Sites

- Title & Description: Edit the meta title/description in `public/index.html`.
- Open Graph: Add `og:title`, `og:description`, `og:image` to improve link previews on social platforms.
- Lighthouse: Use Chrome Lighthouse to test performance/accessibility; you can improve scores by compressing images and lazy-loading content.
- Performance: Keep the projects list small on the homepage; use the Projects page to show the full list.
- Accessibility: Use semantic HTML and check color contrast in `src/styles/variables.css`.

## 🔒 Privacy & Analytics

- The project initializes analytics from `src/shared/utils/analytics.ts`. If you prefer not to collect analytics, set the utility to a no-op or remove the snippet.

## 🔧 Husky & Commit Lint

- Husky (git hooks) and commitlint were previously used for local and CI commit validation. For this personal portfolio the local Husky hooks are optional and have been removed from the repository to keep development friction low.
- If you want to re-enable Husky locally, run `bun run prepare`. This will re-install the hook scripts.
- CI commitlint checks have been commented out. To enforce Conventional Commits in CI, re-enable the commitlint step in `.github/workflows/pr-validation.yml`.

---

## 👩‍💻 Contributing & Customization Tips

- Use the feature-based architecture: add a new folder under `src/features` for major sections.
- Maintain a small `README` inside `src/features` for feature-specific documentation.
- Tests: Add tests alongside components in `src/shared/components`.

## 🧪 Troubleshooting

- If the dev server doesn't start, run `bun install` again and verify `bun` is installed properly. On Windows, Bun is supported via the official binary.
- If TypeScript errors block you, use `npx tsc --noEmit` to list issues (or `bun run type-check`).


## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!

---

## 🙏 Acknowledgments

- **Bun Team** for the incredible runtime
- **React & TypeScript** communities
- **Vite** for blazing fast development
- **Chess.com** for navigation design inspiration
- **Open source** projects that made this possible

---

<div align="center">

**Built with ❤️ by Trung Nguyen**

_Full Stack Developer • ML Enthusiast • Game Developer_

[💻 GitHub](https://github.com/cozyGarage) • [💼 LinkedIn](https://linkedin.com/in/trungnguyen8888) • [📧 Email](mailto:sendtotrungnguyen@outlook.com)

</div>
