import { useEffect } from "react";
import { useState } from "react";
import { Count } from "./Count";
import { TextContent } from "./TextContent";
import { useNavigate } from "react-router-dom";
import { db, useAuth } from "../hooks/firebase";

function TypingMain() {
  // ここからタイピング
  const [pressedKey, setPressedKey] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [word, setWord] = useState("");
  const [currentNumber, setCurrentnumber] = useState(0);
  const [keyNumber, setKeyNumber] = useState(0);
  const [missType, setMissType] = useState(0);

  //キーの取得
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Shift") {
        return;
      }
      setPressedKey(e.key);
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        setPressedKey(e.key);
      });
    };
  }, []);

  //次の文字へ移る
  useEffect(() => {
    if (currentNumber === null) {
      setCurrentnumber(0);
    }
    if (pressedKey === word.split("")[currentNumber]) {
      setCurrentnumber((prevCurrentNumber) => prevCurrentNumber + 1);
      setKeyNumber((prevKeynumber) => prevKeynumber + 1);
      // 正解だった文字を"_"に変換
      const newWord = word.split("");
      newWord[currentNumber] = "_";
      setWord(newWord.join(""));
    }
    if (pressedKey !== word.split("")[currentNumber]) {
      setMissType((prevMissType) => prevMissType + 1);
    }
  }, [pressedKey]);

  //文字をすべて打ち終わった際の処理
  useEffect(() => {
    setPressedKey("");
    if (currentNumber === word.split("").length) {
      setCurrentStage((prevCurrentStage) => prevCurrentStage + 1);
      setCurrentnumber(0);
    }
  }, [keyNumber]);
  //ここまでタイピング

  //ここからカウントダウン
  const navigation = useNavigate();
  const [time, setTime] = useState(30);

  useEffect(() => {
    function startCountDown() {
      setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time > 0) {
      startCountDown();
    } else {
      //データベースにタイプ数、ミスタイプ数、ID名を保存する
      //   sendResults();
      navigation("/GameOver");
    }
  }, [time]);
  //ここまでカウントダウン

  // function sendResults() {
  //   const auth = useAuth();
  //   const  uid  = auth.currentUser;

  //     db.collection("typing").add({
  //       uid,
  //       score: keyNumber,
  //       misstype: missType - keyNumber - 1,
  //       result: keyNumber - (missType - keyNumber) + 1,
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       player: auth.currentUser.displayName,
  //     });
  //   }

  return (
    <div className="w-screen h-screen text-center flex flex-row justify-center items-center">
      <div
        className="w-[80vw] mx-auto bg-slate-200
        h-[80vh] table-cell rounded p-10"
      >
        <div>
          <div className="text-center text-5xl">{time}</div>
        </div>
        <Count keyNumber={keyNumber} missType={missType} />
        <TextContent
          setWord={setWord}
          currentStage={currentStage}
          word={word}
        />
      </div>
    </div>
  );
}

export default TypingMain;
