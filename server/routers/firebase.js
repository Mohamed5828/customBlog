const firebase = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBwKmYvl6eAKik33o-e7uAp_wS1m6wNVIY",
  authDomain: "blogimgupload-3998a.firebaseapp.com",
  projectId: "blogimgupload-3998a",
  storageBucket: "blogimgupload-3998a.appspot.com",
  messagingSenderId: "947780559632",
  appId: "1:947780559632:web:e114389b99cf849a18fb95",
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

module.exports = { storage };
