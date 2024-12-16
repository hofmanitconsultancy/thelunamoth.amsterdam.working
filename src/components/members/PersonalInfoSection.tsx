import React from 'react';
import { User, Mail, Edit2 } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { Button } from '../ui/Button';

interface PersonalInfoSectionProps {
  onEdit: () => void;
}

export function PersonalInfoSection({ onEdit }: PersonalInfoSectionProps) {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-purple-800/50 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-purple-800/50 rounded w-1/2"></div>
          <div className="h-4 bg-purple-800/50 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <p className="text-purple-200 mb-4">Unable to load personal information.</p>
        <Button onClick={onEdit}>Update Information</Button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-serif text-white">Personal Information</h3>
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
            <User className="h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm text-purple-300">Full Name</p>
              <p className="text-white">{profile.displayName || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-purple-300" />
            <div>
              <p className="text-sm text-purple-300">Email Address</p>
              <p className="text-white">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}