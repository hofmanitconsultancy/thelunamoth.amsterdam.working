import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { formatDateTime } from '../../utils/dates';

interface ChartHeaderProps {
  subject: {
    name: string;
    birthDate: string;
    birthTime: string;
    location: {
      city: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
}

export function ChartHeader({ subject }: ChartHeaderProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h1 className="text-3xl font-serif text-white mb-6">
        Natal Chart for {subject.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-purple-300" />
          <div>
            <p className="text-sm text-purple-300">Birth Date</p>
            <p className="text-white">{formatDateTime(subject.birthDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-purple-300" />
          <div>
            <p className="text-sm text-purple-300">Birth Time</p>
            <p className="text-white">{subject.birthTime}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-purple-300" />
          <div>
            <p className="text-sm text-purple-300">Birth Place</p>
            <p className="text-white">{subject.location.city}, {subject.location.country}</p>
            <p className="text-sm text-purple-200">
              {subject.location.coordinates.lat.toFixed(4)}°, 
              {subject.location.coordinates.lng.toFixed(4)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}