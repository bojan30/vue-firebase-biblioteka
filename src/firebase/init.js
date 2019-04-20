import firebase from 'firebase'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDSFDFXHwRL7gSuLaEPXzZkbbVFlz2t3qQ",
  authDomain: "library-340b7.firebaseapp.com",
  databaseURL: "https://library-340b7.firebaseio.com",
  projectId: "library-340b7",
  storageBucket: "library-340b7.appspot.com",
  messagingSenderId: "638367794725"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();