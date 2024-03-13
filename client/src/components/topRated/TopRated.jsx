import { Card, Image, Badge, Rate } from "antd";
import { HotelContext } from "context/HotelContext";
import { useContext } from "react";
import countries_covers from "../../data/countries_covers.json"
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Meta } = Card;

const HotelCard = ({ hotel, loading }) => {
    let info = countries_covers.find((country) => country.name === hotel.city);
    return (
        <Badge.Ribbon text={<Rate disabled defaultValue={hotel.rating}></Rate>}>
            <Card
                loading={loading}
                actions={[
                    <Link to={`/hotels/${hotel._id}`}>
                        <ArrowRightOutlined key="more"></ArrowRightOutlined>
                    </Link>
                ]}
                className="min-w-[250px] m-4 rounded-t-3xl" hoverable cover={<Image alt="" src={info?.cover} className="object-cover min-h-[350px] max-h-[350px]" />}>
                <Meta title={hotel.name} description={hotel.desc} />
            </Card>
        </Badge.Ribbon>
    )
}

const TopRated = () => {
    const { hotels, loading, error } = useContext(HotelContext);

    return (
        <div className="grid xl:grid-cols-2 gap-8 mx-48 mb-16 grid-cols-1">
            {hotels.filter(e => e.rating >= 4).map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} loading={loading} />
            ))}
        </div>
    );
};

export default TopRated;
