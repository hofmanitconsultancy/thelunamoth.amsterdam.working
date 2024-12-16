import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, COLLECTIONS } from '../config/firebase';
import type { BirthData } from '../types/birthData';
import type { PlaceDetails } from '../types/places';

export class BirthDataService {
  static async getBirthData(userId: string): Promise<BirthData | null> {
    try {
      const birthDataRef = doc(db, COLLECTIONS.BIRTH_DATA, userId);
      const snapshot = await getDoc(birthDataRef);
      return snapshot.exists() ? snapshot.data() as BirthData : null;
    } catch (err) {
      console.error('Error fetching birth data:', err);
      throw new Error('Failed to fetch birth data');
    }
  }

  static async setBirthData(
    userId: string, 
    data: { birthDate: string; birthTime: string; } & PlaceDetails
  ): Promise<BirthData> {
    try {
      const birthDataRef = doc(db, COLLECTIONS.BIRTH_DATA, userId);
      
      const birthData: BirthData = {
        userId,
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        birthPlace: data.formattedAddress,
        city: data.city,
        country: data.country,
        countryCode: data.countryCode,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        placeId: data.placeId
      };
      
      await setDoc(birthDataRef, birthData);
      return birthData;
    } catch (err) {
      console.error('Error setting birth data:', err);
      throw new Error('Failed to save birth data');
    }
  }
}