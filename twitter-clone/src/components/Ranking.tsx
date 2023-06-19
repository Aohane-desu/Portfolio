import { useEffect } from "react";
import { db } from "../hooks/firebase";
import { useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";

type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type rankingProps = {
  result: number;
  type: number;
  player: string;
  createdAt: timeStamp;
  missType: number;
};

export const Ranking = () => {
  const [rank, setRank] = useState<rankingProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      //   const querySnapshot = await getDocs(collection(db, "score"));
      //   querySnapshot.forEach((doc) => setRank(doc.data() as rankingProps[]));
      const postData = collection(db, "score");
      const dataQuery = query(postData, orderBy("result", "desc"), limit(5));
      //リアルタイムで取得
      onSnapshot(dataQuery, (tweet) => {
        const newData = tweet.docs.map((doc) => {
          const data = doc.data() as rankingProps;
          return { ...data, id: doc.id };
        });
        setRank(newData);
      });
    };

    getData();
    console.log(rank);
  }, []); //スコアが出るときに変更する

  return (
    <div className=" w-[300px] bg-slate-200 rounded p-5">
      <h3 className="text-3xl border-b-2 border-black p-3">ランキング</h3>
      {rank.map(({ result, player }, num) => (
        <div
          className="flex items-center flex-wrap w-[100%] text-start pl-2 py-2 border-b-2 border-black"
          //   key={uuidv4()}
        >
          <p>{num + 1 + "位 :"}</p>
          <p className=" flex-1 border-black border-r-2 pl-2">{player}</p>
          <p className=" w-[100px] pl-2">Result: {result}</p>
        </div>
      ))}
    </div>
  );
};
