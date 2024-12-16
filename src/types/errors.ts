export class ValidationError extends Error {
  code = 'VALIDATION_ERROR';
  name = 'ValidationError';

  constructor(message: string) {
    super(message);
  }
}