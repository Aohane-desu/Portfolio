import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Reply from "./Reply";

const Text = () => {
  const location = useLocation();
  const title = location.state.text;
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-4xl">{title}</h1>
        <div>
          <div className="border p-5 mt-5">
            <p>1</p>
            <p className=" text-xl">テストです</p>
          </div>
          <div className="border p-5 mt-5">
            <p>2</p>
            <p className=" text-xl">テストです2</p>
          </div>
          <div className="border p-5 mt-5">
            <p>3</p>
            <p className=" text-xl">テストです3</p>
          </div>
        </div>
      </div>
      <Reply />
    </>
  );
};

export default Text;
