import { Button, Layout, Menu } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthNavbar from "./AuthNavbar";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Header style={{ display: "flex", padding: "0 10rem", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>Halpaa Booking</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[{ key: '1', label: <Link to="/">Home</Link> }, { key: '2', label: <Link to="/hotels">Hotels</Link> }]}
        style={{ flex: 1, minWidth: 0, gap: "0.5rem" }}
      />
      {user ? (<AuthNavbar user={user} />) : (
        <div>
          <Button type="primary" style={{ marginRight: "1rem" }}>
            <a href="/login" style={{ color: "white" }}>Login</a>
          </Button>
          <Button type="primary">
            <a href="/register" style={{ color: "white" }}>Register</a>
          </Button>
        </div>
      )}
    </Header>
  );
};

export default Navbar;
