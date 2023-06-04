import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Place API here",
  authDomain: "react-netfloo.firebaseapp.com",
  projectId: "react-netfloo",
  storageBucket: "react-netfloo.appspot.com",
  messagingSenderId: "236476298639",
  appId: "Place AppID Here",
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
