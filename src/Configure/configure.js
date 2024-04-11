import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBiDeS5nKFEY8rHGN4-MqKBNdlMt79toFY",
  authDomain: "map-api-project-419811.firebaseapp.com",
  projectId: "map-api-project-419811",
  storageBucket: "map-api-project-419811.appspot.com",
  messagingSenderId: "152562470082",
  appId: "1:152562470082:web:b3a64eec0dad81d6d6bf5b",
  measurementId: "G-2RBF7RPF04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider()

export {auth,provider}