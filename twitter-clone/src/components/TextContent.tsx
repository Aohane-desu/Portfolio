import { useEffect } from "react";

export const TextContent = (props: any) => {
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
      <p className="text-center text-5xl w-full break-all Our ">{props.word}</p>
    </div>
  );
};
