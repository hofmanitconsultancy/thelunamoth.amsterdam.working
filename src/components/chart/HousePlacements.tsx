import React from 'react';
import { ZODIAC_SIGNS, formatDegrees } from '../../utils/astrology';
import type { CelestialPoint } from '../../types/chart';

interface HousePlacementsProps {
  houses: Record<string, CelestialPoint>;
}

// Order signs by zodiacal order
const ZODIAC_ORDER = [
  'Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir',
  'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'
];

export function HousePlacements({ houses }: HousePlacementsProps) {
  // Get all house placements
  const housePlacements = Object.values(houses)
    .filter(house => house?.point_type === 'House')
    .sort((a, b) => {
      const aIndex = ZODIAC_ORDER.indexOf(a.sign);
      const bIndex = ZODIAC_ORDER.indexOf(b.sign);
      return aIndex - bIndex;
    });

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">Signs in Houses</h2>
      
      <div className="grid gap-4">
        {housePlacements.map((house) => (
          <div 
            key={house.name}
            className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={house.sign}>
                {house.emoji}
              </span>
              <div>
                <p className="text-white">
                  {house.name.replace(/_/g, ' ')} in {ZODIAC_SIGNS[house.sign]} ({formatDegrees(house.position)})
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-200">
                {house.element} · {house.quality}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}