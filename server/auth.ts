import { auth } from './firebase';
import type { User } from '../shared/schema';

export class AuthService {
  async createUser(email: string, password: string, displayName: string): Promise<User | null> {
    if (!auth) {
      throw new Error('Firebase Auth not configured');
    }

    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      const user: User = {
        id: userRecord.uid,
        name: displayName,
        email,
        createdAt: new Date(),
      };

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async verifyIdToken(idToken: string): Promise<any> {
    if (!auth) {
      throw new Error('Firebase Auth not configured');
    }

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    if (!auth) {
      throw new Error('Firebase Auth not configured');
    }

    try {
      const userRecord = await auth.getUserByEmail(email);
      return userRecord;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  async deleteUser(uid: string): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth not configured');
    }

    try {
      await auth.deleteUser(uid);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async setCustomUserClaims(uid: string, customClaims: object): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth not configured');
    }

    try {
      await auth.setCustomUserClaims(uid, customClaims);
    } catch (error) {
      console.error('Error setting custom claims:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();