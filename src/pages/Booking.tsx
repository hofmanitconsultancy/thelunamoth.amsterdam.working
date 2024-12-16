import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/booking/ServiceCard';
import { BookingModal } from '../components/booking/BookingModal';
import { bookingServices } from '../data/bookingServices';
import { useAuth } from '../hooks/useAuth';
import type { BookingFormData, BookingService } from '../types/booking';

export default function Booking() {
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBooking = async (data: BookingFormData) => {
    // In a real app, this would send the booking data to your backend
    console.log('Booking submitted:', data);
    
    // For now, just show a success message and redirect
    alert('Booking request submitted! We will contact you shortly to confirm your appointment.');
    setSelectedService(null);
    if (user) {
      navigate('/members');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-4">Book a Reading</h1>
          <p className="text-xl text-purple-200">
            Choose your preferred reading type to begin your journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {bookingServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

        {selectedService && (
          <BookingModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onSubmit={handleBooking}
          />
        )}
      </div>
    </div>
  );
}