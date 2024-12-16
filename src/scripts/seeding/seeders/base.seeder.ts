import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export abstract class BaseSeeder {
  protected static async seedInterpretation(
    type: string,
    key: string,
    text: string
  ): Promise<void> {
    try {
      const docRef = doc(db, 'interpretations', `${type}_${key}`);
      await setDoc(docRef, { text });
      console.log(`Seeded: ${type}_${key}`);
    } catch (err) {
      console.error(`Failed to seed ${type}_${key}:`, err);
      throw err;
    }
  }

  protected static async seedBatch(
    type: string,
    interpretations: Record<string, string>
  ): Promise<void> {
    const entries = Object.entries(interpretations);
    console.log(`Seeding ${entries.length} ${type} interpretations...`);

    for (const [key, text] of entries) {
      await this.seedInterpretation(type, key, text);
    }
  }
}