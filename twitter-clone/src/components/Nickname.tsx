import { FormEventHandler } from "react";

const Nickname = (props: {
  sendName: FormEventHandler<HTMLFormElement> | undefined;
  setName: (arg0: string) => void;
  name: string | number | readonly string[] | undefined;
}) => {
  return (
    <div>
      <div className="h-screen w-full p-10 ">
        <h1 className="text-5xl text-center">ニックネームを登録</h1>
        <p className="text-center mt-5">
          はじめまして。ニックネームを登録してください。
        </p>
        <p className="text-center mt-5">
          （注）一度付けたニックネームは変更できません。
        </p>
        <div className="w-[90vw] mx-auto mt-10">
          <form onSubmit={props.sendName}>
            <div className="flex justify-center">
              <label htmlFor="name" className="text-2xl">
                ニックネーム
              </label>
              <input
                type="text"
                id="name"
                className="w-[50%] outline-none border-b border-black pl-2 ml-4 text-2xl"
                onChange={(e) => props.setName(e.target.value)}
                value={props.name}
              />
            </div>
            <div className=" flex justify-center items-center">
              <button className="w-96 mt-10 border rounded-xl border-black px-10 py-5">
                登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Nickname;
