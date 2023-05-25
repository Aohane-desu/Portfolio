import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuth, db } from "../hooks/firebase";
import { User, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Nickname from "../components/Nickname";
import Main from "./Main";

type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type dataProps = {
  text: string;
  nickName: string;
  createdAt: timeStamp;
};

const Content = () => {
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

  //ログイン中の名前を設定
  const auth = useAuth();
  const [name, setName] = useState("");
  const currentUser: User | null = auth.currentUser;
  const navigate = useNavigate();

  const sendName = (e: any) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }
    updateProfile(currentUser, {
      displayName: name,
    });

    if (currentUser.displayName) {
      alert("ニックネームを登録しました。");
      navigate("/");
    }
  };

  if (!auth.currentUser) {
    return <Loading />;
  } else if (!auth.currentUser?.displayName) {
    return (
      <>
        <Nickname setName={setName} name={name} sendName={sendName} />
      </>
    );
  } else {
    return (
      <>
        <Main message={message} />
      </>
    );
  }
};

export default Content;
