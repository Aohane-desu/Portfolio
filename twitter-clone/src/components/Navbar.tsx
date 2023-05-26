import { FaKiwiBird } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
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
    <header className="sticky top-0 left-0 h-10 shadow flex items-center justify-between px-5">
      <div className="flex">
        <Link to="/main" className="pr-10">
          <FaKiwiBird color={"green"} />
        </Link>
        <AiFillHeart color={"green"} />
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
