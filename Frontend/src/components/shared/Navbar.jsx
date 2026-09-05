import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Moon, Sun, AlertTriangle } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference or local storage on mount
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-800 shadow-md border-b-4 border-brand-saffron transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-saffron sm:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center ml-2 sm:ml-0">
              {/* Replace with actual logo later */}
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">
                Citizen <span className="text-brand-saffron">Suvidha</span>
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* SOS Button */}
            <button className="flex items-center px-3 py-1.5 bg-danger text-white text-sm font-bold rounded-md hover:bg-red-600 shadow-sm transition-colors animate-pulse">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-brand-saffron ring-2 ring-white dark:ring-slate-800"></span>
            </button>

            {/* Profile Dropdown (Simplified for now) */}
            <div className="relative flex-shrink-0">
              <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-brand-saffron transition duration-150 ease-in-out">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <User className="h-5 w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;