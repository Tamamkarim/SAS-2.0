import React, { useState } from 'react';
import { Form, Input, Button, Flex, Checkbox, Upload, message, Card, Image, Divider } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import countries from '../../data/countries'
const { Option } = Select;


const props = {
    beforeUpload: (file) => {
        const isPNG = file.type === 'image/png';
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
        console.log(info.fileList);
    },
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
                img: values.image[0].thumbUrl,
                isAdmin: values.admin
            });
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
            navigate("/login");
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+46</Option>
                <Option value="87">+358</Option>
            </Select>
        </Form.Item>
    );

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Flex vertical justify="center" align="center" style={{ height: "100vh" }}>
            <Flex align='center' style={{ width: "80%", backgroundColor: "white", overflow: "hidden" }}>
                <Image src="https://flyingmag.sfo3.digitaloceanspaces.com/flyingma/wp-content/uploads/2022/06/23090933/AdobeStock_249454423-scaled.jpeg" />
                <Card size='small' style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", width: "100%" }}>
                    <Divider orientation='left'>Register</Divider>
                    <Form
                        disabled={loading}
                        name="basic"
                        labelCol={{
                            span: 10,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
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
                        <Form.Item label="Address">
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
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Upload" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload {...props} action="/upload.do" listType="picture-card" maxCount={1}>
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="admin"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                        >
                            <Checkbox>
                                Is user admin?
                            </Checkbox>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Link to="/login">Already have an account? Login</Link>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 13,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </Flex>
    );
}

export default Register;