import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./components/Post";
import Text from "./components/Text";
import Typing from "./components/Typing";
import TypingMain from "./components/TypingMain";
import GameOver from "./components/GameOver";
import { useAuth } from "./hooks/firebase";
import { useEffect } from "react";

function App() {
  //画面を閉じた際のログアウト処理
  const auth = useAuth();
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await auth.signOut();
      } catch (e) {
        console.log(e);
      }
    };

    window.addEventListener("beforeunload", handleSignOut);
    return () => {
      window.removeEventListener("beforeunload", handleSignOut);
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="main" element={<Content />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/text" element={<Text />} />
          <Route path="/typing" element={<Typing />} />
          <Route path="/typingmain" element={<TypingMain />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
