import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, children, className = '' }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      className={`hover:bg-purple-800 px-3 py-2 rounded-md transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}