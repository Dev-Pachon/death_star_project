// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD2uZS3dW0JtSM_EOjGF-yXTvmueFFsvn8",
	authDomain: "death-star-project-655e2.firebaseapp.com",
	projectId: "death-star-project-655e2",
	storageBucket: "death-star-project-655e2.appspot.com",
	messagingSenderId: "910680737897",
	appId: "1:910680737897:web:64276a71146a4755c27af8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const  firebaseDB = getFirestore(app)

export const firebaseAuth= getAuth(app);