import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import CreateTodo from "./components/CreateTodo";
import Login from "./components/Login";
import Home from "./components/Home";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === null
      ? false
      : localStorage.getItem("isAuth")
  );

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
        <Link
          style={{
            fontWeight: "bolder",
            color: "#000",
            margin: "0 32px",
          }}
          to="/createpost"
        >
          CreateTodo
        </Link>

        <Button
          style={{ color: "#000", margin: "0 32px" }}
          onClick={signUserOut}
        >
          <ExportOutlined />
        </Button>
      </nav>
      <Routes>
        <Route path="*" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/home" element={<Home isAuth={isAuth} />}></Route>
        <Route
          path="/createpost"
          element={<CreateTodo isAuth={isAuth} />}
        ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
