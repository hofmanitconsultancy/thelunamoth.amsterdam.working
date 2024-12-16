import React from 'react';
import { Moon } from 'lucide-react';
import type { LunarPhase } from '../../../types/chart';

interface MoonPhaseSectionProps {
  phase: LunarPhase;
}

export function MoonPhaseSection({ phase }: MoonPhaseSectionProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-4">Moon Phase at Birth</h2>
      <div className="flex items-center gap-6">
        <span className="text-4xl" role="img" aria-label="Moon phase">
          {phase.moon_emoji}
        </span>
        <div>
          <p className="text-xl text-white">{phase.moon_phase_name}</p>
          <p className="text-purple-200">
            Phase {phase.moon_phase} of 28
          </p>
          <p className="text-sm text-purple-300">
            {phase.degrees_between_s_m.toFixed(2)}° between Sun and Moon
          </p>
        </div>
      </div>
    </div>
  );
}