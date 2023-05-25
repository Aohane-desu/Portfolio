import Navbar from "./Navbar";
import Tweet from "./Tweet";
import {
  collection,
  onSnapshot,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../hooks/firebase";
import { useEffect, useState } from "react";

type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type dataProps = {
  text: string;
  nickName: string;
  createdAt: timeStamp;
};
const Post = () => {
  const [message, setMessage] = useState<dataProps[]>([]);

  useEffect(() => {
    //データ取得
    const postData = collection(db, "message");
    const dataQuery = query(postData, orderBy("createdAt", "desc"), limit(10));
    //リアルタイムで取得
    onSnapshot(dataQuery, (tweet) => {
      setMessage(tweet.docs.map((doc) => doc.data() as dataProps));
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-[90vw] h-screen mx-auto mt-10 ">
        {message.map((data) => (
          <div className="p-10 mt-10 border" key={Math.random()}>
            <p className="text-3xl">{data.nickName}</p>
            <p>{data.text}</p>
          </div>
        ))}

        <Tweet />
      </div>
    </>
  );
};

export default Post;
