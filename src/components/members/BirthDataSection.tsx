import React from 'react';
import { Calendar, Clock, MapPin, Globe, Edit2 } from 'lucide-react';
import { useBirthData } from '../../hooks/useBirthData';
import { Button } from '../ui/Button';

interface BirthDataSectionProps {
  onEdit: () => void;
}

export function BirthDataSection({ onEdit }: BirthDataSectionProps) {
  const { birthData, loading } = useBirthData();

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-purple-800/50 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-purple-800/50 rounded w-1/2"></div>
          <div className="h-4 bg-purple-800/50 rounded w-2/3"></div>
          <div className="h-4 bg-purple-800/50 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!birthData) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <p className="text-purple-200 mb-4">Please complete your profile by adding your birth information.</p>
        <Button onClick={onEdit}>Add Birth Information</Button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-serif text-white">Birth Information</h3>
        <Button 
          variant="secondary" 
          onClick={onEdit} 
          className="flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm text-purple-300">Birth Date</p>
              <p className="text-white">{new Date(birthData.birthDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm text-purple-300">Birth Time</p>
              <p className="text-white">{birthData.birthTime}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm text-purple-300">Birth Place</p>
              <p className="text-white">
                {birthData.city && birthData.country 
                  ? `${birthData.city}, ${birthData.country}`
                  : birthData.birthPlace}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm text-purple-300">Coordinates</p>
              <p className="text-white">
                {birthData.latitude.toFixed(4)}°, {birthData.longitude.toFixed(4)}°
              </p>
              <p className="text-sm text-purple-200">
                Timezone: {birthData.timezone || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}