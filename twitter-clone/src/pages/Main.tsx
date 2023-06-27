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
        <h1 className="mt-10 text-3xl">
          ようこそ！{currentUser?.displayName}さん！
        </h1>
        <p>ポートフォリオです。作成したものを掲載しています。</p>
        <div className="mt-10 flex flex-wrap justify-around gap-5">
          <button
            className="mb-10 h-80 w-80 rounded-full border bg-[#53b39a] text-3xl text-white hover:opacity-80"
            onClick={sendTwitter}
          >
            匿名掲示板
          </button>
          <button
            className="mb-10 h-80 w-80 rounded-full border bg-[#53b39a] text-3xl text-white hover:opacity-80"
            onClick={sendTyping}
          >
            タイピングゲーム
          </button>
          <button className="mb-10 h-80 w-80 rounded-full border bg-[#53b39a] text-3xl text-white hover:opacity-80">
            <a href="	http://aohane.moo.jp/portfolio/" target="_blank">
              国紹介アプリ in English
            </a>
          </button>
          <button className="mb-10 h-80 w-80 rounded-full border bg-[#a8a8a8] text-3xl text-white">
            Coming soon...
          </button>
          <button className="mb-10 h-80 w-80 rounded-full border bg-[#a8a8a8] text-3xl text-white">
            Coming soon...
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
