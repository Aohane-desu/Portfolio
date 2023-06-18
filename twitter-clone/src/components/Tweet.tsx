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
      collection: {},
    });

    setText("");
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className="flex justify-center fixed bottom-5 right-5 bg-white">
          <div className="w-[30vw] h-[30vh] bg-[#5dc9ad] rounded p-5">
            <h2 className="text-xl pb-5 font-bold">掲示板を作成</h2>
            <label htmlFor="">タイトル</label>
            <input
              type="text"
              className="border-b border-black pl-2 mt-1 outline-none block w-full"
              placeholder="How to use React?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button className="border p-2 rounded-xl block bg-white mt-16 mx-auto w-[60%] hover:bg-[#f7f7f7]">
              作成
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Tweet;
