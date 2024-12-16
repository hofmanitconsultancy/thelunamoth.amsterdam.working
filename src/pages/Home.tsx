import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesOverview } from '../components/home/ServicesOverview';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <HeroSection />
        <ServicesOverview />
        
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Starry night sky"
            className="rounded-lg shadow-2xl mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}