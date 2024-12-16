import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-lg">
        <h2 className="text-3xl font-serif text-white text-center mb-8">Sign In</h2>
        <LoginForm />
        <p className="mt-4 text-center text-purple-200">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-300 hover:text-purple-100">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}