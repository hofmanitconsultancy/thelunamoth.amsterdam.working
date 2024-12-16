import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLogo } from './navbar/NavLogo';
import { NavMenu } from './navbar/NavMenu';
import { MobileMenuButton } from './navbar/MobileMenuButton';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLogo />
          </div>
          
          <div className="hidden md:block">
            <NavMenu onLogout={handleLogout} />
          </div>
          
          <div className="md:hidden">
            <MobileMenuButton onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <NavMenu isMobile onLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}