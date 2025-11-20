import React, { useState } from 'react';
import { Page } from './types';
import { BookingProvider, useBooking } from './context/BookingContext';
import { SideNavBar } from './components/Layout/SideNavBar';
import { TopHeader } from './components/Layout/TopHeader';
import { BottomNavBar } from './components/Layout/BottomNavBar';
import { Footer } from './components/Layout/Footer';
import { WelcomePage } from './pages/Welcome';
import { HomePage } from './pages/Home';
import { ServicesPage } from './pages/Services';
import { AboutPage } from './pages/About';
import { PhotographyBookingPage } from './pages/booking/Photography';
import { ReelsBookingPage } from './pages/booking/Reels';
import { PortraitsBookingPage } from './pages/booking/Portraits';
import { Dashboard } from './pages/Dashboard';
import { SmartLightPage } from './pages/SmartLight';

const AppContent = () => {
  const [page, setPage] = useState<Page>(Page.Welcome);
  const [animationClass, setAnimationClass] = useState('page-enter-active');
  const { setCompletedServices, completedServices } = useBooking();

  const handleNavigate = (newPage: Page) => {
    const mainContainer = document.getElementById('main-scroll-container');
    if (page === newPage) {
      if (mainContainer) {
        mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setAnimationClass('page-exit-active');

    setTimeout(() => {
        setPage(newPage);
        if (mainContainer) {
            mainContainer.scrollTo(0, 0);
        }
        setAnimationClass('page-enter-active');
    }, 200);
  };
  
  const scrollToTop = () => {
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePhotographyComplete = () => {
    // Assuming validation is done in the component
    if (!completedServices.includes('photography')) {
        setCompletedServices(prev => [...prev, 'photography']);
    }
    handleNavigate(Page.Services);
  };

  const handleReelsComplete = () => {
    if (!completedServices.includes('reels')) {
        setCompletedServices(prev => [...prev, 'reels']);
    }
    handleNavigate(Page.Services);
  };

  const handlePortraitsComplete = () => {
    if (!completedServices.includes('portraits')) {
        setCompletedServices(prev => [...prev, 'portraits']);
    }
    handleNavigate(Page.Services);
  };

  const renderPage = () => {
    switch (page) {
      case Page.Welcome: return <WelcomePage onNavigate={handleNavigate} />;
      case Page.Home: return <HomePage onNavigate={handleNavigate} />;
      case Page.Services: return <ServicesPage onNavigate={handleNavigate} />;
      case Page.About: return <AboutPage />;
      case Page.Photography:
        return <PhotographyBookingPage 
          onComplete={handlePhotographyComplete} 
          onBack={() => handleNavigate(Page.Services)}
        />;
      case Page.Reels:
        return <ReelsBookingPage 
          onComplete={handleReelsComplete} 
          onBack={() => handleNavigate(Page.Services)}
        />;
      case Page.Portraits:
        return <PortraitsBookingPage 
          onComplete={handlePortraitsComplete}
          onBack={() => handleNavigate(Page.Services)}
        />;
      case Page.Dashboard: return <Dashboard onNavigate={handleNavigate} />;
      case Page.SmartLight: return <SmartLightPage onBack={() => handleNavigate(Page.Dashboard)} />;
      default: return <WelcomePage onNavigate={handleNavigate} />;
    }
  };

  if (page === Page.Welcome) {
    return (
        <div className={`h-full ${animationClass}`}>
            <WelcomePage onNavigate={handleNavigate} />
        </div>
    );
  }

  const showNavBar = [Page.Home, Page.Services, Page.About].includes(page);
  const showFooter = [Page.Home, Page.Services, Page.About].includes(page);

  return (
    <div className="flex w-full min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors duration-300">
      <SideNavBar currentPage={page} onNavigate={handleNavigate} />
      <div className="relative flex-1 flex flex-col h-screen overflow-hidden">
        <TopHeader onNavigate={handleNavigate} onTitleClick={scrollToTop} />
        <main id="main-scroll-container" className="flex-1 overflow-y-auto scrollbar-hide">
           <div className={`pb-32 lg:pb-10 p-4 sm:p-8 md:p-10 relative ${animationClass}`}>
              {renderPage()}
            </div>
            {showFooter && <Footer onNavigate={handleNavigate} />}
        </main>
        <div className="lg:hidden">
          {showNavBar && <BottomNavBar currentPage={page} onNavigate={handleNavigate} />}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
};

export default App;
