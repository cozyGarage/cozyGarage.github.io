import React from 'react';
import './Loading.css';

/**
 * Loading Component
 * Displayed while lazy-loaded components are being fetched
 */
export const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};
