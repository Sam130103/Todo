import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "@firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyABhCEyYSXlMoZ3HivtBbM5Mel2Q4lzbbw",
  authDomain: "todo-69e02.firebaseapp.com",
  projectId: "todo-69e02",
  storageBucket: "todo-69e02.appspot.com",
  messagingSenderId: "907683170717",
  appId: "1:907683170717:web:54a00bf32471615bebc774",
  measurementId: "G-6NYDZ4M3DK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export {db,storage};