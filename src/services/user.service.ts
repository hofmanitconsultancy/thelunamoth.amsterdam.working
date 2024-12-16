import { doc, getDoc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db, COLLECTIONS } from '../config/firebase';
import type { UserProfile } from '../types/user';

export class UserService {
  static async createProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const profile: UserProfile = {
      uid: userId,
      email: data.email!,
      displayName: data.displayName,
      createdAt: new Date(),
      ...data
    };
    
    await setDoc(userRef, profile);
    return profile;
  }

  static async getProfile(userId: string): Promise<UserProfile | null> {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? snapshot.data() as UserProfile : null;
  }

  static async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await setDoc(userRef, data, { merge: true });
    
    const updatedSnapshot = await getDoc(userRef);
    if (!updatedSnapshot.exists()) {
      throw new Error('Profile not found');
    }
    
    return updatedSnapshot.data() as UserProfile;
  }

  static async deleteProfile(userId: string): Promise<void> {
    const batch = writeBatch(db);
    
    // Delete all user data in a batch
    const collections = [
      COLLECTIONS.USERS,
      COLLECTIONS.MEMBERSHIPS,
      COLLECTIONS.BIRTH_DATA
    ];

    for (const collection of collections) {
      const docRef = doc(db, collection, userId);
      batch.delete(docRef);
    }

    // Commit the batch
    await batch.commit();
  }
}