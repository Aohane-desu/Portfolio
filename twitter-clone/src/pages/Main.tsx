import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/firebase";

const Main = () => {
  const navigation = useNavigate();
  const sendTwitter = () => {
    navigation("/post");
  };

  const sendTyping = () => {
    navigation("/typing");
  };

  const auth = useAuth();
  const currentUser = auth.currentUser;
  return (
    <>
      <Navbar />
      <div className="text-center">
        <h1 className="text-3xl mt-10">
          ようこそ！{currentUser?.displayName}さん！
        </h1>
        <div className="flex justify-around mt-10 flex-wrap">
          <button
            className="w-80 h-80 mb-10 border bg-[#53b39a] text-white rounded-full text-3xl hover:opacity-80"
            onClick={sendTwitter}
          >
            匿名掲示板
          </button>
          <button
            className="w-80 h-80 mb-10 border bg-[#53b39a] text-white rounded-full text-3xl hover:opacity-80"
            onClick={sendTyping}
          >
            タイピングゲーム
          </button>
          <button className="w-80 h-80 mb-10 border bg-[#a8a8a8] text-white rounded-full text-3xl">
            Coming soon...
          </button>
          <button className="w-80 h-80 mb-10 border bg-[#a8a8a8] text-white rounded-full text-3xl">
            Coming soon...
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
