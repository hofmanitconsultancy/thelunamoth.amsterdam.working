import { AuthError, AuthErrorCodes } from 'firebase/auth';

export class AuthErrorHandler {
  private static readonly ERROR_MESSAGES: Record<string, string> = {
    [AuthErrorCodes.INVALID_EMAIL]: 'Please enter a valid email address',
    [AuthErrorCodes.INVALID_PASSWORD]: 'Invalid password. Please try again',
    [AuthErrorCodes.EMAIL_EXISTS]: 'An account with this email already exists',
    [AuthErrorCodes.WEAK_PASSWORD]: 'Password should be at least 6 characters',
    [AuthErrorCodes.USER_DELETED]: 'Account not found. Please check your credentials',
    [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Too many attempts. Please try again later',
    [AuthErrorCodes.NETWORK_REQUEST_FAILED]: 'Network error. Please check your connection',
    'auth/user-not-found': 'Invalid email or password',
    'auth/wrong-password': 'Invalid email or password'
  };

  static handleError(error: AuthError): Error {
    console.error('Auth Error:', {
      code: error.code,
      message: error.message,
      name: error.name
    });

    // Get user-friendly message or use default
    const message = this.ERROR_MESSAGES[error.code] || 
      'Authentication failed. Please try again';

    return new Error(message);
  }
}