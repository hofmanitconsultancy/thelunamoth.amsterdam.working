import { InterpretationStorageService } from './storage.service';
import { ZODIAC_SIGNS } from '../../utils/astrology';

export class PlanetSignInterpretations {
  private static cache: Record<string, string> = {};

  static getInterpretation(planet: string, sign: string): string {
    const signName = ZODIAC_SIGNS[sign] || sign;
    const key = `${planet.toLowerCase()}_${sign.toLowerCase()}`;
    
    // Return cached interpretation if available
    if (this.cache[key]) {
      return this.cache[key];
    }

    // Return default interpretation while loading
    return `${planet} in ${signName} represents a unique expression of planetary energy.`;
  }

  // Use this method to preload interpretations
  static async loadInterpretations(): Promise<void> {
    try {
      const interpretations = await InterpretationStorageService.getAllInterpretations('planet_sign');
      this.cache = interpretations;
    } catch (err) {
      console.error('Failed to load interpretations:', err);
    }
  }
}