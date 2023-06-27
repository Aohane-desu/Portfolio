import { useEffect } from "react";
import { db } from "../hooks/firebase";
import { useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

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
  }, []); //スコアが出るときに変更する

  return (
    <div className=" w-[300px] rounded bg-slate-200 p-5">
      <h3 className="border-b-2 border-black p-3 text-3xl">ランキング</h3>
      {rank.map(({ result, player }, num) => (
        <div
          className="flex w-[100%] flex-wrap items-center border-b-2 border-black py-2 pl-2 text-start"
          key={num}
        >
          <p>{num + 1 + "位 :"}</p>
          <p className=" flex-1 border-r-2 border-black pl-2">{player}</p>
          <p className=" w-[100px] pl-2">Result: {result}</p>
        </div>
      ))}
    </div>
  );
};
