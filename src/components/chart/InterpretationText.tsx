import React from 'react';

interface InterpretationTextProps {
  text: string;
}

export function InterpretationText({ text }: InterpretationTextProps) {
  if (!text) return null;

  return (
    <div className="mt-2 p-3 bg-purple-900/30 rounded text-sm text-purple-200 leading-relaxed">
      {text}
    </div>
  );
}