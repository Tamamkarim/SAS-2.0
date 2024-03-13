import { Card, Image, Badge, Rate, Carousel } from "antd";
import { HotelContext } from "context/HotelContext";
import { useContext } from "react";
import countries_covers from "../../data/countries_covers.json"
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Meta } = Card;

const HotelCard = ({ hotel, loading }) => {
    let info = countries_covers.find((country) => country.name === hotel.city);
    return (
        <Badge.Ribbon text={`${hotel.cheapestPrice} £`} className="mr-2 text-2xl">
            <Card
                loading={loading}
                actions={[
                    <Link to={`/hotels/${hotel._id}`}>
                        <ArrowRightOutlined key="more"></ArrowRightOutlined>
                    </Link>
                ]}
                className="min-w-[250px] my-10 rounded-t-3xl" hoverable cover={<Image alt="" src={info?.cover} className="object-cover min-h-[350px] max-h-[350px]" />}>
                <Meta title={hotel.name} description={hotel.desc} />
            </Card>
        </Badge.Ribbon>
    )
}

const CheapestHotels = () => {
    const { hotels, loading, error } = useContext(HotelContext);

    return (
        <div className="mx-52">
            <Carousel autoplay>
                {hotels.filter(e => e.cheapestPrice <= 200).map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} loading={loading} />
                ))}
            </Carousel>
        </div>
    );
};

export default CheapestHotels;
