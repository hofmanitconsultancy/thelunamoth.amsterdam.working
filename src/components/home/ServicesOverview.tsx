import React from 'react';
import { Star, Moon, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';

const services = [
  {
    icon: Star,
    title: 'Personal Readings',
    description: 'Detailed astrological analysis tailored to your birth chart',
  },
  {
    icon: Moon,
    title: 'Lunar Guidance',
    description: 'Monthly forecasts and moon phase rituals',
  },
  {
    icon: Sparkles,
    title: 'Spiritual Growth',
    description: 'Transform your life with cosmic wisdom',
  },
];

export function ServicesOverview() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {services.map((service) => (
        <Card key={service.title} {...service} />
      ))}
    </div>
  );
}