import { useEffect, useState } from "react";
import { Ranking } from "./Ranking";
import { Link } from "react-router-dom";
import {
  collection,
  orderBy,
  query,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../hooks/firebase";
import Navbar from "./Navbar";

type rankingProps = {
  result: number;
  score: number;
  player: string;
  misstype: number;
};
const GameOver = () => {
  const [score, setScore] = useState<rankingProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const postData = collection(db, "score");
      const dataQuery = query(postData, orderBy("createdAt", "desc"), limit(1));
      //リアルタイムで取得
      onSnapshot(dataQuery, (tweet) => {
        const newData = tweet.docs.map((doc) => {
          const data = doc.data() as rankingProps;
          return { ...data, id: doc.id };
        });
        setScore(newData);
      });
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen flex-row items-center justify-center text-center">
        <div
          className="mx-auto table-cell h-[80vh]
        w-[80vw] rounded bg-[#12a880] p-10"
        >
          <h5 className="text-5xl">Game Over</h5>
          <div className="mt-8 flex justify-around">
            <div>
              {score.map(({ score, misstype, result }) => (
                <div className="text-start">
                  <p>タイプ数 :{score}</p>
                  <p> ミスタイプ数 :{misstype}</p>
                  <p className="mt-[30px] text-3xl">Your Score : {result}</p>
                </div>
              ))}

              <button className="mt-10 h-[150px] w-[200px] cursor-pointer rounded-xl bg-white text-3xl hover:opacity-80">
                <Link to="/typingmain">Retry</Link>
              </button>
            </div>
            <Ranking />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOver;
