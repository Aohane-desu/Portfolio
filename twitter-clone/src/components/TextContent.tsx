import { useEffect } from "react";

export const TextContent = (props: {
  currentStage: number;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  word: string;
}) => {
  const apiUrl = "https://api.quotable.io/random";

  //Apiで表示する中身を取得
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        props.setWord(data.content);
      });
  }, [props.currentStage]);
  return (
    <div className="p-[30px]">
      <p className="Our w-full break-all text-center text-5xl ">{props.word}</p>
    </div>
  );
};
