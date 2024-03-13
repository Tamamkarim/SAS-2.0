
import React, { useState, useEffect } from 'react';
import { List, Avatar, Skeleton, Flex, Button, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import CreateHotel from './CreateHotel';
import { Form } from 'antd';
import { useContext } from 'react';
import { HotelContext } from '../../../context/HotelContext';
import { Link } from 'react-router-dom';


const EditHotels = () => {
    const { hotels, loading, error } = useContext(HotelContext);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedHotel, setSelectedHotel] = useState(null);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Flex vertical justify="center" align="center" style={{ height: "100%" }}>
            <List
                style={{ width: "50%" }}
                loading={false}
                itemLayout="horizontal"
                dataSource={hotels}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        actions={[<a key="list-loadmore-edit" onClick={() => {
                            setSelectedHotel(item);
                            showDrawer();
                        }}>edit</a>]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.photos.length > 0 && item.photos[0]} />}
                                title={<Link to={`/hotels?id=${item._id}`}>{item.name}</Link>}
                                description={item.desc}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Button style={{ width: "200px" }} type="primary" onClick={() => {
                setSelectedHotel(null);
                showDrawer();
            }} icon={<PlusOutlined />}>Add Hotel</Button>
            <Drawer title="Create a new hotel" width={720} onClose={onClose} open={open} styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                            form.submit();
                            onClose();
                        }} htmlType='submit' type="primary">
                            Submit
                        </Button>
                    </Space>
                }>
                <CreateHotel form={form} hotel={selectedHotel} />
            </Drawer>
        </Flex>
    )
}

export default EditHotels;