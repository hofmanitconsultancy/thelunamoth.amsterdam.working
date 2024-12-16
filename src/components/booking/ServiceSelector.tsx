import React from 'react';
import { Star } from 'lucide-react';
import { BookingService } from '../../types/booking';

interface ServiceSelectorProps {
  services: BookingService[];
  selectedService: string;
  onSelect: (serviceId: string) => void;
}

export function ServiceSelector({ services, selectedService, onSelect }: ServiceSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service.id)}
          className={`text-left p-6 rounded-lg transition-all ${
            selectedService === service.id
              ? 'bg-purple-700 ring-2 ring-purple-300'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <Star className={`h-5 w-5 ${
              selectedService === service.id ? 'text-purple-200' : 'text-purple-300'
            }`} />
            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
          </div>
          <p className="text-purple-200 mb-3">{service.description}</p>
          <div className="flex justify-between text-sm">
            <span className="text-purple-300">{service.duration}</span>
            <span className="font-semibold text-white">${service.price}</span>
          </div>
        </button>
      ))}
    </div>
  );
}