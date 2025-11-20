import React from 'react';
import { Page } from '../../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-50 dark:bg-[#1C1C1E] text-zinc-900 dark:text-white py-12 px-4 sm:px-8 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 p-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors duration-300">
              <img src="https://i.ibb.co/vvrSRLvz/Eran-logo-l.png" alt="Eran Studio Logo" className="w-full h-full object-contain"/>
            </div>
            <h2 className="text-xl font-bold">Eran Studio</h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">
            Capturing life's most beautiful and emotive moments. We bring heart, vision, and soul into every photograph, reel, and canvas we create.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate(Page.Home)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 active:scale-95">Home</button></li>
            <li><button onClick={() => onNavigate(Page.Services)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 active:scale-95">Services</button></li>
            <li><button onClick={() => onNavigate(Page.About)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 active:scale-95">About Us</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <ul className="space-y-2 text-zinc-500 dark:text-zinc-400">
            <li className="flex items-center gap-2">
              <i className="fas fa-envelope w-4 text-center"></i>
              <a href="mailto:eranwees@gmail.com" className="hover:text-zinc-900 dark:hover:text-white transition-colors">eranwees@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <i className="fab fa-whatsapp w-4 text-center"></i>
              <a href="https://wa.me/265997761194" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">+265 997 761 194</a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://Facebook.com/eranwees" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 active:scale-95"><i className="fab fa-facebook-f text-xl"></i></a>
            <a href="https://www.instagram.com/eran_wees?igsh=MWNsenJ0dWtxYW5ybg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 active:scale-95"><i className="fab fa-instagram text-xl"></i></a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center text-zinc-500 dark:text-zinc-500 transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} Eran Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
