import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBoU69ykpaLiC_3xKIYxzXNNGZ1dp5o9Lw",
  authDomain: "facebook-messenger-clone-f825d.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-f825d.firebaseio.com",
  projectId: "facebook-messenger-clone-f825d",
  storageBucket: "facebook-messenger-clone-f825d.appspot.com",
  messagingSenderId: "855614294798",
  appId: "1:855614294798:web:5b16f703cdf8cee634a55f",
  measurementId: "G-KGEJ7FSW7C"
});

const db = firebaseApp.firestore();

export default db;