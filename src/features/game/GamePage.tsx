import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setFavicon, getFavicon } from '../../shared/utils/favicon';
import './game.css';

/**
 * Game Page - Embedded Othello Game
 * Embeds the Othello game from the separate repository
 */
export const GamePage: React.FC = () => {
  useEffect(() => {
    // Change favicon when on game page
    const originalFavicon = getFavicon();
    setFavicon('https://cozygarage.github.io/Othello/favicon.ico');

    // Restore original favicon when leaving
    return () => {
      setFavicon(originalFavicon);
    };
  }, []);

  return (
    <div className="game-page">
      {/* Minimal navbar for game page */}
      <nav className="navbar-minimal">
        <Link to="/" className="navbar-home-icon" title="Back to Portfolio">
          🏠
        </Link>
      </nav>

      {/* Embedded Othello Game */}
      <iframe
        src="https://cozygarage.github.io/Othello/"
        className="game-iframe"
        title="Othello Game - Play the classic strategy board game"
        allow="fullscreen"
        loading="lazy"
      />

      {/* Optional: Game Info Footer */}
      <div className="game-footer">
        <div className="game-footer-content">
          <p>
            Enjoying the game?
            <a
              href="https://github.com/cozyGarage/Othello"
              target="_blank"
              rel="noopener noreferrer"
              className="game-link"
            >
              ⭐ Star it on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};