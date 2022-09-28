import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNuNKcOTWYL3m1Im5VvM0XoHu4NzQLBkc",
  authDomain: "chenchomendoza-840ae.firebaseapp.com",
  projectId: "chenchomendoza-840ae",
  storageBucket: "chenchomendoza-840ae.appspot.com",
  messagingSenderId: "867461680459",
  appId: "1:867461680459:web:16ac264f0bb56d4b22ecce",
};

var firebase = initializeApp(firebaseConfig);

var projectStorage = getStorage(firebase);
var projectFirestore = getFirestore(firebase);

export { projectStorage, projectFirestore };
