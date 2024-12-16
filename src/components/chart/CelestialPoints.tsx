import React from 'react';
import type { CelestialPoint } from '../../types/chart';

const PLANET_PLACEHOLDERS: Record<string, CelestialPoint> = {
  sun: {
    name: "Sun",
    quality: "Cardinal",
    element: "Fire",
    sign: "Ari",
    sign_num: 0,
    position: 0,
    abs_pos: 0,
    emoji: "♈️",
    point_type: "Planet",
    house: "First_House",
    retrograde: false
  },
  moon: {
    name: "Moon",
    quality: "Fixed",
    element: "Earth",
    sign: "Tau",
    sign_num: 1,
    position: 0,
    abs_pos: 0,
    emoji: "♉️",
    point_type: "Planet",
    house: "Second_House",
    retrograde: false
  },
  mercury: {
    name: "Mercury",
    quality: "Mutable",
    element: "Air",
    sign: "Gem",
    sign_num: 2,
    position: 0,
    abs_pos: 0,
    emoji: "♊️",
    point_type: "Planet",
    house: "Third_House",
    retrograde: false
  },
  venus: {
    name: "Venus",
    quality: "Cardinal",
    element: "Water",
    sign: "Can",
    sign_num: 3,
    position: 0,
    abs_pos: 0,
    emoji: "♋️",
    point_type: "Planet",
    house: "Fourth_House",
    retrograde: false
  },
  mars: {
    name: "Mars",
    quality: "Fixed",
    element: "Fire",
    sign: "Leo",
    sign_num: 4,
    position: 0,
    abs_pos: 0,
    emoji: "♌️",
    point_type: "Planet",
    house: "Fifth_House",
    retrograde: false
  },
  jupiter: {
    name: "Jupiter",
    quality: "Mutable",
    element: "Earth",
    sign: "Vir",
    sign_num: 5,
    position: 0,
    abs_pos: 0,
    emoji: "♍️",
    point_type: "Planet",
    house: "Sixth_House",
    retrograde: false
  },
  saturn: {
    name: "Saturn",
    quality: "Cardinal",
    element: "Air",
    sign: "Lib",
    sign_num: 6,
    position: 0,
    abs_pos: 0,
    emoji: "♎️",
    point_type: "Planet",
    house: "Seventh_House",
    retrograde: false
  },
  uranus: {
    name: "Uranus",
    quality: "Fixed",
    element: "Water",
    sign: "Sco",
    sign_num: 7,
    position: 0,
    abs_pos: 0,
    emoji: "♏️",
    point_type: "Planet",
    house: "Eighth_House",
    retrograde: false
  },
  neptune: {
    name: "Neptune",
    quality: "Mutable",
    element: "Fire",
    sign: "Sag",
    sign_num: 8,
    position: 0,
    abs_pos: 0,
    emoji: "♐️",
    point_type: "Planet",
    house: "Ninth_House",
    retrograde: false
  },
  pluto: {
    name: "Pluto",
    quality: "Cardinal",
    element: "Earth",
    sign: "Cap",
    sign_num: 9,
    position: 0,
    abs_pos: 0,
    emoji: "♑️",
    point_type: "Planet",
    house: "Tenth_House",
    retrograde: false
  },
  chiron: {
    name: "Chiron",
    quality: "Fixed",
    element: "Air",
    sign: "Aqu",
    sign_num: 10,
    position: 0,
    abs_pos: 0,
    emoji: "♒️",
    point_type: "Planet",
    house: "Eleventh_House",
    retrograde: false
  },
  mean_lilith: {
    name: "Mean Lilith",
    quality: "Mutable",
    element: "Water",
    sign: "Pis",
    sign_num: 11,
    position: 0,
    abs_pos: 0,
    emoji: "♓️",
    point_type: "Planet",
    house: "Twelfth_House",
    retrograde: false
  },
  mean_node: {
    name: "North Node",
    quality: "Cardinal",
    element: "Fire",
    sign: "Ari",
    sign_num: 0,
    position: 0,
    abs_pos: 0,
    emoji: "☊",
    point_type: "Planet",
    house: "First_House",
    retrograde: true
  },
  mean_south_node: {
    name: "South Node",
    quality: "Cardinal",
    element: "Fire",
    sign: "Lib",
    sign_num: 6,
    position: 0,
    abs_pos: 0,
    emoji: "☋",
    point_type: "Planet",
    house: "Seventh_House",
    retrograde: true
  }
};

interface CelestialPointsProps {
  points: Record<string, CelestialPoint>;
  title: string;
  type: 'planet' | 'house';
}

export function CelestialPoints({ points, title, type }: CelestialPointsProps) {
  // Use placeholders if no points are provided or for missing planets
  const displayPoints = type === 'planet' 
    ? { ...PLANET_PLACEHOLDERS, ...points }
    : points;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">{title}</h2>
      
      <div className="grid gap-4">
        {Object.entries(displayPoints)
          .filter(([_, point]) => point.point_type === type)
          .sort((a, b) => {
            // Custom sort order for planets
            const order = [
              'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn',
              'uranus', 'neptune', 'pluto', 'chiron', 'mean_lilith',
              'mean_node', 'mean_south_node'
            ];
            return order.indexOf(a[0]) - order.indexOf(b[0]);
          })
          .map(([key, point]) => (
            <div 
              key={key}
              className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-2xl" 
                  role="img" 
                  aria-label={point.sign}
                >
                  {point.emoji}
                </span>
                <div>
                  <p className="text-white font-medium">
                    {point.name.replace(/_/g, ' ')}
                  </p>
                  <p className="text-sm text-purple-200">
                    {point.position.toFixed(2)}° {point.sign}
                    {point.retrograde && ' ℞'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {point.house && (
                  <p className="text-purple-200">
                    {point.house.replace(/_/g, ' ')}
                  </p>
                )}
                <p className="text-sm text-purple-300">
                  {point.element} · {point.quality}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}