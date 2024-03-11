import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    return (user && user.isAdmin) ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;