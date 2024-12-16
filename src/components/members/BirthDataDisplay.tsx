import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useBirthData } from '../../hooks/useBirthData';
import { Button } from '../ui/Button';

interface BirthDataDisplayProps {
  onEdit: () => void;
}

export function BirthDataDisplay({ onEdit }: BirthDataDisplayProps) {
  const { birthData, loading } = useBirthData();

  if (loading) {
    return <div className="animate-pulse bg-white/10 rounded-lg p-6"></div>;
  }

  if (!birthData) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <p className="text-purple-200 mb-4">Birth information not provided</p>
        <Button onClick={onEdit}>Add Birth Information</Button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Birth Information</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-purple-200">
          <Calendar className="h-5 w-5" />
          <span>{new Date(birthData.birthDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2 text-purple-200">
          <Clock className="h-5 w-5" />
          <span>{birthData.birthTime}</span>
        </div>
        
        <div className="flex items-center gap-2 text-purple-200">
          <MapPin className="h-5 w-5" />
          <span>{birthData.birthPlace}</span>
        </div>
      </div>

      <Button onClick={onEdit} variant="secondary" className="mt-4">
        Edit Information
      </Button>
    </div>
  );
}