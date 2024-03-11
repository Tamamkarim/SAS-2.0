import { Button, Cascader, Flex, Popover, DatePicker, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import countries from "../../data/countries.json";

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
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ color: "white" }}>{title}</h1>
                    <p style={{ color: "white" }}>{description}</p>
                </div>
            </div>
        </Popover>
    );
}

const SearchForHotels = () => {
    const [selectedDestination, setSelectedDestination] = useState("Where are you going?");
    const [selectedCheckIn, setSelectedCheckIn] = useState("Add dates");
    const [selectedCheckOut, setSelectedCheckOut] = useState("Add dates");
    const [selectedTravelers, setSelectedTravelers] = useState("Add guests");

    const destinationContent = (
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
    );

    const checkInContent = (
        <DatePicker style={{ width: "100%" }} onChange={(date, dateString) => {
            setSelectedCheckIn(dateString);
        }} />
    );

    const checkOutContent = (
        <DatePicker style={{ width: "100%" }} onChange={(date, dateString) => {
            setSelectedCheckOut(dateString);
        }} />
    );

    const travelersContent = (
        <InputNumber style={{ width: "100%" }} min={1} max={4} defaultValue={2} onChange={(value) => setSelectedTravelers(value)} />
    );

    function filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }

    return (
        <Flex justify="space-evenly" align="center" style={{
            height: "200px",
            width: "80%",
            position: "absolute",
            bottom: "50px",
            zIndex: "1",
            backgroundColor: "#090F11",
            borderRadius: "20px",
        }}>
            {createCardItem(faLocationArrow, "Destination", selectedDestination, destinationContent)}
            {createCardItem(faCalendarAlt, "Check in", selectedCheckIn, checkInContent)}
            {createCardItem(faCalendarAlt, "Check out", selectedCheckOut, checkOutContent)}
            {createCardItem(faUserFriends, "Travelers", selectedTravelers, travelersContent)}
            <Button type="primary" style={{ width: "200px", height: "50px", borderRadius: "20px" }}>Search</Button>
        </Flex>
    );
}

export default SearchForHotels;