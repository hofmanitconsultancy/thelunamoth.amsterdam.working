import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { UserProfile } from '../components/dashboard/UserProfile';
import { MembershipStatus } from '../components/dashboard/MembershipStatus';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4 animate-pulse">Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-white mb-8">Your Celestial Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UserProfile />
          <MembershipStatus />
        </div>
      </div>
    </div>
  );
}