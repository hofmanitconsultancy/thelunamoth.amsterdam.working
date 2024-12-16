import React from 'react';
import { PLANET_NAMES, ZODIAC_SIGNS, PLANET_ORDER, formatDegrees } from '../../utils/astrology';
import type { CelestialPoint } from '../../types/chart';

interface PlanetsInHousesProps {
  planets: Record<string, CelestialPoint>;
}

export function PlanetsInHouses({ planets }: PlanetsInHousesProps) {
  const planetaryBodies = PLANET_ORDER
    .map(key => planets[key])
    .filter(planet => planet?.point_type === 'Planet' && planet.house);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">Planets in Signs in Houses</h2>
      
      <div className="space-y-4">
        {planetaryBodies.map((planet) => {
          const planetName = PLANET_NAMES[planet.name.toLowerCase()] || planet.name;
          const signName = ZODIAC_SIGNS[planet.sign];
          const houseName = planet.house?.replace(/_/g, ' ');
          
          // Get house position
          const houseKey = planet.house?.toLowerCase().replace(/\s/g, '_');
          const houseObject = planets[houseKey];
          
          return (
            <div 
              key={planet.name}
              className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label={planet.name}>
                  {planet.emoji}
                </span>
                <div>
                  <p className="text-white">
                    {planetName} in {signName} ({formatDegrees(planet.position)}) in {houseName} ({formatDegrees(houseObject?.position || 0)})
                    {planet.retrograde && ' ℞'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-200">
                  {planet.element} · {planet.quality}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}