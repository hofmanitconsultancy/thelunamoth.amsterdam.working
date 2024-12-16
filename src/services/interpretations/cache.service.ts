export class InterpretationCacheService {
  private static cache: Record<string, Record<string, string>> = {
    planet_sign: {},
    house_sign: {},
    planet_house: {}
  };

  static setInterpretation(type: string, key: string, text: string): void {
    if (!this.cache[type]) {
      this.cache[type] = {};
    }
    this.cache[type][key] = text;
  }

  static getInterpretation(type: string, key: string): string | null {
    return this.cache[type]?.[key] || null;
  }

  static setInterpretations(type: string, interpretations: Record<string, string>): void {
    this.cache[type] = interpretations;
  }

  static getAllInterpretations(type: string): Record<string, string> {
    return this.cache[type] || {};
  }

  static clearCache(): void {
    this.cache = {
      planet_sign: {},
      house_sign: {},
      planet_house: {}
    };
  }
}