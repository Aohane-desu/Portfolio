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
import { useNavigate } from "react-router-dom";

type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type dataProps = {
  text: string;
  nickName: string;
  createdAt: timeStamp;
  id: string;
};
const Post = () => {
  const [message, setMessage] = useState<dataProps[]>([]);

  useEffect(() => {
    //データ取得
    const fetchData = async () => {
      const postData = collection(db, "message");
      const dataQuery = query(
        postData,
        orderBy("createdAt", "desc"),
        limit(10)
      );
      //リアルタイムで取得
      onSnapshot(dataQuery, (tweet) => {
        const newData = tweet.docs.map((doc) => {
          const data = doc.data() as dataProps;
          return { ...data, id: doc.id };
        });
        setMessage(newData);
      });
    };
    fetchData();
  }, []);

  //掲示板の中身へ
  const navigation = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-[90vw] h-screen mx-auto mt-10 ">
        <h1 className="text-center text-3xl  mb-10">匿名掲示板</h1>
        <p>
          1.
          個人情報の公開は禁止です。他のユーザーの個人情報や特定可能な情報を投稿しないでください。
        </p>
        <p>
          2.
          誹謗中傷や差別的な表現は禁止です。他のユーザーを攻撃するような投稿は行わないでください。
        </p>
        <p>
          3.
          違法行為や暴力的な内容の投稿は禁止です。犯罪行為の促進や危険な行動を助長するような投稿は行わないでください。
        </p>
        <p>
          4.
          他のユーザーへの尊重と礼儀を守ってください。良識ある行動を心掛けましょう。
        </p>
        <p>
          5.
          管理者の指示に従ってください。掲示板の運営に関する指示や要請に対しては、協力して対応してください。
        </p>
        <p>
          6.
          ルール違反の報告や問題の報告は適切な方法で行ってください。管理者に対して違反の報告や問題の報告ができる方法を提供していますので、それを利用してください。
        </p>
        {message.map((data) => (
          <div
            className="p-10 mt-5 rounded-xl border border-[#53b39a] cursor-pointer hover:bg-[#53b39a] hover:text-white"
            key={Math.random()}
            onClick={() =>
              navigation("/text", { state: { text: data.text, id: data.id } })
            }
          >
            <p className="text-2xl">{data.text}</p>
          </div>
        ))}

        <Tweet />
      </div>
    </>
  );
};

export default Post;
