import { db, useAuth } from "../hooks/firebase";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Tweet = () => {
  const [text, setText] = useState("");
  const auth = useAuth();
  const uid = auth.currentUser;
  const nickName = auth.currentUser?.displayName;

  function sendMessage(e: any) {
    e.preventDefault();

    if (text === "") return;
    addDoc(collection(db, "message"), {
      text: text,
      uid: uid?.uid,
      nickName: nickName,
      createdAt: serverTimestamp(),
    });

    setText("");
  }

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

export default Tweet;
