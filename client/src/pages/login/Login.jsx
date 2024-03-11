import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Form, Input, Button, Flex } from 'antd';
import "./login.css";

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8809/api/auth/login", values);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        disabled={loading}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {error && <Form.Item wrapperCol={{
          offset: 8,
          span: 16,
        }}>
          <div style={{ color: "red" }}>Incorrect credentials</div>
        </Form.Item>}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Link to="/register">Don't have an account? Register</Link>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
