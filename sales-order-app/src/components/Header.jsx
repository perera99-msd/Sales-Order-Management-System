import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Sun and Moon Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  // Style for active navigation links
  const activeClassName = "text-blue-500 font-bold";
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-gray-800">
      <nav className="container mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo/Title - UPDATED TO SPIL ASSESSMENT */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SPIL<span className="text-gray-700 dark:text-gray-300">Assessment</span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? activeClassName : 'hover:text-blue-500'
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/sales-order" 
            className={({ isActive }) => 
              isActive ? activeClassName : 'hover:text-blue-500'
            }
          >
            New Order
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;