
import { Form, Input, Button, Card, Space, InputNumber, DatePicker } from 'antd';
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RoomContext } from 'context/RoomContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


const CreateRoom = ({ hotel, form }) => {
    const { dispatch } = useContext(RoomContext);

    useEffect(() => {
        if (hotel) {
            dispatch({ type: "GET_ROOMS_START" });
            axios.get(`http://localhost:8809/api/hotels/room/${hotel._id}`)
                .then(res => {
                    dispatch({ type: "GET_ROOMS_SUCCESS", payload: res.data });

                    const rooms = res.data.map(room => ({
                        ...room,
                        roomNumbers: room.roomNumbers.map(roomNumber => ({
                            ...roomNumber,
                            unavailableDates: roomNumber.unavailableDates.map(date => moment(date))
                        }))
                    }))
                    form.setFieldsValue({ rooms });
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
                        <Form.List name={[field.name, 'roomNumbers']}>
                            {(subfields, subOpt) => (
                                <div className='flex flex-col gap-4'>
                                    {subfields.map((subfield, index) => (
                                        <Space key={subfield.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                name={[subfield.name, 'number']}
                                                rules={[{ required: true, message: 'Missing room number' }]}
                                            >
                                                <Input placeholder="Room Number" />
                                            </Form.Item>
                                            <Form.Item
                                                name={[subfield.name, 'unavailableDates']}
                                                rules={[{ required: true, message: 'Missing unavailable dates' }]}
                                            >
                                                <DatePicker.RangePicker />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => subOpt.remove(subfield.name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => subOpt.add()} block icon={<PlusOutlined />}>
                                            Add Room Number
                                        </Button>
                                    </Form.Item>
                                </div>
                            )}
                        </Form.List>
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