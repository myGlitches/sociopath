import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import About from "./pages/About";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase_setup/firebase";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav className="p-3 bg-slate-700 flex justify-between ">
        <Link to="/">
          <img src="./sociopath.svg" alt="" className="nav-logo" />
        </Link>
        <div className="nav-items flex justify-between">
          <Link
            className="mx-4 bg-blue-200 rounded-[10px] mb-0 px-6 flex justify-center items-center font-irish-grover text-2xl hover:bg-blue-400"
            to="/about"
          >
            About
          </Link>
          {!isAuth ? (
            <Link
              className="mx-4 bg-blue-200 rounded-[10px] mb-0 px-6 flex justify-center items-center font-irish-grover text-2xl hover:bg-blue-400"
              to="/login"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                className="mx-4 bg-blue-200 rounded-[10px] mb-0 px-6 flex justify-center items-center font-irish-grover text-2xl hover:bg-blue-400"
                to="/createpost"
              >
                Create Post
              </Link>
              <button
                onClick={signUserOut}
                className="mx-4 bg-blue-200 rounded-[10px] mb-0 px-6 flex justify-center items-center font-irish-grover text-2xl hover:bg-blue-400"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
      <main className="p-3">
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/about" element={<About />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
