import { BookingService } from '../types/booking';
import { Star, Users, Clock, Sparkles } from 'lucide-react';

export const bookingServices: BookingService[] = [
  {
    id: 'birth-chart',
    title: 'Birth Chart Reading',
    description: 'Discover your cosmic blueprint through an in-depth analysis of your natal chart. Uncover your strengths, challenges, and life purpose.',
    duration: '90 minutes',
    price: 150,
    icon: Star
  },
  {
    id: 'compatibility',
    title: 'Compatibility Reading',
    description: 'Explore relationship dynamics through synastry and composite charts. Perfect for romantic partnerships or business relationships.',
    duration: '90 minutes',
    price: 175,
    icon: Users
  },
  {
    id: 'transits',
    title: 'Transit Reading',
    description: 'Understand current planetary influences and upcoming opportunities. Get timing guidance for important life decisions.',
    duration: '60 minutes',
    price: 125,
    icon: Clock
  },
  {
    id: 'tarot',
    title: 'Tarot Reading',
    description: 'Gain clarity and insight through an intuitive tarot reading combined with astrological wisdom.',
    duration: '45 minutes',
    price: 100,
    icon: Sparkles
  }
];