import React from 'react';
import { ChartAspect } from '../../types/chart';

interface AspectGridProps {
  aspects: ChartAspect[];
}

export function AspectGrid({ aspects }: AspectGridProps) {
  const majorAspects = aspects.filter(aspect => aspect.is_major);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">Major Aspects</h2>
      
      <div className="space-y-3">
        {majorAspects.map((aspect, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-white">{aspect.p1_name}</span>
              <span className="text-purple-300">to</span>
              <span className="text-white">{aspect.p2_name}</span>
            </div>
            <div className="text-right">
              <p className="text-purple-200 capitalize">{aspect.aspect}</p>
              <p className="text-sm text-purple-300">
                Orbit: {Math.abs(aspect.orbit).toFixed(2)}°
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}