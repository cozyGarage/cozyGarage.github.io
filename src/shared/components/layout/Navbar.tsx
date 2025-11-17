import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import './navbar.css';

/**
 * Navbar Component
 * Clean navigation bar for portfolio website
 * Note: Game page uses its own minimal navbar
 */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Don't render navbar on game page - GamePage handles its own navbar
  if (location.pathname === '/play') {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
        Trung Nguyen
      </Link>

      <button
        className="navbar-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <ul className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            to="/projects"
            onClick={closeMobileMenu}
          >
            Projects
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={{ pathname: '/', hash: '#contact' }}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
            to="/blog"
            onClick={closeMobileMenu}
          >
            Blog
          </Link>
        </li>
        <li className="nav-item">
          <div className="nav-link nav-theme-wrapper" onClick={closeMobileMenu}>
            <ThemeToggle />
          </div>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link primary ${location.pathname === '/play' ? 'active' : ''}`}
            to="/play"
            onClick={closeMobileMenu}
          >
            Play Othello ⚫⚪
          </Link>
        </li>
      </ul>
    </nav>
  );
};
