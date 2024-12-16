import React from 'react';
import { Star, Shield } from 'lucide-react';
import { useMembership } from '../../hooks/useMembership';
import { membershipTiers } from '../../data/membershipTiers';

export function MembershipBenefits() {
  const { membership } = useMembership();
  const currentTier = membership ? membershipTiers.find(t => t.id === membership.tierId) : null;

  if (!currentTier) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-purple-300" />
        <h2 className="text-2xl font-serif text-white">Your Benefits</h2>
      </div>

      <div className="space-y-3">
        {currentTier.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Star className="h-4 w-4 text-purple-300 flex-shrink-0" />
            <span className="text-purple-200">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-purple-800">
        <p className="text-purple-200">
          Current Plan: <span className="text-white font-semibold">{currentTier.name}</span>
        </p>
        <p className="text-sm text-purple-300 mt-1">
          ${currentTier.price}/{currentTier.interval}
        </p>
      </div>
    </div>
  );
}