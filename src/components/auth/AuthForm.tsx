import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { validateEmail, validatePassword } from '../../utils/validation';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => Promise<void>;
  error?: string | null;
}

export function AuthForm({ type, onSubmit, error }: AuthFormProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [validationError, setValidationError] = React.useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (type === 'register' && !formData.displayName.trim()) {
      setValidationError('Please enter your name');
      return false;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setValidationError(emailError);
      return false;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setValidationError(passwordError);
      return false;
    }

    if (type === 'register' && formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      navigate('/members');
    } catch (err) {
      // Error is handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || validationError) && (
        <div className="flex items-center gap-2 text-red-300 bg-red-900/20 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error || validationError}</p>
        </div>
      )}

      {type === 'register' && (
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-purple-200">
            Full Name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-purple-800/50 border-purple-600 text-white px-3 py-2"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-purple-200">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-purple-800/50 border-purple-600 text-white px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-purple-200">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-purple-800/50 border-purple-600 text-white px-3 py-2"
        />
      </div>

      {type === 'register' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-200">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-purple-800/50 border-purple-600 text-white px-3 py-2"
          />
        </div>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
      >
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  );
}