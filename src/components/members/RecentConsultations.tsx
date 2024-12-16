import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function RecentConsultations() {
  const { user } = useAuth();
  
  // This would typically fetch from Firebase, but we'll use mock data for now
  const consultations = [
    {
      id: 1,
      type: 'Birth Chart Reading',
      date: '2024-03-15',
      time: '14:00',
      astrologer: 'Luna Starweaver',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Transit Analysis',
      date: '2024-03-01',
      time: '15:30',
      astrologer: 'Celeste Moon',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">Recent Consultations</h2>
      
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-purple-800/30 rounded-lg p-4 hover:bg-purple-800/40 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">{consultation.type}</h3>
              <span className="text-sm text-purple-300">with {consultation.astrologer}</span>
            </div>
            
            <div className="flex items-center gap-4 text-purple-200 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{consultation.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{consultation.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full bg-purple-600 hover:bg-purple-500 text-white rounded-md py-2 px-4 transition-colors">
        Book New Consultation
      </button>
    </div>
  );
}