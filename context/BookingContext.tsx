import React, { createContext, useContext, useState } from 'react';
import { PhotographyOrder, ReelsOrder, PortraitsOrder, SetOrder } from '../types';

interface BookingContextType {
  photographyOrder: PhotographyOrder;
  setPhotographyOrder: SetOrder<PhotographyOrder>;
  reelsOrder: ReelsOrder;
  setReelsOrder: SetOrder<ReelsOrder>;
  portraitsOrder: PortraitsOrder;
  setPortraitsOrder: SetOrder<PortraitsOrder>;
  completedServices: string[];
  setCompletedServices: SetOrder<string[]>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedServices, setCompletedServices] = useState<string[]>([]);

  const [photographyOrder, setPhotographyOrder] = useState<PhotographyOrder>({
    peopleCount: '1-2',
    normalPictures: 0,
    expressPictures: { '24hrs': 0, '12hrs': 0, '6hrs': 0 },
  });

  const [reelsOrder, setReelsOrder] = useState<ReelsOrder>({
    basic: false, standard: false, premium: false,
  });

  const [portraitsOrder, setPortraitsOrder] = useState<PortraitsOrder>({
    a3: { quantity: 0 }, a2: { quantity: 0 }, a1: { quantity: 0 }, a0: { quantity: 0 },
  });

  return (
    <BookingContext.Provider value={{
      photographyOrder, setPhotographyOrder,
      reelsOrder, setReelsOrder,
      portraitsOrder, setPortraitsOrder,
      completedServices, setCompletedServices
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
