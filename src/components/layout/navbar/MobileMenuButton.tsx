import React from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className="p-2 rounded-md hover:bg-purple-800 transition-colors"
      aria-label="Toggle menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}