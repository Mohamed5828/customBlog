// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwKmYvl6eAKik33o-e7uAp_wS1m6wNVIY",
  authDomain: "blogimgupload-3998a.firebaseapp.com",
  projectId: "blogimgupload-3998a",
  storageBucket: "blogimgupload-3998a.appspot.com",
  messagingSenderId: "947780559632",
  appId: "1:947780559632:web:e114389b99cf849a18fb95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
