import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../shared/utils/theme';
import { Navbar } from '../shared/components/layout/Navbar';
import { HomePage } from '../features/home/HomePage';
import { ProjectsPage, ProjectDetailPage } from '../features/projects/ProjectsPage';
import { BlogPage, BlogPostPage } from '../features/blog/BlogPage';
import { GamePage } from '../features/game/GamePage';

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
              <>
                <Navbar />
                <ProjectsPage />
              </>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <>
                <Navbar />
                <ProjectDetailPage />
              </>
            }
          />

          {/* Blog Routes */}
          <Route
            path="/blog"
            element={
              <>
                <Navbar />
                <BlogPage />
              </>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <>
                <Navbar />
                <BlogPostPage />
              </>
            }
          />

          {/* Othello Game - Embedded from separate repo */}
          <Route
            path="/play"
            element={
              <>
                <Navbar />
                <GamePage />
              </>
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