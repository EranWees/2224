import React from 'react';
import { Page } from '../../types';

interface BottomNavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentPage, onNavigate }) => {
  const NavButton = ({ icon, isActive, onClick, label }: { icon: string, isActive: boolean, onClick: () => void, label: string }) => {
    return (
      <button
        onClick={onClick}
        aria-label={label}
        className={`flex flex-col items-center justify-center w-20 h-16 transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 focus:ring-blue-400 active:scale-90 ${
          isActive
            ? 'text-blue-600 dark:text-blue-500' 
            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        <i className={`fas ${icon} text-xl`}></i>
        <span className="text-xs font-semibold mt-1">{label}</span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-sm rounded-3xl shadow-lg flex justify-around items-center max-w-sm mx-auto p-2 h-20">
        <NavButton
          icon="fa-home"
          label="Home"
          isActive={currentPage === Page.Home}
          onClick={() => onNavigate(Page.Home)}
        />
        <NavButton
          icon="fa-briefcase"
          label="Services"
          isActive={currentPage === Page.Services}
          onClick={() => onNavigate(Page.Services)}
        />
        <NavButton
          icon="fa-info-circle"
          label="About"
          isActive={currentPage === Page.About}
          onClick={() => onNavigate(Page.About)}
        />
      </div>
    </div>
  );
};
