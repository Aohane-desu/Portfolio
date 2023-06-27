import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/firebase";
import { User, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Nickname from "../components/Nickname";
import Main from "./Main";

const Content = () => {
  //ログイン中の名前を設定
  const auth = useAuth();
  const [name, setName] = useState("");
  const currentUser: User | null = auth.currentUser;
  const navigate = useNavigate();

  const sendName = (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }
    updateProfile(currentUser, {
      displayName: name,
    });

    if (currentUser.displayName) {
      alert("ニックネームを登録しました。");
      navigate("/main");
    }
  };

  if (!auth.currentUser?.displayName) {
    return (
      <>
        <Nickname setName={setName} name={name} sendName={sendName} />
      </>
    );
  } else {
    return (
      <>
        <Main />
      </>
    );
  }
};

export default Content;
