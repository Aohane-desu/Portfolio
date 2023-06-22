import { useEffect } from "react";
import { useState } from "react";
import { Count } from "./Count";
import { TextContent } from "./TextContent";
import { useNavigate } from "react-router-dom";
import { db, useAuth } from "../hooks/firebase";
import { collection, addDoc } from "firebase/firestore";

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
      sendResults();
      navigation("/GameOver");
    }
  }, [time]);
  //ここまでカウントダウン
  const auth = useAuth();
  const currentUser = auth.currentUser;
  async function sendResults() {
    const sendData = async () => {
      const displayName = currentUser ? currentUser.displayName : null;
      try {
        await addDoc(collection(db, "score"), {
          score: keyNumber,
          misstype: missType - keyNumber - 1,
          result: keyNumber - (missType - keyNumber) + 1,
          player: displayName,
          createdAt: new Date(),
        });
        console.log("データを送信しました");
      } catch (error) {
        console.error("データの送信エラー:", error);
      }
    };

    await sendData();
  }

  return (
    <>
      <div className="w-screen h-screen text-center flex flex-row justify-center items-center">
        <div
          className="w-[80vw] mx-auto bg-[#12a880]
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
    </>
  );
}

export default TypingMain;
