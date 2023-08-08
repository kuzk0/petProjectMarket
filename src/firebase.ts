import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDt-zqOgQRqZj3rP-caOvMLmsYe4OJdmdg",
  authDomain: "i-wvvw.firebaseapp.com",
  databaseURL: "https://i-wvvw-default-rtdb.firebaseio.com",
  projectId: "i-wvvw",
  storageBucket: "i-wvvw.appspot.com",
  messagingSenderId: "191085317306",
  appId: "1:191085317306:web:36ecef3171fe74173d8683",
  measurementId: "G-ZG3WJ8KWN5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
