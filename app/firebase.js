// firebase.js - Firestore only

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCgF1ddBEm9lV3kPZCilbPrv5idETjSfw0",
  authDomain: "nataliaeerivan.firebaseapp.com",
  projectId: "nataliaeerivan",
  storageBucket: "nataliaeerivan.appspot.com",
  messagingSenderId: "82510890156",
  appId: "1:82510890156:web:a99ac8cd04651b401ecb09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
