import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useForm } from '../../hooks/shared/useForm';
import { useAuth } from '../../hooks/useAuth';
import { FormField } from '../forms/FormField';
import { Button } from '../ui/Button';
import { validateLoginForm } from '../../utils/validation';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setError
  } = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: validateLoginForm,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/members');
      } catch (err) {
        if (err instanceof Error) {
          setError('password', err.message);
        }
      }
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
        placeholder="Enter your password"
        error={errors.password}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
}