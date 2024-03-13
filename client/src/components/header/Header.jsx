import { Flex, Image } from "antd";
import SearchForHotels from "./searchForHotels";

const Header = () => {
  return (
    <Flex vertical align="center" className="h-[820px]" style={{
      background: "linear-gradient(180deg, rgba(0, 21, 41 ,1) 0%, rgba(64,101,114,1) 72%, rgba(84,134,142,1) 100%)", padding: "50px", position: "relative"
    }}>
      <Flex justify="space-around" align="center" style={{ margin: "20px 0", height: "220px", width: "100%" }} wrap="wrap">
        <h1 style={{ color: "white", fontSize: "3.5rem", textTransform: "uppercase", inlineSize: "460px", overflow: "hidden", textAlign: "center" }}>
          A journey of discovery
        </h1>
        <p style={{ color: "white", fontSize: "1.2rem", inlineSize: "600px", overflow: "hidden", textAlign: "center" }}>
          Discover your next great adventure, become an explorer and travel the world.
        </p>
      </Flex>
      <div className="hidden md:block" style={{
        borderRadius: "20px",
        width: "100%",
        height: "400px",
        backgroundImage: `url("https://images.unsplash.com/photo-1559268950-2d7ceb2efa3a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundPosition: "50% 80%", // Center the image
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%", // Double the width of the image
      }} />
      <SearchForHotels />
    </Flex>
  );
};

export default Header;
