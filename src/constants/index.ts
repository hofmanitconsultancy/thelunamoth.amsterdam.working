export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MEMBERS: '/members',
  PROFILE: '/profile',
  SERVICES: '/services',
  MEMBERSHIPS: '/memberships'
} as const;

export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Please enter a valid email address',
  WEAK_PASSWORD: 'Password must be at least 6 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  MISSING_NAME: 'Please enter your name',
  LOGIN_FAILED: 'Failed to login. Please check your credentials.',
  ACCOUNT_EXISTS: 'An account with this email already exists',
  REQUIRES_RECENT_LOGIN: 'Please re-enter your password to confirm this action'
} as const;

export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  SAVE: 500
} as const;

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  MEMBERSHIPS: 'memberships',
  BIRTH_DATA: 'birthData'
} as const;