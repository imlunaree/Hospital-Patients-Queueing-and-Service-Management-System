
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM36k8wFgH_RreXmYAFnZaZR7xFnwV8VM",
  authDomain: "hospital-patient-queuing.firebaseapp.com",
  projectId: "hospital-patient-queuing",
  storageBucket: "hospital-patient-queuing.appspot.com",
  messagingSenderId: "54249020961",
  appId: "1:54249020961:web:73dccae1ecaf6aec3acd60",
  measurementId: "G-C93VMS79S7"
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }