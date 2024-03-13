import { Form, Input, Upload, Cascader, Rate, InputNumber, Checkbox, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import countries from '../../../data/countries.json'
import TextArea from 'antd/es/input/TextArea';
import CreateRoom from './CreateRoom';
import { useContext, useEffect } from 'react';
import { HotelContext } from '../../../context/HotelContext';


const CreateHotel = ({ form, hotel }) => {
    const { loading, error, dispatch } = useContext(HotelContext);
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        if (hotel) {
            form.setFieldsValue(hotel);
        } else {
            form.resetFields();
        }
    }, [hotel, form]);

    const onFinish = async (values) => {
        if (hotel) {
            updateHotel(values);
        } else {
            createNewHotel(values);
        }
    };

    const updateHotel = async (values) => {
        const { rooms, images, city, ...rest } = values;
        dispatch({ type: "UPDATE_HOTEL_START" });
        try {
            const res = await axios.put(`http://localhost:8809/api/hotels/${hotel._id}`, {
                ...rest,
                city: city[1],
                images: images != null ? images.map((image) => image.thumbUrl) : []

            });
            const resRooms = await Promise.all(rooms.map(async (room) => {
                if (!room._id) {
                    const res = await axios.post(`http://localhost:8809/api/rooms/${hotel._id}`, {
                        ...room,
                    });
                    return res.data
                }
                const res = await axios.put(`http://localhost:8809/api/rooms/${room._id}`, {
                    ...room,
                });
                return res.data;
            }))
            const cheapestPrice = Math.min(...resRooms.map((room) => room.price));
            await axios.put(`http://localhost:8809/api/hotels/${hotel._id}`, { cheapestPrice })
            dispatch({ type: "UPDATE_HOTEL_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: "UPDATE_HOTEL_FAILURE" });
        }
    }

    const createNewHotel = async (values) => {
        const { city, rooms, images, ...rest } = values;
        dispatch({ type: "CREATE_HOTEL_START" });
        try {
            const hotelRes = await axios.post("http://localhost:8809/api/hotels", {
                ...rest,
                city: city[1],
                images: images != null ? images.map((image) => image.thumbUrl) : []
            });
            const resRooms = await Promise.all(rooms.map(async (room) => {
                const res = await axios.post(`http://localhost:8809/api/rooms/${hotelRes.data._id}`, {
                    ...room,
                });
                return res.data;
            }))
            const cheapestPrice = Math.min(...resRooms.map((room) => room.price));
            await axios.put(`http://localhost:8809/api/hotels/${hotelRes.data._id}`, { cheapestPrice })
            dispatch({ type: "CREATE_HOTEL_SUCCESS", payload: hotelRes.data });
        } catch (error) {
            dispatch({ type: "CREATE_HOTEL_FAILURE" });
        }
    }

    const filter = (inputValue, path) =>
        path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return isPNG || Upload.LIST_IGNORE;
        }
    };

    return (
        <Form
            name="edit_hotel"
            labelCol={{ span: 4 }}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name of the hotel!' }]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please input the type of the hotel!' }]}
            >
                <Select placeholder="Type">
                    <Select.Option value="hotel">Hotel</Select.Option>
                    <Select.Option value="apartments">Apartments</Select.Option>
                    <Select.Option value="resorts">Resorts</Select.Option>
                    <Select.Option value="villas">Villas</Select.Option>
                    <Select.Option value="cabins">Cabins</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please input the city of the hotel!' }]}
            >
                <Cascader
                    options={countries.map((country) => (
                        {
                            value: country.name,
                            label: country.name,
                            children: country.cities.map((city) => (
                                {
                                    value: city,
                                    label: city
                                }
                            ))
                        }
                    ))}
                    placeholder="Please select a city"
                    showSearch={{ filter }}
                />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please input the address of the hotel!' }]}
            >
                <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
                name="distance"
                label="Distance"
                rules={[{ required: true, message: 'Please input the distance of the hotel!' }]}
            >
                <Input placeholder="Distance" />
            </Form.Item>
            <Form.Item
                label="Upload images" valuePropName="fileList" getValueFromEvent={normFile}
                name="images"
            >
                <Upload {...props} listType="picture-card">
                    <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title of the hotel!' }]}
            >
                <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
                name="desc"
                label="Description"
                rules={[{ required: true, message: 'Please input the description of the hotel!' }]}
            >
                <TextArea placeholder="Description" autoSize={{ minRows: 2, maxRows: 6 }} />
            </Form.Item>
            <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please input the rating of the hotel!' }]}
            >
                <Rate allowHalf />
            </Form.Item>
            <Form.Item label="Rooms"><CreateRoom hotel={hotel} form={form} /></Form.Item>
            <Form.Item
                name="cheapestPrice"
                label="Cheapest Price"
                rules={[{ required: true, message: 'Please input the cheapest price of the hotel!' }]}
            >
                <InputNumber addonAfter="£" min={0} max={10000} />
            </Form.Item>
            <Form.Item
                name="featured"
                label="Featured"
                valuePropName='checked'
            >
                <Checkbox />
            </Form.Item>
        </Form>
    );
}

export default CreateHotel;