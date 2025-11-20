import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Shimmer } from '../components/UI/Shimmer';

export const Dashboard: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [devices, setDevices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const initialDevices = [
        { id: '1', name: 'Smart Light', details: '4 Lamps', icon: 'fa-lightbulb', on: true, page: Page.SmartLight },
        { id: '2', name: 'Smart AC', details: '2 Device', icon: 'fa-fan', on: false, page: Page.Dashboard },
        { id: '3', name: 'Smart TV', details: '1 Device', icon: 'fa-tv', on: false, page: Page.Dashboard },
        { id: '4', name: 'Smart Speaker', details: '2 Device', icon: 'fa-volume-high', on: false, page: Page.Dashboard },
    ];

    const DeviceCard = ({ device, onToggle, onNavigate }: any) => {
        const isClickable = device.page !== Page.Dashboard;
        return (
            <div 
                onClick={() => isClickable && onNavigate(device.page)}
                className={`rounded-3xl p-4 flex flex-col justify-between h-36 cursor-pointer transition-all duration-200 active:scale-95 ${device.on ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow'}`}
            >
                <div className="flex justify-between items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${device.on ? 'bg-blue-500' : 'bg-zinc-100 dark:bg-zinc-700'}`}>
                        <i className={`fas ${device.icon} ${device.on ? 'text-white' : 'text-zinc-900 dark:text-white'}`}></i>
                    </div>
                     <div 
                        onClick={(e) => { e.stopPropagation(); onToggle(device.id); }}
                        className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${device.on ? 'bg-blue-500' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                     >
                        <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white transition-transform ${device.on ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-md">{device.name}</p>
                    <p className={`text-sm ${device.on ? 'text-blue-200' : 'text-zinc-500 dark:text-zinc-400'}`}>{device.details}</p>
                </div>
            </div>
        );
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDevices(initialDevices);
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleToggle = (id: string) => {
        setDevices(prev => prev.map(d => d.id === id ? {...d, on: !d.on} : d));
    };

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hello, Rocky</h1>
        </div>
        <div className="relative">
          <i className="fas fa-bell text-2xl"></i>
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </header>
      
      {isLoading ? (
        <div className="bg-white dark:bg-black rounded-3xl p-5 mb-6 shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <Shimmer className="h-10 w-24 rounded mb-2" />
                    <Shimmer className="h-4 w-32 rounded" />
                </div>
                <Shimmer className="w-10 h-10 rounded-lg" />
            </div>
            <Shimmer className="h-6 w-20 rounded mb-4" />
            <div className="flex justify-between text-center text-sm border-t border-zinc-200 dark:border-zinc-700 pt-4 mt-4">
                 <div className="w-full"><Shimmer className="h-10 w-full rounded" /></div>
            </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-black text-zinc-900 dark:text-white rounded-3xl p-5 mb-6 shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-4xl font-bold">18°C</p>
                    <p className="text-zinc-500 dark:text-zinc-400">Tue, February 07</p>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-cloud-sun text-4xl text-blue-400"></i>
                </div>
            </div>
            <p className="font-semibold text-lg mb-4">Cloudy</p>
            <div className="flex justify-between text-center text-sm border-t border-zinc-200 dark:border-zinc-700 pt-4">
                <div>
                    <p className="font-bold">23°C</p>
                    <p className="text-zinc-500 dark:text-zinc-400">Indoor temp</p>
                </div>
                <div>
                    <p className="font-bold">40%</p>
                    <p className="text-zinc-500 dark:text-zinc-400">Humidity</p>
                </div>
                <div>
                    <p className="font-bold">Good</p>
                    <p className="text-zinc-500 dark:text-zinc-400">Air Quality</p>
                </div>
            </div>
        </div>
      )}
      
      <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1 mb-6">
        <button className="w-1/2 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 font-semibold transition-transform duration-200 active:scale-95">Room</button>
        <button className="w-1/2 py-2 rounded-lg bg-white dark:bg-black text-zinc-900 dark:text-white font-semibold shadow transition-transform duration-200 active:scale-95">Devices</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
                <Shimmer key={index} className="h-36 rounded-3xl" />
            ))
        ) : (
            devices.map(device => (
                <DeviceCard key={device.id} device={device} onToggle={handleToggle} onNavigate={onNavigate} />
            ))
        )}
      </div>
    </div>
  );
};
