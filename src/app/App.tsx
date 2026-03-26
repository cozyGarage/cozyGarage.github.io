import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../shared/utils/theme';
import { Navbar } from '../shared/components/layout/Navbar';
import { HomePage } from '../features/home/HomePage';
import { Loading } from '../shared/components/Loading';

// Lazy load larger route components to reduce initial bundle size
const ProjectsPage = React.lazy(() => import('../features/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = React.lazy(() => import('../features/projects/ProjectsPage').then(m => ({ default: m.ProjectDetailPage })));
const BlogPage = React.lazy(() => import('../features/blog/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = React.lazy(() => import('../features/blog/BlogPage').then(m => ({ default: m.BlogPostPage })));
const GamePage = React.lazy(() => import('../features/game/GamePage').then(m => ({ default: m.GamePage })));
const BookPage = React.lazy(() => import('../features/book/BookPage').then(m => ({ default: m.BookPage })));


// Import global styles
import '../styles/variables.css';
import '../styles/layout.css';
import '../styles/animations.css';

/**
 * App - Main application with routing
 */
export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <ScrollToHash />
          <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
              </>
            }
          />

          {/* Projects Page */}
          <Route
            path="/projects"
            element={
              <React.Suspense fallback={<Loading />}>
                <Navbar />
                <ProjectsPage />
              </React.Suspense>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <React.Suspense fallback={<Loading />}>
                <Navbar />
                <ProjectDetailPage />
              </React.Suspense>
            }
          />

          {/* Blog Routes */}
          <Route
            path="/blog"
            element={
              <React.Suspense fallback={<Loading />}>
                <Navbar />
                <BlogPage />
              </React.Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <React.Suspense fallback={<Loading />}>
                <Navbar />
                <BlogPostPage />
              </React.Suspense>
            }
          />

          {/* Othello Game - Embedded from separate repo */}
          <Route
            path="/play"
            element={
              <React.Suspense fallback={<Loading />}>
                <Navbar />
                <GamePage />
              </React.Suspense>
            }
          />

          {/* Book a Call page */}
          <Route
            path="/book"
            element={
              <React.Suspense fallback={<Loading />}>
                <Navbar />
                <BookPage />
              </React.Suspense>
            }
          />

          {/* Redirects and 404 */}
          <Route path="/othello" element={<Navigate to="/play" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

/**
 * ScrollToHash
 * Watches route changes and scrolls to the element indicated by the hash (e.g. `#contact`).
 * Retries for a longer period to allow lazy-loaded content to mount.
 */
const ScrollToHash: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;
    // small delay to allow lazy components to mount
    const startDelay = 50;
    if (!hash) {
      // No hash — scroll to top
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), startDelay);
      return;
    }

    const id = hash.replace('#', '');
    let attempts = 0;
    const maxAttempts = 40; // longer retry window
    const intervalMs = 150;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Use requestAnimationFrame to ensure layout is stable
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, intervalMs);
      }
    };

    setTimeout(tryScroll, startDelay);
  }, [location]);

  return null;
};