import Navbar from "./Navbar";
import Tweet from "./Tweet";
import { useLocation } from "react-router-dom";

type timeStamp = {
  seconds: number;
  nanoseconds: number;
};
type dataProps = {
  text: string;
  nickName: string;
  createdAt: timeStamp;
};
const Post = () => {
  const location = useLocation();
  const { message }: { message: dataProps[] } = location.state;
  return (
    <>
      <Navbar />
      <div className="w-[90vw] h-screen mx-auto mt-10 ">
        {message.map((data) => (
          <div className="p-10 mt-10 border" key={Math.random()}>
            <p className="text-3xl">{data.nickName}</p>
            <p>{data.text}</p>
          </div>
        ))}

        <Tweet />
      </div>
    </>
  );
};

export default Post;
