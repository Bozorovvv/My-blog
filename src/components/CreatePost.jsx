import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button, Input, Row, Col, Form, Space } from "antd";

const CreatePost = ({ isAuth }) => {
  const [loading, setLoading] = useState(false);
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    await addDoc(postsCollectionRef, {
      title: values.title,
      text: values.text,
      date: new Date(),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    setLoading(false);
    navigate("/home");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row justify="center" style={{ marginTop: "16px", height: "80vh" }}>
      <Col span={8}>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <h2>Create posts</h2>
        </Space>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "empty" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: "empty" }]}
          >
            <Input.TextArea showCount maxLength={600} rows={10} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create post
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreatePost;
