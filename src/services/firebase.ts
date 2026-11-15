import { initializeApp, getApps, getApp } from "firebase/app";
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

// Initialize Storage & Realtime Database
export const storage = getStorage(app);
export const database = getDatabase(app);
export default app;
