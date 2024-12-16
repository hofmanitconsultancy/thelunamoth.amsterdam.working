import React from 'react';
import { PLANET_NAMES, ZODIAC_SIGNS, PLANET_ORDER, formatDegrees } from '../../utils/astrology';
import { PlanetSignInterpretations } from '../../services/interpretations/planet-signs.service';
import { InterpretationText } from './InterpretationText';
import type { CelestialPoint } from '../../types/chart';

interface PlanetaryPositionsProps {
  planets: Record<string, CelestialPoint>;
}

export function PlanetaryPositions({ planets }: PlanetaryPositionsProps) {
  const planetaryBodies = PLANET_ORDER
    .map(key => planets[key])
    .filter(planet => planet?.point_type === 'Planet');

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">Planets in Signs</h2>
      
      <div className="space-y-6">
        {planetaryBodies.map((planet) => (
          <div key={planet.name}>
            <div className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label={planet.name}>
                  {planet.emoji}
                </span>
                <div>
                  <p className="text-white">
                    {PLANET_NAMES[planet.name.toLowerCase()] || planet.name} in {ZODIAC_SIGNS[planet.sign]} ({formatDegrees(planet.position)})
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
            
            <InterpretationText 
              text={PlanetSignInterpretations.getInterpretation(
                planet.name,
                planet.sign
              )} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}