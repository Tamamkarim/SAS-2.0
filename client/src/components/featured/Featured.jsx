import { Card, Col, Image, Row } from "antd";
import { HotelContext } from "context/HotelContext";
import { useContext } from "react";
import countries_covers from "../../data/countries_covers.json"
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Meta } = Card;

const HotelCard = ({ hotel, loading }) => {
  let info = countries_covers.find((country) => country.name === hotel.city);
  return (
    <Card
      loading={loading}
      actions={[

        <Link to={`/hotels/${hotel._id}`}>
          <ArrowRightOutlined key="more"></ArrowRightOutlined>
        </Link>
      ]}
      className="min-w-[550px] h-full m-4 rounded-t-3xl" hoverable cover={<Image alt="" src={info?.cover} className="object-cover min-h-[350px] max-h-[350px]" />}>
      <Meta title={hotel.name} description={hotel.desc} />
    </Card>
  )
}

const Featured = () => {
  const { hotels, loading, error } = useContext(HotelContext);

  return (
    <div className="flex gap-8 overflow-scroll justify-start items-center my-8 max-sm:flex-col">
      {hotels.filter(e => e.featured).map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} loading={loading} />
      ))}
    </div>
  );
};

export default Featured;
