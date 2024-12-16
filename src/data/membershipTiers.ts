import { MembershipTier } from '../types/membership';

export const membershipTiers: MembershipTier[] = [
  {
    id: 'cosmic-explorer',
    name: 'Cosmic Explorer',
    price: 9.99,
    interval: 'month',
    description: 'Perfect for those beginning their astrological journey',
    features: [
      'Monthly horoscope readings',
      'Basic birth chart analysis',
      'Access to community forums',
      'Weekly cosmic updates'
    ]
  },
  {
    id: 'celestial-seeker',
    name: 'Celestial Seeker',
    price: 19.99,
    interval: 'month',
    description: 'For dedicated astrology enthusiasts seeking deeper insights',
    features: [
      'All Cosmic Explorer features',
      'Detailed transit reports',
      'Monthly live Q&A sessions',
      'Exclusive workshops access',
      'Personal aspect calculator'
    ]
  },
  {
    id: 'astral-sage',
    name: 'Astral Sage',
    price: 39.99,
    interval: 'month',
    description: 'The ultimate package for serious practitioners',
    features: [
      'All Celestial Seeker features',
      'Priority booking for readings',
      '1-on-1 monthly consultation',
      'Advanced chart analysis tools',
      'Private community access',
      'Custom birth chart reports'
    ]
  }
];