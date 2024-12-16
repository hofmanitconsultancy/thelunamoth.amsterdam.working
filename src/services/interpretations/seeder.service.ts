import { InterpretationStorageService } from './storage.service';
import { InterpretationCacheService } from './cache.service';

export class InterpretationSeederService {
  static async loadCachedInterpretations(): Promise<void> {
    try {
      const types = ['planet_sign', 'house_sign', 'planet_house'];
      
      await Promise.all(types.map(async (type) => {
        const interpretations = await InterpretationStorageService.getAllInterpretations(type);
        InterpretationCacheService.setInterpretations(type, interpretations);
      }));
    } catch (err) {
      console.error('Failed to load interpretations:', err);
    }
  }
}