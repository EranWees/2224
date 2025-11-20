export const SESSION_TYPES = {
  '1-2': { type: '1-2', icon: "fa-user", title: "1-2 People", fee: 2000 },
  '3-7': { type: '3-7', icon: "fa-users", title: "3-7 People", fee: 3000 },
};

export const BASE_PRICE_PER_PICTURE = 2000;
export const SESSION_TIER_PICS = 10;
export const SESSION_TIER_PRICE = 18000;
export const SESSION_PLUS_TIER_PICS = 25;
export const EXPRESS_SURCHARGE = { '24hrs': 3000, '12hrs': 4500, '6hrs': 6000 } as const;

export const REELS_PRICING = {
  basic: { price: 15000, title: 'Basic Reel', details: '10-15s, 48hr delivery', features: ['Simple editing', 'Basic color grading', '1 revision'], bestFor: 'Quick content, outfit showcases.' },
  standard: { price: 25000, title: 'Standard Reel', details: '15-30s, 24hr delivery', features: ['Cinematic transitions', 'Advanced color grading', '2 revisions'], bestFor: 'Brand content, storytelling.' },
  premium: { price: 50000, title: 'Premium Cinematic Reel', details: '30-60s, 12hr delivery', features: ['Full cinematic edit', 'Motion graphics/text', '3 revisions'], bestFor: 'Commercials, ads, artist content.' },
};

export const PORTRAITS_PRICING = {
  a3: { price: 20000, title: 'A3', dimensions: '30cm x 45cm', img: 'https://i.ibb.co/Qvz8Z35h/IMG-9619.jpg' },
  a2: { price: 25000, title: 'A2', dimensions: '45cm x 60cm', img: 'https://i.ibb.co/C5R0NNNf/IMG-0255.jpg' },
  a1: { price: 35000, title: 'A1', dimensions: '60cm x 90cm', img: 'https://i.ibb.co/SXVCKbyw/2024-12-11-17-43-IMG-2626.jpg' },
  a0: { price: 65000, title: 'A0', dimensions: '90cm x 120cm', img: 'https://i.ibb.co/RpbJzms8/IMG-20250908-104932.jpg' },
};
