import * as firebase from 'firebase';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqjlUw4mmHCifP3BbleVp5sLAUWTYpR74",
  authDomain: "soundcloud-c3feb.firebaseapp.com",
  databaseURL: "https://soundcloud-c3feb.firebaseio.com",
  projectId: "soundcloud-c3feb",
  storageBucket: "soundcloud-c3feb.appspot.com",
  messagingSenderId: "1010127862680",
  appId: "1:1010127862680:web:23e8dd47c88df362d309ed",
  measurementId: "G-RJF1VBYCE6"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;