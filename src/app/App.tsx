import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../shared/components/layout/Navbar';
import { HomePage } from '../features/home/HomePage';
import { ProjectsPage } from '../features/projects/ProjectsPage';
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
    <BrowserRouter>
      <div className="app">
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
      </div>
    </BrowserRouter>
  );
};
