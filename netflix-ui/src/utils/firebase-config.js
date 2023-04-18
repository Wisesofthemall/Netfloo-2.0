import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const { getDatabase, onValue, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyB4e1a05l8Q-i9-u2PCotv_YEBDM-QkkCM",
  authDomain: "react-netfloo.firebaseapp.com",
  projectId: "react-netfloo",
  storageBucket: "react-netfloo.appspot.com",
  messagingSenderId: "236476298639",
  appId: "1:236476298639:web:843ed635445e75a28887fa",
  measurementId: "G-S6D77RPVL3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
