import { ValidationError } from '../types/errors';

export function handleError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error('An unexpected error occurred');
}

export function logError(error: unknown, context: string): void {
  console.error(`[${context}]`, error instanceof Error ? error.name : 'Error', error);
}