// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBZ57gWAgY_8Q8NmOODuLc58CTVF8CX74",
  authDomain: "death-star-project-7455c.firebaseapp.com",
  projectId: "death-star-project-7455c",
  storageBucket: "death-star-project-7455c.appspot.com",
  messagingSenderId: "1052221675028",
  appId: "1:1052221675028:web:65c62b0167e82622ce3901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  firebaseDB = getFirestore(app)
export const firebaseAuth= getAuth(app);