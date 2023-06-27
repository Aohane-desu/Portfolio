import { FormEventHandler } from "react";

const Nickname = (props: {
  sendName: FormEventHandler<HTMLFormElement> | undefined;
  setName: (arg0: string) => void;
  name: string | number | readonly string[] | undefined;
}) => {
  return (
    <div>
      <div className="h-screen w-full p-10 ">
        <h1 className="text-center text-5xl">ニックネームを登録</h1>
        <p className="mt-5 text-center">
          はじめまして。ニックネームを登録してください。
        </p>
        <p className="mt-5 text-center">
          （注）一度付けたニックネームは変更できません。
        </p>
        <div className="mx-auto mt-10 w-[90vw]">
          <form onSubmit={props.sendName}>
            <div className="flex justify-center">
              <label htmlFor="name" className="text-2xl">
                ニックネーム
              </label>
              <input
                type="text"
                id="name"
                className="ml-4 w-[50%] border-b border-black pl-2 text-2xl outline-none"
                onChange={(e) => props.setName(e.target.value)}
                value={props.name}
              />
            </div>
            <div className=" flex items-center justify-center">
              <button className="mt-10 w-96 rounded-xl border border-black px-10 py-5">
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
