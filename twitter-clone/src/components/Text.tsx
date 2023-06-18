import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Reply from "./Reply";
import { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "../hooks/firebase";
import { onSnapshot, orderBy, query } from "firebase/firestore";

type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type replyProps = {
  text: string;
  nickName: string;
  createdAt: timeStamp;
  id: string;
  rowNum: number;
};

const Text = () => {
  const location = useLocation();
  const title = location.state.text;
  const id = location.state.id;

  const [reply, setReply] = useState<replyProps[]>([]);

  useEffect(() => {
    //データ取得
    const fetchData = async () => {
      const replyData = collection(db, `message/${id}/reply`);
      const dataQuery = query(replyData, orderBy("createdAt", "asc"));
      //リアルタイムで取得
      onSnapshot(dataQuery, (tweet) => {
        const newData = tweet.docs.map((doc) => {
          const data = doc.data() as replyProps;
          return { ...data, id: doc.id };
        });
        setReply(newData);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-4xl">{title}</h1>
        <div>
          {reply.map((data) => (
            <>
              <div className="border p-5 mt-5  rounded-xl" key={data.rowNum}>
                <p>{data.rowNum}</p>
                <p className=" text-xl">{data.text}</p>
              </div>
            </>
          ))}
        </div>
      </div>
      <Reply id={id} />
    </>
  );
};

export default Text;
