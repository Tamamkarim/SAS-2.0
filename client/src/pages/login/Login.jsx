import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Form, Input, Button, Flex, Card, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

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
    <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
      <Card>
        <Col align="center" xs={{ span: 24 }} md={{ span: 12 }} style={{
          maxWidth: "500px",
          minWidth: "300px",
          flex: "1 1 auto"
        }}>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </Row>
  );
};

export default Login;
