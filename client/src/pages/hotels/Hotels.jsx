import { List, Rate } from "antd";
import Header from "components/header/Header";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { faBed, faLocationPin, faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "antd/es/typography/Title";


const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams()
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const travelers = searchParams.get("travelers");
  const rooms = searchParams.get("rooms");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!destination || !checkIn || !checkOut || !travelers || !rooms) return;
    const fetchHotels = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8809/api/hotels?city=${destination}`);
      const data = await res.json();
      const roomsData = await Promise.all(data.map(async (hotel) => {
        const res = await fetch(`http://localhost:8809/api/hotels/room/${hotel._id}`);
        const roomData = await res.json();
        return roomData;
      }));

      // Combine hotel data with room data
      const hotelsWithRooms = data.map((hotel, index) => ({
        ...hotel,
        rooms: roomsData[index]
      }));

      // Filter out hotels where no rooms are available
      const availableHotels = hotelsWithRooms.filter(hotel => {
        return hotel.rooms.some(room => {
          // Check if room is available based on maximum occupancy and unavailable dates
          const isOccupancyOk = room.maxPeople >= travelers;
          const isDateOk = !room.roomNumbers.some(roomNumber => {
            return roomNumber.unavailableDates.some(date => {
              const unavailableDate = new Date(date);
              return unavailableDate >= new Date(checkIn) && unavailableDate <= new Date(checkOut);
            });
          });
          return isOccupancyOk && isDateOk;
        });
      });

      setHotels(availableHotels);
      setLoading(false);
    }
    fetchHotels();
  }, [destination, checkIn, checkOut, travelers, rooms])
  return (
    <div>
      <Header />
      <Title level={2} className=" ml-4 my-8">Available hotels</Title>
      <div ref={listRef}>
        <List itemLayout="vertical" size="large" dataSource={hotels}
          loading={loading}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <Rate disabled defaultValue={item.rating} />,
                <div className="text-green-600 text-[16px]">Cheapest price £{item.cheapestPrice}</div>,
                <div><Link to={`/hotel/${item._id}`}>View rooms</Link></div>
              ]}
              extra={<img width={272} alt="logo" src={"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"} />}
            >
              <List.Item.Meta title={item.name} description={item.title} />
              <div className="flex flex-col gap-2 text-[16px]">
                {item.desc}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center"><FontAwesomeIcon icon={faBed} />{item.rooms.length} available rooms</div>
                  <div className="flex gap-2 items-center"><FontAwesomeIcon icon={faLocationPin} />{item.distance}</div>
                  <div className="flex gap-2 items-center"><FontAwesomeIcon icon={faMap} />{item.address}, {item.city}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
};

export default Hotels;
