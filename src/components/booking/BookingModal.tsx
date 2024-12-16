import React from 'react';
import { X } from 'lucide-react';
import { BookingForm } from './BookingForm';
import type { BookingService, BookingFormData } from '../../types/booking';

interface BookingModalProps {
  service: BookingService;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => Promise<void>;
}

export function BookingModal({ service, onClose, onSubmit }: BookingModalProps) {
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-purple-900 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-700">
            <Icon className="h-6 w-6 text-purple-200" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-white">{service.title}</h2>
            <p className="text-purple-300">{service.duration} · ${service.price}</p>
          </div>
        </div>

        <BookingForm
          serviceId={service.id}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}