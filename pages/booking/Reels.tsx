import React, { useState, useMemo } from 'react';
import { REELS_PRICING } from '../../constants';
import { useBooking } from '../../context/BookingContext';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export const ReelsBookingPage: React.FC<Props> = ({ onComplete, onBack }) => {
  const { reelsOrder: order, setReelsOrder: setOrder } = useBooking();
  const [showSuccess, setShowSuccess] = useState(false);

  const total = useMemo(() => {
    let currentTotal = 0;
    if (order.basic) currentTotal += REELS_PRICING.basic.price;
    if (order.standard) currentTotal += REELS_PRICING.standard.price;
    if (order.premium) currentTotal += REELS_PRICING.premium.price;
    return currentTotal;
  }, [order]);
  
  const handleSelect = (packageName: keyof typeof order) => {
    setOrder(prev => ({...prev, [packageName]: !prev[packageName]}));
  };
  
  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
        onComplete();
    }, 1500);
  };

  const hasSelection = total > 0;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn-overlay">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-8 flex flex-col items-center gap-4 animate-scaleIn">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl animate-checkmark-pop">
                <i className="fas fa-check"></i>
              </div>
              <p className="text-xl font-semibold text-zinc-900 dark:text-white">Order Added!</p>
            </div>
          </div>
      )}
      <div className="relative w-full flex items-center justify-center mb-8 text-center max-w-2xl">
          <button 
              onClick={onBack} 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-zinc-800 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95"
              aria-label="Go back"
          >
              <i className="fas fa-arrow-left text-lg"></i>
          </button>
          <div>
              <h1 className="text-3xl font-bold text-zinc-800 dark:text-gray-100">Reels Service</h1>
              <p className="text-zinc-500 dark:text-gray-400">Choose the package that fits your needs</p>
          </div>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(Object.keys(REELS_PRICING) as Array<keyof typeof REELS_PRICING>).map(key => {
          const pkg = REELS_PRICING[key];
          const isSelected = order[key];
          return (
            <div key={key} onClick={() => handleSelect(key)} className={`rounded-2xl p-6 shadow-lg transition-all duration-200 cursor-pointer border-2 flex flex-col active:scale-95 ${isSelected ? 'bg-blue-600 text-white border-blue-500' : 'bg-white dark:bg-[#1C1C1E] border-transparent hover:bg-zinc-100 dark:hover:bg-[#2C2C2E]'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{pkg.title}</h3>
                <span className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>K{pkg.price.toLocaleString()}</span>
              </div>
              <p className={`text-sm mb-4 ${isSelected ? 'text-blue-200' : 'text-zinc-500 dark:text-gray-400'}`}><i className="fas fa-clock mr-2"></i>{pkg.details}</p>
              <ul className={`space-y-1 mb-4 text-left text-sm flex-grow ${isSelected ? 'text-blue-100' : 'text-zinc-600 dark:text-gray-300'}`}>
                  {pkg.features.map((feat, i) => <li key={i}><i className={`fas fa-check mr-2 ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}></i>{feat}</li>)}
              </ul>
            </div>
          );
        })}
      </div>

      {hasSelection && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-200 dark:border-gray-700 flex justify-center items-center z-40 lg:hidden">
            <div className="bg-zinc-100 dark:bg-[#1C1C1E] rounded-xl p-2 w-full max-w-md flex justify-between items-center">
                <div className="font-bold text-lg pl-4">Total: K{total.toLocaleString()}</div>
                <button onClick={handleConfirm} className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-95">
                    Confirm
                </button>
            </div>
        </div>
      )}

      {hasSelection && (
         <div className="w-full max-w-6xl mt-8 hidden lg:flex flex-col items-center">
            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 flex justify-between items-center w-full max-w-sm shadow-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-2xl font-bold">Total: K{total.toLocaleString()}</span>
                 <button onClick={handleConfirm} className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 text-lg active:scale-95">
                    Confirm Order
                </button>
            </div>
         </div>
      )}
    </div>
  );
};
