import React from 'react';
import { Page } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface TopHeaderProps {
  onNavigate: (page: Page) => void;
  onTitleClick: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onNavigate, onTitleClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 shrink-0 transition-colors duration-300">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors duration-300">
            <img src="https://i.ibb.co/vvrSRLvz/Eran-logo-l.png" alt="Eran Studio Logo" className="w-full h-full object-contain"/>
         </div>
         <h1 
            onClick={onTitleClick}
            className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white whitespace-nowrap cursor-pointer hidden sm:block active:scale-95 transition-transform duration-200"
         >
            Eran Studio
         </h1>
      </div>
      <div className="flex items-center justify-end gap-2 sm:gap-4">
        <button
          onClick={() => onNavigate(Page.Services)}
          className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95"
        >
          Get a Quote
        </button>
        
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 active:scale-95 text-zinc-900 dark:text-white"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <i className="fas fa-moon text-lg"></i>
          ) : (
            <i className="fas fa-sun text-lg text-yellow-400"></i>
          )}
        </button>
      </div>
    </header>
  );
};
