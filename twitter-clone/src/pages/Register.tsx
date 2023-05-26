import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks/firebase";
import { useUser } from "../hooks/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const auth = useAuth();
  const currentUser = useUser();
  const signUp = async (email: string, password: string) => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      signUp(email, password);
    } else {
      alert("パスワードが一致しません");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/main");
    }
  }, [currentUser]);

  return (
    <div className="h-screen p-10">
      <h1 className="text-4xl text-center mb-10">アカウントを作成</h1>
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
        <div>
          <label htmlFor="password">パスワード再入力</label>
          <input
            type="password"
            id="password"
            {...register("confirmPassword", {
              required: "パスワードを再入力してください",
            })}
          />
        </div>
        <button type="submit" className="bg-green-100 w-44 rounded-xl mt-10">
          登録
        </button>
      </form>
    </div>
  );
};

export default Register;
