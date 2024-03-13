import Featured from "components/featured/Featured";
import Header from "../../components/header/Header";

import "./home.css";
import TopRated from "components/topRated/TopRated";
import CheapestHotels from "components/cheapestHotels/CheapestHotels";

const Home = () => {
  return (
    <div className="bg-black flex flex-col gap-8">
      <Header />
      <div className="flex flex-col justify-center items-center text-white gap-4 text-center" >
        <div className="text-2xl">Cheapest Hotels</div>
        <div className="text-5xl">Find The Best Deals</div>
        <div className="text-lg text-gray-400">Browse through our selection of the most affordable accommodations</div>
      </div>
      <CheapestHotels />
      <div className="flex flex-col justify-center items-center text-white gap-4 text-center" >
        <div className="text-2xl">Featured Hotels</div>
        <div className="text-5xl">Discover Your Next Adventure</div>
        <div className="text-lg text-gray-400">Browse through our curated selection of top-notch accommodations</div>
      </div>
      <Featured />
      <div className="flex flex-col justify-center items-center text-white gap-4 text-center" >
        <div className="text-2xl">Top Rated Hotels</div>
        <div className="text-5xl">Explore The Best</div>
        <div className="text-lg text-gray-400">Check out the highest rated accommodations by our users</div>
      </div>
      <TopRated />
    </div>
  );
};

export default Home;
