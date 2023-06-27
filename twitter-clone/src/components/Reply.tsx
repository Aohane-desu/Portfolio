import { db, useAuth } from "../hooks/firebase";
import { FormEvent, useState } from "react";
import {
  collection,
  serverTimestamp,
  getDocs,
  setDoc,
  doc,
  query,
} from "firebase/firestore";

const Reply = (id: any) => {
  const [text, setText] = useState("");
  const auth = useAuth();
  const uid = auth.currentUser;
  const nickName = auth.currentUser?.displayName;
  const [rowNum, setRowNum] = useState(1);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (text === "") return;

    const q = query(collection(db, "message"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    console.log(queryData);

    queryData.map(async () => {
      await setDoc(doc(db, `message/${id.id}/reply`, text), {
        text: text,
        uid: uid?.uid,
        nickName: nickName,
        createdAt: serverTimestamp(),
        rowNum: rowNum,
      });
    });

    setRowNum((prevRowNum) => prevRowNum + 1);
    setText("");
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className="fixed bottom-10 left-10 right-10 flex justify-center">
          <input
            type="text"
            className="w-[80vw] border-b border-black pl-2 outline-none"
            placeholder="書き込もう！"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="rounded-xl border p-2">送信</button>
        </div>
      </form>
    </>
  );
};

export default Reply;
