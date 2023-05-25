import { useEffect, useRef } from "react";
import { BsArrowClockwise } from "react-icons/bs";
const Loading = () => {
  const moveRef = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);
  return (
    <div className="h-screen flex justify-center items-center" ref={moveRef}>
      <BsArrowClockwise className="animate-spin text-5xl" />
    </div>
  );
};

export default Loading;
