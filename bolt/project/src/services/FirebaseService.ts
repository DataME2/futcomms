import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import '@nativescript/firebase-storage';
import { User } from '../types';

class FirebaseService {
  async initialize(): Promise<void> {
    try {
      await firebase.initializeApp();
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      throw error;
    }
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return this.mapFirebaseUserToUser(userCredential.user);
    } catch (error) {
      console.error('Email sign-in failed:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithProvider(googleProvider);
      return this.mapFirebaseUserToUser(userCredential.user);
    } catch (error) {
      console.error('Google sign-in failed:', error);
      throw error;
    }
  }

  async uploadRecording(filePath: string, gameId: string): Promise<string> {
    try {
      const storage = firebase.storage();
      const reference = storage.ref(`recordings/${gameId}/${Date.now()}.m4a`);
      await reference.putFile(filePath);
      return await reference.getDownloadURL();
    } catch (error) {
      console.error('Upload recording failed:', error);
      throw error;
    }
  }

  private mapFirebaseUserToUser(firebaseUser: any): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email
    };
  }
}

export const firebaseService = new FirebaseService();