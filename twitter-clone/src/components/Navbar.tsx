import { FaKiwiBird } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/firebase";
import { useAuth } from "../hooks/firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const currentUser = useUser();
  const auth = useAuth();

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <header className="sticky left-0 top-0 flex h-10 items-center justify-between px-5 shadow">
      <div className="flex">
        <Link to="/main" className="flex items-center gap-1 pr-10">
          <FaKiwiBird color={"green"} />
          <p>ホームへ</p>
        </Link>
      </div>
      <div className="flex">
        <p className="pr-10">
          ログイン中のユーザー：{currentUser?.displayName}
        </p>
        <button onClick={handleSignOut}>ログアウト</button>
      </div>
    </header>
  );
};

export default Navbar;
