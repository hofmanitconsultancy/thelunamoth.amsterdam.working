import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Menu, User, LogOut } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Moon className="h-8 w-8" />
              <span className="text-xl font-serif">The Luna Moth</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/services" className="hover:bg-purple-800 px-3 py-2 rounded-md">Services</Link>
              <Link to="/memberships" className="hover:bg-purple-800 px-3 py-2 rounded-md">Memberships</Link>
              <Link to="/consult" className="hover:bg-purple-800 px-3 py-2 rounded-md">Book a Consult</Link>
              <Link to="/community" className="hover:bg-purple-800 px-3 py-2 rounded-md">Community</Link>
              
              {user ? (
                <>
                  <Link to="/profile" className="hover:bg-purple-800 px-3 py-2 rounded-md flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600">
                  Login
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/services" className="block hover:bg-purple-800 px-3 py-2 rounded-md">Services</Link>
            <Link to="/memberships" className="block hover:bg-purple-800 px-3 py-2 rounded-md">Memberships</Link>
            <Link to="/consult" className="block hover:bg-purple-800 px-3 py-2 rounded-md">Book a Consult</Link>
            <Link to="/community" className="block hover:bg-purple-800 px-3 py-2 rounded-md">Community</Link>
            {user ? (
              <>
                <Link to="/profile" className="block hover:bg-purple-800 px-3 py-2 rounded-md">My Profile</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:bg-purple-800 px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-600">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}