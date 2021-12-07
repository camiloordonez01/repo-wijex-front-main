import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDc0AUEXQNzsy8vPiPimCoTgUOJZLKLGU0",
    authDomain: "clear-incentive-329822.firebaseapp.com",
    projectId: "clear-incentive-329822",
    storageBucket: "clear-incentive-329822.appspot.com",
    messagingSenderId: "302587439714",
    appId: "1:302587439714:web:3cffafc56ac01bc3e8ff3b",
    measurementId: "G-M3KZ1R05NF"
}

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


export {
    storage, firebase as default
}