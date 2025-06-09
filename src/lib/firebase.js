// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB81qExDcM9CSla1tNPMWVmik8S5NTx6JU",
  authDomain: "prescripto-9faac.firebaseapp.com",
  projectId: "prescripto-9faac",
  storageBucket: "prescripto-9faac.firebasestorage.app",
  messagingSenderId: "561586380600",
  storageBucket: "prescripto-9faac-free-tier", // Use the free-tier bucket
  appId: "1:561586380600:web:dc89001236aa92c05c2bcd",
  measurementId: "G-L1WH2359ZQ"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://prescripto-9faac-free-tier");

// Initialize Analytics only on the client-side
let analytics;
if (typeof window !== "undefined") {
  // Check if Analytics is supported in the environment
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((error) => {
    console.error("Analytics not supported:", error);
  });
}

// Export the initialized services to use elsewhere in your app
export { app, auth, db, analytics, storage };