import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "./firebase-config";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Home from "./components/Home";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import "./App.css";


function App() {
  const [me, setMe] = useState("");
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === null
      ? false
      : localStorage.getItem("isAuth")
  );

  useEffect(() => {
    async function someFunction() {
      const auth1 = await getAuth();
      setMe(auth1.currentUser.email);
    }
    someFunction();
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        {isAuth && (
          <>
            {me && (
              <Link
                style={{
                  fontWeight: "bolder",
                  color: "#000",
                  margin: "0 32px",
                }}
                to="/createpost"
              >
                CreatePost
              </Link>
            )}
            <Button
              style={{ color: "#000", margin: "0 32px" }}
              onClick={signUserOut}
            >
              <ExportOutlined />
            </Button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="*" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/home" element={<Home isAuth={isAuth} />}></Route>
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
