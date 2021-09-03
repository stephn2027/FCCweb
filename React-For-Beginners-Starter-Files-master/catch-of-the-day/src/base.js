import Rebase from "re-base";
// import firebase from "firebase";
import firebase from "firebase";
import "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCKM_AP-CnLquLcLsQULFZBAV8q6yJisBg",
//   authDomain: "catch-of-the-day-stephen-uy.firebaseapp.com",
//   databaseURL: "https://catch-of-the-day-stephen-uy-default-rtdb.firebaseio.com",
//   projectId: "catch-of-the-day-stephen-uy",
//   storageBucket: "catch-of-the-day-stephen-uy.appspot.com",
//   messagingSenderId: "537238013390",
//   appId: "1:537238013390:web:b5208cd988b193e13dd79f",
//   measurementId: "G-50661T1ZZ3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCKM_AP-CnLquLcLsQULFZBAV8q6yJisBg",
  authDomain: "catch-of-the-day-stephen-uy.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-stephen-uy-default-rtdb.firebaseio.com",
  projectId: "catch-of-the-day-stephen-uy",
  
})
 const base = Rebase.createClass(firebase.database());

 //named export
 export {firebaseApp};
 //default export
 export default base;