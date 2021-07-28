import firebase from "firebase/app";
import 'firebase/firestore';

const fb = firebase.initializeApp({
    apiKey: "AIzaSyDWl-PM3oJxVA5BBZVM6TIqGAcR9EFxDLo",
    authDomain: "importba-ch-reactjs.firebaseapp.com",
    projectId: "importba-ch-reactjs",
    storageBucket: "importba-ch-reactjs.appspot.com",
    messagingSenderId: "460604740916",
    appId: "1:460604740916:web:e11e9418a6dbdc5e920161",
    measurementId: "G-1J3LLP2Z11",
});

export const db = fb.firestore();
