import { db, useAuth } from "../hooks/firebase";
import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Tweet = () => {
  const [text, setText] = useState("");
  const auth = useAuth();
  const uid = auth.currentUser;
  const nickName = auth.currentUser?.displayName;

  function sendMessage(e: FormEvent) {
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
        <div className="fixed bottom-5 right-5 flex justify-center bg-white">
          <div className="h-[30vh] w-[30vw] rounded bg-[#5dc9ad] p-5">
            <h2 className="pb-5 text-xl font-bold">掲示板を作成</h2>
            <label htmlFor="">タイトル</label>
            <input
              type="text"
              className="mt-1 block w-full border-b border-black pl-2 outline-none"
              placeholder="How to use React?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button className="mx-auto mt-16 block w-[60%] rounded-xl border bg-white p-2 hover:bg-[#f7f7f7]">
              作成
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Tweet;
