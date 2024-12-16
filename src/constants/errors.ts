export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Please enter a valid email address',
  WEAK_PASSWORD: 'Password must be at least 6 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  MISSING_NAME: 'Please enter your name',
  LOGIN_FAILED: 'Failed to login. Please check your credentials.',
  ACCOUNT_EXISTS: 'An account with this email already exists',
  REQUIRES_RECENT_LOGIN: 'Please re-enter your password to confirm this action'
} as const;

export const FORM_ERRORS = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_DATE: 'Please enter a valid date',
  FUTURE_DATE: 'Date cannot be in the future',
  INVALID_TIME: 'Please enter a valid time',
  INVALID_LOCATION: 'Please select a valid location'
} as const;