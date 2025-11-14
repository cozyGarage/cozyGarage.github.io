import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../shared/utils/theme';
import { Navbar } from '../shared/components/layout/Navbar';
import { Loading } from '../shared/components/Loading';

// Lazy load route components for better code splitting
const HomePage = React.lazy(() => import('../features/home/HomePage').then(m => ({ default: m.HomePage })));
const ProjectsPage = React.lazy(() => import('../features/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const BlogPage = React.lazy(() => import('../features/blog/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = React.lazy(() => import('../features/blog/BlogPage').then(m => ({ default: m.BlogPostPage })));
const GamePage = React.lazy(() => import('../features/game/GamePage').then(m => ({ default: m.GamePage })));

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
          <React.Suspense fallback={<Loading />}>
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
          </React.Suspense>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};