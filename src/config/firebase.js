// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// 🔴 PASTE YOUR FIREBASE CONFIG HERE 🔴
// (Get this from: Project Settings > General > Your Apps in Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBMixv0TSMkZbQsWvE6egV1SEqAUWUAPcw",
  authDomain: "imagesmith-2545b.firebaseapp.com",
  projectId: "imagesmith-2545b",
  storageBucket: "imagesmith-2545b.firebasestorage.app",
  messagingSenderId: "178767870404",
  appId: "1:178767870404:web:2794318360a6fb566f4c91",
  measurementId: "G-JCZQGL4V87"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// --- AUTH FUNCTIONS ---

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists in Firestore, if not, create it
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create new user profile in DB with Free tier defaults
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isGodMode: false, // Default to Free
        createdAt: new Date()
      });
    }
    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  await signOut(auth);
};