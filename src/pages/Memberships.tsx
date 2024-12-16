import React, { useState } from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { membershipTiers } from '../data/membershipTiers';
import { useMembership } from '../hooks/useMembership';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Memberships() {
  const { user } = useAuth();
  const { membership, subscribeTo } = useMembership();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (tierId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setError(null);
    try {
      await subscribeTo(tierId);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to process subscription. Please try again.');
      console.error('Subscription error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-4">Membership Tiers</h1>
          <p className="text-xl text-purple-200">Choose your path to celestial wisdom</p>
          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-300">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {membershipTiers.map((tier) => (
            <div key={tier.id} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-purple-200" />
                <h3 className="text-xl font-semibold">{tier.name}</h3>
              </div>
              <p className="text-purple-200 mb-6">{tier.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">${tier.price}</span>
                <span className="text-purple-200">/{tier.interval}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-200" />
                    <span className="text-purple-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={membership?.tierId === tier.id}
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  membership?.tierId === tier.id
                    ? 'bg-purple-700 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-500'
                }`}
              >
                {membership?.tierId === tier.id ? 'Current Plan' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}