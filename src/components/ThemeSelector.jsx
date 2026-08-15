import React, { useState } from 'react';
import './ThemeSelector.css';

const themes = [
  { name: 'default', color: '#ab7743', label: 'Warm' },
  { name: 'ocean', color: '#006994', label: 'Ocean' },
  { name: 'forest', color: '#454f2d', label: 'Forest' },
  { name: 'purple', color: '#bf93d0', label: 'Amethyst' },
  { name: 'rose', color: '#eeb9b8', label: 'Rose' }
];

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector-container">
      <button
        className="gear-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-title">Theme</div>
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className="theme-option"
                onClick={() => changeTheme(theme.name)}
                title={theme.label}
              >
                <div
                  className="theme-color-circle"
                  style={{ backgroundColor: theme.color }}
                ></div>
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
