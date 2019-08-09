import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_PROJECT_ID+".firebaseapp.com",
  databaseURL: "https://"+process.env.VUE_APP_PROJECT_ID+".firebaseio.com",
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_PROJECT_ID+".appspot.com",
  messagingSenderId: "638367794725"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();