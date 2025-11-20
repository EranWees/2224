import React from 'react';
import { Page } from '../../types';

interface SideNavBarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({ currentPage, onNavigate }) => {
  const NavButton = ({ icon, isActive, onClick, label }: { icon: string, isActive: boolean, onClick: () => void, label: string }) => {
    return (
      <button 
          onClick={onClick}
          aria-label={label}
          className={`flex items-center w-full p-4 rounded-lg transition-all duration-200 active:scale-95 ${
              isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
          }`}
      >
          <i className={`fas ${icon} w-8 text-xl`}></i>
          <span className="font-semibold">{label}</span>
      </button>
    );
  };

  return (
    <nav className="w-64 bg-zinc-50 dark:bg-[#1C1C1E] p-4 flex-col h-screen hidden lg:flex shrink-0 border-r border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex flex-col gap-2 mt-8">
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
        <NavButton
          icon="fab fa-whatsapp"
          label="Contact"
          isActive={false}
          onClick={() => window.open('https://wa.me/265997761194', '_blank')}
        />
        
        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <NavButton
            icon="fa-th-large"
            label="Dashboard"
            isActive={currentPage === Page.Dashboard}
            onClick={() => onNavigate(Page.Dashboard)}
          />
        </div>
      </div>
    </nav>
  );
};
