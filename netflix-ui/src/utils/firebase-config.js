import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
// function writeVideoData(movieID, link) {
//   const reference = ref(db, "Videos/" + movieID);
//   set(reference, {
//     movieID: movieID,
//     link: link,
//   });
// }

// writeVideoData(3133122, "yoiniim");
export const firebaseAuth = getAuth(app);
// const reference = ref(db, "Videos/3122");

// onValue(reference, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data.movieID);
//   console.log(data.link);
//   console.log(data);
// });
