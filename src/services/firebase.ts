import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNuNKcOTWYL3m1Im5VvM0XoHu4NzQLBkc",
  authDomain: "chenchomendoza-840ae.firebaseapp.com",
  databaseURL: "https://chenchomendoza-840ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chenchomendoza-840ae",
  storageBucket: "chenchomendoza-840ae.appspot.com",
  messagingSenderId: "867461680459",
  appId: "1:867461680459:web:16ac264f0bb56d4b22ecce",
};

// Initialize Firebase App idempotently
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth, Storage & Realtime Database
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

let authPromise: Promise<User> | null = null;

/**
 * Ensures an invisible Firebase Anonymous session exists before any DB/Storage read.
 * Reuses cached sessions across visits and deduplicates concurrent callers.
 */
export const ensureAnonymousAuth = (): Promise<User> => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }

  if (authPromise) {
    return authPromise;
  }

  authPromise = new Promise<User>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
          return;
        }
        try {
          const credential = await signInAnonymously(auth);
          resolve(credential.user);
        } catch (err) {
          authPromise = null;
          reject(err);
        }
      },
      (err) => {
        unsubscribe();
        authPromise = null;
        reject(err);
      }
    );
  });

  return authPromise;
};

export default app;
