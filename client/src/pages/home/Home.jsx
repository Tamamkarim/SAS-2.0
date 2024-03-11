import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import "./home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Selaa kiinteistötyypin mukaan</h1>

        <h1 className="homeTitle">Vieraiden rakastamia koteja</h1>
        <FeaturedProperties />

      </div>
    </div>
  );
};

export default Home;
