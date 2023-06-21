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
      <div className="w-screen h-screen text-center flex flex-row justify-center items-center">
        <div
          className="w-[80vw] mx-auto bg-[#12a880]
        h-[80vh] table-cell rounded p-10"
        >
          <h5 className="text-5xl">Game Over</h5>
          <div className="flex justify-around mt-8">
            <div>
              {score.map(({ score, misstype, result }) => (
                <div className="text-start">
                  <p>タイプ数 :{score}</p>
                  <p> ミスタイプ数 :{misstype}</p>
                  <p className="text-3xl mt-[30px]">Your Score : {result}</p>
                </div>
              ))}

              <button className="rounded-xl bg-white w-[200px] h-[150px] mt-10 cursor-pointer text-3xl hover:opacity-80">
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
