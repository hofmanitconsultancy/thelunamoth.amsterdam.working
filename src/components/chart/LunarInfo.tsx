import React from 'react';
import { Moon } from 'lucide-react';

interface LunarInfoProps {
  phase: {
    moon_phase: number;
    moon_emoji: string;
    moon_phase_name: string;
  };
}

export function LunarInfo({ phase }: LunarInfoProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Moon className="h-6 w-6 text-purple-300" />
        <h2 className="text-2xl font-serif text-white">Lunar Phase</h2>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-4xl">{phase.moon_emoji}</span>
        <div>
          <p className="text-xl text-white">{phase.moon_phase_name}</p>
          <p className="text-purple-200">Phase {phase.moon_phase} of 28</p>
        </div>
      </div>
    </div>
  );
}