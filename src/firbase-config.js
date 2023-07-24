import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqdM8LpBe2DQSRs39zt4jSr8swuYDV7Q0",
  authDomain: "fileglide.firebaseapp.com",
  projectId: "fileglide",
  storageBucket: "fileglide.appspot.com",
  messagingSenderId: "1044239917850",
  appId: "1:1044239917850:web:7d47fbe5edd1fd33b682a3",
  measurementId: "G-5JFBQWEZQX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);