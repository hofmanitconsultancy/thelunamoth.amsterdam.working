import React from 'react';
import { Moon } from 'lucide-react';
import type { LunarPhase as LunarPhaseType } from '../../types/chart';

interface LunarPhaseProps {
  phase: LunarPhaseType;
}

export function LunarPhase({ phase }: LunarPhaseProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Moon className="h-6 w-6 text-purple-300" />
        <h2 className="text-2xl font-serif text-white">Lunar Phase</h2>
      </div>

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