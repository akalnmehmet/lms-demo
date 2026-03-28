import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyHsU2oikD-q5SpLqXpft4_SjsCYT_iOo",
  authDomain: "skill-school-elite.firebaseapp.com",
  projectId: "skill-school-elite",
  storageBucket: "skill-school-elite.firebasestorage.app",
  messagingSenderId: "913443424928",
  appId: "1:913443424928:web:e441295b9ffa1e8d4857c5",
  measurementId: "G-CJBH5RLW39"
};

// Next.js SSR uyumlu Firebase başlatma
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
