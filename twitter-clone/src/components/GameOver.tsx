import { useEffect, useState } from "react";
import { Ranking } from "./Ranking";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GameOver = () => {
  const [score, SetScore] = useState([]);
  //   useEffect(() => {
  //     db.collection("typing")
  //       .orderBy("createdAt", "desc")
  //       .limit(1)
  //       .onSnapshot((snapshot) => {
  //         SetScore(snapshot.docs.map((doc) => doc.data()));
  //       });
  //   }, []);

  //   const navigation = useNavigate();
  //   function signOut() {
  //     auth.signOut();
  //     navigation("/");
  //   }
  return (
    <div className="w-screen h-screen text-center flex flex-row justify-center items-center">
      <div
        className="w-[80vw] mx-auto bg-slate-200
        h-[80vh] table-cell rounded p-10"
      >
        <h5 className="text-5xl">Game Over</h5>
        <div className="flex justify-around mt-8">
          <div>
            {score.map(({ id, score, misstype, result }) => (
              <div className="text-start" key={id}>
                <p>タイプ数 :{score}</p>
                <p> ミスタイプ数 :{misstype}</p>
                <p className="text-3xl mt-[30px]">Your Score : {result}</p>
              </div>
            ))}

            {/* <div className="mt-3">
            <h4 className="mr-3">
              ログイン中のユーザー名：{" "}
              {auth.currentUser ? auth.currentUser.displayName : "未ログイン"}
            </h4>
            <button onClick={signOut}>サインアウト</button> */}
            {/* </div> */}

            <button className="rounded-xl bg-slate-700 w-[200px] h-[150px] mt-10 cursor-pointer text-white text-3xl hover:opacity-80">
              <Link to="/typingmain">Retry</Link>
            </button>
          </div>
          <Ranking />
        </div>
      </div>
    </div>
  );
};

export default GameOver;
