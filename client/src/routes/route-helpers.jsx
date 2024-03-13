import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    return (user && user.isAdmin) ? <Outlet /> : <Navigate to="/login" />;
}

const PublicRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? <Navigate to="/" /> : <Outlet />;
}

export { PublicRoute, ProtectedRoute };