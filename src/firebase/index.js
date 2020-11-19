import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAja4EvWBmlFqVqXQYvSVc9iCHeZfoMDL8",
  authDomain: "cs-image-uploader.firebaseapp.com",
  databaseURL: "https://cs-image-uploader.firebaseio.com",
  projectId: "cs-image-uploader",
  storageBucket: "cs-image-uploader.appspot.com",
  messagingSenderId: "177644258008",
  appId: "1:177644258008:web:9443d4ee823b27f4494dad"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}