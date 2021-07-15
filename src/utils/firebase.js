import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyC2NAyCJlT4LMhTMSCRvQrN1dnGVtXa5-Y",
  authDomain: "bsit-3c-martinangelo.firebaseapp.com",
  projectId: "bsit-3c-martinangelo",
  storageBucket: "bsit-3c-martinangelo.appspot.com",
  messagingSenderId: "937609379656",
  appId: "1:937609379656:web:8af8d1c731d52300647d7d",
  measurementId: "G-EGXZCG2JLD"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;