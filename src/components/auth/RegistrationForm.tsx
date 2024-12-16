import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useForm } from '../../hooks/shared/useForm';
import { useAuth } from '../../hooks/useAuth';
import { FormField } from '../forms/FormField';
import { Button } from '../ui/Button';
import { validateRegistrationForm } from '../../utils/validation';
import type { RegistrationFormData } from '../../types/user';

export function RegistrationForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useForm<RegistrationFormData>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    },
    validate: validateRegistrationForm,
    onSubmit: async (values) => {
      await signup(values.email, values.password, values.displayName);
      navigate('/members');
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <div className="flex items-center gap-2 text-red-300 bg-red-900/20 p-4 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{Object.values(errors)[0]}</p>
        </div>
      )}

      <FormField
        id="displayName"
        label="Full Name"
        value={values.displayName}
        onChange={(e) => handleChange('displayName', e.target.value)}
        required
        placeholder="Enter your name"
        error={errors.displayName}
      />

      <FormField
        id="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required
        placeholder="you@example.com"
        error={errors.email}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        required
        placeholder="Create a password"
        error={errors.password}
      />

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={values.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        required
        placeholder="Confirm your password"
        error={errors.confirmPassword}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
}