import React, { useState, useEffect, Fragment } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Button, Row, Col, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const postCollecionRef = collection(db, "posts");
  const [buttonLoading, setButtonLoading] = useState("");

  const getPosts = async () => {
    const data = await getDocs(postCollecionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    setButtonLoading(id);
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setButtonLoading(false);
    window.location = "/home";
  };

  return (
    <Row justify="center" style={{ marginTop: "16px" }}>
      <Col span={7}>
        <Row justify="start">
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "16px" }}>
                <Avatar
                  src={
                    <Image
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ width: 32 }}
                    />
                  }
                />
              </div>
              <div>
                <p style={{ margin: "0", fontSize: "1em" }}>@bozorovvv</p>
              </div>
            </div>
          </Col>
        </Row>
        <Col>
          {postList.map((todo) => (
            <Fragment key={todo.id}>
              <p
                style={{
                  fontSize: "2.5em",
                  fontWeight: "bold",
                  margin: "16px 0 0 0",
                }}
              >
                {todo.title}
              </p>
              <p style={{ fontSize: "0.9em" }}>
                {moment.unix(todo.date.seconds).format("LL")}
              </p>
              <div tyle={{ height: "1px solid #eee" }}></div>
              <Link style={{ marginRight: "16px" }} to="">
                @bozorovvv
              </Link>
              {isAuth && todo.author.name === "farhod bozorov" && (
                <Button
                  loading={buttonLoading === todo.id}
                  onClick={() => {
                    deletePost(todo.id);
                  }}
                >
                  delete
                </Button>
              )}
            </Fragment>
          ))}
        </Col>
      </Col>
    </Row>
  );
};

export default Home;
