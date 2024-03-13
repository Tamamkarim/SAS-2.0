import { useState } from 'react';
import { Form, Input, Button, Checkbox, Upload, message, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import countries from '../../data/countries'
import Title from 'antd/es/typography/Title';
const { Option } = Select;


const props = {
    beforeUpload: (file) => {
        const isPNG = file.type === 'image/png';
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    }
};

const Register = () => {
    const { loading, error, dispatch } = useContext(AuthContext);

    const [selectedCountry, setSelectedCountry] = useState("");
    const navigate = useNavigate();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return
        }
        return e?.fileList;
    };

    const onFinish = async (values) => {
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await axios.post("http://localhost:8809/api/auth/register", {
                username: values.username,
                email: values.email,
                password: values.password,
                country: values.city,
                city: values.country,
                phone: `${values.prefix}-${values.phone}`,
                img: (values.image && values.image.length > 0) ? values.image[0].thumbUrl : "",
                isAdmin: values.admin
            });
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
            message.success("User has been created. Taking you to login page.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle rules={
            [
                {
                    required: true,
                    message: 'Please input the phone code!',
                },
            ]

        }>
            <Select
                style={{
                    width: 80,
                }}
            >
                {countries.map((country, index) => (
                    <Option key={index} value={country.phonePrefix}></Option>
                ))}
            </Select>
        </Form.Item>
    );

    const validateField = (fieldName, apiUrl) => ({
        validator(_, value) {
            if (!value) return Promise.resolve();
            return axios.get(`${apiUrl}${value}`)
                .then((res) => {
                    if (res.data.exists) {
                        return Promise.reject(res.data.message);
                    }
                    return Promise.resolve();
                })
        }
    });


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
            <Col align="center" xs={{ span: 24 }} md={{ span: 12 }} style={{
                maxWidth: "500px",
                flex: "1 1 auto"
            }}>
                <Card>
                    <Title level={2}>Register</Title>
                    <Form
                        disabled={loading}
                        name="basic"

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                    type: "email",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) return Promise.resolve();
                                        return axios.get(`http://localhost:8809/api/users/checkemail/${value}`)
                                            .then((res) => {
                                                if (res.data.exists) {
                                                    return Promise.reject(res.data.message);
                                                }
                                                return Promise.resolve();
                                            })
                                    }
                                })
                            ]}
                        >
                            <Input placeholder='Email' />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder='Password' />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                validateField('email', 'http://localhost:8809/api/users/checkemail/'),
                            ]}
                        >
                            <Input.Password placeholder='Confirm password' />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                validateField('username', 'http://localhost:8809/api/users/checkusername/'),
                            ]}
                        >
                            <Input placeholder='Username' />
                        </Form.Item>
                        <Form.Item >
                            <Space.Compact style={{ width: "100%" }}>
                                <Form.Item
                                    name="country"
                                    noStyle
                                    rules={[{ required: true, message: 'Country is required' }]}
                                >
                                    <Select placeholder="Select a country" onChange={(e) => {
                                        setSelectedCountry(e);
                                    }}>
                                        {countries.map((country, index) => (
                                            <Option key={index} value={country.name}>{country.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    noStyle
                                    rules={[{ required: true, message: 'City is required' }]}
                                >
                                    <Select placeholder="Select a city">
                                        {countries.filter(e => e.name == selectedCountry).map((country, index) => (
                                            country.cities.map((city, index) => (
                                                <Option key={index} value={city}>{city}</Option>
                                            ))
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                placeholder='Phone number'
                            />
                        </Form.Item>
                        <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload {...props} action="/upload.do" listType="picture-card" maxCount={1}>
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="admin"
                            valuePropName="checked"
                        >
                            <Checkbox>
                                Is user admin?
                            </Checkbox>
                        </Form.Item>
                        <Form.Item

                        >
                            <Link to="/login">Already have an account? Login</Link>
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" style={{ width: "200px" }}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default Register;