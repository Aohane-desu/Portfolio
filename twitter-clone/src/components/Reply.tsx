import { db, useAuth } from "../hooks/firebase";
import { useState } from "react";
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

  const sendMessage = async (e: any) => {
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
        <div className="flex justify-center fixed bottom-10 right-10 left-10">
          <input
            type="text"
            className="border-b border-black w-[80vw] pl-2 outline-none"
            placeholder="書き込もう！"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="border p-2 rounded-xl">送信</button>
        </div>
      </form>
    </>
  );
};

export default Reply;
