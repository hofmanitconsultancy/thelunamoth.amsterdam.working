import { AUTH_ERRORS } from '../constants/errors';
import type { LoginFormData, RegistrationFormData } from '../types/user';

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return AUTH_ERRORS.REQUIRED_FIELD;
  if (!emailRegex.test(email)) return AUTH_ERRORS.INVALID_EMAIL;
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password.trim()) return AUTH_ERRORS.REQUIRED_FIELD;
  if (password.length < 6) return AUTH_ERRORS.WEAK_PASSWORD;
  return null;
}

export function validateLoginForm(values: LoginFormData) {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};
  
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateRegistrationForm(values: RegistrationFormData) {
  const errors: Partial<Record<keyof RegistrationFormData, string>> = {};

  if (!values.displayName.trim()) {
    errors.displayName = AUTH_ERRORS.MISSING_NAME;
  }

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = AUTH_ERRORS.PASSWORDS_DONT_MATCH;
  }

  return errors;
}