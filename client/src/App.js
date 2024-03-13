import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Hotels from "./pages/hotels/Hotels";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import { ConfigProvider, Layout } from "antd";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { ProtectedRoute, PublicRoute } from "./routes/route-helpers";
import EditHotels from "./pages/dashboard/edit_hotels/EditHotels";

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Layout>
          <Navbar />
          <Content style={{ minHeight: "90dvh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:id" element={<Hotel />} />
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="edit-hotels" element={<EditHotels />} />
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
