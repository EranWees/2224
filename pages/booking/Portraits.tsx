import React, { useState, useMemo } from 'react';
import { PORTRAITS_PRICING } from '../../constants';
import { useBooking } from '../../context/BookingContext';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export const PortraitsBookingPage: React.FC<Props> = ({ onComplete, onBack }) => {
  const { portraitsOrder: order, setPortraitsOrder: setOrder } = useBooking();
  const [showSuccess, setShowSuccess] = useState(false);

  const QuantityControl = ({ value, onIncrease, onDecrease }: { value: number, onIncrease: () => void, onDecrease: () => void }) => (
      <div className="flex items-center justify-between w-full bg-zinc-200 dark:bg-[#2C2C2E] rounded-full p-1">
          <button onClick={onDecrease} className="w-9 h-9 rounded-full bg-zinc-300 dark:bg-gray-700 flex items-center justify-center text-xl hover:bg-zinc-400 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95">-</button>
          <span className="text-lg font-semibold w-8 text-center">{value}</span>
          <button onClick={onIncrease} className="w-9 h-9 rounded-full bg-zinc-300 dark:bg-gray-700 flex items-center justify-center text-xl hover:bg-zinc-400 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95">+</button>
      </div>
  );

  const total = useMemo(() => {
    const keys = Object.keys(order) as Array<keyof typeof PORTRAITS_PRICING>;
    return keys.reduce((acc, key) => {
      return acc + order[key].quantity * PORTRAITS_PRICING[key].price;
    }, 0);
  }, [order]);

  const handleQuantityChange = (size: keyof typeof order, change: number) => {
    setOrder(prev => ({
      ...prev,
      [size]: { quantity: Math.max(0, prev[size].quantity + change) }
    }));
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
        onComplete();
    }, 1500);
  };

  const hasSelection = total > 0;

  return (
    <div className="w-full max-w-5xl flex flex-col items-center pb-24 mx-auto">
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
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-gray-100">Portraits (Canvas)</h1>
            <p className="text-zinc-500 dark:text-gray-400">Choose the canvas size for your portrait</p>
          </div>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(Object.keys(PORTRAITS_PRICING) as Array<keyof typeof PORTRAITS_PRICING>).map(key => {
          const item = PORTRAITS_PRICING[key];
          const currentOrder = order[key];
          return (
            <div key={key} className={`bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 shadow-lg flex flex-col transition-all duration-200 border-2 ${currentOrder.quantity > 0 ? 'border-blue-500' : 'border-transparent'}`}>
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
                  <img src={item.img} alt={`${item.title} Portrait`} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-gray-400 mb-2">{item.dimensions}</p>
                <p className="text-xl font-bold mb-4">K{item.price.toLocaleString()}</p>
              </div>
              <div className="mt-auto">
                <QuantityControl 
                    value={currentOrder.quantity}
                    onIncrease={() => handleQuantityChange(key, 1)}
                    onDecrease={() => handleQuantityChange(key, -1)}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {hasSelection && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-sm border-t border-zinc-200 dark:border-gray-700 flex justify-between items-center z-40 lg:hidden">
           <div className="font-bold text-lg">Total: K{total.toLocaleString()}</div>
           <button onClick={handleConfirm} className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-95">
              Confirm
           </button>
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
