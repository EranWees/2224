import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 animate-fadeInUp">
      <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
        <img src="https://i.ibb.co/WWstFCM4/IMG-9039.jpg" alt="Eran Studio Photography" className="w-full h-auto object-cover" />
      </div>
      <div className="w-full lg:w-1/2 bg-white dark:bg-[#1C1C1E] rounded-2xl p-8 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">About Us</h1>
        <p className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-6">Beautiful & Emotive</p>
        <div className="text-left space-y-4 text-zinc-600 dark:text-gray-300">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Our Approach: Capturing Soul & Story</h2>
            <p className="leading-relaxed">
              At Eran Studio, every frame tells a story. We bring heart, vision, and soul into every photograph, reel, and canvas we create. With years of experience behind the lens, we are drawn to the moments that feel natural, raw, and full of life — from quiet, intimate emotions to the vibrant energy of a lively scene.
            </p>
            <p className="leading-relaxed">
              We capture the full story of your experience so that it feels effortless, genuine, and true to you. Our work balances beautifully composed, editorial styling with authentic moments that reflect the real you.
            </p>
        </div>
      </div>
    </div>
  );
};
