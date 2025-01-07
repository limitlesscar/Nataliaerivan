// Import required Firebase components
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Use collection and getDocs for querying
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getMessaging } from 'firebase/messaging';

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

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);
const messaging = getMessaging(app);

export { firestore, auth, storage, database, messaging }; // Exporting the services
