import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
let app;
if (getApps().length === 0) {
  if (process.env.FIREBASE_PROJECT_ID) {
    // Initialize with environment variables when available
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  } else {
    console.log('Firebase credentials not found. Running in development mode without Firebase.');
    // For development without Firebase credentials
    app = null;
  }
} else {
  app = getApps()[0];
}

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

// Client-side Firebase configuration
export const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const isFirebaseConfigured = () => {
  return !!(process.env.FIREBASE_PROJECT_ID && 
           process.env.FIREBASE_PRIVATE_KEY && 
           process.env.FIREBASE_CLIENT_EMAIL);
};