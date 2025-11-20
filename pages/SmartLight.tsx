import React, { useState } from 'react';

export const SmartLightPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeWatt, setActiveWatt] = useState('8 watt');
    const [activeMode, setActiveMode] = useState('Auto');
    const [intensity] = useState(80); // from 0 to 100

    const watts = ['8 watt', '9 watt', '12.5 watt', '17 watt'];
    const modes = [
        { name: 'Auto', icon: 'fa-magic' },
        { name: 'Cool', icon: 'fa-snowflake' },
        { name: 'Day', icon: 'fa-sun' },
        { name: 'Night', icon: 'fa-moon' },
    ];

    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * (270 / 360);
    const progress = (intensity / 100) * arcLength;

  return (
    <div className="p-6 pb-24 h-full flex flex-col max-w-3xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center active:scale-95 transition-transform duration-200">
            <i className="fas fa-chevron-left"></i>
        </button>
        <h1 className="text-xl font-bold">Smart Light</h1>
        <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center active:scale-95 transition-transform duration-200">
            <i className="fas fa-ellipsis-h"></i>
        </button>
      </header>

      <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1 mb-8">
        {watts.map(watt => (
            <button key={watt} onClick={() => setActiveWatt(watt)} className={`w-1/4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 ${activeWatt === watt ? 'bg-white dark:bg-black text-zinc-900 dark:text-white shadow' : 'text-zinc-500 dark:text-zinc-400'}`}>{watt}</button>
        ))}
      </div>

      <div className="flex-grow flex flex-col items-center">
        <p className="text-zinc-500 dark:text-zinc-400 mb-2">Controller</p>
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute w-full h-full" viewBox="0 0 200 200" transform="rotate(0)">
                <circle cx="100" cy="100" r={radius} fill="none" strokeWidth="16" strokeLinecap="round" pathLength={arcLength} strokeDasharray={arcLength} strokeDashoffset={0} transform="rotate(135 100 100)" className="stroke-zinc-100 dark:stroke-zinc-800" />
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#007aff" strokeWidth="16" strokeLinecap="round" pathLength={arcLength} strokeDasharray={`${progress} ${arcLength - progress}`} strokeDashoffset={0} transform="rotate(135 100 100)" />
            </svg>
            <div className="text-center z-10">
                <p className="text-5xl font-bold">{intensity}%</p>
                <p className="text-zinc-500 dark:text-zinc-400">light intensity</p>
            </div>
             <div className="absolute w-full flex justify-between bottom-8 px-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span>Min</span>
                <span>Max</span>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-4 w-full mt-4">
            {modes.map(mode => (
                 <div key={mode.name} onClick={() => setActiveMode(mode.name)} className={`p-3 rounded-2xl text-center cursor-pointer transition-all duration-200 active:scale-95 ${activeMode === mode.name ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'}`}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-white dark:bg-zinc-700">
                        <i className={`fas ${mode.icon} text-zinc-900 dark:text-white text-xl`}></i>
                    </div>
                    <p className="text-sm font-semibold">{mode.name}</p>
                </div>
            ))}
        </div>
      </div>
      
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-5 mt-8">
        <p className="font-bold mb-1">Power consumption</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">8 Watt Smart Light</p>
        <div className="flex justify-around text-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center"><i className="fas fa-bolt"></i></div>
                <div>
                    <p className="font-bold">5kWh</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Today</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center"><i className="fas fa-plug"></i></div>
                <div>
                    <p className="font-bold">120kWh</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">This month</p>
                </div>
            </div>
        </div>
      </div>

      <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 rounded-2xl mt-6 active:scale-95 transition-transform duration-200">Add new device</button>
    </div>
  );
};
