import React from 'react';

export enum Page {
  Welcome = 0,
  Home = 1,
  Services = 2,
  About = 3,
  Photography = 4,
  Reels = 5,
  Portraits = 6,
  Dashboard = 7,
  SmartLight = 8,
}

export interface PhotographyOrder {
  peopleCount: '1-2' | '3-7';
  normalPictures: number;
  expressPictures: {
    '24hrs': number;
    '12hrs': number;
    '6hrs': number;
  };
}

export interface ReelsOrder {
  basic: boolean;
  standard: boolean;
  premium: boolean;
}

export interface PortraitsOrder {
  a3: { quantity: number };
  a2: { quantity: number };
  a1: { quantity: number };
  a0: { quantity: number };
}

export interface Orders {
  photographyOrder: PhotographyOrder;
  reelsOrder: ReelsOrder;
  portraitsOrder: PortraitsOrder;
}

export type SetOrder<T> = React.Dispatch<React.SetStateAction<T>>;