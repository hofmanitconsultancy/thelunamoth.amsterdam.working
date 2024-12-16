import React from 'react';
import { Clock, MapPin, Calendar, User, Mail, Sun, Moon, ArrowUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ZODIAC_SIGNS } from '../../utils/astrology';
import type { ChartSubject } from '../../types/chart';

interface ChartDetailsProps {
  subject: ChartSubject;
}

export function ChartDetails({ subject }: ChartDetailsProps) {
  const { user } = useAuth();

  // Get the big three
  const sunSign = subject.sun?.sign;
  const moonSign = subject.moon?.sign;
  const ascendantSign = subject.first_house?.sign;

  return (
    <div className="space-y-8">
      {/* Moon Phase */}
      {subject.lunar_phase && (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-serif text-white mb-4">Moon Phase at Birth</h2>
          <div className="flex items-center gap-6">
            <span className="text-4xl" role="img" aria-label="Moon phase">
              {subject.lunar_phase.moon_emoji}
            </span>
            <div>
              <p className="text-xl text-white">{subject.lunar_phase.moon_phase_name}</p>
              <p className="text-purple-200">
                Phase {subject.lunar_phase.moon_phase} of 28
              </p>
              <p className="text-sm text-purple-300">
                {subject.lunar_phase.degrees_between_s_m.toFixed(2)}° between Sun and Moon
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Birth Chart Analysis */}
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

      {/* The Big Three */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-2xl font-serif text-white mb-4">The Big Three</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-800/30 rounded-lg">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <Sun className="h-4 w-4" />
              <span>Sun Sign</span>
            </div>
            <p className="text-white text-lg">
              {ZODIAC_SIGNS[sunSign] || sunSign}
            </p>
          </div>
          <div className="p-4 bg-purple-800/30 rounded-lg">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <Moon className="h-4 w-4" />
              <span>Moon Sign</span>
            </div>
            <p className="text-white text-lg">
              {ZODIAC_SIGNS[moonSign] || moonSign}
            </p>
          </div>
          <div className="p-4 bg-purple-800/30 rounded-lg">
            <div className="flex items-center gap-2 text-purple-300 mb-1">
              <ArrowUp className="h-4 w-4" />
              <span>Ascendant</span>
            </div>
            <p className="text-white text-lg">
              {ZODIAC_SIGNS[ascendantSign] || ascendantSign}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}