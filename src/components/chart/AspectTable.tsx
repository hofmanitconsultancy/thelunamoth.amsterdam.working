import React from 'react';
import type { ChartAspect } from '../../types/chart';

interface AspectTableProps {
  aspects: ChartAspect[];
}

export function AspectTable({ aspects }: AspectTableProps) {
  const majorAspects = aspects.filter(aspect => aspect.is_major);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-6">Major Aspects</h2>
      
      <div className="grid gap-3">
        {majorAspects.map((aspect, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                {aspect.p1_name.replace(/_/g, ' ')}
              </span>
              <span className="text-purple-300">to</span>
              <span className="text-white font-medium">
                {aspect.p2_name.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="text-right">
              <p className="text-purple-200 capitalize">{aspect.aspect}</p>
              <p className="text-sm text-purple-300">
                {aspect.aspect_degrees}° ({Math.abs(aspect.orbit).toFixed(2)}° orbit)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}