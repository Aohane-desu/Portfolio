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
  formState: {
    errors: string;
  };
};

const Login = () => {
  const auth = useAuth();
  const currentUser = useUser();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  const { register, handleSubmit, formState } = useForm<Inputs>();

  const { errors } = formState;

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/main");
    }
  }, [currentUser]);

  return (
    <div>
      <h1 className="mx-[5vw] mb-5 mt-10 text-center text-3xl">
        デモサイト　ログイン
      </h1>
      <div className="mx-[5vw] flex flex-col items-center">
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
        noValidate
        className="flex flex-col items-center [&>div]:mt-10 [&>div]:flex [&>div]:flex-row [&_input]:w-[30vw] [&_input]:rounded [&_input]:border [&_label]:w-[20vw]"
      >
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            className="pl-2"
            {...register("email", {
              required: " メールアドレスを入力してください。",
            })}
          />
        </div>
        <p className="text-center text-red-400">{errors.email?.message}</p>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            className="pl-2"
            {...register("password", {
              required: "パスワードを入力してください",
            })}
          />
        </div>
        <p className="text-center text-red-400">{errors.password?.message}</p>
        <button
          type="submit"
          className=" mt-10 w-44 rounded-xl bg-green-100 hover:bg-green-800 hover:text-white"
        >
          ログイン
        </button>
      </form>
      <p className="mt-10 text-center">
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
