import React from 'react';
import { Sun, Moon, ArrowUp } from 'lucide-react';
import { ZODIAC_SIGNS } from '../../../utils/astrology';
import type { ChartSubject } from '../../../types/chart';

interface BigThreeSectionProps {
  subject: ChartSubject;
}

export function BigThreeSection({ subject }: BigThreeSectionProps) {
  const sunSign = subject.sun?.sign;
  const moonSign = subject.moon?.sign;
  const ascendantSign = subject.first_house?.sign;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-serif text-white mb-4">The Big Three</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 text-purple-300 mb-1">
            <Sun className="h-4 w-4" />
            <span>Sun Sign</span>
          </div>
          <p className="text-white text-lg">
            {ZODIAC_SIGNS[sunSign] || sunSign}
          </p>
        </div>
        <div className="p-4 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 text-purple-300 mb-1">
            <Moon className="h-4 w-4" />
            <span>Moon Sign</span>
          </div>
          <p className="text-white text-lg">
            {ZODIAC_SIGNS[moonSign] || moonSign}
          </p>
        </div>
        <div className="p-4 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 text-purple-300 mb-1">
            <ArrowUp className="h-4 w-4" />
            <span>Ascendant</span>
          </div>
          <p className="text-white text-lg">
            {ZODIAC_SIGNS[ascendantSign] || ascendantSign}
          </p>
        </div>
      </div>
    </div>
  );
}