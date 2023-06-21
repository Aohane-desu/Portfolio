import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../hooks/firebase";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const auth = useAuth();
  const currentUser = useUser();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/main");
    }
  }, [currentUser]);

  return (
    <div>
      <h1 className="text-center text-3xl mt-10">デモサイト　ログイン</h1>
      <div className="flex flex-col items-center">
        <p>
          ゲストユーザーでのログインは、以下のメールアドレスとパスワードをお使いください。
        </p>
        <div>
          <p>メールアドレス:gest@gest.com</p>
          <p>パスワード:gest12345</p>
        </div>
      </div>
      <form
        onClick={handleSubmit(onSubmit)}
        className="flex flex-col items-center [&>div]:mt-10 [&>div]:flex [&>div]:flex-row [&_label]:w-[20vw] [&_input]:w-[30vw] [&_input]:rounded [&_input]:border"
      >
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="emial"
            id="email"
            {...register("email", {
              required: " メールアドレスを入力してください。",
            })}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "パスワードを入力してください",
            })}
          />
        </div>
        <button
          type="submit"
          className="bg-green-100 w-44 rounded-xl mt-10 hover:text-white hover:bg-green-800"
        >
          ログイン
        </button>
      </form>
      <p className="text-center mt-10">
        新規登録は
        <Link to="/register" className="text-blue-400 ">
          こちら
        </Link>
        から
      </p>
    </div>
  );
};

export default Login;
