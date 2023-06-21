import { Link } from "react-router-dom";
import { Ranking } from "./Ranking";
import Navbar from "./Navbar";
const Typing = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen text-center flex justify-center items-center">
        <div
          className="w-[80vw] mx-auto bg-[#12a880]
        h-[80vh] table-cell rounded p-10"
        >
          <h1 className="text-5xl">English typing</h1>
          <div className="flex justify-around mt-8">
            <div>
              <button className="rounded-xl bg-[#ffffff] w-[200px] h-[150px] mt-10 cursor-pointer text-3xl hover:opacity-80">
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
