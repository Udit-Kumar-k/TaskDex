// Firebase configuration (optional - can be used for cloud sync later)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCI9BZlzuNFD8__sMvnFJ2q3Ego4RA9gpY",
  authDomain: "prototype-1280b.firebaseapp.com",
  projectId: "prototype-1280b",
  storageBucket: "prototype-1280b.firebasestorage.app",
  messagingSenderId: "32846527974",
  appId: "1:32846527974:web:9f9ea971866663e8ecea27"
};

// Initialize Firebase (optional - only if you want cloud sync)
let app = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.warn("Firebase initialization failed (using local storage):", error);
}

export { app, db };

