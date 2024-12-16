import React from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { useMembership } from '../../hooks/useMembership';
import { membershipTiers } from '../../data/membershipTiers';
import { Link } from 'react-router-dom';

export function MembershipStatus() {
  const { membership, loading, error } = useMembership();

  if (loading) {
    return <div className="animate-pulse bg-white/10 rounded-lg p-6"></div>;
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
        <div className="flex items-center gap-2 text-red-300">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
        <p className="text-purple-200 mb-4">No active membership</p>
        <Link 
          to="/memberships" 
          className="inline-block bg-purple-600 hover:bg-purple-500 text-white rounded-md py-2 px-4 transition-colors"
        >
          View Membership Options
        </Link>
      </div>
    );
  }

  const tier = membershipTiers.find(t => t.id === membership.tierId);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Star className="h-6 w-6 text-purple-200" />
        <h3 className="text-xl font-semibold">{tier?.name}</h3>
      </div>
      <p className="text-purple-200 mb-2">Status: {membership.status}</p>
      <p className="text-purple-200">
        Member since: {new Date(membership.startDate).toLocaleDateString()}
      </p>
    </div>
  );
}