import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function UserProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-purple-700 rounded-full p-3">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.displayName || 'Stargazer'}</h3>
          <p className="text-purple-200">{user.email}</p>
        </div>
      </div>
    </div>
  );
}