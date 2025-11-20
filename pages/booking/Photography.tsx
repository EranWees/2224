import React, { useState, useMemo } from 'react';
import { Page, PhotographyOrder } from '../../types';
import { useBooking } from '../../context/BookingContext';
import { SESSION_TYPES, SESSION_TIER_PICS, SESSION_PLUS_TIER_PICS, SESSION_TIER_PRICE, BASE_PRICE_PER_PICTURE, EXPRESS_SURCHARGE } from '../../constants';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export const PhotographyBookingPage: React.FC<Props> = ({ onComplete, onBack }) => {
  const { photographyOrder: order, setPhotographyOrder: setOrder } = useBooking();
  
  const STEPS = [{ number: 1, title: 'Session' }, { number: 2, title: 'Options' }, { number: 3, title: 'Summary' }];
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const costDetails = useMemo(() => {
    const { peopleCount, normalPictures, expressPictures } = order;
    
    let standardPicturesCost = 0;
    let tierInfo;

    if (normalPictures >= SESSION_PLUS_TIER_PICS) {
        tierInfo = { name: 'Session Plus', icon: 'fa-crown', color: 'text-yellow-400' };
        standardPicturesCost = SESSION_TIER_PRICE + (normalPictures - SESSION_TIER_PICS) * BASE_PRICE_PER_PICTURE;
    } else if (normalPictures >= SESSION_TIER_PICS) {
        tierInfo = { name: 'Session', icon: 'fa-star', color: 'text-amber-400' };
        standardPicturesCost = SESSION_TIER_PRICE + (normalPictures - SESSION_TIER_PICS) * BASE_PRICE_PER_PICTURE;
    } else {
        tierInfo = { name: 'Standard', icon: 'fa-image', color: 'text-blue-500' };
        standardPicturesCost = normalPictures * BASE_PRICE_PER_PICTURE;
    }
    
    if (normalPictures === SESSION_TIER_PICS) {
        standardPicturesCost = SESSION_TIER_PRICE;
    }

    const totalExpressPictures = Object.values(expressPictures).reduce((a: number, b: number) => a + b, 0);
    const expressPicturesCost = totalExpressPictures * BASE_PRICE_PER_PICTURE;

    let expressSurchargeTotal = 0;
    const surchargeKeys = Object.keys(expressPictures) as Array<keyof typeof EXPRESS_SURCHARGE>;
    for (const key of surchargeKeys) {
        expressSurchargeTotal += expressPictures[key] * EXPRESS_SURCHARGE[key];
    }
    
    const totalPictures = normalPictures + totalExpressPictures;
    const sessionFee = SESSION_TYPES[peopleCount].fee;

    if (totalPictures === 0) {
      return { 
        total: sessionFee, sessionFee: sessionFee, standardPicturesCost: 0, expressPicturesCost: 0, 
        expressSurchargeTotal: 0, tierInfo: { name: 'Standard', icon: 'fa-image', color: 'text-blue-500' }, 
        totalExpressPictures: 0, totalPictures: 0
      };
    }
    
    const total = sessionFee + standardPicturesCost + expressPicturesCost + expressSurchargeTotal;

    return { total, sessionFee, standardPicturesCost, expressPicturesCost, expressSurchargeTotal, tierInfo, totalExpressPictures, totalPictures };
  }, [order]);

  const displayTotal = useMemo(() => {
    const { total, sessionFee } = costDetails;
    if (currentStep < 3) {
        return total - sessionFee;
    }
    return total;
  }, [costDetails, currentStep]);

  const handleConfirm = () => {
    setShowConfirmModal(false);
    if (costDetails.total <= 0) {
        onComplete();
        return;
    }
    setShowSuccess(true);
    setTimeout(() => {
        onComplete();
    }, 1500);
  };

  const QuantityControl = ({ value, onIncrease, onDecrease }: { value: number, onIncrease: () => void, onDecrease: () => void }) => (
    <div className="flex items-center gap-3">
        <button onClick={onDecrease} className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-[#2C2C2E] flex items-center justify-center text-xl hover:bg-zinc-300 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95">-</button>
        <span className="text-lg font-semibold w-8 text-center">{value}</span>
        <button onClick={onIncrease} className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-[#2C2C2E] flex items-center justify-center text-xl hover:bg-zinc-300 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95">+</button>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="animate-fadeInUp">
            <h2 className="text-2xl font-bold text-center mb-2">Number of People</h2>
            <p className="text-zinc-500 dark:text-gray-400 text-center mb-6">Choose the number of people for the photoshoot.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(Object.values(SESSION_TYPES) as { type: '1-2'|'3-7', icon: string, title: string, fee: number }[]).map(session => (
                    <div 
                        key={session.type} 
                        onClick={() => setOrder(prev => ({...prev, peopleCount: session.type }))}
                        className={`bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 text-center border-4 transition-all duration-200 cursor-pointer w-full shadow-lg transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center h-48 ${order.peopleCount === session.type ? 'border-blue-500' : 'border-transparent'}`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${order.peopleCount === session.type ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                            <i className={`fas ${session.icon} text-3xl`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{session.title}</h3>
                        <p className="text-sm text-zinc-500 dark:text-gray-400">Base Fee: K{session.fee.toLocaleString()}</p>
                        {order.peopleCount === session.type && <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white ring-4 ring-white/50"><i className="fas fa-check"></i></div>}
                    </div>
                ))}
            </div>
        </div>;
      case 2:
        const expressOptions = [
            { key: '24hrs' as const, label: '24hrs Delivery', icon: 'fa-clock' },
            { key: '12hrs' as const, label: '12hrs Delivery', icon: 'fa-stopwatch' },
            { key: '6hrs' as const, label: '6hrs Delivery', icon: 'fa-running' },
        ];
        let progress = 0;
        let nextTierText = '';
        if (order.normalPictures < SESSION_TIER_PICS) {
          progress = (order.normalPictures / SESSION_TIER_PICS) * 100;
          const remaining = SESSION_TIER_PICS - order.normalPictures;
          nextTierText = `Add ${remaining} more photo${remaining > 1 ? 's' : ''} for the 'Session' discount!`;
        } else if (order.normalPictures < SESSION_PLUS_TIER_PICS) {
          progress = ((order.normalPictures - SESSION_TIER_PICS) / (SESSION_PLUS_TIER_PICS - SESSION_TIER_PICS)) * 100;
          const remaining = SESSION_PLUS_TIER_PICS - order.normalPictures;
          nextTierText = `Add ${remaining} more photo${remaining > 1 ? 's' : ''} to unlock 'Session Plus'!`;
        } else {
          progress = 100;
          nextTierText = "You've unlocked the top tier package!";
        }
        
        const optionsSubtotal = costDetails.standardPicturesCost + costDetails.expressPicturesCost + costDetails.expressSurchargeTotal;

        return <div className="animate-fadeInUp space-y-6">
            <h2 className="text-2xl font-bold text-center mb-2">Build Your Package</h2>
            <p className="text-zinc-500 dark:text-gray-400 text-center mb-6">Add standard or express photos to your session.</p>

            { (optionsSubtotal > 0) && (
                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 text-center shadow-lg animate-fadeInUp">
                    <p className="text-sm text-zinc-500 dark:text-gray-400">Added to your quote (session fee will be added in summary):</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">K{optionsSubtotal.toLocaleString()}</p>
                </div>
            )}
            
            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className={`font-bold text-lg flex items-center gap-2 ${costDetails.tierInfo.color}`}>
                            <i className={`fas ${costDetails.tierInfo.icon}`}></i>
                            {costDetails.tierInfo.name}
                        </h3>
                        <span className="text-sm text-zinc-500 dark:text-gray-400">
                          {order.normalPictures >= SESSION_TIER_PICS ? `${order.normalPictures} photos included` : `K${BASE_PRICE_PER_PICTURE.toLocaleString()} per photo`}
                        </span>
                    </div>
                    <QuantityControl value={order.normalPictures} onIncrease={() => setOrder(p => ({...p, normalPictures: p.normalPictures + 1}))} onDecrease={() => setOrder(p => ({...p, normalPictures: Math.max(0, p.normalPictures - 1)}))} />
                </div>
                {order.normalPictures < SESSION_PLUS_TIER_PICS && (
                  <div className="mt-4">
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-gray-400 mt-2 text-center">{nextTierText}</p>
                  </div>
                )}
            </div>

            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <i className="fas fa-rocket text-purple-500"></i>
                    Express Delivery
                  </h3>
                  <div className="space-y-3">
                    {expressOptions.map(opt => (
                        <div key={opt.key} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg">
                            <div>
                                <i className={`fas ${opt.icon} mr-3 text-purple-400 w-5 text-center`}></i>
                                <span className="font-semibold">{opt.label}</span>
                                <span className="text-xs text-zinc-500 dark:text-gray-400 ml-2">(+K{EXPRESS_SURCHARGE[opt.key].toLocaleString()})</span>
                            </div>
                            <QuantityControl 
                                value={order.expressPictures[opt.key]} 
                                onIncrease={() => setOrder(p => ({...p, expressPictures: {...p.expressPictures, [opt.key]: p.expressPictures[opt.key] + 1 }}))} 
                                onDecrease={() => setOrder(p => ({...p, expressPictures: {...p.expressPictures, [opt.key]: Math.max(0, p.expressPictures[opt.key] - 1) }}))} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>;
      case 3:
        const { total, sessionFee, standardPicturesCost, expressPicturesCost, expressSurchargeTotal, tierInfo, totalExpressPictures, totalPictures } = costDetails;
        const expressKeys = Object.keys(order.expressPictures) as Array<keyof typeof EXPRESS_SURCHARGE>;

        if (totalPictures === 0) {
            return (
                <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-lg animate-fadeInUp">
                    <h3 className="text-2xl font-bold text-center mb-5">Order Summary</h3>
                    <div className="space-y-3 text-zinc-600 dark:text-gray-300">
                          <div className="flex justify-between">
                            <span>Session Fee ({order.peopleCount} People)</span>
                            <span className="font-semibold text-zinc-900 dark:text-white">K{sessionFee.toLocaleString()}</span>
                          </div>
                    </div>
                    <div className="flex justify-between text-xl font-bold mt-5 pt-5 border-t-2 border-zinc-200 dark:border-gray-700">
                        <span>Grand Total:</span><span>K{total.toLocaleString()}</span>
                    </div>
                </div>
            );
        }
        
        return <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-lg animate-fadeInUp">
            <h3 className="text-2xl font-bold text-center mb-5">Order Summary</h3>
            <div className="space-y-3 text-zinc-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Session Fee ({order.peopleCount} People)</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">K{sessionFee.toLocaleString()}</span>
                  </div>
                  {standardPicturesCost > 0 &&
                    <div className="flex justify-between">
                        <span>{tierInfo.name} ({order.normalPictures} Photos)</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">K{standardPicturesCost.toLocaleString()}</span>
                    </div>
                  }
                  {expressPicturesCost > 0 && 
                    <div className="flex justify-between">
                        <span>{totalExpressPictures} Express Photos (@ K{BASE_PRICE_PER_PICTURE.toLocaleString()})</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">K{expressPicturesCost.toLocaleString()}</span>
                    </div>
                  }
                  {expressSurchargeTotal > 0 && 
                    <div className="flex justify-between pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <span>Express Surcharges</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">K{expressSurchargeTotal.toLocaleString()}</span>
                    </div>
                  }
                  {expressKeys.map(key => (
                    order.expressPictures[key] > 0 && (
                        <div key={key} className="flex justify-between text-sm pl-4 text-zinc-500 dark:text-gray-400">
                            <span>- {key} Express ({order.expressPictures[key]})</span>
                            <span>K{(order.expressPictures[key] * EXPRESS_SURCHARGE[key]).toLocaleString()}</span>
                        </div>
                    )
                  ))}
            </div>
            <div className="flex justify-between text-xl font-bold mt-5 pt-5 border-t-2 border-zinc-200 dark:border-gray-700">
                <span>Grand Total:</span><span>K{total.toLocaleString()}</span>
            </div>
        </div>;
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center pb-24 mx-auto">
        {showConfirmModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn-overlay">
              <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-8 flex flex-col items-center gap-6 animate-scaleIn w-full max-w-sm mx-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white text-center">Final Confirmation</h2>
                <p className="text-zinc-600 dark:text-gray-300 text-center">Add this photography package to your quote?</p>
                <div className="flex justify-between w-full gap-4">
                    <button 
                        onClick={() => setShowConfirmModal(false)}
                        className="w-full px-6 py-3 rounded-xl font-semibold bg-zinc-200 dark:bg-[#2C2C2E] hover:bg-zinc-300 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95"
                    >
                        Go Back
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className="w-full px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-95"
                    >
                        Yes, Add
                    </button>
                </div>
              </div>
            </div>
        )}
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
        
        <div className="relative w-full flex items-center justify-center mb-6 text-center">
            <button 
                onClick={onBack} 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-zinc-800 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95"
                aria-label="Go back"
            >
                <i className="fas fa-arrow-left text-lg"></i>
            </button>
            <div>
                <h1 className="text-3xl font-bold text-zinc-800 dark:text-gray-100">Photography</h1>
                <p className="text-zinc-500 dark:text-gray-400">Customize your session</p>
            </div>
        </div>
        
        <div className="w-full flex items-center justify-center mb-10 px-4">
            {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.number;
                const isActive = currentStep === step.number;
                return (
                    <React.Fragment key={step.number}>
                        <div 
                            className="flex flex-col items-center text-center cursor-pointer group"
                            onClick={() => setCurrentStep(step.number)}
                        >
                            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-in-out
                                ${isActive ? 'bg-white dark:bg-zinc-800 border-blue-600 scale-110 shadow-lg shadow-blue-500/30 animate-pulse-ring' : ''}
                                ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' : ''}
                                ${!isActive && !isCompleted ? 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 group-hover:border-blue-400' : ''}
                            `}>
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${isCompleted ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out transform ${isCompleted ? 'scale-0' : 'scale-100'}`}>
                                    <span className={`font-bold ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-zinc-500 dark:text-zinc-400'}`}>{step.number}</span>
                                </div>
                            </div>
                            <p className={`mt-2 text-sm font-semibold text-center transition-colors duration-300 ${
                                isActive || isCompleted ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400'
                            }`}>{step.title}</p>
                        </div>

                        {index < STEPS.length - 1 && (
                            <div className="flex-1 h-1 mx-2 sm:mx-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden relative">
                               <div 
                                    className={`absolute top-0 left-0 h-full bg-blue-600 transition-all duration-700 ease-out`} 
                                    style={{ width: currentStep > step.number ? '100%' : '0%' }}
                                ></div>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>

        <div className="w-full min-h-[300px]">{renderStepContent()}</div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-sm border-t border-zinc-200 dark:border-gray-700 flex justify-between items-center z-40 lg:hidden">
            <div className="font-bold text-lg">Total: K{displayTotal.toLocaleString()}</div>
            <div className="flex items-center gap-3">
                {currentStep > 1 && <button onClick={() => setCurrentStep(s => s - 1)} className="px-6 py-3 rounded-xl font-semibold bg-zinc-200 dark:bg-[#2C2C2E] hover:bg-zinc-300 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95">Back</button>}
                <button onClick={currentStep === 3 ? () => setShowConfirmModal(true) : () => setCurrentStep(s => s + 1)} className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-95">
                    {currentStep === 3 ? 'Confirm' : 'Next'}
                </button>
            </div>
        </div>
        
        {/* Desktop Footer Control */}
        <div className="w-full mt-8 hidden lg:flex justify-between items-center p-4 bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700">
             <div className="font-bold text-2xl">Total: K{displayTotal.toLocaleString()}</div>
             <div className="flex items-center gap-4">
                {currentStep > 1 && <button onClick={() => setCurrentStep(s => s - 1)} className="px-6 py-3 rounded-xl font-semibold bg-zinc-200 dark:bg-[#2C2C2E] hover:bg-zinc-300 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95">Back</button>}
                <button onClick={currentStep === 3 ? () => setShowConfirmModal(true) : () => setCurrentStep(s => s + 1)} className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-95 text-lg">
                    {currentStep === 3 ? 'Confirm' : 'Next'}
                </button>
            </div>
        </div>
    </div>
  );
};