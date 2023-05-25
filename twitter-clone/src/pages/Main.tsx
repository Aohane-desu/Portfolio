import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type dataProps = {
  text: string;
  nickName: string;
  createdAt: timeStamp;
};
const Main = ({ message }: { message: dataProps[] }) => {
  const navigation = useNavigate();
  const sendTwitter = () => {
    navigation("/post", { state: { message: message } });
  };
  return (
    <>
      <Navbar />
      <div className="text-center">
        <h1>英語学習サポートサイト</h1>
        <button className="w-96 border" onClick={sendTwitter}>
          Twitter-Clone
        </button>
        <button className="w-96 border">Typing-game</button>
      </div>
    </>
  );
};

export default Main;
