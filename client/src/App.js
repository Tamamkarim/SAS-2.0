import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import { ConfigProvider, Layout } from "antd";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/protectedRoutes";
import EditHotels from "./pages/dashboard/edit_hotels/EditHotels";
import EditRooms from "./pages/dashboard/edit_rooms/EditRooms";

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Layout>
          <Navbar />
          <Content style={{ minHeight: "80vh", margin: "0 10rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<List />} />
              <Route path="/hotels/:id" element={<Hotel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="edit-hotels" element={<EditHotels />} />
                  <Route path="edit-rooms" element={<EditRooms />} />
                </Route>
              </Route>
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            SAS ©{new Date().getFullYear()} Created by Tamam.
          </Footer>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
