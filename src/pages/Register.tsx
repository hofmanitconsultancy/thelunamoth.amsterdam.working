import React from 'react';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '../components/auth/RegistrationForm';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-lg">
        <h2 className="text-3xl font-serif text-white text-center mb-8">Create Account</h2>
        <RegistrationForm />
        <p className="mt-4 text-center text-purple-200">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 hover:text-purple-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}