import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';

interface Props {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate }) => {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ title: string, imgSrc: string } | null>(null);
  
  const portfolioItems = [
    { title: 'Portraits', imgSrc: 'https://i.ibb.co/Qvz8Z35h/IMG-9619.jpg' },
    { title: 'Couples', imgSrc: 'https://i.ibb.co/2ZCM2Vn/IMG-9694.jpg' },
    { title: 'Lifestyle', imgSrc: 'https://i.ibb.co/L6Vd35d/IMG-9706.jpg' },
    { title: 'Events', imgSrc: 'https://i.ibb.co/0VdkHNmW/IMG-3622.jpg' },
    { title: 'Candid', imgSrc: 'https://i.ibb.co/BC62wvs/IMG-9780.jpg' },
    { title: 'Studio', imgSrc: 'https://i.ibb.co/6D0M259/IMG-9831.jpg' },
  ];

  const testimonials = [
      {
          quote: "The birthday shoot was absolutely fantastic! Eran Studio captured the moments perfectly. The pictures are stunning, and I couldn't be happier!",
          author: "Giffy",
          role: "Birthday Client",
          imgSrc: "https://i.ibb.co/nNp3DHyy/IMG-5374.png",
      },
      {
          quote: "An incredibly professional and creative experience. The team brought my brand's vision to life with amazing photos. Highly recommended!",
          author: "Dir.MO",
          role: "Brand CEO",
          imgSrc: "https://i.ibb.co/W4yhnWVB/4b372334-325c-4e5b-b5e8-835643ed66dc.jpg",
      }
  ];

  const ActionButton = ({ icon, title, onClick }: any) => (
    <button
      onClick={onClick}
      className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 flex items-center gap-4 w-full cursor-pointer transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-[#2C2C2E] hover:scale-105 shadow active:scale-95"
    >
      <div className="w-10 h-10 bg-zinc-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <i className={`fas ${icon} text-lg text-zinc-800 dark:text-white`}></i>
      </div>
      <div>
        <h3 className="text-md font-semibold text-zinc-800 dark:text-gray-100 text-left">{title}</h3>
      </div>
    </button>
  );

  const TestimonialCard = ({ quote, author, role, imgSrc }: any) => (
      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 flex flex-col items-start gap-4 h-full shadow">
          <i className="fas fa-quote-left text-3xl text-blue-500"></i>
          <p className="text-zinc-600 dark:text-zinc-300 italic">"{quote}"</p>
          <div className="flex items-center gap-3 mt-auto pt-4">
              <img src={imgSrc} alt={author} className="w-12 h-12 rounded-full object-cover"/>
              <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">{author}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
              </div>
          </div>
      </div>
  );

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    const handleScroll = () => {
        if (scrollContainer && heroImageRef.current) {
            const scrollTop = scrollContainer.scrollTop;
            const parallaxOffset = scrollTop * 0.4;
            heroImageRef.current.style.transform = `scale(1.1) translateY(${parallaxOffset}px)`;
        }
    };

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleScroll);
        }
    };
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex flex-col max-w-7xl mx-auto">
       {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] animate-fadeIn-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.imgSrc} 
              alt={selectedImage.title} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl animate-scaleIn"
            />
            <p className="text-white text-center mt-4 text-xl font-bold">{selectedImage.title}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center z-50 transition-colors"
              aria-label="Close image view"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>
      )}
      <div className="relative w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden">
        <img 
            ref={heroImageRef}
            src="https://i.ibb.co/WWstFCM4/IMG-9039.jpg" 
            alt="Eran Studio background" 
            className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0D0D0D] via-white/50 dark:via-[#0D0D0D]/50 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end items-start p-6 md:p-10 text-zinc-900 dark:text-white">
          <div className="w-20 h-20 p-2 mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <img src="https://i.ibb.co/vvrSRLvz/Eran-logo-l.png" alt="Eran Studio Logo" className="w-full h-full object-contain"/>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Eran Studio</h1>
          <p className="text-lg md:text-xl text-zinc-800 dark:text-gray-300 mb-6">Beautiful & Emotive Photography</p>
          <button
            onClick={() => onNavigate(Page.Services)}
            className="bg-blue-600 text-white text-lg font-bold w-full max-w-xs py-4 rounded-xl shadow-lg transition-all duration-200 hover:bg-blue-700 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Explore Services <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="py-8">
        <div className="my-8 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                At Eran Studio, every frame tells a story. We blend editorial styling with authentic moments to capture the real you. Our passion is to create beautiful, emotive imagery that feels effortless, genuine, and timeless.
            </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 pl-2">Our Work</h2>
        <div className="relative group/carousel">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {portfolioItems.map((item, index) => (
              <div 
                key={index} 
                className="relative w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-center aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer active:scale-95 transition-transform duration-200"
                onClick={() => setSelectedImage(item)}
              >
                <img src={item.imgSrc} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <p className="absolute bottom-3 left-3 text-white font-bold text-lg">{item.title}</p>
              </div>
            ))}
          </div>
          
          <>
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-zinc-800 dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-10 hover:bg-white/80 dark:hover:bg-black/80 active:scale-90 hidden md:flex"
              aria-label="Scroll left"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-zinc-800 dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-10 hover:bg-white/80 dark:hover:bg-black/80 active:scale-90 hidden md:flex"
              aria-label="Scroll right"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        </div>

        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    imgSrc={testimonial.imgSrc}
                />
              ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <ActionButton
              icon="fa-info-circle"
              title="About Our Studio"
              onClick={() => onNavigate(Page.About)}
            />
            <ActionButton
              icon="fab fa-whatsapp"
              title="Contact on WhatsApp"
              onClick={() => {
                  window.open(`https://wa.me/265997761194`, '_blank')
              }}
            />
        </div>
      </div>
    </div>
  );
};
