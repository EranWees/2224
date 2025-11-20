import React from 'react';
import { Page } from '../types';

export const WelcomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div 
      className="w-full h-screen flex flex-col items-center justify-center text-center p-4 bg-cover bg-center relative" 
      style={{ backgroundImage: "url('https://i.ibb.co/TDsNtq2Z/Back.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-32 h-32 p-3 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl mb-6">
          <img 
            src="https://i.ibb.co/vvrSRLvz/Eran-logo-l.png" 
            alt="Eran Studio Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-wider mb-2">
          Eran Studio
        </h1>
        <p className="text-lg text-gray-200 mb-10">
          Beautiful & Emotive
        </p>
        
        <button
          onClick={() => onNavigate(Page.Home)}
          className="bg-blue-600 text-white text-lg font-semibold w-full max-w-xs py-4 rounded-xl shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95"
        >
          Enter Studio
        </button>
      </div>
    </div>
  );
};
