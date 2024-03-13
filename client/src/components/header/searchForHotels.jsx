import { Button, Cascader, Popover, DatePicker, InputNumber, Form, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import countries from "../../data/countries.json";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { redirect, useNavigate } from "react-router-dom";

const createCardItem = (icon, title, description, content) => {
    return (
        <Popover content={
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>{content}</div>
        } title={title}>
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-evenly", gap: "20px", backgroundColor: "#090F11", padding: "1rem" }}>
                <FontAwesomeIcon size="2x" color="white" icon={icon} />
                <div className="flex flex-col justify-center">
                    <div className="text-white text-[24px] max-sm:text-xs">{title}</div>
                    <div className="text-white text-[16px] max-sm:text-xs">{description}</div>
                </div>
            </div>
        </Popover>
    );
}

const SearchForHotels = () => {
    const navigate = useNavigate();
    const [selectedDestination, setSelectedDestination] = useState("Where are you going?");
    const [selectedCheckIn, setSelectedCheckIn] = useState("Add dates");
    const [selectedCheckOut, setSelectedCheckOut] = useState("Add dates");
    const [selectedTravelers, setSelectedTravelers] = useState(1);
    const [selectedRooms, setSelectedRooms] = useState(1);

    const [form] = Form.useForm();

    const destinationContent = (
        <Form.Item name="destination" rules={[
            {
                required: true,
                message: "Please select a destination"
            }
        ]}>
            <Cascader
                style={{ width: "100%" }}
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
                onChange={(value) => setSelectedDestination(value[1])}
                showSearch={{ filter }}
            />
        </Form.Item>
    );

    const checkInContent = (
        <Form.Item name="checkIn" rules={[
            {
                required: true,
                message: "Please select a check in date"
            }

        ]}>
            <DatePicker style={{ width: "100%" }} onChange={(date, dateString) => {
                setSelectedCheckIn(dateString);
            }} />
        </Form.Item>
    );

    const checkOutContent = (
        <Form.Item name="checkOut" rules={[
            {
                required: true,
                message: "Please select a check out date"
            }

        ]}>
            <DatePicker style={{ width: "100%" }} onChange={(date, dateString) => {
                setSelectedCheckOut(dateString);
            }} />
        </Form.Item>
    );

    const travelersContent = (
        <Form.List name="travellers">
            {(fields, { add, remove }) => (
                <div>
                    {fields.map(field => (
                        <Card bordered={false} size="small" key={field.key} title={`Room ${field.name + 1}`}
                            extra={fields.length > 1 ? <CloseOutlined onClick={() => {
                                setSelectedTravelers(prev => prev - form.getFieldValue(['travellers', field.name]).guests)
                                setSelectedRooms(fields.length - 1)
                                remove(field.name);
                            }} /> : null}
                            className="flex flex-col justify-evenly gap-2">
                            <Form.Item {...field} name={[field.name, 'guests']}>
                                <InputNumber onStep={(value, { type }) => {
                                    if (type === "up") {
                                        setSelectedTravelers(prev => prev + 1)
                                    } else {
                                        setSelectedTravelers(prev => prev - 1)
                                    }
                                }} placeholder="gusets" style={{ width: "100%" }} min={1} max={4} />
                            </Form.Item>
                        </Card>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => {
                            add({ guests: 1 });
                            setSelectedTravelers(prev => prev + 1)
                            setSelectedRooms(fields.length + 1)
                        }} block icon={<PlusOutlined />}>
                            Add another room
                        </Button>
                    </Form.Item>
                </div>
            )}
        </Form.List>
    );

    function filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }

    return (
        <Form form={form} className="flex justify-evenly items-center text-center md:text-left flex-wrap bottom-5 
        bg-[#090F11] w-[80%] min-h-[200px] md:absolute rounded-2xl md:h-auto h-full md:flex-row flex-col"
            onFinish={(values) => {
                const { destination, checkIn, checkOut, travellers } = values;
                const travellersCount = travellers.reduce((acc, curr) => acc + curr.guests, 0);
                const checkInDate = checkIn.format("YYYY-MM-DD");
                const checkOutDate = checkOut.format("YYYY-MM-DD");
                navigate({
                    pathname: "/hotels",
                    search: `?destination=${destination[1]}&checkIn=${checkInDate}&checkOut=${checkOutDate}&travelers=${travellersCount}&rooms=${travellers.length}`
                });
            }}
            initialValues={{
                travellers: [{ guests: 1, room: 1 }]
            }}>
            {createCardItem(faLocationArrow, "Destination", selectedDestination, destinationContent)}
            {createCardItem(faCalendarAlt, "Check in", selectedCheckIn, checkInContent)}
            {createCardItem(faCalendarAlt, "Check out", selectedCheckOut, checkOutContent)}
            {createCardItem(faUserFriends, "Travelers", `Rooms: ${selectedRooms}, Guests: ${selectedTravelers}`, travelersContent)}
            <Form.Item>
                <Button htmlType="submit" type="primary" style={{ width: "200px", height: "50px", borderRadius: "20px" }}>Search</Button>
            </Form.Item>
        </Form>
    )
}

export default SearchForHotels;