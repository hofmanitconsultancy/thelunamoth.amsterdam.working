import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import type { BookingService } from '../../types/booking';

interface ServiceCardProps {
  service: BookingService;
  onClick: () => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <button
      onClick={onClick}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-left transition-all hover:bg-white/20 hover:scale-[1.02] group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-700 group-hover:bg-purple-600 transition-colors">
          <Icon className="h-6 w-6 text-purple-200" />
        </div>
        <h3 className="text-xl font-serif text-white">{service.title}</h3>
      </div>

      <p className="text-purple-200 mb-6 h-24">{service.description}</p>

      <div className="flex items-center justify-between text-sm border-t border-purple-700/50 pt-4">
        <div className="flex items-center gap-2 text-purple-300">
          <Clock className="h-4 w-4" />
          <span>{service.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-white font-semibold">
          <DollarSign className="h-4 w-4" />
          <span>{service.price}</span>
        </div>
      </div>
    </button>
  );
}