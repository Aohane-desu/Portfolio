import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
  projectId: "twitter-clone-74163",
  storageBucket: "twitter-clone-74163.appspot.com",
  messagingSenderId: "766961091857",
  appId: "1:766961091857:web:3bfa063397dca3fe8678b0",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export function useAuth() {
  return auth;
}

export function useUser() {
  const [user, setUser] = useState<User>();
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
  });
  return user;
}

const db = getFirestore(app);
export { db };
