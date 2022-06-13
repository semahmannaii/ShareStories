import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB_NIi4KEz7aogFM1tN9tuafG9qDGQNaws",
    authDomain: "share-stories-dev.firebaseapp.com",
    projectId: "share-stories-dev",
    storageBucket: "share-stories-dev.appspot.com",
    messagingSenderId: "541128273563",
    appId: "1:541128273563:web:9cd362caa95624cfb9603e"
}

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
const storage = getStorage(firebase)
const firestore = getFirestore(firebase)

export { auth, storage, firestore }