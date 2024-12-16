import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { InterpretationSeederService } from './interpretations/seeder.service';

export class InitializationService {
  private static readonly INIT_DOC = 'app_initialization';
  private static readonly COLLECTION = 'system';

  static async initialize(): Promise<void> {
    try {
      // Only check initialization status
      const initDoc = doc(db, this.COLLECTION, this.INIT_DOC);
      const snapshot = await getDoc(initDoc);

      if (!snapshot.exists()) {
        console.log('App requires initialization. Please contact administrator.');
      }

      // Load interpretations into cache
      await this.loadInterpretations();
    } catch (err) {
      console.error('Initialization check failed:', err);
    }
  }

  private static async loadInterpretations(): Promise<void> {
    try {
      await InterpretationSeederService.loadCachedInterpretations();
    } catch (err) {
      console.error('Failed to load interpretations:', err);
    }
  }
}