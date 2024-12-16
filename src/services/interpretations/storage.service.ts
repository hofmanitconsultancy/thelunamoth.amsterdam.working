import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export class InterpretationStorageService {
  private static readonly COLLECTION = 'interpretations';

  static async getInterpretation(type: string, key: string): Promise<string | null> {
    try {
      const docRef = doc(db, this.COLLECTION, `${type}_${key}`);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data().text : null;
    } catch (err) {
      console.error('Error fetching interpretation:', err);
      return null;
    }
  }

  static async getAllInterpretations(type: string): Promise<Record<string, string>> {
    try {
      const interpretationsRef = collection(db, this.COLLECTION);
      const snapshot = await getDocs(interpretationsRef);
      
      return snapshot.docs
        .filter(doc => doc.id.startsWith(type))
        .reduce((acc, doc) => ({
          ...acc,
          [doc.id.replace(`${type}_`, '')]: doc.data().text
        }), {});
    } catch (err) {
      console.error('Error fetching interpretations:', err);
      return {};
    }
  }

  static async saveInterpretation(
    type: string,
    key: string,
    text: string
  ): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION, `${type}_${key}`);
      await setDoc(docRef, { text });
    } catch (err) {
      console.error('Error saving interpretation:', err);
      throw err;
    }
  }
}