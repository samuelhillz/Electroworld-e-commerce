// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


// Your web app's Firebase configuration
 export const firebaseConfig = {
  apiKey: "AIzaSyAzb9CGQQTK0abq6AmveNL1hucVJjj_b1g",
  authDomain: "shoppingapp-a7994.firebaseapp.com",
  projectId: "shoppingapp-a7994",
  storageBucket: "shoppingapp-a7994.appspot.com",
  messagingSenderId: "628158147608",
  appId: "1:628158147608:web:f8a555359282811465276d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
