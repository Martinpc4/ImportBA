import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

require('dotenv').config();

export const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const db = getFirestore(app);

export const ordersRef = collection(db, 'orders');
export const itemsRef = collection(db, 'items');

export default db;
