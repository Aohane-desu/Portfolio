import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  const navigation = useNavigate();
  const sendTwitter = () => {
    navigation("/post");
  };

  const sendTyping = () => {
    navigation("/typing");
  };
  return (
    <>
      <Navbar />
      <div className="text-center">
        <h1>英語学習サポートサイト</h1>
        <button className="w-96 border" onClick={sendTwitter}>
          Twitter-Clone
        </button>
        <button className="w-96 border" onClick={sendTyping}>
          Typing-game
        </button>
      </div>
    </>
  );
};

export default Main;
