import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./components/Post";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="main" element={<Content />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
