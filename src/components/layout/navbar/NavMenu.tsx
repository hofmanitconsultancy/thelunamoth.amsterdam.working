import React from 'react';
import { User, LogOut, Home, Calendar } from 'lucide-react';
import { NavLink } from './NavLink';
import { useAuth } from '../../../hooks/useAuth';

interface NavMenuProps {
  isMobile?: boolean;
  onLogout: () => Promise<void>;
}

export function NavMenu({ isMobile = false, onLogout }: NavMenuProps) {
  const { user } = useAuth();
  const baseClass = isMobile ? 'block' : '';

  return (
    <div className={isMobile ? 'px-2 pt-2 pb-3 space-y-1' : 'ml-10 flex items-center space-x-4'}>
      <NavLink to="/" className={baseClass}>
        <div className="flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Home
        </div>
      </NavLink>
      <NavLink to="/booking" className={baseClass}>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Book a Reading
        </div>
      </NavLink>
      
      {user ? (
        <>
          <NavLink to="/members" className={baseClass}>Members Area</NavLink>
          <NavLink to="/profile" className={baseClass}>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              My Profile
            </div>
          </NavLink>
          <button
            onClick={onLogout}
            className={`flex items-center ${
              isMobile 
                ? 'w-full text-left hover:bg-purple-800 px-3 py-2 rounded-md'
                : 'bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600'
            }`}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </>
      ) : (
        <NavLink 
          to="/login" 
          className={`${baseClass} ${!isMobile ? 'bg-purple-700 hover:bg-purple-600' : ''}`}
        >
          Login
        </NavLink>
      )}
    </div>
  );
}