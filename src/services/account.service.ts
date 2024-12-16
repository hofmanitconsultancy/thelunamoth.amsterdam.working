import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';
import { UserService } from './user.service';

export class AccountService {
  static async reauthenticate(password: string): Promise<void> {
    const user = auth.currentUser;
    if (!user?.email) {
      throw new Error('No authenticated user found');
    }

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
  }

  static async deleteAccount(userId: string, password: string): Promise<void> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User must be authenticated');
      }

      // Re-authenticate user before deletion
      await this.reauthenticate(password);

      // Delete user data first
      await UserService.deleteProfile(userId);
      
      // Delete Firebase auth user
      await deleteUser(currentUser);
    } catch (err) {
      console.error('Account deletion error:', err);
      if (err instanceof Error) {
        if (err.message.includes('auth/requires-recent-login')) {
          throw new Error('Please re-enter your password to confirm account deletion');
        }
        throw new Error(err.message);
      }
      throw new Error('Failed to delete account');
    }
  }
}