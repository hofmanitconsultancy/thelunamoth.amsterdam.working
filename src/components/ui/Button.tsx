import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  isLoading,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors';
  
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-500 text-white disabled:bg-purple-400',
    secondary: 'bg-purple-200 hover:bg-purple-300 text-purple-900 disabled:bg-purple-100',
    danger: 'bg-red-600 hover:bg-red-500 text-white disabled:bg-red-400'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
      ) : Icon ? (
        <Icon className="h-5 w-5" />
      ) : null}
      {children}
    </button>
  );
}