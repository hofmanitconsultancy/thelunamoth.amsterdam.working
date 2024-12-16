import React from 'react';
import { Sparkles, Moon, Star, Compass, Users, Book } from 'lucide-react';

const services = [
  {
    icon: Star,
    title: 'Birth Chart Reading',
    price: '$150',
    description: 'Deep dive into your natal chart revealing your life path, strengths, and challenges.',
    duration: '90 minutes',
  },
  {
    icon: Moon,
    title: 'Monthly Forecast',
    price: '$75',
    description: 'Detailed analysis of upcoming astrological transits and their impact on your life.',
    duration: '45 minutes',
  },
  {
    icon: Compass,
    title: 'Relationship Compatibility',
    price: '$200',
    description: 'Synastry reading for romantic or business partnerships.',
    duration: '120 minutes',
  },
  {
    icon: Users,
    title: 'Group Workshop',
    price: '$50',
    description: 'Interactive learning sessions about astrology basics and chart interpretation.',
    duration: '2 hours',
  },
  {
    icon: Book,
    title: 'Written Report',
    price: '$125',
    description: 'Comprehensive written analysis of your chart delivered to your inbox.',
    duration: 'Digital Delivery',
  },
  {
    icon: Sparkles,
    title: 'Spiritual Coaching',
    price: '$100',
    description: 'One-on-one guidance combining astrology with spiritual practices.',
    duration: '60 minutes',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-4">Our Services</h1>
          <p className="text-xl text-purple-200">Discover the perfect astrological service for your journey</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
                <Icon className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-purple-200 mb-4">{service.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-200">{service.duration}</span>
                  <span className="text-2xl font-semibold">{service.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}