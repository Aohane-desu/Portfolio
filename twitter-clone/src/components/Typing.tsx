import { Link } from "react-router-dom";
const Typing = () => {
  return (
    <>
      <div className="w-screen h-screen text-center flex justify-center items-center">
        <div
          className="w-[80vw] mx-auto bg-slate-200
        h-[80vh] table-cell rounded p-10"
        >
          <h1 className="text-5xl">English typing</h1>
          <div className="flex justify-around mt-8">
            <div>
              <div>
                <h4 className="mr-3">aa</h4>
              </div>

              <button className="rounded-xl bg-slate-400 w-[200px] h-[150px] mt-10 cursor-pointer text-3xl hover:opacity-80">
                <Link to="/TypingMain">Play</Link>
              </button>
            </div>
            {/* <Ranking /> */}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Typing;
