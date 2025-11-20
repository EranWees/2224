import React, { useState, useMemo } from 'react';
import { Page } from '../types';
import { useBooking } from '../context/BookingContext';
import { SESSION_TYPES, SESSION_TIER_PICS, SESSION_TIER_PRICE, BASE_PRICE_PER_PICTURE, EXPRESS_SURCHARGE, REELS_PRICING, PORTRAITS_PRICING } from '../constants';

interface Props {
  onNavigate: (page: Page) => void;
}

export const ServicesPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { completedServices, photographyOrder, reelsOrder, portraitsOrder } = useBooking();

  const calculateTotals = useMemo(() => {
    let photographyTotal = 0;
    
    if (completedServices.includes('photography')) {
        const { peopleCount, normalPictures, expressPictures } = photographyOrder;
        const totalExpressPictures = Object.values(expressPictures).reduce((a: number, b: number) => a + b, 0);
        const totalPictures = normalPictures + totalExpressPictures;

        if (totalPictures > 0) {
            const sessionFee = SESSION_TYPES[peopleCount].fee;
            let standardPicturesCost = 0;
            if (normalPictures >= SESSION_TIER_PICS) {
                standardPicturesCost = SESSION_TIER_PRICE + (normalPictures - SESSION_TIER_PICS) * BASE_PRICE_PER_PICTURE;
            } else {
                standardPicturesCost = normalPictures * BASE_PRICE_PER_PICTURE;
            }
            if (normalPictures === SESSION_TIER_PICS) standardPicturesCost = SESSION_TIER_PRICE;
            const expressPicturesCost = totalExpressPictures * BASE_PRICE_PER_PICTURE;
            const expressSurchargeTotal = (Object.keys(expressPictures) as Array<keyof typeof EXPRESS_SURCHARGE>).reduce((total: number, key) => {
              return total + expressPictures[key] * EXPRESS_SURCHARGE[key];
            }, 0);
            
            photographyTotal = sessionFee + standardPicturesCost + expressPicturesCost + expressSurchargeTotal;
        } else {
             photographyTotal = SESSION_TYPES[peopleCount].fee;
        }
    }

    let reelsTotal = 0;
    if (completedServices.includes('reels')) {
      if (reelsOrder.basic) reelsTotal += REELS_PRICING.basic.price;
      if (reelsOrder.standard) reelsTotal += REELS_PRICING.standard.price;
      if (reelsOrder.premium) reelsTotal += REELS_PRICING.premium.price;
    }

    let portraitsTotal = 0;
    if (completedServices.includes('portraits')) {
      const pKeys = Object.keys(portraitsOrder) as Array<keyof typeof PORTRAITS_PRICING>;
      portraitsTotal = pKeys.reduce((acc, key) => acc + portraitsOrder[key].quantity * PORTRAITS_PRICING[key].price, 0);
    }
    
    const grandTotal = photographyTotal + reelsTotal + portraitsTotal;
    return { photographyTotal, reelsTotal, portraitsTotal, grandTotal };
  }, [completedServices, photographyOrder, reelsOrder, portraitsOrder]);

  const { photographyTotal, reelsTotal, portraitsTotal, grandTotal } = calculateTotals;

  const generateWhatsAppMessage = () => {
    let message = `Hello Eran Studio! I'm interested in multiple services.%0A%0A*Complete Order Details:*%0A%0A`;
    if (grandTotal === 0) {
        return `Hello Eran Studio! I'm interested in your services.`;
    }

    if (photographyTotal > 0) {
      const { peopleCount, normalPictures, expressPictures } = photographyOrder;
      message += `*Photography (${peopleCount} People):*%0A`;
      if (normalPictures > 0) {
        let tierName = 'Standard';
        if (normalPictures >= 25) tierName = 'Session Plus';
        else if (normalPictures >= 10) tierName = 'Session';
        message += `- ${tierName} Package (${normalPictures} photos)%0A`;
      }
      const totalExpress = Object.values(expressPictures).reduce((a: number, b: number) => a + b, 0);
      if (totalExpress > 0) {
        message += `- ${totalExpress} Express Photos%0A`;
      }
      message += `Subtotal: K${photographyTotal.toLocaleString()}%0A%0A`;
    }

    if (reelsTotal > 0) {
      message += `*Reels:*%0A`;
      if (reelsOrder.basic) message += `- Basic Reel: K${REELS_PRICING.basic.price.toLocaleString()}%0A`;
      if (reelsOrder.standard) message += `- Standard Reel: K${REELS_PRICING.standard.price.toLocaleString()}%0A`;
      if (reelsOrder.premium) message += `- Premium Reel: K${REELS_PRICING.premium.price.toLocaleString()}%0A`;
      message += `Subtotal: K${reelsTotal.toLocaleString()}%0A%0A`;
    }

    if (portraitsTotal > 0) {
      message += `*Portraits:*%0A`;
      const { a3, a2, a1, a0 } = portraitsOrder;
      if (a3.quantity > 0) message += `- ${a3.quantity} x A3 Canvas: K${(a3.quantity * PORTRAITS_PRICING.a3.price).toLocaleString()}%0A`;
      if (a2.quantity > 0) message += `- ${a2.quantity} x A2 Canvas: K${(a2.quantity * PORTRAITS_PRICING.a2.price).toLocaleString()}%0A`;
      if (a1.quantity > 0) message += `- ${a1.quantity} x A1 Canvas: K${(a1.quantity * PORTRAITS_PRICING.a1.price).toLocaleString()}%0A`;
      if (a0.quantity > 0) message += `- ${a0.quantity} x A0 Canvas: K${(a0.quantity * PORTRAITS_PRICING.a0.price).toLocaleString()}%0A`;
      message += `Subtotal: K${portraitsTotal.toLocaleString()}%0A%0A`;
    }
    
    message += `*Grand Total: K${grandTotal.toLocaleString()}*%0A%0A`;
    message += `Please let me know the next steps to book these services.`;
    return message;
  };

  const sendOverallQuote = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/265997761194?text=${message}`, '_blank');
  };

  const ServiceCard = ({ icon, title, description, imgSrc, onClick, isSelected, style }: any) => (
    <div
      onClick={onClick}
      className="relative rounded-3xl w-full h-40 max-w-md cursor-pointer transition-all duration-200 overflow-hidden shadow-lg transform hover:scale-105 active:scale-95"
      style={style}
    >
      <img src={imgSrc} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20"></div>
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <div className="flex items-center gap-4 mb-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600' : 'bg-white/10'}`}>
                  <i className={`fas ${icon} text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className={`text-sm transition-colors text-white/80`}>{description}</p>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4 text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center animate-checkmark-pop">
          <i className="fas fa-check"></i>
        </div>
      )}
    </div>
  );

  const services = [
      { page: Page.Photography, key: 'photography', icon: 'fa-camera', title: 'Photography', description: 'Professional photo sessions', imgSrc: 'https://i.ibb.co/WWstFCM4/IMG-9039.jpg' },
      { page: Page.Reels, key: 'reels', icon: 'fa-film', title: 'Reels', description: 'Creative video content', imgSrc: 'https://i.ibb.co/BHJYVJL3/IMG-9015.jpg' },
      { page: Page.Portraits, key: 'portraits', icon: 'fa-palette', title: 'Portraits (Canvas)', description: 'Beautiful portrait artwork', imgSrc: 'https://i.ibb.co/Qvz8Z35h/IMG-9619.jpg' },
  ];

  const filteredServices = services.filter(service =>
    activeFilter === 'all' || service.key === activeFilter
  );
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-left w-full mb-4">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-gray-100">Our Services</h1>
        <p className="text-zinc-500 dark:text-gray-400">Tap a service to customize your quote.</p>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'photography', 'reels', 'portraits'].map(filter => (
            <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap active:scale-95 capitalize ${
                    activeFilter === filter
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
                {filter}
            </button>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="w-full lg:flex-1 flex flex-col gap-5">
            {filteredServices.map((service, index) => (
            <ServiceCard
                key={service.key}
                icon={service.icon}
                title={service.title}
                description={service.description}
                imgSrc={service.imgSrc}
                onClick={() => onNavigate(service.page)}
                isSelected={completedServices.includes(service.key)}
                style={{ animation: `fadeInUp 0.5s ${index * 100}ms ease-out forwards`, opacity: 0 }}
            />
            ))}
        </div>

        <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
            {completedServices.length > 0 && (
            <div className="w-full animate-fadeInUp" style={{animationDelay: '300ms', opacity: 0}}>
                <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-lg text-left border border-zinc-100 dark:border-zinc-800">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-5 text-center">Quote Summary</h2>
                <div className="space-y-4">
                    {photographyTotal > 0 && <div className="flex justify-between items-center text-zinc-600 dark:text-gray-300"><span><i className="fas fa-camera mr-3 text-blue-500 dark:text-blue-400"></i>Photography</span><span className="font-semibold">K{photographyTotal.toLocaleString()}</span></div>}
                    {reelsTotal > 0 && <div className="flex justify-between items-center text-zinc-600 dark:text-gray-300"><span><i className="fas fa-film mr-3 text-blue-500 dark:text-blue-400"></i>Reels</span><span className="font-semibold">K{reelsTotal.toLocaleString()}</span></div>}
                    {portraitsTotal > 0 && <div className="flex justify-between items-center text-zinc-600 dark:text-gray-300"><span><i className="fas fa-palette mr-3 text-blue-500 dark:text-blue-400"></i>Portraits</span><span className="font-semibold">K{portraitsTotal.toLocaleString()}</span></div>}
                </div>
                <div className="flex justify-between mt-6 text-xl font-bold border-t-2 border-zinc-200 dark:border-gray-700 pt-4">
                    <span>Total:</span>
                    <span>K{grandTotal.toLocaleString()}</span>
                </div>
                <button 
                    onClick={sendOverallQuote}
                    className="w-full mt-6 bg-blue-600 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all duration-200 text-lg transform hover:scale-105 active:scale-95"
                >
                    <i className="fab fa-whatsapp text-2xl"></i> Send Quote
                </button>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};