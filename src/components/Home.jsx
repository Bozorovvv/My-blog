import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Button, Row, Col, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const postCollecionRef = collection(db, "posts");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = await getDocs(postCollecionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    setButtonLoading(true);
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
          {postList.map((post) => (
            <>
              <p
                style={{
                  fontSize: "2.5em",
                  fontWeight: "bold",
                  margin: "16px 0 0 0",
                }}
              >
                {post.title}
              </p>
              <p style={{ fontSize: "0.9em" }}>
                {moment.unix(post.date.seconds).format("LL")}
              </p>
              <p style={{ fontSize: "1.4em" }}>{post.text}</p>
              <div tyle={{ height: "1px solid #eee" }}></div>
              <Link style={{ marginRight: "16px" }} to="">
                @bozorovvv
              </Link>
              {isAuth && post.author.name === "farhod bozorov" && (
                <Button
                  loading={buttonLoading}
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  delete
                </Button>
              )}
            </>
          ))}
        </Col>
      </Col>
    </Row>
  );
};

export default Home;
