import { Link } from "react-router-dom";
import { Ranking } from "./Ranking";
import Navbar from "./Navbar";
const Typing = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen items-center justify-center text-center">
        <div
          className="mx-auto table-cell h-[80vh]
        w-[80vw] rounded bg-[#12a880] p-10"
        >
          <h1 className="mb-10 text-5xl text-white">English typing</h1>
          <div className="mt-8 flex justify-around">
            <div>
              <button className="mt-10 h-[150px] w-[200px] cursor-pointer rounded-xl bg-[#ffffff] text-3xl hover:opacity-80">
                <Link to="/TypingMain">Play</Link>
              </button>
            </div>
            <Ranking />
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Typing;
