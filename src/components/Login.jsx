import React from "react";
import { Row, Col, Button } from "antd";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GooglePlusOutlined } from "@ant-design/icons";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/home");
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ marginTop: "16px", height: "60vh" }}
    >
      <Col>
        <h1 style={{ textAlign: "center" }}>React JS</h1>
        <Button className="login-with-google-btn" onClick={signInWithGoogle}>
          <GooglePlusOutlined /> Sign in with Google
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
