import React from 'react';
import { Clock, MapPin, Calendar, User, Mail } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import type { ChartSubject } from '../../../types/chart';

interface BirthDetailsSectionProps {
  subject: ChartSubject;
}

export function BirthDetailsSection({ subject }: BirthDetailsSectionProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">
          Birth Chart Analysis
        </h1>
        <div className="flex items-center gap-6 text-purple-200 mb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{user?.displayName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-300">
            <Calendar className="h-5 w-5" />
            <span>Birth Date & Time</span>
          </div>
          <p className="text-white">
            {new Date(subject.iso_formatted_local_datetime).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })}
          </p>
          <p className="text-sm text-purple-200">
            Local Time: {subject.local_time.toFixed(2)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-300">
            <MapPin className="h-5 w-5" />
            <span>Birth Location</span>
          </div>
          <p className="text-white">{subject.city}, {subject.nation}</p>
          <p className="text-sm text-purple-200">
            {subject.lat.toFixed(4)}°N, {subject.lng.toFixed(4)}°E
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-300">
            <Clock className="h-5 w-5" />
            <span>Chart System</span>
          </div>
          <p className="text-white">{subject.houses_system_name}</p>
          <p className="text-sm text-purple-200">
            {subject.zodiac_type} · {subject.perspective_type}
          </p>
        </div>
      </div>
    </div>
  );
}