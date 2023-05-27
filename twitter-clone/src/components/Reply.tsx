import { db, useAuth } from "../hooks/firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";

const Reply = () => {
  const [text, setText] = useState("");
  const auth = useAuth();
  const uid = auth.currentUser;
  const nickName = auth.currentUser?.displayName;

  function sendMessage(e: any) {
    e.preventDefault();

    if (text === "") return;
    // addDoc(collection(db, "message"), {
    //   text: text,
    //   uid: uid?.uid,
    //   nickName: nickName,
    //   createdAt: serverTimestamp(),
    // });

    setText("");
  }

  const getData = async () => {
    const docRef = doc(db, "message", "message");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    }
  };

  getData();

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className="flex fixed bottom-10 right-10 left-10">
          <input
            type="text"
            className="border-b border-black w-full pl-2 outline-none"
            placeholder="書き込もう！"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="border p-2 rounded-xl">Tweet</button>
        </div>
      </form>
    </>
  );
};

export default Reply;
