
import React from 'react';
import { Form, Input, Button, Card, Space, InputNumber } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { RoomContext } from 'context/RoomContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';


const CreateRoom = ({ hotel, form }) => {
    const { dispatch } = useContext(RoomContext);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (hotel) {
            dispatch({ type: "GET_ROOMS_START" });
            axios.get(`http://localhost:8809/api/hotels/room/${hotel._id}`)
                .then(res => {
                    dispatch({ type: "GET_ROOMS_SUCCESS", payload: res.data });
                    setRooms(res.data);
                    form.setFieldsValue({ rooms: res.data });
                })
                .catch(error => {
                    dispatch({ type: "GET_ROOMS_FAILURE" });
                });
        }
    }, [hotel, dispatch]);

    return (<Form.List name="rooms">
        {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                {fields.map((field) => (
                    <Card
                        size="small"
                        title={`Room ${field.name + 1}`}
                        key={field.key}
                        extra={
                            <CloseOutlined
                                onClick={() => {
                                    remove(field.name);
                                }}
                            />
                        }
                    >
                        <Form.Item label="Title" name={[field.name, 'title']} rules={[{ required: true, message: 'Please input the room title!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Price" name={[field.name, 'price']} rules={[{ required: true, message: 'Please input the price of the room!' }]}>
                            <InputNumber addonAfter="£" min={0} max={10000} />
                        </Form.Item>
                        <Form.Item label="Max People" name={[field.name, 'maxPeople']} rules={[{ required: true, message: 'Please input the max amout of people in the room!' }]}>
                            <InputNumber min={1} max={5} />
                        </Form.Item>
                        <Form.Item label="Description" name={[field.name, 'desc']} rules={[{ required: true, message: 'Please input the description of the room!' }]}>
                            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                        </Form.Item>
                    </Card>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                    + Add a room
                </Button>
            </div>
        )}
    </Form.List>)
}

export default CreateRoom;