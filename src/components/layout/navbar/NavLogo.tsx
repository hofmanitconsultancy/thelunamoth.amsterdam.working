import React from 'react';
import { Link } from 'react-router-dom';
import { Moon } from 'lucide-react';

export function NavLogo() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 group"
    >
      <Moon className="h-8 w-8 text-purple-300 group-hover:text-purple-200 transition-colors" />
      <span className="text-xl font-serif relative">
        <span className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-400 to-purple-300 opacity-75 animate-pulse" aria-hidden="true">
          thelunamoth.amsterdam
        </span>
        <span className="relative bg-gradient-to-r from-white to-purple-100 text-transparent bg-clip-text">
          thelunamoth.amsterdam
        </span>
      </span>
    </Link>
  );
}